"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Photo, Collection } from "@/types";
import { PhotoGrid } from "@/components/photo";
import { GET_PHOTOS, GET_USER_COLLECTIONS_PLUS } from "@/graphql/queries";
import {
  LIKE_PHOTO,
  UNLIKE_PHOTO,
  DOWNLOAD_PHOTO,
  COLLECT_PHOTO,
  UNCOLLECT_PHOTO,
  CREATE_COLLECTION_AND_COLLECT_PHOTO,
} from "@/graphql/mutations";

interface Props {
  initialPhoto: Photo;
}

interface UserCollection extends Collection {
  isCollected?: boolean;
}

export default function PhotoDetailClient({ initialPhoto }: Props) {
  const [photo, setPhoto] = useState(initialPhoto);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [collectError, setCollectError] = useState("");

  const [likePhoto] = useMutation(LIKE_PHOTO);
  const [unlikePhoto] = useMutation(UNLIKE_PHOTO);
  const [downloadPhoto] = useMutation(DOWNLOAD_PHOTO);
  const [collectPhoto] = useMutation(COLLECT_PHOTO);
  const [uncollectPhoto] = useMutation(UNCOLLECT_PHOTO);
  const [createCollectionAndCollectPhoto, { loading: creatingCollection }] = useMutation(
    CREATE_COLLECTION_AND_COLLECT_PHOTO
  );

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  const relatedTags = useMemo(() => {
    if (!photo.tags) return [];
    return photo.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [photo.tags]);

  const primaryTag = relatedTags[0];

  const {
    data: relatedPhotosData,
    loading: relatedLoading,
  } = useQuery(GET_PHOTOS, {
    variables: {
      searchKeyword: primaryTag,
      first: 12,
      checkUserLike: userId || undefined,
      checkUserCollect: userId || undefined,
    },
    skip: !primaryTag,
    fetchPolicy: "cache-and-network",
  });

  const {
    data: collectionsData,
    loading: collectionsLoading,
    refetch: refetchCollections,
  } = useQuery(GET_USER_COLLECTIONS_PLUS, {
    variables: {
      username: username || undefined,
      checkPhotoCollect: photo.id,
      first: 30,
    },
    skip: !username || !showCollectModal,
    fetchPolicy: "cache-and-network",
  });

  const relatedPhotos: Photo[] =
    relatedPhotosData?.photos?.edges
      ?.map((edge: { node: Photo }) => edge.node)
      ?.filter((item: Photo) => item.id !== photo.id) || [];

  const collections: UserCollection[] =
    collectionsData?.collections?.edges?.map((edge: { node: UserCollection }) => edge.node) || [];

  const handleLike = async () => {
    if (!userId) { window.location.href = "/signin"; return; }
    const nextIsLiked = !photo.isLiked;
    setPhoto((prev) => ({
      ...prev,
      isLiked: nextIsLiked,
      likeCount: Math.max(0, (prev.likeCount || 0) + (nextIsLiked ? 1 : -1)),
    }));
    try {
      if (photo.isLiked) {
        await unlikePhoto({ variables: { photoId: photo.id } });
      } else {
        await likePhoto({ variables: { photoId: photo.id } });
      }
    } catch (error) {
      setPhoto((prev) => ({
        ...prev,
        isLiked: !nextIsLiked,
        likeCount: Math.max(0, (prev.likeCount || 0) + (nextIsLiked ? -1 : 1)),
      }));
      console.error("Failed to update like:", error);
    }
  };

  const handleDownload = async () => {
    if (photo.srcOriginal) { window.open(photo.srcOriginal); }
    setPhoto((prev) => ({ ...prev, downloadCount: (prev.downloadCount || 0) + 1 }));
    try {
      await downloadPhoto({ variables: { id: photo.id } });
    } catch (error) {
      setPhoto((prev) => ({ ...prev, downloadCount: Math.max(0, (prev.downloadCount || 0) - 1) }));
      console.error("Failed to track download:", error);
    }
  };

  const handleToggleCollection = async (collection: UserCollection) => {
    if (!userId) { window.location.href = "/signin"; return; }
    try {
      if (collection.isCollected) {
        await uncollectPhoto({ variables: { photoId: photo.id, collectionId: collection.id } });
        setPhoto((prev) => ({ ...prev, collectionCount: Math.max(0, (prev.collectionCount || 0) - 1), isCollected: false }));
      } else {
        await collectPhoto({ variables: { photoId: photo.id, collectionId: collection.id } });
        setPhoto((prev) => ({ ...prev, collectionCount: (prev.collectionCount || 0) + 1, isCollected: true }));
      }
      await refetchCollections();
    } catch (error) {
      console.error("Failed to update collection state:", error);
      setCollectError("Failed to save to collection");
    }
  };

  const handleCreateAndCollect = async () => {
    if (!userId) { window.location.href = "/signin"; return; }
    const title = newCollectionTitle.trim();
    if (!title) { setCollectError("Collection title is required"); return; }
    try {
      setCollectError("");
      await createCollectionAndCollectPhoto({
        variables: { title, description: "", public: true, photoId: photo.id, cover: photo.srcTiny || photo.srcSmall || photo.srcLarge || "" },
      });
      setNewCollectionTitle("");
      setPhoto((prev) => ({ ...prev, collectionCount: (prev.collectionCount || 0) + 1, isCollected: true }));
      await refetchCollections();
    } catch (error) {
      console.error("Failed to create collection:", error);
      setCollectError("Failed to create collection");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const hasExifData =
    photo.cameraMake || photo.cameraModel || photo.lens ||
    photo.focalLength || photo.aperture || photo.shutterSpeed || photo.iso;

  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <div>
      {/* Author + Actions Bar */}
      <div className="mx-auto py-3 flex items-center justify-between" style={{ maxWidth: "calc(100% - 48px)" }}>
        <Link href={`/${photo.user?.username}`} className="flex items-center gap-2.5 group">
          <img
            src={photo.user?.profileImage || defaultAvatar}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-gray-900 group-hover:underline text-sm leading-4">
              {photo.user?.firstName} {photo.user?.lastName || ""}
            </span>
            {photo.user?.description && (
              <span className="text-xs text-gray-500 leading-4">{photo.user.description}</span>
            )}
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            role="button"
            onClick={handleLike}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: photo.isLiked ? "1px solid #fecaca" : "1px solid #d1d5db",
              backgroundColor: photo.isLiked ? "#fef2f2" : "transparent",
              color: photo.isLiked ? "#ef4444" : "#4b5563",
              cursor: "pointer",
            }}
          >
            <i className={photo.isLiked ? "bi bi-heart-fill" : "bi bi-heart"} style={{ fontSize: 16 }} />
          </div>

          <div
            role="button"
            onClick={() => (userId ? setShowCollectModal(true) : (window.location.href = "/signin"))}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: photo.isCollected ? "1px solid #bfdbfe" : "1px solid #d1d5db",
              backgroundColor: photo.isCollected ? "#eff6ff" : "transparent",
              color: photo.isCollected ? "#3b82f6" : "#4b5563",
              cursor: "pointer",
            }}
          >
            <i className={photo.isCollected ? "bi bi-bookmark-fill" : "bi bi-plus-lg"} style={{ fontSize: 16 }} />
          </div>

          <div
            role="button"
            onClick={photo.allowDownload ? handleDownload : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 36,
              padding: "0 20px",
              borderRadius: 8,
              backgroundColor: photo.allowDownload ? "#111827" : "#e5e7eb",
              color: photo.allowDownload ? "#fff" : "#9ca3af",
              fontSize: 14,
              fontWeight: 500,
              cursor: photo.allowDownload ? "pointer" : "not-allowed",
            }}
          >
            <i className="bi bi-download" style={{ fontSize: 14 }} />
            Download
          </div>
        </div>
      </div>

      {/* Photo */}
      <div className="w-full flex justify-center px-6">
        <Image
          src={photo.srcOriginal || photo.srcLarge || photo.srcSmall || ""}
          alt={photo.title || "Artwork"}
          width={photo.width || 1200}
          height={photo.height || 800}
          className="max-w-full max-h-[85vh] object-contain"
          priority
        />
      </div>

      {/* Featured in + Colors + Share */}
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Left: Featured in */}
          {photo.type && (
            <div className="flex-shrink-0">
              <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1, margin: 0 }}>Featured in</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#000", lineHeight: 1, margin: 0, marginTop: 4 }}>{photo.type}</p>
            </div>
          )}

          {/* Center: Color Palette */}
          {photo.allColors && (
            <div className="flex gap-2 justify-center flex-1 mx-4">
              {photo.allColors.split(",").map((c) => c.trim()).filter(Boolean).map((color, index) => (
                <ColorDot key={index} color={color} />
              ))}
            </div>
          )}

          {/* Right: Share */}
          <ShareButton photoSlug={photo.slug} photoId={photo.id} title={photo.title || ""} />
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#000", marginBottom: 8 }}>{photo.title}</h1>

        {/* Description */}
        {photo.description && (
          <p style={{ fontSize: 14, color: "#000", lineHeight: 1.6, marginBottom: 20 }}>{photo.description}</p>
        )}

        {/* Meta info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
          {photo.createdAt && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#6b7280" }}>
              <i className="bi bi-calendar3" />
              <span>Published {formatDate(photo.createdAt)}</span>
            </div>
          )}
          {(photo.cameraMake || photo.cameraModel) && (
            <ExifLine photo={photo} />
          )}
          {photo.license && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#6b7280" }}>
              <i className="bi bi-shield-check" />
              <span>Licensed under the <Link href="/license" style={{ color: "#6b7280", textDecoration: "underline" }}>{photo.license}</Link></span>
            </div>
          )}
        </div>



        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {relatedTags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-black transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Similar Photos */}
      {relatedPhotos.length > 0 && (
        <div>
          <div className="mx-auto px-6 pt-6 pb-3">
            <h3 className="text-xl font-bold text-gray-900">Similar Photos</h3>
          </div>
          <PhotoGrid
            photos={relatedPhotos}
            loading={relatedLoading}
          />
        </div>
      )}

      {/* Collect Modal */}
      {showCollectModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Save to Collections</h2>
              <button
                onClick={() => setShowCollectModal(false)}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Create new collection</label>
              <div className="flex gap-2">
                <input
                  value={newCollectionTitle}
                  onChange={(e) => setNewCollectionTitle(e.target.value)}
                  placeholder="Collection title"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={handleCreateAndCollect}
                  disabled={creatingCollection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {creatingCollection ? "Creating..." : "Create"}
                </button>
              </div>
            </div>

            {collectError && (
              <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-600 rounded-lg text-sm">
                {collectError}
              </div>
            )}

            <div className="space-y-2">
              {collectionsLoading ? (
                <div className="text-gray-500">Loading collections...</div>
              ) : collections.length === 0 ? (
                <div className="text-gray-500">No collections yet</div>
              ) : (
                collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => handleToggleCollection(collection)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{collection.title}</p>
                        <p className="text-sm text-gray-500">{collection.photoCount || 0} photos</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          collection.isCollected
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {collection.isCollected ? "Saved" : "Save"}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <li className="flex items-center gap-2">
      <i className={`bi ${icon} text-gray-400 w-4 text-center`} />
      <span className="text-gray-400 w-24">{label}</span>
      <span className="text-gray-700">{value}</span>
    </li>
  );
}

function ShareButton({ photoSlug, photoId, title }: { photoSlug?: string; photoId: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const photoPath = photoSlug ? `/photo/${photoSlug}` : `/photo/${photoId}`;
  const url = typeof window !== "undefined" ? `${window.location.origin}${photoPath}` : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareVia = () => {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    }
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }} className="flex-shrink-0">
      <div
        role="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          height: 36,
          padding: "0 14px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          color: "#4b5563",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <i className="bi bi-send" style={{ fontSize: 14 }} />
        Share
      </div>

      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 6px)",
              backgroundColor: "#fff",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              padding: "8px 0",
              minWidth: 200,
              zIndex: 50,
            }}
          >
            <ShareItem
              icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
              label="Facebook"
              onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank"); setOpen(false); }}
            />
            <ShareItem
              icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="#E60023"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>}
              label="Pinterest"
              onClick={() => { window.open(`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`, "_blank"); setOpen(false); }}
            />
            <ShareItem
              icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
              label="Twitter"
              onClick={() => { window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank"); setOpen(false); }}
            />
            <ShareItem
              icon={<i className="bi bi-envelope-fill" style={{ fontSize: 16, color: "#6b7280" }} />}
              label="Email"
              onClick={() => { window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, "_self"); setOpen(false); }}
            />
            {typeof navigator !== "undefined" && !!navigator.share && (
              <ShareItem
                icon={<i className="bi bi-send" style={{ fontSize: 16, color: "#6b7280" }} />}
                label="Share via..."
                onClick={handleShareVia}
              />
            )}
            <div style={{ borderTop: "1px solid #e5e7eb", margin: "4px 0" }} />
            <ShareItem
              icon={<i className="bi bi-link-45deg" style={{ fontSize: 18, color: "#6b7280" }} />}
              label={copied ? "Copied!" : "Copy link"}
              onClick={handleCopy}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ShareItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        cursor: "pointer",
        fontSize: 14,
        color: "#111827",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <span style={{ width: 20, display: "flex", justifyContent: "center" }}>{icon}</span>
      {label}
    </div>
  );
}

function ExifLine({ photo }: { photo: Photo }) {
  const [show, setShow] = useState(false);
  const cameraName = [photo.cameraMake, photo.cameraModel].filter(Boolean).join(", ");

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        role="button"
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#6b7280", cursor: "pointer" }}
      >
        <i className="bi bi-camera" />
        <span>{cameraName}</span>
      </div>
      {show && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: "calc(100% + 8px)",
            backgroundColor: "#111827",
            color: "#fff",
            borderRadius: 10,
            padding: "16px 20px",
            minWidth: 280,
            zIndex: 50,
            fontSize: 14,
            lineHeight: 1.6,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 2 }}>Camera</div>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>{cameraName}</div>

          {(photo.lens || photo.focalLength || photo.aperture || photo.shutterSpeed || photo.iso) && (
            <>
              <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 2 }}>Lens</div>
              <div style={{ marginBottom: photo.width ? 12 : 0 }}>
                {photo.lens && <div>{photo.lens}</div>}
                {(photo.focalLength || photo.aperture) && (
                  <div>
                    {photo.focalLength ? `${photo.focalLength}mm` : ""}
                    {photo.focalLength && photo.aperture ? " " : ""}
                    {photo.aperture ? `ƒ/${photo.aperture}` : ""}
                  </div>
                )}
                {photo.shutterSpeed && <div>{photo.shutterSpeed}</div>}
                {photo.iso && <div>ISO {photo.iso}</div>}
              </div>
            </>
          )}

          {photo.width && photo.height && (
            <>
              <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 2 }}>Dimensions</div>
              <div>{photo.width} × {photo.height}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ColorDot({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setCopied(false); }}
    >
      <div
        role="button"
        onClick={handleClick}
        style={{
          backgroundColor: color,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.1)",
          cursor: "pointer",
          transform: hovered ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.15s",
        }}
      />
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: 6,
            padding: "4px 8px",
            borderRadius: 6,
            backgroundColor: "#1f2937",
            color: "#fff",
            fontSize: 12,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {copied ? "Copied!" : color}
        </div>
      )}
    </div>
  );
}
