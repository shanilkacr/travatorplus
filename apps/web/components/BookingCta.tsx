import Link from "next/link";
import { ArrowUpRight, CalendarClock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Scheduling link. Set NEXT_PUBLIC_BOOKING_URL to the real Cal.com/Calendly
 * booking page; until then this falls back to the internal /book-a-call route
 * so the CTA is never a dead end.
 */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  process.env.NEXT_PUBLIC_CAL_COM_URL ||
  "/book-a-call";

export function isExternalBooking() {
  return /^https?:\/\//.test(BOOKING_URL);
}

/**
 * Quiet conversion panel for the article sidebar. Deliberately understated —
 * no gradients, no urgency, one clear action.
 */
export function BookingCta({ className }: { className?: string }) {
  const external = isExternalBooking();

  return (
    <aside
      aria-labelledby="booking-cta-heading"
      className={cn(
        "rounded-[18px] bg-white p-5 shadow-soft",
        className
      )}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-[12px] bg-gray-50"
      >
        <CalendarClock className="h-4 w-4 text-ink" />
      </span>

      <h2 id="booking-cta-heading" className="mt-4 text-base leading-snug">
        Planning this trip yourself?
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        Talk it through with someone who knows the roads. Twenty minutes, no
        obligation, and you keep the plan either way.
      </p>

      <Link
        href={BOOKING_URL}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="btn-primary mt-5 w-full gap-1.5"
      >
        Book a call
        {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
      </Link>

      <Link
        href="/chat"
        className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-[14px] px-4 py-2.5 text-sm text-gray-500 transition-colors hover:text-ink"
      >
        <MessageSquare className="h-3.5 w-3.5" aria-hidden />
        Or plan it with AI
      </Link>
    </aside>
  );
}
