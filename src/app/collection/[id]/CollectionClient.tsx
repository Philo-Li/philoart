"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_COLLECTION } from "@/graphql/queries";
import { DELETE_COLLECTION, EDIT_COLLECTION } from "@/graphql/mutations";
import { PhotoCard } from "@/components/photo";
import { Photo } from "@/types";

interface Collection {
  id: string;
  title: string;
  description?: string;
  photoCount?: number;
  cover?: string;
  user?: {
    username: string;
  };
  photos?: {
    edges: Array<{
      node: {
        photo: Photo;
      };
      cursor: string;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
  };
}

interface Props {
  initialCollection: Collection;
}

export default function CollectionClient({ initialCollection }: Props) {
  const router = useRouter();
  const [collection, setCollection] = useState(initialCollection);
  const [showEditModal, setShowEditModal] = useState(false);
  const [titleInput, setTitleInput] = useState(initialCollection.title);
  const [descriptionInput, setDescriptionInput] = useState(initialCollection.description || "");
  const [error, setError] = useState("");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const isOwner = Boolean(username && collection.user?.username === username);

  const [editCollection, { loading: editing }] = useMutation(EDIT_COLLECTION);
  const [deleteCollection, { loading: deleting }] = useMutation(DELETE_COLLECTION);

  const { data, loading, fetchMore } = useQuery(GET_COLLECTION, {
    variables: {
      id: collection.id,
      first: 20,
      checkUserLike: userId || undefined,
    },
    skip: !collection.id,
  });

  const liveCollection = data?.collection || collection;

  useEffect(() => {
    if (data?.collection) {
      setCollection(data.collection);
      setTitleInput(data.collection.title || "");
      setDescriptionInput(data.collection.description || "");
    }
  }, [data]);

  const photos: Photo[] = (liveCollection?.photos?.edges || [])
    .map((edge: { node: { photo: Photo } }) => edge.node.photo);

  const hasNextPage = liveCollection?.photos?.pageInfo?.hasNextPage ?? false;

  const handleLoadMore = () => {
    if (!hasNextPage) return;

    fetchMore({
      variables: {
        after: data.collection.photos.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          collection: {
            ...fetchMoreResult.collection,
            photos: {
              ...fetchMoreResult.collection.photos,
              edges: [
                ...prev.collection.photos.edges,
                ...fetchMoreResult.collection.photos.edges,
              ],
            },
          },
        };
      },
    });
  };

  const handleEdit = async () => {
    const nextTitle = titleInput.trim();
    if (!nextTitle) {
      setError("Title is required");
      return;
    }

    try {
      setError("");
      await editCollection({
        variables: {
          collectionId: collection.id,
          newTitle: nextTitle,
          newDescription: descriptionInput.trim(),
        },
      });

      setCollection((prev) => ({
        ...prev,
        title: nextTitle,
        description: descriptionInput.trim(),
      }));
      setShowEditModal(false);
    } catch (e) {
      console.error("Failed to edit collection:", e);
      setError("Failed to save changes");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this collection? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteCollection({ variables: { id: collection.id } });
      router.push(username ? `/${username}` : "/");
    } catch (e) {
      console.error("Failed to delete collection:", e);
      setError("Failed to delete collection");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8">
        {collection.cover && (
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-6">
            <Image
              src={collection.cover}
              alt={liveCollection.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-white">{liveCollection.title}</h1>
            </div>
          </div>
        )}

        {!collection.cover && (
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{liveCollection.title}</h1>
        )}

        {liveCollection.description && (
          <p className="text-gray-600 mb-4">{liveCollection.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {liveCollection.user && (
            <Link
              href={`/${liveCollection.user.username}`}
              className="hover:text-blue-600"
            >
              By @{liveCollection.user.username}
            </Link>
          )}
          <span>{liveCollection.photoCount || 0} photos</span>
        </div>

        {isOwner && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Edit Collection
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete Collection"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {photos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid">
                <PhotoCard photo={photo} />
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No photos in this collection yet
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Collection</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={editing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editing ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
