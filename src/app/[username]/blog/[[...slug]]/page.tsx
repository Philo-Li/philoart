import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogList from "@/components/blog/BlogList";
import {
  buildBlogSite,
  getBlogTranslations,
  SUPPORTED_LOCALES,
} from "@/lib/blog/engine";
import { isValidBlogLocale } from "@/lib/blog/utils";

interface LocaleBlogPageProps {
  params: Promise<{ username: string; slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: LocaleBlogPageProps): Promise<Metadata> {
  const { username: locale, slug } = await params;
  if (!isValidBlogLocale(locale)) notFound();

  const site = buildBlogSite(locale);

  if (!slug || slug.length === 0) {
    return {
      title: site.blogTitle,
      description: site.blogSeoDescription,
      openGraph: {
        title: site.blogTitle,
        description: site.blogSeoDescription,
        type: "website",
        siteName: "PhiloArt",
      },
    };
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  const description =
    post.meta.seoDescription ?? post.meta.description ?? site.blogDescription;
  return {
    title: post.meta.title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: "article",
      siteName: "PhiloArt",
      ...(post.meta.coverImage && {
        images: [{ url: post.meta.coverImage, width: 1200, height: 630, alt: post.meta.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description,
      ...(post.meta.coverImage && { images: [post.meta.coverImage] }),
    },
  };
}

export default async function LocaleBlogPage({
  params,
}: LocaleBlogPageProps) {
  const { username: locale, slug } = await params;
  if (!isValidBlogLocale(locale)) notFound();

  const site = buildBlogSite(locale);
  const t = getBlogTranslations(locale);

  if (!slug || slug.length === 0) {
    return (
      <BlogList
        posts={site.postsList}
        locale={locale}
        title={site.blogTitle}
        description={site.blogDescription}
        categoriesLabel={t.categories}
        allPostsLabel={t.allPosts}
        categoryNames={t.categoryNames}
      />
    );
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  return (
    <BlogArticle
      post={post}
      allPosts={site.postsList}
      locale={locale}
      relatedPostsTitle={t.relatedPosts}
    />
  );
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => {
    const site = buildBlogSite(locale);
    const slugs = Object.keys(site.posts).map((key) => ({
      username: locale,
      slug: key.split("/"),
    }));
    return [{ username: locale, slug: undefined }, ...slugs];
  });
}
