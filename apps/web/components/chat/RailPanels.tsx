"use client";

import { useState } from "react";
import {
  Check,
  GripVertical,
  Hash,
  Lock,
  MapPin,
  Plus,
  Share2,
  Trash2,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEMO_BUDDIES,
  DEMO_DAYS,
  DEMO_EXPLORE,
  DEMO_LINE_ITEMS,
  DEMO_TRIP,
} from "@/lib/demo-trip";

const usd = (minor: number) =>
  `$${(minor / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/** Shared chrome so every panel reads the same. */
function PanelShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="border-b border-gray-100 px-5 py-5">
        <h2 className="text-base">{title}</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
      <div className="flex-1 px-5 py-5">{children}</div>
    </div>
  );
}

/* ── Profile ─────────────────────────────────────────────── */

export function ProfilePanel() {
  const socials = [
    { name: "Instagram", handle: "@sam.travels", connected: true },
    { name: "Strava", handle: "Not connected", connected: false },
    { name: "Google", handle: "sam@email.com", connected: true },
  ];

  return (
    <PanelShell
      title="Your profile"
      description="Connect accounts and list where you're headed. Other travelers only see what you choose to share."
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-gray-100 text-lg text-ink">
          S
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm text-ink">Sam Perera</p>
          <p className="truncate text-xs text-gray-500">Joined July 2026</p>
        </div>
      </div>

      <p className="eyebrow mb-3 mt-6">Connected accounts</p>
      <ul className="space-y-2">
        {socials.map((s) => (
          <li
            key={s.name}
            className="flex items-center justify-between gap-3 rounded-[12px] bg-gray-50 px-3 py-2.5"
          >
            <span className="min-w-0">
              <span className="block text-xs text-ink">{s.name}</span>
              <span className="block truncate text-[0.7rem] text-gray-500">
                {s.handle}
              </span>
            </span>
            {s.connected ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-ink" aria-hidden />
            ) : (
              <button type="button" className="shrink-0 text-[0.7rem] text-gray-500 underline underline-offset-4 hover:text-ink">
                Connect
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="eyebrow mb-3 mt-6">My destinations</p>
      <div className="flex flex-wrap gap-1.5">
        {["Sigiriya", "Kandy", "Ella", "Mirissa"].map((d) => (
          <span
            key={d}
            className="rounded-[8px] bg-gray-50 px-2.5 py-1 text-xs text-gray-500"
          >
            {d}
          </span>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-[8px] px-2.5 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
        >
          <Plus className="h-3 w-3" aria-hidden />
          Add
        </button>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-[12px] bg-gray-50 px-3 py-3">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" aria-hidden />
        <p className="text-[0.7rem] leading-relaxed text-gray-500">
          Your profile is private until you opt in to Travel buddies.
        </p>
      </div>
    </PanelShell>
  );
}

/* ── Travel buddies ──────────────────────────────────────── */

export function BuddiesPanel() {
  const [sharing, setSharing] = useState(false);

  return (
    <PanelShell
      title="Travel buddies"
      description="Travelers on overlapping routes who chose to be discoverable. Share a driver, split a villa, compare notes."
    >
      <div className="mb-5 flex items-start justify-between gap-3 rounded-[12px] bg-gray-50 px-3.5 py-3">
        <div className="min-w-0">
          <p className="text-xs text-ink">Show me to other travelers</p>
          <p className="mt-0.5 text-[0.7rem] leading-relaxed text-gray-500">
            Shares your regions and dates — never your contact details.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={sharing}
          aria-label="Show me to other travelers"
          onClick={() => setSharing((v) => !v)}
          className={cn(
            "relative h-5 w-9 shrink-0 rounded-[6px] transition-colors",
            sharing ? "bg-ink" : "bg-gray-300"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-[4px] bg-white transition-transform",
              sharing ? "translate-x-[1.125rem]" : "translate-x-0.5"
            )}
          />
        </button>
      </div>

      <ul className="space-y-2.5">
        {DEMO_BUDDIES.map((b) => (
          <li key={b.id} className="rounded-[14px] bg-gray-50 p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-white text-xs text-ink shadow-soft">
                {b.name.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-ink">{b.name}</span>
                <span className="block truncate text-[0.7rem] text-gray-500">
                  {b.from} · {b.overlap}
                </span>
              </span>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-gray-500">{b.note}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {b.regions.map((r) => (
                <span
                  key={r}
                  className="rounded-[6px] bg-white px-2 py-0.5 text-[0.7rem] text-gray-500"
                >
                  {r}
                </span>
              ))}
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 text-[0.7rem] text-gray-500 transition-colors hover:text-ink"
              >
                <UserPlus className="h-3 w-3" aria-hidden />
                Say hello
              </button>
            </div>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

/* ── Explore ─────────────────────────────────────────────── */

export function ExplorePanel() {
  return (
    <PanelShell
      title="Explore"
      description="What people are posting about the places on your route."
    >
      <ul className="space-y-2.5">
        {DEMO_EXPLORE.map((e) => (
          <li key={e.id} className="rounded-[14px] bg-gray-50 p-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm text-ink">
                <Hash className="h-3.5 w-3.5 text-gray-500" aria-hidden />
                {e.tag.replace("#", "")}
              </span>
              <span className="shrink-0 text-[0.7rem] text-gray-500">
                {e.posts} posts
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">{e.blurb}</p>
            <button
              type="button"
              className="mt-2.5 inline-flex items-center gap-1 text-[0.7rem] text-gray-500 transition-colors hover:text-ink"
            >
              <Plus className="h-3 w-3" aria-hidden />
              Add {e.region} to trip
            </button>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

/* ── Map ─────────────────────────────────────────────────── */

export function MapPanel() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <PanelShell
      title="Route map"
      description="Your itinerary end to end. Select a stop to reorder or edit it."
    >
      {/* Schematic route — a real map SDK drops in here. */}
      <div className="relative overflow-hidden rounded-[16px] bg-gray-50 p-5">
        <div aria-hidden className="dot-pattern absolute inset-0 opacity-60" />
        <ol className="relative space-y-0">
          {DEMO_DAYS.map((day, i) => (
            <li key={day.date} className="flex gap-3">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setActive(active === day.date ? null : day.date)}
                  aria-label={`Stop ${i + 1}: ${day.region}`}
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-[8px] text-[0.7rem] transition-colors",
                    active === day.date
                      ? "bg-ink text-white"
                      : "bg-white text-gray-500 shadow-soft hover:text-ink"
                  )}
                >
                  {i + 1}
                </button>
                {i < DEMO_DAYS.length - 1 && (
                  <span className="my-1 w-px flex-1 bg-gray-300" aria-hidden />
                )}
              </div>
              <div className={cn("min-w-0 flex-1", i < DEMO_DAYS.length - 1 && "pb-4")}>
                <p className="text-sm text-ink">{day.region}</p>
                <p className="truncate text-[0.7rem] text-gray-500">
                  {day.stops.length} stop{day.stops.length === 1 ? "" : "s"}
                  {day.hotelName ? ` · ${day.hotelName}` : ""}
                </p>
                {active === day.date && (
                  <div className="mt-2 flex animate-fade-up gap-1.5">
                    <button type="button" className="rounded-[8px] bg-white px-2.5 py-1 text-[0.7rem] text-gray-500 shadow-soft transition-colors hover:text-ink">
                      Move up
                    </button>
                    <button type="button" className="rounded-[8px] bg-white px-2.5 py-1 text-[0.7rem] text-gray-500 shadow-soft transition-colors hover:text-ink">
                      Add stop
                    </button>
                    <button type="button" className="rounded-[8px] bg-white px-2.5 py-1 text-[0.7rem] text-gray-500 shadow-soft transition-colors hover:text-ink">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[0.7rem] text-gray-500">
        <MapPin className="h-3 w-3" aria-hidden />
        Interactive map view lands with the live planner.
      </p>
    </PanelShell>
  );
}

/* ── Budget ──────────────────────────────────────────────── */

export function BudgetPanel() {
  const [items, setItems] = useState(DEMO_LINE_ITEMS);
  const [dragging, setDragging] = useState<string | null>(null);

  const total = items.reduce((sum, li) => sum + li.price.usdMinor, 0);

  function reorder(from: string, to: string) {
    if (from === to) return;
    setItems((cur) => {
      const next = [...cur];
      const fromIdx = next.findIndex((i) => i.id === from);
      const toIdx = next.findIndex((i) => i.id === to);
      if (fromIdx < 0 || toIdx < 0) return cur;
      const moved = next.splice(fromIdx, 1)[0];
      if (!moved) return cur;
      next.splice(toIdx, 0, moved);
      return next;
    });
  }

  return (
    <PanelShell
      title="Budget"
      description="Every line in the quote. Drag to reorder, remove anything you don't want."
    >
      <ul className="space-y-1.5">
        {items.map((li) => (
          <li
            key={li.id}
            draggable
            onDragStart={() => setDragging(li.id)}
            onDragEnd={() => setDragging(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragging) reorder(dragging, li.id);
              setDragging(null);
            }}
            className={cn(
              "group flex items-center gap-2 rounded-[12px] bg-gray-50 px-2.5 py-2.5 transition-opacity",
              dragging === li.id && "opacity-40"
            )}
          >
            <GripVertical
              className="h-3.5 w-3.5 shrink-0 cursor-grab text-gray-300 transition-colors group-hover:text-gray-500"
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs text-ink">{li.label}</span>
              <span className="block text-[0.7rem] text-gray-500">
                {li.unitLabel}
              </span>
            </span>
            <span className="shrink-0 text-xs tabular-nums text-ink">
              {usd(li.price.usdMinor)}
            </span>
            <button
              type="button"
              onClick={() => setItems((cur) => cur.filter((i) => i.id !== li.id))}
              aria-label={`Remove ${li.label}`}
              className="hidden h-5 w-5 shrink-0 place-items-center rounded-[6px] text-gray-500 transition-colors hover:bg-white hover:text-ink group-hover:grid"
            >
              <Trash2 className="h-3 w-3" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="rounded-[12px] bg-gray-50 px-3 py-6 text-center text-xs text-gray-500">
          Everything removed. Ask the planner to rebuild your quote.
        </p>
      )}

      <div className="mt-4 rounded-[14px] bg-gray-50 px-4 py-3.5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ink">Total</span>
          <span className="text-lg tabular-nums text-ink">{usd(total)}</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between text-xs text-gray-500">
          <span>Per person</span>
          <span className="tabular-nums">
            {usd(Math.round(total / DEMO_TRIP.travelers))}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-ink"
      >
        <Share2 className="h-3 w-3" aria-hidden />
        Split with travel buddies
      </button>
    </PanelShell>
  );
}

/* ── Settings ────────────────────────────────────────────── */

export function SettingsPanel() {
  const [prefs, setPrefs] = useState({
    lkr: true,
    buddies: false,
    email: true,
  });

  const rows = [
    { key: "lkr" as const, label: "Show prices in LKR", hint: "Alongside USD" },
    { key: "buddies" as const, label: "Discoverable", hint: "Appear in Travel buddies" },
    { key: "email" as const, label: "Trip emails", hint: "Quotes and confirmations" },
  ];

  return (
    <PanelShell title="Settings" description="Preferences for this account.">
      <ul className="space-y-2">
        {rows.map((r) => (
          <li
            key={r.key}
            className="flex items-center justify-between gap-3 rounded-[12px] bg-gray-50 px-3.5 py-3"
          >
            <span className="min-w-0">
              <span className="block text-xs text-ink">{r.label}</span>
              <span className="block text-[0.7rem] text-gray-500">{r.hint}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[r.key]}
              aria-label={r.label}
              onClick={() => setPrefs((p) => ({ ...p, [r.key]: !p[r.key] }))}
              className={cn(
                "relative h-5 w-9 shrink-0 rounded-[6px] transition-colors",
                prefs[r.key] ? "bg-ink" : "bg-gray-300"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-4 w-4 rounded-[4px] bg-white transition-transform",
                  prefs[r.key] ? "translate-x-[1.125rem]" : "translate-x-0.5"
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[0.7rem] leading-relaxed text-gray-500">
        Need a hand? A human planner can join this conversation at any time.
      </p>
    </PanelShell>
  );
}
