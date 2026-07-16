import { db, sqlClient } from "../db/client.js";
import {
  hotels as hotelsTable,
  hotelRates,
  drivers as driversTable,
  driverAvailability,
  knowledgeChunks as knowledgeTable,
} from "../db/schema.js";
import { getEmbeddingProvider } from "../embeddings/index.js";
import { hotels, drivers, knowledgeChunks } from "./data.js";

/**
 * Idempotent-ish seed: truncates inventory tables then reinserts. Embeddings are
 * generated for hotel descriptions and knowledge chunks via the configured
 * EmbeddingProvider (mock by default — deterministic, no network).
 */
async function main() {
  const embedder = getEmbeddingProvider();
  console.log(`→ Seeding with embeddings provider: ${embedder.id} (dim ${embedder.dim})`);

  console.log("→ Clearing inventory tables…");
  await sqlClient`TRUNCATE ${sqlClient("hotel_rates")} CASCADE`;
  await sqlClient`TRUNCATE ${sqlClient("hotels")} CASCADE`;
  await sqlClient`TRUNCATE ${sqlClient("driver_availability")} CASCADE`;
  await sqlClient`TRUNCATE ${sqlClient("drivers")} CASCADE`;
  await sqlClient`TRUNCATE ${sqlClient("knowledge_chunks")} CASCADE`;

  // ── Hotels + rates ─────────────────────────────────────────
  console.log(`→ Inserting ${hotels.length} hotels…`);
  const hotelEmbeddings = await embedder.embed(
    hotels.map((h) => `${h.name}. ${h.region}. ${h.description} Tags: ${h.vibeTags.join(", ")}`)
  );
  for (let i = 0; i < hotels.length; i++) {
    const h = hotels[i]!;
    const [row] = await db
      .insert(hotelsTable)
      .values({
        name: h.name,
        region: h.region,
        description: h.description,
        rating: h.rating,
        cancellationPolicy: h.cancellationPolicy,
        vibeTags: h.vibeTags,
        capacity: h.capacity,
        embedding: hotelEmbeddings[i]!,
      })
      .returning({ id: hotelsTable.id });
    await db.insert(hotelRates).values({
      hotelId: row!.id,
      nightlyRateUsdCents: h.nightlyRateUsdCents,
    });
  }

  // ── Drivers + availability blocks ──────────────────────────
  console.log(`→ Inserting ${drivers.length} drivers…`);
  for (const d of drivers) {
    const [row] = await db
      .insert(driversTable)
      .values({
        name: d.name,
        vehicleType: d.vehicleType,
        vehicleDescription: d.vehicleDescription,
        languages: d.languages,
        regions: d.regions,
        rating: d.rating,
        dayRateUsdCents: d.dayRateUsdCents,
      })
      .returning({ id: driversTable.id });
    for (const block of d.blocks) {
      await db.insert(driverAvailability).values({
        driverId: row!.id,
        blockStart: block.start,
        blockEnd: block.end,
        reason: block.reason ?? null,
      });
    }
  }

  // ── Knowledge chunks ───────────────────────────────────────
  console.log(`→ Inserting ${knowledgeChunks.length} knowledge chunks…`);
  const chunkEmbeddings = await embedder.embed(
    knowledgeChunks.map((c) => `${c.title}. ${c.content}`)
  );
  for (let i = 0; i < knowledgeChunks.length; i++) {
    const c = knowledgeChunks[i]!;
    await db.insert(knowledgeTable).values({
      title: c.title,
      content: c.content,
      embedding: chunkEmbeddings[i]!,
    });
  }

  console.log("✓ Seed complete.");
  await sqlClient.end();
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
