"use client";

import { useState } from "react";
import {
  Calendar,
  Car,
  ChevronDown,
  Hotel,
  MapPin,
  Users,
} from "lucide-react";
import type { ItineraryDay, QuoteLineItem } from "@travator/shared";
import { cn } from "@/lib/utils";
import { DEMO_DAYS, DEMO_LINE_ITEMS, DEMO_TRIP } from "@/lib/demo-trip";

const usd = (minor: number) =>
  `$${(minor / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const dayLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

type TripSummary = {
  title: string;
  travelers: number;
  startDate: string;
  endDate: string;
  nights: number;
};

type TravelPlannerProps = {
  trip?: TripSummary;
  days?: ItineraryDay[];
  lineItems?: (QuoteLineItem & { id: string })[];
};

/**
 * The trip's live working document: summary, day-by-day itinerary, and the
 * running cost. Sections collapse independently so a long trip stays scannable.
 */
export function TravelPlanner({
  trip = DEMO_TRIP,
  days = DEMO_DAYS,
  lineItems = DEMO_LINE_ITEMS,
}: TravelPlannerProps) {
  const [openDay, setOpenDay] = useState<string | null>(days[0]?.date ?? null);
  const [costOpen, setCostOpen] = useState(true);

  const total = lineItems.reduce((sum, li) => sum + li.price.usdMinor, 0);
  const perPerson = Math.round(total / trip.travelers);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Trip summary */}
      <div className="border-b border-gray-100 px-5 py-5">
        <p className="eyebrow">Travel planner</p>
        <h2 className="mt-2 text-lg leading-snug">{trip.title}</h2>

        <dl className="mt-4 grid grid-cols-2 gap-3">
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
            <div key={label} className="rounded-[12px] bg-gray-50 px-3 py-2.5">
              <dt className="flex items-center gap-1.5 text-[0.7rem] text-gray-500">
                <Icon className="h-3 w-3" aria-hidden />
                {label}
              </dt>
              <dd className="mt-1 text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Itinerary */}
      <div className="border-b border-gray-100 px-5 py-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm text-ink">Itinerary</h3>
          <span className="text-xs text-gray-500">{days.length} days</span>
        </div>

        <ol className="space-y-1">
          {days.map((day, i) => {
            const open = openDay === day.date;
            return (
              <li key={day.date}>
                <button
                  type="button"
                  onClick={() => setOpenDay(open ? null : day.date)}
                  aria-expanded={open}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[12px] px-2.5 py-2 text-left transition-colors",
                    open ? "bg-gray-50" : "hover:bg-gray-50"
                  )}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[8px] bg-white text-[0.7rem] text-gray-500 shadow-soft">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">
                      {day.region}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {dayLabel(day.date)}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 text-gray-500 transition-transform",
                      open && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>

                {open && (
                  <div className="animate-fade-up pb-2 pl-11 pr-2 pt-1">
                    <ul className="space-y-1.5 border-l border-gray-100 pl-3">
                      {day.stops.map((stop) => (
                        <li
                          key={stop.id}
                          className="flex items-center gap-2 text-xs text-gray-500"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-[2px] bg-gray-300" aria-hidden />
                          {stop.title}
                        </li>
                      ))}
                    </ul>
                    {day.hotelName && (
                      <p className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-500">
                        <Hotel className="h-3 w-3 shrink-0" aria-hidden />
                        {day.hotelName}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Cost */}
      <div className="px-5 py-5">
        <button
          type="button"
          onClick={() => setCostOpen((v) => !v)}
          aria-expanded={costOpen}
          className="mb-3 flex w-full items-center justify-between"
        >
          <h3 className="text-sm text-ink">Estimated cost</h3>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-gray-500 transition-transform",
              costOpen && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        {costOpen && (
          <ul className="mb-4 space-y-2">
            {lineItems.map((li) => (
              <li key={li.id} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs text-ink">{li.label}</span>
                  <span className="block text-[0.7rem] text-gray-500">
                    {li.unitLabel}
                  </span>
                </span>
                <span className="shrink-0 text-xs tabular-nums text-ink">
                  {usd(li.price.usdMinor)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="rounded-[14px] bg-gray-50 px-4 py-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-ink">Total</span>
            <span className="text-lg tabular-nums text-ink">{usd(total)}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between text-xs text-gray-500">
            <span>Per person</span>
            <span className="tabular-nums">{usd(perPerson)}</span>
          </div>
          <p className="mt-3 text-[0.7rem] leading-relaxed text-gray-500">
            Estimate only — nothing is charged until you confirm a final quote.
          </p>
        </div>

        <button type="button" className="btn-primary mt-4 w-full">
          Review &amp; hold
        </button>
      </div>
    </div>
  );
}
