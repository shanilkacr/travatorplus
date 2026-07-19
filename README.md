# Travator

AI-fronted travel planning & booking for inbound travelers to Sri Lanka. Everything
happens inside a chat interface, but the AI renders interactive components (signup,
itinerary builder, hotel picker, driver booking, checkout) inline in the message stream
and can run multi-step agentic booking flows. Humans (ops agents) can take over any
conversation. The agent layer is model-agnostic (Anthropic first, swappable to OpenAI /
Google via config).

## Monorepo layout

```
travator/
  apps/
    web/    Next.js 14 (App Router) + Tailwind — marketing site + /chat. No DB, no AI keys.
    api/    Node 20 + Hono — agent loop, tools, booking engine, DB, queues.
    ops/    Next.js ops console (handoff).
  packages/
    shared/ Zod: SSE events, tool I/O, component props, DB DTOs, design tokens.
  docker-compose.yml  Postgres 16 + pgvector, Redis.
```

`web` ↔ `api` talk only over HTTP + SSE. All prices/availability/booking ids come from
Postgres via tools — the LLM never invents them.

## Prerequisites

- Node 20+, pnpm 11+
- Postgres 16+ with pgvector, and Redis — via Docker, **or** local installs (see below)

## Getting started

```bash
pnpm install
cp .env.example .env            # fill in ANTHROPIC_API_KEY etc. (embeddings default to mock)
docker compose up -d            # Postgres + Redis
pnpm db:migrate                 # creates pgvector extension + all tables
pnpm db:seed                    # 12 hotels, 8 drivers, 30 knowledge chunks
pnpm dev                        # web (3000), api (8787), ops
```

### No Docker? Local Postgres + Redis via Homebrew

This was verified as a working alternative on macOS (pgvector's Homebrew bottle
targets Postgres 17/18, not 16 — functionally equivalent for this schema):

```bash
brew install postgresql@17 redis pgvector
brew services start postgresql@17
brew services start redis

createuser -s travator --pwprompt   # password: travator (or edit DATABASE_URL to match)
createdb travator -O travator
psql -U travator -d travator -h localhost -c "CREATE EXTENSION IF NOT EXISTS vector;"

# .env: DATABASE_URL=postgres://travator:travator@localhost:5432/travator
pnpm db:migrate && pnpm db:seed
```

## SSE event protocol (v1)

`POST /v1/conversations/:id/messages` streams `text/event-stream` frames, one JSON
`StreamEvent` per `data:` line:

| type | payload | meaning |
| --- | --- | --- |
| `token` | `{ text }` | streamed assistant text |
| `component` | `{ id, name, props }` | render an in-chat component (props Zod-validated per name) |
| `tool_status` | `{ tool, status, label }` | tool pill: running / done / error |
| `handoff` | `{ mode: "ai" \| "human" }` | conversation switched to/from a human agent |
| `message_end` | `{ messageId }` | end of the assistant turn |
| `error` | `{ code, message }` | stream-level error |

Component interactions post back to `POST /v1/conversations/:id/interactions` as
`{ componentId, action, payload }`; they are persisted as structured messages and injected
into the agent's context so component state and conversation state never diverge.

The schema is the single source of truth in `packages/shared` — see
`src/events`, `src/components`, `src/tools`.

## Design system

Strict monochrome. Tokens in `packages/shared/src/design/tokens.ts`.
`pnpm check:colors` fails if any non-grayscale hex appears in `apps/web` outside its
token file. Headings use Stack Sans Headline 300; base font size 14px.

## Milestones

1. ✅ Monorepo scaffold, docker-compose, shared package, migrations + seed.
2. ✅ Design system + marketing site (Home → chat, Our Story, Blog, Book a call).
3. ✅ API: auth, conversations, SSE, LLMProvider abstraction (Anthropic + OpenAI), echo mode.
4. Agent loop + tools (knowledge/hotels/drivers) + chat UI.
5. Trips, ItineraryBuilder, holds + quote + BookingSummary.
6. `confirm_booking` saga + ledger + mock payments + PaymentStatus.
7. Email import slice.
8. Handoff + ops console.

See `DECISIONS.md` for choices made along the way.
