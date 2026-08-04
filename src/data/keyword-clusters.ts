/**
 * Keyword cluster map for programmatic SEO.
 *
 * IMPORTANT:
 * We do NOT create one thin URL per keyword modifier (price/cheap/best/etc.).
 * Modifiers enrich metadata, FAQs and internal search intent for real pages:
 * service, city-service, area-service, solution, guide and property-type pages.
 */

export type KeywordCluster = {
  id: string;
  canonicalServiceSlug: string;
  label: string;
  headTerms: string[];
  commercialModifiers: string[];
  applicationModifiers: string[];
  materialModifiers: string[];
  qualityModifiers: string[];
  intentNotes: string;
  createDedicatedServicePage: boolean;
};

const COMMERCIAL = [
  "price",
  "cost",
  "rate",
  "charges",
  "price list",
  "cost per square feet",
  "per sq ft price",
  "installation cost",
  "installation",
  "installers",
  "installer",
  "service",
  "services",
  "company",
  "companies",
  "contractor",
  "contractors",
  "dealer",
  "dealers",
  "supplier",
  "suppliers",
  "manufacturer",
  "manufacturers",
  "quote",
  "estimate",
  "booking",
  "free quote",
  "quotation",
  "repair",
  "maintenance",
  "replacement",
  "fitting",
  "fixing",
  "setup",
  "amc",
] as const;

const QUALITY = [
  "best",
  "top",
  "top rated",
  "highest rated",
  "leading",
  "professional",
  "certified",
  "trusted",
  "reliable",
  "verified",
  "premium",
  "luxury",
  "affordable",
  "budget",
  "recommended",
  "popular",
  "most popular",
  "most trusted",
  "google rated",
  "5 star rated",
  "award winning",
  "experienced",
  "high quality",
  "durable",
  "strong",
  "safe",
  "custom",
  "customized",
  "professional installation",
  "with installation",
] as const;

/** Enrichment-only location / urgency phrases — never become page slugs alone. */
export const NEAR_ME_INTENT_MODIFIERS = [
  "near me",
  "nearby",
  "around me",
  "close by",
  "local",
  "nearest",
  "open now",
  "available now",
  "24 hours",
  "emergency",
  "urgent",
  "same day",
  "fast",
  "instant",
  "today",
  "tomorrow",
] as const;

/** Property-type phrases used in titles/FAQs — map to property-type or area pages. */
export const PROPERTY_TYPE_MODIFIERS = [
  "apartment",
  "flat",
  "villa",
  "duplex",
  "independent house",
  "residential building",
  "commercial building",
  "office",
  "school",
  "college",
  "hospital",
  "hotel",
  "warehouse",
  "factory",
  "shopping mall",
  "high rise building",
  "township",
  "gated community",
  "farm house",
  "resort",
] as const;

/** Reject doorway-style modifiers from becoming page slugs. */
export const BLOCKED_PAGE_MODIFIERS = [
  "cheap",
  "low cost",
  "online",
  "shop",
  "store",
  "near me",
  "nearby",
  "around me",
  "close by",
  "open now",
  "available now",
  "24 hours",
  "emergency",
  "urgent",
  "same day",
  "fast",
  "instant",
  "today",
  "tomorrow",
  "no 1",
  "budget",
  "lowest price",
] as const;

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    id: "cluster-invisible-grills",
    canonicalServiceSlug: "invisible-grills",
    label: "Invisible Grills",
    headTerms: [
      "invisible grills",
      "invisible grill",
      "transparent grill",
      "ss invisible grill",
      "316 ss invisible grill",
      "stainless steel invisible grill",
      "316 stainless steel invisible grill",
      "invisible grill wire",
      "invisible grill cable",
      "invisible grill design",
      "invisible grill designs",
      "invisible grill material",
      "invisible grill accessories",
      "invisible grill solution",
      "invisible grill solutions",
      "invisible grill ideas",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for home",
      "for house",
      "for apartment",
      "for apartments",
      "for flats",
      "for balcony",
      "for balconies",
      "for window",
      "for windows",
      "for terrace",
      "for building",
      "for villa",
      "for high rise",
      "for high rise building",
      "for kids safety",
      "for child safety",
      "for baby safety",
      "for pets",
      "for cats",
      "for dogs",
      "for pigeon protection",
      "for bird protection",
      "for fall protection",
      "for edge protection",
      "for family safety",
      "for modern homes",
      "for luxury balconies",
      "residential",
      "commercial",
      "home installation",
      "apartment installation",
    ],
    materialModifiers: [
      "stainless steel",
      "316 stainless steel",
      "nylon",
      "hdpe",
      "anti rust",
      "without drilling",
    ],
    qualityModifiers: [...QUALITY],
    intentNotes:
      "Core invisible grill service. Pricing modifiers map to pricing-guide + quote CTA, not separate thin pages.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-balcony-invisible",
    canonicalServiceSlug: "balcony-safety-grills",
    label: "Balcony Invisible / Safety Grills",
    headTerms: [
      "balcony invisible grill",
      "invisible balcony grill",
      "invisible grill for balcony",
      "balcony safety grill",
      "transparent balcony grill",
      "modern balcony grill",
      "balcony grill design",
      "balcony fall protection",
      "balcony edge protection",
      "balcony barrier solutions",
      "balcony security mesh",
      "balcony guard systems",
      "designer balcony safety",
      "luxury balcony protection",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for apartment",
      "for flats",
      "for high rise",
      "for kids safety",
      "for child safety",
      "for pets",
      "for dogs",
      "for cats",
      "for renovation",
      "for monsoon safety",
    ],
    materialModifiers: ["stainless steel", "nylon", "anti rust"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Maps to balcony safety grill service pages by city/area.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-window-invisible",
    canonicalServiceSlug: "window-invisible-grills",
    label: "Window Invisible / Safety Grills",
    headTerms: [
      "window invisible grill",
      "invisible window grill",
      "invisible grill for window",
      "window safety grill",
      "transparent window grill",
      "modern window grill",
      "window grill design",
      "window fall protection",
      "window protection systems",
      "window security mesh",
      "window child protection",
      "window pet protection",
      "window bird protection",
      "window fall prevention",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for apartment",
      "for home",
      "for high rise",
      "for child safety",
      "for pet safety",
      "for bird control",
    ],
    materialModifiers: ["stainless steel", "nylon"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Maps to window invisible grill service pages.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-safety-nets",
    canonicalServiceSlug: "safety-nets",
    label: "Safety Nets",
    headTerms: [
      "safety nets",
      "safety net",
      "balcony safety net",
      "safety net for balcony",
      "window safety net",
      "terrace safety net",
      "duct area safety net",
      "staircase safety net",
      "balcony nets",
      "balcony net",
      "balcony safety nets",
      "safety mesh installation",
      "protective net systems",
      "balcony protection systems",
      "open terrace safety",
      "roof edge protection",
      "edge protection nets",
      "site safety nets",
      "all weather safety systems",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for balcony",
      "for window",
      "for terrace",
      "for apartment",
      "for kids safety",
      "for child safety",
      "for baby safety",
      "for pets",
      "for cats",
      "for dogs",
      "for pigeon protection",
      "for bird protection",
      "for fall protection",
      "for construction",
      "for commercial buildings",
      "for monsoon",
    ],
    materialModifiers: ["nylon", "hdpe", "stainless steel"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Dedicated safety-net service line with city/area combinations.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-kids-pet-nets",
    canonicalServiceSlug: "kids-safety-nets",
    label: "Kids / Child / Baby / Pet Safety Nets",
    headTerms: [
      "kids safety net",
      "child safety net",
      "children safety net",
      "baby safety net",
      "pet safety net",
      "balcony net for child safety",
      "balcony net for kids safety",
      "balcony net for pets",
      "balcony net for cats",
      "balcony net for dogs",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for balcony",
      "for apartment",
      "for high rise",
      "for home",
    ],
    materialModifiers: ["nylon", "hdpe"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Child/pet safety net intents map to kids safety nets + related solutions.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-bird-control",
    canonicalServiceSlug: "bird-spikes",
    label: "Bird / Pigeon Control",
    headTerms: [
      "bird spikes",
      "pigeon spikes",
      "anti bird spikes",
      "anti pigeon spikes",
      "bird control spikes",
      "pigeon control spikes",
      "bird repellent spikes",
      "balcony bird net",
      "balcony net for pigeons",
      "bird proofing services",
      "bird exclusion systems",
      "bird nest prevention",
      "balcony bird control",
      "terrace bird control",
      "commercial bird control",
      "residential bird control",
      "anti roosting solutions",
      "bird deterrent systems",
      "pigeon nest removal",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for balcony",
      "for window",
      "for terrace",
      "for building",
      "for apartment",
      "for warehouse",
      "for factory",
      "commercial",
      "residential",
      "for summer bird control",
    ],
    materialModifiers: ["stainless steel", "anti rust"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Bird control is a separate service from invisible grills.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-cloth-hangers",
    canonicalServiceSlug: "cloth-hangers",
    label: "Cloth / Ceiling Drying Hangers",
    headTerms: [
      "cloth hanger",
      "cloth hangers",
      "clothes hanger",
      "clothes hangers",
      "cloth drying hanger",
      "clothes drying hanger",
      "ceiling cloth hanger",
      "ceiling cloth hangers",
      "balcony cloth hanger",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "for balcony",
      "for apartment",
      "for flats",
      "for home",
      "ceiling",
    ],
    materialModifiers: ["stainless steel", "anti rust"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Balcony/ceiling cloth drying systems as a related home product line.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-sports-nets",
    canonicalServiceSlug: "sports-nets",
    label: "Sports / Cricket Nets",
    headTerms: [
      "sports nets",
      "sports net",
      "sports netting",
      "cricket net",
      "cricket nets",
      "cricket practice net",
      "cricket practice nets",
      "cricket net for practice",
      "cricket box net",
      "cricket box nets",
      "football nets",
      "golf nets",
      "tennis nets",
      "volleyball nets",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: [
      "commercial",
      "residential",
      "for building",
      "for sports academy",
      "for practice",
      "for school",
      "for college",
    ],
    materialModifiers: ["nylon", "hdpe"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Sports/cricket practice netting as a separate installable service.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-mosquito-nets",
    canonicalServiceSlug: "mosquito-nets",
    label: "Mosquito Nets",
    headTerms: [
      "mosquito nets",
      "mosquito net",
      "window mosquito net",
      "balcony mosquito net",
      "pleated mosquito nets",
      "sliding mosquito nets",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for windows", "for balcony", "for apartment", "for home"],
    materialModifiers: ["fiberglass", "stainless"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Insect screening is a dedicated service, not fall protection.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-bird-nets",
    canonicalServiceSlug: "bird-nets",
    label: "Bird / Pigeon Nets",
    headTerms: ["bird nets", "bird net", "pigeon net", "pigeon nets", "balcony bird net"],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for balcony", "for building", "for duct"],
    materialModifiers: ["nylon", "hdpe"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Bird exclusion netting complements bird spikes.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-monkey-nets",
    canonicalServiceSlug: "monkey-nets",
    label: "Monkey Nets",
    headTerms: ["monkey nets", "monkey net", "monkey safety net", "balcony monkey net"],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for balcony", "for home", "for apartment"],
    materialModifiers: ["hdpe", "nylon"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Stronger exclusion netting for primate intrusion areas.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-balcony-safety-nets",
    canonicalServiceSlug: "balcony-safety-nets",
    label: "Balcony Safety Nets",
    headTerms: ["balcony safety net", "balcony safety nets", "balcony net"],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for apartment", "for high rise", "for kids"],
    materialModifiers: ["nylon", "hdpe"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Balcony-specific safety net intent cluster.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-children-safety-nets",
    canonicalServiceSlug: "children-safety-nets",
    label: "Children Safety Nets",
    headTerms: [
      "children safety net",
      "children safety nets",
      "child safety net",
      "kids balcony safety net",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for balcony", "for windows", "for apartment"],
    materialModifiers: ["nylon", "hdpe"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Child-focused netting; maps to children-safety-nets service.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-building-safety-nets",
    canonicalServiceSlug: "building-safety-nets",
    label: "Building Safety Nets",
    headTerms: ["building safety net", "building safety nets", "duct safety net"],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for apartment", "for building", "commercial"],
    materialModifiers: ["nylon", "hdpe"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Multi-opening / building-scale netting.",
    createDedicatedServicePage: true,
  },
  {
    id: "cluster-ceiling-cloth-hangers",
    canonicalServiceSlug: "ceiling-cloth-hangers",
    label: "Ceiling Cloth Hangers",
    headTerms: [
      "ceiling cloth hanger",
      "ceiling cloth hangers",
      "ceiling clothes hanger",
      "ceiling drying hanger",
    ],
    commercialModifiers: [...COMMERCIAL],
    applicationModifiers: ["for balcony", "for apartment", "for flats"],
    materialModifiers: ["stainless steel"],
    qualityModifiers: [...QUALITY],
    intentNotes: "Ceiling-mounted drying hangers as dedicated utility service.",
    createDedicatedServicePage: true,
  },
];

export function getClustersForService(serviceSlug: string): KeywordCluster[] {
  return KEYWORD_CLUSTERS.filter(
    (cluster) => cluster.canonicalServiceSlug === serviceSlug,
  );
}

export function getPrimaryKeywordsForService(serviceSlug: string): string[] {
  return getClustersForService(serviceSlug).flatMap((cluster) => cluster.headTerms);
}

export function getSecondaryKeywordsForService(serviceSlug: string): string[] {
  return getClustersForService(serviceSlug).flatMap((cluster) => {
    const head = cluster.headTerms[0] ?? cluster.label.toLowerCase();
    return [
      ...cluster.headTerms.slice(1).map((term) => term),
      ...cluster.applicationModifiers.map((item) => `${head} ${item}`),
      ...cluster.commercialModifiers.map((item) => `${head} ${item}`),
      ...cluster.materialModifiers.map((item) => `${head} ${item}`),
      ...cluster.qualityModifiers.slice(0, 12).map((item) => `${item} ${head}`),
    ];
  });
}

export function expandLocationKeyword(
  headTerm: string,
  locationName: string,
): string {
  return `${headTerm} in ${locationName}`;
}

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Pick a seeded head-term alias so titles/H1s vary without doorway URLs. */
export function pickSeededHeadTerm(
  serviceSlug: string,
  seedKey: string,
): string {
  const heads = getPrimaryKeywordsForService(serviceSlug);
  if (heads.length === 0) return serviceSlug.replace(/-/g, " ");
  return heads[hashSeed(seedKey) % heads.length]!;
}

/**
 * Meta + on-page keyword list for a landing.
 * Uses head terms × commercial/quality/application modifiers × place.
 */
export function buildLandingKeywords(input: {
  serviceSlug: string;
  serviceName: string;
  placeLabel: string;
  cityName: string;
  seedKey?: string;
  limit?: number;
}): string[] {
  const limit = input.limit ?? 28;
  const seed = hashSeed(input.seedKey ?? `${input.serviceSlug}|${input.placeLabel}`);
  const clusters = getClustersForService(input.serviceSlug);
  const out: string[] = [];
  const seen = new Set<string>();

  const push = (phrase: string) => {
    const key = phrase.toLowerCase().trim();
    if (!key || seen.has(key) || out.length >= limit) return;
    seen.add(key);
    out.push(phrase.trim());
  };

  push(`${input.serviceName} in ${input.placeLabel}`);
  push(`${input.serviceName} in ${input.cityName}`);

  for (const cluster of clusters) {
    const heads = rotate(cluster.headTerms, seed);
    for (const head of heads.slice(0, 8)) {
      push(head);
      push(`${head} in ${input.placeLabel}`);
      push(`${head} in ${input.cityName}`);
      push(`${head} installation ${input.placeLabel}`);
      push(`${head} near me`);
    }

    const commercial = rotate([...cluster.commercialModifiers], seed).slice(0, 10);
    const quality = rotate([...cluster.qualityModifiers], seed).slice(0, 8);
    const apps = rotate([...cluster.applicationModifiers], seed).slice(0, 8);
    const mats = rotate([...cluster.materialModifiers], seed).slice(0, 4);
    const head = heads[0] ?? cluster.label.toLowerCase();

    for (const mod of commercial) {
      push(`${head} ${mod}`);
      push(`${head} ${mod} in ${input.placeLabel}`);
    }
    for (const mod of quality) {
      push(`${mod} ${head} in ${input.cityName}`);
    }
    for (const mod of apps) {
      push(`${head} ${mod}`);
      push(`${head} ${mod} in ${input.placeLabel}`);
    }
    for (const mod of mats) {
      push(`${mod} ${head}`);
      push(`${head} ${mod} ${input.cityName}`);
    }
  }

  return out;
}

/**
 * Full phrase bank for a service (head × modifiers) — enrichment only, not URLs.
 * Mirrors the user's service×keyword dump shape.
 */
export function expandServiceKeywordPhrases(serviceSlug: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (phrase: string) => {
    const key = phrase.toLowerCase().trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(phrase.trim());
  };

  for (const cluster of getClustersForService(serviceSlug)) {
    for (const head of cluster.headTerms) {
      push(head);
      for (const mod of cluster.commercialModifiers) push(`${head} ${mod}`);
      for (const mod of cluster.qualityModifiers) push(`${head} ${mod}`);
      for (const mod of cluster.applicationModifiers) push(`${head} ${mod}`);
      for (const mod of cluster.materialModifiers) push(`${head} ${mod}`);
    }
  }
  return out;
}

/** Place-scoped phrases: service×city×keyword and service×area×keyword (labels, not URLs). */
export function expandPlaceKeywordPhrases(input: {
  serviceSlug: string;
  placeLabel: string;
  cityName: string;
  seedKey?: string;
  limit?: number;
}): string[] {
  const phrases = expandServiceKeywordPhrases(input.serviceSlug);
  const seed = hashSeed(input.seedKey ?? `${input.serviceSlug}|${input.placeLabel}`);
  const rotated = rotate(phrases, seed);
  const limit = input.limit ?? 48;
  const out: string[] = [];
  const seen = new Set<string>();

  const push = (phrase: string) => {
    const key = phrase.toLowerCase();
    if (seen.has(key) || out.length >= limit) return;
    seen.add(key);
    out.push(phrase);
  };

  for (const phrase of rotated) {
    push(`${phrase} in ${input.placeLabel}`);
    push(`${phrase} in ${input.cityName}`);
    push(`${phrase} near me`);
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Theoretical doorway count if every keyword became its own URL.
 * We do NOT publish these — reported for capacity planning only.
 */
export function estimateKeywordDoorwayScale(input: {
  services: number;
  cities: number;
  areas: number;
  avgKeywordsPerService?: number;
}) {
  const kw = input.avgKeywordsPerService ?? 220;
  const serviceAreaKw = input.services * input.areas * kw;
  const serviceCityKw = input.services * input.cities * kw;
  return {
    keywordsPerServiceApprox: kw,
    serviceCityKeywordUrls: serviceCityKw,
    serviceAreaKeywordUrls: serviceAreaKw,
    combinedDoorwayUrls: serviceCityKw + serviceAreaKw,
    publishedInstead: "service×city + service×area pages only; keywords enrich those pages",
  };
}

function titleCaseWords(value: string): string {
  return value
    .split(/\s+/)
    .map((part) =>
      part.length <= 2 && part === part.toLowerCase()
        ? part.toUpperCase()
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(" ");
}

export function formatHeadTermForTitle(headTerm: string): string {
  return titleCaseWords(headTerm);
}

/**
 * Seeded phrase composer for landing enrichment.
 * Combines head term × modifier × place into natural phrases that always
 * resolve to real service / city / pricing / contact URLs — never new slugs.
 */
export function composeClusterSearchPhrases(input: {
  serviceSlug: string;
  placeLabel: string;
  cityName: string;
  placePath: string;
  cityPath: string;
  seedKey: string;
  limit?: number;
}): Array<{ name: string; href: string }> {
  const clusters = getClustersForService(input.serviceSlug);
  if (clusters.length === 0) return [];

  const limit = input.limit ?? 18;
  const seed = hashSeed(input.seedKey);
  const out: Array<{ name: string; href: string }> = [];
  const seen = new Set<string>();

  const push = (name: string, href: string) => {
    const key = name.toLowerCase();
    if (seen.has(key) || out.length >= limit) return;
    seen.add(key);
    out.push({ name, href });
  };

  for (const cluster of clusters) {
    const heads = cluster.headTerms;
    const apps = cluster.applicationModifiers;
    const quals = cluster.qualityModifiers;
    const mats = cluster.materialModifiers;
    const commercials = cluster.commercialModifiers;

    const head = heads[seed % heads.length] ?? heads[0]!;
    const head2 = heads[(seed + 3) % heads.length] ?? head;
    const app = apps[seed % Math.max(apps.length, 1)] ?? "for apartment";
    const qual = quals[(seed + 1) % Math.max(quals.length, 1)] ?? "best";
    const mat = mats[(seed + 2) % Math.max(mats.length, 1)] ?? "stainless steel";
    const commercial =
      commercials[(seed + 4) % Math.max(commercials.length, 1)] ?? "installation";
    const property =
      PROPERTY_TYPE_MODIFIERS[
        (seed + 5) % PROPERTY_TYPE_MODIFIERS.length
      ]!;

    push(`${qual} ${head} in ${input.placeLabel}`, input.placePath);
    push(`${head} ${app} in ${input.cityName}`, input.cityPath);
    push(`${head} ${commercial} in ${input.placeLabel}`, "/pricing-guide/");
    push(`${mat} ${head2} in ${input.cityName}`, input.cityPath);
    push(`${head} for ${property} in ${input.placeLabel}`, input.placePath);
    push(
      `${head} ${NEAR_ME_INTENT_MODIFIERS[seed % NEAR_ME_INTENT_MODIFIERS.length]} ${input.cityName}`,
      input.cityPath,
    );
    push(`${head2} quote in ${input.placeLabel}`, "/contact/");
    push(`${qual} ${head} ${app}`, input.placePath);
  }

  return out;
}

function rotate<T>(items: T[], seed: number): T[] {
  if (!items.length) return items;
  const start = seed % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}
