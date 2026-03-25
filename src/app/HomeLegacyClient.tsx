"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useRouter } from "next/navigation";
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
  const [heroQuery, setHeroQuery] = useState("");
  const router = useRouter();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroQuery.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/discover");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden">
        <Image
          src="https://cdn.philoart.io/original/b/0yPxewc-t8bbaTS4.jpg"
          alt="PhiloArt Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Share your artworks<br className="hidden sm:block" /> with the world
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
            Discover, create, and collect beautiful photography and art
          </p>
          <form onSubmit={handleHeroSearch} className="w-full max-w-lg">
            <div className="relative">
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="Search photos, art, artists..."
                className="w-full px-6 py-4 pr-14 rounded-full bg-white/95 backdrop-blur text-gray-900 text-lg placeholder-gray-400 shadow-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <i className="bi bi-search text-white text-lg" />
              </button>
            </div>
          </form>
        </div>
      </section>

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
