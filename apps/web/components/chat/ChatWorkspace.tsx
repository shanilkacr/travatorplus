"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  Compass,
  Copy,
  Map,
  Route,
  Settings,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { DotMenuIcon } from "@/components/icons/DotMenuIcon";
import { TripComposer } from "@/components/composer/TripComposer";
import {
  MobilePlanCard,
  MOBILE_PLAN_MAX_HEIGHT,
  mobilePlanUsesPageScroll,
  type MobilePlanExpandLevel,
} from "@/components/chat/MobilePlanCard";
import { TravelPlanner } from "@/components/chat/TravelPlanner";
import { AssistantMessage } from "@/components/chat/AssistantMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ChatBookingCard } from "@/components/chat/ChatBookingCard";
import {
  buildFallbackSequence,
  classifyFailure,
  type FallbackReason,
} from "@/lib/chat-fallback";
import { streamAssistantReply } from "@/lib/chat-stream";
import { MobileWorkspaceMenu } from "@/components/chat/MobileWorkspaceMenu";
import {
  BuddiesPanel,
  BudgetPanel,
  ExplorePanel,
  MapPanel,
  ProfilePanel,
  SettingsPanel,
} from "@/components/chat/RailPanels";
import { getSamplePlanPreset } from "@/lib/sample-plans";
import { DEMO_DAYS, DEMO_LINE_ITEMS, DEMO_TRIP } from "@/lib/demo-trip";
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

const RAIL_BTN =
  "btn !inline-grid h-12 w-12 place-items-center !rounded-[14px] !px-0 !py-0 transition-all";
const RAIL_BTN_ACTIVE =
  "btn-primary !inline-grid h-12 w-12 place-items-center !rounded-[14px] !px-0 !py-0 transition-all";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

const PROFILE_BTN =
  "btn-profile !inline-grid h-12 w-12 place-items-center !rounded-[14px] !px-0 !py-0 text-base font-medium transition-all";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** Renders the scheduling card beneath this message. */
  showBooking?: boolean;
}

export function ChatWorkspace({
  initialPrompt,
  initialPreset,
}: {
  initialPrompt: string;
  initialPreset?: string;
}) {
  const preset = getSamplePlanPreset(initialPreset);

  // Curated sample-plan demos stay canned (dedicated marketing content tied to
  // a specific itinerary). A freeform prompt with no matching preset is a real
  // conversation from the first turn — seed just the user's bubble here and
  // kick off the actual backend turn in the effect below.
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!initialPrompt) return [];
    if (preset) {
      return [
        { id: "m1", role: "user", text: initialPrompt },
        { id: "m2", role: "assistant", text: preset.assistantReply },
      ];
    }
    return [{ id: "m1", role: "user", text: initialPrompt }];
  });

  const [openRail, setOpenRail] = useState<RailKey | null>(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(Boolean(initialPrompt));
  const [mobilePlanLevel, setMobilePlanLevel] = useState<MobilePlanExpandLevel>("semi");
  const [typing, setTyping] = useState(false);

  // Pending fallback timers, cleared on unmount so they can't fire into a
  // component that no longer exists.
  const timers = useRef<number[]>([]);
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // The backend conversation this thread maps to. Created lazily on first
  // send so viewing the page never writes an empty conversation row.
  const conversationIdRef = useRef<string | null>(null);
  const creatingRef = useRef<Promise<string> | null>(null);
  //
  // Deliberately no abort-on-unmount here. React 18 StrictMode double-invokes
  // effects in dev (mount → cleanup → mount) to surface exactly this kind of
  // bug: an abort tied to a generic unmount effect fired during the synthetic
  // cleanup and cancelled the *first* real request before the startedInitialTurn
  // guard below could let a genuine second attempt through — so the initial
  // turn was silently killed pre-flight (visible as zero POSTs to
  // /messages in the network log, only the earlier /conversations calls).
  // React 18 also no longer warns on setState after unmount, so skipping this
  // is safe; the only cost is a rare wasted request if someone navigates away
  // mid-stream.

  const trip = preset?.trip ?? DEMO_TRIP;
  const days = preset?.days ?? DEMO_DAYS;
  const lineItems = preset?.lineItems ?? DEMO_LINE_ITEMS;

  const Panel = openRail ? PANELS[openRail] : null;

  /**
   * Plays a fallback sequence one message at a time, with the typing indicator
   * showing in between. Timers are tracked so an unmount mid-sequence doesn't
   * leave them firing into a dead component.
   */
  function playFallback(reason: FallbackReason, userText: string) {
    const steps = buildFallbackSequence(reason, userText);
    let elapsed = 0;

    steps.forEach((step, i) => {
      // Show the indicator for this step's think-time...
      timers.current.push(
        window.setTimeout(() => setTyping(true), elapsed)
      );
      elapsed += step.typingMs;

      // ...then land the message and pause before the next one starts.
      timers.current.push(
        window.setTimeout(() => {
          setTyping(false);
          setMessages((cur) => [
            ...cur,
            {
              id: `fb${Date.now()}-${i}`,
              role: "assistant",
              text: step.text,
              showBooking: step.showBooking,
            },
          ]);
        }, elapsed)
      );
      elapsed += 450;
    });
  }

  /** Creates the backend conversation on first use; reused for every later turn. */
  async function ensureConversationId(): Promise<string> {
    if (conversationIdRef.current) return conversationIdRef.current;
    if (!creatingRef.current) {
      creatingRef.current = fetch(`${API_BASE}/v1/conversations`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`create conversation failed: ${res.status}`);
          return res.json() as Promise<{ id: string }>;
        })
        .then(({ id }) => {
          conversationIdRef.current = id;
          return id;
        });
    }
    return creatingRef.current;
  }

  /** Streams a real assistant turn for `text` and appends it token by token. */
  async function respond(text: string) {
    setTyping(true);
    const assistantId = `a${Date.now()}`;
    let started = false;

    try {
      const conversationId = await ensureConversationId();
      await streamAssistantReply(
        API_BASE,
        conversationId,
        text,
        {
          onToken: (delta) => {
            if (!started) {
              started = true;
              setTyping(false);
              setMessages((cur) => [...cur, { id: assistantId, role: "assistant", text: delta }]);
            } else {
              setMessages((cur) =>
                cur.map((m) => (m.id === assistantId ? { ...m, text: m.text + delta } : m))
              );
            }
          },
          onMessageEnd: () => {
            // Content is already fully assembled from token deltas.
          },
          onHandoff: () => {
            throw new Error("handoff");
          },
          onError: (_code, message) => {
            throw new Error(message);
          },
        }
      );

      if (!started) throw new Error("empty reply");
    } catch (err) {
      setTyping(false);
      // Never surface the failure. Route the traveller to a person instead —
      // unless the turn already started streaming real content, in which case
      // leave the partial reply rather than replacing it with a fallback.
      if (!started) playFallback(classifyFailure(err), text);
    }
  }

  // A freeform first prompt (no matching sample-plan preset) starts a real
  // conversation immediately — guarded so React 18 dev-mode's double-invoke
  // of effects can't fire it twice.
  const startedInitialTurn = useRef(false);
  useEffect(() => {
    if (initialPrompt && !preset && !startedInitialTurn.current) {
      startedInitialTurn.current = true;
      void respond(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send(text: string) {
    if (!text) return;
    setMessages((cur) => [
      ...cur,
      { id: `u${cur.length}-${Date.now()}`, role: "user", text },
    ]);
    await respond(text);
  }

  function selectRail(key: RailKey) {
    setOpenRail((cur) => (cur === key ? null : key));
  }

  function closeLeftPanel() {
    setLeftPanelOpen(false);
    setOpenRail(null);
  }

  function openLeftPanel() {
    setOpenRail("profile");
    setLeftPanelOpen(true);
  }

  const leftMenuToggleClass = cn(
    "absolute grid h-10 w-10 place-items-center rounded-[10px] transition-all",
    "text-gray-500 hover:bg-white/60 hover:text-ink"
  );

  function togglePlanner() {
    setPlannerOpen((open) => {
      if (open) return false;
      setMobilePlanLevel("semi");
      return true;
    });
  }

  const plannerToggleClass = (surface: "mobile" | "desktop") =>
    cn(
      "grid h-10 w-10 place-items-center rounded-[10px] transition-all",
      surface === "mobile" ? "hover:bg-white/60" : "hover:bg-gray-50",
      plannerOpen
        ? surface === "mobile"
          ? "bg-white/70 text-ink shadow-soft-xs ring-1 ring-ink/10"
          : "bg-gray-100 text-ink ring-1 ring-ink/10"
        : "text-gray-500 hover:text-ink"
    );

  const isMobilePageScroll = plannerOpen && mobilePlanUsesPageScroll(mobilePlanLevel);

  function handleComposerSubmit({
    text,
    days,
    destinations,
  }: {
    text: string;
    days: number;
    destinations: string[];
  }) {
    send([...destinations, text].filter(Boolean).join(" ") || `${days} days`);
  }

  const composer = (
    <TripComposer
      variant="chat"
      staticPlaceholder="Ask Travator anything…"
      onSubmit={handleComposerSubmit}
    />
  );

  return (
    <div className="chat-workspace-bg h-[100svh] overflow-hidden">
      {/* Mobile full-screen workspace — outside overflow flex so it can cover the viewport */}
      <MobileWorkspaceMenu
        open={leftPanelOpen}
        openRail={openRail}
        rail={RAIL}
        panel={Panel ? <Panel /> : null}
        onClose={closeLeftPanel}
        onSelectRail={selectRail}
      />

      <div className="relative z-10 flex h-full overflow-hidden max-xl:gap-0 max-xl:p-0 xl:gap-3 xl:p-3">
      {/* ── Desktop left rail + panel ─────────────────────── */}
      <div className="hidden shrink-0 gap-2 xl:flex">
        <nav
          aria-label="Workspace"
          className="flex w-[4.75rem] shrink-0 flex-col items-center justify-between rounded-[20px] p-2.5"
        >
          <div className="flex flex-col items-center gap-2.5">
            <button
              type="button"
              onClick={() => selectRail("profile")}
              aria-label="Your profile"
              aria-pressed={openRail === "profile"}
              className={cn(
                PROFILE_BTN,
                openRail === "profile" &&
                  "ring-2 ring-ink/10 ring-offset-2 ring-offset-gray-50"
              )}
            >
              S
            </button>

            <span className="h-px w-full bg-gray-100" aria-hidden />

            {RAIL.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => selectRail(key)}
                aria-label={label}
                aria-pressed={openRail === key}
                title={label}
                className={cn(
                  openRail === key ? RAIL_BTN_ACTIVE : RAIL_BTN,
                  openRail !== key && "text-gray-500"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => selectRail("settings")}
            aria-label="Settings"
            aria-pressed={openRail === "settings"}
            title="Settings"
            className={cn(
              openRail === "settings" ? RAIL_BTN_ACTIVE : RAIL_BTN,
              openRail !== "settings" && "text-gray-500"
            )}
          >
            <Settings className="h-5 w-5" aria-hidden />
          </button>
        </nav>

        {Panel && (
          <aside className="w-72 shrink-0 overflow-hidden rounded-[20px] animate-fade-up">
            <Panel />
          </aside>
        )}
      </div>

      {/* ── Mobile column: logo + plan card + chat ─────────── */}
      <div
        className={cn(
          "relative flex min-w-0 flex-1 flex-col max-xl:gap-0 xl:gap-2",
          isMobilePageScroll
            ? "min-h-0 overflow-y-auto scrollbar-none pb-36"
            : "overflow-hidden"
        )}
      >
        {/* Logo on the workspace background — menu + planner toggles */}
        <header className="relative flex shrink-0 items-center justify-center px-4 py-6 xl:hidden">
          {!leftPanelOpen && (
            <button
              type="button"
              onClick={openLeftPanel}
              aria-label="Open workspace menu"
              aria-expanded={false}
              className={cn(leftMenuToggleClass, "left-4 z-10")}
            >
              <DotMenuIcon className="h-5 w-5" />
            </button>
          )}

          <Wordmark />

          <button
            type="button"
            onClick={togglePlanner}
            aria-label={plannerOpen ? "Hide travel planner" : "Show travel planner"}
            aria-pressed={plannerOpen}
            className={cn("absolute right-4", plannerToggleClass("mobile"))}
          >
            <Route className="h-5 w-5" aria-hidden />
          </button>
        </header>

        {plannerOpen && (
          <div
            className={cn(
              "shrink-0 px-4 xl:hidden transition-[max-height] duration-300 ease-editorial",
              !isMobilePageScroll && "overflow-hidden",
              MOBILE_PLAN_MAX_HEIGHT[mobilePlanLevel]
            )}
          >
            <MobilePlanCard
              trip={trip}
              days={days}
              lineItems={lineItems}
              expandLevel={mobilePlanLevel}
              onExpandLevelChange={setMobilePlanLevel}
              className={isMobilePageScroll ? "h-auto" : "h-full"}
            />
          </div>
        )}

      {/* ── Chat ──────────────────────────────────────────── */}
      <main
        className={cn(
          "mobile-chat-ui relative flex min-w-0 flex-col bg-white shadow-soft transition-[width] duration-300 ease-editorial",
          "max-xl:rounded-b-none max-xl:rounded-t-[16px] xl:rounded-[20px]",
          isMobilePageScroll
            ? "shrink-0 xl:min-h-0 xl:flex-1 xl:overflow-hidden"
            : "min-h-0 flex-1 overflow-hidden"
        )}
      >
        <header className="hidden h-14 shrink-0 items-center justify-between px-4 xl:flex">
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
            onClick={togglePlanner}
            aria-label={plannerOpen ? "Hide travel planner" : "Show travel planner"}
            aria-pressed={plannerOpen}
            className={plannerToggleClass("desktop")}
          >
            <Route className="h-5 w-5" aria-hidden />
          </button>
        </header>

        {/* Thread */}
        <div
          className={cn(
            "px-4 py-6 md:px-8",
            isMobilePageScroll
              ? "xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:scrollbar-none xl:pb-6"
              : "min-h-0 flex-1 overflow-y-auto pb-32 scrollbar-none xl:pb-6"
          )}
        >
          <div className="mx-auto max-w-2xl space-y-8">
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
                  <p className="max-w-[85%] animate-fade-up rounded-[18px] bg-gray-50 px-4 py-3 text-sm leading-relaxed text-ink/75">
                    {m.text}
                  </p>
                </div>
              ) : (
                <article key={m.id} className="animate-fade-up">
                  <AssistantMessage content={m.text} />
                  <div className="mt-4 flex items-center gap-0.5">
                    {[
                      { Icon: Copy, label: "Copy" },
                      { Icon: ThumbsUp, label: "Good reply" },
                      { Icon: ThumbsDown, label: "Bad reply" },
                    ].map(({ Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        aria-label={label}
                        className="grid h-7 w-7 place-items-center rounded-[8px] text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    ))}
                  </div>
                  {m.showBooking && <ChatBookingCard />}
                </article>
              )
            )}

            {typing && (
              <div className="animate-fade-up">
                <TypingIndicator />
              </div>
            )}
          </div>
        </div>

        {/* Composer — anchored to chat column on mobile, inline on desktop */}
        <div
          className={cn(
            "pointer-events-none z-50 shrink-0",
            "max-xl:absolute max-xl:inset-x-0 max-xl:bottom-0 max-xl:px-4 max-xl:pb-[max(0.5rem,env(safe-area-inset-bottom))]",
            "xl:static xl:pointer-events-auto xl:px-4 xl:pb-4"
          )}
        >
          <div className="pointer-events-auto mx-auto max-w-2xl">{composer}</div>
        </div>
      </main>
      </div>

      {/* ── Travel planner (desktop) ──────────────────────── */}
      {plannerOpen && (
        <aside
          aria-label="Travel planner"
          className="hidden w-80 shrink-0 animate-fade-up overflow-hidden rounded-[20px] xl:block"
        >
          <TravelPlanner trip={trip} days={days} lineItems={lineItems} />
        </aside>
      )}
      </div>
    </div>
  );
}
