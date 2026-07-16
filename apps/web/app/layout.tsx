import type { Metadata } from "next";
import "./globals.css";
import { fontFamilyStyle, MONA_SANS_URL } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Travator — Plan your Sri Lanka trip with AI",
    template: "%s — Travator",
  },
  description:
    "AI-fronted travel planning and booking for inbound travelers to Sri Lanka. Day-by-day itineraries, vetted drivers, and hand-picked stays — planned in a conversation.",
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
        <link href={MONA_SANS_URL} rel="stylesheet" />
      </head>
      <body
        style={fontFamilyStyle}
        className="relative min-h-screen bg-page-gradient"
      >
        <div aria-hidden className="dot-pattern absolute inset-0 opacity-40" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
