import { eq, asc } from "drizzle-orm";
import type { CanonicalMessage, MessageDTO } from "@travator/shared";
import { db, schema } from "../db/client.js";

/**
 * Loads a conversation's persisted messages and converts them into canonical
 * LLM messages (vendor-neutral) for the orchestrator, and into MessageDTOs for
 * clients. Content blocks are stored as `MessageDTO["content"]` in `messages.content`.
 */

export async function loadMessageRows(conversationId: string) {
  return db
    .select()
    .from(schema.messages)
    .where(eq(schema.messages.conversationId, conversationId))
    .orderBy(asc(schema.messages.createdAt));
}

export function toMessageDTO(row: Awaited<ReturnType<typeof loadMessageRows>>[number]): MessageDTO {
  return {
    id: row.id,
    conversationId: row.conversationId,
    role: row.role,
    content: row.content as MessageDTO["content"],
    createdAt: row.createdAt.toISOString(),
  };
}

/** Convert persisted rows into canonical messages for the LLM provider. */
export function toCanonicalMessages(
  rows: Awaited<ReturnType<typeof loadMessageRows>>
): CanonicalMessage[] {
  const out: CanonicalMessage[] = [];
  for (const row of rows) {
    const blocks = row.content as MessageDTO["content"];
    if (row.role === "human_agent") {
      // Human replies read to the model as assistant text.
      const text = blocks
        .filter((b) => b.kind === "text")
        .map((b) => (b.kind === "text" ? b.text : ""))
        .join("\n");
      if (text) out.push({ role: "assistant", content: [{ type: "text", text }] });
      continue;
    }
    if (row.role === "system") {
      const text = blocks
        .filter((b) => b.kind === "text")
        .map((b) => (b.kind === "text" ? b.text : ""))
        .join("\n");
      if (text) out.push({ role: "system", content: [{ type: "text", text }] });
      continue;
    }
    const role = row.role === "assistant" ? "assistant" : "user";
    const text = blocks
      .filter((b) => b.kind === "text")
      .map((b) => (b.kind === "text" ? b.text : ""))
      .join("\n");
    if (text) out.push({ role, content: [{ type: "text", text }] });
  }
  return out;
}

export async function insertMessage(params: {
  conversationId: string;
  role: (typeof schema.messages.$inferInsert)["role"];
  content: MessageDTO["content"];
}) {
  const [row] = await db
    .insert(schema.messages)
    .values({
      conversationId: params.conversationId,
      role: params.role,
      content: params.content,
    })
    .returning();
  return row!;
}
