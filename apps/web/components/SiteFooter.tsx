import Link from "next/link";
import { Wordmark } from "./Wordmark";

const cols = [
  {
    title: "Plan",
    links: [
      { href: "/chat", label: "Start planning" },
      { href: "/book-a-call", label: "Book a call" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-gray-300">
      <div className="container-editorial grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-gray-500">
            Destination management for inbound Sri Lanka. Planned by AI, run by
            people who know the roads.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
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
          </div>
        ))}
      </div>
      <div className="hairline">
        <div className="container-editorial flex flex-col items-start justify-between gap-2 py-6 text-xs text-gray-500 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Travator. All rights reserved.</span>
          <span className="tracking-widest uppercase">Colombo · Kandy · Ella · Galle</span>
        </div>
      </div>
    </footer>
  );
}
