import { MetadataRoute } from "next";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";

const BASE_URL = "https://philoart.io";

const SITEMAP_PHOTOS = gql`
  query sitemapPhotos($first: Int, $after: String) {
    photos(first: $first, after: $after) {
      edges {
        node {
          id
          slug
          createdAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const SITEMAP_USERS = gql`
  query sitemapUsers($first: Int, $after: String) {
    users(first: $first, after: $after) {
      edges {
        node {
          username
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const SITEMAP_COLLECTIONS = gql`
  query sitemapCollections($first: Int, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

async function fetchAllPages<T>(
  query: ReturnType<typeof gql>,
  dataKey: string,
  pageSize = 100,
): Promise<T[]> {
  const results: T[] = [];
  let after: string | null = null;

  while (true) {
    try {
      const { data } = await getClient().query({
        query,
        variables: { first: pageSize, after },
      });

      const connection = data?.[dataKey];
      if (!connection) break;

      const nodes = connection.edges.map((e: { node: T }) => e.node);
      results.push(...nodes);

      const pageInfo: PageInfo = connection.pageInfo;
      if (!pageInfo.hasNextPage) break;
      after = pageInfo.endCursor;
    } catch {
      break;
    }
  }

  return results;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/discover`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/artists`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about/zh`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/license`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/license/zh`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const [photos, users, collections] = await Promise.all([
    fetchAllPages<{ id: string; slug: string | null; createdAt: string }>(SITEMAP_PHOTOS, "photos"),
    fetchAllPages<{ username: string }>(SITEMAP_USERS, "users"),
    fetchAllPages<{ id: string }>(SITEMAP_COLLECTIONS, "collections"),
  ]);

  const photoPages: MetadataRoute.Sitemap = photos.map((photo) => ({
    url: `${BASE_URL}/photo/${photo.slug ?? photo.id}`,
    lastModified: photo.createdAt ? new Date(photo.createdAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const userPages: MetadataRoute.Sitemap = users.map((user) => ({
    url: `${BASE_URL}/${user.username}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const collectionPages: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${BASE_URL}/collection/${collection.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...photoPages, ...userPages, ...collectionPages];
}
