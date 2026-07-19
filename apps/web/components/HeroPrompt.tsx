"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const SUGGESTIONS = [
  "7 days, beaches + hill country",
  "Land in Colombo on the 14th, 8 days, $150/night",
  "Kandy, Ella & Sigiriya by private driver",
  "Honeymoon: Galle Fort + south coast",
];

/** Hero product entry — describe the trip, land in /chat with it pre-sent. */
export function HeroPrompt() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function start(message: string) {
    const text = message.trim();
    if (!text) return;
    router.push(`/chat?prompt=${encodeURIComponent(text)}`);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          start(value);
        }}
        className="glass-panel !p-3 md:!p-4"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              start(value);
            }
          }}
          rows={2}
          placeholder="Describe your trip — dates, vibe, budget…"
          aria-label="Describe your trip"
          className="w-full resize-none bg-transparent px-3 py-2 text-base leading-relaxed outline-none placeholder:text-gray-500 md:text-lg"
        />
        <div className="flex items-center justify-between gap-3 px-1 pt-1">
          <span className="hidden text-xs text-gray-500 sm:block">
            Free to plan · Pay only when you book
          </span>
          <button
            type="submit"
            disabled={!value.trim()}
            className="btn-primary gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Plan my trip
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </form>

      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => start(s)}
              className="rounded-[12px] bg-white/25 px-4 py-2 text-xs text-white backdrop-blur-md transition-colors hover:bg-white/40"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
