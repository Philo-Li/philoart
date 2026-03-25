"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/types";

interface PhotoCardProps {
  photo: Photo;
  onLike?: (photo: Photo) => void;
  onCollect?: (photo: Photo) => void;
  onDownload?: (photo: Photo) => void;
}

const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

export default function PhotoCard({ photo, onLike, onCollect, onDownload }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!photo) return null;

  const bgColor = photo.color || "#84B0B3";
  const aspectRatio = photo.width && photo.height ? photo.width / photo.height : 4 / 3;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike?.(photo);
  };

  const handleCollect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCollect?.(photo);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }
    onDownload?.(photo);
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

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          {/* Left - Author */}
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
              className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-white/30"
            />
            <span className="text-white text-sm font-medium truncate hover:underline max-w-[120px]">
              {photo.user?.firstName}{photo.user?.lastName ? ` ${photo.user.lastName}` : ""}
            </span>
          </div>

          {/* Right - Like, Collect, Download */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleLike}
              className="p-1.5 rounded-md bg-black/30 hover:bg-black/50 transition-colors"
              aria-label={photo.isLiked ? "Unlike" : "Like"}
            >
              <i className={`bi ${photo.isLiked ? "bi-heart-fill text-red-400" : "bi-heart text-white"} text-base`} />
            </button>

            <button
              onClick={handleCollect}
              className="p-1.5 rounded-md bg-black/30 hover:bg-black/50 transition-colors"
              aria-label={photo.isCollected ? "Uncollect" : "Collect"}
            >
              <i className={`bi ${photo.isCollected ? "bi-bookmark-fill text-yellow-400" : "bi-bookmark text-white"} text-base`} />
            </button>

            {photo.allowDownload && (
              <button
                onClick={handleDownload}
                className="p-1.5 rounded-md bg-black/30 hover:bg-black/50 transition-colors"
                aria-label="Download"
              >
                <i className="bi bi-download text-white text-base" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
