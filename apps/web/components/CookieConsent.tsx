"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCookieConsent,
  setCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!getCookieConsent()) setVisible(true);
  }, []);

  function choose(choice: CookieConsentChoice) {
    setCookieConsent(choice);
    setVisible(false);
  }

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className={cn(
        "fixed z-[100] animate-slide-in-left",
        /* Mobile: full-width with edge inset */
        "inset-x-0 bottom-0 w-full px-4 pb-4",
        /* Desktop: compact box from the left */
        "md:inset-x-auto md:bottom-4 md:left-4 md:w-[min(18rem,calc(100vw-2rem))] md:px-0 md:pb-0"
      )}
    >
      <div className="glass-panel flex flex-col gap-4 rounded-[16px] p-5 shadow-glass-lg md:gap-3 md:p-4">
        <div className="flex min-w-0 flex-col gap-2 md:gap-1.5">
          <p id="cookie-consent-title" className="text-sm font-medium text-ink">
            <span className="md:hidden">We value your privacy</span>
            <span className="hidden md:inline">Cookies</span>
          </p>
          <p
            id="cookie-consent-desc"
            className="text-xs leading-relaxed text-gray-500"
          >
            <span className="md:hidden">
              We use a small preference on your device and limited third-party
              services to run Travator. We don&apos;t sell your data or use
              advertising trackers — you stay in control.{" "}
            </span>
            <span className="hidden md:inline">
              We store a preference on your device and use third-party services
              that may set cookies.{" "}
            </span>
            <Link
              href="/privacy#cookies"
              className="underline decoration-gray-300 underline-offset-2 hover:text-ink"
            >
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex items-stretch gap-3 md:gap-2">
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-primary flex-1 !px-4 !py-2.5 text-xs md:flex-none md:!px-3 md:!py-1.5"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="btn flex-1 !px-4 !py-2.5 text-xs md:flex-none md:!px-3 md:!py-1.5"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
