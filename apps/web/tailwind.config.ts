import type { Config } from "tailwindcss";

/**
 * Monochrome-only Tailwind theme. Color VALUES live once, as CSS variables, in
 * app/globals.css (the single file check:colors permits to hold hex literals).
 * This config maps semantic names onto those variables — so it contains no hex
 * itself and stays in lockstep with packages/shared/src/design/tokens.ts.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    // Replace the default palette entirely so no color survives.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "var(--color-white)",
      black: "var(--color-black)",
      ink: "var(--color-ink)",
      gray: {
        50: "var(--color-gray-50)",
        100: "var(--color-gray-100)",
        300: "var(--color-gray-300)",
        500: "var(--color-gray-500)",
      },
    },
    extend: {
      fontFamily: {
        headline: ["var(--font-headline)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Tuned for a 14px base (1rem = 14px).
        xs: ["0.786rem", { lineHeight: "1.4" }],
        sm: ["0.857rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.143rem", { lineHeight: "1.5" }],
        xl: ["1.429rem", { lineHeight: "1.35" }],
        "2xl": ["1.857rem", { lineHeight: "1.25" }],
        "3xl": ["2.429rem", { lineHeight: "1.15" }],
        "4xl": ["3.286rem", { lineHeight: "1.05" }],
        "5xl": ["4.571rem", { lineHeight: "1.0" }],
        "6xl": ["5.714rem", { lineHeight: "0.98" }],
      },
      letterSpacing: {
        tightest: "-0.03em",
        headline: "-0.01em",
        wide: "0.08em",
        widest: "0.16em",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
      },
      borderColor: {
        DEFAULT: "var(--color-gray-300)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
