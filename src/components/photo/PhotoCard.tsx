"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/types";

interface PhotoCardProps {
  photo: Photo;
  onLike?: (photo: Photo) => void;
  onDownload?: (photo: Photo) => void;
}

const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

export default function PhotoCard({ photo, onLike, onDownload }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!photo) return null;

  const bgColor = photo.color || "#84B0B3";
  const aspectRatio = photo.width && photo.height ? photo.width / photo.height : 4 / 3;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }
    onDownload?.(photo);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(photo);
  };

  return (
    <Link
      href={`/photo/${photo.id}`}
      className="block relative group overflow-hidden cursor-pointer"
    >
      {/* Color placeholder with correct aspect ratio */}
      <div
        className="w-full"
        style={{ aspectRatio, backgroundColor: bgColor }}
      >
        <Image
          src={photo.srcSmall || photo.srcTiny || ""}
          alt={photo.title || "Artwork"}
          width={photo.width || 400}
          height={photo.height || 300}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Overlay with actions */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
          {/* Left side - Author */}
          <div
            className="flex items-center gap-2 min-w-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/${photo.user?.username}`;
            }}
          >
            <img
              src={photo.user?.profileImage || defaultAvatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
            />
            <span className="text-white text-sm font-medium truncate hover:underline">
              {photo.user?.firstName}{photo.user?.lastName ? ` ${photo.user.lastName}` : ""}
            </span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Like button */}
            <button
              onClick={handleLike}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label={photo.isLiked ? "Unlike" : "Like"}
            >
              <svg
                className={`w-5 h-5 ${photo.isLiked ? "text-red-500 fill-current" : "text-white"}`}
                viewBox="0 0 24 24"
                fill={photo.isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Download button */}
            {photo.allowDownload && (
              <button
                onClick={handleDownload}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Download"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
