import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

export { schema };

export type DB = PostgresJsDatabase<typeof schema>;
export type SqlClient = ReturnType<typeof postgres>;

export interface DbBundle {
  db: DB;
  sqlClient: SqlClient;
}

/** Create a Postgres + Drizzle client. `prepare: false` is required for Supabase pooler / Hyperdrive. */
export function createDb(connectionString: string, max = 5): DbBundle {
  const isLocal =
    connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
  const isHyperdrive = connectionString.includes("hyperdrive");
  // Workers: max 1 connection — higher values burn subrequests.
  const poolMax = isLocal ? max : 1;
  const sqlClient = postgres(connectionString, {
    max: poolMax,
    prepare: false,
    connect_timeout: 10,
    idle_timeout: 20,
    // Hosted Postgres needs TLS; Hyperdrive and localhost do not.
    ...(!isLocal && !isHyperdrive ? { ssl: "require" } : {}),
  });
  const db = drizzle(sqlClient, { schema });
  return { db, sqlClient };
}

const nodeCache = new Map<string, DbBundle>();

/** Reuse one client bundle per connection string in long-lived Node processes only. */
export function getDb(connectionString: string): DbBundle {
  const cached = nodeCache.get(connectionString);
  if (cached) return cached;
  const bundle = createDb(connectionString);
  nodeCache.set(connectionString, bundle);
  return bundle;
}
