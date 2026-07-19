"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
// Import from the taxonomy module, not lib/blog — the latter reads the
// filesystem and cannot be pulled into a client bundle.
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type PostMeta,
} from "@/lib/blog-taxonomy";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

/** Search + category filter over the post grid, with incremental reveal. */
export function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<BlogCategory | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);

  // Only offer categories that actually have posts behind them.
  const categories = useMemo(
    () => BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c)),
    [posts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (active && p.category !== active) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [posts, query, active]);

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > visible.length;

  function resetPaging<T>(apply: () => T) {
    apply();
    setShown(PAGE_SIZE);
  }

  return (
    <>
      {/* Search + filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => resetPaging(() => setQuery(e.target.value))}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="w-full rounded-[14px] bg-white py-3 pl-11 pr-10 text-sm text-ink shadow-soft outline-none transition-shadow placeholder:text-gray-500 focus-visible:!shadow-glass"
          />
          {query && (
            <button
              type="button"
              onClick={() => resetPaging(() => setQuery(""))}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-[8px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="All"
            active={active === null}
            onClick={() => resetPaging(() => setActive(null))}
          />
          {categories.map((c) => (
            <FilterChip
              key={c}
              label={c}
              active={active === c}
              onClick={() =>
                resetPaging(() => setActive((cur) => (cur === c ? null : c)))
              }
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-12">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-xl">Recent blog posts</h2>
          <p className="text-xs text-gray-500">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] bg-gray-50 px-6 py-16 text-center">
            <p className="text-base text-ink">No posts match that search.</p>
            <p className="mt-2 text-sm text-gray-500">
              Try a different term, or clear the filters.
            </p>
            <button
              type="button"
              onClick={() =>
                resetPaging(() => {
                  setQuery("");
                  setActive(null);
                })
              }
              className="btn mt-6"
            >
              Clear filters
            </button>
          </div>
        )}

        {hasMore && (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="btn-primary"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-[12px] px-3.5 py-2 text-sm transition-all",
        active
          ? "bg-ink text-white shadow-soft"
          : "bg-white text-gray-500 shadow-soft hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}
