"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COLLECTION } from "@/graphql/queries";
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
  const [collection] = useState(initialCollection);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { data, loading, fetchMore } = useQuery(GET_COLLECTION, {
    variables: {
      id: collection.id,
      first: 20,
      checkUserLike: userId || undefined,
    },
    skip: !collection.id,
  });

  const photos: Photo[] = (data?.collection?.photos?.edges || collection.photos?.edges || [])
    .map((edge: { node: { photo: Photo } }) => edge.node.photo);

  const hasNextPage = data?.collection?.photos?.pageInfo?.hasNextPage ?? false;

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8">
        {collection.cover && (
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-6">
            <Image
              src={collection.cover}
              alt={collection.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-white">{collection.title}</h1>
            </div>
          </div>
        )}

        {!collection.cover && (
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{collection.title}</h1>
        )}

        {collection.description && (
          <p className="text-gray-600 mb-4">{collection.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {collection.user && (
            <Link
              href={`/${collection.user.username}`}
              className="hover:text-blue-600"
            >
              By @{collection.user.username}
            </Link>
          )}
          <span>{collection.photoCount || 0} photos</span>
        </div>
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
    </div>
  );
}
