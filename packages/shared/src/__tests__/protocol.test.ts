import { describe, it, expect } from "vitest";
import {
  encodeSSE,
  decodeSSE,
  StreamEvent,
  parseComponentProps,
  toolSchemas,
  ParsedBooking,
} from "../index.js";

describe("SSE protocol v1", () => {
  it("round-trips a token event", () => {
    const evt: StreamEvent = { type: "token", text: "hello" };
    const frame = encodeSSE(evt);
    expect(frame.startsWith("data: ")).toBe(true);
    const data = frame.slice("data: ".length).trim();
    expect(decodeSSE(data)).toEqual(evt);
  });

  it("validates a component event's discriminated shape", () => {
    const evt: StreamEvent = {
      type: "component",
      id: "cmp_1",
      name: "SignupCard",
      props: { stage: "email" },
    };
    expect(() => decodeSSE(encodeSSE(evt).slice(6).trim())).not.toThrow();
  });

  it("rejects an unknown event type", () => {
    expect(() => StreamEvent.parse({ type: "nope" })).toThrow();
  });
});

describe("component props validation", () => {
  it("parses valid HotelPicker props", () => {
    const props = parseComponentProps("HotelPicker", {
      checkIn: "2026-08-01",
      checkOut: "2026-08-04",
      guests: 2,
      hotels: [],
    });
    expect(props.guests).toBe(2);
  });

  it("rejects HotelPicker with a bad date", () => {
    expect(() =>
      parseComponentProps("HotelPicker", {
        checkIn: "08/01/2026",
        checkOut: "2026-08-04",
        guests: 2,
        hotels: [],
      })
    ).toThrow();
  });

  it("caps HotelPicker at 5 hotels", () => {
    const hotel = {
      hotelId: "00000000-0000-0000-0000-000000000000",
      name: "X",
      region: "Galle",
      rating: 4,
      nightlyRate: { usdMinor: 1000, lkrMinor: 305000, fxUsdToLkr: 305 },
      cancellationPolicy: "free",
      vibeTags: [],
    };
    expect(() =>
      parseComponentProps("HotelPicker", {
        checkIn: "2026-08-01",
        checkOut: "2026-08-04",
        guests: 2,
        hotels: Array(6).fill(hotel),
      })
    ).toThrow();
  });
});

describe("tool schemas", () => {
  it("search_hotels input requires a region", () => {
    expect(() => toolSchemas.search_hotels.input.parse({ checkIn: "2026-08-01", checkOut: "2026-08-02", guests: 2 })).toThrow();
  });

  it("ParsedBooking defaults empty arrays", () => {
    const parsed = ParsedBooking.parse({ confidence: 0.9 });
    expect(parsed.flights).toEqual([]);
    expect(parsed.hotels).toEqual([]);
  });
});
