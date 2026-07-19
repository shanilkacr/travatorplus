import Link from "next/link";
import { cn } from "@/lib/utils";

/** Aspect ratio of the Tezzeract wordmark asset (300 × 42). */
export const TEZZERACT_LOGO_ASPECT = 300 / 42;

const TEZZERACT_URL = "https://tezzeract.com";

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
 * Masked asset tinted with currentColor — works on light and dark surfaces.
 */
export function TezzeractWordmark({
  className,
  inverted: _inverted = false,
}: TezzeractWordmarkProps) {
  return (
    <Link
      href={TEZZERACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tezzeract"
      className={cn(
        "inline-block h-[0.708em] shrink-0 leading-[0] align-middle bg-current",
        "transition-opacity hover:opacity-80",
        className
      )}
      style={{
        aspectRatio: `${300} / ${42}`,
        WebkitMaskImage: "url(/brand/tezzeract-logo.png)",
        maskImage: "url(/brand/tezzeract-logo.png)",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
