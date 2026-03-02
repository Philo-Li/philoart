import { getClient } from "@/lib/apollo-client";
import { GET_PHOTOS } from "@/graphql/queries";
import DiscoverContent from "./DiscoverContent";
import type { Photo, Connection } from "@/types";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: "Discover - PhiloArt",
  description: "Explore amazing artworks from talented creators",
};

interface PhotosData {
  photos: Connection<Photo>;
}

async function getInitialPhotos() {
  try {
    const { data } = await getClient().query<PhotosData>({
      query: GET_PHOTOS,
      variables: { first: 24 },
    });
    return {
      photos: data.photos.edges.map((edge) => edge.node),
      pageInfo: data.photos.pageInfo,
    };
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return { photos: [], pageInfo: null };
  }
}

export default async function DiscoverPage() {
  const { photos: initialPhotos, pageInfo } = await getInitialPhotos();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover</h1>
      <p className="text-gray-600 mb-8">Explore amazing artworks from talented creators</p>

      <DiscoverContent
        initialPhotos={initialPhotos}
        initialPageInfo={pageInfo}
      />
    </div>
  );
}
