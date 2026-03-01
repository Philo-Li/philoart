"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { User } from "@/types";
import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";
import { FOLLOW_USER, UNFOLLOW_USER } from "@/graphql/mutations";

interface Props {
  initialUser: User;
  username: string;
}

const TABS = [
  { key: "photograph", label: "Photograph" },
  { key: "painting", label: "Painting" },
  { key: "digitalart", label: "Digital Art" },
  { key: "drawing", label: "Drawing" },
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

  // Filter photos by type (client-side for simplicity)
  const typeFilter = getTypeFilter();
  const filteredPhotos = typeFilter
    ? photos.filter((p) => p.type === typeFilter)
    : photos;

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
          {TABS.map((tab) => (
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

      {/* Photos Grid */}
      <PhotoGrid
        photos={filteredPhotos}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={fetchMore}
      />
    </div>
  );
}
