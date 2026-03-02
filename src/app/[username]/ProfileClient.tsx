"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { User, Collection, Photo } from "@/types";
import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";
import { FOLLOW_USER, UNFOLLOW_USER } from "@/graphql/mutations";
import { GET_COLLECTIONS, GET_USER_LIKES } from "@/graphql/queries";

interface Props {
  initialUser: User;
  username: string;
}

const ART_TABS = [
  { key: "photograph", label: "Photograph" },
  { key: "painting", label: "Painting" },
  { key: "digitalart", label: "Digital Art" },
  { key: "drawing", label: "Drawing" },
  { key: "collections", label: "Collections" },
  { key: "likes", label: "Likes" },
];

export default function ProfileClient({ initialUser, username }: Props) {
  const [user, setUser] = useState(initialUser);
  const [activeTab, setActiveTab] = useState("photograph");
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const isOwnProfile = userId === user.id;

  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  // Get type filter based on active tab
  const getTypeFilter = () => {
    switch (activeTab) {
      case "photograph": return "Photograph";
      case "painting": return "Painting";
      case "digitalart": return "Digital Art";
      case "drawing": return "Drawing";
      default: return undefined;
    }
  };

  const { photos, loading, hasNextPage, fetchMore } = usePhotos({
    username,
    first: 20,
    checkUserLike: userId || undefined,
  });

  const {
    data: collectionsData,
    loading: collectionsLoading,
    fetchMore: fetchMoreCollections,
  } = useQuery(GET_COLLECTIONS, {
    variables: {
      username,
      first: 20,
    },
    skip: activeTab !== "collections",
    fetchPolicy: "cache-and-network",
  });

  const {
    data: likesData,
    loading: likesLoading,
    fetchMore: fetchMoreLikes,
  } = useQuery(GET_USER_LIKES, {
    variables: {
      username,
      first: 20,
      checkUserLike: userId || undefined,
    },
    skip: activeTab !== "likes",
    fetchPolicy: "cache-and-network",
  });

  // Filter photos by type (client-side for simplicity)
  const typeFilter = getTypeFilter();
  const filteredPhotos = typeFilter
    ? photos.filter((p) => p.type === typeFilter)
    : photos;

  const collections: Collection[] = collectionsData?.collections?.edges?.map(
    (edge: { node: Collection }) => edge.node
  ) || [];
  const likedPhotos: Photo[] = likesData?.likes?.edges?.map(
    (edge: { node: { photo: Photo } }) => edge.node.photo
  ) || [];

  const hasNextCollectionsPage = collectionsData?.collections?.pageInfo?.hasNextPage ?? false;
  const hasNextLikesPage = likesData?.likes?.pageInfo?.hasNextPage ?? false;

  const handleLoadMoreCollections = useCallback(() => {
    if (!hasNextCollectionsPage || collectionsLoading) return;

    fetchMoreCollections({
      variables: {
        after: collectionsData?.collections?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          collections: {
            ...fetchMoreResult.collections,
            edges: [...prev.collections.edges, ...fetchMoreResult.collections.edges],
          },
        };
      },
    });
  }, [hasNextCollectionsPage, collectionsLoading, fetchMoreCollections, collectionsData]);

  const handleLoadMoreLikes = useCallback(() => {
    if (!hasNextLikesPage || likesLoading) return;

    fetchMoreLikes({
      variables: {
        after: likesData?.likes?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          likes: {
            ...fetchMoreResult.likes,
            edges: [...prev.likes.edges, ...fetchMoreResult.likes.edges],
          },
        };
      },
    });
  }, [hasNextLikesPage, likesLoading, fetchMoreLikes, likesData]);

  const handleFollow = async () => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    const newIsFollowed = !user.isFollowed;
    setUser({ ...user, isFollowed: newIsFollowed });

    try {
      if (user.isFollowed) {
        await unfollowUser({ variables: { userId: user.id } });
      } else {
        await followUser({ variables: { userId: user.id } });
      }
    } catch (error) {
      setUser({ ...user, isFollowed: !newIsFollowed });
      console.error("Failed to update follow:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src={user.profileImage || defaultAvatar}
          alt={user.firstName || "User"}
          width={120}
          height={120}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900">
          {user.firstName} {user.lastName || ""}
        </h1>
        {user.description && (
          <p className="text-gray-600 text-center max-w-md mt-2">{user.description}</p>
        )}

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          <span><strong>{user.photoCount || 0}</strong> artworks</span>
          <span><strong>{user.followerCount || 0}</strong> followers</span>
        </div>

        {/* Follow Button */}
        {!isOwnProfile && (
          <button
            onClick={handleFollow}
            className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
              user.isFollowed
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {user.isFollowed ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-8 overflow-x-auto">
          {ART_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-1 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === "collections" ? (
        <>
          {!collections.length && collectionsLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
          ) : !collections.length ? (
            <div className="text-center py-20 text-gray-500">No collections yet</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collection/${collection.id}`}
                    className="block rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className="h-44 bg-gray-100 bg-cover bg-center"
                      style={{ backgroundImage: collection.cover ? `url(${collection.cover})` : "none" }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{collection.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{collection.photoCount || 0} photos</p>
                    </div>
                  </Link>
                ))}
              </div>
              {hasNextCollectionsPage && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMoreCollections}
                    disabled={collectionsLoading}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {collectionsLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : activeTab === "likes" ? (
        <PhotoGrid
          photos={likedPhotos}
          loading={likesLoading}
          hasNextPage={hasNextLikesPage}
          onLoadMore={handleLoadMoreLikes}
        />
      ) : (
        <PhotoGrid
          photos={filteredPhotos}
          loading={loading}
          hasNextPage={hasNextPage}
          onLoadMore={fetchMore}
        />
      )}
    </div>
  );
}
