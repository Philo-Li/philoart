import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://cdn.philoart.io/b/1200x1200/ejt2Vbza56UViZTf2vEHY.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share your artworks with the world.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Create, and Post it
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <form action="/search" method="GET" className="flex">
              <input
                type="text"
                name="q"
                placeholder="Search photos..."
                className="flex-1 px-6 py-4 rounded-l-lg text-gray-900 text-lg focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-r-lg font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto py-4 gap-6">
            {["Free to Use", "Photograph", "Painting", "Digital Art", "Drawing"].map((category) => (
              <a
                key={category}
                href={`/search?type=${encodeURIComponent(category)}`}
                className="whitespace-nowrap text-gray-600 hover:text-gray-900 font-medium"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Artworks</h2>
        <Suspense fallback={<PhotoGridSkeleton />}>
          <HomeContent />
        </Suspense>
      </section>
    </div>
  );
}

function PhotoGridSkeleton() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="break-inside-avoid bg-gray-200 rounded-lg animate-pulse"
          style={{ height: `${200 + Math.random() * 200}px` }}
        />
      ))}
    </div>
  );
}
