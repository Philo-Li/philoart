import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "License (中文)",
  description: "PhiloArt 作品授权说明（中文）",
};

export default function LicenseZhPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">授权协议说明</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          PhiloArt 支持多种授权协议，创作者可以为每件作品设置不同使用权限。
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">可选协议</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free to Use</h3>
            <p className="text-gray-600">
              标记为 Free to Use 的作品可在许可范围内免费使用，具体以作品详情页标注为准。
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creative Commons</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>CC0</strong> - 公共领域，无需署名
              </li>
              <li>
                <strong>CC BY</strong> - 需署名
              </li>
              <li>
                <strong>CC BY-SA</strong> - 需署名，衍生作品相同方式共享
              </li>
              <li>
                <strong>CC BY-NC</strong> - 需署名，禁止商用
              </li>
              <li>
                <strong>CC BY-ND</strong> - 需署名，禁止演绎
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Rights Reserved</h3>
            <p className="text-gray-600">创作者保留全部权利，使用前请先联系作者获取授权。</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">使用提醒</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>使用前请先确认具体作品的授权类型</li>
          <li>不确定时请联系作者确认</li>
          <li>请遵守协议中的署名与商用限制</li>
        </ul>

        <p className="text-gray-600 mt-8">
          切换英文页面：{" "}
          <Link href="/license" className="text-blue-600 hover:underline">
            License (English)
          </Link>
        </p>
      </div>
    </div>
  );
}
