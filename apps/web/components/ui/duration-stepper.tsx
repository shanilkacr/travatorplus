"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DurationStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Tighter layout for the chat composer control row. */
  compact?: boolean;
  className?: string;
}

/** Compact −/+ stepper for trip length, in days. */
export function DurationStepper({
  value,
  onChange,
  min = 1,
  max = 30,
  compact = false,
  className,
}: DurationStepperProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const label = `${value} ${value === 1 ? "day" : "days"}`;

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center rounded-[12px] bg-gray-50",
        compact ? "gap-0.5 p-0.5" : "gap-1 p-1",
        className
      )}
      role="group"
      aria-label="Trip length in days"
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="One day fewer"
        className={cn(
          "flex items-center justify-center rounded-[8px] text-gray-500 transition-colors hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-30",
          compact ? "h-6 w-6" : "h-7 w-7"
        )}
      >
        <Minus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      </button>

      <span
        aria-live="polite"
        aria-label={label}
        className={cn(
          "text-center tabular-nums text-ink",
          compact ? "min-w-[2rem] text-xs" : "min-w-[4.5rem] text-sm"
        )}
      >
        {compact ? `${value}d` : label}
      </span>

      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="One day more"
        className={cn(
          "flex items-center justify-center rounded-[8px] text-gray-500 transition-colors hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-30",
          compact ? "h-6 w-6" : "h-7 w-7"
        )}
      >
        <Plus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      </button>
    </div>
  );
}
