import Link from "next/link";
import { ArrowUpRight, CalendarClock, Check } from "lucide-react";
import { BOOKING_URL, isExternalBooking } from "@/components/BookingCta";

const POINTS = [
  "A route that respects real driving times",
  "Stays and drivers we've actually used",
  "One clear quote — nothing charged until you confirm",
];

/**
 * In-chat scheduling card. Appears at the end of a fallback sequence so the
 * conversation lands somewhere useful rather than on an apology.
 */
export function ChatBookingCard() {
  const external = isExternalBooking();

  return (
    <div className="mt-3 animate-fade-up rounded-[16px] bg-gray-50 p-4">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-white shadow-soft"
        >
          <CalendarClock className="h-4 w-4 text-ink" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-ink">Talk to a Travator planner</p>
          <p className="text-xs text-gray-500">20 minutes · free · no obligation</p>
        </div>
      </div>

      <ul className="mt-3.5 space-y-1.5">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2 text-xs leading-relaxed text-gray-500">
            <span
              aria-hidden
              className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[4px] bg-ink"
            >
              <Check className="h-2.5 w-2.5 text-white" />
            </span>
            {p}
          </li>
        ))}
      </ul>

      <Link
        href={BOOKING_URL}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="btn-primary mt-4 w-full gap-1.5"
      >
        Pick a time
        {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
      </Link>

      <p className="mt-2.5 text-center text-xs text-gray-500">
        Or call{" "}
        <a
          href="tel:+94776576488"
          className="text-ink underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-ink"
        >
          +94 77 657 6488
        </a>
      </p>
    </div>
  );
}
