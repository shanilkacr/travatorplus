# Decisions

Running log of non-obvious choices made while building Travator, per the brief's
instruction to "make reasonable decisions and note them."

## Environment / tooling
- **Node 20+ target.** Dev machine runs Node 24; code targets Node 20 (engines field).
- **Docker not installed on the build machine.** `docker-compose.yml` is authored and
  correct, but migrations/seed/live API were not run here. To run locally you need
  Docker Desktop (or a local Postgres 16 + pgvector and Redis). Everything that does
  not need a live DB (typecheck, migration generation, unit tests) was verified.
- **pnpm `allowBuilds: esbuild`** enabled so tsx/vitest/drizzle-kit can build.

## Models
- **Default LLM model = `claude-sonnet-5`** (env `LLM_MODEL`), not the brief's literal
  `claude-sonnet-4-6`, which is an older/incorrect id. It is fully env-overridable — set
  `LLM_MODEL=claude-sonnet-4-6` if you specifically want that string. Provider abstraction
  makes the exact id irrelevant to the architecture.
- **Task model = `claude-haiku-4-5`** for cheap extraction (email parsing), via the
  `taskModel` config split (`TASK_LLM_PROVIDER` / `TASK_LLM_MODEL`).

## Data model
- **Money is integer USD cents** everywhere in the DB (`*_usd_cents`) to avoid float
  drift. LKR is a *display-only* derivation using a fixed env FX rate (`USD_TO_LKR`,
  default 305) — MVP has no live FX. `PriceDisplay` carries both plus the rate used.
- **`driver_availability` stores UNavailable (blocked) date ranges.** A driver is free
  for a query range iff no block overlaps it. This models real charter calendars better
  than enumerating free days.
- **Embeddings are `vector(1024)`.** Dimension is also env-configurable (`EMBEDDINGS_DIM`)
  but the schema pins 1024 to match the pgvector column; changing it requires a migration.

## Embeddings
- **Default `EMBEDDINGS_PROVIDER=mock`** — deterministic hash-based unit vectors, no
  network, reproducible seeds. Voyage and OpenAI adapters are implemented and read keys
  from env. Mock similarity is lexical-ish (shared tokens → closer vectors), enough to
  demo hybrid search offline.

## Design system
- Tokens live in `packages/shared/src/design/tokens.ts` (single source of truth) and are
  mirrored into `apps/web` Tailwind config + `globals.css`. `scripts/check-colors.mjs`
  fails CI if any non-grayscale hex appears in `apps/web` outside `globals.css`.

## Open follow-ups
- Reference chat-UI screenshots pending from the user; the `/chat` visual shell (frontend)
  is deferred until they arrive. Backend agent loop + component contracts proceed first.
