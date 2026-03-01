import { Metadata } from "next";

export const metadata: Metadata = {
  title: "License",
  description: "Learn about the licenses available for artworks on PhiloArt",
};

export default function LicensePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">License Information</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          PhiloArt supports various licensing options for artworks. Artists can choose
          how they want their work to be used.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Available Licenses</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free to Use</h3>
            <p className="text-gray-600">
              Artworks marked as &quot;Free to Use&quot; can be used for personal and commercial
              purposes without attribution required, unless specified by the artist.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creative Commons</h3>
            <p className="text-gray-600 mb-4">
              We support various Creative Commons licenses:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>CC0</strong> - Public Domain, no restrictions</li>
              <li><strong>CC BY</strong> - Attribution required</li>
              <li><strong>CC BY-SA</strong> - Attribution + Share Alike</li>
              <li><strong>CC BY-NC</strong> - Attribution + Non-Commercial</li>
              <li><strong>CC BY-ND</strong> - Attribution + No Derivatives</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Rights Reserved</h3>
            <p className="text-gray-600">
              The artist retains all rights. Contact the artist for permission to use.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Notes</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Always check the specific license on each artwork before use</li>
          <li>When in doubt, contact the artist directly</li>
          <li>Respect the terms of the license you agree to</li>
          <li>Commercial use may require additional permissions</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Questions?</h2>
        <p className="text-gray-600">
          If you have questions about licensing, please visit our{" "}
          <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.
        </p>
      </div>
    </div>
  );
}
