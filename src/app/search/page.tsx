import { Metadata } from "next";
import SearchClient from "./SearchClient";

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

interface Props {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, type } = await searchParams;
  const query = q || type || "";

  return {
    title: query ? `Search: ${query}` : "Search",
    description: query
      ? `Search results for "${query}" on PhiloArt`
      : "Search artworks on PhiloArt",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, type } = await searchParams;

  return <SearchClient initialQuery={q || ""} initialType={type || ""} />;
}
