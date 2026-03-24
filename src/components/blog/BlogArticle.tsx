import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import type { BlogPost, BlogListItem } from "@/lib/blog/types";
import BlogCTA from "./BlogCTA";
import RelatedPosts from "./RelatedPosts";

interface BlogArticleProps {
  post: BlogPost;
  allPosts?: BlogListItem[];
  locale: string;
  relatedPostsTitle?: string;
}

function nodeText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(nodeText).join("");
  if (typeof children === "number") return children.toString();
  if (children && typeof children === "object" && "props" in children) {
    return nodeText((children as any).props.children);
  }
  return "";
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
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

const markdownComponents = {
  BlogCTA,
  h2: ({ children, ...props }: any) => {
    const id = props.id ?? slugifyHeading(nodeText(children));
    return (
      <h2 id={id} className="text-3xl font-bold text-gray-900 scroll-mt-24 mt-12 mb-4" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = props.id ?? slugifyHeading(nodeText(children));
    return (
      <h3 id={id} className="text-2xl font-semibold text-gray-900 scroll-mt-24 mt-8 mb-3" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: any) => (
    <p className="text-base leading-relaxed text-gray-600 mb-6" {...props}>{children}</p>
  ),
  a: ({ children, href, className, style, ...props }: any) => {
    const hasCustomStyling = style || className;
    return (
      <a
        className={hasCustomStyling ? className : "font-medium text-blue-600 underline decoration-blue-300 underline-offset-4 hover:text-blue-800"}
        style={style}
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc space-y-2 pl-6 text-base text-gray-600 mb-6" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal space-y-2 pl-6 text-base text-gray-600 mb-6" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-300 pl-6 text-gray-600 italic my-6" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm my-6" {...props}>
      <table className="min-w-full divide-y divide-gray-200 text-base">{children}</table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50 uppercase tracking-wide text-sm text-gray-500" {...props}>{children}</thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-4 py-3 text-left font-semibold" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-4 py-3 text-gray-600 align-top" {...props}>{children}</td>
  ),
  code: ({ children, className, ...props }: any) => {
    const content = Array.isArray(children) ? children.join("") : (children ?? "");
    const normalized = typeof content === "string" ? content.replace(/\n$/, "") : "";
    if (className?.includes("language-")) {
      return (
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6">
          <code className={`text-sm font-mono ${className}`}>{normalized}</code>
        </pre>
      );
    }
    return (
      <code className="rounded-md bg-gray-100 px-2 py-1 text-sm font-mono text-gray-900" {...props}>
        {content}
      </code>
    );
  },
};

export default function BlogArticle({
  post,
  allPosts,
  locale,
  relatedPostsTitle,
}: BlogArticleProps) {
  return (
    <>
      <article className="w-full bg-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-4xl">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              {post.meta.title}
            </h1>
            {post.meta.description && (
              <p className="text-xl text-gray-500 mb-6">{post.meta.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {post.meta.date && (
                <div className="flex items-center gap-2">
                  <i className="bi bi-calendar3" />
                  <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                </div>
              )}
              {post.meta.author && (
                <div className="flex items-center gap-2">
                  <i className="bi bi-person" />
                  <span>{post.meta.author}</span>
                </div>
              )}
            </div>
          </header>

          {post.meta.coverImage && (
            <div className="mb-12 rounded-xl overflow-hidden relative w-full aspect-[2/1]">
              <Image
                src={post.meta.coverImage}
                alt={post.meta.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={post.content}
              components={markdownComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              {post.meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {allPosts && allPosts.length > 1 && (
        <RelatedPosts
          currentSlug={post.slug}
          currentTags={post.meta.tags}
          currentCategory={post.meta.category}
          allPosts={allPosts}
          locale={locale}
          title={relatedPostsTitle}
        />
      )}
    </>
  );
}
