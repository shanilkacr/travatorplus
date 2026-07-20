import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { OrganizationLd, WebSiteLd } from "@/components/StructuredData";
import { SITE, SITE_URL, OG_IMAGE } from "@/lib/site";
import "./globals.css";
import { fontFamilyStyle, MONA_SANS_URL } from "./fonts";

export const metadata: Metadata = {
  // Required for OpenGraph/canonical URLs to resolve absolutely.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Travator — Plan your Sri Lanka trip with AI",
    template: "%s — Travator",
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "travel",
  keywords: [
    "Sri Lanka travel",
    "Sri Lanka itinerary",
    "Sri Lanka trip planner",
    "Sri Lanka tour operator",
    "Sri Lanka private driver",
    "AI travel planning",
    "destination management Sri Lanka",
    "Sri Lanka holiday packages",
    "best time to visit Sri Lanka",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE_URL,
    title: "Travator — Plan your Sri Lanka trip with AI",
    description: SITE.shortDescription,
    locale: "en_GB",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sunset over a rocky Sri Lankan beach with leaning coconut palms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travator — Plan your Sri Lanka trip with AI",
    description: SITE.shortDescription,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Images are hotlinked from Unsplash; warm the connection early. */}
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link href={MONA_SANS_URL} rel="stylesheet" />
        <OrganizationLd />
        <WebSiteLd />
      </head>
      <body
        style={fontFamilyStyle}
        className="relative min-h-screen bg-page-gradient"
      >
        {/* Skip link — first focusable element, for keyboard and screen readers. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[12px] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <div aria-hidden className="dot-pattern absolute inset-0 opacity-40" />
        <div className="relative z-10">{children}</div>
        <CookieConsent />
      </body>
    </html>
  );
}
