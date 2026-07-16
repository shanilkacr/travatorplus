import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./config/env.js";

/**
 * API entrypoint. Milestone 1 ships a health check; auth, conversations, SSE,
 * the agent loop, and tools are added in later milestones.
 */
const app = new Hono();

app.get("/health", (c) => c.json({ ok: true, service: "travator-api" }));

const port = env().API_PORT;
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`▲ travator-api listening on http://localhost:${info.port}`);
});

export { app };
