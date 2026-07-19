import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/** Blog posts live as MDX in apps/web/content/blog. Read at build time. */
const BLOG_DIR = join(process.cwd(), "content", "blog");

import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type PostMeta,
  type TocEntry,
} from "./blog-taxonomy";
import { slugifyHeading } from "./slugify";

// Re-exported so server code has a single import site.
export { BLOG_CATEGORIES };
export type { BlogCategory, PostMeta, TocEntry };

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

/**
 * Table of contents, parsed from the raw MDX rather than the rendered output —
 * the page is a server component, so there is no DOM to walk at build time.
 * Fenced code blocks are skipped so `# comments` inside them aren't treated as
 * headings.
 */
export function getPostHeadings(slug: string): TocEntry[] {
  const raw = readFileSync(join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { content } = matter(raw);

  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.*\S)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2]!.replace(/[*_`]/g, "").trim();
    entries.push({
      id: slugifyHeading(text),
      text,
      level: match[1]!.length as 2 | 3,
    });
  }

  return entries;
}

/** Editor-picked related reading, falling back to same-category posts. */
export function getRecommended(slug: string, limit = 3): PostMeta[] {
  const raw = readFileSync(join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(raw);
  const all = getAllPosts().filter((p) => p.slug !== slug);

  const picked = Array.isArray(data.recommended)
    ? (data.recommended as unknown[])
        .map((s) => all.find((p) => p.slug === String(s)))
        .filter((p): p is PostMeta => Boolean(p))
    : [];

  if (picked.length >= limit) return picked.slice(0, limit);

  const current = getPostMeta(slug);
  const sameCategory = all.filter(
    (p) => p.category === current.category && !picked.includes(p)
  );
  const others = all.filter((p) => !picked.includes(p) && !sameCategory.includes(p));

  return [...picked, ...sameCategory, ...others].slice(0, limit);
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
