/**
 * The five core service lines. Everything that needs to treat them as the
 * headline offering (page titles, sitemap priority, homepage showcase,
 * schema, services index) reads from here so they cannot drift apart.
 *
 * `seoTitle` is rendered through the site title template ("%s | Glory Grills",
 * 15 chars), so keep it ≤ 46 chars to stay under ~62 in the SERP.
 * `seoDescription` should stay ≤ 158 chars.
 */
export type MainServicePillar = {
  /** Canonical service slug (must exist and be published). */
  slug: string;
  /** Short name used in cards and headings. */
  label: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  /** Extra search phrases for schema `keywords` and the homepage. */
  keywords: string[];
  /** Sibling service slugs that belong to this line, shown as sub-links. */
  related: string[];
};

export const MAIN_SERVICES: MainServicePillar[] = [
  {
    slug: "invisible-grills",
    label: "Invisible Grills",
    tagline:
      "Near-transparent SS304 / SS316 cable grills for balconies, windows and terraces.",
    seoTitle: "Invisible Grills in Tamil Nadu | SS304/SS316",
    seoDescription:
      "Invisible grill installation in Tamil Nadu for balconies, windows and terraces. SS304 / SS316 cables, child and pet safe spacing. Free site visit and quote.",
    keywords: [
      "invisible grills",
      "invisible grill installation",
      "balcony invisible grill",
      "window invisible grill",
      "SS316 invisible grill",
      "invisible grill price",
    ],
    related: [
      "balcony-safety-grills",
      "window-invisible-grills",
      "children-safety-grills",
      "pet-safety-grills",
    ],
  },
  {
    slug: "safety-nets",
    label: "Safety Nets",
    tagline:
      "Every type of safety net: balcony, terrace, kids, pet, building, bird and monkey nets.",
    seoTitle: "Safety Nets in Tamil Nadu | Balcony & Kids",
    seoDescription:
      "All types of safety nets in Tamil Nadu: balcony, terrace, kids, pet, building, bird and monkey nets. UV-stabilised mesh, measured fitting, free site visit.",
    keywords: [
      "safety nets",
      "balcony safety net",
      "kids safety net",
      "pet safety net",
      "building safety net",
      "terrace safety net",
    ],
    related: [
      "balcony-safety-nets",
      "kids-safety-nets",
      "children-safety-nets",
      "pet-safety-nets",
      "building-safety-nets",
      "bird-nets",
      "monkey-nets",
    ],
  },
  {
    slug: "cloth-hangers",
    label: "Cloth Hangers",
    tagline:
      "Ceiling and balcony cloth drying hangers fitted to your span and ceiling height.",
    seoTitle: "Ceiling & Balcony Cloth Hangers | Tamil Nadu",
    seoDescription:
      "Ceiling and balcony cloth drying hanger installation for apartments and homes across Tamil Nadu. Measured to your space, neat fixing. Free site visit.",
    keywords: [
      "cloth hangers",
      "ceiling cloth hanger",
      "balcony cloth hanger",
      "cloth drying hanger",
      "clothes drying hanger for apartment",
    ],
    related: ["ceiling-cloth-hangers"],
  },
  {
    slug: "sports-nets",
    label: "Sports Nets",
    tagline:
      "Cricket practice, box cricket and perimeter netting built to your site size.",
    seoTitle: "Sports Nets in Tamil Nadu | Cricket Practice",
    seoDescription:
      "Cricket practice nets and sports netting installation across Tamil Nadu for homes, terraces, academies and clubs. Custom size and height. Free site survey.",
    keywords: [
      "sports nets",
      "cricket practice net",
      "box cricket net",
      "cricket net installation",
      "sports netting",
    ],
    related: [],
  },
  {
    slug: "bird-spikes",
    label: "Bird Spikes",
    tagline:
      "Stainless anti-bird spikes for ledges, sunshades, parapets and AC units.",
    seoTitle: "Anti Pigeon Bird Spikes in Tamil Nadu",
    seoDescription:
      "Bird spike and anti-pigeon spike installation in Tamil Nadu for balcony ledges, sunshades, parapets and AC units. Stainless options. Free site visit.",
    keywords: [
      "bird spikes",
      "pigeon spikes",
      "anti bird spikes",
      "bird spikes for balcony",
      "bird control spikes",
    ],
    related: ["bird-nets"],
  },
];

export const MAIN_SERVICE_SLUGS: readonly string[] = MAIN_SERVICES.map((s) => s.slug);

const BY_SLUG = new Map(MAIN_SERVICES.map((pillar) => [pillar.slug, pillar]));

export function getMainService(slug: string): MainServicePillar | undefined {
  return BY_SLUG.get(slug);
}

export function isMainService(slug: string): boolean {
  return BY_SLUG.has(slug);
}

/** Stable sort: core services first (in pillar order), the rest keep their order. */
export function sortMainServicesFirst<T extends { slug: string }>(items: T[]): T[] {
  const rank = (slug: string) => {
    const index = MAIN_SERVICE_SLUGS.indexOf(slug);
    return index === -1 ? MAIN_SERVICE_SLUGS.length : index;
  };
  return items
    .map((item, order) => ({ item, order }))
    .sort((a, b) => rank(a.item.slug) - rank(b.item.slug) || a.order - b.order)
    .map(({ item }) => item);
}
