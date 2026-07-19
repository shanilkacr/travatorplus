import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { eq, desc } from "drizzle-orm";
import {
  CreateConversationBody,
  PostMessageBody,
  InteractionRequest,
  type ConversationDTO,
} from "@travator/shared";
import { db, schema } from "../db/client.js";
import { insertMessage, loadMessageRows, toMessageDTO } from "../orchestrator/history.js";
import { runTurn } from "../orchestrator/runTurn.js";
import { makeSSEWriter, SSE_HEADERS } from "../lib/sse.js";
import type { AuthVars } from "../auth/middleware.js";

export const conversationRoutes = new Hono<{ Variables: AuthVars }>();

function toConversationDTO(row: typeof schema.conversations.$inferSelect): ConversationDTO {
  return {
    id: row.id,
    title: row.title,
    mode: row.mode,
    userId: row.userId,
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** POST /v1/conversations — create a conversation, optionally with a first message. */
conversationRoutes.post("/", async (c) => {
  const body = CreateConversationBody.safeParse(await c.req.json().catch(() => ({})));
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  const user = c.get("user");
  const [conversation] = await db
    .insert(schema.conversations)
    .values({
      userId: user?.sub ?? null,
      title: body.data.title ?? null,
    })
    .returning();

  if (body.data.firstMessage) {
    await insertMessage({
      conversationId: conversation!.id,
      role: "user",
      content: [{ kind: "text", text: body.data.firstMessage }],
    });
  }

  return c.json(toConversationDTO(conversation!));
});

/** GET /v1/conversations — list conversations for the authenticated user. */
conversationRoutes.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ conversations: [] });

  const rows = await db
    .select()
    .from(schema.conversations)
    .where(eq(schema.conversations.userId, user.sub))
    .orderBy(desc(schema.conversations.updatedAt));

  return c.json({ conversations: rows.map(toConversationDTO) });
});

/** GET /v1/conversations/:id/messages — message history (for reload/hydration). */
conversationRoutes.get("/:id/messages", async (c) => {
  const id = c.req.param("id");
  const rows = await loadMessageRows(id);
  return c.json({ messages: rows.map(toMessageDTO) });
});

/**
 * POST /v1/conversations/:id/messages — persist the user message, then stream
 * the assistant turn as SSE (StreamEvent v1 frames).
 */
conversationRoutes.post("/:id/messages", async (c) => {
  const id = c.req.param("id");
  const body = PostMessageBody.safeParse(await c.req.json());
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  const [conversation] = await db
    .select()
    .from(schema.conversations)
    .where(eq(schema.conversations.id, id))
    .limit(1);
  if (!conversation) return c.json({ error: "not_found" }, 404);

  await insertMessage({
    conversationId: id,
    role: "user",
    content: [{ kind: "text", text: body.data.text }],
  });

  c.header("Content-Type", SSE_HEADERS["Content-Type"]);
  c.header("Cache-Control", SSE_HEADERS["Cache-Control"]);
  c.header("Connection", SSE_HEADERS.Connection);
  c.header("X-Accel-Buffering", SSE_HEADERS["X-Accel-Buffering"]);

  return streamSSE(c, async (stream) => {
    const writer = makeSSEWriter({
      write: async (chunk) => {
        await stream.write(chunk);
      },
    });
    await runTurn({
      conversationId: id,
      writer,
      modelOverride: { provider: body.data.provider, model: body.data.model },
    });
  });
});

/**
 * POST /v1/conversations/:id/interactions — component interaction round-trip.
 * Persisted as a structured message so component state and conversation state
 * never diverge; the agent's next turn sees it in history.
 */
conversationRoutes.post("/:id/interactions", async (c) => {
  const id = c.req.param("id");
  const body = InteractionRequest.safeParse(await c.req.json());
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  await db.insert(schema.interactions).values({
    conversationId: id,
    componentId: body.data.componentId,
    action: body.data.action,
    payload: body.data.payload,
  });

  await insertMessage({
    conversationId: id,
    role: "user",
    content: [
      {
        kind: "interaction",
        componentId: body.data.componentId,
        action: body.data.action,
        payload: body.data.payload,
      },
    ],
  });

  return c.json({ ok: true });
});

/** POST /v1/conversations/:id/mode — switch ai/human (used by ops in milestone 8). */
conversationRoutes.post("/:id/mode", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const mode = body?.mode === "human" ? "human" : "ai";

  await db
    .update(schema.conversations)
    .set({ mode, updatedAt: new Date() })
    .where(eq(schema.conversations.id, id));

  return c.json({ ok: true, mode });
});
