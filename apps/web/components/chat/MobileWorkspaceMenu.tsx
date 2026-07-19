"use client";

import { ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type RailKey = "profile" | "buddies" | "explore" | "map" | "budget" | "settings";

type RailItem = {
  key: RailKey;
  label: string;
  Icon: typeof Settings;
};

const RAIL_BTN =
  "btn !inline-grid h-12 w-12 place-items-center !rounded-[14px] !px-0 !py-0 transition-all";
const RAIL_BTN_ACTIVE =
  "btn-primary !inline-grid h-12 w-12 place-items-center !rounded-[14px] !px-0 !py-0 transition-all";
const PROFILE_BTN =
  "btn-profile !inline-grid h-12 w-12 place-items-center !rounded-[14px] !px-0 !py-0 text-base font-medium transition-all";

const TOP_BTN =
  "grid h-8 w-8 place-items-center rounded-[10px] text-gray-500 transition-colors hover:bg-white/60 hover:text-ink";

type MobileWorkspaceMenuProps = {
  open: boolean;
  openRail: RailKey | null;
  rail: RailItem[];
  panel: React.ReactNode;
  onClose: () => void;
  onSelectRail: (key: RailKey) => void;
};

export function MobileWorkspaceMenu({
  open,
  openRail,
  rail,
  panel,
  onClose,
  onSelectRail,
}: MobileWorkspaceMenuProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "chat-workspace-bg fixed inset-0 z-[100] flex flex-col bg-gray-50 transition-transform duration-300 ease-editorial xl:hidden",
        open ? "translate-x-0" : "pointer-events-none -translate-x-full"
      )}
    >
      {/* Top bar — settings left, close right */}
      <header className="relative z-10 flex h-11 shrink-0 items-center justify-between px-2 pt-[max(0px,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => onSelectRail("settings")}
          aria-label="Settings"
          aria-pressed={openRail === "settings"}
          className={cn(
            TOP_BTN,
            openRail === "settings" && "bg-white/70 text-ink shadow-soft-xs ring-1 ring-ink/10"
          )}
        >
          <Settings className="h-4 w-4" aria-hidden />
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close workspace menu"
          className={TOP_BTN}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </header>

      {/* Panel content — same panels as desktop rail */}
      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto scrollbar-none">
        {panel ?? (
          <div className="flex h-full min-h-[12rem] items-center justify-center px-6 text-center text-sm text-gray-500">
            Choose a section below
          </div>
        )}
      </div>

      {/* Bottom icon rail — vertical order flipped to horizontal right-to-left */}
      <nav
        aria-label="Workspace"
        className="relative z-10 flex shrink-0 flex-row-reverse items-center justify-center gap-2.5 border-t border-white/20 bg-gray-50/90 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <button
          type="button"
          onClick={() => onSelectRail("profile")}
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

        {rail.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelectRail(key)}
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
      </nav>
    </div>
  );
}
