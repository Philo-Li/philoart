import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_COLLECTION } from "@/graphql/queries";
import CollectionClient from "./CollectionClient";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await getClient().query({
      query: GET_COLLECTION,
      variables: { id, first: 1 },
    });

    const collection = data?.collection;

    if (!collection) {
      return { title: "Collection Not Found" };
    }

    return {
      title: collection.title,
      description: collection.description || `Collection by ${collection.user?.username}`,
      openGraph: {
        title: collection.title,
        description: collection.description || `Collection with ${collection.photoCount} photos`,
        images: collection.cover ? [{ url: collection.cover }] : [],
      },
    };
  } catch {
    return { title: "Collection" };
  }
}

export default async function CollectionPage({ params }: Props) {
  const { id } = await params;

  let collection = null;
  try {
    const { data } = await getClient().query({
      query: GET_COLLECTION,
      variables: { id, first: 20 },
    });
    collection = data?.collection;
  } catch (error) {
    console.error("Failed to fetch collection:", error);
  }

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
        <p className="text-gray-600">The collection you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return <CollectionClient initialCollection={collection} />;
}
