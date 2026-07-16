import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config/env.js";
import * as schema from "./schema.js";

/** Shared Postgres connection + Drizzle instance. */
const queryClient = postgres(env().DATABASE_URL, { max: 10 });

export const db = drizzle(queryClient, { schema });
export { schema };
export type DB = typeof db;

/** Raw client for pgvector similarity queries and extension setup. */
export const sqlClient = queryClient;
