export interface SriLankaImageMeta {
  id: string;
  src: string;
  alt: string;
  credit?: string;
  region?: string;
}

const unsplash = (id: string, w = 960) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Curated Unsplash photography — verified HTTP 200, hotlinked via next/image. */
export const SRI_LANKA_IMAGES = {
  hero: {
    id: "hero-sigiriya",
    src: unsplash("photo-1711797750174-c3750dd9d7c9", 1280),
    alt: "Aerial view of Sigiriya rock fortress rising from the jungle",
    credit: "Unsplash / sander traa",
    region: "Sigiriya",
  },
  ellaTrain: {
    id: "ella-train",
    src: unsplash("photo-1548013146-72479768bada"),
    alt: "Train crossing a stone viaduct through tropical forest",
    credit: "Unsplash",
    region: "Ella",
  },
  southCoast: {
    id: "south-coast",
    src: unsplash("photo-1559827260-dc66d52bef19"),
    alt: "Palm-fringed beach on Sri Lanka's south coast",
    credit: "Unsplash",
    region: "Mirissa",
  },
  kandy: {
    id: "kandy",
    src: unsplash("photo-1711389552655-9230667c6338"),
    alt: "Cliff-top fortress surrounded by lush vegetation",
    credit: "Unsplash / sander traa",
    region: "Kandy",
  },
  galle: {
    id: "galle",
    src: unsplash("photo-1756670164617-76aeb86e6091"),
    alt: "Sigiriya rock formation above green hills and water",
    credit: "Unsplash",
    region: "Galle",
  },
  wildlife: {
    id: "wildlife",
    src: unsplash("photo-1564760055775-d63b17a55c44"),
    alt: "Elephants in a Sri Lankan national park",
    credit: "Unsplash",
    region: "Yala",
  },
  colombo: {
    id: "colombo",
    src: unsplash("photo-1751247026229-518bfec9b5e6"),
    alt: "Sunset light on Sigiriya rock near the cultural triangle",
    credit: "Unsplash / Anil Reddy",
    region: "Colombo",
  },
  stiltFishermen: {
    id: "stilt-fishermen",
    src: unsplash("photo-1507525428034-b723cf961d3e"),
    alt: "Calm turquoise waters along the tropical coast",
    credit: "Unsplash",
    region: "Weligama",
  },
  teaPicker: {
    id: "tea-picker",
    src: unsplash("photo-1578662996442-48f60103fc96"),
    alt: "Tea country landscape in Sri Lanka's hill region",
    credit: "Unsplash",
    region: "Nuwara Eliya",
  },
  nineArch: {
    id: "nine-arch",
    src: unsplash("photo-1548013146-72479768bada"),
    alt: "Historic railway viaduct through the highlands",
    credit: "Unsplash",
    region: "Ella",
  },
  lagoon: {
    id: "lagoon",
    src: unsplash("photo-1507525428034-b723cf961d3e"),
    alt: "Turquoise lagoon and calm tropical waters",
    credit: "Unsplash",
    region: "East Coast",
  },
  temple: {
    id: "temple",
    src: unsplash("photo-1751247026229-518bfec9b5e6"),
    alt: "Golden sunset over ancient rock fortress landscape",
    credit: "Unsplash / Anil Reddy",
    region: "Anuradhapura",
  },
} as const satisfies Record<string, SriLankaImageMeta>;

export type ImageKey = keyof typeof SRI_LANKA_IMAGES;

/** Map blog slugs to thematic hero images. */
export const BLOG_IMAGES: Record<string, ImageKey> = {
  "driving-times-that-actually-matter": "kandy",
  "one-week-first-timer": "ellaTrain",
  "southwest-vs-east-coast": "southCoast",
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
