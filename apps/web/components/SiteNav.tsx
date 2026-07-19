"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/book-a-call", label: "Book a call" },
];

/**
 * Floating nav. Fully transparent while it sits over the hero, then fades to
 * the glass treatment once the hero has scrolled past.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Hero is one viewport tall; swap just before its bottom edge passes.
    const threshold = () => Math.max(120, window.innerHeight - 120);
    const onScroll = () => setScrolled(window.scrollY > threshold());

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-[16px] px-5 transition-all duration-300 md:px-7",
          scrolled ? "glass-nav" : "bg-transparent shadow-none"
        )}
      >
        <Wordmark />
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-sm transition-colors",
                  scrolled
                    ? "text-gray-500 hover:text-ink"
                    : "text-white/80 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/chat"
          className={cn(
            "inline-flex items-center justify-center rounded-[14px] px-5 py-2.5 text-sm tracking-wide transition-all duration-300",
            scrolled
              ? "bg-ink text-white shadow-glass hover:opacity-85"
              : "bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
          )}
        >
          Start planning
        </Link>
      </nav>
    </header>
  );
}
