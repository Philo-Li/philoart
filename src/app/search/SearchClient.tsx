"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";

interface Props {
  initialQuery: string;
  initialType: string;
}

const TYPES = ["All", "Photograph", "Painting", "Digital Art", "Drawing", "Free to Use"];

export default function SearchClient({ initialQuery, initialType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState(initialType || "All");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // Build search keyword
  const searchKeyword = query || (selectedType !== "All" ? selectedType : "");

  const { photos, loading, hasNextPage, fetchMore, totalCount } = usePhotos({
    searchKeyword: searchKeyword || undefined,
    first: 20,
    checkUserLike: userId || undefined,
    checkUserCollect: userId || undefined,
  });

  // Update URL when search params change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedType && selectedType !== "All") params.set("type", selectedType);

    const newUrl = params.toString() ? `/search?${params.toString()}` : "/search";
    router.replace(newUrl, { scroll: false });
  }, [query, selectedType, router]);

  // Sync with URL params
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "All";
    setQuery(q);
    setSelectedType(type);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-gray-600">
        {loading ? (
          "Searching..."
        ) : (
          <>
            {totalCount} {totalCount === 1 ? "result" : "results"}
            {searchKeyword && ` for "${searchKeyword}"`}
          </>
        )}
      </div>

      {/* Results */}
      <PhotoGrid
        photos={photos}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={fetchMore}
      />
    </div>
  );
}
