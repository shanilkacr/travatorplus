import type { StreamEvent } from "@travator/shared";
import { db, schema } from "../db/client.js";
import { eq } from "drizzle-orm";
import { resolveModel } from "../providers/registry.js";
import { SYSTEM_PROMPT } from "./systemPrompt.js";
import { loadMessageRows, toCanonicalMessages, insertMessage } from "./history.js";
import type { SSEWriter } from "../lib/sse.js";

/**
 * Runs one assistant turn for a conversation and streams StreamEvents via the
 * writer. Milestone 3 scope: text-only (no tools yet — that's milestone 4's
 * agent loop with search_knowledge/search_hotels/search_drivers etc). The
 * provider abstraction and canonical message format are already tool-loop
 * ready; `tools: []` here becomes the real tool set in the next milestone.
 */
export async function runTurn(params: {
  conversationId: string;
  writer: SSEWriter;
  modelOverride?: { provider?: string | null; model?: string | null };
}): Promise<void> {
  const { conversationId, writer } = params;

  const [conversation] = await db
    .select()
    .from(schema.conversations)
    .where(eq(schema.conversations.id, conversationId))
    .limit(1);
  if (!conversation) {
    await writer.send({ type: "error", code: "not_found", message: "Conversation not found" });
    return;
  }

  if (conversation.mode === "human") {
    // AI stays silent while a human has the conversation.
    await writer.send({
      type: "handoff",
      mode: "human",
    });
    return;
  }

  const { provider, model } = resolveModel({
    provider: params.modelOverride?.provider ?? conversation.providerOverride,
    model: params.modelOverride?.model ?? conversation.modelOverride,
  });

  const rows = await loadMessageRows(conversationId);
  const messages = toCanonicalMessages(rows);

  let fullText = "";
  try {
    for await (const ev of provider.stream({
      system: SYSTEM_PROMPT,
      messages,
      tools: [],
      maxTokens: 1024,
      model,
    })) {
      if (ev.type === "text_delta") {
        fullText += ev.text;
        const streamEvent: StreamEvent = { type: "token", text: ev.text };
        await writer.send(streamEvent);
      }
      // tool_call handling arrives in milestone 4's agent loop.
    }
  } catch (err) {
    await writer.send({
      type: "error",
      code: "provider_error",
      message: err instanceof Error ? err.message : "Unknown provider error",
    });
    return;
  }

  const assistantRow = await insertMessage({
    conversationId,
    role: "assistant",
    content: [{ kind: "text", text: fullText }],
  });

  await db
    .update(schema.conversations)
    .set({ updatedAt: new Date() })
    .where(eq(schema.conversations.id, conversationId));

  await writer.send({ type: "message_end", messageId: assistantRow.id });
}
