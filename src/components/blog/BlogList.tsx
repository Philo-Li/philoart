"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogListItem } from "@/lib/blog/types";
import { resolveBlogHref } from "@/lib/blog/utils";

interface BlogListProps {
  posts: BlogListItem[];
  locale: string;
  title: string;
  description: string;
  categoriesLabel: string;
  allPostsLabel: string;
  categoryNames?: Record<string, string>;
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

export default function BlogList({
  posts,
  locale,
  title,
  description,
  categoriesLabel,
  allPostsLabel,
  categoryNames = {},
}: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryDisplayName = (key: string) => categoryNames[key] || key;

  const categoriesWithCount = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((post) => {
      if (post.category) {
        map.set(post.category, (map.get(post.category) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center md:px-6 py-16 md:py-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-500 md:text-xl max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Posts with Sidebar */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              {categoriesWithCount.length > 0 && (
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="sticky top-24">
                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <i className="bi bi-folder text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                          {categoriesLabel}
                        </h2>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                            selectedCategory === null
                              ? "bg-blue-600 text-white font-medium"
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{allPostsLabel}</span>
                            <span className={`text-sm ${selectedCategory === null ? "text-white/80" : "text-gray-400"}`}>
                              {posts.length}
                            </span>
                          </div>
                        </button>
                        {categoriesWithCount.map(({ name, count }) => (
                          <button
                            key={name}
                            onClick={() => setSelectedCategory(name)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                              selectedCategory === name
                                ? "bg-blue-600 text-white font-medium"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{getCategoryDisplayName(name)}</span>
                              <span className={`text-sm ml-2 flex-shrink-0 ${selectedCategory === name ? "text-white/80" : "text-gray-400"}`}>
                                {count}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              )}

              {/* Posts Grid */}
              <div className="flex-1 min-w-0">
                {selectedCategory && (
                  <div className="mb-6 flex items-center gap-3">
                    <span className="inline-block px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-full">
                      {getCategoryDisplayName(selectedCategory)}
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-gray-500 hover:text-gray-900 underline"
                    >
                      &times;
                    </button>
                  </div>
                )}

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">
                      {selectedCategory
                        ? `No posts found in "${getCategoryDisplayName(selectedCategory)}"`
                        : "No blog posts available yet. Check back soon!"}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {filteredPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={resolveBlogHref(locale, post.slug)}
                        className="group block"
                      >
                        <article className="h-full bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 overflow-hidden">
                          {post.coverImage && (
                            <div className="relative overflow-hidden aspect-[1024/500]">
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h2>
                            {post.description && (
                              <p className="text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                {post.description}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                              {post.date && (
                                <div className="flex items-center gap-1">
                                  <i className="bi bi-calendar3 text-xs" />
                                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                                </div>
                              )}
                              {post.author && (
                                <div className="flex items-center gap-1">
                                  <i className="bi bi-person text-xs" />
                                  <span>{post.author}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
