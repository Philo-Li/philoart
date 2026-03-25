"use client";

import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { Photo } from "@/types";
import PhotoCard from "./PhotoCard";

// Seeded random for stable shuffle per session
function seededShuffle(arr: Photo[], seed: number): Photo[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface PhotoGridProps {
  photos: Photo[];
  loading?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  onLike?: (photo: Photo) => void;
  onDownload?: (photo: Photo) => void;
}

function useColumns() {
  const getColumns = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 750) return 1;
    if (w <= 1000) return 2;
    return 3;
  };

  const ref = useRef(getColumns());

  useEffect(() => {
    const onResize = () => {
      ref.current = getColumns();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return ref;
}

function distributeToColumns(photos: Photo[], columnCount: number): Photo[][] {
  const columns: Photo[][] = Array.from({ length: columnCount }, () => []);
  const heights = new Array(columnCount).fill(0);

  for (const photo of photos) {
    const ratio = photo.width && photo.height ? photo.height / photo.width : 0.75;
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(photo);
    heights[shortest] += ratio;
  }

  return columns;
}

export default function PhotoGrid({
  photos,
  loading,
  hasNextPage,
  onLoadMore,
  onLike,
  onDownload,
}: PhotoGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const columnsRef = useColumns();
  const [seed] = useState(() => Math.floor(Math.random() * 2147483647));

  // Infinite scroll
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && hasNextPage && !loading && onLoadMore) {
        onLoadMore();
      }
    },
    [hasNextPage, loading, onLoadMore]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "400px",
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  const shuffledPhotos = useMemo(
    () => seededShuffle(photos, seed),
    [photos, seed]
  );

  const columns = useMemo(
    () => distributeToColumns(shuffledPhotos, columnsRef.current),
    [shuffledPhotos, columnsRef]
  );

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
    <div className="p-3">
      <div className="flex gap-3">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-3">
            {column.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onLike={onLike}
                onDownload={onDownload}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-1" />

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
}
