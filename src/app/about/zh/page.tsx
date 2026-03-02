import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About (中文)",
  description: "关于 PhiloArt 平台",
};

export default function AboutZhPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">关于 PhiloArt</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          PhiloArt 是一个面向艺术家、摄影师和设计师的创作平台，帮助创作者展示、管理并发布作品。
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">平台能力</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>上传并展示个人作品</li>
          <li>用收藏夹组织内容</li>
          <li>关注创作者并发现优质作品</li>
          <li>支持多种版权协议</li>
          <li>高质量图片展示体验</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">支持作品类型</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["摄影", "绘画", "数字艺术", "素描"].map((type) => (
            <div key={type} className="bg-gray-100 rounded-lg p-4 text-center">
              <span className="font-medium text-gray-900">{type}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">快速开始</h2>
        <p className="text-gray-600 mb-6">立即创建账号并发布你的第一件作品。</p>

        <div className="flex gap-4 mb-8">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            注册
          </Link>
          <Link
            href="/discover"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
          >
            浏览作品
          </Link>
        </div>

        <p className="text-gray-600">
          切换英文页面：{" "}
          <Link href="/about" className="text-blue-600 hover:underline">
            About (English)
          </Link>
        </p>
      </div>
    </div>
  );
}
