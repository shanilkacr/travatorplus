import Link from "next/link";
import { Wordmark } from "./Wordmark";

const links = [
  { href: "/our-story", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/book-a-call", label: "Book a call" },
];

/** Minimal top nav: wordmark left, links, primary "Start planning" → chat. */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-300 bg-white/90 backdrop-blur">
      <nav className="container-editorial flex h-16 items-center justify-between">
        <Wordmark />
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
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
          <Link href="/chat" className="btn-primary">
            Start planning
          </Link>
        </div>
      </nav>
    </header>
  );
}
