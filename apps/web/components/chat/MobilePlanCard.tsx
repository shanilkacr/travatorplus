"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Hotel,
  MapPin,
  Users,
} from "lucide-react";
import type { ItineraryDay, QuoteLineItem } from "@travator/shared";
import { cn } from "@/lib/utils";

const usd = (minor: number) =>
  `$${(minor / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const dayLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

const calendarParts = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    weekday: d.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" }),
    day: d.getUTCDate(),
    month: d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }),
  };
};

type TripSummary = {
  title: string;
  travelers: number;
  startDate: string;
  endDate: string;
  nights: number;
};

type Section = "summary" | "itinerary" | "cost";

const SECTIONS: { key: Section; label: string }[] = [
  { key: "itinerary", label: "Itinerary" },
  { key: "summary", label: "Overview" },
  { key: "cost", label: "Cost" },
];

export type MobilePlanExpandLevel = "contracted" | "semi" | "full";

const EXPAND_ORDER: MobilePlanExpandLevel[] = ["contracted", "semi", "full"];

export const MOBILE_PLAN_MAX_HEIGHT: Record<MobilePlanExpandLevel, string | null> = {
  contracted: "max-h-[3.75rem]",
  semi: "max-h-[14.5rem]",
  full: null,
};

export function mobilePlanUsesPageScroll(level: MobilePlanExpandLevel) {
  return level === "full";
}

const SEMI_STOP_PREVIEW = 3;

export function nextMobilePlanLevel(
  level: MobilePlanExpandLevel
): MobilePlanExpandLevel {
  const i = EXPAND_ORDER.indexOf(level);
  return EXPAND_ORDER[(i + 1) % EXPAND_ORDER.length]!;
}

function MobileItineraryCalendar({
  days,
  isSemi,
  isFull,
}: {
  days: ItineraryDay[];
  isSemi: boolean;
  isFull: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeDay = days[activeIndex];

  useEffect(() => {
    const strip = stripRef.current;
    const cell = strip?.children[activeIndex] as HTMLElement | undefined;
    if (!strip || !cell) return;
    const offset =
      cell.offsetLeft - strip.clientWidth / 2 + cell.clientWidth / 2;
    strip.scrollTo({ left: offset, behavior: "smooth" });
  }, [activeIndex]);

  if (!activeDay) return null;

  function selectDay(index: number, e: React.MouseEvent) {
    e.stopPropagation();
    setActiveIndex(index);
  }

  function shiftDay(delta: number, e: React.MouseEvent) {
    e.stopPropagation();
    setActiveIndex((i) => Math.max(0, Math.min(days.length - 1, i + delta)));
  }

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      {/* Compact calendar strip — slide left / right */}
      <div className="relative">
        <div
          ref={stripRef}
          className="flex gap-1 overflow-x-auto scroll-smooth px-0.5 pb-0.5 scrollbar-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {days.map((day, i) => {
            const { weekday, day: dayNum, month } = calendarParts(day.date);
            const showMonth =
              i === 0 ||
              calendarParts(days[i - 1]!.date).month !== month;
            const selected = i === activeIndex;

            return (
              <button
                key={day.date}
                type="button"
                onClick={(e) => selectDay(i, e)}
                aria-label={`${weekday} ${dayNum} ${month}, ${day.region}`}
                aria-pressed={selected}
                className={cn(
                  "flex w-12 shrink-0 snap-center flex-col items-center rounded-[10px] border py-1 transition-all duration-200",
                  selected
                    ? "scale-[1.02] border-ink/20 bg-white/40 shadow-soft-xs"
                    : "border-transparent bg-white/15 opacity-80"
                )}
              >
                {showMonth ? (
                  <span className="text-[0.55rem] font-medium uppercase tracking-wide text-gray-400">
                    {month}
                  </span>
                ) : (
                  <span className="h-[0.55rem]" aria-hidden />
                )}
                <span className="text-[0.6rem] leading-none text-gray-500">{weekday}</span>
                <span className="mt-0.5 text-base font-medium leading-none tabular-nums text-ink">
                  {dayNum}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fade edges hint more days exist */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-gray-50/80 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-gray-50/80 to-transparent"
          aria-hidden
        />
      </div>

      {/* Selected day detail */}
      <div className="rounded-[12px] border border-white/25 px-2.5 py-2">
        {isSemi ? (
          <>
            <h3 className="text-base font-medium leading-snug text-ink">{activeDay.region}</h3>
            <p className="mt-0.5 text-[0.65rem] text-gray-500">
              Day {activeIndex + 1} of {days.length}
            </p>
            <ul className="mt-2 space-y-1 border-t border-white/15 pt-2">
              {activeDay.stops.slice(0, SEMI_STOP_PREVIEW).map((stop) => (
                <li
                  key={stop.id}
                  className="flex items-start gap-2 text-xs leading-snug text-gray-500"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden />
                  <span>{stop.title}</span>
                </li>
              ))}
              {activeDay.stops.length > SEMI_STOP_PREVIEW && (
                <li className="pl-3 text-[0.65rem] text-gray-400">
                  +{activeDay.stops.length - SEMI_STOP_PREVIEW} more stops
                </li>
              )}
            </ul>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {isFull && (
                <button
                  type="button"
                  onClick={(e) => shiftDay(-1, e)}
                  disabled={activeIndex === 0}
                  aria-label="Previous day"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-[8px] text-gray-500 transition-colors enabled:hover:bg-white/25 disabled:opacity-30"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                </button>
              )}

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium leading-snug text-ink">{activeDay.region}</h3>
                <p className="mt-0.5 text-[0.65rem] text-gray-500">
                  Day {activeIndex + 1} of {days.length}
                </p>
              </div>

              {isFull && (
                <button
                  type="button"
                  onClick={(e) => shiftDay(1, e)}
                  disabled={activeIndex === days.length - 1}
                  aria-label="Next day"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-[8px] text-gray-500 transition-colors enabled:hover:bg-white/25 disabled:opacity-30"
                >
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              )}
            </div>

            {isFull && (
              <>
                <ul className="mt-2 space-y-1 border-t border-white/15 pt-2">
                  {activeDay.stops.map((stop) => (
                    <li
                      key={stop.id}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden />
                      {stop.title}
                    </li>
                  ))}
                </ul>
                {activeDay.hotelName && (
                  <p className="mt-2 flex items-center gap-1.5 text-[0.65rem] text-gray-500">
                    <Hotel className="h-3 w-3 shrink-0" aria-hidden />
                    {activeDay.hotelName}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

type MobilePlanCardProps = {
  trip: TripSummary;
  days: ItineraryDay[];
  lineItems: (QuoteLineItem & { id: string })[];
  expandLevel: MobilePlanExpandLevel;
  onExpandLevelChange: (level: MobilePlanExpandLevel) => void;
  className?: string;
};

export function MobilePlanCard({
  trip,
  days,
  lineItems,
  expandLevel,
  onExpandLevelChange,
  className,
}: MobilePlanCardProps) {
  const [sectionIndex, setSectionIndex] = useState(0);

  const section = SECTIONS[sectionIndex]!.key;
  const total = lineItems.reduce((sum, li) => sum + li.price.usdMinor, 0);
  const perPerson = Math.round(total / trip.travelers);
  const isSemi = expandLevel === "semi";
  const isFull = expandLevel === "full";
  const showContent = expandLevel !== "contracted";

  function prevSection(e: React.MouseEvent) {
    e.stopPropagation();
    setSectionIndex((i) => (i === 0 ? SECTIONS.length - 1 : i - 1));
  }

  function nextSection(e: React.MouseEvent) {
    e.stopPropagation();
    setSectionIndex((i) => (i === SECTIONS.length - 1 ? 0 : i + 1));
  }

  function cycleExpand() {
    onExpandLevelChange(nextMobilePlanLevel(expandLevel));
  }

  const isContracted = expandLevel === "contracted";

  const expandAriaLabel =
    expandLevel === "contracted"
      ? "Travel planner, collapsed. Tap to expand"
      : expandLevel === "semi"
        ? "Travel planner, preview. Tap to expand further"
        : "Travel planner, expanded. Tap to collapse";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={!isContracted}
      aria-label={expandAriaLabel}
      onClick={cycleExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          cycleExpand();
        }
      }}
      className={cn(
        "flex cursor-pointer flex-col",
        expandLevel === "full" ? "h-auto" : "h-full overflow-hidden",
        className
      )}
    >
      {isContracted ? (
        <div className="flex shrink-0 items-center justify-center gap-2 px-3 py-3">
          <p className="eyebrow">Travel planner</p>
          <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden />
        </div>
      ) : (
        <>
          {/* Section navigation */}
          <div className="flex shrink-0 items-center gap-2 border-b border-white/25 px-1 py-2.5">
            <button
              type="button"
              onClick={prevSection}
              aria-label="Previous section"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] text-gray-500 transition-colors hover:bg-white/30 hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>

            <div className="min-w-0 flex-1 text-center">
              <p className="eyebrow">Travel planner</p>
              <p className="truncate text-sm text-ink">{SECTIONS[sectionIndex]!.label}</p>
            </div>

            <button
              type="button"
              onClick={nextSection}
              aria-label="Next section"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] text-gray-500 transition-colors hover:bg-white/30 hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          {/* Section content */}
          {showContent && (
            <div
              className={cn(
                "px-1",
                expandLevel === "full" ? "py-3" : "min-h-0 flex-1",
                isSemi && "overflow-y-auto scrollbar-none py-2"
              )}
            >
          {section === "summary" && (
            <div>
              <h2 className="text-base leading-snug text-ink">{trip.title}</h2>
              <dl
                className={cn(
                  "mt-3 grid grid-cols-2 gap-2",
                  isSemi && "max-h-[4.5rem] overflow-hidden"
                )}
              >
                {[
                  {
                    Icon: Calendar,
                    label: "Dates",
                    value: `${dayLabel(trip.startDate)} – ${dayLabel(trip.endDate)}`,
                  },
                  { Icon: MapPin, label: "Nights", value: `${trip.nights} nights` },
                  { Icon: Users, label: "Travelers", value: `${trip.travelers} adults` },
                  { Icon: Car, label: "Transport", value: "Private driver" },
                ].map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-[12px] border border-white/30 px-3 py-2"
                  >
                    <dt className="flex items-center gap-1.5 text-[0.7rem] text-gray-500">
                      <Icon className="h-3 w-3" aria-hidden />
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-xs text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {section === "itinerary" && (
            <MobileItineraryCalendar days={days} isSemi={isSemi} isFull={isFull} />
          )}

          {section === "cost" && (
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="text-sm text-ink">Estimated cost</h3>
                <span className="text-base tabular-nums text-ink">{usd(total)}</span>
              </div>

              {isFull ? (
                <>
                  <ul className="mb-3 space-y-1.5">
                    {lineItems.map((li) => (
                      <li key={li.id} className="flex items-baseline justify-between gap-2">
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs text-ink">{li.label}</span>
                          <span className="block text-[0.65rem] text-gray-500">
                            {li.unitLabel}
                          </span>
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-ink">
                          {usd(li.price.usdMinor)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-[12px] border border-white/30 px-3 py-2.5">
                    <div className="flex items-baseline justify-between text-xs text-gray-500">
                      <span>Per person</span>
                      <span className="tabular-nums">{usd(perPerson)}</span>
                    </div>
                    <p className="mt-2 text-[0.65rem] leading-relaxed text-gray-500">
                      Estimate only — nothing is charged until you confirm a final quote.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary mt-3 w-full !py-2.5 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Review &amp; hold
                  </button>
                </>
              ) : (
                <p className="text-xs text-gray-500">
                  {lineItems.length} line items · {usd(perPerson)} per person
                </p>
              )}
            </div>
          )}
            </div>
          )}

          {/* Level indicator + expand/collapse arrow */}
          <div className="flex shrink-0 flex-col items-center gap-1 border-t border-white/20 py-1.5">
            <div className="flex items-center gap-1" aria-hidden>
              {EXPAND_ORDER.map((level) => (
                <span
                  key={level}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    expandLevel === level ? "w-3 bg-ink/50" : "w-1 bg-ink/20"
                  )}
                />
              ))}
            </div>
            {isSemi ? (
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" aria-hidden />
            ) : (
              <ChevronUp className="h-3.5 w-3.5 text-gray-400" aria-hidden />
            )}
          </div>
        </>
      )}
    </div>
  );
}
