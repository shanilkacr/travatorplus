import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./config/env.js";
import { withOptionalAuth } from "./auth/middleware.js";
import { withRequestContext, type AppVars } from "./middleware/request-context.js";
import { authRoutes } from "./routes/auth.js";
import { conversationRoutes } from "./routes/conversations.js";
import { contactRoutes } from "./routes/contact.js";
import type { WorkerBindings } from "./types/bindings.js";

/**
 * Shared Hono app — used by Node (server.ts) and Cloudflare Workers (index.ts).
 * web talks to this only over HTTP + SSE — see packages/shared for the v1 event protocol.
 */
export function createApp() {
  const app = new Hono<{ Bindings: WorkerBindings; Variables: AppVars }>();

  app.use("*", withRequestContext);
  app.use(
    "*",
    cors({
      origin: () => env().WEB_ORIGIN,
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use("*", withOptionalAuth);

  app.get("/health", (c) =>
    c.json({ ok: true, service: "travator-api", runtime: "hono" })
  );

  app.route("/v1/auth", authRoutes);
  app.route("/v1/conversations", conversationRoutes);
  app.route("/v1/contact", contactRoutes);

  return app;
}
