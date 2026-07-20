# Graph Report - .  (2026-07-16)

## Corpus Check
- Corpus is ~22,210 words - fits in a single context window. You may not need a graph.

## Summary
- 524 nodes · 686 edges · 36 communities (29 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- LLM Provider Adapters
- Database Schema Models
- Blog Pages Content
- Auth JWT Middleware
- API Package Dependencies
- Root Workspace Config
- Sri Lanka Travel Content
- Web App Dependencies
- SSE Stream Protocol
- Base TypeScript Config
- Agent Tool Contracts
- Shared Package Setup
- Web TypeScript Config
- Embedding Providers
- Chat UI Components
- Marketing Site Shell
- Shared Domain Types
- Design Tokens System
- API TypeScript Config
- API Request Schemas
- Booking DTO Types
- Shared TypeScript Config
- Color Lint Script
- Root Layout Fonts
- Canonical Tool Defs
- Next MDX Config
- Next Env Types
- Tailwind Config
- Money PriceDisplay
- pnpm esbuild Allow
- Driver Availability Model
- Node Version Target

## God Nodes (most connected - your core abstractions)
1. `env` - 27 edges
2. `compilerOptions` - 19 edges
3. `compilerOptions` - 12 edges
4. `LLMProvider` - 12 edges
5. `scripts` - 10 edges
6. `scripts` - 10 edges
7. `LLMEvent` - 9 edges
8. `LLMStreamRequest` - 9 edges
9. `Monorepo Layout` - 8 edges
10. `scripts` - 7 edges

## Surprising Connections (you probably didn't know these)
- `pnpm Workspace apps/* and packages/*` --implements--> `Monorepo Layout`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `ResolvedModel` --references--> `LLMProvider`  [EXTRACTED]
  apps/api/src/providers/registry.ts → packages/shared/src/llm/index.ts
- `Default LLM Model claude-sonnet-5` --rationale_for--> `LLMProvider Abstraction`  [INFERRED]
  DECISIONS.md → README.md
- `Embeddings vector(1024)` --conceptually_related_to--> `Postgres 16 with pgvector`  [INFERRED]
  DECISIONS.md → docker-compose.yml
- `Design Tokens Single Source of Truth` --rationale_for--> `Strict Monochrome Design System`  [INFERRED]
  DECISIONS.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Travator Monorepo Applications** — readme_apps_web, readme_apps_api, readme_apps_ops, readme_packages_shared [EXTRACTED 1.00]
- **Local Dev Infrastructure Stack** — docker_compose_postgres, docker_compose_redis, docker_compose_travator_pgdata, docker_compose_travator_redisdata [EXTRACTED 1.00]
- **Sri Lanka Itinerary Planning Knowledge** — apps_web_content_blog_driving_times_that_actually_matter_road_time_vs_distance, apps_web_content_blog_one_week_first_timer_classic_seven_day_loop, apps_web_content_blog_southwest_vs_east_coast_two_monsoons [INFERRED 0.85]

## Communities (36 total, 7 thin omitted)

### Community 0 - "LLM Provider Adapters"
Cohesion: 0.10
Nodes (28): AnthropicProvider, toAnthropic(), EchoProvider, sleep(), GoogleProvider, TODO: implement using @google/generative-ai — translate CanonicalMessage[] to, OpenAIProvider, toOpenAI() (+20 more)

### Community 1 - "Database Schema Models"
Cohesion: 0.06
Nodes (37): sqlClient, bookingEvents, bookingItems, bookings, bookingStateEnum, contactRequests, conversationModeEnum, conversations (+29 more)

### Community 2 - "Blog Pages Content"
Cohesion: 0.08
Nodes (24): BlogIndexPage(), formatDate(), metadata, BlogPostPage(), formatDate(), generateMetadata(), generateStaticParams(), metadata (+16 more)

### Community 3 - "Auth JWT Middleware"
Cohesion: 0.10
Nodes (20): JwtClaims, secret(), signJwt(), verifyJwt(), AuthVars, withOptionalAuth(), AuthProvider, AuthUser (+12 more)

### Community 4 - "API Package Dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @anthropic-ai/sdk, drizzle-orm, hono, @hono/node-server, ioredis, jose, openai (+26 more)

### Community 5 - "Root Workspace Config"
Cohesion: 0.06
Nodes (33): devDependencies, turbo, typescript, engines, node, name, packageManager, private (+25 more)

### Community 6 - "Sri Lanka Travel Content"
Cohesion: 0.07
Nodes (34): Colombo to Kandy Drive, Itinerary Grounded in Real Drive Times, Kandy to Ella Drive, Road Time vs Distance, Classic Seven-Day First-Timer Loop, Climb Once Descend Once Routing, East Coast Beach Season May–Sep, Maha North-East Monsoon (+26 more)

### Community 7 - "Web App Dependencies"
Cohesion: 0.07
Nodes (29): dependencies, gray-matter, @mdx-js/loader, @mdx-js/react, next, @next/mdx, react, react-dom (+21 more)

### Community 8 - "SSE Stream Protocol"
Cohesion: 0.12
Nodes (16): SSE_HEADERS, SSEWriter, ComponentName, parseComponentProps(), ComponentEvent, decodeSSE(), encodeSSE(), ErrorEvent (+8 more)

### Community 9 - "Base TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, lib, module (+12 more)

### Community 10 - "Agent Tool Contracts"
Cohesion: 0.10
Nodes (19): BuildItineraryInput, BuildItineraryOutput, ConfirmBookingInput, ConfirmBookingOutput, CreateHoldInput, CreateHoldOutput, EscalateToHumanInput, EscalateToHumanOutput (+11 more)

### Community 11 - "Shared Package Setup"
Cohesion: 0.11
Nodes (17): dependencies, zod, devDependencies, typescript, vitest, exports, ./design, main (+9 more)

### Community 12 - "Web TypeScript Config"
Cohesion: 0.12
Nodes (16): compilerOptions, allowJs, declaration, declarationMap, incremental, jsx, lib, noEmit (+8 more)

### Community 13 - "Embedding Providers"
Cohesion: 0.23
Nodes (7): DIM(), EmbeddingProvider, hashVector(), MockEmbeddingProvider, normalize(), OpenAIEmbeddingProvider, VoyageEmbeddingProvider

### Community 14 - "Chat UI Components"
Cohesion: 0.13
Nodes (14): BookingSummaryProps, ComponentPropsMap, DriverBookingCardProps, DriverCard, HotelCard, HotelPickerProps, InteractionAction, InteractionRequest (+6 more)

### Community 15 - "Marketing Site Shell"
Cohesion: 0.26
Nodes (5): cols, SiteFooter(), links, SiteNav(), Wordmark()

### Community 16 - "Shared Domain Types"
Cohesion: 0.20
Nodes (9): HoldItemType, IsoDate, IsoDateTime, Money, Region, VehicleType, ImportEmailRequest, ParsedFlight (+1 more)

### Community 17 - "Design Tokens System"
Cohesion: 0.18
Nodes (9): borders, DesignTokens, motion, palette, PaletteToken, radii, semantic, tokens (+1 more)

### Community 18 - "API TypeScript Config"
Cohesion: 0.22
Nodes (8): compilerOptions, lib, noEmit, outDir, rootDir, types, extends, include

### Community 19 - "API Request Schemas"
Cohesion: 0.22
Nodes (8): AuthTokenResponse, ContactRequestBody, CreateConversationBody, PostMessageBody, RequestOtpBody, SendAsHumanBody, SetModeBody, VerifyOtpBody

### Community 20 - "Booking DTO Types"
Cohesion: 0.22
Nodes (8): BookingState, ConversationMode, BookingDTO, BookingEventDTO, ConversationDTO, MessageDTO, MessageRole, OpsTaskDTO

### Community 21 - "Shared TypeScript Config"
Cohesion: 0.22
Nodes (8): compilerOptions, lib, noEmit, outDir, rootDir, types, extends, include

### Community 22 - "Color Lint Script"
Cohesion: 0.28
Nodes (7): IGNORE_DIRS, ROOT, SCAN_EXT, TOKEN_FILE, violations, walk(), WEB_DIR

### Community 23 - "Root Layout Fonts"
Cohesion: 0.40
Nodes (3): fontFamilyStyle, sans, metadata

### Community 24 - "Canonical Tool Defs"
Cohesion: 0.40
Nodes (3): CanonicalToolDef, toolDescriptions, ToolName

## Knowledge Gaps
- **276 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+271 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `env` connect `Auth JWT Middleware` to `LLM Provider Adapters`, `Database Schema Models`, `Embedding Providers`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `openai` connect `API Package Dependencies` to `LLM Provider Adapters`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _286 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LLM Provider Adapters` be split into smaller, more focused modules?**
  _Cohesion score 0.1024390243902439 - nodes in this community are weakly interconnected._
- **Should `Database Schema Models` be split into smaller, more focused modules?**
  _Cohesion score 0.06282051282051282 - nodes in this community are weakly interconnected._
- **Should `Blog Pages Content` be split into smaller, more focused modules?**
  _Cohesion score 0.08258258258258258 - nodes in this community are weakly interconnected._
- **Should `Auth JWT Middleware` be split into smaller, more focused modules?**
  _Cohesion score 0.09682539682539683 - nodes in this community are weakly interconnected._