import { z } from "zod";
import { IsoDate, IsoDateTime } from "../common.js";

/**
 * Structured output of the email-import extraction (milestone 7). The task LLM
 * parses a raw confirmation email into this shape; low confidence flags an
 * ops_task. Imported flights surface in the itinerary as fixed anchors.
 */

export const ParsedFlight = z.object({
  airline: z.string(),
  flightNumber: z.string(),
  pnr: z.string().optional(),
  departureAirport: z.string().optional(),
  arrivalAirport: z.string(),
  arrivalTime: IsoDateTime.optional(),
  departureTime: IsoDateTime.optional(),
});
export type ParsedFlight = z.infer<typeof ParsedFlight>;

export const ParsedHotel = z.object({
  name: z.string(),
  checkIn: IsoDate.optional(),
  checkOut: IsoDate.optional(),
  confirmationNumber: z.string().optional(),
});
export type ParsedHotel = z.infer<typeof ParsedHotel>;

export const ParsedBooking = z.object({
  flights: z.array(ParsedFlight).default([]),
  hotels: z.array(ParsedHotel).default([]),
  /** Model self-assessed extraction confidence [0,1]. */
  confidence: z.number().min(0).max(1),
});
export type ParsedBooking = z.infer<typeof ParsedBooking>;

export const ImportEmailRequest = z.object({
  source: z.enum(["email"]).default("email"),
  from: z.string().optional(),
  subject: z.string().optional(),
  body: z.string(), // raw text or HTML
  conversationId: z.string().uuid().optional(),
});
export type ImportEmailRequest = z.infer<typeof ImportEmailRequest>;
