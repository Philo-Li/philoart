import DiscoverLegacyClient from "./DiscoverLegacyClient";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: "Discover - PhiloArt",
  description: "Explore amazing artworks from talented creators",
};

export default async function DiscoverPage() {
  return <DiscoverLegacyClient />;
}
