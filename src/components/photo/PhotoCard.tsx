"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Photo } from "@/types";
import { LIKE_PHOTO, UNLIKE_PHOTO } from "@/graphql/mutations";

interface PhotoCardProps {
  photo: Photo;
  onLike?: (photo: Photo) => void;
  onCollect?: (photo: Photo) => void;
  onDownload?: (photo: Photo) => void;
}

const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

export default function PhotoCard({ photo, onCollect, onDownload }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(!!photo.isLiked);
  const [collected, setCollected] = useState(!!photo.isCollected);

  const [likePhotoMut] = useMutation(LIKE_PHOTO);
  const [unlikePhotoMut] = useMutation(UNLIKE_PHOTO);

  if (!photo) return null;

  const bgColor = photo.color || "#84B0B3";
  const aspectRatio = photo.width && photo.height ? photo.width / photo.height : 4 / 3;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    const next = !liked;
    setLiked(next);

    try {
      if (next) {
        await likePhotoMut({ variables: { photoId: photo.id } });
      } else {
        await unlikePhotoMut({ variables: { photoId: photo.id } });
      }
    } catch {
      setLiked(!next);
    }
  };

  const handleCollect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCollected(!collected);
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
      className="block relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%, transparent 50%, rgba(0,0,0,0.3))",
        }}
      >
        {/* Top right - Like, Collect */}
        <div className="absolute top-0 right-0 p-3 flex items-center" style={{ gap: 6 }}>
          <CardButton onClick={handleLike}>
            <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} style={{ color: liked ? "#f87171" : "#fff", fontSize: 16 }} />
          </CardButton>

          <CardButton onClick={handleCollect}>
            <i className={`bi ${collected ? "bi-bookmark-fill" : "bi-bookmark"}`} style={{ color: collected ? "#facc15" : "#fff", fontSize: 16 }} />
          </CardButton>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          {/* Left - Author */}
          <div
            className="flex items-center gap-2 min-w-0 cursor-pointer"
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
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}
            />
            <span className="text-white text-sm font-medium truncate hover:underline" style={{ maxWidth: 120 }}>
              {photo.user?.firstName}{photo.user?.lastName ? ` ${photo.user.lastName}` : ""}
            </span>
          </div>

          {/* Right - Download */}
          {photo.allowDownload && (
            <CardButton onClick={handleDownload}>
              <i className="bi bi-download" style={{ color: "#fff", fontSize: 16 }} />
            </CardButton>
          )}
        </div>
      </div>
    </Link>
  );
}

function CardButton({ onClick, children }: { onClick: (e: React.MouseEvent) => void; children: React.ReactNode }) {
  return (
    <div
      role="button"
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.3)")}
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 8,
        padding: "7px 9px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}
