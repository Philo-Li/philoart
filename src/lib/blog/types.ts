export const SUPPORTED_LOCALES = [
  "en", "zh", "ja", "zh-TW", "de", "fr", "ko", "es", "it", "vi",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export interface BlogMeta {
  title: string;
  description?: string;
  seoDescription?: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogMeta;
  content: string;
}

export interface BlogListItem {
  slug: string;
  title: string;
  description?: string;
  seoDescription?: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  coverImage?: string;
}

export interface BlogSiteData {
  posts: Record<string, BlogPost>;
  postsList: BlogListItem[];
  blogTitle: string;
  blogDescription: string;
  blogSeoDescription: string;
}

export interface BlogTranslations {
  blogTitle: string;
  blogDescription: string;
  blogSeoDescription: string;
  categories: string;
  allPosts: string;
  relatedPosts: string;
  categoryNames: Record<string, string>;
}
