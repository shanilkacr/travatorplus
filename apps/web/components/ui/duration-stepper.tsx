"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DurationStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

/** Compact −/+ stepper for trip length, in days. */
export function DurationStepper({
  value,
  onChange,
  min = 1,
  max = 30,
  className,
}: DurationStepperProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-[12px] bg-gray-50 p-1",
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
        className="flex h-7 w-7 items-center justify-center rounded-[8px] text-gray-500 transition-colors hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>

      <span
        aria-live="polite"
        className="min-w-[4.5rem] text-center text-sm tabular-nums text-ink"
      >
        {value} {value === 1 ? "day" : "days"}
      </span>

      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="One day more"
        className="flex h-7 w-7 items-center justify-center rounded-[8px] text-gray-500 transition-colors hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
