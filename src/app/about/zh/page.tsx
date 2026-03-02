import { Metadata } from "next";
import Link from "next/link";
import aboutImg4 from "../../img/aboutImg4.jpg";

export const metadata: Metadata = {
  title: "About (中文)",
  description: "关于 PhiloArt",
};

const img1 =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80";
const img2 =
  "https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
const img3 =
  "https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80";

export default function AboutZhPage() {
  return (
    <div className="about">
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">关于 PhiloArt</h1>
        </div>
        <Link href="/about" className="col-item-3">
          English
        </Link>
      </div>

      <div className="container-col-about">
        <h1 className="subheader">PhiloArt - 为创作者而生！</h1>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">出色的个人艺术作品站+高质量图库</h1>
        <h3 className="subheader2">帮助你更便捷地发布和管理自己的作品</h3>
        <h3 className="subheader2">以及更快地获取最优秀的免费版权图片</h3>
      </div>

      <div className="container-row-about p-3">
        <div className="container-col-about-item p-3">
          <img src={img2} width="100%" alt="about" />
        </div>
        <div className="container-col-about-item p-3">
          <h2 className="subheader">PhiloArt 可以做什么?</h2>
          <p><i className="bi bi-download icon-check" /> 上传、管理并且以丰富的协议发布你的作品</p>
          <p><i className="bi bi-search icon-check" /> 发现和关注喜欢的艺术家，获取即时动态</p>
          <p><i className="bi bi-heart icon-check" /> 发现、搜索和免费下载高品质免费版权图片</p>
          <p><i className="bi bi-plus-square icon-check" /> 点赞你喜欢的图片并创建专属收藏夹</p>
        </div>
      </div>

      <div className="container-about-row-reverse p-3">
        <div className="container-col-about-item p-3">
          <img src={img3} width="100%" alt="about" />
        </div>
        <div className="container-col-about-item p-3">
          <h2 className="subheader">谁需要 PhiloArt?</h2>
          <p><i className="bi bi-palette icon-check" /> 艺术家</p>
          <p><i className="bi bi-camera icon-check" /> 摄影师</p>
          <p><i className="bi bi-pencil icon-check" /> 创作者</p>
          <p><i className="bi bi-shop icon-check" /> 设计师</p>
          <p><i className="bi bi-emoji-sunglasses icon-check" /> ...还有你</p>
        </div>
      </div>

      <div className="container-row-about p-3">
        <div className="container-col-about-item p-3">
          <img src={aboutImg4.src} width="100%" alt="about" />
        </div>
        <div className="container-col-about-item p-3">
          <h2 className="subheader">为什么选择 PhiloArt?</h2>
          <p><i className="bi bi-check2 icon-check" /> 方便快捷地以多种协议发布和管理你的作品</p>
          <p><i className="bi bi-check2 icon-check" /> 发现更多优秀的作品及免费版权作品</p>
          <p><i className="bi bi-check2 icon-check" /> 关注喜欢的艺术家</p>
          <p><i className="bi bi-check2 icon-check" /> 鼓励创作、激发灵感和提升创造力</p>
        </div>
      </div>

      <div className="p-3 container-about-row">
        <img src={img1} width="100%" alt="about" />
      </div>

      <div className="container-col-login">
        <div className="col-item-3 licence-msg text-1rem">
          <p>如果你有任何疑问或建议，可以发送邮件到 philoart42@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}
