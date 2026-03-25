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
      {/* Full-width Photo */}
      <div className="w-full flex justify-center">
        <Image
          src={photo.srcOriginal || photo.srcLarge || photo.srcSmall || ""}
          alt={photo.title || "Artwork"}
          width={photo.width || 1200}
          height={photo.height || 800}
          className="max-w-full max-h-[85vh] object-contain"
          priority
        />
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Author + Actions Row */}
        <div className="flex items-center justify-between mb-6">
          <Link href={`/${photo.user?.username}`} className="flex items-center gap-3 group">
            <img
              src={photo.user?.profileImage || defaultAvatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                {photo.user?.firstName} {photo.user?.lastName || ""}
              </p>
              <p className="text-xs text-gray-400">{formatDate(photo.createdAt)}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm transition-colors ${
                photo.isLiked
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className={photo.isLiked ? "bi bi-heart-fill" : "bi bi-heart"} />
              {photo.likeCount || 0}
            </button>

            <button
              onClick={() => (userId ? setShowCollectModal(true) : (window.location.href = "/signin"))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm transition-colors ${
                photo.isCollected
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <i className={photo.isCollected ? "bi bi-bookmark-fill" : "bi bi-bookmark"} />
              {photo.collectionCount || 0}
            </button>

            {photo.allowDownload ? (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
              >
                <i className="bi bi-download" />
                Download
              </button>
            ) : (
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-200 text-gray-400 text-sm cursor-not-allowed"
                disabled
              >
                <i className="bi bi-download" />
                Download
              </button>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-xl font-bold text-gray-900 mb-2">{photo.title}</h1>
        {photo.description && (
          <p className="text-gray-600 leading-relaxed mb-4">{photo.description}</p>
        )}

        {/* Meta tags */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-8">
          {photo.status && <span>Status: {photo.status}</span>}
          {photo.license && <span>License: {photo.license}</span>}
          {photo.type && <span>Type: {photo.type}</span>}
        </div>

        {/* Color Palette */}
        {photo.allColors && (
          <div className="flex gap-1.5 mb-8">
            {photo.allColors.split(",").map((c) => c.trim()).filter(Boolean).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}

        {/* EXIF / Photo Details */}
        {(hasExifData || photo.width) && (
          <div className="border-t pt-6 mb-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {photo.width && photo.height && (
                <DetailItem icon="bi-aspect-ratio" label="Dimensions" value={`${photo.width} × ${photo.height}`} />
              )}
              {(photo.cameraMake || photo.cameraModel) && (
                <DetailItem icon="bi-camera" label="Camera" value={[photo.cameraMake, photo.cameraModel].filter(Boolean).join(" ")} />
              )}
              {photo.lens && (
                <DetailItem icon="bi-circle" label="Lens" value={photo.lens} />
              )}
              {photo.focalLength && (
                <DetailItem icon="bi-search" label="Focal Length" value={`${photo.focalLength}mm`} />
              )}
              {photo.aperture && (
                <DetailItem icon="bi-record-circle" label="Aperture" value={`ƒ/${photo.aperture}`} />
              )}
              {photo.shutterSpeed && (
                <DetailItem icon="bi-stopwatch" label="Shutter" value={photo.shutterSpeed} />
              )}
              {photo.iso && (
                <DetailItem icon="bi-sun" label="ISO" value={String(photo.iso)} />
              )}
              {photo.dateTaken && (
                <DetailItem icon="bi-calendar-event" label="Taken" value={formatDate(photo.dateTaken)} />
              )}
            </div>
          </div>
        )}

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="border-t pt-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Similar Photos */}
      {relatedPhotos.length > 0 && (
        <div className="border-t">
          <div className="max-w-4xl mx-auto px-6 pt-8 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">Similar Photos</h3>
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
    <div className="flex items-center gap-2 text-gray-500">
      <i className={`bi ${icon} text-gray-400`} />
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}
