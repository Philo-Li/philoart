"use client";

import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";

export default function DiscoverPage() {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { photos, loading, hasNextPage, fetchMore } = usePhotos({
    first: 24,
    checkUserLike: userId || undefined,
    checkUserCollect: userId || undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover</h1>
      <p className="text-gray-600 mb-8">Explore amazing artworks from talented creators</p>

      <PhotoGrid
        photos={photos}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={fetchMore}
      />
    </div>
  );
}
