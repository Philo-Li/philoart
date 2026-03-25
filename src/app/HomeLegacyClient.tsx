"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "@/graphql/queries";
import { usePhotos } from "@/hooks";
import { PhotoGrid } from "@/components/photo";
import type { Collection } from "@/types";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/collection/${collection.id}`}
          className="group relative block overflow-hidden rounded-lg"
        >
          <Image
            src={collection.cover || "https://cdn.philoart.io/700x700/8/FS4MIHl-LbgSc25.jpg"}
            alt={collection.title}
            width={700}
            height={460}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
            <p className="text-white text-lg font-semibold">{collection.title}</p>
          </div>
        </Link>
      ))}
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-6">
        {homeCategories.map((collection) => (
          <Link
            key={collection.title}
            href={`/collection/${collection.id}`}
            className="group relative block overflow-hidden rounded-lg"
          >
            <Image
              src={collection.cover}
              width={700}
              height={460}
              alt={collection.title}
              className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/40">
              <p className="text-white text-xl font-semibold">{collection.title}</p>
            </div>
          </Link>
        ))}
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
