import type { Metadata } from "next";
import "./globals.css";
import { fontVariables, fontFamilyStyle } from "./fonts";

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
    <html lang="en" className={fontVariables}>
      <body style={fontFamilyStyle}>{children}</body>
    </html>
  );
}
