import type { Context, Next } from "hono";
import type { DB, SqlClient } from "../db/client.js";
import { createDb, getDb } from "../db/client.js";
import { env, parseEnvFromBindings, runWithEnv } from "../config/env.js";
import {
  resolveDatabaseUrl,
  type WorkerBindings,
} from "../types/bindings.js";
import type { AuthVars } from "../auth/middleware.js";

/** When true, middleware must not close sqlClient — the SSE handler will. */
export const HOLD_DB_OPEN = "holdDbOpen" as const;

export type AppVars = AuthVars & {
  db: DB;
  sqlClient?: SqlClient;
  holdDbOpen?: boolean;
};

function isWorkerBindings(value: unknown): value is WorkerBindings {
  return (
    typeof value === "object" &&
    value !== null &&
    "DATABASE_URL" in value &&
    typeof (value as WorkerBindings).DATABASE_URL === "string"
  );
}

function closeSqlClient(c: Context, sqlClient: SqlClient) {
  const close = () => sqlClient.end({ timeout: 0 });
  if (c.executionCtx) c.executionCtx.waitUntil(close());
  else return close();
}

/**
 * Binds request-scoped env (Workers) and db on every request.
 * Node local dev uses process.env; Workers use c.env bindings.
 */
export async function withRequestContext(c: Context, next: Next) {
  if (isWorkerBindings(c.env)) {
    const parsed = parseEnvFromBindings(c.env);
    const bundle = createDb(resolveDatabaseUrl(c.env));
    return runWithEnv(parsed, async () => {
      c.set("db", bundle.db);
      c.set("sqlClient", bundle.sqlClient);
      try {
        await next();
      } finally {
        // SSE routes set holdDbOpen — they close the client after streaming finishes.
        if (!c.get("holdDbOpen")) closeSqlClient(c, bundle.sqlClient);
      }
    });
  }

  c.set("db", getDb(env().DATABASE_URL).db);
  await next();
}

export function getContextDb(c: Context): DB {
  return c.get("db") as DB;
}

export function getContextSql(c: Context): SqlClient | undefined {
  return c.get("sqlClient") as SqlClient | undefined;
}

/** Call from SSE handlers after the stream completes. */
export function releaseContextSql(c: Context) {
  const sqlClient = getContextSql(c);
  if (sqlClient) closeSqlClient(c, sqlClient);
}
