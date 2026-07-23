import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { loadEnvFromProcess, env } from "./config/env.js";
import { assertProvidersHealthy } from "./providers/registry.js";

/**
 * Node entrypoint for local dev and traditional hosts (Render, Railway, etc.).
 * Cloudflare Workers use src/index.ts instead.
 */
loadEnvFromProcess();

const app = createApp();

try {
  assertProvidersHealthy();
} catch (err) {
  console.error("✗ LLM provider misconfigured:", err instanceof Error ? err.message : err);
  if (env().NODE_ENV === "production") process.exit(1);
  console.warn("  Continuing in dev — set LLM_PROVIDER=echo to test without an API key.");
}

const port = Number(process.env.PORT) || env().API_PORT;
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`▲ travator-api listening on http://localhost:${info.port}`);
});

export { app };
