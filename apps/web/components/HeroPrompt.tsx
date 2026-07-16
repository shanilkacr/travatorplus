"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SUGGESTIONS = [
  "7 days, beaches + hill country",
  "Land in Colombo on the 14th, 8 days, quiet beaches, $150/night",
  "Kandy, Ella & Sigiriya by private driver",
  "Honeymoon: Galle Fort + south coast, 5 nights",
];

/**
 * Lovable-style hero entry point: the prompt IS the product. Submitting routes
 * into /chat with the message pre-sent (via query param; the chat route creates
 * the conversation and sends it).
 */
export function HeroPrompt() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function start(message: string) {
    const text = message.trim();
    if (!text) return;
    router.push(`/chat?prompt=${encodeURIComponent(text)}`);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          start(value);
        }}
        className="group relative"
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
          rows={3}
          placeholder="Describe your trip — dates, vibe, budget…"
          aria-label="Describe your trip"
          className="input resize-none text-lg leading-relaxed"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Enter to start · Shift+Enter for a new line
          </span>
          <button type="submit" className="btn-primary" disabled={!value.trim()}>
            Plan my trip →
          </button>
        </div>
      </form>

      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => start(s)}
              className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-ink hover:text-ink"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
