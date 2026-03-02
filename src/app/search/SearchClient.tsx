"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { usePhotos } from "@/hooks";
import { Photo } from "@/types";
import { LIKE_PHOTO, UNLIKE_PHOTO, DOWNLOAD_PHOTO } from "@/graphql/mutations";

interface Props {
  initialQuery: string;
  initialType: string;
}

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 2,
};

function SearchPhotoCard({
  photo,
  onLike,
  onDownload,
}: {
  photo: Photo;
  onLike: (photo: Photo) => void;
  onDownload: (photo: Photo) => void;
}) {
  const bgColor = photo.color || "#84B0B3";

  return (
    <div className="grid-item">
      <div className="photo-card photo-card-webicon overlay" style={{ backgroundColor: bgColor }}>
        <Link href={`/photo/${photo.id}`}>
          <img src={photo.srcSmall || photo.srcTiny || ""} width="100%" alt={photo.title || "search results"} />
        </Link>
        <div>
          <div className="text-white">
            <button
              type="button"
              className="photo-card-btn-icon photo-card-btn1"
              onClick={() => onDownload(photo)}
            >
              <i className="bi bi-download" />
            </button>
          </div>
          <div className="text-white">
            <button
              type="button"
              className="photo-card-btn-icon photo-card-btn2"
              onClick={() => onLike(photo)}
            >
              {!photo.isLiked && <i className="bi bi-heart" />}
              {photo.isLiked && (
                <div className="red-icon">
                  <i className="bi bi-heart-fill" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchClient({ initialQuery, initialType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState(initialType || "");
  const [loadingMore, setLoadingMore] = useState(false);
  const [photosState, setPhotosState] = useState<Photo[]>([]);

  const [likePhoto] = useMutation(LIKE_PHOTO);
  const [unlikePhoto] = useMutation(UNLIKE_PHOTO);
  const [downloadPhoto] = useMutation(DOWNLOAD_PHOTO);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const searchKeyword = query || selectedType || undefined;

  const { photos, loading, hasNextPage, fetchMore } = usePhotos({
    searchKeyword,
    first: 20,
    checkUserLike: userId || undefined,
    checkUserCollect: userId || undefined,
  });

  useEffect(() => {
    setPhotosState(photos);
    setLoadingMore(false);
  }, [photos]);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "";
    setQuery(q);
    setSelectedType(type);
  }, [searchParams]);

  const relatedTags = useMemo(() => {
    if (!photosState.length) return [];
    const sample = photosState[1] || photosState[0];
    if (!sample?.tags) return [];
    return sample.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [photosState]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedType.trim()) params.set("type", selectedType.trim());
    router.push(params.toString() ? `/search?${params.toString()}` : "/search");
  };

  const clickFetchMore = () => {
    setLoadingMore(true);
    fetchMore();
  };

  const likeSinglePhoto = async (photo: Photo) => {
    if (!userId) {
      router.push("/signin");
      return;
    }

    setPhotosState((prev) =>
      prev.map((item) =>
        item.id === photo.id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likeCount: Math.max(0, (item.likeCount || 0) + (item.isLiked ? -1 : 1)),
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
    } catch {
      setPhotosState((prev) =>
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
    }
  };

  const downloadSinglePhoto = async (photo: Photo) => {
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
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h3>Search:</h3>
        </div>
        <div className="container-row-searchpage-searchbox">
          <form onSubmit={handleSubmit}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchParams.get("q") || "Search artworks..."}
              aria-label="Search"
              className="container-row-navbar-searchbox"
            />
          </form>
        </div>
      </div>

      {photosState.length === 0 && !loading ? (
        <div className="p-3 flex-center">
          <h3>No result</h3>
        </div>
      ) : (
        <>
          {relatedTags.length > 0 && (
            <div>
              <h5 className="p-3 container-row-tag">Related tags</h5>
              <div className="p-3 flex flex-wrap gap-2">
                {relatedTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 photo-list-container">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {photosState.map((photo) => (
                <SearchPhotoCard
                  key={photo.id}
                  photo={photo}
                  onLike={likeSinglePhoto}
                  onDownload={downloadSinglePhoto}
                />
              ))}
            </Masonry>

            {hasNextPage ? (
              <div>
                {loadingMore && <div className="row-item-2">Loading...</div>}
                <div className="row-item-2">
                  <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
                    <i className="bi bi-three-dots" />
                    More photos
                  </button>
                </div>
              </div>
            ) : (
              <h3 className="the-end-title">The end</h3>
            )}
          </div>
        </>
      )}
    </div>
  );
}
