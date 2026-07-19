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
 * Floating nav. Solid white while it sits inside the hero card, then the
 * translucent glass treatment once the hero has scrolled past.
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
    /* 20px from the viewport top: 10px clears the hero card's edge, then a
       further 10px sits between the card edge and the nav. Horizontal padding
       matches so the nav is inset 10px inside the card on narrow screens. */
    <header className="sticky top-0 z-50 px-[20px] pt-[20px]">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-[16px] px-5 transition-all duration-300 md:px-7",
          scrolled ? "glass-nav" : "bg-white shadow-soft"
        )}
      >
        <Wordmark />
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-gray-500 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/chat" className="btn-primary !px-5 !py-2.5 text-sm">
          Start planning
        </Link>
      </nav>
    </header>
  );
}
