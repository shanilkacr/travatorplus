"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { DurationStepper } from "@/components/ui/duration-stepper";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

/** Cycled through the composer placeholder while it's empty. */
const EXAMPLES = [
  "Quiet beaches, no crowds, good food…",
  "Hill country by train, then somewhere to swim…",
  "First time here — show me the classics…",
  "Honeymoon: Galle Fort and the south coast…",
  "Surf trip, and I want to see elephants…",
];

const DESTINATIONS = [
  "Sigiriya",
  "Kandy",
  "Ella",
  "Galle Fort",
  "Mirissa",
  "Nuwara Eliya",
  "Yala",
  "Trincomalee",
  "Arugam Bay",
  "Colombo",
];

/** Hero product entry — compose a trip, land in /chat with it pre-sent. */
export function HeroPrompt() {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [days, setDays] = useState(7);
  const [picked, setPicked] = useState<string[]>([]);
  const [leaving, setLeaving] = useState<string | null>(null);

  const isEmpty = value.trim() === "" && picked.length === 0;
  const typed = useTypewriter(EXAMPLES, { paused: !isEmpty });

  const available = DESTINATIONS.filter((d) => !picked.includes(d));

  function addDestination(name: string) {
    // Let the picker chip play its exit before it unmounts.
    setLeaving(name);
    setTimeout(() => {
      setPicked((cur) => (cur.includes(name) ? cur : [...cur, name]));
      setLeaving(null);
    }, 140);
  }

  function removeDestination(name: string) {
    setPicked((cur) => cur.filter((d) => d !== name));
    inputRef.current?.focus();
  }

  function submit() {
    const parts = [
      `${days} ${days === 1 ? "day" : "days"} in Sri Lanka`,
      picked.length ? `visiting ${picked.join(", ")}` : null,
      value.trim() || null,
    ].filter(Boolean);

    const prompt = parts.join(" — ");
    router.push(`/chat?prompt=${encodeURIComponent(prompt)}`);
  }

  const canSubmit = picked.length > 0 || value.trim().length > 0;

  return (
    <div className="w-full text-left">
      {/* Glass shell — the page background showing through, heavily blurred. */}
      <div className="glass-panel !rounded-[26px] !p-2">
        {/* White composer */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="cursor-text rounded-[20px] bg-white px-4 pb-3 pt-4 shadow-soft"
        >
          {/* Chips flow inline with the text, Grammarly-style. */}
          <div className="flex flex-wrap items-center gap-1.5">
            {picked.map((name) => (
              <span
                key={name}
                className="group inline-flex animate-chip-in items-center gap-1 rounded-[8px] bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-ink"
              >
                {name}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDestination(name);
                  }}
                  aria-label={`Remove ${name}`}
                  className="grid h-4 w-4 place-items-center rounded-[5px] text-gray-500 opacity-0 transition-all hover:bg-gray-300 hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </span>
            ))}

            {/* Typewriter placeholder — a real element so chips can sit beside it. */}
            <div className="relative min-w-[12rem] flex-1">
              {isEmpty && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-base text-gray-500"
                >
                  {typed}
                  <span className="ml-px inline-block w-px animate-caret self-stretch bg-gray-500" />
                </span>
              )}
              <textarea
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (canSubmit) submit();
                  }
                  // Backspace at the start pops the last chip.
                  const last = picked[picked.length - 1];
                  if (e.key === "Backspace" && value === "" && last) {
                    e.preventDefault();
                    removeDestination(last);
                  }
                }}
                rows={1}
                aria-label="Describe your trip"
                className="w-full resize-none bg-transparent text-base leading-7 outline-none"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <DurationStepper value={days} onChange={setDays} />
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              aria-label="Plan my trip"
              className={cn(
                "grid h-9 w-9 place-items-center rounded-[12px] transition-all",
                canSubmit
                  ? "bg-ink text-white hover:opacity-85"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Destination picker — chips leave here and land in the composer. */}
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-2.5">
          <span className="mr-1 text-xs text-gray-500">Add destinations</span>
          {available.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => addDestination(name)}
              className={cn(
                "rounded-[8px] bg-white/70 px-2.5 py-1 text-xs text-ink shadow-soft transition-colors hover:bg-white",
                leaving === name && "animate-chip-out"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
