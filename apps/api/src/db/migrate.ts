import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../config/env.js";

/**
 * Runs Drizzle migrations. Ensures the pgvector extension exists first (the
 * generated migration references vector(1024) columns).
 */
async function main() {
  const url = env().DATABASE_URL;
  const client = postgres(url, { max: 1 });

  console.log("→ Ensuring pgvector extension…");
  await client`CREATE EXTENSION IF NOT EXISTS vector`;

  const dbInstance = drizzle(client);
  console.log("→ Running migrations…");
  await migrate(dbInstance, { migrationsFolder: "./src/db/migrations" });

  console.log("✓ Migrations complete.");
  await client.end();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
