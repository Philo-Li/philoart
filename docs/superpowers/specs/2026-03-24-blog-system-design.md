# PhiloArt Blog System Design

## Overview

File-based MDX blog system for PhiloArt, following the dopamind-web pattern. Supports 11 languages with static generation for SEO and performance.

## Route Structure

- `/blog` and `/blog/[slug]` — English (default, no locale prefix)
- `/[locale]/blog` and `/[locale]/blog/[slug]` — Other languages (zh, ja, zh-TW, de, fr, ko, es, it, vi)

Locales: en, zh, ja, zh-TW, de, fr, ko, es, it, vi

## Directory Structure

```
philoart/
├── blog/
│   ├── en/*.mdx
│   ├── zh/*.mdx
│   ├── ja/*.mdx
│   └── ... (other locale dirs)
├── public/images/blog/           # Cover images
├── src/
│   ├── app/
│   │   ├── blog/[[...slug]]/page.tsx          # English default
│   │   └── [locale]/blog/[[...slug]]/page.tsx # Other languages
│   ├── components/blog/
│   │   ├── BlogList.tsx          # Client component, category filtering
│   │   ├── BlogArticle.tsx       # Server component, MDX rendering
│   │   └── RelatedPosts.tsx      # Related posts (max 3)
│   └── lib/blog/
│       ├── engine.ts             # File discovery, frontmatter parsing, sorting
│       ├── types.ts              # BlogPost, BlogMeta, BlogListItem, BlogSiteData
│       ├── utils.ts              # Route helpers (resolveBlogHref, etc.)
│       └── translations/
│           ├── en.json
│           ├── zh.json
│           └── ... (other locales)
```

## Data Models

### BlogMeta

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | yes | Post title |
| description | string | no | Short summary for listing |
| seoDescription | string | no | SEO description, overrides description |
| date | string | no | ISO date, e.g. 2026-03-24 |
| author | string | no | Author name |
| tags | string[] | no | e.g. [Photography, Landscape] |
| category | string | no | One of: Photography, Art & Culture, Tutorial, News & Updates |
| coverImage | string | no | Path like /images/blog/xxx.webp |

### BlogPost

```typescript
{ slug: string; meta: BlogMeta; content: string }
```

### BlogListItem

Same fields as BlogMeta plus `slug`, without `content`.

### BlogSiteData

```typescript
{
  posts: Record<string, BlogPost>;
  postsList: BlogListItem[];
  blogTitle: string;
  blogDescription: string;
  blogSeoDescription: string;
}
```

## Frontmatter Example

```yaml
---
title: "Capturing Light: A Guide to Golden Hour Photography"
date: 2026-03-24
category: Photography
description: Tips for shooting during golden hour
tags: [Photography, Landscape, Lighting]
author: Philo
coverImage: /images/blog/golden-hour.webp
---
```

## Blog Engine (engine.ts)

### Pipeline

1. `buildBlogSite(locale)` — Main entry, returns BlogSiteData
2. `getBlogRoot(locale)` — Resolves `blog/{locale}/`, falls back to `blog/en/`
3. `loadBlogPosts(blogRoot)` — Discovers all .mdx files, skips index.mdx
4. `loadBlogPost(filePath, slug)` — Reads file, parses frontmatter
5. `parseFrontMatter(source)` — Custom YAML parser for `---` delimited frontmatter
6. `parseTagsArray(tagsString)` — Supports `[tag1, tag2]`, `["tag1"]`, comma-separated
7. `sortPostsByDate(posts)` — Descending by date, no-date posts at end

### Locale Fallback

`blog/{locale}/` -> `blog/en/`

## MDX Rendering

- `next-mdx-remote/rsc` for server-side rendering (zero client JS)
- `remark-gfm` for GitHub-flavored Markdown
- Custom component mapping:
  - h2, h3: auto-generated anchor IDs
  - a: external links open in new tab
  - blockquote: styled with left border
  - code: inline vs block differentiation

## Static Generation

- `generateStaticParams()` — Pre-generates all locale + slug combinations
- `generateMetadata()` — OpenGraph + Twitter Card metadata per post

## Related Posts Algorithm

1. Same category posts (priority)
2. Shared tags scored (fallback)
3. Most recent posts (final fallback)
4. Max 3 posts displayed

## Categories

Fixed set: Photography, Art & Culture, Tutorial, News & Updates

Client-side filtering in BlogList component.

## Translations

Simple JSON files per locale in `src/lib/blog/translations/`. No i18next dependency.

Keys: blogTitle, blogDescription, categories, allPosts, relatedPosts, categoryNames.

Fallback to English if locale JSON not found.

## Dependencies

New packages:
- `next-mdx-remote` — Server MDX rendering
- `remark-gfm` — GFM support
- `remark` — Markdown processing

## SEO

- `generateMetadata()` per page with OpenGraph and Twitter Card
- Static generation for all pages
- Cover image in metadata
- Locale-specific URLs with alternates
