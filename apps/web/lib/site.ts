/**
 * Single source of truth for site-wide identity, used by metadata, structured
 * data, the sitemap and robots.txt. Set NEXT_PUBLIC_SITE_URL in the deployment
 * environment; Vercel exposes VERCEL_PROJECT_PRODUCTION_URL as a fallback.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "https://travator.com";
}

export const SITE_URL = resolveSiteUrl();

export const SITE = {
  name: "Travator",
  legalName: "Travator, a product of Tezzeract (Pvt) Ltd",
  url: SITE_URL,
  /** Used verbatim by search engines and quoted by assistants — keep it plain. */
  description:
    "Travator is an AI travel concierge and destination management company for inbound travel to Sri Lanka. Plan a day-by-day itinerary in conversation, with real driving times, vetted driver-guides and hand-picked stays, then book it — with a human planner one message away.",
  shortDescription:
    "AI-planned, human-run trips to Sri Lanka — itineraries, drivers, stays and booking in one conversation.",
  email: "hello@travator.com",
  phone: "+94776576488",
  altPhone: "+13469998698",
  address: {
    street:
      "Level 9, Orion Towers, No 752 Dr Danister De Silva Mawatha",
    locality: "Colombo",
    postalCode: "00900",
    country: "LK",
  },
  /** Primary inbound markets, used in metadata keywords and JSON-LD areaServed. */
  markets: [
    "United Kingdom",
    "Germany",
    "France",
    "Netherlands",
    "Switzerland",
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "India",
    "Pakistan",
    "Bangladesh",
    "Maldives",
  ],
  regions: [
    "Colombo",
    "Kandy",
    "Ella",
    "Sigiriya",
    "Galle",
    "Mirissa",
    "Nuwara Eliya",
    "Arugam Bay",
    "Trincomalee",
    "Anuradhapura",
    "Yala",
  ],
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Default social preview image. */
export const OG_IMAGE = absoluteUrl("/images/hero-sunset.jpg");
