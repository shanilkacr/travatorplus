import { z } from "zod";
import { ConversationMode, BookingState } from "../common.js";

/**
 * DTOs that cross the web <-> api boundary (and the ops console). These mirror
 * the persisted rows but expose only what clients render. Full row types live
 * with the Drizzle schema in apps/api.
 */

export const MessageRole = z.enum([
  "user",
  "assistant",
  "human_agent",
  "system",
]);
export type MessageRole = z.infer<typeof MessageRole>;

/** A persisted structured message. `content` is a versioned block list. */
export const MessageDTO = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  role: MessageRole,
  /** Rendered content blocks: text + component + interaction records. */
  content: z.array(
    z.discriminatedUnion("kind", [
      z.object({ kind: z.literal("text"), text: z.string() }),
      z.object({
        kind: z.literal("component"),
        componentId: z.string(),
        name: z.string(),
        props: z.unknown(),
      }),
      z.object({
        kind: z.literal("interaction"),
        componentId: z.string(),
        action: z.string(),
        payload: z.unknown(),
      }),
      z.object({
        kind: z.literal("tool"),
        tool: z.string(),
        label: z.string(),
      }),
    ])
  ),
  createdAt: z.string().datetime({ offset: true }),
});
export type MessageDTO = z.infer<typeof MessageDTO>;

export const ConversationDTO = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  mode: ConversationMode,
  userId: z.string().uuid().nullable(),
  updatedAt: z.string().datetime({ offset: true }),
});
export type ConversationDTO = z.infer<typeof ConversationDTO>;

export const OpsTaskDTO = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  reason: z.string(),
  status: z.enum(["open", "in_progress", "resolved"]),
  createdAt: z.string().datetime({ offset: true }),
});
export type OpsTaskDTO = z.infer<typeof OpsTaskDTO>;

export const BookingDTO = z.object({
  id: z.string().uuid(),
  tripId: z.string().uuid(),
  state: BookingState,
  createdAt: z.string().datetime({ offset: true }),
});
export type BookingDTO = z.infer<typeof BookingDTO>;

/** Booking events ledger entry (append-only). */
export const BookingEventDTO = z.object({
  id: z.string().uuid(),
  bookingId: z.string().uuid(),
  type: z.string(),
  data: z.unknown(),
  createdAt: z.string().datetime({ offset: true }),
});
export type BookingEventDTO = z.infer<typeof BookingEventDTO>;
