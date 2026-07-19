"use client";

import { useRef, useState } from "react";
import { ArrowUp, MapPin, X } from "lucide-react";
import { DurationStepper } from "@/components/ui/duration-stepper";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

/** Cycled through the placeholder while the composer is empty. */
const EXAMPLES = [
  "Quiet beaches, no crowds, good food…",
  "Hill country by train, then somewhere to swim…",
  "First time here — show me the classics…",
  "Honeymoon: Galle Fort and the south coast…",
  "Surf trip, and I want to see elephants…",
];

export const DESTINATIONS = [
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

export interface TripComposerSubmission {
  text: string;
  days: number;
  destinations: string[];
}

interface TripComposerProps {
  /**
   * `hero` — glass shell over photography, destination rail always visible.
   * `chat` — plain card on a light surface, rail hidden behind a toggle.
   */
  variant?: "hero" | "chat";
  placeholderExamples?: string[];
  /** `chat` uses a short static placeholder instead of the typewriter. */
  staticPlaceholder?: string;
  onSubmit: (submission: TripComposerSubmission) => void;
  className?: string;
}

export function TripComposer({
  variant = "hero",
  placeholderExamples = EXAMPLES,
  staticPlaceholder,
  onSubmit,
  className,
}: TripComposerProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [days, setDays] = useState(7);
  const [picked, setPicked] = useState<string[]>([]);
  const [leaving, setLeaving] = useState<string | null>(null);
  // Chat keeps the rail collapsed until it's wanted.
  const [railOpen, setRailOpen] = useState(variant === "hero");

  const isHero = variant === "hero";
  const inputText = isHero
    ? "text-[16px] leading-6 md:text-[18px] md:leading-7"
    : "text-[16px] leading-6";
  const inputRow = isHero
    ? "flex flex-wrap items-baseline gap-x-2 gap-y-1"
    : "flex flex-wrap items-baseline gap-x-1 gap-y-1 xl:flex-nowrap xl:items-center";
  const tagClass = isHero
    ? "group inline-flex animate-chip-in items-baseline whitespace-nowrap text-ink underline decoration-brand decoration-2 underline-offset-4"
    : "group inline animate-chip-in m-0 p-0 whitespace-nowrap text-ink underline decoration-brand decoration-2 underline-offset-[3px]";
  const isEmpty = value.trim() === "" && picked.length === 0;
  const typed = useTypewriter(placeholderExamples, {
    paused: !isEmpty || Boolean(staticPlaceholder),
  });
  const placeholder = staticPlaceholder ?? typed;

  const available = DESTINATIONS.filter((d) => !picked.includes(d));

  function addDestination(name: string) {
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

  const canSubmit = picked.length > 0 || value.trim().length > 0;

  function submit() {
    if (!canSubmit) return;
    onSubmit({ text: value.trim(), days, destinations: picked });
    setValue("");
    setPicked([]);
    if (!isHero) setRailOpen(false);
  }

  return (
    <div className={cn("w-full text-left", className)}>
      <div
        className={cn(
          isHero
            ? "glass-panel !rounded-[16px] md:!rounded-[26px] !p-2"
            : "rounded-[16px] border border-gray-100 bg-gray-100 p-2 xl:rounded-[24px]"
        )}
      >
        {/* Typing surface */}
        <div
          onClick={() => inputRef.current?.focus()}
          className={cn(
            "cursor-text rounded-[12px] bg-white px-4 pb-3 pt-4 md:rounded-[20px]",
            isHero ? "shadow-soft" : "shadow-soft-chat-input"
          )}
        >
          {/* Destinations sit in the text flow as words, not chips. */}
          <div className={inputRow}>
            {picked.map((name) => (
              <span key={name} className={cn(tagClass, inputText)}>
                {name}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDestination(name);
                  }}
                  aria-label={`Remove ${name}`}
                  /* `hidden` (not opacity) so no space is reserved when idle. */
                  className={cn(
                    "hidden shrink-0 place-items-center rounded-[5px] text-gray-500 transition-colors hover:bg-gray-100 hover:text-ink group-focus-within:grid group-hover:grid",
                    isHero ? "ml-1 h-4 w-4 self-center" : "ml-0.5 h-3.5 w-3.5 align-middle"
                  )}
                >
                  <X className={isHero ? "h-3 w-3" : "h-2.5 w-2.5"} aria-hidden />
                </button>
              </span>
            ))}

            <div
              className={cn(
                "relative min-w-0 flex-1",
                isHero && "min-w-[8rem] md:min-w-[12rem]",
                !isHero && "min-h-6 leading-6"
              )}
            >
              {isEmpty && (
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre text-gray-500",
                    inputText
                  )}
                >
                  {placeholder}
                  {!staticPlaceholder && (
                    <span className="ml-px inline-block w-px animate-caret self-stretch bg-gray-500" />
                  )}
                </span>
              )}
              <textarea
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                  const last = picked[picked.length - 1];
                  if (e.key === "Backspace" && value === "" && last) {
                    e.preventDefault();
                    removeDestination(last);
                  }
                }}
                rows={1}
                aria-label="Describe your trip"
                className={cn(
                  "w-full resize-none break-words bg-transparent outline-none focus-visible:!shadow-none",
                  inputText,
                  !isHero && "m-0 p-0"
                )}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <DurationStepper compact={!isHero} value={days} onChange={setDays} />
              {!isHero && (
                <button
                  type="button"
                  onClick={() => setRailOpen((v) => !v)}
                  aria-expanded={railOpen}
                  aria-label="Toggle destinations"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-[12px] px-2 py-1.5 text-xs transition-colors",
                    railOpen
                      ? "bg-gray-100 text-ink"
                      : "text-gray-500 hover:bg-gray-50 hover:text-ink"
                  )}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Destinations
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              aria-label="Send"
              className={cn(
                "grid shrink-0 place-items-center rounded-[12px] transition-all",
                isHero ? "h-9 w-9" : "h-9 w-10",
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
        {railOpen && (
          <div
            className={cn(
              "flex items-center gap-2 py-2.5 pl-3",
              !isHero && "max-xl:pl-2"
            )}
          >
            <span
              className={cn(
                "shrink-0 text-xs text-gray-500",
                !isHero && "max-xl:hidden"
              )}
            >
              Add destinations
            </span>
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
                          "whitespace-nowrap rounded-[8px] bg-white/70 px-2.5 py-1 text-xs text-gray-500 transition-colors hover:bg-white hover:text-ink",
                          isHero && "shadow-soft",
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
        )}
      </div>
    </div>
  );
}
