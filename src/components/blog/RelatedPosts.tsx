import Link from "next/link";
import Image from "next/image";
import type { BlogListItem } from "@/lib/blog/types";
import { resolveBlogHref } from "@/lib/blog/utils";

interface RelatedPostsProps {
  currentSlug: string;
  currentTags?: string[];
  currentCategory?: string;
  allPosts: BlogListItem[];
  locale: string;
  title?: string;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function getRelatedPosts(
  currentSlug: string,
  currentTags: string[] | undefined,
  currentCategory: string | undefined,
  allPosts: BlogListItem[],
  limit = 3
): BlogListItem[] {
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  if (currentCategory) {
    const sameCategory = otherPosts.filter(
      (post) => post.category === currentCategory
    );
    if (sameCategory.length > 0) return sameCategory.slice(0, limit);
  }

  if (!currentTags || currentTags.length === 0) {
    return otherPosts.slice(0, limit);
  }

  const scoredPosts = otherPosts.map((post) => {
    const sharedTags = currentTags.filter((tag) =>
      (post.tags || []).includes(tag)
    );
    return { post, score: sharedTags.length };
  });

  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    if (a.post.date && b.post.date)
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    return 0;
  });

  return scoredPosts.slice(0, limit).map((item) => item.post);
}

export default function RelatedPosts({
  currentSlug,
  currentTags,
  currentCategory,
  allPosts,
  locale,
  title = "Related Posts",
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(
    currentSlug, currentTags, currentCategory, allPosts
  );

  if (relatedPosts.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={resolveBlogHref(locale, post.slug)}
              className="group block"
            >
              <article className="h-full bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 overflow-hidden flex flex-row md:flex-col">
                {post.coverImage && (
                  <div className="relative overflow-hidden aspect-square w-24 shrink-0 md:w-full md:aspect-[16/9]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 96px, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-3 md:p-5 flex flex-col justify-center min-w-0">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  {post.date && (
                    <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <i className="bi bi-calendar3 text-xs" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
