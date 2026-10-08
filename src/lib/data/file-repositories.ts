import { BLOG_POSTS } from "@/data/blog-posts";
import { GUIDES } from "@/data/guides";
import { INITIAL_AREAS } from "@/data/initial-areas";
import { INITIAL_LANDMARKS } from "@/data/initial-landmarks";
import { INITIAL_SERVICES, SERVICE_CATEGORIES } from "@/data/initial-services";
import { PROBLEMS } from "@/data/problems";
import { PROPERTY_TYPES } from "@/data/property-types";
import { buildTamilNaduLocations } from "@/lib/geo/build-tn-locations";
import { resetScaledLocalitiesCache } from "@/lib/geo/generate-scaled-localities";
import { applyServiceMedia } from "@/lib/media/catalog";
import type { Area, Landmark, Location } from "@/types/location";
import type { Service } from "@/types/service";

const TN_LOCATIONS = buildTamilNaduLocations();
const SERVICES_WITH_MEDIA = INITIAL_SERVICES.map(applyServiceMedia);

let CURATED_AREAS: Area[] | null = null;

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
  return CURATED_AREAS;
}

export function resetAreasCache() {
  CURATED_AREAS = null;
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
 * Public area listing is curated localities only.
 * Generated "Layout 12 / Ward 4" names are not published: Google was crawling
 * them into noindex shells and 5xx responses.
 */
export function getAreas(options?: {
  publishedOnly?: boolean;
  parentId?: string;
  curatedOnly?: boolean;
  /** Ignored. Kept so older callers still type-check. */
  scaledLimit?: number;
}): Area[] {
  return getCuratedAreas().filter((area) => {
    if (area.state !== "Tamil Nadu") return false;
    if (options?.publishedOnly && area.publicationStatus !== "published") {
      return false;
    }
    if (options?.parentId && area.parentId !== options.parentId) return false;
    return true;
  });
}

/** Published localities that belong to a city we actually serve. */
export function countPublishedServedAreas(): number {
  return getCuratedAreas().filter((area) => {
    if (area.publicationStatus !== "published") return false;
    const parent = getLocationById(area.parentId);
    return Boolean(parent?.isServed);
  }).length;
}

export function getAreaBySlug(
  locationSlug: string,
  areaSlug: string,
): Area | undefined {
  const location = getLocationBySlug(locationSlug);
  if (!location) return undefined;

  return getCuratedAreas().find(
    (area) => area.slug === areaSlug && area.parentId === location.id,
  );
}

export function getAreaById(id: string): Area | undefined {
  return getCuratedAreas().find((area) => area.id === id);
}

export function* iterateAllServedAreas(): Generator<Area> {
  for (const area of getCuratedAreas()) {
    const parent = getLocationById(area.parentId);
    if (!parent?.isServed) continue;
    if (area.publicationStatus !== "published") continue;
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
