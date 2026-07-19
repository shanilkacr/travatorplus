import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/** Blog posts live as MDX in apps/web/content/blog. Read at build time. */
const BLOG_DIR = join(process.cwd(), "content", "blog");

import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type PostMeta,
} from "./blog-taxonomy";

// Re-exported so server code has a single import site.
export { BLOG_CATEGORIES };
export type { BlogCategory, PostMeta };

function parseCategory(value: unknown): BlogCategory {
  return BLOG_CATEGORIES.find((c) => c === value) ?? "Planning";
}

export function getPostSlugs(): string[] {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostMeta(slug: string): PostMeta {
  const raw = readFileSync(join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "1970-01-01"),
    readingTime: `${Math.max(1, Math.round(words / 200))} min read`,
    author: String(data.author ?? "Travator"),
    category: parseCategory(data.category),
    featured: data.featured === true,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Splits the index into its lead card and the grid beneath. Falls back to the
 * newest post when nothing sets `featured: true`.
 */
export function getFeaturedAndRest(): {
  featured: PostMeta | null;
  rest: PostMeta[];
} {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  if (!featured) return { featured: null, rest: [] };
  return { featured, rest: posts.filter((p) => p.slug !== featured.slug) };
}
