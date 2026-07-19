"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-taxonomy";
import { cn } from "@/lib/utils";

/**
 * Sticky contents rail. Highlights the section currently in view using an
 * IntersectionObserver over the rendered headings.
 */
export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        // Prefer whichever tracked heading is highest on screen but still below
        // the header; falling back keeps a section lit while reading past it.
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
          return;
        }
        const above = headings
          .filter((h) => h.getBoundingClientRect().top < 120)
          .pop();
        if (above) setActiveId(above.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0, 1] }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-4 text-ink">Contents</p>
      <ul className="space-y-1 border-l border-gray-100">
        {entries.map((e) => (
          <li key={e.id}>
            <Link
              href={`#${e.id}`}
              aria-current={activeId === e.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 transition-colors",
                e.level === 3 ? "pl-6" : "pl-4",
                activeId === e.id
                  ? "border-ink text-ink"
                  : "border-transparent text-gray-500 hover:text-ink"
              )}
            >
              {e.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
