"use client";

import { useState, useCallback, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PHOTOS } from "@/graphql/queries";
import { LIKE_PHOTO, UNLIKE_PHOTO, DOWNLOAD_PHOTO } from "@/graphql/mutations";
import { PhotoGrid } from "@/components/photo";
import type { Photo, PageInfo, Connection } from "@/types";

interface HomeContentProps {
  initialPhotos: Photo[];
  initialPageInfo: PageInfo | null;
}

interface PhotosData {
  photos: Connection<Photo>;
}

export default function HomeContent({ initialPhotos, initialPageInfo }: HomeContentProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(initialPageInfo);
  const [likePhoto] = useMutation(LIKE_PHOTO);
  const [unlikePhoto] = useMutation(UNLIKE_PHOTO);
  const [downloadPhoto] = useMutation(DOWNLOAD_PHOTO);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [fetchMorePhotos, { loading, data: fetchMoreData }] = useLazyQuery<PhotosData>(GET_PHOTOS);

  useEffect(() => {
    if (!fetchMoreData?.photos) return;

    const newPhotos = fetchMoreData.photos.edges.map((edge) => edge.node);
    setPhotos((prev) => [...prev, ...newPhotos]);
    setPageInfo(fetchMoreData.photos.pageInfo);
  }, [fetchMoreData]);

  const handleLoadMore = useCallback(() => {
    if (loading || !pageInfo?.hasNextPage) return;

    fetchMorePhotos({
      variables: {
        first: 20,
        after: pageInfo.endCursor,
        checkUserLike: userId || undefined,
        checkUserCollect: userId || undefined,
      },
    });
  }, [loading, pageInfo, fetchMorePhotos, userId]);

  const handleLike = async (photo: Photo) => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    const nextIsLiked = !photo.isLiked;

    setPhotos((prev) =>
      prev.map((item) =>
        item.id === photo.id
          ? {
              ...item,
              isLiked: nextIsLiked,
              likeCount: Math.max(0, (item.likeCount || 0) + (nextIsLiked ? 1 : -1)),
            }
          : item
      )
    );

    try {
      if (photo.isLiked) {
        await unlikePhoto({ variables: { photoId: photo.id } });
      } else {
        await likePhoto({ variables: { photoId: photo.id } });
      }
    } catch (error) {
      // Roll back optimistic update on failure.
      setPhotos((prev) =>
        prev.map((item) =>
          item.id === photo.id
            ? {
                ...item,
                isLiked: photo.isLiked,
                likeCount: Math.max(0, (item.likeCount || 0) + (photo.isLiked ? 1 : -1)),
              }
            : item
        )
      );
      console.error("Failed to update like:", error);
    }
  };

  const handleDownload = async (photo: Photo) => {
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }

    setPhotos((prev) =>
      prev.map((item) =>
        item.id === photo.id
          ? {
              ...item,
              downloadCount: (item.downloadCount || 0) + 1,
            }
          : item
      )
    );

    try {
      await downloadPhoto({ variables: { id: photo.id } });
    } catch (error) {
      setPhotos((prev) =>
        prev.map((item) =>
          item.id === photo.id
            ? {
                ...item,
                downloadCount: Math.max(0, (item.downloadCount || 0) - 1),
              }
            : item
        )
      );
      console.error("Failed to track download:", error);
    }
  };

  return (
    <PhotoGrid
      photos={photos}
      loading={loading}
      hasNextPage={pageInfo?.hasNextPage ?? false}
      onLoadMore={handleLoadMore}
      onLike={handleLike}
      onDownload={handleDownload}
    />
  );
}
