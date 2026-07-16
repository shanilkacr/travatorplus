/**
 * Realistic Sri Lanka seed inventory. Rates in USD cents. Geography and driving
 * facts are accurate (see knowledge chunks). Photos are placeholders.
 */

export interface SeedHotel {
  name: string;
  region: string;
  description: string;
  rating: number;
  cancellationPolicy: string;
  vibeTags: string[];
  capacity: number;
  nightlyRateUsdCents: number;
}

export const hotels: SeedHotel[] = [
  {
    name: "Cinnamon Grand Colombo",
    region: "Colombo",
    description:
      "Polished city hotel in the heart of Colombo, walking distance to Galle Face Green. Rooftop pool, business-friendly, strong for a first or last night before flights.",
    rating: 4.4,
    cancellationPolicy: "Free cancellation up to 24h before check-in.",
    vibeTags: ["city", "business", "central", "pool"],
    capacity: 3,
    nightlyRateUsdCents: 12000,
  },
  {
    name: "Casa Colombo Boutique",
    region: "Colombo",
    description:
      "Restored Moorish mansion turned design hotel with just a handful of suites. Quiet, arty, and intimate — a calm base away from traffic.",
    rating: 4.5,
    cancellationPolicy: "Free cancellation up to 48h before check-in.",
    vibeTags: ["boutique", "quiet", "design", "adults"],
    capacity: 2,
    nightlyRateUsdCents: 14500,
  },
  {
    name: "The Kandy House",
    region: "Kandy",
    description:
      "A 19th-century manor set in paddy fields outside Kandy. Antique-filled, serene, infinity pool over the valley. Ideal for a slow hill-country night near the Temple of the Tooth.",
    rating: 4.7,
    cancellationPolicy: "Free cancellation up to 72h before check-in.",
    vibeTags: ["heritage", "quiet", "nature", "colonial", "pool"],
    capacity: 2,
    nightlyRateUsdCents: 19000,
  },
  {
    name: "Theva Residency Kandy",
    region: "Kandy",
    description:
      "Contemporary hillside hotel above Kandy with panoramic views and an infinity pool. Comfortable, modern, and good value for exploring the cultural triangle gateway.",
    rating: 4.3,
    cancellationPolicy: "Free cancellation up to 48h before check-in.",
    vibeTags: ["views", "modern", "value", "pool"],
    capacity: 3,
    nightlyRateUsdCents: 9500,
  },
  {
    name: "98 Acres Resort & Spa",
    region: "Ella",
    description:
      "Eco-luxury chalets built on a former tea estate with a direct view of Little Adam's Peak. Famous infinity pool, walking access to hikes and the Nine Arch Bridge.",
    rating: 4.6,
    cancellationPolicy: "Free cancellation up to 72h before check-in.",
    vibeTags: ["nature", "tea", "views", "hiking", "eco", "pool"],
    capacity: 3,
    nightlyRateUsdCents: 15500,
  },
  {
    name: "Ella Mount Heaven",
    region: "Ella",
    description:
      "Simple, friendly guesthouse-style rooms with valley views, an easy walk from Ella town. Great budget nature base for the Ella–Kandy scenic train.",
    rating: 4.2,
    cancellationPolicy: "Free cancellation up to 24h before check-in.",
    vibeTags: ["budget", "nature", "views", "friendly"],
    capacity: 3,
    nightlyRateUsdCents: 5500,
  },
  {
    name: "Water Garden Sigiriya",
    region: "Sigiriya",
    description:
      "Private villas threaded through lily ponds and moats with Sigiriya Rock framed in the distance. Lush, quiet, and perfectly placed for a dawn climb.",
    rating: 4.7,
    cancellationPolicy: "Free cancellation up to 72h before check-in.",
    vibeTags: ["nature", "quiet", "luxury", "villas", "pool"],
    capacity: 3,
    nightlyRateUsdCents: 18000,
  },
  {
    name: "Aliya Resort & Spa",
    region: "Sigiriya",
    description:
      "Resort with an iconic infinity pool aligned to both Sigiriya and Pidurangala rocks. Family-friendly, spacious grounds, central for the cultural triangle.",
    rating: 4.4,
    cancellationPolicy: "Free cancellation up to 48h before check-in.",
    vibeTags: ["family", "views", "pool", "resort"],
    capacity: 4,
    nightlyRateUsdCents: 11000,
  },
  {
    name: "Amangalla Galle",
    region: "Galle",
    description:
      "Grand heritage hotel inside Galle Fort's ramparts, once the New Oriental. Colonial grandeur, high ceilings, and a serene garden pool steps from the lighthouse.",
    rating: 4.8,
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    vibeTags: ["heritage", "colonial", "luxury", "fort", "pool"],
    capacity: 2,
    nightlyRateUsdCents: 42000,
  },
  {
    name: "Fort Bazaar Galle",
    region: "Galle",
    description:
      "Boutique townhouse hotel inside Galle Fort — a restored merchant's house with a leafy courtyard restaurant. Walkable to ramparts, cafes, and boutiques.",
    rating: 4.6,
    cancellationPolicy: "Free cancellation up to 48h before check-in.",
    vibeTags: ["boutique", "fort", "design", "central", "foodie"],
    capacity: 2,
    nightlyRateUsdCents: 16500,
  },
  {
    name: "Cape Weligama",
    region: "Mirissa",
    description:
      "Clifftop resort on the south coast between Mirissa and Weligama with a crescent ocean pool. Quiet, upscale, close to whale-watching and quiet swimming bays.",
    rating: 4.7,
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    vibeTags: ["beach", "quiet", "luxury", "ocean", "pool", "whales"],
    capacity: 3,
    nightlyRateUsdCents: 32000,
  },
  {
    name: "Mirissa Beach Villa",
    region: "Mirissa",
    description:
      "Laid-back beachfront guesthouse steps from Mirissa's swimming beach and coconut hill. Relaxed, unpretentious, ideal for surfers and slow beach days.",
    rating: 4.1,
    cancellationPolicy: "Free cancellation up to 24h before check-in.",
    vibeTags: ["beach", "budget", "surf", "relaxed", "beachfront"],
    capacity: 3,
    nightlyRateUsdCents: 6000,
  },
];

export interface SeedDriver {
  name: string;
  vehicleType: string;
  vehicleDescription: string;
  languages: string[];
  regions: string[];
  rating: number;
  dayRateUsdCents: number;
  /** Blocked (unavailable) inclusive date ranges. */
  blocks: { start: string; end: string; reason?: string }[];
}

export const drivers: SeedDriver[] = [
  {
    name: "Nuwan Perera",
    vehicleType: "suv",
    vehicleDescription: "Toyota Prado, air-conditioned, 4 seats + luggage",
    languages: ["English", "Sinhala"],
    regions: ["Colombo", "Kandy", "Sigiriya", "Ella"],
    rating: 4.9,
    dayRateUsdCents: 6500,
    blocks: [{ start: "2026-07-20", end: "2026-07-24", reason: "prior charter" }],
  },
  {
    name: "Sanjaya Fernando",
    vehicleType: "sedan",
    vehicleDescription: "Toyota Axio, air-conditioned, 3 seats",
    languages: ["English", "Sinhala"],
    regions: ["Colombo", "Galle", "Mirissa"],
    rating: 4.7,
    dayRateUsdCents: 5000,
    blocks: [],
  },
  {
    name: "Rizwan Marikkar",
    vehicleType: "van",
    vehicleDescription: "Toyota HiAce, 8 seats, ideal for families",
    languages: ["English", "Sinhala", "Tamil"],
    regions: ["Colombo", "Kandy", "Ella", "Sigiriya", "Galle"],
    rating: 4.8,
    dayRateUsdCents: 8000,
    blocks: [{ start: "2026-08-01", end: "2026-08-05" }],
  },
  {
    name: "Kasun Bandara",
    vehicleType: "suv",
    vehicleDescription: "Mitsubishi Montero, air-conditioned, 5 seats",
    languages: ["English", "Sinhala", "German"],
    regions: ["Kandy", "Ella", "Nuwara Eliya", "Sigiriya"],
    rating: 4.9,
    dayRateUsdCents: 7000,
    blocks: [],
  },
  {
    name: "Dinesh Silva",
    vehicleType: "sedan",
    vehicleDescription: "Honda Grace hybrid, quiet and economical, 3 seats",
    languages: ["English", "Sinhala"],
    regions: ["Colombo", "Galle", "Mirissa", "Yala"],
    rating: 4.6,
    dayRateUsdCents: 4800,
    blocks: [],
  },
  {
    name: "Mohamed Nazeer",
    vehicleType: "van",
    vehicleDescription: "Nissan Caravan, 7 seats + roof rack",
    languages: ["English", "Tamil", "Sinhala"],
    regions: ["Colombo", "Trincomalee", "Sigiriya", "Anuradhapura"],
    rating: 4.5,
    dayRateUsdCents: 7800,
    blocks: [{ start: "2026-07-16", end: "2026-07-18" }],
  },
  {
    name: "Chaminda Jayawardene",
    vehicleType: "minibus",
    vehicleDescription: "Toyota Coaster, 14 seats, groups and tours",
    languages: ["English", "Sinhala"],
    regions: ["Colombo", "Kandy", "Sigiriya", "Galle", "Ella"],
    rating: 4.7,
    dayRateUsdCents: 12000,
    blocks: [],
  },
  {
    name: "Ishara Wickramasinghe",
    vehicleType: "suv",
    vehicleDescription: "Toyota RAV4, air-conditioned, 4 seats",
    languages: ["English", "Sinhala", "French"],
    regions: ["Colombo", "Galle", "Mirissa", "Ella", "Yala"],
    rating: 4.8,
    dayRateUsdCents: 6800,
    blocks: [{ start: "2026-09-10", end: "2026-09-15", reason: "leave" }],
  },
];

/** ~30 destination knowledge chunks — real Sri Lanka planning facts. */
export const knowledgeChunks: { title: string; content: string }[] = [
  {
    title: "Colombo to Kandy driving time",
    content:
      "By road, Colombo to Kandy is about 115 km and takes roughly 3.5 hours via the A1 through Kadugannawa, longer in traffic. There is no full expressway; expect winding sections near Kadugannawa pass.",
  },
  {
    title: "Kandy to Ella by road",
    content:
      "Kandy to Ella is around 140 km and takes about 4 hours by car through the central highlands via Nuwara Eliya or Badulla. The scenic Kandy–Ella train is slower (6–7 hours) but famous for its views.",
  },
  {
    title: "Ella to Yala / south",
    content:
      "Ella to Yala National Park is roughly 3 hours by road descending from the hills to the dry southern plains. Ella to the south coast (Mirissa/Galle) is about 4–4.5 hours.",
  },
  {
    title: "Colombo airport (CMB) location",
    content:
      "Bandaranaike International Airport (CMB) is at Katunayake, about 35 km north of central Colombo — roughly 45 minutes by the E03 airport expressway. Many travelers skip Colombo city and drive straight to Negombo or the cultural triangle.",
  },
  {
    title: "Sigiriya and the Cultural Triangle",
    content:
      "Sigiriya Rock Fortress is the centerpiece of the Cultural Triangle, near Dambulla. Climb early (gates open 7am) to beat heat and crowds. Pidurangala Rock opposite offers the best view of Sigiriya itself and a cheaper, rougher climb.",
  },
  {
    title: "Sigiriya entrance fee",
    content:
      "Sigiriya entrance for foreign visitors is about USD 30 (around 8,000–10,000 LKR). Pidurangala is far cheaper at roughly 1,000 LKR. Bring water; the climb is ~1,200 steps and hot by mid-morning.",
  },
  {
    title: "South-west coast swimming season",
    content:
      "The south-west and south coasts (Bentota, Galle, Unawatuna, Mirissa, Weligama) are best from roughly December to April, during the north-east monsoon, when these coasts are calm and sunny for swimming.",
  },
  {
    title: "East coast swimming season",
    content:
      "The east coast (Trincomalee, Nilaveli, Arugam Bay, Pasikudah) is best from roughly May to September during the south-west monsoon, when the west and south are wetter. Arugam Bay's surf season peaks April–October.",
  },
  {
    title: "Whale watching in Mirissa",
    content:
      "Blue and sperm whale watching off Mirissa runs roughly November to April, with the best sightings December–March. Boats leave around 6:30am; the season aligns with the calm south-coast swimming months.",
  },
  {
    title: "Temple of the Sacred Tooth Relic, Kandy",
    content:
      "The Temple of the Tooth (Sri Dalada Maligawa) in Kandy is Sri Lanka's holiest Buddhist site. Dress modestly (shoulders and knees covered), remove shoes, and time a visit for a puja ceremony (roughly 5:30am, 9:30am, 6:30pm).",
  },
  {
    title: "Nine Arch Bridge, Ella",
    content:
      "The Nine Arch Bridge near Ella is a colonial-era railway viaduct in the jungle. Trains cross a handful of times daily; check the schedule at your guesthouse for the best photo timing. It's a 20–30 minute walk from Ella town.",
  },
  {
    title: "Little Adam's Peak vs Ella Rock",
    content:
      "Little Adam's Peak is an easy 45-minute hike with big views, good at sunrise. Ella Rock is a harder 2–3 hour round trip along the railway and can be confusing without a guide or GPS.",
  },
  {
    title: "Yala vs Wilpattu for safaris",
    content:
      "Yala National Park has the highest leopard density and is busiest; book a morning jeep. Wilpattu is larger, quieter, and known for leopards and sloth bears. Yala's Block 1 is often closed in September for drought.",
  },
  {
    title: "Galle Fort",
    content:
      "Galle Fort is a UNESCO-listed Dutch colonial walled town on the south coast, best explored on foot at golden hour along the ramparts. It's about 2 hours from Colombo via the E01 southern expressway.",
  },
  {
    title: "Southern Expressway (E01)",
    content:
      "The E01 Southern Expressway links Colombo to Galle, Matara, and beyond, cutting Colombo–Galle to about 1.5–2 hours versus 3+ on the old coastal road. It's the fastest way south.",
  },
  {
    title: "Nuwara Eliya and tea country",
    content:
      "Nuwara Eliya, 'Little England', sits at ~1,900m with a cool climate, colonial bungalows, and tea estates. It's about 2.5–3 hours from Kandy and a common stop on the Kandy–Ella hill route. Bring a warm layer for evenings.",
  },
  {
    title: "Adam's Peak (Sri Pada) pilgrimage",
    content:
      "Adam's Peak pilgrimage season runs roughly December to May. Climbers start around 2am to reach the 2,243m summit for sunrise. Off-season the path is unlit and often shrouded in cloud.",
  },
  {
    title: "Best time to visit overall",
    content:
      "Sri Lanka has two monsoons, so somewhere is always in season. December–March suits the west, south, and hill country plus cultural triangle; May–September favors the east coast. April and September are shoulder months island-wide.",
  },
  {
    title: "Visa (ETA) for Sri Lanka",
    content:
      "Most visitors need an Electronic Travel Authorization (ETA) before arrival, obtained online. Always use the official government portal. Keep the approval printout for immigration at CMB.",
  },
  {
    title: "Tipping and money",
    content:
      "The currency is the Sri Lankan Rupee (LKR). Tipping is customary but modest: round up for drivers, ~10% at restaurants if service isn't included, and a daily gratuity for a private driver-guide is appreciated.",
  },
  {
    title: "Driver-guides and road travel",
    content:
      "Hiring a private driver-guide is the most common way inbound travelers get around, given winding roads and limited signage. Day rates typically cover fuel and the driver's meals/lodging; confirm what's included when booking.",
  },
  {
    title: "The Kandy to Ella train",
    content:
      "The Kandy (Peradeniya)–Ella train is one of the world's most scenic rides, passing tea plantations and Nanu Oya (for Nuwara Eliya). Reserved first/second-class seats sell out weeks ahead; the Ella–Kandy afternoon leg is popular for photos.",
  },
  {
    title: "Dambulla Cave Temple",
    content:
      "The Dambulla Golden Temple is a complex of five caves filled with Buddha statues and murals, a UNESCO site near Sigiriya. Entrance is about 2,000 LKR; modest dress and shoe removal required.",
  },
  {
    title: "Anuradhapura and Polonnaruwa",
    content:
      "Anuradhapura and Polonnaruwa are ancient royal capitals in the Cultural Triangle, best explored by bicycle among stupas and ruins. Anuradhapura is older and more spread out; Polonnaruwa is more compact and easier in half a day.",
  },
  {
    title: "Mirissa vs Unawatuna vs Weligama",
    content:
      "Unawatuna is a lively, sheltered swimming bay near Galle; Mirissa is a palm-fringed beach known for whales and nightlife; Weligama is a shallow, gentle bay ideal for beginner surfers. All cluster along the south coast within ~30–40 minutes of each other.",
  },
  {
    title: "Arugam Bay surf",
    content:
      "Arugam Bay on the east coast is Sri Lanka's premier surf town, with a long right-hand point break. Season runs roughly April to October. It's remote — about 3 hours from Ella or a long day from Colombo.",
  },
  {
    title: "Health and safety basics",
    content:
      "Drink bottled or filtered water, use mosquito repellent (dengue is present, especially in wet lowlands), and cover up at religious sites. Tap water is not recommended for drinking. Pharmacies are widely available in towns.",
  },
  {
    title: "Elephant gathering, Minneriya/Kaudulla",
    content:
      "The Minneriya/Kaudulla 'Gathering' sees hundreds of wild elephants congregate around the reservoir, best roughly July to October in the dry season. Which park is best shifts with water levels — a local driver-guide will know that week's spot.",
  },
  {
    title: "Colombo highlights if you have a day",
    content:
      "In Colombo, walk Galle Face Green at sunset, visit the Gangaramaya Temple, browse Pettah market and Independence Square, and eat at a rooftop or a hopper joint. It's more transit hub than sightseeing city for most itineraries.",
  },
  {
    title: "Typical first/last night strategy",
    content:
      "Because CMB airport is north of Colombo and city traffic is heavy, many itineraries put the first night in Negombo (10 minutes from the airport) or drive straight to the cultural triangle, saving Colombo (or Galle) for the end near the flight home.",
  },
];
