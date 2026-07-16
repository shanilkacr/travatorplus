import { z } from "zod";

/** ISO date (YYYY-MM-DD) — trip/booking dates are date-only. */
export const IsoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");
export type IsoDate = z.infer<typeof IsoDate>;

/** ISO datetime string. */
export const IsoDateTime = z.string().datetime({ offset: true });

/** Money is always stored/priced in integer minor units to avoid float drift. */
export const Money = z.object({
  /** Integer amount in minor units (USD cents). */
  amountMinor: z.number().int(),
  currency: z.literal("USD"),
});
export type Money = z.infer<typeof Money>;

/** A displayable price: canonical USD plus a derived LKR display value. */
export const PriceDisplay = z.object({
  usdMinor: z.number().int(),
  lkrMinor: z.number().int(),
  /** FX rate used for the LKR conversion (USD -> LKR), for auditability. */
  fxUsdToLkr: z.number().positive(),
});
export type PriceDisplay = z.infer<typeof PriceDisplay>;

/** Sri Lanka regions we hold inventory for. */
export const Region = z.enum([
  "Colombo",
  "Kandy",
  "Ella",
  "Sigiriya",
  "Galle",
  "Mirissa",
  "Nuwara Eliya",
  "Arugam Bay",
  "Trincomalee",
  "Anuradhapura",
  "Yala",
]);
export type Region = z.infer<typeof Region>;

export const VehicleType = z.enum(["sedan", "suv", "van", "minibus"]);
export type VehicleType = z.infer<typeof VehicleType>;

export const ConversationMode = z.enum(["ai", "human"]);
export type ConversationMode = z.infer<typeof ConversationMode>;

export const BookingState = z.enum([
  "draft",
  "quoted",
  "pending_payment",
  "confirmed",
  "cancelled",
]);
export type BookingState = z.infer<typeof BookingState>;

export const HoldItemType = z.enum(["hotel", "driver"]);
export type HoldItemType = z.infer<typeof HoldItemType>;

export const uuid = () => z.string().uuid();
