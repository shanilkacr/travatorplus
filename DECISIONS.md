# Decisions

Running log of non-obvious choices made while building Travator, per the brief's
instruction to "make reasonable decisions and note them."

## Environment / tooling
- **Node 20+ target.** Dev machine runs Node 24; code targets Node 20 (engines field).
- **Docker not installed on the build machine.** `docker-compose.yml` is authored and
  correct and remains the documented/primary path (matches prod parity, pins pg16).
  For local verification without Docker, Postgres 16 + pgvector + Redis were installed
  directly via Homebrew — see README's "No Docker?" section. One wrinkle: pgvector's
  Homebrew bottle only ships prebuilt for Postgres 17/18, not 16, so local dev runs
  Postgres 17 instead of 16 (schema/SQL is identical; no pg16-only features used).
  With that, milestone 3's full stack — migrate, seed, auth OTP, JWT, conversation
  create/list, SSE message streaming, interactions, contact form, CORS — was exercised
  end-to-end against a real DB, not just typechecked.
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
- **Glassmorphism pivot (marketing + /chat shell).** UI chrome is frosted neutral
  grayscale (blur, soft shadows, large radii, no outlines). Full-color Sri Lanka
  photography comes from curated Unsplash URLs via `next/image` — not from UI hex.
  Magic UI + Aceternity components are vendored under `components/ui` and
  `components/aceternity`, toned to the monochrome palette.
- **Typography = Mona Sans (300 + 400 only).** Loaded from [Google Fonts](https://fonts.google.com/specimen/Mona+Sans); headings use Light 300, body Regular 400.

## Open follow-ups
- Reference chat-UI screenshots pending from the user; the `/chat` visual shell (frontend)
  is deferred until they arrive. Backend agent loop + component contracts proceed first.
