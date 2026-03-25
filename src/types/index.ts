// Photo types
export interface Photo {
  id: string;
  title: string;
  slug?: string;
  year?: number;
  description?: string;
  tags?: string;
  srcTiny?: string;
  srcSmall?: string;
  srcLarge?: string;
  srcOriginal?: string;
  srcYoutube?: string;
  color?: string;
  allColors?: string;
  license?: string;
  type?: string;
  status?: string;
  width?: number;
  height?: number;
  cameraMake?: string;
  cameraModel?: string;
  lens?: string;
  focalLength?: number;
  aperture?: number;
  shutterSpeed?: string;
  iso?: number;
  dateTaken?: string;
  allowDownload?: boolean;
  createdAt?: string;
  user?: User;
  likeCount?: number;
  collectionCount?: number;
  downloadCount?: number;
  isLiked?: boolean;
  isCollected?: boolean;
}

// User types
export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  description?: string;
  photoCount?: number;
  followerCount?: number;
  followingCount?: number;
  isFollowed?: boolean;
}

// Collection types
export interface Collection {
  id: string;
  title: string;
  description?: string;
  photoCount?: number;
  cover?: string;
  user?: User;
  isCollected?: boolean;
}

// Pagination types
export interface PageInfo {
  endCursor?: string;
  startCursor?: string;
  totalCount?: number;
  hasNextPage?: boolean;
}

export interface Edge<T> {
  node: T;
  cursor: string;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

// URL helpers
export function photoHref(photo: { id: string; slug?: string }): string {
  return photo.slug ? `/photo/${photo.slug}-${photo.id}` : `/photo/${photo.id}`;
}

/**
 * Extract photo ID from a URL param like "slug-PHOTOID" or just "PHOTOID".
 * Slugs are all-lowercase (a-z0-9-), while photo IDs always contain
 * uppercase letters or underscores (from nanoid alphabet).
 */
export function parsePhotoIdFromParam(param: string): string {
  const parts = param.split('-');
  // Scan from right to find where the ID starts (first part with uppercase/underscore)
  let idStart = parts.length;
  for (let i = parts.length - 1; i >= 0; i--) {
    if (/[A-Z_]/.test(parts[i])) {
      idStart = i;
    } else {
      break;
    }
  }
  if (idStart < parts.length) {
    return parts.slice(idStart).join('-');
  }
  // No uppercase found — treat the whole param as an ID or slug
  return param;
}

// Auth types
export interface AuthPayload {
  accessToken: string;
  expiresAt: string;
  user: {
    id: string;
    username: string;
  };
}
