"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Photo, Collection } from "@/types";
import { PhotoCard } from "@/components/photo";
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
    fetchMore: fetchMoreRelated,
  } = useQuery(GET_PHOTOS, {
    variables: {
      searchKeyword: primaryTag,
      first: 10,
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

  const hasNextRelatedPage = relatedPhotosData?.photos?.pageInfo?.hasNextPage ?? false;

  const collections: UserCollection[] =
    collectionsData?.collections?.edges?.map((edge: { node: UserCollection }) => edge.node) || [];

  const handleLike = async () => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

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
    if (photo.srcOriginal) {
      window.open(photo.srcOriginal);
    }

    setPhoto((prev) => ({
      ...prev,
      downloadCount: (prev.downloadCount || 0) + 1,
    }));

    try {
      await downloadPhoto({ variables: { id: photo.id } });
    } catch (error) {
      setPhoto((prev) => ({
        ...prev,
        downloadCount: Math.max(0, (prev.downloadCount || 0) - 1),
      }));
      console.error("Failed to track download:", error);
    }
  };

  const handleToggleCollection = async (collection: UserCollection) => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    try {
      if (collection.isCollected) {
        await uncollectPhoto({
          variables: {
            photoId: photo.id,
            collectionId: collection.id,
          },
        });
        setPhoto((prev) => ({
          ...prev,
          collectionCount: Math.max(0, (prev.collectionCount || 0) - 1),
          isCollected: false,
        }));
      } else {
        await collectPhoto({
          variables: {
            photoId: photo.id,
            collectionId: collection.id,
          },
        });
        setPhoto((prev) => ({
          ...prev,
          collectionCount: (prev.collectionCount || 0) + 1,
          isCollected: true,
        }));
      }

      await refetchCollections();
    } catch (error) {
      console.error("Failed to update collection state:", error);
      setCollectError("Failed to save to collection");
    }
  };

  const handleCreateAndCollect = async () => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    const title = newCollectionTitle.trim();
    if (!title) {
      setCollectError("Collection title is required");
      return;
    }

    try {
      setCollectError("");
      await createCollectionAndCollectPhoto({
        variables: {
          title,
          description: "",
          public: true,
          photoId: photo.id,
          cover: photo.srcTiny || photo.srcSmall || photo.srcLarge || "",
        },
      });
      setNewCollectionTitle("");
      setPhoto((prev) => ({
        ...prev,
        collectionCount: (prev.collectionCount || 0) + 1,
        isCollected: true,
      }));
      await refetchCollections();
    } catch (error) {
      console.error("Failed to create collection:", error);
      setCollectError("Failed to create collection");
    }
  };

  const handleLoadMoreRelated = () => {
    if (!hasNextRelatedPage || relatedLoading) return;

    fetchMoreRelated({
      variables: {
        after: relatedPhotosData?.photos?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          photos: {
            ...fetchMoreResult.photos,
            edges: [...prev.photos.edges, ...fetchMoreResult.photos.edges],
          },
        };
      },
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasExifData =
    photo.cameraMake || photo.cameraModel || photo.lens ||
    photo.focalLength || photo.aperture || photo.shutterSpeed || photo.iso;

  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Photo Image */}
      <div className="flex justify-center mb-6">
        <div
          className="relative w-full overflow-hidden rounded-lg"
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
        <div className="flex gap-2 justify-center mb-8">
          {photo.allColors.split(",").map((c) => c.trim()).filter(Boolean).map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}

      {/* Main Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Left: Title & Description */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{photo.title}</h1>
          {photo.description && (
            <p className="text-gray-600 leading-relaxed mb-4">{photo.description}</p>
          )}
          <div className="flex gap-4 text-sm text-gray-500">
            {photo.status && <span>Status: {photo.status}</span>}
            {photo.license && <span>License: {photo.license}</span>}
            {photo.type && <span>Type: {photo.type}</span>}
          </div>
        </div>

        {/* Right: Author & Actions */}
        <div>
          {/* Author */}
          <Link href={`/${photo.user?.username}`} className="flex items-center gap-3 mb-5 group">
            <img
              src={photo.user?.profileImage || defaultAvatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {photo.user?.firstName} {photo.user?.lastName || ""}
              </p>
              <p className="text-sm text-gray-500">{formatDate(photo.createdAt)}</p>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                photo.isLiked
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className={photo.isLiked ? "bi bi-heart-fill" : "bi bi-heart"} />
              <span className="text-sm">{photo.likeCount || 0}</span>
            </button>

            <button
              onClick={() => (userId ? setShowCollectModal(true) : (window.location.href = "/signin"))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                photo.isCollected
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <i className={photo.isCollected ? "bi bi-bookmark-fill" : "bi bi-plus-square"} />
              <span className="text-sm">{photo.collectionCount || 0}</span>
            </button>

            {photo.allowDownload ? (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <i className="bi bi-download" />
                <span className="text-sm">{photo.downloadCount || 0}</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 text-white cursor-not-allowed"
                disabled
              >
                <i className="bi bi-download" />
                <span className="text-sm">{photo.downloadCount || 0}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Photo Details Section */}
      {(hasExifData || photo.width) && (
        <section className="mb-10 pt-8 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photo.width && photo.height && (
              <DetailItem
                icon="bi bi-aspect-ratio"
                label="Dimensions"
                value={`${photo.width} × ${photo.height}`}
              />
            )}
            {(photo.cameraMake || photo.cameraModel) && (
              <DetailItem
                icon="bi bi-camera"
                label="Camera"
                value={[photo.cameraMake, photo.cameraModel].filter(Boolean).join(" ")}
              />
            )}
            {photo.lens && (
              <DetailItem icon="bi bi-circle" label="Lens" value={photo.lens} />
            )}
            {photo.focalLength && (
              <DetailItem
                icon="bi bi-search"
                label="Focal Length"
                value={`${photo.focalLength}mm`}
              />
            )}
            {photo.aperture && (
              <DetailItem
                icon="bi bi-record-circle"
                label="Aperture"
                value={`ƒ/${photo.aperture}`}
              />
            )}
            {photo.shutterSpeed && (
              <DetailItem
                icon="bi bi-stopwatch"
                label="Shutter Speed"
                value={photo.shutterSpeed}
              />
            )}
            {photo.iso && (
              <DetailItem
                icon="bi bi-sun"
                label="ISO"
                value={String(photo.iso)}
              />
            )}
            {photo.dateTaken && (
              <DetailItem
                icon="bi bi-calendar-event"
                label="Date Taken"
                value={formatDate(photo.dateTaken)}
              />
            )}
          </div>
        </section>
      )}

      {/* Related Tags */}
      {relatedTags.length > 0 && (
        <section className="mb-10 pt-8 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Tags</h3>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Similar Photos */}
      {relatedPhotos.length > 0 && (
        <section className="mt-10 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Photos</h3>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {relatedPhotos.map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <PhotoCard photo={item} />
              </div>
            ))}
          </div>

          {hasNextRelatedPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMoreRelated}
                disabled={relatedLoading}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {relatedLoading ? "Loading..." : "Load More Similar Photos"}
              </button>
            </div>
          )}
        </section>
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
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <i className={`${icon} text-gray-400 text-lg mt-0.5`} />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
