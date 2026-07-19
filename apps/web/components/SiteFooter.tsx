import Image from "next/image";
import Link from "next/link";
import { TezzeractWordmark } from "@/components/TezzeractWordmark";

const COLS = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/our-story", label: "Our Story" },
      { href: "/blog", label: "Blog" },
      { href: "/book-a-call", label: "Book a call" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/chat", label: "Start planning" },
      { href: "/#plans", label: "Sample plans" },
      { href: "/#stays", label: "Stays" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@travator.com", label: "hello@travator.com" },
      { href: "/book-a-call", label: "Talk to the founder" },
    ],
  },
];

/** Dark footer: newsletter band on top, multi-column links, legal bar. */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="container-editorial flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl text-white md:text-3xl">
              Field notes, four times a year
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Seasons, new stays, and routes worth knowing — no noise, easy
              unsubscribe.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            action="/book-a-call"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="w-full rounded-[12px] bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:bg-white/15"
            />
            <button type="submit" className="btn-inverse shrink-0 !py-3">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-editorial grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
        <div className="col-span-2">
          <Link href="/" aria-label="Travator home" className="inline-flex">
            <Image
              src="/brand/travator-logo.png"
              alt="Travator"
              width={1329}
              height={643}
              className="h-8 w-auto brightness-0 invert"
              sizes="140px"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Destination management for inbound Sri Lanka. Planned by AI, run by
            people who know the roads.
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-white/60">
            <span>Developed by</span>
            <TezzeractWordmark inverted className="h-[1em]" />
            <span>Teams</span>
          </p>
          <address className="mt-4 max-w-xs not-italic text-sm leading-relaxed text-white/50">
            Level 9, Orion Towers, No 752 Dr Danister De Silva Mawatha,
            Colombo 00900
          </address>
          <p className="mt-3 text-sm text-white/50">
            <a
              href="tel:+94776576488"
              className="transition-colors hover:text-white"
            >
              +94 77 657 6488
            </a>
            <span className="mx-2 text-white/30">·</span>
            <a
              href="tel:+13469998698"
              className="transition-colors hover:text-white"
            >
              +1 346-999-8698
            </a>
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-xs text-white/40">
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-editorial flex flex-col items-start justify-between gap-2 py-6 text-xs text-white/40 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} Travator, a product of{" "}
            <TezzeractWordmark inverted className="h-[0.95em]" /> (Pvt) Ltd. All
            rights reserved.
          </span>
          <span>Colombo · Kandy · Ella · Galle</span>
        </div>
      </div>
    </footer>
  );
}
