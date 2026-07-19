import { cn } from "@/lib/utils";

/** Aspect ratio of the Tezzeract wordmark asset (880 × 110). */
export const TEZZERACT_LOGO_ASPECT = 880 / 110;

interface TezzeractWordmarkProps {
  /** Scale to match surrounding text — defaults to one em tall. */
  className?: string;
  /**
   * @deprecated Colour now follows `currentColor`. Pass `text-*` on className
   * or rely on inherited foreground colour instead.
   */
  inverted?: boolean;
}

/**
 * Inline Tezzeract wordmark (tesseract icon + TEZZERACT).
 * Masked SVG asset tinted with currentColor — works on light and dark surfaces.
 */
export function TezzeractWordmark({
  className,
  inverted: _inverted = false,
}: TezzeractWordmarkProps) {
  return (
    <span
      role="img"
      aria-label="Tezzeract"
      className={cn(
        "inline-block h-[0.644em] align-[-0.12em] bg-current",
        className
      )}
      style={{
        aspectRatio: `${880} / ${110}`,
        WebkitMaskImage: "url(/brand/tezzeract-logo.png)",
        maskImage: "url(/brand/tezzeract-logo.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
