import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about PhiloArt - a platform for artists to showcase their work",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About PhiloArt</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          PhiloArt is a platform for artists, photographers, and designers to showcase,
          manage, and publish their work to the world.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We believe that art should be accessible to everyone. Our mission is to provide
          a beautiful, easy-to-use platform where creators can share their work and connect
          with art lovers from around the world.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Upload and showcase your artworks</li>
          <li>Organize your work into collections</li>
          <li>Connect with other artists and art enthusiasts</li>
          <li>Flexible licensing options including Creative Commons</li>
          <li>High-quality image hosting and optimization</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Supported Artwork Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["Photograph", "Painting", "Digital Art", "Drawing"].map((type) => (
            <div key={type} className="bg-gray-100 rounded-lg p-4 text-center">
              <span className="font-medium text-gray-900">{type}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Ready to share your art with the world?
        </p>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Create Account
          </Link>
          <Link
            href="/discover"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
          >
            Explore Artworks
          </Link>
        </div>
      </div>
    </div>
  );
}
