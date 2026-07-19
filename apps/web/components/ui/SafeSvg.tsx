import { sanitizeSvgMarkup } from "@/lib/sanitize-svg";
import { cn } from "@/lib/utils";

interface SafeSvgProps {
  /** Raw SVG markup — sanitized before render. */
  markup: string;
  className?: string;
  title?: string;
}

/** Render sanitized SVG strings without dangerously trusting upload content. */
export function SafeSvg({ markup, className, title }: SafeSvgProps) {
  const safe = sanitizeSvgMarkup(markup);
  if (!safe) return null;

  return (
    <span
      className={cn("inline-block [&>svg]:h-full [&>svg]:w-full", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
