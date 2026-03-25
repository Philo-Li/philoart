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
    cover: "https://cdn.philoart.io/1200x1200/8/FS4MIHl-MK0Dc80.jpg",
  },
  {
    id: "yibOLLFlIQtchyC6b5osL",
    title: "Digital Art",
    cover: "https://cdn.philoart.io/1200x1200/c/FS4MIHl-sfW8jH_.jpg",
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
      <section className="relative h-[75vh] min-h-[520px] max-h-[800px] overflow-hidden">
        <Image
          src="https://cdn.philoart.io/original/b/0yPxewc-t8bbaTS4.jpg"
          alt="PhiloArt Hero"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 px-6 text-center">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/60 mb-4 font-light">
            Photography &middot; Art &middot; Creation
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 tracking-wide leading-tight">
            Share Your Art
            <br />
            <span className="italic">With the World</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 mb-10 max-w-md font-light leading-relaxed">
            Discover, create, and collect beautiful photography and art from artists around the globe
          </p>
          <form onSubmit={handleHeroSearch} className="w-full max-w-xl">
            <div className="relative group">
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="Search photos, art, artists..."
                className="w-full px-7 py-4 pr-14 rounded-full bg-white/15 backdrop-blur-md text-white text-base placeholder-white/50 border border-white/25 outline-none focus:bg-white/25 focus:border-white/50 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <i className="bi bi-search text-white" />
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
