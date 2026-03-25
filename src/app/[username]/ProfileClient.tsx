"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Masonry from "react-masonry-css";
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

const initProfileImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

export default function ProfileClient({ initialUser, username }: Props) {
  const [key, setKey] = useState("photograph");
  const [userNow, setUserNow] = useState(initialUser);
  const [follow, setFollow] = useState(Boolean(initialUser.isFollowed));
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const isFollowDisabled = Boolean(userNow && userId === userNow.id);

  const photoType = useMemo(() => {
    switch (key) {
      case "photograph": return "Photograph";
      case "painting": return "Painting";
      case "digitalart": return "Digital Art";
      case "drawing": return "Drawing";
      default: return undefined;
    }
  }, [key]);

  const { photos, loading, fetchingMore, hasNextPage, fetchMore } = usePhotos({
    username,
    first: 20,
    checkUserLike: userId || undefined,
    type: photoType || undefined,
  });

  const {
    data: collectionsData,
    loading: collectionsLoading,
    fetchMore: fetchMoreCollections,
  } = useQuery(GET_COLLECTIONS, {
    variables: { username, first: 30 },
    skip: key !== "collections",
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
    skip: key !== "likes",
    fetchPolicy: "cache-and-network",
  });
  const collections: Collection[] =
    collectionsData?.collections?.edges?.map((edge: { node: Collection }) => edge.node) || [];
  const likes: Photo[] =
    likesData?.likes?.edges?.map((edge: { node: { photo: Photo } }) => edge.node.photo) || [];

  const hasNextCollectionsPage = collectionsData?.collections?.pageInfo?.hasNextPage ?? false;
  const hasNextLikesPage = likesData?.likes?.pageInfo?.hasNextPage ?? false;

  const handleFollowUser = async () => {
    if (!userId) {
      window.location.href = "/signin";
      return;
    }

    setFollow((prev) => !prev);
    try {
      if (userNow.isFollowed) {
        await unfollowUser({ variables: { userId: userNow.id } });
      } else {
        await followUser({ variables: { userId: userNow.id } });
      }
      setUserNow((prev) => ({ ...prev, isFollowed: !prev.isFollowed }));
    } catch {
      setFollow((prev) => !prev);
    }
  };

  const loadMoreCollections = () => {
    if (!hasNextCollectionsPage) return;
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
  };

  const loadMoreLikes = () => {
    if (!hasNextLikesPage) return;
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
  };

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image
            src={userNow.profileImage || initProfileImage}
            width={100}
            height={100}
            alt={userNow.username}
            className="rounded-circle"
          />
        </div>
        <div className="profile-item">
          <h1>{`${userNow.firstName || ""} ${userNow.lastName || ""}`.trim() || userNow.username}</h1>
        </div>
      </div>

      {userNow.description && (
        <div className="container-profile">
          <div className="user-description">{userNow.description}</div>
        </div>
      )}

      <div className="container-profile">
        <div className="profile-item">{`${userNow.photoCount || 0} artworks`}</div>
        <div className="profile-item">{`${userNow.followerCount || 0} followers`}</div>
        <div className="profile-item">
          {follow ? (
            <button
              className="button-unfollow"
              type="button"
              onClick={handleFollowUser}
              disabled={isFollowDisabled}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="button-follow"
              type="button"
              onClick={handleFollowUser}
              disabled={isFollowDisabled}
            >
              Follow
            </button>
          )}
        </div>
      </div>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "photograph")}
        className="mb-3"
      >
        <Tab eventKey="photograph" title="Photograph">
          <PhotoGrid
            photos={photos}
            loading={loading}
            hasNextPage={hasNextPage}
            onLoadMore={fetchMore}
          />
        </Tab>
        <Tab eventKey="painting" title="Painting">
          <PhotoGrid
            photos={photos}
            loading={loading}
            hasNextPage={hasNextPage}
            onLoadMore={fetchMore}
          />
        </Tab>
        <Tab eventKey="digitalart" title="Digital Art">
          <PhotoGrid
            photos={photos}
            loading={loading}
            hasNextPage={hasNextPage}
            onLoadMore={fetchMore}
          />
        </Tab>
        <Tab eventKey="drawing" title="Drawing">
          <PhotoGrid
            photos={photos}
            loading={loading}
            hasNextPage={hasNextPage}
            onLoadMore={fetchMore}
          />
        </Tab>
        <Tab eventKey="collections" title="Collections">
          {collectionsLoading && collections.length === 0 ? (
            <div className="p-3">Loading...</div>
          ) : (
            <div className="p-3 photo-list-container">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {collections.map((collection) => (
                  <Card key={collection.id}>
                    <Link href={`/collection/${collection.id}`} className="view zoom overlay">
                      <img
                        src={collection.cover || "https://cdn.philoart.io/700x700/8/FS4MIHl-LbgSc25.jpg"}
                        className="max-height-30"
                        alt={collection.title}
                      />
                      <div className="mask flex-center rgba-blue-light white-text">
                        <p>{collection.title}</p>
                      </div>
                    </Link>
                    <Card.Title>
                      <div className="container-user-collection-list-title">
                        <div className="user-collection-list-title">{collection.title}</div>
                      </div>
                    </Card.Title>
                  </Card>
                ))}
              </Masonry>
              {hasNextCollectionsPage ? (
                <div className="row-item-2">
                  <button className="more-photos-btn" type="button" onClick={loadMoreCollections}>
                    <i className="bi bi-three-dots" />
                    More collections
                  </button>
                </div>
              ) : (
                <h3 className="the-end-title">The end</h3>
              )}
            </div>
          )}
        </Tab>
        <Tab eventKey="likes" title="Likes">
          <PhotoGrid
            photos={likes}
            loading={likesLoading}
            hasNextPage={hasNextLikesPage}
            onLoadMore={loadMoreLikes}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
