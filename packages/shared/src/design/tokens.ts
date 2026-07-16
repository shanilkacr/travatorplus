/**
 * Travator design tokens — single source of truth for the glass monochrome
 * design system. UI chrome stays neutral grayscale; photography carries color.
 */

export const palette = {
  white: "#FFFFFF",
  ink: "#0A0A0A",
  gray50: "#FAFAFA",
  gray100: "#F0F0F0",
  gray300: "#D4D4D4",
  gray500: "#737373",
  black: "#000000",
} as const;

export type PaletteToken = keyof typeof palette;

export const semantic = {
  background: palette.white,
  backgroundMuted: palette.gray50,
  surface: "rgba(255, 255, 255, 0.55)",
  surfaceMuted: palette.gray100,
  ink: palette.ink,
  inkMuted: palette.gray500,
  // Prefer shadow/contrast over strokes for separation.
  border: "rgba(10, 10, 10, 0.06)",
  borderStrong: palette.ink,
  inverseBackground: palette.ink,
  inverseInk: palette.white,
  focusRing: "rgba(10, 10, 10, 0.12)",
} as const;

export const glass = {
  bg: "rgba(255, 255, 255, 0.55)",
  bgStrong: "rgba(255, 255, 255, 0.72)",
  blur: "20px",
  shadow: "0 8px 32px rgba(10, 10, 10, 0.08)",
} as const;

export const typography = {
  fontHeadline: "'Mona Sans', ui-sans-serif, system-ui, sans-serif",
  fontBody: "'Mona Sans', ui-sans-serif, system-ui, sans-serif",
  headlineWeight: 300,
  bodyWeight: 400,
  baseFontSizePx: 14,
  headlineTracking: "-0.01em",
} as const;

export const radii = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "18px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",
  "5xl": "48px",
  full: "9999px",
} as const;

export const borders = {
  hairline: "0px",
} as const;

export const motion = {
  durationFast: "150ms",
  durationBase: "300ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const tokens = {
  palette,
  semantic,
  glass,
  typography,
  radii,
  borders,
  motion,
} as const;

export type DesignTokens = typeof tokens;
