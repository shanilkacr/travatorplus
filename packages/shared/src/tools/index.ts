import { z } from "zod";
import {
  IsoDate,
  Region,
  VehicleType,
  PriceDisplay,
  HoldItemType,
} from "../common.js";
import {
  HotelCard,
  DriverCard,
  ItineraryDay,
  QuoteLineItem,
} from "../components/index.js";

/**
 * Tool contracts. Each tool has an input and output schema. Handlers live in
 * apps/api; these schemas are the single source of truth for both the LLM tool
 * definitions (translated per provider) and runtime validation of tool I/O.
 *
 * INVARIANT: every price/availability/id in an output originates from the DB.
 * The LLM never invents these values.
 */

export const ToolName = z.enum([
  "search_hotels",
  "search_drivers",
  "build_itinerary",
  "create_hold",
  "generate_quote",
  "confirm_booking",
  "search_knowledge",
  "escalate_to_human",
  "request_signup",
]);
export type ToolName = z.infer<typeof ToolName>;

// 1. search_hotels
export const SearchHotelsInput = z.object({
  region: Region,
  checkIn: IsoDate,
  checkOut: IsoDate,
  guests: z.number().int().positive(),
  budgetPerNightUsd: z.number().positive().optional(),
  vibe: z.string().optional(), // triggers pgvector similarity
});
export const SearchHotelsOutput = z.object({
  hotels: z.array(HotelCard).max(5),
});

// 2. search_drivers
export const SearchDriversInput = z.object({
  startDate: IsoDate,
  endDate: IsoDate,
  vehicleType: VehicleType.optional(),
  languages: z.array(z.string()).optional(),
  regions: z.array(Region).optional(),
});
export const SearchDriversOutput = z.object({
  drivers: z.array(DriverCard),
});

// 3. build_itinerary
export const BuildItineraryInput = z.object({
  tripId: z.string().uuid(),
  days: z.array(
    z.object({
      date: IsoDate,
      region: Region,
      stops: z.array(z.string()), // stop titles; server assigns ids
      hotelId: z.string().uuid().optional(),
      driverLegs: z
        .array(z.object({ driverId: z.string().uuid() }))
        .optional(),
    })
  ),
});
export const BuildItineraryOutput = z.object({
  itineraryId: z.string().uuid(),
  tripId: z.string().uuid(),
  days: z.array(ItineraryDay),
});

// 4. create_hold
export const CreateHoldInput = z.object({
  tripId: z.string().uuid(),
  itemType: HoldItemType,
  refId: z.string().uuid(),
  dates: z.object({ start: IsoDate, end: IsoDate }),
  params: z.record(z.unknown()).optional(), // e.g. { guests: 2 }
});
export const CreateHoldOutput = z.object({
  holdId: z.string().uuid(),
  itemType: HoldItemType,
  refId: z.string().uuid(),
  expiresAt: z.string().datetime({ offset: true }),
  price: PriceDisplay, // server-computed
});

// 5. generate_quote
export const GenerateQuoteInput = z.object({
  tripId: z.string().uuid(),
});
export const GenerateQuoteOutput = z.object({
  quoteId: z.string().uuid(),
  tripId: z.string().uuid(),
  lineItems: z.array(QuoteLineItem),
  total: PriceDisplay,
});

// 6. confirm_booking (gated by a BookingSummary confirm interaction)
export const ConfirmBookingInput = z.object({
  quoteId: z.string().uuid(),
});
export const ConfirmBookingOutput = z.object({
  bookingId: z.string().uuid(),
  state: z.enum(["confirmed", "cancelled"]),
  bookingItemIds: z.array(z.string().uuid()),
  paymentId: z.string().uuid().optional(),
});

// 7. search_knowledge
export const SearchKnowledgeInput = z.object({
  query: z.string(),
  topK: z.number().int().positive().max(10).default(5),
});
export const SearchKnowledgeOutput = z.object({
  chunks: z.array(
    z.object({
      id: z.string().uuid(),
      content: z.string(),
      title: z.string().optional(),
      score: z.number(),
    })
  ),
});

// 8. escalate_to_human
export const EscalateToHumanInput = z.object({
  reason: z.string(),
});
export const EscalateToHumanOutput = z.object({
  opsTaskId: z.string().uuid(),
  mode: z.literal("human"),
});

// 9. request_signup
export const RequestSignupInput = z.object({
  reason: z.string().optional(),
});
export const RequestSignupOutput = z.object({
  componentId: z.string(),
  rendered: z.literal("SignupCard"),
});

/** Registry: name -> { input, output }. Drives provider tool generation. */
export const toolSchemas = {
  search_hotels: { input: SearchHotelsInput, output: SearchHotelsOutput },
  search_drivers: { input: SearchDriversInput, output: SearchDriversOutput },
  build_itinerary: { input: BuildItineraryInput, output: BuildItineraryOutput },
  create_hold: { input: CreateHoldInput, output: CreateHoldOutput },
  generate_quote: { input: GenerateQuoteInput, output: GenerateQuoteOutput },
  confirm_booking: { input: ConfirmBookingInput, output: ConfirmBookingOutput },
  search_knowledge: { input: SearchKnowledgeInput, output: SearchKnowledgeOutput },
  escalate_to_human: { input: EscalateToHumanInput, output: EscalateToHumanOutput },
  request_signup: { input: RequestSignupInput, output: RequestSignupOutput },
} as const satisfies Record<ToolName, { input: z.ZodTypeAny; output: z.ZodTypeAny }>;

/** Human-facing descriptions for the LLM tool definitions. */
export const toolDescriptions: Record<ToolName, string> = {
  search_hotels:
    "Search bookable Sri Lanka hotels in a region for given dates/guests. Returns up to 5 with nightly rates from inventory. Provide `vibe` for semantic matching (e.g. 'quiet beachfront', 'colonial charm').",
  search_drivers:
    "Find drivers available for the ENTIRE date range, optionally filtered by vehicle type, languages, or regions covered. Returns day rates from inventory.",
  build_itinerary:
    "Create or update the day-by-day itinerary for a trip and render the ItineraryBuilder. Ground days in real driving times.",
  create_hold:
    "Place a 30-minute hold on a hotel or driver and get the server-computed price. Requires the user to be signed up.",
  generate_quote:
    "Price all currently held items for a trip and render a BookingSummary. Does not charge anything.",
  confirm_booking:
    "Convert held items into confirmed bookings. ONLY valid after the user confirms via the BookingSummary component — the server rejects it otherwise.",
  search_knowledge:
    "Retrieve Sri Lanka destination knowledge (driving times, seasonal coasts, entrance fees, cultural tips) to ground planning.",
  escalate_to_human:
    "Hand the conversation to a human ops agent. Use when stuck, on complaints/emergencies, or when the user is frustrated or explicitly asks for a person.",
  request_signup:
    "Render the SignupCard to collect the user's email + OTP. Call before saving a trip or holding inventory for an anonymous user.",
};

export type ToolIO<N extends ToolName> = {
  input: z.infer<(typeof toolSchemas)[N]["input"]>;
  output: z.infer<(typeof toolSchemas)[N]["output"]>;
};
