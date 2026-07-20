/**
 * Graceful degradation for the chat.
 *
 * When the model is unreachable — API down, no key configured, rate limited,
 * network failure — we never surface that to the traveller as an error. A
 * broken robot is a dead end; a person offering to help is a conversation.
 *
 * Every sequence therefore ends on the same place: a human who can pick this up.
 * The wording stays truthful (we don't claim the AI is "thinking" when it is
 * unavailable) while keeping the traveller moving toward a booked call.
 */

export type FallbackReason =
  | "unconfigured" // no API key / provider not set up
  | "unreachable" // network or provider outage
  | "rate_limited" // too many requests
  | "timeout" // provider took too long
  | "error"; // anything else

export interface FallbackStep {
  text: string;
  /** Milliseconds the typing indicator shows before this message lands. */
  typingMs: number;
  /** Renders the booking card beneath this message. */
  showBooking?: boolean;
}

const OPENERS: Record<FallbackReason, string> = {
  unconfigured:
    "Thanks for that — there's plenty to work with here.",
  unreachable:
    "Got it. Give me a moment on this one.",
  rate_limited:
    "Thanks — a lot of people are planning trips right now, so I'm a little backed up.",
  timeout: "Thanks for that. This one's taking me longer than it should.",
  error: "Thanks — let me take a look at that.",
};

const BRIDGES: Record<FallbackReason, string> = {
  unconfigured:
    "Rather than give you a half-answer, I'd like to put you in front of someone who plans these routes every week. They'll know the driving times, which coast is working for your dates, and where the good stays actually are.",
  unreachable:
    "I'm not able to reach my planning tools at the moment, and I'd rather not guess at your itinerary than get it wrong. Our team can pick this up properly.",
  rate_limited:
    "Rather than keep you waiting, one of our planners can take this now — and honestly, for a first route they're faster than I am.",
  timeout:
    "Rather than leave you watching a cursor blink, let me hand this to someone who can answer it straight away.",
  error:
    "I'd rather hand this to a person than give you something I'm not confident in. Our planners do this daily.",
};

const CLOSER =
  "Twenty minutes on a call is usually enough to shape a whole trip. No obligation, and you keep the plan either way.";

/**
 * Builds a short, paced sequence. Timings are deliberately uneven — a uniform
 * cadence reads as a script rather than a person.
 */
export function buildFallbackSequence(
  reason: FallbackReason,
  userText?: string
): FallbackStep[] {
  const steps: FallbackStep[] = [
    { text: OPENERS[reason], typingMs: 900 },
    { text: BRIDGES[reason], typingMs: 1600 },
  ];

  // Reflect the traveller's own words back once, so the handoff doesn't feel
  // like it discarded what they just typed.
  const summary = summariseRequest(userText);
  if (summary) {
    steps.splice(1, 0, {
      text: `I've noted what you're after — “${summary}” — and that'll go across with you.`,
      typingMs: 1200,
    });
  }

  steps.push({ text: CLOSER, typingMs: 1100, showBooking: true });
  return steps;
}

/**
 * The traveller's own words, quoted back. Case is preserved deliberately —
 * lowercasing mangles place names ("Galle" → "galle"), and quoting sidesteps
 * the mid-sentence capitalisation problem entirely.
 */
function summariseRequest(text?: string): string | null {
  if (!text) return null;
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length < 8) return null;
  if (clean.length <= 90) return clean.replace(/[.!?]+$/, "");
  return `${clean.slice(0, 87).trim()}…`;
}

/** Maps a thrown error or HTTP status onto a fallback reason. */
export function classifyFailure(input: unknown): FallbackReason {
  if (typeof input === "number") {
    if (input === 429) return "rate_limited";
    if (input === 401 || input === 403) return "unconfigured";
    if (input === 408 || input === 504) return "timeout";
    return "unreachable";
  }

  const message =
    input instanceof Error ? input.message.toLowerCase() : String(input).toLowerCase();

  if (message.includes("api key") || message.includes("unauthor")) return "unconfigured";
  if (message.includes("rate") || message.includes("429")) return "rate_limited";
  if (message.includes("timeout") || message.includes("abort")) return "timeout";
  if (message.includes("fetch") || message.includes("network")) return "unreachable";
  return "error";
}
