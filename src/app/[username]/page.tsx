import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_USER } from "@/graphql/queries";
import ProfileClient from "./ProfileClient";

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  try {
    const { data } = await getClient().query({
      query: GET_USER,
      variables: { username },
    });

    const user = data?.user;

    if (!user) {
      return { title: "User Not Found" };
    }

    const fullName = `${user.firstName} ${user.lastName || ""}`.trim();

    return {
      title: fullName,
      description: user.description || `${fullName}'s artwork portfolio on PhiloArt`,
      openGraph: {
        title: `${fullName} | PhiloArt`,
        description: user.description || `${fullName}'s artwork portfolio`,
        images: user.profileImage ? [{ url: user.profileImage }] : [],
        type: "profile",
      },
    };
  } catch {
    return { title: "Profile" };
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;

  let user = null;
  try {
    const { data } = await getClient().query({
      query: GET_USER,
      variables: { username },
    });
    user = data?.user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
        <p className="text-gray-600">The user you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return <ProfileClient initialUser={user} username={username} />;
}
