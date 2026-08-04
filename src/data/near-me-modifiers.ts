/**
 * "Near me" local-intent modifiers for programmatic SEO.
 *
 * IMPORTANT:
 * These modifiers NEVER become their own URLs (doorway-page risk).
 * They enrich existing real pages: seeded search-variant phrases and FAQs
 * on service, city-service and area-service pages, all linking to real routes.
 */

export type NearMeVariant = { name: string; href: string };

export const NEAR_ME_VARIATIONS = [
  "near me",
  "nearby",
  "closest to me",
  "nearest",
  "around me",
  "close to me",
  "close by",
  "in my area",
  "in my locality",
  "in my city",
  "around my location",
  "around my home",
] as const;

export const QUALITY_INTENT_PREFIXES = [
  "best",
  "top",
  "top rated",
  "trusted",
  "recommended",
  "verified",
  "certified",
  "professional",
  "expert",
  "premium",
  "affordable",
  "local",
  "most trusted",
] as const;

export const BUSINESS_INTENT_SUFFIXES = [
  "company",
  "dealer",
  "supplier",
  "contractor",
  "installer",
  "service provider",
  "experts",
  "professionals",
  "specialists",
  "technicians",
  "installation team",
] as const;

export const AVAILABILITY_PHRASES = [
  "available today",
  "available now",
  "same day service",
  "quick response",
  "fast installation",
  "express installation",
  "today installation",
  "immediate service",
] as const;

export const ACTION_PHRASES = [
  "get quote",
  "free estimate",
  "free inspection",
  "schedule visit",
  "book installation",
  "request callback",
  "contact experts",
  "book now",
] as const;

export const PROPERTY_PHRASES = [
  "near my apartment",
  "near my office",
  "near my home",
  "for my villa",
  "for my flat",
  "for gated community",
  "for high rise",
  "for independent house",
  "for my society",
] as const;

export const LOCAL_AREA_PHRASES = [
  "in my colony",
  "in my society",
  "in my apartment complex",
  "in my layout",
  "in my street",
  "in my nagar",
  "in my extension",
  "in my township",
] as const;

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(items: readonly T[], seed: number, offset: number): T {
  // Arrays passed here are non-empty constants, so modulo indexing always hits.
  return items[(seed + offset * 7) % items.length] as T;
}

export type NearMeVariantInput = {
  serviceName: string;
  serviceShortName: string;
  cityName: string;
  placeLabel: string;
  /** Path of the current landing page (area or city). */
  placePath: string;
  /** Path of the parent city-service page. */
  cityPath: string;
  seedKey: string;
};

/**
 * Compose a seeded, page-unique set of natural near-me search phrases.
 * Each phrase links to a real page (the landing itself, its city parent,
 * pricing guide or contact) — never a modifier-only URL.
 */
export function composeNearMeVariants(input: NearMeVariantInput): NearMeVariant[] {
  const service = input.serviceName.toLowerCase();
  const short = input.serviceShortName.toLowerCase();
  const seed = hashSeed(input.seedKey);

  const variants: NearMeVariant[] = [
    {
      name: `${pick(QUALITY_INTENT_PREFIXES, seed, 1)} ${service} near me`,
      href: input.placePath,
    },
    {
      name: `${pick(QUALITY_INTENT_PREFIXES, seed, 2)} ${short} near me in ${input.cityName}`,
      href: input.cityPath,
    },
    {
      name: `${service} ${pick(BUSINESS_INTENT_SUFFIXES, seed, 3)} near me`,
      href: input.cityPath,
    },
    {
      name: `${short} ${pick(BUSINESS_INTENT_SUFFIXES, seed, 4)} in ${input.placeLabel}`,
      href: input.placePath,
    },
    {
      name: `${service} ${pick(NEAR_ME_VARIATIONS, seed, 5)}`,
      href: input.placePath,
    },
    {
      name: `${short} ${pick(NEAR_ME_VARIATIONS, seed, 6)} in ${input.cityName}`,
      href: input.cityPath,
    },
    {
      name: `${service} ${pick(AVAILABILITY_PHRASES, seed, 7)} in ${input.placeLabel}`,
      href: input.placePath,
    },
    {
      name: `${pick(ACTION_PHRASES, seed, 8)} for ${short} in ${input.placeLabel}`,
      href: "/contact/",
    },
    {
      name: `${service} ${pick(PROPERTY_PHRASES, seed, 9)}`,
      href: input.placePath,
    },
    {
      name: `${short} ${pick(LOCAL_AREA_PHRASES, seed, 10)} in ${input.placeLabel}`,
      href: input.placePath,
    },
    {
      name: `${service} price near me in ${input.cityName}`,
      href: "/pricing-guide/",
    },
    {
      name: `${pick(QUALITY_INTENT_PREFIXES, seed, 11)} ${service} ${pick(BUSINESS_INTENT_SUFFIXES, seed, 12)} near me`,
      href: input.cityPath,
    },
  ];

  const seen = new Set<string>();
  return variants.filter((item) => {
    const key = item.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
