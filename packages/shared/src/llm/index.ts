import { z } from "zod";

/**
 * Vendor-neutral LLM types. Conversation history is stored in THIS shape so a
 * thread can switch models/providers mid-conversation. Each provider adapter in
 * apps/api translates to/from its vendor API — nothing else imports vendor SDKs.
 */

// ── Canonical messages ───────────────────────────────────────
export const TextBlock = z.object({ type: z.literal("text"), text: z.string() });

export const ToolCallBlock = z.object({
  type: z.literal("tool_call"),
  id: z.string(), // provider-agnostic call id we assign/track
  name: z.string(),
  args: z.record(z.unknown()),
});

export const ToolResultBlock = z.object({
  type: z.literal("tool_result"),
  callId: z.string(),
  name: z.string(),
  result: z.unknown(),
  isError: z.boolean().default(false),
});

export const ContentBlock = z.discriminatedUnion("type", [
  TextBlock,
  ToolCallBlock,
  ToolResultBlock,
]);
export type ContentBlock = z.infer<typeof ContentBlock>;

export const CanonicalRole = z.enum(["user", "assistant", "tool", "system"]);
export type CanonicalRole = z.infer<typeof CanonicalRole>;

export const CanonicalMessage = z.object({
  role: CanonicalRole,
  content: z.array(ContentBlock),
});
export type CanonicalMessage = z.infer<typeof CanonicalMessage>;

// ── Canonical tool definitions (JSON Schema for params) ──────
export const CanonicalToolDef = z.object({
  name: z.string(),
  description: z.string(),
  /** JSON Schema derived from the tool input Zod schema. */
  parameters: z.record(z.unknown()),
});
export type CanonicalToolDef = z.infer<typeof CanonicalToolDef>;

// ── Streaming events emitted by a provider ───────────────────
export type LLMEvent =
  | { type: "text_delta"; text: string }
  | { type: "tool_call"; id: string; name: string; args: Record<string, unknown> }
  | { type: "end"; usage: LLMUsage };

export interface LLMUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface LLMStreamRequest {
  system: string;
  messages: CanonicalMessage[];
  tools: CanonicalToolDef[];
  maxTokens: number;
  model: string;
}

/** Capabilities a provider must advertise; checked at startup, not mid-turn. */
export interface LLMCapabilities {
  toolUse: boolean;
  streaming: boolean;
}

export interface LLMProvider {
  id: string; // "anthropic" | "openai" | "google"
  capabilities: LLMCapabilities;
  stream(req: LLMStreamRequest): AsyncIterable<LLMEvent>;
}
