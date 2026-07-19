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
    // Let the picker tag play its exit before it unmounts.
    setLeaving(name);
    setTimeout(() => {
      setPicked((cur) => (cur.includes(name) ? cur : [...cur, name]));
      setLeaving(null);
      inputRef.current?.focus();
    }, 140);
  }

  function removeDestination(name: string) {
    setPicked((cur) => cur.filter((d) => d !== name));
    inputRef.current?.focus();
  }

  /** Destinations read as ordinary words in the sentence we send. */
  function submit() {
    const words = [...picked, value.trim()].filter(Boolean).join(" ");
    if (!words) return;
    const prompt = `${words} — ${days} ${days === 1 ? "day" : "days"} in Sri Lanka`;
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
          {/* Destinations sit in the text flow as words, not as chips. */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {picked.map((name) => (
              <span
                key={name}
                className="group inline-flex animate-chip-in items-baseline whitespace-nowrap text-[18px] leading-7 text-ink underline decoration-brand decoration-2 underline-offset-4"
              >
                {name}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDestination(name);
                  }}
                  aria-label={`Remove ${name}`}
                  /* `hidden` (not opacity) so no space is reserved when idle. */
                  className="ml-1 hidden h-4 w-4 shrink-0 place-items-center self-center rounded-[5px] text-gray-500 transition-colors hover:bg-gray-100 hover:text-ink group-focus-within:grid group-hover:grid"
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </span>
            ))}

            {/* Typewriter placeholder — a real element so words can precede it. */}
            <div className="relative min-w-[12rem] flex-1">
              {isEmpty && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-[18px] text-gray-500"
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
                  const last = picked[picked.length - 1];
                  if (e.key === "Backspace" && value === "" && last) {
                    e.preventDefault();
                    removeDestination(last);
                  }
                }}
                rows={1}
                aria-label="Describe your trip"
                /* The white card is the focus surface; suppress the global ring. */
                className="w-full resize-none bg-transparent text-[18px] leading-7 outline-none focus-visible:!shadow-none"
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

        {/* Destination picker — a slow rail that halts under the cursor. */}
        <div className="flex items-center gap-2 py-2.5 pl-3">
          <span className="shrink-0 text-xs text-gray-500">Add destinations</span>
          <div className="marquee flex-1">
            <div
              className="marquee-track !gap-2"
              style={{ animationDuration: "60s" }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center gap-2">
                  {available.map((name) => (
                    <button
                      key={`${copy}-${name}`}
                      type="button"
                      tabIndex={copy === 1 ? -1 : undefined}
                      aria-hidden={copy === 1}
                      onClick={() => addDestination(name)}
                      className={cn(
                        "whitespace-nowrap rounded-[8px] bg-white/70 px-2.5 py-1 text-xs text-gray-500 shadow-soft transition-colors hover:bg-white hover:text-ink",
                        leaving === name && "animate-chip-out"
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
