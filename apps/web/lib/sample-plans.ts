import type { ItineraryDay, QuoteLineItem } from "@travator/shared";
import { SRI_LANKA_IMAGES } from "@/lib/images";
import type { SriLankaImageMeta } from "@/lib/images";
import { DEMO_DAYS, DEMO_LINE_ITEMS, DEMO_TRIP } from "@/lib/demo-trip";

export type SamplePlan = {
  slug: string;
  title: string;
  days: string;
  route: string;
  note: string;
  image: SriLankaImageMeta;
};

export type SamplePlanPreset = {
  slug: string;
  assistantReply: string;
  trip: {
    title: string;
    travelers: number;
    startDate: string;
    endDate: string;
    nights: number;
  };
  days: ItineraryDay[];
  lineItems: (QuoteLineItem & { id: string })[];
};

const fx = 322.5;
const price = (usd: number) => ({
  usdMinor: Math.round(usd * 100),
  lkrMinor: Math.round(usd * fx * 100),
  fxUsdToLkr: fx,
});

export const SAMPLE_PLANS: SamplePlan[] = [
  {
    slug: "first-timer-loop",
    title: "The first-timer loop",
    days: "7 days",
    route: "Sigiriya → Kandy → Ella → Mirissa",
    note: "The classic circle: rock fortress at dawn, the hill-country train, a beach finish.",
    image: SRI_LANKA_IMAGES.hero,
  },
  {
    slug: "honeymoon-south-coast",
    title: "Honeymoon, south coast",
    days: "6 days",
    route: "Galle Fort → Weligama → Mirissa",
    note: "Clifftop stays, quiet bays, whales at sunrise and ramparts at golden hour.",
    image: SRI_LANKA_IMAGES.southCoast,
  },
  {
    slug: "tea-country",
    title: "Tea country slow week",
    days: "8 days",
    route: "Kandy → Nuwara Eliya → Ella",
    note: "Misty mornings, estate walks, and the world's most scenic train ride.",
    image: SRI_LANKA_IMAGES.teaPicker,
  },
  {
    slug: "east-coast-surf",
    title: "East coast surf trip",
    days: "9 days",
    route: "Trincomalee → Arugam Bay",
    note: "May to September, when the east is glassy and the point breaks work.",
    image: SRI_LANKA_IMAGES.lagoon,
  },
  {
    slug: "family-wild",
    title: "Family wild week",
    days: "8 days",
    route: "Sigiriya → Kandy → Yala",
    note: "Elephants at Minneriya, leopards at Yala, and pools at every stop.",
    image: SRI_LANKA_IMAGES.wildlife,
  },
];

const PRESETS: Record<string, SamplePlanPreset> = {
  "first-timer-loop": {
    slug: "first-timer-loop",
    assistantReply:
      "Good shape for a week. I've drafted a route that keeps the driving sensible — two nights at Sigiriya so you get a dawn climb without a rushed morning, then Kandy, the hill-country train down to Ella, and a soft landing on the south coast. The planner on the right has the day-by-day and a running cost. Tell me what to change.",
    trip: DEMO_TRIP,
    days: DEMO_DAYS,
    lineItems: DEMO_LINE_ITEMS,
  },
  "honeymoon-south-coast": {
    slug: "honeymoon-south-coast",
    assistantReply:
      "I've shaped a six-day south-coast honeymoon — Galle Fort for your first nights inside the ramparts, then Weligama for clifftop views, and Mirissa to finish with whales at dawn. Driving stays light and every stay has a pool. The planner is ready on the right.",
    trip: {
      title: "Honeymoon — Galle to Mirissa",
      travelers: 2,
      startDate: "2026-09-04",
      endDate: "2026-09-10",
      nights: 6,
    },
    days: [
      {
        date: "2026-09-04",
        region: "Galle",
        hotelName: "Fort Bazaar",
        driverName: "Nuwan P.",
        stops: [
          { id: "h1s1", title: "Airport pickup", locked: true },
          { id: "h1s2", title: "Ramparts at golden hour", locked: false },
        ],
      },
      {
        date: "2026-09-05",
        region: "Galle",
        hotelName: "Fort Bazaar",
        driverName: "Nuwan P.",
        stops: [{ id: "h2s1", title: "Courtyard brunch & boutique browsing", locked: false }],
      },
      {
        date: "2026-09-06",
        region: "Mirissa",
        hotelName: "Cape Weligama",
        driverName: "Nuwan P.",
        stops: [{ id: "h3s1", title: "Scenic drive along the coast", locked: false }],
      },
      {
        date: "2026-09-07",
        region: "Mirissa",
        hotelName: "Cape Weligama",
        driverName: "Nuwan P.",
        stops: [{ id: "h4s1", title: "Clifftop sunset & spa afternoon", locked: false }],
      },
      {
        date: "2026-09-08",
        region: "Mirissa",
        hotelName: "Mirissa Beach Villa",
        driverName: "Nuwan P.",
        stops: [{ id: "h5s1", title: "Quiet bay swim", locked: false }],
      },
      {
        date: "2026-09-09",
        region: "Mirissa",
        hotelName: "Mirissa Beach Villa",
        driverName: "Nuwan P.",
        stops: [{ id: "h6s1", title: "Whale watching — dawn", locked: false }],
      },
    ],
    lineItems: [
      {
        id: "hli1",
        label: "Fort Bazaar, Galle",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000011",
        quantity: 2,
        unitLabel: "2 nights",
        price: price(330),
      },
      {
        id: "hli2",
        label: "Cape Weligama",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000012",
        quantity: 2,
        unitLabel: "2 nights",
        price: price(640),
      },
      {
        id: "hli3",
        label: "Mirissa Beach Villa",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000013",
        quantity: 2,
        unitLabel: "2 nights",
        price: price(120),
      },
      {
        id: "hli4",
        label: "Private driver-guide — Nuwan P.",
        itemType: "driver",
        refId: "00000000-0000-4000-8000-000000000014",
        quantity: 6,
        unitLabel: "6 days",
        price: price(390),
      },
    ],
  },
  "tea-country": {
    slug: "tea-country",
    assistantReply:
      "An eight-day hill-country week — Kandy first, then two slow nights in Nuwara Eliya among the estates, and Ella for the train and the views. I've kept the drives short and left unhurried mornings. Your day-by-day plan and quote are in the planner.",
    trip: {
      title: "Tea country — Kandy to Ella",
      travelers: 2,
      startDate: "2026-02-10",
      endDate: "2026-02-18",
      nights: 8,
    },
    days: [
      {
        date: "2026-02-10",
        region: "Kandy",
        hotelName: "The Kandy House",
        driverName: "Nuwan P.",
        stops: [
          { id: "t1s1", title: "Airport pickup", locked: true },
          { id: "t1s2", title: "Temple of the Tooth", locked: false },
        ],
      },
      {
        date: "2026-02-11",
        region: "Kandy",
        hotelName: "The Kandy House",
        driverName: "Nuwan P.",
        stops: [{ id: "t2s1", title: "Botanical gardens & lake walk", locked: false }],
      },
      {
        date: "2026-02-12",
        region: "Nuwara Eliya",
        hotelName: "Jetwing St. Andrew's",
        driverName: "Nuwan P.",
        stops: [{ id: "t3s1", title: "Tea estate visit en route", locked: false }],
      },
      {
        date: "2026-02-13",
        region: "Nuwara Eliya",
        hotelName: "Jetwing St. Andrew's",
        driverName: "Nuwan P.",
        stops: [{ id: "t4s1", title: "Estate walk & misty morning", locked: false }],
      },
      {
        date: "2026-02-14",
        region: "Ella",
        hotelName: "98 Acres Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "t5s1", title: "Scenic train to Ella", locked: false }],
      },
      {
        date: "2026-02-15",
        region: "Ella",
        hotelName: "98 Acres Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "t6s1", title: "Nine Arch Bridge", locked: false }],
      },
      {
        date: "2026-02-16",
        region: "Ella",
        hotelName: "98 Acres Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "t7s1", title: "Little Adam's Peak", locked: false }],
      },
      {
        date: "2026-02-17",
        region: "Ella",
        hotelName: "98 Acres Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "t8s1", title: "Slow morning & departure", locked: false }],
      },
    ],
    lineItems: [
      {
        id: "tli1",
        label: "The Kandy House",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000021",
        quantity: 2,
        unitLabel: "2 nights",
        price: price(380),
      },
      {
        id: "tli2",
        label: "Jetwing St. Andrew's, Nuwara Eliya",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000022",
        quantity: 2,
        unitLabel: "2 nights",
        price: price(280),
      },
      {
        id: "tli3",
        label: "98 Acres Resort, Ella",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000023",
        quantity: 4,
        unitLabel: "4 nights",
        price: price(620),
      },
      {
        id: "tli4",
        label: "Private driver-guide — Nuwan P.",
        itemType: "driver",
        refId: "00000000-0000-4000-8000-000000000024",
        quantity: 8,
        unitLabel: "8 days",
        price: price(520),
      },
    ],
  },
  "east-coast-surf": {
    slug: "east-coast-surf",
    assistantReply:
      "East coast surf season — Trincomalee first for glassy mornings and quiet bays, then Arugam Bay for the point breaks. I've routed you for May–September when the east is at its best. The full plan and estimate are ready in the planner.",
    trip: {
      title: "East coast surf — Trinco to Arugam Bay",
      travelers: 2,
      startDate: "2026-06-08",
      endDate: "2026-06-17",
      nights: 9,
    },
    days: [
      {
        date: "2026-06-08",
        region: "Trincomalee",
        hotelName: "Jungle Beach Resort",
        driverName: "Nuwan P.",
        stops: [
          { id: "e1s1", title: "Airport pickup", locked: true },
          { id: "e1s2", title: "Nilaveli swim", locked: false },
        ],
      },
      {
        date: "2026-06-09",
        region: "Trincomalee",
        hotelName: "Jungle Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e2s1", title: "Dawn surf & snorkel", locked: false }],
      },
      {
        date: "2026-06-10",
        region: "Trincomalee",
        hotelName: "Jungle Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e3s1", title: "Pigeon Island boat trip", locked: false }],
      },
      {
        date: "2026-06-11",
        region: "Arugam Bay",
        hotelName: "The Long Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e4s1", title: "Coastal drive south", locked: false }],
      },
      {
        date: "2026-06-12",
        region: "Arugam Bay",
        hotelName: "The Long Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e5s1", title: "Main Point session", locked: false }],
      },
      {
        date: "2026-06-13",
        region: "Arugam Bay",
        hotelName: "The Long Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e6s1", title: "Whiskey Point dawn", locked: false }],
      },
      {
        date: "2026-06-14",
        region: "Arugam Bay",
        hotelName: "The Long Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e7s1", title: "Free surf day", locked: false }],
      },
      {
        date: "2026-06-15",
        region: "Arugam Bay",
        hotelName: "The Long Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e8s1", title: "Lagoon paddle", locked: false }],
      },
      {
        date: "2026-06-16",
        region: "Arugam Bay",
        hotelName: "The Long Beach Resort",
        driverName: "Nuwan P.",
        stops: [{ id: "e9s1", title: "Final surf & departure", locked: false }],
      },
    ],
    lineItems: [
      {
        id: "eli1",
        label: "Jungle Beach Resort, Trincomalee",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000031",
        quantity: 3,
        unitLabel: "3 nights",
        price: price(360),
      },
      {
        id: "eli2",
        label: "The Long Beach Resort, Arugam Bay",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000032",
        quantity: 6,
        unitLabel: "6 nights",
        price: price(540),
      },
      {
        id: "eli3",
        label: "Private driver-guide — Nuwan P.",
        itemType: "driver",
        refId: "00000000-0000-4000-8000-000000000033",
        quantity: 9,
        unitLabel: "9 days",
        price: price(585),
      },
    ],
  },
  "family-wild": {
    slug: "family-wild",
    assistantReply:
      "Family-friendly wild week — Sigiriya and Minneriya for elephants, Kandy for a breather, then Yala for leopards. Every stop has a pool and the drives stay kid-tolerable. The planner has your day-by-day and a running total.",
    trip: {
      title: "Family wild week — Sigiriya to Yala",
      travelers: 4,
      startDate: "2026-07-20",
      endDate: "2026-07-28",
      nights: 8,
    },
    days: [
      {
        date: "2026-07-20",
        region: "Sigiriya",
        hotelName: "Water Garden Sigiriya",
        driverName: "Nuwan P.",
        stops: [
          { id: "f1s1", title: "Airport pickup", locked: true },
          { id: "f1s2", title: "Pool afternoon", locked: false },
        ],
      },
      {
        date: "2026-07-21",
        region: "Sigiriya",
        hotelName: "Water Garden Sigiriya",
        driverName: "Nuwan P.",
        stops: [{ id: "f2s1", title: "Dawn Lion Rock climb", locked: false }],
      },
      {
        date: "2026-07-22",
        region: "Sigiriya",
        hotelName: "Water Garden Sigiriya",
        driverName: "Nuwan P.",
        stops: [{ id: "f3s1", title: "Minneriya elephant gathering", locked: false }],
      },
      {
        date: "2026-07-23",
        region: "Kandy",
        hotelName: "The Kandy House",
        driverName: "Nuwan P.",
        stops: [{ id: "f4s1", title: "Spice garden en route", locked: false }],
      },
      {
        date: "2026-07-24",
        region: "Kandy",
        hotelName: "The Kandy House",
        driverName: "Nuwan P.",
        stops: [{ id: "f5s1", title: "Botanical gardens", locked: false }],
      },
      {
        date: "2026-07-25",
        region: "Yala",
        hotelName: "Chena Huts",
        driverName: "Nuwan P.",
        stops: [{ id: "f6s1", title: "Afternoon safari", locked: false }],
      },
      {
        date: "2026-07-26",
        region: "Yala",
        hotelName: "Chena Huts",
        driverName: "Nuwan P.",
        stops: [{ id: "f7s1", title: "Dawn leopard safari", locked: false }],
      },
      {
        date: "2026-07-27",
        region: "Yala",
        hotelName: "Chena Huts",
        driverName: "Nuwan P.",
        stops: [{ id: "f8s1", title: "Beach time & departure", locked: false }],
      },
    ],
    lineItems: [
      {
        id: "fli1",
        label: "Water Garden Sigiriya",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000041",
        quantity: 3,
        unitLabel: "3 nights",
        price: price(540),
      },
      {
        id: "fli2",
        label: "The Kandy House",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000042",
        quantity: 2,
        unitLabel: "2 nights",
        price: price(380),
      },
      {
        id: "fli3",
        label: "Chena Huts, Yala",
        itemType: "hotel",
        refId: "00000000-0000-4000-8000-000000000043",
        quantity: 3,
        unitLabel: "3 nights",
        price: price(960),
      },
      {
        id: "fli4",
        label: "Private driver-guide — Nuwan P.",
        itemType: "driver",
        refId: "00000000-0000-4000-8000-000000000044",
        quantity: 8,
        unitLabel: "8 days",
        price: price(520),
      },
    ],
  },
};

export function planToPrompt(plan: SamplePlan): string {
  return `Plan me ${plan.title.toLowerCase()}: ${plan.route}. ${plan.note}`;
}

export function planToChatHref(plan: SamplePlan): string {
  const params = new URLSearchParams({
    prompt: planToPrompt(plan),
    preset: plan.slug,
  });
  return `/chat?${params.toString()}`;
}

export function getSamplePlanPreset(slug: string | undefined): SamplePlanPreset | null {
  if (!slug) return null;
  return PRESETS[slug] ?? null;
}
