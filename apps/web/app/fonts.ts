/**
 * Mona Sans via Google Fonts — Light 300 (headings) and Regular 400 (body) only.
 * @see https://fonts.google.com/specimen/Mona+Sans
 *
 * Loaded in app/layout.tsx (next/font/google does not yet expose Mona Sans).
 * Semantic CSS variables keep the rest of the app family-agnostic.
 */

export const fontVariables = "";

export const fontFamilyStyle: React.CSSProperties = {
  // @ts-expect-error CSS custom properties
  "--font-headline": "'Mona Sans', ui-sans-serif, system-ui, sans-serif",
  "--font-body": "'Mona Sans', ui-sans-serif, system-ui, sans-serif",
};

export const MONA_SANS_URL =
  "https://fonts.googleapis.com/css2?family=Mona+Sans:wght@300;400&display=swap";
