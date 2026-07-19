import Link from "next/link";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/book-a-call", label: "Book a call" },
];

/** Floating pill nav — logo left, links center, CTA right. */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="glass-nav mx-auto flex h-14 max-w-6xl items-center justify-between rounded-[16px] px-5 md:px-7">
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
