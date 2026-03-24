# Blog System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a file-based MDX blog system to PhiloArt with 11-language support, category filtering, and related posts.

**Architecture:** MDX files in `blog/{locale}/` directories, loaded at build time by a custom engine. Server-side MDX rendering via `next-mdx-remote/rsc`. Two route groups: `/blog` (English default) and `/[locale]/blog` (other languages). Simple JSON translation files, no i18next.

**Tech Stack:** Next.js 15, next-mdx-remote, remark-gfm, TypeScript, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-24-blog-system-design.md`

---

## Chunk 1: Foundation (types, engine, translations, dependencies)

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install npm packages**

```bash
cd philoart && npm install next-mdx-remote remark-gfm remark
```

- [ ] **Step 2: Verify installation**

```bash
cd philoart && node -e "require('next-mdx-remote'); require('remark-gfm'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add next-mdx-remote, remark-gfm, remark for blog system"
```

---

### Task 2: Create blog types

**Files:**
- Create: `src/lib/blog/types.ts`

- [ ] **Step 1: Create types file**

```typescript
// src/lib/blog/types.ts
export interface BlogMeta {
  title: string;
  description?: string;
  seoDescription?: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogMeta;
  content: string;
}

export interface BlogListItem {
  slug: string;
  title: string;
  description?: string;
  seoDescription?: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  coverImage?: string;
}

export interface BlogSiteData {
  posts: Record<string, BlogPost>;
  postsList: BlogListItem[];
  blogTitle: string;
  blogDescription: string;
  blogSeoDescription: string;
}

export interface BlogTranslations {
  blogTitle: string;
  blogDescription: string;
  blogSeoDescription: string;
  categories: string;
  allPosts: string;
  relatedPosts: string;
  categoryNames: Record<string, string>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/blog/types.ts
git commit -m "feat(blog): add TypeScript type definitions"
```

---

### Task 3: Create translation files

**Files:**
- Create: `src/lib/blog/translations/en.json`
- Create: `src/lib/blog/translations/zh.json`
- Create: `src/lib/blog/translations/ja.json`
- Create: `src/lib/blog/translations/zh-TW.json`
- Create: `src/lib/blog/translations/de.json`
- Create: `src/lib/blog/translations/fr.json`
- Create: `src/lib/blog/translations/ko.json`
- Create: `src/lib/blog/translations/es.json`
- Create: `src/lib/blog/translations/it.json`
- Create: `src/lib/blog/translations/vi.json`

- [ ] **Step 1: Create English translation (base)**

```json
{
  "blogTitle": "PhiloArt Blog",
  "blogDescription": "Photography, art, and creative stories",
  "blogSeoDescription": "Photography tips, art insights, creative tutorials, and stories from PhiloArt — a platform for artists and photographers.",
  "categories": "Categories",
  "allPosts": "All Posts",
  "relatedPosts": "Related Posts",
  "categoryNames": {
    "Photography": "Photography",
    "Art & Culture": "Art & Culture",
    "Tutorial": "Tutorial",
    "News & Updates": "News & Updates"
  }
}
```

- [ ] **Step 2: Create Chinese translation**

```json
{
  "blogTitle": "PhiloArt 博客",
  "blogDescription": "摄影、艺术与创作故事",
  "blogSeoDescription": "摄影技巧、艺术洞见、创意教程，以及来自 PhiloArt 的故事——一个面向艺术家和摄影师的平台。",
  "categories": "分类",
  "allPosts": "全部文章",
  "relatedPosts": "相关文章",
  "categoryNames": {
    "Photography": "摄影",
    "Art & Culture": "艺术与文化",
    "Tutorial": "教程",
    "News & Updates": "新闻动态"
  }
}
```

- [ ] **Step 3: Create Japanese translation**

```json
{
  "blogTitle": "PhiloArt ブログ",
  "blogDescription": "写真、アート、クリエイティブなストーリー",
  "blogSeoDescription": "写真のヒント、アートの洞察、クリエイティブなチュートリアル、PhiloArtからのストーリー。",
  "categories": "カテゴリー",
  "allPosts": "すべての記事",
  "relatedPosts": "関連記事",
  "categoryNames": {
    "Photography": "写真",
    "Art & Culture": "アート＆カルチャー",
    "Tutorial": "チュートリアル",
    "News & Updates": "ニュース"
  }
}
```

- [ ] **Step 4: Create remaining 7 translation files**

Create `zh-TW.json`, `de.json`, `fr.json`, `ko.json`, `es.json`, `it.json`, `vi.json` with the same structure, translated into each language. Follow the exact same JSON shape as `en.json`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/blog/translations/
git commit -m "feat(blog): add translation files for 11 languages"
```

---

### Task 4: Create blog engine

**Files:**
- Create: `src/lib/blog/engine.ts`

- [ ] **Step 1: Create engine.ts**

Adapt from dopamind's `blog-site.ts`. Key differences:
- Replace `getLandingTranslation()` with local JSON loading
- Remove `backToSite` field
- Keep all file discovery, frontmatter parsing, and sorting logic identical

```typescript
// src/lib/blog/engine.ts
import fs from "node:fs";
import path from "node:path";
import type {
  BlogMeta,
  BlogPost,
  BlogListItem,
  BlogSiteData,
  BlogTranslations,
} from "./types";

const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);

const SUPPORTED_LOCALES = [
  "en", "zh", "ja", "zh-TW", "de", "fr", "ko", "es", "it", "vi",
];

// Cache translations in memory
const translationCache = new Map<string, BlogTranslations>();

function loadTranslations(locale: string): BlogTranslations {
  const cached = translationCache.get(locale);
  if (cached) return cached;

  const filePath = path.join(
    process.cwd(),
    "src/lib/blog/translations",
    `${locale}.json`
  );

  let translations: BlogTranslations;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    translations = JSON.parse(raw);
  } catch {
    // Fallback to English
    if (locale !== "en") {
      return loadTranslations("en");
    }
    translations = {
      blogTitle: "PhiloArt Blog",
      blogDescription: "Photography, art, and creative stories",
      blogSeoDescription: "Photography, art, and creative stories from PhiloArt",
      categories: "Categories",
      allPosts: "All Posts",
      relatedPosts: "Related Posts",
      categoryNames: {},
    };
  }

  translationCache.set(locale, translations);
  return translations;
}

function getBlogRoot(locale: string): string {
  const centralizedPath = path.join(process.cwd(), "blog", locale);
  if (fs.existsSync(centralizedPath)) {
    return centralizedPath;
  }

  // Fallback to English
  if (locale !== "en") {
    const enPath = path.join(process.cwd(), "blog", "en");
    if (fs.existsSync(enPath)) {
      return enPath;
    }
  }

  return path.join(process.cwd(), "blog");
}

function isMarkdownFile(fileName: string) {
  return MARKDOWN_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function removeExtension(fileName: string) {
  return fileName.slice(0, -path.extname(fileName).length);
}

interface FrontMatterResult {
  data: Record<string, string>;
  content: string;
}

function parseFrontMatter(source: string): FrontMatterResult {
  const lines = source.split(/\r?\n/);
  if (lines.length === 0 || lines[0].trim() !== "---") {
    return { data: {}, content: source.trim() };
  }

  let closingIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    return { data: {}, content: source.trim() };
  }

  const data: Record<string, string> = {};
  const frontMatterLines = lines.slice(1, closingIndex);
  for (const line of frontMatterLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key.length === 0) continue;
    data[key] = value.replace(/^['"]|['"]$/g, "");
  }

  const content = lines.slice(closingIndex + 1).join("\n").trim();
  return { data, content };
}

function parseTagsArray(tagsString?: string): string[] {
  if (!tagsString) return [];
  const trimmed = tagsString.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  if (trimmed.startsWith('["')) {
    try { return JSON.parse(trimmed); } catch { return []; }
  }

  return trimmed.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function loadBlogPost(filePath: string, slug: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontMatter(raw);

  if (slug === "index") return null;

  const meta: BlogMeta = {
    title: data.title || slug,
    description: data.description,
    seoDescription: data.seoDescription,
    date: data.date,
    author: data.author,
    tags: parseTagsArray(data.tags),
    category: data.category,
    coverImage: data.coverImage,
  };

  return { slug, meta, content };
}

function loadBlogPosts(blogRoot: string): BlogPost[] {
  if (!fs.existsSync(blogRoot)) return [];

  const posts: BlogPost[] = [];
  const entries = fs.readdirSync(blogRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;
    const slug = removeExtension(entry.name);
    const post = loadBlogPost(path.join(blogRoot, entry.name), slug);
    if (post) posts.push(post);
  }

  return posts;
}

function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    if (!a.meta.date) return 1;
    if (!b.meta.date) return -1;
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
}

function buildPostsRecord(posts: BlogPost[]): Record<string, BlogPost> {
  return posts.reduce<Record<string, BlogPost>>((acc, post) => {
    acc[post.slug] = post;
    return acc;
  }, {});
}

function buildPostsList(posts: BlogPost[]): BlogListItem[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.meta.title,
    description: post.meta.description,
    seoDescription: post.meta.seoDescription,
    date: post.meta.date,
    author: post.meta.author,
    tags: post.meta.tags,
    category: post.meta.category,
    coverImage: post.meta.coverImage,
  }));
}

export function buildBlogSite(locale: string): BlogSiteData {
  const t = loadTranslations(locale);
  const blogRoot = getBlogRoot(locale);
  const posts = loadBlogPosts(blogRoot);
  const sortedPosts = sortPostsByDate(posts);

  return {
    posts: buildPostsRecord(sortedPosts),
    postsList: buildPostsList(sortedPosts),
    blogTitle: t.blogTitle,
    blogDescription: t.blogDescription,
    blogSeoDescription: t.blogSeoDescription,
  };
}

export function getBlogTranslations(locale: string): BlogTranslations {
  return loadTranslations(locale);
}

export { SUPPORTED_LOCALES };
```

- [ ] **Step 2: Type check**

```bash
cd philoart && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/blog/engine.ts
git commit -m "feat(blog): add blog engine with file discovery, frontmatter parsing, and i18n"
```

---

### Task 5: Create blog utility functions

**Files:**
- Create: `src/lib/blog/utils.ts`

- [ ] **Step 1: Create utils.ts**

```typescript
// src/lib/blog/utils.ts
import { SUPPORTED_LOCALES } from "./engine";

export function resolveBlogHref(locale: string, slug?: string): string {
  const base = locale === "en" ? "/blog" : `/${locale}/blog`;
  return slug ? `${base}/${slug}` : base;
}

export function normalizeBlogPath(pathname: string): string {
  if (pathname.endsWith("/") && pathname.length > 1) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function isValidBlogLocale(locale: string): boolean {
  return SUPPORTED_LOCALES.includes(locale);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/blog/utils.ts
git commit -m "feat(blog): add blog URL utility functions"
```

---

## Chunk 2: Components (BlogList, BlogArticle, RelatedPosts, BlogCTA)

### Task 6: Create BlogCTA component

**Files:**
- Create: `src/components/blog/BlogCTA.tsx`

- [ ] **Step 1: Create BlogCTA.tsx**

```typescript
// src/components/blog/BlogCTA.tsx
interface BlogCTAProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function BlogCTA({
  title,
  description,
  buttonText,
  href,
}: BlogCTAProps) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 text-center">
      <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <a
        href={href}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 font-bold rounded-full hover:bg-blue-700 transition-colors no-underline"
        style={{ color: "#ffffff", textDecoration: "none" }}
      >
        {buttonText}
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/BlogCTA.tsx
git commit -m "feat(blog): add BlogCTA component"
```

---

### Task 7: Create RelatedPosts component

**Files:**
- Create: `src/components/blog/RelatedPosts.tsx`

- [ ] **Step 1: Create RelatedPosts.tsx**

Adapt from dopamind version. Replace `lucide-react` Calendar icon with bootstrap icon (project already uses bootstrap-icons). Replace `marketing-*` Tailwind classes with standard gray/neutral classes.

```typescript
// src/components/blog/RelatedPosts.tsx
import Link from "next/link";
import Image from "next/image";
import type { BlogListItem } from "@/lib/blog/types";
import { resolveBlogHref } from "@/lib/blog/utils";

interface RelatedPostsProps {
  currentSlug: string;
  currentTags?: string[];
  currentCategory?: string;
  allPosts: BlogListItem[];
  locale: string;
  title?: string;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function getRelatedPosts(
  currentSlug: string,
  currentTags: string[] | undefined,
  currentCategory: string | undefined,
  allPosts: BlogListItem[],
  limit = 3
): BlogListItem[] {
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  if (currentCategory) {
    const sameCategory = otherPosts.filter(
      (post) => post.category === currentCategory
    );
    if (sameCategory.length > 0) return sameCategory.slice(0, limit);
  }

  if (!currentTags || currentTags.length === 0) {
    return otherPosts.slice(0, limit);
  }

  const scoredPosts = otherPosts.map((post) => {
    const sharedTags = currentTags.filter((tag) =>
      (post.tags || []).includes(tag)
    );
    return { post, score: sharedTags.length };
  });

  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    if (a.post.date && b.post.date)
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    return 0;
  });

  return scoredPosts.slice(0, limit).map((item) => item.post);
}

export default function RelatedPosts({
  currentSlug,
  currentTags,
  currentCategory,
  allPosts,
  locale,
  title = "Related Posts",
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(
    currentSlug, currentTags, currentCategory, allPosts
  );

  if (relatedPosts.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={resolveBlogHref(locale, post.slug)}
              className="group block"
            >
              <article className="h-full bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 overflow-hidden flex flex-row md:flex-col">
                {post.coverImage && (
                  <div className="relative overflow-hidden aspect-square w-24 shrink-0 md:w-full md:aspect-[16/9]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 96px, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-3 md:p-5 flex flex-col justify-center min-w-0">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  {post.date && (
                    <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <i className="bi bi-calendar3 text-xs" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blog/RelatedPosts.tsx
git commit -m "feat(blog): add RelatedPosts component"
```

---

### Task 8: Create BlogArticle component

**Files:**
- Create: `src/components/blog/BlogArticle.tsx`

- [ ] **Step 1: Create BlogArticle.tsx**

Adapt from dopamind version. Key changes:
- Replace `lucide-react` icons with `bootstrap-icons`
- Replace `marketing-*` classes with standard Tailwind
- Remove `CodeBlock` dependency — use simple `<pre><code>` styling
- Remove `copyLabel`/`copiedLabel` props (no CodeBlock)

```typescript
// src/components/blog/BlogArticle.tsx
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import type { BlogPost, BlogListItem } from "@/lib/blog/types";
import BlogCTA from "./BlogCTA";
import RelatedPosts from "./RelatedPosts";

interface BlogArticleProps {
  post: BlogPost;
  allPosts?: BlogListItem[];
  locale: string;
  relatedPostsTitle?: string;
}

function nodeText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (typeof children === "number") return children.toString();
  if (children && typeof children === "object" && "props" in children) {
    return nodeText((children as any).props.children);
  }
  return "";
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

const markdownComponents = {
  BlogCTA,
  h2: ({ children, ...props }: any) => {
    const id = props.id ?? slugifyHeading(nodeText(children));
    return (
      <h2 id={id} className="text-3xl font-bold text-gray-900 scroll-mt-24 mt-12 mb-4" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = props.id ?? slugifyHeading(nodeText(children));
    return (
      <h3 id={id} className="text-2xl font-semibold text-gray-900 scroll-mt-24 mt-8 mb-3" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: any) => (
    <p className="text-base leading-relaxed text-gray-600 mb-6" {...props}>{children}</p>
  ),
  a: ({ children, href, className, style, ...props }: any) => {
    const hasCustomStyling = style || className;
    return (
      <a
        className={hasCustomStyling ? className : "font-medium text-blue-600 underline decoration-blue-300 underline-offset-4 hover:text-blue-800"}
        style={style}
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc space-y-2 pl-6 text-base text-gray-600 mb-6" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal space-y-2 pl-6 text-base text-gray-600 mb-6" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-300 pl-6 text-gray-600 italic my-6" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm my-6" {...props}>
      <table className="min-w-full divide-y divide-gray-200 text-base">{children}</table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50 uppercase tracking-wide text-sm text-gray-500" {...props}>{children}</thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-4 py-3 text-left font-semibold" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-4 py-3 text-gray-600 align-top" {...props}>{children}</td>
  ),
  code: ({ children, className, ...props }: any) => {
    const content = Array.isArray(children) ? children.join("") : (children ?? "");
    const normalized = typeof content === "string" ? content.replace(/\n$/, "") : "";
    if (className?.includes("language-")) {
      return (
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6">
          <code className={`text-sm font-mono ${className}`}>{normalized}</code>
        </pre>
      );
    }
    return (
      <code className="rounded-md bg-gray-100 px-2 py-1 text-sm font-mono text-gray-900" {...props}>
        {content}
      </code>
    );
  },
};

export default function BlogArticle({
  post,
  allPosts,
  locale,
  relatedPostsTitle,
}: BlogArticleProps) {
  return (
    <>
      <article className="w-full bg-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-4xl">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              {post.meta.title}
            </h1>
            {post.meta.description && (
              <p className="text-xl text-gray-500 mb-6">{post.meta.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {post.meta.date && (
                <div className="flex items-center gap-2">
                  <i className="bi bi-calendar3" />
                  <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                </div>
              )}
              {post.meta.author && (
                <div className="flex items-center gap-2">
                  <i className="bi bi-person" />
                  <span>{post.meta.author}</span>
                </div>
              )}
            </div>
          </header>

          {post.meta.coverImage && (
            <div className="mb-12 rounded-xl overflow-hidden relative w-full aspect-[2/1]">
              <Image
                src={post.meta.coverImage}
                alt={post.meta.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={post.content}
              components={markdownComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              {post.meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {allPosts && allPosts.length > 1 && (
        <RelatedPosts
          currentSlug={post.slug}
          currentTags={post.meta.tags}
          currentCategory={post.meta.category}
          allPosts={allPosts}
          locale={locale}
          title={relatedPostsTitle}
        />
      )}
    </>
  );
}
```

- [ ] **Step 2: Type check**

```bash
cd philoart && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/BlogArticle.tsx
git commit -m "feat(blog): add BlogArticle component with MDX rendering"
```

---

### Task 9: Create BlogList component

**Files:**
- Create: `src/components/blog/BlogList.tsx`

- [ ] **Step 1: Create BlogList.tsx**

Adapt from dopamind. Replace `lucide-react` icons with bootstrap-icons. Replace `marketing-*` classes.

```typescript
// src/components/blog/BlogList.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogListItem } from "@/lib/blog/types";
import { resolveBlogHref } from "@/lib/blog/utils";

interface BlogListProps {
  posts: BlogListItem[];
  locale: string;
  title: string;
  description: string;
  categoriesLabel: string;
  allPostsLabel: string;
  categoryNames?: Record<string, string>;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export default function BlogList({
  posts,
  locale,
  title,
  description,
  categoriesLabel,
  allPostsLabel,
  categoryNames = {},
}: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryDisplayName = (key: string) => categoryNames[key] || key;

  const categoriesWithCount = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((post) => {
      if (post.category) {
        map.set(post.category, (map.get(post.category) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center md:px-6 py-16 md:py-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-500 md:text-xl max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Posts with Sidebar */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              {categoriesWithCount.length > 0 && (
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="sticky top-24">
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <i className="bi bi-folder text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                          {categoriesLabel}
                        </h2>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                            selectedCategory === null
                              ? "bg-blue-600 text-white font-medium"
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{allPostsLabel}</span>
                            <span className={`text-sm ${selectedCategory === null ? "text-white/80" : "text-gray-400"}`}>
                              {posts.length}
                            </span>
                          </div>
                        </button>
                        {categoriesWithCount.map(({ name, count }) => (
                          <button
                            key={name}
                            onClick={() => setSelectedCategory(name)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                              selectedCategory === name
                                ? "bg-blue-600 text-white font-medium"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{getCategoryDisplayName(name)}</span>
                              <span className={`text-sm ml-2 flex-shrink-0 ${selectedCategory === name ? "text-white/80" : "text-gray-400"}`}>
                                {count}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              )}

              {/* Posts Grid */}
              <div className="flex-1 min-w-0">
                {selectedCategory && (
                  <div className="mb-6 flex items-center gap-3">
                    <span className="inline-block px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-full">
                      {getCategoryDisplayName(selectedCategory)}
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-gray-500 hover:text-gray-900 underline"
                    >
                      &times;
                    </button>
                  </div>
                )}

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">
                      {selectedCategory
                        ? `No posts found in "${getCategoryDisplayName(selectedCategory)}"`
                        : "No blog posts available yet. Check back soon!"}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {filteredPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={resolveBlogHref(locale, post.slug)}
                        className="group block"
                      >
                        <article className="h-full bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 overflow-hidden">
                          {post.coverImage && (
                            <div className="relative overflow-hidden aspect-[1024/500]">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h2>
                            {post.description && (
                              <p className="text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                {post.description}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                              {post.date && (
                                <div className="flex items-center gap-1">
                                  <i className="bi bi-calendar3 text-xs" />
                                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                                </div>
                              )}
                              {post.author && (
                                <div className="flex items-center gap-1">
                                  <i className="bi bi-person text-xs" />
                                  <span>{post.author}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Type check**

```bash
cd philoart && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/BlogList.tsx
git commit -m "feat(blog): add BlogList component with category filtering"
```

---

## Chunk 3: Routes, navigation, and sample content

### Task 10: Create English blog route (default)

**Files:**
- Create: `src/app/blog/[[...slug]]/page.tsx`

- [ ] **Step 1: Create page.tsx**

```typescript
// src/app/blog/[[...slug]]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogList from "@/components/blog/BlogList";
import { buildBlogSite, getBlogTranslations } from "@/lib/blog/engine";

const locale = "en";

interface BlogPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = buildBlogSite(locale);

  if (!slug || slug.length === 0) {
    return {
      title: site.blogTitle,
      description: site.blogSeoDescription,
      openGraph: {
        title: site.blogTitle,
        description: site.blogSeoDescription,
        type: "website",
        locale: "en_US",
        siteName: "PhiloArt",
      },
    };
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  const description = post.meta.seoDescription ?? post.meta.description ?? site.blogDescription;
  return {
    title: post.meta.title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: "article",
      locale: "en_US",
      siteName: "PhiloArt",
      ...(post.meta.coverImage && {
        images: [{ url: post.meta.coverImage, width: 1200, height: 630, alt: post.meta.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description,
      ...(post.meta.coverImage && { images: [post.meta.coverImage] }),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const site = buildBlogSite(locale);
  const t = getBlogTranslations(locale);

  if (!slug || slug.length === 0) {
    return (
      <BlogList
        posts={site.postsList}
        locale={locale}
        title={site.blogTitle}
        description={site.blogDescription}
        categoriesLabel={t.categories}
        allPostsLabel={t.allPosts}
        categoryNames={t.categoryNames}
      />
    );
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  return (
    <BlogArticle
      post={post}
      allPosts={site.postsList}
      locale={locale}
      relatedPostsTitle={t.relatedPosts}
    />
  );
}

export function generateStaticParams() {
  const site = buildBlogSite(locale);
  const slugs = Object.keys(site.posts).map((key) => ({
    slug: key.split("/"),
  }));
  return [{ slug: undefined }, ...slugs];
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/blog/[[...slug]]/page.tsx"
git commit -m "feat(blog): add English blog route"
```

---

### Task 11: Create localized blog route

**Files:**
- Create: `src/app/[locale]/blog/[[...slug]]/page.tsx`

- [ ] **Step 1: Create page.tsx**

```typescript
// src/app/[locale]/blog/[[...slug]]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogList from "@/components/blog/BlogList";
import {
  buildBlogSite,
  getBlogTranslations,
  SUPPORTED_LOCALES,
} from "@/lib/blog/engine";
import { isValidBlogLocale } from "@/lib/blog/utils";

interface LocaleBlogPageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: LocaleBlogPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidBlogLocale(locale)) notFound();

  const site = buildBlogSite(locale);

  if (!slug || slug.length === 0) {
    return {
      title: site.blogTitle,
      description: site.blogSeoDescription,
      openGraph: {
        title: site.blogTitle,
        description: site.blogSeoDescription,
        type: "website",
        siteName: "PhiloArt",
      },
    };
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  const description =
    post.meta.seoDescription ?? post.meta.description ?? site.blogDescription;
  return {
    title: post.meta.title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: "article",
      siteName: "PhiloArt",
      ...(post.meta.coverImage && {
        images: [{ url: post.meta.coverImage, width: 1200, height: 630, alt: post.meta.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description,
      ...(post.meta.coverImage && { images: [post.meta.coverImage] }),
    },
  };
}

export default async function LocaleBlogPage({
  params,
}: LocaleBlogPageProps) {
  const { locale, slug } = await params;
  if (!isValidBlogLocale(locale)) notFound();

  const site = buildBlogSite(locale);
  const t = getBlogTranslations(locale);

  if (!slug || slug.length === 0) {
    return (
      <BlogList
        posts={site.postsList}
        locale={locale}
        title={site.blogTitle}
        description={site.blogDescription}
        categoriesLabel={t.categories}
        allPostsLabel={t.allPosts}
        categoryNames={t.categoryNames}
      />
    );
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  return (
    <BlogArticle
      post={post}
      allPosts={site.postsList}
      locale={locale}
      relatedPostsTitle={t.relatedPosts}
    />
  );
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => {
    const site = buildBlogSite(locale);
    const slugs = Object.keys(site.posts).map((key) => ({
      locale,
      slug: key.split("/"),
    }));
    return [{ locale, slug: undefined }, ...slugs];
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/blog/[[...slug]]/page.tsx"
git commit -m "feat(blog): add localized blog route for all 11 languages"
```

---

### Task 12: Add Blog link to Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add Blog link**

Add `<Link className="navbar-link" href="/blog">Blog</Link>` after the "License" link and before the "GitHub" link in the nav (around line 61).

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(blog): add Blog link to navbar"
```

---

### Task 13: Create sample blog post and blog directories

**Files:**
- Create: `blog/en/welcome-to-philoart.mdx`
- Create: `blog/zh/welcome-to-philoart.mdx`

- [ ] **Step 1: Create blog directories**

```bash
mkdir -p blog/en blog/zh blog/ja blog/zh-TW blog/de blog/fr blog/ko blog/es blog/it blog/vi
mkdir -p public/images/blog
```

- [ ] **Step 2: Create English sample post**

File: `blog/en/welcome-to-philoart.mdx`

```mdx
---
title: Welcome to PhiloArt Blog
date: 2026-03-24
category: News & Updates
description: Introducing the PhiloArt blog — a space for photography, art, and creative stories.
tags: [PhiloArt, Photography, Art, Welcome]
author: Philo
---

Welcome to the PhiloArt blog! This is where we share photography tips, creative stories, and updates about the platform.

## What to Expect

We'll be covering a range of topics:

- **Photography** — Tips, techniques, and behind-the-scenes stories
- **Art & Culture** — Exploring the intersection of art and technology
- **Tutorials** — Step-by-step guides for photographers and artists
- **News & Updates** — Platform updates and community highlights

Stay tuned for more content coming soon!
```

- [ ] **Step 3: Create Chinese sample post**

File: `blog/zh/welcome-to-philoart.mdx`

```mdx
---
title: 欢迎来到 PhiloArt 博客
date: 2026-03-24
category: News & Updates
description: PhiloArt 博客正式上线——一个关于摄影、艺术和创意故事的空间。
tags: [PhiloArt, 摄影, 艺术, 欢迎]
author: Philo
---

欢迎来到 PhiloArt 博客！这里是我们分享摄影技巧、创意故事和平台更新的地方。

## 内容预告

我们将涵盖以下主题：

- **摄影** — 技巧、方法和幕后故事
- **艺术与文化** — 探索艺术与技术的交汇
- **教程** — 面向摄影师和艺术家的分步指南
- **新闻动态** — 平台更新和社区亮点

敬请期待更多精彩内容！
```

- [ ] **Step 4: Commit**

```bash
git add blog/ public/images/blog/
git commit -m "feat(blog): add sample blog posts and directory structure"
```

---

### Task 14: Verify build

- [ ] **Step 1: Type check**

```bash
cd philoart && npx tsc --noEmit
```

- [ ] **Step 2: Build**

```bash
cd philoart && npm run build
```

Verify blog routes are generated in build output.

- [ ] **Step 3: Test dev server**

```bash
cd philoart && npm run dev
```

Visit:
- `http://localhost:3000/blog` — should show blog list with sample post
- `http://localhost:3000/blog/welcome-to-philoart` — should show article
- `http://localhost:3000/zh/blog` — should show Chinese blog list
- `http://localhost:3000/zh/blog/welcome-to-philoart` — should show Chinese article

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(blog): address build issues"
```
