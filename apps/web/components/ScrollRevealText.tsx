"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

const DIM = 0.14;

/**
 * Reveals copy word by word as the block travels up through the viewport.
 * Renders as a <p> so it stays the page's lead paragraph for SEO, while
 * carrying display-heading styling.
 *
 * The dimming is progressive enhancement: until the effect has mounted (SSR,
 * JS disabled, hydration not finished) every word renders fully opaque, so the
 * copy is never left invisible if the animation can't run.
 */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [armed, setArmed] = useState(false);
  const [progress, setProgress] = useState(0);

  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion by leaving the text fully visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the viewport, 1 by the time it
      // reaches 35% — the reveal completes while it's comfortably in view.
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };

    setArmed(true);
    update();

    // Computed directly rather than via requestAnimationFrame: one
    // getBoundingClientRect per scroll is cheap, and rAF can be throttled
    // (background tab, some embedded webviews), which would strand the copy
    // in its dimmed state.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p ref={ref} className={cn("headline", className)}>
      {words.map((word, i) => {
        // Each word gets its own slice of the progress track, so they light
        // up in sequence rather than all at once.
        const startAt = i / words.length;
        const wordProgress = Math.min(
          1,
          Math.max(0, (progress - startAt) * words.length * 1.6)
        );
        const opacity = armed ? DIM + wordProgress * (1 - DIM) : 1;

        return (
          <span
            key={`${word}-${i}`}
            aria-hidden
            className="inline-block transition-opacity duration-150 ease-editorial"
            style={{ opacity, marginRight: "0.28em" }}
          >
            {word}
          </span>
        );
      })}
      {/* Screen readers get the sentence intact, not word fragments. */}
      <span className="sr-only">{text}</span>
    </p>
  );
}
