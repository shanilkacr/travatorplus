import type { Config } from "tailwindcss";

/**
 * Monochrome glass Tailwind theme. Color VALUES live once, as CSS variables, in
 * app/globals.css (the single file check:colors permits to hold hex literals).
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "rgb(var(--color-white-rgb) / <alpha-value>)",
      black: "var(--color-black)",
      ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
      gray: {
        50: "rgb(var(--color-gray-50-rgb) / <alpha-value>)",
        100: "rgb(var(--color-gray-100-rgb) / <alpha-value>)",
        300: "rgb(var(--color-gray-300-rgb) / <alpha-value>)",
        500: "rgb(var(--color-gray-500-rgb) / <alpha-value>)",
      },
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
    },
    extend: {
      fontFamily: {
        headline: ["var(--font-headline)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
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
        sm: "6px",
        DEFAULT: "10px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        full: "9999px",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(10, 10, 10, 0.06), 0 1px 3px rgba(10, 10, 10, 0.04)",
        "glass-lg": "0 8px 40px rgba(10, 10, 10, 0.1), 0 2px 8px rgba(10, 10, 10, 0.05)",
        "glass-inset": "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        soft: "0 2px 12px rgba(10, 10, 10, 0.05)",
      },
      backgroundImage: {
        "frost-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(250,250,250,0.4) 100%)",
        "page-gradient":
          "linear-gradient(180deg, var(--color-gray-50) 0%, var(--color-white) 40%, var(--color-gray-50) 100%)",
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
        /* Destination chip landing inside the composer. */
        "chip-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.86)" },
          "60%": { transform: "translateY(0) scale(1.04)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        /* Destination chip leaving the picker row. */
        "chip-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-6px) scale(0.9)" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "chip-in": "chip-in 260ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "chip-out": "chip-out 160ms cubic-bezier(0.22, 1, 0.36, 1) both",
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
