import { z } from "zod";
import { ComponentName } from "../components/index.js";
import { ConversationMode } from "../common.js";

/**
 * SSE event protocol v1.
 * `POST /v1/conversations/:id/messages` streams these as `text/event-stream`,
 * one JSON object per `data:` line. `message_end` closes a turn.
 */
export const SSE_PROTOCOL_VERSION = "v1" as const;

export const TokenEvent = z.object({
  type: z.literal("token"),
  text: z.string(),
});

export const ComponentEvent = z.object({
  type: z.literal("component"),
  id: z.string(), // stable component instance id (for interaction round-trips)
  name: ComponentName,
  props: z.unknown(), // validated per-component via parseComponentProps
});

export const ToolStatusEvent = z.object({
  type: z.literal("tool_status"),
  tool: z.string(),
  status: z.enum(["running", "done", "error"]),
  label: z.string(),
});

export const HandoffEvent = z.object({
  type: z.literal("handoff"),
  mode: ConversationMode,
});

export const MessageEndEvent = z.object({
  type: z.literal("message_end"),
  messageId: z.string(),
});

export const ErrorEvent = z.object({
  type: z.literal("error"),
  code: z.string(),
  message: z.string(),
});

export const StreamEvent = z.discriminatedUnion("type", [
  TokenEvent,
  ComponentEvent,
  ToolStatusEvent,
  HandoffEvent,
  MessageEndEvent,
  ErrorEvent,
]);
export type StreamEvent = z.infer<typeof StreamEvent>;

export type StreamEventType = StreamEvent["type"];

/** Serialize a StreamEvent to a single SSE frame. */
export function encodeSSE(event: StreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

/** Parse one SSE `data:` payload back into a validated StreamEvent. */
export function decodeSSE(data: string): StreamEvent {
  return StreamEvent.parse(JSON.parse(data));
}
