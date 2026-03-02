"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "@/graphql/queries";
import type { Collection } from "@/types";

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const sections = [
  { title: "Nature", key: "Nature" },
  { title: "Human", key: "Human" },
  { title: "Mood", key: "Mood" },
  { title: "Delicious food", key: "Food" },
  { title: "Animals", key: "Animals" },
  { title: "Light and shadow", key: "Light And Shadow" },
  { title: "On the Road", key: "Street Photography" },
  { title: "Other", key: "" },
];

function CollectionSection({
  title,
  filterValue,
  allCollections,
}: {
  title: string;
  filterValue: string;
  allCollections: Collection[];
}) {
  const collectionsToShow = allCollections.filter(
    (collection) => (collection.description || "") === filterValue
  );

  return (
    <div className="p-3">
      <div className="container-profile profile-item subheader">
        <p>{title}</p>
      </div>
      <div className="p-3">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {collectionsToShow.map((collection) => (
            <Card key={collection.id}>
              <Link href={`/collection/${collection.id}`} className="view zoom overlay">
                <Image
                  src={collection.cover || "https://cdn.philoart.io/700x700/8/FS4MIHl-LbgSc25.jpg"}
                  width={700}
                  height={460}
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
      </div>
    </div>
  );
}

export default function DiscoverLegacyClient() {
  const adminUsername = process.env.NEXT_PUBLIC_PHILOART_ADMIN || "philo";

  const { data, loading } = useQuery(GET_COLLECTIONS, {
    variables: {
      username: adminUsername,
      first: 120,
    },
    fetchPolicy: "cache-and-network",
  });

  const allCollections: Collection[] =
    data?.collections?.edges?.map((edge: { node: Collection }) => edge.node) || [];

  if (loading && allCollections.length === 0) {
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
          <p className="header">Discover</p>
        </div>
      </div>
      {sections.map((section) => (
        <CollectionSection
          key={section.title}
          title={section.title}
          filterValue={section.key}
          allCollections={allCollections}
        />
      ))}
    </div>
  );
}
