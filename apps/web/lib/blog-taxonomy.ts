/**
 * Blog types and constants with no Node dependencies.
 *
 * Kept separate from lib/blog.ts deliberately: that module reads the filesystem
 * (`node:fs`), so any client component importing a runtime value from it would
 * pull fs into the browser bundle and fail the build. Client components import
 * from here; server code can use either.
 */

export const BLOG_CATEGORIES = [
  "Planning",
  "Seasons",
  "Routes",
  "On the road",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readingTime: string;
  author: string;
  category: BlogCategory;
  /** Marks the post that leads the index page. */
  featured: boolean;
}
