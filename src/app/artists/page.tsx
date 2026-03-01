"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries";

interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  photoCount?: number;
  followerCount?: number;
}

export default function ArtistsPage() {
  const { data, loading, fetchMore } = useQuery(GET_USERS, {
    variables: { first: 20 },
  });

  const users: User[] = data?.users?.edges?.map((edge: { node: User }) => edge.node) ?? [];
  const hasNextPage = data?.users?.pageInfo?.hasNextPage ?? false;

  const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const handleLoadMore = () => {
    if (!hasNextPage) return;

    fetchMore({
      variables: {
        after: data.users.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          users: {
            ...fetchMoreResult.users,
            edges: [...prev.users.edges, ...fetchMoreResult.users.edges],
          },
        };
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Artists</h1>
      <p className="text-gray-600 mb-8">Discover talented creators on PhiloArt</p>

      {loading && users.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/${user.username}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={user.profileImage || defaultAvatar}
                    alt={user.firstName || user.username}
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                  />
                  <h3 className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName || ""}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">@{user.username}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{user.photoCount || 0} artworks</span>
                    <span>{user.followerCount || 0} followers</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
