"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "@/graphql/queries";
import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";
import type { Collection } from "@/types";

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const homeCategories = [
  {
    id: "YddPZXbgHkBRf4MVkDpXM",
    title: "Photograph",
    cover: "https://cdn.philoart.io/700x700/8/FS4MIHl-LbgSc25.jpg",
  },
  {
    id: "eEWmzhJf3hR7E0NiJU98l",
    title: "Paintings",
    cover: "https://cdn.philoart.io/c/700x700/zu3VmDeCCM55iPp2zZAVZ.jpg",
  },
  {
    id: "yibOLLFlIQtchyC6b5osL",
    title: "Digital Art",
    cover: "https://cdn.philoart.io/e/700x700/psYTmeZf1z6O2jukzPlyl.jpg",
  },
];

function PhotosByType({ type }: { type?: string }) {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { photos, loading, hasNextPage, fetchMore } = usePhotos({
    checkUserLike: userId || undefined,
    checkUserCollect: userId || undefined,
    first: 20,
    searchKeyword: type || undefined,
  });

  return (
    <PhotoGrid
      photos={photos}
      loading={loading}
      hasNextPage={hasNextPage}
      onLoadMore={fetchMore}
    />
  );
}

function CollectionsTab() {
  const { data, loading } = useQuery(GET_COLLECTIONS, {
    variables: {
      first: 24,
      username: "philo",
    },
    fetchPolicy: "cache-and-network",
  });

  const collections: Collection[] = useMemo(
    () => data?.collections?.edges?.map((edge: { node: Collection }) => edge.node) || [],
    [data]
  );

  if (loading && collections.length === 0) {
    return <div className="col-item-3 py-5">Loading...</div>;
  }

  return (
    <div className="p-3">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {collections.map((collection) => (
          <Card key={collection.id}>
            <Link href={`/collection/${collection.id}`} className="view zoom overlay">
              <Image
                src={collection.cover || "https://cdn.philoart.io/700x700/8/FS4MIHl-LbgSc25.jpg"}
                alt={collection.title}
                width={700}
                height={460}
                className="max-height-30"
              />
              <div className="mask flex-center rgba-blue-light white-text">
                <p>{collection.title}</p>
              </div>
            </Link>
            <Card.Title>
              <div className="container-user-collection-list-title">
                <div className="user-collection-list-title">
                  {collection.title}
                </div>
              </div>
            </Card.Title>
          </Card>
        ))}
      </Masonry>
    </div>
  );
}

export default function HomeLegacyClient() {
  const [key, setKey] = useState("freetouse");

  return (
    <div>
      <div>
        <Carousel fade>
          <Carousel.Item>
            <div className="jumbotron-slice-1" />
            <Carousel.Caption>
              <form
                className="searchbar"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const input = form.elements.namedItem("q") as HTMLInputElement | null;
                  const q = input?.value?.trim() || "";
                  window.location.href = q ? `/search?q=${encodeURIComponent(q)}` : "/discover";
                }}
              >
                <div className="container-row-searchbar">
                  <input type="text" name="q" placeholder="Search photos..." />
                </div>
              </form>
              <h3 className="jumbotron-header">Share your artworks with the world.</h3>
              <p className="jumbotron-subheader">Create, and Post it</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-2" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Create, Mint, and Sell</h3>
              <p className="jumbotron-subheader">Discover the best NFTs(Upcoming).</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-3" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Discover the best artworks.</h3>
              <p className="jumbotron-subheader">Free for personal use and download.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="scrollmenu">
        <div className="p-3 container-row-0">
          {homeCategories.map((collection) => (
            <div key={collection.title} className="p-3">
              <Card>
                <Link href={`/collection/${collection.id}`} className="view zoom overlay">
                  <Image
                    src={collection.cover}
                    width={700}
                    height={460}
                    alt={collection.title}
                    className="max-height-30"
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
            </div>
          ))}
        </div>
      </div>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "freetouse")}
        className="mb-3"
      >
        <Tab eventKey="collections" title="Collections">
          <CollectionsTab />
        </Tab>
        <Tab eventKey="freetouse" title="Free to Use">
          <PhotosByType type="Free to Use" />
        </Tab>
        <Tab eventKey="photograph" title="Photograph">
          <PhotosByType type="Photograph" />
        </Tab>
        <Tab eventKey="painting" title="Painting">
          <PhotosByType type="Painting" />
        </Tab>
        <Tab eventKey="digitalart" title="Digital Art">
          <PhotosByType type="Digital Art" />
        </Tab>
        <Tab eventKey="drawing" title="Drawing">
          <PhotosByType type="Drawing" />
        </Tab>
        <Tab eventKey="latest" title="Latest">
          <PhotosByType />
        </Tab>
      </Tabs>
    </div>
  );
}
