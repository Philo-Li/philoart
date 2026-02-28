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

export default function PhotoCard({ photo, onLike, onDownload }: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!photo) return null;

  const bgColor = photo.color || "#84B0B3";

  const handleDownload = async () => {
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }
    onDownload?.(photo);
  };

  const handleLike = () => {
    onLike?.(photo);
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Placeholder background */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ backgroundColor: bgColor, opacity: imageLoaded ? 0 : 1 }}
      />

      {/* Image */}
      <Link href={`/photo/${photo.id}`}>
        <div className="relative aspect-auto">
          <Image
            src={photo.srcSmall || photo.srcTiny || ""}
            alt={photo.title || "Artwork"}
            width={400}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Overlay with actions */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          {/* Left side - Title */}
          <Link href={`/photo/${photo.id}`} className="text-white text-sm font-medium truncate max-w-[60%]">
            {photo.title}
          </Link>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
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
    </div>
  );
}
