import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_PHOTO } from "@/graphql/queries";
import { parsePhotoIdFromParam } from "@/types";
import PhotoDetailClient from "./PhotoDetailClient";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

function resolveVariables(rawParam: string) {
  const extracted = parsePhotoIdFromParam(rawParam);
  // If extraction found an ID (contains uppercase/underscore), query by id
  // Otherwise treat the whole param as a slug (fallback to ID in backend)
  const hasUpperCase = /[A-Z_]/.test(extracted);
  return hasUpperCase ? { id: extracted } : { slug: rawParam };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: rawParam } = await params;
  const variables = resolveVariables(rawParam);

  try {
    const { data } = await getClient().query({
      query: GET_PHOTO,
      variables,
    });

    const photo = data?.photo;

    if (!photo) {
      return {
        title: "Photo Not Found",
      };
    }

    return {
      title: photo.title,
      description: photo.description || `Artwork by ${photo.user?.firstName || "Unknown"}`,
      openGraph: {
        title: photo.title,
        description: photo.description || `Artwork by ${photo.user?.firstName || "Unknown"}`,
        images: [
          {
            url: photo.srcLarge || photo.srcSmall,
            width: 1200,
            height: 630,
            alt: photo.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: photo.title,
        description: photo.description || `Artwork by ${photo.user?.firstName || "Unknown"}`,
        images: [photo.srcLarge || photo.srcSmall],
      },
    };
  } catch {
    return {
      title: "Photo",
    };
  }
}

export default async function PhotoPage({ params }: Props) {
  const { id: rawParam } = await params;
  const variables = resolveVariables(rawParam);

  // Fetch photo data on server
  let photo = null;
  try {
    const { data } = await getClient().query({
      query: GET_PHOTO,
      variables,
    });
    photo = data?.photo;
  } catch (error) {
    console.error("Failed to fetch photo:", error);
  }

  if (!photo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Photo Not Found</h1>
        <p className="text-gray-600">The photo you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  return <PhotoDetailClient initialPhoto={photo} />;
}
