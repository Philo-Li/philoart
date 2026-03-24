import fs from "node:fs";
import path from "node:path";
import type {
  BlogMeta,
  BlogPost,
  BlogListItem,
  BlogSiteData,
  BlogTranslations,
} from "./types";

const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);

const SUPPORTED_LOCALES = [
  "en", "zh", "ja", "zh-TW", "de", "fr", "ko", "es", "it", "vi",
];

const translationCache = new Map<string, BlogTranslations>();

function loadTranslations(locale: string): BlogTranslations {
  const cached = translationCache.get(locale);
  if (cached) return cached;

  const filePath = path.join(
    process.cwd(),
    "src/lib/blog/translations",
    `${locale}.json`
  );

  let translations: BlogTranslations;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    translations = JSON.parse(raw);
  } catch {
    if (locale !== "en") {
      return loadTranslations("en");
    }
    translations = {
      blogTitle: "PhiloArt Blog",
      blogDescription: "Photography, art, and creative stories",
      blogSeoDescription: "Photography, art, and creative stories from PhiloArt",
      categories: "Categories",
      allPosts: "All Posts",
      relatedPosts: "Related Posts",
      categoryNames: {},
    };
  }

  translationCache.set(locale, translations);
  return translations;
}

function getBlogRoot(locale: string): string {
  const centralizedPath = path.join(process.cwd(), "blog", locale);
  if (fs.existsSync(centralizedPath)) {
    return centralizedPath;
  }

  if (locale !== "en") {
    const enPath = path.join(process.cwd(), "blog", "en");
    if (fs.existsSync(enPath)) {
      return enPath;
    }
  }

  return path.join(process.cwd(), "blog");
}

function isMarkdownFile(fileName: string) {
  return MARKDOWN_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function removeExtension(fileName: string) {
  return fileName.slice(0, -path.extname(fileName).length);
}

interface FrontMatterResult {
  data: Record<string, string>;
  content: string;
}

function parseFrontMatter(source: string): FrontMatterResult {
  const lines = source.split(/\r?\n/);
  if (lines.length === 0 || lines[0].trim() !== "---") {
    return { data: {}, content: source.trim() };
  }

  let closingIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    return { data: {}, content: source.trim() };
  }

  const data: Record<string, string> = {};
  const frontMatterLines = lines.slice(1, closingIndex);
  for (const line of frontMatterLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key.length === 0) continue;
    data[key] = value.replace(/^['"]|['"]$/g, "");
  }

  const content = lines.slice(closingIndex + 1).join("\n").trim();
  return { data, content };
}

function parseTagsArray(tagsString?: string): string[] {
  if (!tagsString) return [];
  const trimmed = tagsString.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  if (trimmed.startsWith('["')) {
    try { return JSON.parse(trimmed); } catch { return []; }
  }

  return trimmed.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function loadBlogPost(filePath: string, slug: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontMatter(raw);

  if (slug === "index") return null;

  const meta: BlogMeta = {
    title: data.title || slug,
    description: data.description,
    seoDescription: data.seoDescription,
    date: data.date,
    author: data.author,
    tags: parseTagsArray(data.tags),
    category: data.category,
    coverImage: data.coverImage,
  };

  return { slug, meta, content };
}

function loadBlogPosts(blogRoot: string): BlogPost[] {
  if (!fs.existsSync(blogRoot)) return [];

  const posts: BlogPost[] = [];
  const entries = fs.readdirSync(blogRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;
    const slug = removeExtension(entry.name);
    const post = loadBlogPost(path.join(blogRoot, entry.name), slug);
    if (post) posts.push(post);
  }

  return posts;
}

function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    if (!a.meta.date) return 1;
    if (!b.meta.date) return -1;
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
}

function buildPostsRecord(posts: BlogPost[]): Record<string, BlogPost> {
  return posts.reduce<Record<string, BlogPost>>((acc, post) => {
    acc[post.slug] = post;
    return acc;
  }, {});
}

function buildPostsList(posts: BlogPost[]): BlogListItem[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.meta.title,
    description: post.meta.description,
    seoDescription: post.meta.seoDescription,
    date: post.meta.date,
    author: post.meta.author,
    tags: post.meta.tags,
    category: post.meta.category,
    coverImage: post.meta.coverImage,
  }));
}

export function buildBlogSite(locale: string): BlogSiteData {
  const t = loadTranslations(locale);
  const blogRoot = getBlogRoot(locale);
  const posts = loadBlogPosts(blogRoot);
  const sortedPosts = sortPostsByDate(posts);

  return {
    posts: buildPostsRecord(sortedPosts),
    postsList: buildPostsList(sortedPosts),
    blogTitle: t.blogTitle,
    blogDescription: t.blogDescription,
    blogSeoDescription: t.blogSeoDescription,
  };
}

export function getBlogTranslations(locale: string): BlogTranslations {
  return loadTranslations(locale);
}

export { SUPPORTED_LOCALES };
