import type {
  ItineraryDay,
  QuoteLineItem,
} from "@travator/shared";

/**
 * Representative trip data for the planner UI.
 *
 * Shapes match the shared contracts so wiring the real agent loop is a data
 * swap, not a rewrite. Replace with API responses in milestone 5.
 */

export const DEMO_TRIP = {
  title: "Sri Lanka — south coast & hill country",
  travelers: 2,
  startDate: "2026-08-14",
  endDate: "2026-08-21",
  nights: 7,
};

const fx = 322.5;
const price = (usd: number) => ({
  usdMinor: Math.round(usd * 100),
  lkrMinor: Math.round(usd * fx * 100),
  fxUsdToLkr: fx,
});

export const DEMO_DAYS: ItineraryDay[] = [
  {
    date: "2026-08-14",
    region: "Colombo",
    hotelName: "Cinnamon Grand",
    driverName: "Nuwan P.",
    stops: [
      { id: "d1s1", title: "Airport pickup", locked: true },
      { id: "d1s2", title: "Gangaramaya Temple", locked: false },
      { id: "d1s3", title: "Galle Face sunset", locked: false },
    ],
  },
  {
    date: "2026-08-15",
    region: "Sigiriya",
    hotelName: "Water Garden Sigiriya",
    driverName: "Nuwan P.",
    stops: [
      { id: "d2s1", title: "Drive north — 4h", locked: false },
      { id: "d2s2", title: "Dambulla cave temples", locked: false },
    ],
  },
  {
    date: "2026-08-16",
    region: "Sigiriya",
    hotelName: "Water Garden Sigiriya",
    driverName: "Nuwan P.",
    stops: [
      { id: "d3s1", title: "Dawn climb — Lion Rock", locked: false },
      { id: "d3s2", title: "Kaudulla safari", locked: false },
    ],
  },
  {
    date: "2026-08-17",
    region: "Kandy",
    hotelName: "The Kandy House",
    driverName: "Nuwan P.",
    stops: [
      { id: "d4s1", title: "Spice garden en route", locked: false },
      { id: "d4s2", title: "Temple of the Tooth", locked: false },
    ],
  },
  {
    date: "2026-08-18",
    region: "Ella",
    hotelName: "98 Acres Resort",
    driverName: "Nuwan P.",
    stops: [
      { id: "d5s1", title: "Hill-country train", locked: false },
      { id: "d5s2", title: "Nine Arch Bridge", locked: false },
    ],
  },
  {
    date: "2026-08-19",
    region: "Mirissa",
    hotelName: "Cape Weligama",
    driverName: "Nuwan P.",
    stops: [
      { id: "d6s1", title: "Descend to the coast", locked: false },
      { id: "d6s2", title: "Quiet swimming bay", locked: false },
    ],
  },
  {
    date: "2026-08-20",
    region: "Mirissa",
    hotelName: "Cape Weligama",
    driverName: "Nuwan P.",
    stops: [{ id: "d7s1", title: "Whale watching — dawn", locked: false }],
  },
];

export const DEMO_LINE_ITEMS: (QuoteLineItem & { id: string })[] = [
  {
    id: "li1",
    label: "Cinnamon Grand, Colombo",
    itemType: "hotel",
    refId: "00000000-0000-4000-8000-000000000001",
    quantity: 1,
    unitLabel: "1 night",
    price: price(140),
  },
  {
    id: "li2",
    label: "Water Garden Sigiriya",
    itemType: "hotel",
    refId: "00000000-0000-4000-8000-000000000002",
    quantity: 2,
    unitLabel: "2 nights",
    price: price(360),
  },
  {
    id: "li3",
    label: "The Kandy House",
    itemType: "hotel",
    refId: "00000000-0000-4000-8000-000000000003",
    quantity: 1,
    unitLabel: "1 night",
    price: price(190),
  },
  {
    id: "li4",
    label: "98 Acres Resort, Ella",
    itemType: "hotel",
    refId: "00000000-0000-4000-8000-000000000004",
    quantity: 1,
    unitLabel: "1 night",
    price: price(155),
  },
  {
    id: "li5",
    label: "Cape Weligama, south coast",
    itemType: "hotel",
    refId: "00000000-0000-4000-8000-000000000005",
    quantity: 2,
    unitLabel: "2 nights",
    price: price(640),
  },
  {
    id: "li6",
    label: "Private driver-guide — Nuwan P.",
    itemType: "driver",
    refId: "00000000-0000-4000-8000-000000000006",
    quantity: 7,
    unitLabel: "7 days",
    price: price(455),
  },
];

/** Travelers who opted in to sharing this route. */
export const DEMO_BUDDIES = [
  {
    id: "b1",
    name: "Hannah & Tom",
    from: "United Kingdom",
    overlap: "14–19 Aug",
    regions: ["Sigiriya", "Kandy"],
    note: "Happy to split a driver for the northern leg.",
  },
  {
    id: "b2",
    name: "Priya S.",
    from: "Singapore",
    overlap: "17–21 Aug",
    regions: ["Ella", "Mirissa"],
    note: "Looking for someone to share the whale-watching boat.",
  },
  {
    id: "b3",
    name: "Marco & Elena",
    from: "Italy",
    overlap: "18–22 Aug",
    regions: ["Mirissa"],
    note: "Renting a villa — two rooms spare.",
  },
];

export const DEMO_EXPLORE = [
  {
    id: "e1",
    tag: "#sigiriya",
    posts: "184k",
    blurb: "Dawn climbs beat the heat and the crowds — gates open 07:00.",
    region: "Sigiriya",
  },
  {
    id: "e2",
    tag: "#ellarock",
    posts: "92k",
    blurb: "The Nine Arch train passes at 06:20, 09:30 and 15:15.",
    region: "Ella",
  },
  {
    id: "e3",
    tag: "#mirissabeach",
    posts: "310k",
    blurb: "Whale season on the south coast runs November to April.",
    region: "Mirissa",
  },
  {
    id: "e4",
    tag: "#gallefort",
    posts: "271k",
    blurb: "Ramparts at golden hour, then dinner inside the walls.",
    region: "Galle",
  },
];
