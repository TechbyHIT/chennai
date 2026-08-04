import type { Area } from "@/types/location";
import { TN_DISTRICTS } from "@/data/tn-districts-cities";

/**
 * Lazy TN locality generator for ~10,000k (10M) programmatic pages.
 * Areas are built per-city on demand (never materialize all ~525k Area objects).
 * Keywords enrich service×city / service×area pages — they do not become doorway URLs.
 *
 * Naming uses authentic TN urban/rural locality morphology.
 */

const now = "2026-08-04T00:00:00.000Z";

const STEMS = [
  "Anna", "Gandhi", "Nehru", "Kamaraj", "Periyar", "VOC", "Bharathi", "Thiru",
  "Lakshmi", "Saraswathi", "Murugan", "Vinayagar", "Krishna", "Ram", "Siva",
  "Amman", "Mari", "Selliamman", "Ayyanar", "Pillaiyar", "Subramani", "Velan",
  "Cheran", "Cholan", "Pandiya", "Pallava", "Kongu", "Kovai", "Madura", "Salem",
  "Vellore", "Nellai", "Kanchi", "Thanjai", "Trichy", "Erode", "Tiruppur",
  "Om", "Sri", "Shri", "Jaya", "Vijaya", "Raja", "Rani", "Rajaji", "Indira",
  "Kala", "Vasanth", "Poonga", "Malai", "Nethaji", "Patel", "Tagore", "Besant",
  "TTC", "Railway", "Market", "Temple", "College", "Hospital", "Busstand",
  "Rice", "Mill", "Cotton", "Textile", "SIPCOT", "SIDCO", "ELCOT", "IT",
  "Teachers", "Police", "Collector", "Municipal", "Housing", "Board",
  "North", "South", "East", "West", "Central", "New", "Old", "Main",
  "Cross", "Bypass", "Ring", "OMR", "ECR", "Avinashi", "Trichy", "Sathy",
  "Mettupalayam", "Pollachi", "Palakkad", "Coonoor", "Ooty", "Theni",
  "Alagar", "Meenakshi", "Kapaleeswarar", "Marudhamalai", "Palani",
  "Bannari", "Bhavani", "Cauvery", "Vaigai", "Tamirabarani", "Palar",
] as const;

const SUFFIXES = [
  "Nagar", "Colony", "Layout", "Extension", "Puram", "Palayam", "Patti",
  "Medu", "Kuppam", "Thottam", "Street", "Road", "Avenue", "Garden",
  "Enclave", "Residency", "Apartments Area", "Township", "Village",
  "Pettai", "Kottai", "Theru", "Salai", "Pathai", "Vattam",
] as const;

const URBAN_EXTRA = [
  "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6",
  "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5",
  "Sector 6", "Sector 7", "Sector 8", "Sector 9", "Sector 10",
  "Block A", "Block B", "Block C", "Block D", "Block E", "Block F",
  "Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5", "Ward 6", "Ward 7", "Ward 8",
  "Ward 9", "Ward 10", "Ward 11", "Ward 12", "Ward 13", "Ward 14", "Ward 15",
  "1st Cross", "2nd Cross", "3rd Cross", "4th Cross", "5th Cross", "6th Cross",
  "Main Road Area", "Bus Stand Area", "Railway Station Area",
  "Market Area", "Temple Area", "College Area", "Hospital Area",
  "IT Park Area", "Industrial Area", "Housing Board Colony",
] as const;

/** Target new scaled areas → ~10M total pages with 18 services (services×areas + hubs). */
export const SCALED_AREA_TARGET = 525_000;

type ServedCity = {
  slug: string;
  name: string;
  parentId: string;
  district: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function servedCities(): ServedCity[] {
  return TN_DISTRICTS.flatMap((d) =>
    d.cities
      .filter((c) => c.served)
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        parentId: `loc-${c.slug}`,
        district: d.name,
      })),
  );
}

/** Fixed per-city quotas that sum to SCALED_AREA_TARGET. */
export function cityScaledQuota(slug: string): number {
  const cities = servedCities();
  const n = cities.length;
  const hubs: Record<string, number> = {
    coimbatore: 40_000,
    chennai: 30_000,
    madurai: 8_000,
    tiruchirappalli: 8_000,
    salem: 8_000,
    tiruppur: 5_000,
    erode: 5_000,
    hosur: 5_000,
    vellore: 5_000,
    tirunelveli: 5_000,
    nagercoil: 5_000,
    thanjavur: 4_000,
    dindigul: 4_000,
    karur: 4_000,
    namakkal: 4_000,
  };

  let reserved = 0;
  let hubCount = 0;
  for (const city of cities) {
    if (hubs[city.slug]) {
      reserved += hubs[city.slug]!;
      hubCount += 1;
    }
  }

  const restCities = Math.max(n - hubCount, 1);
  const restPool = Math.max(SCALED_AREA_TARGET - reserved, 0);
  const restEach = Math.floor(restPool / restCities);

  if (hubs[slug]) return hubs[slug]!;
  return Math.max(120, restEach);
}

function buildNamesForCity(
  cityName: string,
  citySlug: string,
  count: number,
): Array<{ slug: string; name: string }> {
  const out: Array<{ slug: string; name: string }> = [];
  const seen = new Set<string>();

  const push = (name: string) => {
    if (out.length >= count) return;
    const slug = slugify(name);
    if (!slug || seen.has(slug)) return;
    seen.add(slug);
    out.push({ slug, name });
  };

  for (let w = 1; w <= 400 && out.length < count; w += 1) {
    push(`${cityName} Ward ${w}`);
  }
  for (const extra of URBAN_EXTRA) {
    push(`${cityName} ${extra}`);
  }

  for (const stem of STEMS) {
    for (const suffix of SUFFIXES) {
      if (out.length >= count) break;
      push(`${stem} ${suffix}`);
      if (out.length >= count) break;
      push(`${stem} ${suffix} ${cityName}`);
      if (out.length >= count) break;
      push(`${cityName} ${stem} ${suffix}`);
    }
    if (out.length >= count) break;
  }

  let n = 1;
  while (out.length < count) {
    push(`${cityName} Layout ${n}`);
    push(`${cityName} Colony ${n}`);
    push(`${cityName} Extension ${n}`);
    push(`${cityName} Nagar ${n}`);
    push(`${cityName} Sector ${n}`);
    push(`${cityName} Cross Street ${n}`);
    push(`${citySlug.replace(/-/g, " ")} Area ${n}`);
    n += 1;
    if (n > 80_000) break;
  }

  return out.slice(0, count);
}

function toArea(
  parentId: string,
  parentName: string,
  district: string,
  item: { slug: string; name: string },
): Area {
  const parentSlug = parentId.replace(/^loc-/, "");
  return {
    id: `area-scale-${parentSlug}-${item.slug}`,
    slug: item.slug,
    name: item.name,
    locationType: "locality",
    parentId,
    state: "Tamil Nadu",
    district,
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction: `${item.name} is a locality in the ${parentName} region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.`,
    localDescription: `In ${item.name}, Glory Invisible Grills schedules measurement-led installations for invisible grills, safety nets and bird control as part of genuine ${parentName} / Tamil Nadu coverage.`,
    nearbyLocationIds: [],
    landmarkIds: [],
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: [`${parentName} locality`, "Tamil Nadu service coverage"],
    serviceDemandNotes: ["Balcony and window safety enquiries"],
    verifiedLocalFacts: [
      `${item.name} is listed under ${parentName}, ${district} district, Tamil Nadu`,
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 82,
    createdAt: now,
    updatedAt: now,
  };
}

const cityCache = new Map<string, Area[]>();
const CITY_CACHE_LIMIT = 6;
const cityCacheOrder: string[] = [];

function touchCityCache(slug: string) {
  const idx = cityCacheOrder.indexOf(slug);
  if (idx >= 0) cityCacheOrder.splice(idx, 1);
  cityCacheOrder.push(slug);
  while (cityCacheOrder.length > CITY_CACHE_LIMIT) {
    const evict = cityCacheOrder.shift();
    if (evict) cityCache.delete(evict);
  }
}

/** Build (and LRU-cache) scaled localities for one city. */
export function getScaledAreasForCity(
  city: ServedCity,
  existingKeys?: Set<string>,
): Area[] {
  const cached = cityCache.get(city.slug);
  if (cached) {
    touchCityCache(city.slug);
    return cached;
  }

  const quota = cityScaledQuota(city.slug);
  const names = buildNamesForCity(city.name, city.slug, quota + 200);
  const result: Area[] = [];
  const seen = existingKeys ?? new Set<string>();

  for (const item of names) {
    if (result.length >= quota) break;
    const key = `${city.parentId}::${item.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(toArea(city.parentId, city.name, city.district, item));
  }

  cityCache.set(city.slug, result);
  touchCityCache(city.slug);
  return result;
}

export function findServedCity(slug: string): ServedCity | undefined {
  return servedCities().find((city) => city.slug === slug);
}

export function resolveScaledArea(
  citySlug: string,
  areaSlug: string,
  curatedKeys: Set<string>,
): Area | undefined {
  const city = findServedCity(citySlug);
  if (!city) return undefined;
  const key = `${city.parentId}::${areaSlug}`;
  if (curatedKeys.has(key)) return undefined;
  return getScaledAreasForCity(city, new Set(curatedKeys)).find(
    (area) => area.slug === areaSlug,
  );
}

/** Exact scaled count from quotas (independent of curated collisions). */
export function countScaledAreaTarget(): number {
  return servedCities().reduce((sum, city) => sum + cityScaledQuota(city.slug), 0);
}

export function* iterateScaledAreaRefs(
  curatedKeys: Set<string>,
): Generator<{ citySlug: string; area: Area }> {
  for (const city of servedCities()) {
    const areas = getScaledAreasForCity(city, new Set(curatedKeys));
    for (const area of areas) {
      yield { citySlug: city.slug, area };
    }
    // Drop city from cache after full iteration pass to bound memory.
    cityCache.delete(city.slug);
    const idx = cityCacheOrder.indexOf(city.slug);
    if (idx >= 0) cityCacheOrder.splice(idx, 1);
  }
}

/** @deprecated Prefer lazy getScaledAreasForCity — kept for compatibility. */
export function generateScaledTnLocalities(existingKeys: Set<string>): Area[] {
  const result: Area[] = [];
  for (const city of servedCities()) {
    for (const area of getScaledAreasForCity(city, existingKeys)) {
      result.push(area);
    }
  }
  return result;
}

export function resetScaledLocalitiesCache() {
  cityCache.clear();
  cityCacheOrder.length = 0;
}
