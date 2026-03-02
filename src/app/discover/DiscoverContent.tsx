"use client";

import { useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PHOTOS } from "@/graphql/queries";
import { PhotoGrid } from "@/components/photo";
import type { Photo, PageInfo, Connection } from "@/types";

interface DiscoverContentProps {
  initialPhotos: Photo[];
  initialPageInfo: PageInfo | null;
}

interface PhotosData {
  photos: Connection<Photo>;
}

export default function DiscoverContent({ initialPhotos, initialPageInfo }: DiscoverContentProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(initialPageInfo);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [fetchMorePhotos, { loading }] = useLazyQuery<PhotosData>(GET_PHOTOS, {
    onCompleted: (data) => {
      if (data?.photos) {
        const newPhotos = data.photos.edges.map((edge) => edge.node);
        setPhotos((prev) => [...prev, ...newPhotos]);
        setPageInfo(data.photos.pageInfo);
      }
    },
  });

  const handleLoadMore = useCallback(() => {
    if (loading || !pageInfo?.hasNextPage) return;

    fetchMorePhotos({
      variables: {
        first: 24,
        after: pageInfo.endCursor,
        checkUserLike: userId || undefined,
        checkUserCollect: userId || undefined,
      },
    });
  }, [loading, pageInfo, fetchMorePhotos, userId]);

  return (
    <PhotoGrid
      photos={photos}
      loading={loading}
      hasNextPage={pageInfo?.hasNextPage ?? false}
      onLoadMore={handleLoadMore}
    />
  );
}
