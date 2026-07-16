import { z } from "zod";
import { IsoDate, PriceDisplay, Region, VehicleType, BookingState } from "../common.js";

/**
 * In-chat components. Each `component` SSE event carries a `name` and `props`;
 * props are validated by the matching Zod schema here so web and api can never
 * disagree on shape. Interactions post back { componentId, action, payload }.
 */

export const ComponentName = z.enum([
  "SignupCard",
  "ItineraryBuilder",
  "HotelPicker",
  "DriverBookingCard",
  "BookingSummary",
  "PaymentStatus",
]);
export type ComponentName = z.infer<typeof ComponentName>;

// ── SignupCard ───────────────────────────────────────────────
export const SignupCardProps = z.object({
  /** "email" = ask for email; "otp" = email known, ask for the 6-digit code. */
  stage: z.enum(["email", "otp"]).default("email"),
  email: z.string().email().optional(),
  reason: z.string().optional(), // why identity is needed, shown to user
});
export type SignupCardProps = z.infer<typeof SignupCardProps>;

// ── ItineraryBuilder ─────────────────────────────────────────
export const ItineraryStop = z.object({
  id: z.string(),
  title: z.string(),
  region: Region.optional(),
  note: z.string().optional(),
  /** Fixed anchor from an imported flight/hotel — user cannot remove. */
  locked: z.boolean().default(false),
});
export type ItineraryStop = z.infer<typeof ItineraryStop>;

export const ItineraryDay = z.object({
  date: IsoDate,
  region: Region,
  stops: z.array(ItineraryStop),
  hotelId: z.string().uuid().nullable().optional(),
  hotelName: z.string().optional(),
  driverId: z.string().uuid().nullable().optional(),
  driverName: z.string().optional(),
});
export type ItineraryDay = z.infer<typeof ItineraryDay>;

export const ItineraryBuilderProps = z.object({
  tripId: z.string().uuid(),
  itineraryId: z.string().uuid().optional(),
  title: z.string().default("Your Sri Lanka itinerary"),
  days: z.array(ItineraryDay),
});
export type ItineraryBuilderProps = z.infer<typeof ItineraryBuilderProps>;

// ── HotelPicker ──────────────────────────────────────────────
export const HotelCard = z.object({
  hotelId: z.string().uuid(),
  name: z.string(),
  region: Region,
  rating: z.number().min(0).max(5),
  nightlyRate: PriceDisplay,
  cancellationPolicy: z.string(),
  vibeTags: z.array(z.string()).default([]),
  photoUrl: z.string().optional(), // placeholder allowed
});
export type HotelCard = z.infer<typeof HotelCard>;

export const HotelPickerProps = z.object({
  checkIn: IsoDate,
  checkOut: IsoDate,
  guests: z.number().int().positive(),
  hotels: z.array(HotelCard).max(5),
});
export type HotelPickerProps = z.infer<typeof HotelPickerProps>;

// ── DriverBookingCard ────────────────────────────────────────
export const DriverCard = z.object({
  driverId: z.string().uuid(),
  name: z.string(),
  vehicleType: VehicleType,
  vehicleDescription: z.string(),
  languages: z.array(z.string()),
  rating: z.number().min(0).max(5),
  dayRate: PriceDisplay,
  regions: z.array(Region),
});
export type DriverCard = z.infer<typeof DriverCard>;

export const DriverBookingCardProps = z.object({
  startDate: IsoDate,
  endDate: IsoDate,
  drivers: z.array(DriverCard),
});
export type DriverBookingCardProps = z.infer<typeof DriverBookingCardProps>;

// ── BookingSummary ───────────────────────────────────────────
export const QuoteLineItem = z.object({
  label: z.string(),
  itemType: z.enum(["hotel", "driver"]),
  refId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitLabel: z.string(), // e.g. "3 nights", "5 days"
  price: PriceDisplay,
});
export type QuoteLineItem = z.infer<typeof QuoteLineItem>;

export const BookingSummaryProps = z.object({
  quoteId: z.string().uuid(),
  tripId: z.string().uuid(),
  lineItems: z.array(QuoteLineItem),
  total: PriceDisplay,
  termsUrl: z.string().default("/terms"),
});
export type BookingSummaryProps = z.infer<typeof BookingSummaryProps>;

// ── PaymentStatus ────────────────────────────────────────────
export const PaymentStatusProps = z.object({
  bookingId: z.string().uuid(),
  paymentId: z.string().uuid(),
  status: z.enum(["pending", "processing", "succeeded", "failed"]),
  bookingState: BookingState,
  total: PriceDisplay,
  message: z.string().optional(),
});
export type PaymentStatusProps = z.infer<typeof PaymentStatusProps>;

// ── Discriminated registry ───────────────────────────────────
/** Map component name -> props schema for runtime validation of `component` events. */
export const componentPropsSchemas = {
  SignupCard: SignupCardProps,
  ItineraryBuilder: ItineraryBuilderProps,
  HotelPicker: HotelPickerProps,
  DriverBookingCard: DriverBookingCardProps,
  BookingSummary: BookingSummaryProps,
  PaymentStatus: PaymentStatusProps,
} as const satisfies Record<ComponentName, z.ZodTypeAny>;

export type ComponentPropsMap = {
  SignupCard: SignupCardProps;
  ItineraryBuilder: ItineraryBuilderProps;
  HotelPicker: HotelPickerProps;
  DriverBookingCard: DriverBookingCardProps;
  BookingSummary: BookingSummaryProps;
  PaymentStatus: PaymentStatusProps;
};

/** Validate a (name, props) pair against its schema. Throws on mismatch. */
export function parseComponentProps<N extends ComponentName>(
  name: N,
  props: unknown
): ComponentPropsMap[N] {
  return componentPropsSchemas[name].parse(props) as ComponentPropsMap[N];
}

// ── Interaction payloads (component -> agent) ────────────────
export const InteractionAction = z.enum([
  "signup_submit_email",
  "signup_submit_otp",
  "itinerary_edit",
  "hotel_select",
  "driver_request",
  "booking_confirm",
  "booking_cancel",
]);
export type InteractionAction = z.infer<typeof InteractionAction>;

export const InteractionRequest = z.object({
  componentId: z.string(),
  action: InteractionAction,
  payload: z.unknown(),
});
export type InteractionRequest = z.infer<typeof InteractionRequest>;
