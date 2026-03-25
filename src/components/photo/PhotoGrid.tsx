"use client";

import { Photo } from "@/types";
import PhotoCard from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  onLike?: (photo: Photo) => void;
  onDownload?: (photo: Photo) => void;
}

export default function PhotoGrid({
  photos,
  loading,
  hasNextPage,
  onLoadMore,
  onLike,
  onDownload,
}: PhotoGridProps) {
  if (!photos.length && loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!photos.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No photos found
      </div>
    );
  }

  return (
    <div>
      {/* Masonry-like grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-1.5 space-y-1.5">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <PhotoCard
              photo={photo}
              onLike={onLike}
              onDownload={onDownload}
            />
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
