"use client";

import { useRouter } from "next/navigation";
import { TripComposer } from "@/components/composer/TripComposer";

/**
 * Hero entry point — the shared composer in its `hero` skin, handing the
 * composed trip off to /chat.
 */
export function HeroPrompt() {
  const router = useRouter();

  return (
    <TripComposer
      variant="hero"
      onSubmit={({ text, days, destinations }) => {
        // Destinations read as ordinary words in the sentence we send.
        const words = [...destinations, text].filter(Boolean).join(" ");
        if (!words) return;
        const prompt = `${words} — ${days} ${days === 1 ? "day" : "days"} in Sri Lanka`;
        router.push(`/chat?prompt=${encodeURIComponent(prompt)}`);
      }}
    />
  );
}
