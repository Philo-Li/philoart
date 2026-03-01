"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Photo } from "@/types";
import { LIKE_PHOTO, UNLIKE_PHOTO, DOWNLOAD_PHOTO } from "@/graphql/mutations";

interface Props {
  initialPhoto: Photo;
}

export default function PhotoDetailClient({ initialPhoto }: Props) {
  const [photo, setPhoto] = useState(initialPhoto);
  const [likePhoto] = useMutation(LIKE_PHOTO);
  const [unlikePhoto] = useMutation(UNLIKE_PHOTO);
  const [downloadPhoto] = useMutation(DOWNLOAD_PHOTO);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const handleLike = async () => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    const newIsLiked = !photo.isLiked;
    setPhoto({ ...photo, isLiked: newIsLiked });

    try {
      if (photo.isLiked) {
        await unlikePhoto({ variables: { photoId: photo.id } });
      } else {
        await likePhoto({ variables: { photoId: photo.id } });
      }
    } catch (error) {
      // Revert on error
      setPhoto({ ...photo, isLiked: !newIsLiked });
      console.error("Failed to update like:", error);
    }
  };

  const handleDownload = async () => {
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }
    try {
      await downloadPhoto({ variables: { id: photo.id } });
    } catch (error) {
      console.error("Failed to track download:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Image */}
      <div className="mb-8">
        <div
          className="relative w-full rounded-lg overflow-hidden"
          style={{ backgroundColor: photo.color || "#f3f4f6" }}
        >
          <Image
            src={photo.srcLarge || photo.srcSmall || ""}
            alt={photo.title || "Artwork"}
            width={1200}
            height={800}
            className="w-full h-auto object-contain max-h-[80vh]"
            priority
          />
        </div>
      </div>

      {/* Color Palette */}
      {photo.allColors && (
        <div className="flex gap-2 mb-6">
          {photo.allColors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Title & Description */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{photo.title}</h1>
          <p className="text-gray-600 mb-6">{photo.description || "No description"}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {photo.status && (
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                Status: {photo.status}
              </span>
            )}
            {photo.license && (
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                License: {photo.license}
              </span>
            )}
            {photo.type && (
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                Type: {photo.type}
              </span>
            )}
          </div>
        </div>

        {/* Right: Author & Actions */}
        <div className="space-y-6">
          {/* Author */}
          <div className="flex items-center gap-4">
            <Link href={`/${photo.user?.username}`}>
              <Image
                src={photo.user?.profileImage || defaultAvatar}
                alt={photo.user?.firstName || "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            </Link>
            <div>
              <Link
                href={`/${photo.user?.username}`}
                className="font-medium text-gray-900 hover:text-blue-600"
              >
                {photo.user?.firstName} {photo.user?.lastName || ""}
              </Link>
              <p className="text-sm text-gray-500">{formatDate(photo.createdAt)}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span>{photo.likeCount || 0} likes</span>
            <span>{photo.collectionCount || 0} collections</span>
            <span>{photo.downloadCount || 0} downloads</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                photo.isLiked
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`w-5 h-5 ${photo.isLiked ? "fill-current" : ""}`}
                viewBox="0 0 24 24"
                fill={photo.isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {photo.isLiked ? "Liked" : "Like"}
            </button>

            {photo.allowDownload && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            )}
          </div>

          {/* Tags */}
          {photo.tags && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {photo.tags.split(",").map((tag, index) => (
                  <Link
                    key={index}
                    href={`/search?q=${encodeURIComponent(tag.trim())}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {tag.trim()}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
