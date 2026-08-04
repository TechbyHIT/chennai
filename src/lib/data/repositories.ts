/**
 * Unified repository layer.
 * - Default DATA_SOURCE=file: sync reads from seed TypeScript data (+ expanded TN geo).
 * - DATA_SOURCE=db: sync reads from in-memory store hydrated from Postgres (+ Redis cache).
 * Call hydrateStoreFromDatabase() at process start when using db mode.
 */
import * as file from "@/lib/data/file-repositories";
import { getDataStore } from "@/lib/data/memory-store";
import type { Area, Landmark, Location } from "@/types/location";
import type { Service } from "@/types/service";

function isDbStoreActive() {
  return process.env.DATA_SOURCE === "db" && getDataStore() !== null;
}

export function getServices(options?: { publishedOnly?: boolean }): Service[] {
  if (!isDbStoreActive()) return file.getServices(options);
  const store = getDataStore()!;
  return store.services.filter((service) =>
    options?.publishedOnly ? service.publicationStatus === "published" : true,
  );
}

export function getServiceBySlug(slug: string): Service | undefined {
  if (!isDbStoreActive()) return file.getServiceBySlug(slug);
  return getDataStore()!.services.find((service) => service.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  if (!isDbStoreActive()) return file.getServiceById(id);
  return getDataStore()!.services.find((service) => service.id === id);
}

export function getLocations(options?: {
  publishedOnly?: boolean;
  servedOnly?: boolean;
}): Location[] {
  if (!isDbStoreActive()) return file.getLocations(options);
  return getDataStore()!.locations.filter((location) => {
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
  if (!isDbStoreActive()) return file.getAllGeoNodes(options);
  return getDataStore()!.geoNodes.filter((location) => {
    if (options?.types && !options.types.includes(location.locationType)) {
      return false;
    }
    return location.state === "Tamil Nadu";
  });
}

export function getLocationBySlug(slug: string): Location | undefined {
  if (!isDbStoreActive()) return file.getLocationBySlug(slug);
  return getDataStore()!.locations.find(
    (location) => location.slug === slug && location.state === "Tamil Nadu",
  );
}

export function getLocationById(id: string): Location | undefined {
  if (!isDbStoreActive()) return file.getLocationById(id);
  return (
    getDataStore()!.locations.find((location) => location.id === id) ??
    getDataStore()!.geoNodes.find((location) => location.id === id)
  );
}

export function getAreas(options?: {
  publishedOnly?: boolean;
  parentId?: string;
  curatedOnly?: boolean;
  scaledLimit?: number;
}): Area[] {
  if (!isDbStoreActive()) return file.getAreas(options);
  return getDataStore()!.areas.filter((area) => {
    if (area.state !== "Tamil Nadu") return false;
    if (options?.publishedOnly && area.publicationStatus !== "published") {
      return false;
    }
    if (options?.parentId && area.parentId !== options.parentId) return false;
    return true;
  });
}

export function countPublishedServedAreas(): number {
  if (!isDbStoreActive()) return file.countPublishedServedAreas();
  return getDataStore()!.areas.filter((area) => {
    if (area.publicationStatus !== "published") return false;
    const parent = getLocationById(area.parentId);
    return Boolean(parent?.isServed);
  }).length;
}

export function iterateAllServedAreas(): Generator<Area> {
  if (!isDbStoreActive()) return file.iterateAllServedAreas();
  return (function* () {
    for (const area of getDataStore()!.areas) {
      if (area.publicationStatus !== "published") continue;
      const parent = getLocationById(area.parentId);
      if (!parent?.isServed) continue;
      yield area;
    }
  })();
}

export function getAreaBySlug(
  locationSlug: string,
  areaSlug: string,
): Area | undefined {
  if (!isDbStoreActive()) return file.getAreaBySlug(locationSlug, areaSlug);
  const location = getLocationBySlug(locationSlug);
  if (!location) return undefined;
  return getDataStore()!.areas.find(
    (area) => area.slug === areaSlug && area.parentId === location.id,
  );
}

export function getAreaById(id: string): Area | undefined {
  if (!isDbStoreActive()) return file.getAreaById(id);
  return getDataStore()!.areas.find((area) => area.id === id);
}

export function getLandmarksForLocation(locationId: string): Landmark[] {
  if (!isDbStoreActive()) return file.getLandmarksForLocation(locationId);
  return getDataStore()!.landmarks.filter(
    (landmark) => landmark.locationId === locationId,
  );
}

export function getPropertyTypes(options?: { publishedOnly?: boolean }) {
  if (!isDbStoreActive()) return file.getPropertyTypes(options);
  return getDataStore()!.propertyTypes.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getPropertyTypeBySlug(slug: string) {
  if (!isDbStoreActive()) return file.getPropertyTypeBySlug(slug);
  return getDataStore()!.propertyTypes.find((item) => item.slug === slug);
}

export function getProblems(options?: { publishedOnly?: boolean }) {
  if (!isDbStoreActive()) return file.getProblems(options);
  return getDataStore()!.problems.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getProblemBySlug(slug: string) {
  if (!isDbStoreActive()) return file.getProblemBySlug(slug);
  return getDataStore()!.problems.find((item) => item.slug === slug);
}

export function getGuides(options?: { publishedOnly?: boolean }) {
  if (!isDbStoreActive()) return file.getGuides(options);
  return getDataStore()!.guides.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getGuideBySlug(slug: string) {
  if (!isDbStoreActive()) return file.getGuideBySlug(slug);
  return getDataStore()!.guides.find((item) => item.slug === slug);
}

export function getBlogPosts(options?: { publishedOnly?: boolean }) {
  if (!isDbStoreActive()) return file.getBlogPosts(options);
  return getDataStore()!.blogPosts.filter((item) =>
    options?.publishedOnly ? item.publicationStatus === "published" : true,
  );
}

export function getBlogPostBySlug(slug: string) {
  if (!isDbStoreActive()) return file.getBlogPostBySlug(slug);
  return getDataStore()!.blogPosts.find((item) => item.slug === slug);
}

export function getServiceCategories() {
  if (!isDbStoreActive()) return file.getServiceCategories();
  return getDataStore()!.categories;
}

export function paginate<T>(
  items: T[],
  cursor: number | undefined,
  limit: number,
): { items: T[]; nextCursor: number | null } {
  return file.paginate(items, cursor, limit);
}
