import { Figtree } from "next/font/google";

/**
 * Typography.
 *
 * The brief specifies "Stack Sans Headline" (weight 300) via next/font/google.
 * That family is not published on Google Fonts, and next/font/google throws at
 * build time for unknown families — so we load Figtree, a light editorial
 * geometric grotesk that matches the intended look (light-weight, generous),
 * and expose it behind the design-system CSS variables `--font-headline` and
 * `--font-body`. To adopt the real Stack Sans later, swap this module for a
 * `next/font/local` loader pointing at the licensed files — nothing else in the
 * app references a concrete family name. (See DECISIONS.md.)
 */

const sans = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-sans",
});

/** Both roles use the same family; weight differentiates (300 headings, 400 body). */
export const fontVariables = `${sans.variable}`;

/** Inline style that maps the loaded family onto the semantic variables. */
export const fontFamilyStyle: React.CSSProperties = {
  // @ts-expect-error CSS custom properties
  "--font-headline": `var(--font-sans)`,
  "--font-body": `var(--font-sans)`,
};
