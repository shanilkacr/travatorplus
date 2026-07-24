import type { Context, Next } from "hono";
import type { DB } from "../db/client.js";
import { createDb, getDb } from "../db/client.js";
import { env, parseEnvFromBindings, runWithEnv } from "../config/env.js";
import {
  resolveDatabaseUrl,
  type WorkerBindings,
} from "../types/bindings.js";
import type { AuthVars } from "../auth/middleware.js";

export type AppVars = AuthVars & { db: DB };

function isWorkerBindings(value: unknown): value is WorkerBindings {
  return (
    typeof value === "object" &&
    value !== null &&
    "DATABASE_URL" in value &&
    typeof (value as WorkerBindings).DATABASE_URL === "string"
  );
}

/**
 * Binds request-scoped env (Workers) and db on every request.
 * Node local dev uses process.env; Workers use c.env bindings.
 *
 * Workers: fresh Postgres client per request — reusing I/O across invocations
 * throws "Cannot perform I/O on behalf of a different request".
 */
export async function withRequestContext(c: Context, next: Next) {
  if (isWorkerBindings(c.env)) {
    const parsed = parseEnvFromBindings(c.env);
    const bundle = createDb(resolveDatabaseUrl(c.env));
    return runWithEnv(parsed, async () => {
      c.set("db", bundle.db);
      try {
        await next();
      } finally {
        await bundle.sqlClient.end({ timeout: 0 });
      }
    });
  }

  c.set("db", getDb(env().DATABASE_URL).db);
  await next();
}

export function getContextDb(c: Context): DB {
  return c.get("db") as DB;
}
