"use client";

import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";

export default function HomeContent() {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { photos, loading, hasNextPage, fetchMore } = usePhotos({
    first: 20,
    checkUserLike: userId || undefined,
    checkUserCollect: userId || undefined,
  });

  const handleLike = async (photo: { id: string }) => {
    // TODO: Implement like functionality
    console.log("Like photo:", photo.id);
  };

  const handleDownload = async (photo: { id: string }) => {
    // TODO: Implement download tracking
    console.log("Download photo:", photo.id);
  };

  return (
    <PhotoGrid
      photos={photos}
      loading={loading}
      hasNextPage={hasNextPage}
      onLoadMore={fetchMore}
      onLike={handleLike}
      onDownload={handleDownload}
    />
  );
}
