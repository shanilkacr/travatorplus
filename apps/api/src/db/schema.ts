import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  doublePrecision,
  timestamp,
  jsonb,
  date,
  index,
  uniqueIndex,
  pgEnum,
  customType,
} from "drizzle-orm/pg-core";

/**
 * Travator schema (Postgres 16 + pgvector). Prices are integer USD cents.
 * Embeddings are vector(1024). Booking events are append-only.
 */

// ── pgvector custom type ─────────────────────────────────────
const EMBEDDING_DIM = 1024;
export const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return `vector(${EMBEDDING_DIM})`;
  },
  toDriver(value: number[]): string {
    return `[${value.join(",")}]`;
  },
  fromDriver(value: string): number[] {
    return value
      .slice(1, -1)
      .split(",")
      .filter((s) => s.length > 0)
      .map(Number);
  },
});

// ── enums ────────────────────────────────────────────────────
export const conversationModeEnum = pgEnum("conversation_mode", ["ai", "human"]);
export const messageRoleEnum = pgEnum("message_role", [
  "user",
  "assistant",
  "human_agent",
  "system",
]);
export const bookingStateEnum = pgEnum("booking_state", [
  "draft",
  "quoted",
  "pending_payment",
  "confirmed",
  "cancelled",
]);
export const holdItemTypeEnum = pgEnum("hold_item_type", ["hotel", "driver"]);
export const holdStatusEnum = pgEnum("hold_status", [
  "active",
  "consumed",
  "expired",
  "released",
]);
export const opsTaskStatusEnum = pgEnum("ops_task_status", [
  "open",
  "in_progress",
  "resolved",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "succeeded",
  "failed",
  "refunded",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

// ── users ────────────────────────────────────────────────────
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 320 }).notNull(),
    name: text("name"),
    ...timestamps,
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
  })
);

// ── auth OTP (dev email+OTP) ─────────────────────────────────
export const otpCodes = pgTable(
  "otp_codes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 320 }).notNull(),
    codeHash: text("code_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    emailIdx: index("otp_email_idx").on(t.email),
  })
);

// ── conversations ────────────────────────────────────────────
export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    title: text("title"),
    mode: conversationModeEnum("mode").notNull().default("ai"),
    /** Per-conversation model override (vendor-neutral). */
    providerOverride: text("provider_override"),
    modelOverride: text("model_override"),
    ...timestamps,
  },
  (t) => ({
    userIdx: index("conversations_user_idx").on(t.userId),
    updatedIdx: index("conversations_updated_idx").on(t.updatedAt),
  })
);

// ── messages (vendor-neutral content blocks) ─────────────────
export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    role: messageRoleEnum("role").notNull(),
    /** Canonical content blocks (text/tool_call/tool_result) + render meta. */
    content: jsonb("content").notNull(),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    convIdx: index("messages_conversation_idx").on(t.conversationId, t.createdAt),
  })
);

// ── interactions (component -> agent) ────────────────────────
export const interactions = pgTable(
  "interactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    componentId: text("component_id").notNull(),
    action: text("action").notNull(),
    payload: jsonb("payload"),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    convIdx: index("interactions_conversation_idx").on(t.conversationId),
    componentIdx: index("interactions_component_idx").on(t.componentId),
  })
);

// ── trips ────────────────────────────────────────────────────
export const trips = pgTable(
  "trips",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    conversationId: uuid("conversation_id").references(() => conversations.id, {
      onDelete: "set null",
    }),
    title: text("title"),
    startDate: date("start_date"),
    endDate: date("end_date"),
    guests: integer("guests").notNull().default(2),
    ...timestamps,
  },
  (t) => ({
    userIdx: index("trips_user_idx").on(t.userId),
    convIdx: index("trips_conversation_idx").on(t.conversationId),
  })
);

// ── itineraries ──────────────────────────────────────────────
export const itineraries = pgTable(
  "itineraries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    /** Canonical day-by-day JSON (ItineraryDay[]). */
    days: jsonb("days").notNull().default(sql`'[]'::jsonb`),
    ...timestamps,
  },
  (t) => ({
    tripIdx: index("itineraries_trip_idx").on(t.tripId),
  })
);

// ── hotels ───────────────────────────────────────────────────
export const hotels = pgTable(
  "hotels",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    region: text("region").notNull(),
    description: text("description").notNull(),
    rating: doublePrecision("rating").notNull().default(4.0),
    cancellationPolicy: text("cancellation_policy")
      .notNull()
      .default("Free cancellation up to 48h before check-in."),
    vibeTags: jsonb("vibe_tags").notNull().default(sql`'[]'::jsonb`),
    photoUrl: text("photo_url"),
    capacity: integer("capacity").notNull().default(2),
    embedding: vector("embedding"),
    ...timestamps,
  },
  (t) => ({
    regionIdx: index("hotels_region_idx").on(t.region),
  })
);

// ── hotel_rates ──────────────────────────────────────────────
export const hotelRates = pgTable(
  "hotel_rates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    hotelId: uuid("hotel_id")
      .notNull()
      .references(() => hotels.id, { onDelete: "cascade" }),
    /** Nightly rate in USD cents. */
    nightlyRateUsdCents: integer("nightly_rate_usd_cents").notNull(),
    /** Optional season window this rate applies to (null = default). */
    seasonStart: date("season_start"),
    seasonEnd: date("season_end"),
    ...timestamps,
  },
  (t) => ({
    hotelIdx: index("hotel_rates_hotel_idx").on(t.hotelId),
  })
);

// ── drivers ──────────────────────────────────────────────────
export const drivers = pgTable(
  "drivers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    vehicleType: text("vehicle_type").notNull(),
    vehicleDescription: text("vehicle_description").notNull(),
    languages: jsonb("languages").notNull().default(sql`'[]'::jsonb`),
    regions: jsonb("regions").notNull().default(sql`'[]'::jsonb`),
    rating: doublePrecision("rating").notNull().default(4.5),
    /** Day rate in USD cents. */
    dayRateUsdCents: integer("day_rate_usd_cents").notNull(),
    ...timestamps,
  },
  (t) => ({
    vehicleIdx: index("drivers_vehicle_idx").on(t.vehicleType),
  })
);

// ── driver_availability (date-range blocks that are UNavailable) ─
export const driverAvailability = pgTable(
  "driver_availability",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    driverId: uuid("driver_id")
      .notNull()
      .references(() => drivers.id, { onDelete: "cascade" }),
    /** Blocked (unavailable) inclusive date range. */
    blockStart: date("block_start").notNull(),
    blockEnd: date("block_end").notNull(),
    reason: text("reason"),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    driverIdx: index("driver_availability_driver_idx").on(t.driverId),
  })
);

// ── holds ────────────────────────────────────────────────────
export const holds = pgTable(
  "holds",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    itemType: holdItemTypeEnum("item_type").notNull(),
    refId: uuid("ref_id").notNull(), // hotelId or driverId
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    params: jsonb("params"),
    /** Server-computed price snapshot (USD cents). */
    priceUsdCents: integer("price_usd_cents").notNull(),
    status: holdStatusEnum("status").notNull().default("active"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (t) => ({
    tripIdx: index("holds_trip_idx").on(t.tripId),
    expiresIdx: index("holds_expires_idx").on(t.expiresAt),
  })
);

// ── quotes ───────────────────────────────────────────────────
export const quotes = pgTable(
  "quotes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    /** Frozen line items (QuoteLineItem[]). */
    lineItems: jsonb("line_items").notNull(),
    totalUsdCents: integer("total_usd_cents").notNull(),
    /** Hold ids this quote priced (for the confirm saga). */
    holdIds: jsonb("hold_ids").notNull().default(sql`'[]'::jsonb`),
    ...timestamps,
  },
  (t) => ({
    tripIdx: index("quotes_trip_idx").on(t.tripId),
  })
);

// ── bookings ─────────────────────────────────────────────────
export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, { onDelete: "cascade" }),
    quoteId: uuid("quote_id").references(() => quotes.id, {
      onDelete: "set null",
    }),
    state: bookingStateEnum("state").notNull().default("draft"),
    totalUsdCents: integer("total_usd_cents").notNull().default(0),
    ...timestamps,
  },
  (t) => ({
    tripIdx: index("bookings_trip_idx").on(t.tripId),
  })
);

// ── booking_items ────────────────────────────────────────────
export const bookingItems = pgTable(
  "booking_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    itemType: holdItemTypeEnum("item_type").notNull(),
    refId: uuid("ref_id").notNull(),
    holdId: uuid("hold_id").references(() => holds.id, { onDelete: "set null" }),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    priceUsdCents: integer("price_usd_cents").notNull(),
    state: bookingStateEnum("state").notNull().default("confirmed"),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    bookingIdx: index("booking_items_booking_idx").on(t.bookingId),
  })
);

// ── booking_events (append-only ledger) ──────────────────────
export const bookingEvents = pgTable(
  "booking_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // saga_start, item_reserved, compensate, confirmed, ...
    data: jsonb("data"),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    bookingIdx: index("booking_events_booking_idx").on(t.bookingId, t.createdAt),
  })
);

// ── payments ─────────────────────────────────────────────────
export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(), // "mock" | "stripe" | "payhere"
    providerRef: text("provider_ref"),
    amountUsdCents: integer("amount_usd_cents").notNull(),
    status: paymentStatusEnum("status").notNull().default("pending"),
    raw: jsonb("raw"),
    ...timestamps,
  },
  (t) => ({
    bookingIdx: index("payments_booking_idx").on(t.bookingId),
  })
);

// ── imported_bookings ────────────────────────────────────────
export const importedBookings = pgTable(
  "imported_bookings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id").references(() => conversations.id, {
      onDelete: "set null",
    }),
    source: text("source").notNull().default("email"),
    raw: text("raw").notNull(),
    parsed: jsonb("parsed"),
    confidence: doublePrecision("confidence"),
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    convIdx: index("imported_bookings_conversation_idx").on(t.conversationId),
  })
);

// ── knowledge_chunks ─────────────────────────────────────────
export const knowledgeChunks = pgTable(
  "knowledge_chunks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title"),
    content: text("content").notNull(),
    embedding: vector("embedding"),
    createdAt: timestamps.createdAt,
  }
);

// ── ops_tasks ────────────────────────────────────────────────
export const opsTasks = pgTable(
  "ops_tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    reason: text("reason").notNull(),
    status: opsTaskStatusEnum("status").notNull().default("open"),
    ...timestamps,
  },
  (t) => ({
    statusIdx: index("ops_tasks_status_idx").on(t.status),
  })
);

// ── contact_requests (book-a-call fallback form) ─────────────
export const contactRequests = pgTable("contact_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  preferredTime: text("preferred_time"),
  createdAt: timestamps.createdAt,
});

export type DbSchema = {
  users: typeof users;
  conversations: typeof conversations;
  messages: typeof messages;
};
