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
  const sqlClient = postgres(connectionString, { max, prepare: false });
  const db = drizzle(sqlClient, { schema });
  return { db, sqlClient };
}

const isolateCache = new Map<string, DbBundle>();

/** Reuse one client bundle per connection string within a Worker isolate or Node process. */
export function getDb(connectionString: string): DbBundle {
  const cached = isolateCache.get(connectionString);
  if (cached) return cached;
  const bundle = createDb(connectionString);
  isolateCache.set(connectionString, bundle);
  return bundle;
}
