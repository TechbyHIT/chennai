/**
 * Chennai + the towns within roughly 150 km. This is the primary SEO focus:
 * ordering, crawl priority, locality budgets, homepage links and schema all
 * lean on this list so the emphasis cannot drift between files.
 *
 * Every slug must be a served city in `src/data/tn-districts-cities.ts`.
 */
export const CHENNAI_HUB_SLUG = "chennai";

/** Belt towns in display order (closest first). */
export const CHENNAI_BELT_SLUGS: readonly string[] = [
  "tambaram",
  "avadi",
  "poonamallee",
  "sriperumbudur",
  "guduvancheri",
  "tiruvallur",
  "chengalpattu",
  "mahabalipuram",
  "arakkonam",
  "kanchipuram",
  "tiruttani",
  "vandavasi",
  "ranipet",
  "cheyyar",
  "arcot",
  "tindivanam",
  "arani",
  "vellore",
];

export const CHENNAI_REGION_SLUGS: readonly string[] = [
  CHENNAI_HUB_SLUG,
  ...CHENNAI_BELT_SLUGS,
];

const REGION_SET = new Set(CHENNAI_REGION_SLUGS);
const REGION_LOCATION_IDS = new Set(CHENNAI_REGION_SLUGS.map((slug) => `loc-${slug}`));

export function isChennaiRegion(citySlug: string): boolean {
  return REGION_SET.has(citySlug);
}

/** True for a town in the belt (not Chennai itself). */
export function isChennaiBeltTown(citySlug: string): boolean {
  return citySlug !== CHENNAI_HUB_SLUG && REGION_SET.has(citySlug);
}

export function isChennaiRegionLocationId(locationId: string): boolean {
  return REGION_LOCATION_IDS.has(locationId);
}

/** Stable sort: Chennai, then the belt in order, then everything else as-is. */
export function sortChennaiRegionFirst<T extends { slug: string }>(items: T[]): T[] {
  const rank = (slug: string) => {
    const index = CHENNAI_REGION_SLUGS.indexOf(slug);
    return index === -1 ? CHENNAI_REGION_SLUGS.length : index;
  };
  return items
    .map((item, order) => ({ item, order }))
    .sort((a, b) => rank(a.item.slug) - rank(b.item.slug) || a.order - b.order)
    .map(({ item }) => item);
}

/** Human label for the footprint, used in copy and FAQs. */
export const CHENNAI_REGION_LABEL = "Chennai and the towns within 150 km";
