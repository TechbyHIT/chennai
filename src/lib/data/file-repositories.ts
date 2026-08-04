import { BLOG_POSTS } from "@/data/blog-posts";
import { GUIDES } from "@/data/guides";
import { INITIAL_AREAS } from "@/data/initial-areas";
import { INITIAL_LANDMARKS } from "@/data/initial-landmarks";
import { INITIAL_SERVICES, SERVICE_CATEGORIES } from "@/data/initial-services";
import { PROBLEMS } from "@/data/problems";
import { PROPERTY_TYPES } from "@/data/property-types";
import { buildTamilNaduLocations } from "@/lib/geo/build-tn-locations";
import {
  countScaledAreaTarget,
  findServedCity,
  getScaledAreasForCity,
  iterateScaledAreaRefs,
  resetScaledLocalitiesCache,
  resolveScaledArea,
} from "@/lib/geo/generate-scaled-localities";
import { applyServiceMedia } from "@/lib/media/catalog";
import type { Area, Landmark, Location } from "@/types/location";
import type { Service } from "@/types/service";

const TN_LOCATIONS = buildTamilNaduLocations();
const SERVICES_WITH_MEDIA = INITIAL_SERVICES.map(applyServiceMedia);

let CURATED_AREAS: Area[] | null = null;
let CURATED_KEYS: Set<string> | null = null;

function getCuratedAreas(): Area[] {
  if (CURATED_AREAS) return CURATED_AREAS;
  const seen = new Set<string>();
  const merged: Area[] = [];
  for (const area of INITIAL_AREAS) {
    const key = `${area.parentId}::${area.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(area);
  }
  CURATED_AREAS = merged;
  CURATED_KEYS = seen;
  return CURATED_AREAS;
}

function getCuratedKeys(): Set<string> {
  getCuratedAreas();
  return CURATED_KEYS ?? new Set();
}

export function resetAreasCache() {
  CURATED_AREAS = null;
  CURATED_KEYS = null;
  resetScaledLocalitiesCache();
}

export function getServices(options?: { publishedOnly?: boolean }): Service[] {
  const publishedOnly = options?.publishedOnly ?? false;
  return SERVICES_WITH_MEDIA.filter((service) =>
    publishedOnly ? service.publicationStatus === "published" : true,
  );
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES_WITH_MEDIA.find((service) => service.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES_WITH_MEDIA.find((service) => service.id === id);
}

export function getLocations(options?: {
  publishedOnly?: boolean;
  servedOnly?: boolean;
}): Location[] {
  return TN_LOCATIONS.filter((location) => {
    if (location.locationType === "state" || location.locationType === "district") {
      return false;
    }
    if (options?.publishedOnly && location.publicationStatus !== "published") {
      return false;
    }
    if (options?.servedOnly && !location.isServed) return false;
    return location.state === "Tamil Nadu";
  });
}

export function getAllGeoNodes(options?: {
  types?: Location["locationType"][];
}): Location[] {
  return TN_LOCATIONS.filter((location) => {
    if (options?.types && !options.types.includes(location.locationType)) {
      return false;
    }
    return location.state === "Tamil Nadu";
  });
}

export function getLocationBySlug(slug: string): Location | undefined {
  return TN_LOCATIONS.find(
    (location) =>
      location.slug === slug &&
      location.state === "Tamil Nadu" &&
      (location.locationType === "city" || location.locationType === "town"),
  );
}

export function getLocationById(id: string): Location | undefined {
  return TN_LOCATIONS.find((location) => location.id === id);
}

/**
 * Area listing.
 * - With parentId: curated + scaled localities for that city (lazy).
 * - Without parentId: curated only (avoids loading ~525k areas into RAM).
 * - curatedOnly: curated INITIAL areas only.
 */
export function getAreas(options?: {
  publishedOnly?: boolean;
  parentId?: string;
  curatedOnly?: boolean;
  scaledLimit?: number;
}): Area[] {
  const curated = getCuratedAreas().filter((area) => {
    if (area.state !== "Tamil Nadu") return false;
    if (options?.publishedOnly && area.publicationStatus !== "published") {
      return false;
    }
    if (options?.parentId && area.parentId !== options.parentId) return false;
    return true;
  });

  if (options?.curatedOnly || !options?.parentId) {
    return curated;
  }

  const parent = getLocationById(options.parentId);
  if (!parent?.isServed) return curated;

  const city = findServedCity(parent.slug);
  if (!city) return curated;

  const scaled = getScaledAreasForCity(city, getCuratedKeys()).filter((area) => {
    if (options.publishedOnly && area.publicationStatus !== "published") {
      return false;
    }
    return true;
  });

  const limited =
    typeof options.scaledLimit === "number"
      ? scaled.slice(0, options.scaledLimit)
      : scaled;

  return [...curated, ...limited];
}

/** Curated + scaled served locality count for page-capacity math. */
export function countPublishedServedAreas(): number {
  const curatedServed = getCuratedAreas().filter((area) => {
    if (area.publicationStatus !== "published") return false;
    const parent = getLocationById(area.parentId);
    return Boolean(parent?.isServed);
  }).length;
  return curatedServed + countScaledAreaTarget();
}

export function getAreaBySlug(
  locationSlug: string,
  areaSlug: string,
): Area | undefined {
  const location = getLocationBySlug(locationSlug);
  if (!location) return undefined;

  const curated = getCuratedAreas().find(
    (area) => area.slug === areaSlug && area.parentId === location.id,
  );
  if (curated) return curated;

  return resolveScaledArea(locationSlug, areaSlug, getCuratedKeys());
}

export function getAreaById(id: string): Area | undefined {
  const curated = getCuratedAreas().find((area) => area.id === id);
  if (curated) return curated;

  // Scaled ids: area-scale-{citySlug}-{areaSlug}
  const match = /^area-scale-([a-z0-9-]+)-(.+)$/.exec(id);
  if (!match) return undefined;
  const citySlug = match[1];
  const areaSlug = match[2];
  if (!citySlug || !areaSlug) return undefined;
  return resolveScaledArea(citySlug, areaSlug, getCuratedKeys());
}

export function* iterateAllServedAreas(): Generator<Area> {
  const curatedKeys = getCuratedKeys();
  for (const area of getCuratedAreas()) {
    const parent = getLocationById(area.parentId);
    if (!parent?.isServed) continue;
    if (area.publicationStatus !== "published") continue;
    yield area;
  }
  for (const { area } of iterateScaledAreaRefs(curatedKeys)) {
    yield area;
  }
}

export function getLandmarksForLocation(locationId: string): Landmark[] {
  return INITIAL_LANDMARKS.filter((landmark) => landmark.locationId === locationId);
}

export function getPropertyTypes(options?: { publishedOnly?: boolean }) {
  return PROPERTY_TYPES.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getPropertyTypeBySlug(slug: string) {
  return PROPERTY_TYPES.find((item) => item.slug === slug);
}

export function getProblems(options?: { publishedOnly?: boolean }) {
  return PROBLEMS.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getProblemBySlug(slug: string) {
  return PROBLEMS.find((item) => item.slug === slug);
}

export function getGuides(options?: { publishedOnly?: boolean }) {
  return GUIDES.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getGuideBySlug(slug: string) {
  return GUIDES.find((item) => item.slug === slug);
}

export function getBlogPosts(options?: { publishedOnly?: boolean }) {
  return BLOG_POSTS.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((item) => item.slug === slug);
}

export function getServiceCategories() {
  return SERVICE_CATEGORIES;
}

export function paginate<T>(
  items: T[],
  cursor: number | undefined,
  limit: number,
): { items: T[]; nextCursor: number | null } {
  const start = cursor ?? 0;
  const slice = items.slice(start, start + limit);
  const nextCursor = start + limit < items.length ? start + limit : null;
  return { items: slice, nextCursor };
}
