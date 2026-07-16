/**
 * Travator design tokens — the single source of truth for the monochrome
 * design system. Consumed by apps/web (Tailwind config + globals.css),
 * apps/ops, and any in-chat component styling.
 *
 * STRICT RULE: monochrome only. Pure white background, near-black ink, and a
 * small grayscale ramp. No accent colors anywhere. Inverted (black bg / white
 * fg) sections are allowed for contrast blocks and primary buttons.
 */

export const palette = {
  // Base
  white: "#FFFFFF",
  ink: "#0A0A0A", // near-black text / primary
  // Grayscale ramp (light -> dark)
  gray50: "#FAFAFA",
  gray100: "#F0F0F0",
  gray300: "#D4D4D4",
  gray500: "#737373",
  black: "#000000",
} as const;

export type PaletteToken = keyof typeof palette;

/** Semantic roles mapped onto the ramp. Everything routes through these. */
export const semantic = {
  background: palette.white,
  backgroundMuted: palette.gray50,
  surface: palette.white,
  surfaceMuted: palette.gray100,
  ink: palette.ink,
  inkMuted: palette.gray500,
  border: palette.gray300,
  borderStrong: palette.ink,
  // Inverted surfaces (contrast blocks, primary buttons)
  inverseBackground: palette.ink,
  inverseInk: palette.white,
  // States expressed with ink/gray only (never hue).
  focusRing: palette.ink,
} as const;

export const typography = {
  // Loaded via next/font/google in apps/web.
  fontHeadline: "'Stack Sans Headline', ui-sans-serif, system-ui, sans-serif",
  fontBody:
    "'Stack Sans', 'Stack Sans Headline', ui-sans-serif, system-ui, sans-serif",
  headlineWeight: 300, // Light for ALL headings/display
  bodyWeight: 400,
  baseFontSizePx: 14, // html { font-size: 14px }
  headlineTracking: "-0.01em", // tight leading; generous tracking applied per-size in CSS
} as const;

export const radii = {
  none: "0px",
  sm: "4px",
  md: "6px", // buttons/inputs cap at 6px
} as const;

export const borders = {
  hairline: "1px",
} as const;

export const motion = {
  // Restrained: subtle fade/slide on scroll.
  durationFast: "150ms",
  durationBase: "300ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const tokens = {
  palette,
  semantic,
  typography,
  radii,
  borders,
  motion,
} as const;

export type DesignTokens = typeof tokens;
