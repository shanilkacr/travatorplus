"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Map,
  Settings,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { TripComposer } from "@/components/composer/TripComposer";
import { TravelPlanner } from "@/components/chat/TravelPlanner";
import {
  BuddiesPanel,
  BudgetPanel,
  ExplorePanel,
  MapPanel,
  ProfilePanel,
  SettingsPanel,
} from "@/components/chat/RailPanels";
import { cn } from "@/lib/utils";

type RailKey = "profile" | "buddies" | "explore" | "map" | "budget" | "settings";

const RAIL: { key: RailKey; label: string; Icon: typeof User }[] = [
  { key: "buddies", label: "Travel buddies", Icon: Users },
  { key: "explore", label: "Explore", Icon: Compass },
  { key: "map", label: "Route map", Icon: Map },
  { key: "budget", label: "Budget", Icon: Wallet },
];

const PANELS: Record<RailKey, () => JSX.Element> = {
  profile: ProfilePanel,
  buddies: BuddiesPanel,
  explore: ExplorePanel,
  map: MapPanel,
  budget: BudgetPanel,
  settings: SettingsPanel,
};

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export function ChatWorkspace({ initialPrompt }: { initialPrompt: string }) {
  const [messages, setMessages] = useState<Message[]>(() =>
    initialPrompt
      ? [
          { id: "m1", role: "user", text: initialPrompt },
          {
            id: "m2",
            role: "assistant",
            text: "Good shape for a week. I've drafted a route that keeps the driving sensible — two nights at Sigiriya so you get a dawn climb without a rushed morning, then Kandy, the hill-country train down to Ella, and a soft landing on the south coast. The planner on the right has the day-by-day and a running cost. Tell me what to change.",
          },
        ]
      : []
  );

  const [openRail, setOpenRail] = useState<RailKey | null>(null);
  const [plannerOpen, setPlannerOpen] = useState(true);

  const Panel = openRail ? PANELS[openRail] : null;

  function send(text: string) {
    if (!text) return;
    setMessages((cur) => [
      ...cur,
      { id: `u${cur.length}`, role: "user", text },
      {
        id: `a${cur.length + 1}`,
        role: "assistant",
        text: "Noted — I've updated the planner. (The live agent loop lands in the next milestone; this is the interface it will drive.)",
      },
    ]);
  }

  function toggleRail(key: RailKey) {
    setOpenRail((cur) => (cur === key ? null : key));
  }

  return (
    <div className="flex h-[100svh] gap-2 overflow-hidden bg-gray-50 p-2 md:gap-3 md:p-3">
      {/* ── Left rail ─────────────────────────────────────── */}
      <nav
        aria-label="Workspace"
        className="flex w-14 shrink-0 flex-col items-center justify-between rounded-[20px] bg-white py-3 shadow-soft"
      >
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => toggleRail("profile")}
            aria-label="Your profile"
            aria-pressed={openRail === "profile"}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-[12px] text-sm transition-colors",
              openRail === "profile"
                ? "bg-ink text-white"
                : "bg-gray-100 text-ink hover:bg-gray-300"
            )}
          >
            S
          </button>

          <span className="my-1.5 h-px w-5 bg-gray-100" aria-hidden />

          {RAIL.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleRail(key)}
              aria-label={label}
              aria-pressed={openRail === key}
              title={label}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-[12px] transition-colors",
                openRail === key
                  ? "bg-ink text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => toggleRail("settings")}
          aria-label="Settings"
          aria-pressed={openRail === "settings"}
          title="Settings"
          className={cn(
            "grid h-9 w-9 place-items-center rounded-[12px] transition-colors",
            openRail === "settings"
              ? "bg-ink text-white"
              : "text-gray-500 hover:bg-gray-50 hover:text-ink"
          )}
        >
          <Settings className="h-4 w-4" aria-hidden />
        </button>
      </nav>

      {/* ── Rail panel ────────────────────────────────────── */}
      {Panel && (
        <aside className="hidden w-72 shrink-0 animate-fade-up overflow-hidden rounded-[20px] bg-white shadow-soft lg:block">
          <Panel />
        </aside>
      )}

      {/* ── Chat ──────────────────────────────────────────── */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-white shadow-soft">
        <header className="flex h-14 shrink-0 items-center justify-between px-4">
          <Link
            href="/"
            aria-label="Back to site"
            className="grid h-8 w-8 place-items-center rounded-[10px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </Link>

          <Wordmark className="pointer-events-none" />

          <button
            type="button"
            onClick={() => setPlannerOpen((v) => !v)}
            aria-label={plannerOpen ? "Hide travel planner" : "Show travel planner"}
            aria-expanded={plannerOpen}
            className="grid h-8 w-8 place-items-center rounded-[10px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
          >
            {plannerOpen ? (
              <ChevronRight className="h-4 w-4" aria-hidden />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden />
            )}
          </button>
        </header>

        {/* Thread */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {messages.length === 0 && (
              <div className="py-20 text-center">
                <Sparkles className="mx-auto h-5 w-5 text-gray-300" aria-hidden />
                <p className="mt-4 text-lg text-ink">Where are you headed?</p>
                <p className="mt-2 text-sm text-gray-500">
                  Describe the trip and the planner fills in beside you.
                </p>
              </div>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] animate-fade-up rounded-[18px] bg-gray-50 px-4 py-3 text-sm leading-relaxed text-ink">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  {/* Message actions, as a floating column beside the reply. */}
                  <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
                    <span className="grid h-7 w-7 place-items-center rounded-[10px] bg-gray-50">
                      <Sparkles className="h-3.5 w-3.5 text-ink" aria-hidden />
                    </span>
                    <div className="mt-1 flex flex-col gap-0.5 rounded-[10px] bg-white p-0.5 shadow-soft">
                      {[
                        { Icon: Copy, label: "Copy" },
                        { Icon: ThumbsUp, label: "Good reply" },
                        { Icon: ThumbsDown, label: "Bad reply" },
                      ].map(({ Icon, label }) => (
                        <button
                          key={label}
                          type="button"
                          aria-label={label}
                          className="grid h-6 w-6 place-items-center rounded-[7px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
                        >
                          <Icon className="h-3 w-3" aria-hidden />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 animate-fade-up rounded-[18px] bg-white px-4 py-3 shadow-soft">
                    <p className="text-sm leading-relaxed text-ink">{m.text}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Composer — the hero component in its chat skin. */}
        <div className="shrink-0 px-4 pb-4 md:px-8">
          <div className="mx-auto max-w-2xl">
            <TripComposer
              variant="chat"
              staticPlaceholder="Ask Travator anything…"
              onSubmit={({ text, days, destinations }) =>
                send([...destinations, text].filter(Boolean).join(" ") || `${days} days`)
              }
            />
          </div>
        </div>
      </main>

      {/* ── Travel planner ────────────────────────────────── */}
      {plannerOpen && (
        <aside
          aria-label="Travel planner"
          className="hidden w-80 shrink-0 animate-fade-up overflow-hidden rounded-[20px] bg-white shadow-soft xl:block"
        >
          <TravelPlanner />
        </aside>
      )}
    </div>
  );
}
