// Photo types
export interface Photo {
  id: string;
  title: string;
  year?: number;
  description?: string;
  tags?: string;
  srcTiny?: string;
  srcSmall?: string;
  srcLarge?: string;
  srcOriginal?: string;
  srcYoutube?: string;
  color?: string;
  allColors?: string[];
  license?: string;
  type?: string;
  status?: string;
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

// Auth types
export interface AuthPayload {
  accessToken: string;
  expiresAt: string;
  user: {
    id: string;
    username: string;
  };
}
