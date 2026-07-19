import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./config/env.js";
import { withOptionalAuth, type AuthVars } from "./auth/middleware.js";
import { authRoutes } from "./routes/auth.js";
import { conversationRoutes } from "./routes/conversations.js";
import { contactRoutes } from "./routes/contact.js";
import { assertProvidersHealthy } from "./providers/registry.js";

/**
 * API entrypoint. Owns the agent loop, booking engine, DB, queues. web talks to
 * this only over HTTP + SSE — see packages/shared for the v1 event protocol.
 */
const app = new Hono<{ Variables: AuthVars }>();

app.use(
  "*",
  cors({
    origin: env().WEB_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("*", withOptionalAuth);

app.get("/health", (c) => c.json({ ok: true, service: "travator-api" }));

app.route("/v1/auth", authRoutes);
app.route("/v1/conversations", conversationRoutes);
app.route("/v1/contact", contactRoutes);

// Fail loudly at startup if the configured LLM provider can't be constructed —
// never mid-conversation.
try {
  assertProvidersHealthy();
} catch (err) {
  console.error("✗ LLM provider misconfigured:", err instanceof Error ? err.message : err);
  if (env().NODE_ENV === "production") process.exit(1);
  console.warn("  Continuing in dev — set LLM_PROVIDER=echo to test without an API key.");
}

const port = env().API_PORT;
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`▲ travator-api listening on http://localhost:${info.port}`);
});

export { app };
