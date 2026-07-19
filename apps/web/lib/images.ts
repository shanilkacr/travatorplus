export interface SriLankaImageMeta {
  id: string;
  src: string;
  alt: string;
  credit?: string;
  region?: string;
}

const unsplash = (id: string, w = 960) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/**
 * Curated Sri Lanka photography.
 *
 * House rule: every image here must actually depict Sri Lanka, and the alt text
 * must describe what is genuinely in the frame. Each ID below was opened and
 * inspected before being added — never add one on the strength of a search
 * result's caption alone. (An earlier set drifted into a Taj Mahal shot, African
 * elephants and stock Caribbean beaches, all under Sri Lankan alt text.)
 */
export const SRI_LANKA_IMAGES = {
  hero: {
    id: "sigiriya-aerial",
    src: unsplash("photo-1711797750174-c3750dd9d7c9", 1280),
    alt: "Aerial view of Sigiriya rock fortress rising from surrounding jungle at dawn",
    credit: "Unsplash",
    region: "Sigiriya",
  },
  sigiriyaLake: {
    id: "sigiriya-lake",
    src: unsplash("photo-1756670164617-76aeb86e6091"),
    alt: "Sigiriya rock seen across a lake and grassland under cloud",
    credit: "Unsplash",
    region: "Sigiriya",
  },
  sigiriyaSunset: {
    id: "sigiriya-sunset",
    src: unsplash("photo-1751247026229-518bfec9b5e6"),
    alt: "Sigiriya rock on the horizon at sunset, seen from the surrounding hills",
    credit: "Unsplash",
    region: "Sigiriya",
  },
  sigiriyaSummit: {
    id: "sigiriya-summit",
    src: unsplash("photo-1711389552655-9230667c6338"),
    alt: "Ruined terraces on the summit of Sigiriya above the forest canopy",
    credit: "Unsplash",
    region: "Sigiriya",
  },
  ellaTrain: {
    id: "nine-arch-bridge",
    src: unsplash("photo-1578519050142-afb511e518de"),
    alt: "Red train crossing the Nine Arch Bridge above tea slopes at Ella",
    credit: "Unsplash",
    region: "Ella",
  },
  nineArch: {
    id: "nine-arch-bridge-alt",
    src: unsplash("photo-1578519050142-afb511e518de"),
    alt: "Red train crossing the Nine Arch Bridge above tea slopes at Ella",
    credit: "Unsplash",
    region: "Ella",
  },
  teaPicker: {
    id: "tea-plantation",
    src: unsplash("photo-1713015702343-b91707c04bc7"),
    alt: "Pickers working terraced tea slopes in Sri Lanka's hill country",
    credit: "Unsplash",
    region: "Nuwara Eliya",
  },
  kandy: {
    id: "kandy-temple",
    src: unsplash("photo-1665849050332-8d5d7e59afb6"),
    alt: "The Temple of the Sacred Tooth Relic in Kandy",
    credit: "Unsplash",
    region: "Kandy",
  },
  galle: {
    id: "galle-lighthouse",
    src: unsplash("photo-1704797390325-b057758d8c3d"),
    alt: "Galle Fort lighthouse behind palms, with a tuk-tuk on the rampart road",
    credit: "Unsplash",
    region: "Galle",
  },
  southCoast: {
    id: "mirissa-coast",
    src: unsplash("photo-1734279135115-6d8984e08206"),
    alt: "Aerial view of the palm-covered headland and bays of Sri Lanka's south coast",
    credit: "Unsplash",
    region: "Mirissa",
  },
  stiltFishermen: {
    id: "stilt-fishing",
    src: unsplash("photo-1643793416018-3eb27ecc1628"),
    alt: "Stilt-fishing poles standing in the surf on Sri Lanka's south coast",
    credit: "Unsplash",
    region: "Weligama",
  },
  wildlife: {
    id: "sri-lankan-elephants",
    src: unsplash("photo-1705936981588-a4192f66fcfb"),
    alt: "Sri Lankan elephants wading through a shallow tank in a national park",
    credit: "Unsplash",
    region: "Yala",
  },
  colombo: {
    id: "colombo-city",
    src: unsplash("photo-1740812517495-812e90ca01b1"),
    alt: "Colombo rooftops and high-rises looking out to the Indian Ocean",
    credit: "Unsplash",
    region: "Colombo",
  },
  lagoon: {
    id: "east-coast-boats",
    src: unsplash("photo-1552055568-f8c4fb8c6320"),
    alt: "Fishing boats drawn up on a wide Sri Lankan beach, seen from above",
    credit: "Unsplash",
    region: "East Coast",
  },
  surf: {
    id: "surf-beach",
    src: unsplash("photo-1503384861219-7f20f2f111cc"),
    alt: "Surfers walking a palm-lined Sri Lankan beach at dusk with boards under their arms",
    credit: "Unsplash",
    region: "Arugam Bay",
  },
  food: {
    id: "rice-and-curry",
    src: unsplash("photo-1742281095650-dd3c50c08772"),
    alt: "A Sri Lankan rice and curry spread served on a lotus leaf",
    credit: "Unsplash",
    region: "Sri Lanka",
  },
  paddy: {
    id: "paddy-field",
    src: unsplash("photo-1752426614042-903c03929e66"),
    alt: "Green paddy fields with a footpath running through them under a tree",
    credit: "Unsplash",
    region: "Rural Sri Lanka",
  },
  temple: {
    id: "kandy-temple-alt",
    src: unsplash("photo-1665849050332-8d5d7e59afb6"),
    alt: "The Temple of the Sacred Tooth Relic in Kandy",
    credit: "Unsplash",
    region: "Kandy",
  },
} as const satisfies Record<string, SriLankaImageMeta>;

export type ImageKey = keyof typeof SRI_LANKA_IMAGES;

/** Map blog slugs to thematic hero images. */
export const BLOG_IMAGES: Record<string, ImageKey> = {
  "driving-times-that-actually-matter": "kandy",
  "one-week-first-timer": "ellaTrain",
  "southwest-vs-east-coast": "southCoast",
  "no-off-season-in-sri-lanka": "surf",
  "rain-in-sri-lanka-plan-around-it": "sigiriyaLake",
  "beyond-the-standard-tourist-loop": "sigiriyaSunset",
  "go-rural-sri-lanka": "paddy",
  "sri-lankan-food-guide": "food",
  "expressway-buses-sri-lanka": "colombo",
  "how-to-get-around-sri-lanka": "galle",
  "rent-a-vehicle-or-public-transport": "stiltFishermen",
  "renting-a-vehicle-in-sri-lanka": "lagoon",
  "is-sri-lanka-getting-too-touristy": "teaPicker",
};

export function getBlogImage(slug: string): SriLankaImageMeta {
  const key = BLOG_IMAGES[slug] ?? "hero";
  return SRI_LANKA_IMAGES[key];
}

/** Grid items for layout-grid components. */
export const HOME_GRID_IMAGES = [
  SRI_LANKA_IMAGES.hero,
  SRI_LANKA_IMAGES.ellaTrain,
  SRI_LANKA_IMAGES.southCoast,
  SRI_LANKA_IMAGES.galle,
] as const;

export const TEAM_IMAGES = [
  SRI_LANKA_IMAGES.teaPicker,
  SRI_LANKA_IMAGES.wildlife,
  SRI_LANKA_IMAGES.colombo,
  SRI_LANKA_IMAGES.stiltFishermen,
] as const;
