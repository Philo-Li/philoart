import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogList from "@/components/blog/BlogList";
import { buildBlogSite, getBlogTranslations } from "@/lib/blog/engine";

const locale = "en";

interface BlogPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = buildBlogSite(locale);

  if (!slug || slug.length === 0) {
    return {
      title: site.blogTitle,
      description: site.blogSeoDescription,
      openGraph: {
        title: site.blogTitle,
        description: site.blogSeoDescription,
        type: "website",
        locale: "en_US",
        siteName: "PhiloArt",
      },
    };
  }

  const slugKey = slug.join("/");
  const post = site.posts[slugKey];
  if (!post) notFound();

  const description = post.meta.seoDescription ?? post.meta.description ?? site.blogDescription;
  return {
    title: post.meta.title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: "article",
      locale: "en_US",
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

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
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

export function generateStaticParams() {
  const site = buildBlogSite(locale);
  const slugs = Object.keys(site.posts).map((key) => ({
    slug: key.split("/"),
  }));
  return [{ slug: undefined }, ...slugs];
}
