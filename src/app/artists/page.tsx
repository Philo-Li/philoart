"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries";
import type { User } from "@/types";

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

export default function ArtistsPage() {
  const { data, loading, fetchMore } = useQuery(GET_USERS, {
    variables: { first: 30 },
    fetchPolicy: "cache-and-network",
  });

  const users: User[] = data?.users?.edges?.map((edge: { node: User }) => edge.node) || [];
  const hasNextPage = data?.users?.pageInfo?.hasNextPage ?? false;

  const initProfileImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const clickFetchMore = () => {
    if (!hasNextPage) return;
    fetchMore({
      variables: {
        after: data?.users?.pageInfo?.endCursor,
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

  if (loading && users.length === 0) {
    return (
      <div className="discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">Discover</p>
          </div>
        </div>
        <div className="col-item-3 p-5">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-3 discover">
      <div className="p-3 container-profile">
        <div className="profile-item">
          <p className="header">Discover Artists</p>
        </div>
      </div>
      <div className="p-3 discover-author-list">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {users.map((user) => (
            <Card key={user.id}>
              <Link href={`/${user.username}`}>
                <div className="p-3">
                  <div className="container-profile">
                    <div className="profile-item">
                      <Image
                        src={user.profileImage || initProfileImage}
                        width={80}
                        height={80}
                        alt={user.username}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="profile-item">
                      <h3>{`${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username}</h3>
                    </div>
                  </div>
                  {user.description && (
                    <div className="container-profile">
                      <div className="user-description">{user.description}</div>
                    </div>
                  )}
                  <div className="container-profile">
                    <div className="profile-item">{`${user.photoCount || 0} artworks`}</div>
                    <div className="profile-item">{`${user.followerCount || 0} followers`}</div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </Masonry>

        <div>
          {hasNextPage ? (
            <div className="row-item-2">
              <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
                <i className="bi bi-three-dots" />
                More artists
              </button>
            </div>
          ) : (
            <h3 className="the-end-title">The end</h3>
          )}
        </div>
      </div>
    </div>
  );
}
