import Image from "next/image";
import { cn } from "@/lib/utils";

interface TezzeractWordmarkProps {
  /** Scale to match surrounding text — defaults to one em tall. */
  className?: string;
  /** Lighten the mark for dark backgrounds (e.g. footer). */
  inverted?: boolean;
}

/** Inline Tezzeract wordmark — replaces the word in running copy. */
export function TezzeractWordmark({
  className,
  inverted = false,
}: TezzeractWordmarkProps) {
  return (
    <Image
      src="/brand/tezzeract-logo.png"
      alt="Tezzeract"
      width={640}
      height={120}
      className={cn(
        "inline-block h-[0.92em] w-auto align-[-0.12em]",
        inverted && "brightness-0 invert",
        className
      )}
      sizes="120px"
    />
  );
}
