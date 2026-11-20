# PhiloArt 官网部署与运维（含 Vercel → 东京迁移记录）

> 本文说明 `philoart.io` 的部署方式、环境变量、日志和回滚，并记录 2026-11-20 从 Vercel 迁到东京机的完整过程。
>
> 最后更新：2026-11-20（从 Vercel 迁到 AWS 东京，Next.js standalone 服务）

## 1. 总览

| 项目 | 值 |
|---|---|
| 主机 | AWS 东京 EC2 `sharkpro-tokyo`（`18.180.139.90`），单节点 docker swarm，与 philoart 后端、dopamind、speechtype、tinyimg 等共用 |
| 服务 | swarm 服务 `philoart-web_web`（stack 名 `philoart-web`），1 个副本，Node 监听 3000，内存上限 512M（实际约 100MB） |
| 形态 | Next.js `output: "standalone"`，运行 `node server.js`，页面在服务端渲染 |
| 部署 | GitHub Actions（`.github/workflows/deploy.yml`）构建镜像推到 GHCR，再调东京部署钩子 |
| 代码来源 | GitHub `Philo-Li/philoart`，分支 `main` |
| 镜像 | `ghcr.io/philo-li/philoart-web:<commit sha>`，基础镜像 `node:22-slim` |
| 栈文件 | 仓库里的 `deploy/stack.yml`，东京机上的副本在 `/opt/apps/philoart-web/stack.yml` |
| 入口 | 东京机上的 Traefik（80/443），按域名转发，证书由 Let's Encrypt 自动签发 |
| 域名 | 只有 `philoart.io`；`www.philoart.io` 没有 DNS 记录，未配置 |

数据都来自后端 `https://api.philoart.io`（独立仓库 `Philo-Li/philo-art-backend`，swarm 服务 `philoart_api`，同一台机器）：

- **服务端**：照片页 `/photo/[id]`、作者页 `/[username]`、合集页 `/collection/[id]` 在服务端请求 GraphQL，把标题、描述和 OG 图写进 HTML，每 60 秒刷新一次（ISR）。`sitemap.xml` 每小时重新生成。
- **浏览器**：登录、上传、编辑资料、搜索直接请求 API，token 存在 localStorage。

## 2. 部署

### 2.1 自动部署

push 到 `main` 就会部署到生产环境，任何路径的改动都会触发（包括 `docs/`），没有预览环境。流程：

1. 构建镜像：`npm ci` → `npm run build`，推到 GHCR。`NEXT_PUBLIC_*` 以 build-arg 传入（见第 3 节）。
2. 调东京部署钩子 `https://tokyo-api.sharkpro.ai/_deploy`，把 `philoart-web_web` 换成新镜像。

更新采用 start-first：新容器的健康检查（请求 `/robots.txt`）通过后才停掉旧容器，所以不停机；失败时自动回滚，并发出「Actions Deploy Failed」告警。

`main` 设了「必须走 PR」的规则。管理员直接 push 会看到 `Changes must be made through a pull request` 的提示，但提交照样会进去。

没有新提交但想重新构建部署，可以手动触发：

```bash
gh workflow run deploy.yml -R Philo-Li/philoart --ref main
```

### 2.2 首次部署或重建服务

服务不存在时，钩子会返回 `404 service philoart-web_web not found`。这时要在东京机上手动执行一次：

```bash
ssh tokyo
sudo sh -c 'IMAGE=ghcr.io/philo-li/philoart-web:<sha> docker stack deploy --with-registry-auth \
  -c /opt/apps/philoart-web/stack.yml philoart-web'
```

修改 `deploy/stack.yml`（路由、内存上限、健康检查等）后，也要先把文件拷到东京机，再重新执行这条命令。push 不会同步栈文件。

### 2.3 回滚

```bash
ssh tokyo
sudo docker service rollback philoart-web_web
```

也可以指定任意一个历史镜像：执行 2.2 的命令，把 `<sha>` 换成要回到的那个提交。东京机每天清理旧镜像，每个仓库只保留最新 3 个；更早的版本会从 GHCR 重新拉取。

## 3. 环境变量

只有 `NEXT_PUBLIC_*`，构建时写进代码，改完必须重新构建。值写在 `deploy.yml` 的 `build-args` 里，都不是机密：

| 变量 | 当前值 | 用途 |
|---|---|---|
| `NEXT_PUBLIC_GRAPHQL_URI` | `https://api.philoart.io/graphql` | 服务端渲染和浏览器共用的 GraphQL 地址 |
| `NEXT_PUBLIC_REST_API` | `https://api.philoart.io/api` | 图片上传（`src/lib/upload.ts`） |
| `NEXT_PUBLIC_SITE_URL` | `https://philoart.io` | SEO 用的站点地址 |

`NEXT_PUBLIC_PHILOART_ADMIN` 没有设置，代码里默认是 `philo`。GA 的 ID（`G-1966J4GV9R`）直接写在 `src/app/layout.tsx` 里，不用另外配置。

workflow 还用到两个 secret，都是迁移时从东京部署钩子服务的环境变量复制过来的：`TOKYO_DEPLOY_HOOK_SECRET` 用于部署钩子签名，`INFRA_ALERT_SECRET` 用于失败告警。

## 4. 开发注意事项

- **GraphQL 分页限制**：API 的 `first` 最大为 30，并且不接受 `after: null`，第一页要直接省略 `after`。超出限制会返回 `BAD_USER_INPUT`。sitemap 之前因为这两点一直是空的（见 9.4）。
- **博客在运行时读 markdown**：`src/lib/blog/engine.ts` 从 `process.cwd()/blog` 读文件，Dockerfile 会把 `blog/` 拷进镜像。新增运行时要读的目录，也要在 Dockerfile 里加上。
- **图片优化**：`next/image` 在容器里用 sharp 处理，`remotePatterns` 允许所有 https 域名。图片优化是这个服务里最吃内存的部分，内存不够时先看这里。
- 本地检查：`npm run build`，然后执行 `node .next/standalone/server.js`。standalone 不包含 `.next/static` 和 `public`，本地直接这样跑样式会丢，线上镜像里已经拷好了。

## 5. 日志与排查

```bash
ssh tokyo
sudo docker service ps philoart-web_web                   # 当前和历史任务状态
sudo docker service logs --since 10m philoart-web_web     # Next 服务日志（含渲染时 API 请求失败）
sudo docker logs --since 10m dokploy-traefik 2>&1 | grep -i philoart   # 路由和证书问题
sudo docker service logs --since 10m philoart_api         # 后端
```

构建失败时看 GitHub Actions 的运行日志：`gh run view <run id> -R Philo-Li/philoart --log-failed`。

不经过 DNS，直接测源站：

```bash
curl -s --resolve philoart.io:443:18.180.139.90 -o /dev/null -w '%{http_code}\n' https://philoart.io/philo
```

检查 sitemap 的条数（迁移时为 461）：

```bash
curl -s https://philoart.io/sitemap.xml | grep -o '<loc>' | wc -l
```

## 6. DNS 与证书

DNS 在 Cloudflare：

| 记录 | 类型 | 值 | Cloudflare 代理 |
|---|---|---|---|
| `philoart.io` | A | `18.180.139.90` | 关（仅 DNS） |
| `api` | A | `18.180.139.90` | 关（迁移前已是这样） |

代理必须关着：Traefik 用 HTTP 验证向 Let's Encrypt 申请和续期证书，Let's Encrypt 必须能直接访问到东京机。

如果服务创建时 DNS 还没指过来，证书签发会失败，而且 Traefik 不会自动重试。DNS 生效后执行一次 `sudo docker service update --force philoart-web_web`，就会重新申请。

要启用 `www`，先在 Cloudflare 加 `www` 的 A 记录（关代理），再参照 tinyimg 的 `deploy/stack.yml`，加上 `www` 路由和 301 跳转中间件，然后重新执行 2.2 的命令。

## 7. 已知限制

- **单点**：官网和 API 在同一台机器上，机器故障时一起不可用。
- **没有 CDN**：页面和图片优化都从东京直接返回，离东京远的访客会慢一些。原图在 `cdn.philoart.io`，不受影响。
- **没有预览环境**：push 到 `main` 即上生产。
- **lockfile 要在 Linux 上验证**：改依赖后在 Linux（容器或 CI）里跑一次 `npm ci`。Windows 上能过，不代表 Docker 里也能过。

## 8. 为什么不放 Cloudflare

迁移时考虑过和 philoli.com 一样，静态构建后部署到 Cloudflare Pages。philoli.com 能这样做，是因为它只在构建时拉 philo 一个人的作品。philoart 是多人上传的平台：静态化以后，新照片要等下次重新构建才能访问，作者和照片信息的修改也不会实时生效。

另一种做法是用 Cloudflare Workers 跑服务端渲染，但需要付费套餐（免费版每次请求只有 10ms CPU），还要单独配置 ISR 缓存和图片优化，而且每次渲染都要跨网络请求东京的 API。最后选了东京 Node：上传后马上能访问，查 API 走本机，也不需要额外费用。

## 9. 迁移记录（2026-11-20）

### 9.1 起因

Vercel 免费额度用完，部署被停用，`philoart.io` 返回 `402 Payment Required`（`DEPLOYMENT_DISABLED`）。后端此前已经在东京，没有受影响。同一天 dopamind、goshipfast、erasebg、speechtype、tinyimg 的官网也因为同样的原因迁到了东京。

### 9.2 做了什么

代码侧（`Philo-Li/philoart` 仓库）：

| 提交 | 内容 |
|---|---|
| `0cf3f25` | 修复 sitemap：每页条数从 100 改为 30，第一页不传 `after`，并加上 `revalidate = 3600`（原来只在构建时生成一次） |
| `3575d53` | `next.config.ts` 加 `output: "standalone"`；新增 `Dockerfile`、`.dockerignore`、`deploy/stack.yml`、`.github/workflows/deploy.yml` |

仓库里原有的 `wrangler.toml` 和 `pages:build`（`@cloudflare/next-on-pages`）是之前尝试 Cloudflare 留下的，现在不再使用，也没有删除。

基础设施侧：

1. 把东京部署钩子的 `HOOK_SECRET`、`ALERT_SECRET` 直接写进仓库 secret，全程没有在终端输出。
2. 在东京机上用临时容器构建并测试镜像：各页面、照片页的 OG 标签、sitemap 和图片优化都正常。
3. 在东京机新建 `/opt/apps/philoart-web/`，放好 `stack.yml`，先用测试镜像创建服务。随后 push，workflow 构建正式镜像，通过部署钩子替换掉测试镜像，第一次运行就成功了。
4. 用户在 Cloudflare 把 `philoart.io` 从 Vercel 的 `216.198.79.1` 改成 A 记录 `18.180.139.90`，并关闭代理。
5. 执行 `docker service update --force`，Traefik 签发了证书，有效期到 2027-02-18，之后自动续期。

东京机上原有的服务和部署钩子都没有改动。

### 9.3 上线验证

- 证书由 Let's Encrypt 签发且校验通过；`http://` 301 跳到 `https://`。
- `/`、`/discover`、`/artists`、`/about`、`/faq`、`/license`、`/blog`、`/philo`、`/signin`、`/create`、`/search`、`/robots.txt` 都返回 200。
- 照片页的 `<title>` 是照片标题，`og:image` 指向 `cdn.philoart.io`；作者页的 `<title>` 是作者名。
- `sitemap.xml` 有 461 个地址（402 张照片、16 个合集、全部作者和固定页面）。
- `/_next/image` 返回优化后的 `image/jpeg`。
- API 对 `Origin: https://philoart.io` 的预检返回 204 和 `Access-Control-Allow-Origin: https://philoart.io`。

### 9.4 踩过的坑

- **sitemap 在 Vercel 上一直是空的**：`fetchAllPages` 每页请求 100 条，超过了 API 的上限 30；第一页还传了 `after: null`，同样会被拒绝。错误被 `catch` 吞掉，结果 sitemap 只剩 9 个固定页面，搜索引擎拿不到照片列表。迁移时用临时容器检查 sitemap 条数，才发现这个问题。
- **本机 DNS 缓存**：DNS 改完后 1.1.1.1 和 8.8.8.8 很快就返回了新 IP，但 Windows 本机缓存里还是 Vercel 的地址，打开网站仍是 402。用 `curl --resolve` 直连源站验证，或者执行 `ipconfig /flushdns`。

### 9.5 遗留事项

- 登录、上传和编辑资料没有在浏览器里实测。登录状态存在 localStorage，前端域名没变，API 的 CORS 也已确认，理论上不受影响。
- 访问不存在的作者页（如 `/nope-user-xyz`）会显示 "User Not Found"，但返回的是 200 而不是 404。这个问题迁移前就有，这次没有处理。
- Vercel 上的项目已经没有流量，可以删除。
- `wrangler.toml` 和 `pages:build` 脚本已经用不上了，需要时可以清理掉。
- krahs-server 仓库的 `infra/tokyo/README.md`（整机服务清单）还没有加上 `philoart-web`。
