"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";
import { Photo } from "@/types";
import { LIKE_PHOTO, UNLIKE_PHOTO, DOWNLOAD_PHOTO } from "@/graphql/mutations";

interface Props {
  initialQuery: string;
  initialType: string;
}

export default function SearchClient({ initialQuery, initialType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState(initialType || "");

  const [likePhoto] = useMutation(LIKE_PHOTO);
  const [unlikePhoto] = useMutation(UNLIKE_PHOTO);
  const [downloadPhoto] = useMutation(DOWNLOAD_PHOTO);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const searchKeyword = query || selectedType || undefined;

  const { photos, loading, fetchingMore, hasNextPage, fetchMore } = usePhotos({
    searchKeyword,
    first: 20,
    checkUserLike: userId || undefined,
    checkUserCollect: userId || undefined,
  });

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "";
    setQuery(q);
    setSelectedType(type);
  }, [searchParams]);

  const relatedTags = useMemo(() => {
    if (!photos.length) return [];
    const sample = photos[1] || photos[0];
    if (!sample?.tags) return [];
    return sample.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [photos]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedType.trim()) params.set("type", selectedType.trim());
    router.push(params.toString() ? `/search?${params.toString()}` : "/search");
  };

  const handleLike = async (photo: Photo) => {
    if (!userId) {
      router.push("/signin");
      return;
    }
    try {
      if (photo.isLiked) {
        await unlikePhoto({ variables: { photoId: photo.id } });
      } else {
        await likePhoto({ variables: { photoId: photo.id } });
      }
    } catch {
      // no-op
    }
  };

  const handleDownload = async (photo: Photo) => {
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }
    try {
      await downloadPhoto({ variables: { id: photo.id } });
    } catch {
      // no-op
    }
  };

  return (
    <div>
      {/* Search bar */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px 8px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 14, pointerEvents: "none" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchParams.get("q") || "Search artworks..."}
              style={{ width: "100%", paddingLeft: 44, paddingRight: 16, paddingTop: 10, paddingBottom: 10, fontSize: 14, borderRadius: 9999, border: "1px solid #d1d5db", outline: "none" }}
            />
          </div>
        </form>
      </div>

      {photos.length === 0 && !loading ? (
        <div style={{ textAlign: "center", padding: 48, color: "#6b7280" }}>
          No results found
        </div>
      ) : (
        <>
          {relatedTags.length > 0 && (
            <div style={{ padding: "12px 16px" }}>
              <div className="flex flex-wrap gap-2">
                {relatedTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    style={{ padding: "6px 14px", backgroundColor: "#f3f4f6", borderRadius: 6, fontSize: 14, color: "#000", textDecoration: "none" }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <PhotoGrid
            photos={photos}
            loading={loading}
            fetchingMore={fetchingMore}
            hasNextPage={hasNextPage}
            onLoadMore={fetchMore}
            onLike={handleLike}
            onDownload={handleDownload}
          />
        </>
      )}
    </div>
  );
}
