import { and, eq, inArray, or } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db/client";
import { geoEdges, geoNodes, serviceCategories, services } from "@/db/schema";
import { BLOG_POSTS } from "@/data/blog-posts";
import { GUIDES } from "@/data/guides";
import { INITIAL_LANDMARKS } from "@/data/initial-landmarks";
import { PROBLEMS } from "@/data/problems";
import { PROPERTY_TYPES } from "@/data/property-types";
import { mapGeoNodeToArea, mapGeoNodeToLocation, mapServiceRow } from "@/lib/data/db-mappers";
import { setDataStore, type DataStore } from "@/lib/data/memory-store";
import { cacheGetJson, cacheSetJson } from "@/lib/cache/redis";
import { applyServiceMedia } from "@/lib/media/catalog";

const STORE_CACHE_KEY = "glory:data-store:v1";

export async function hydrateStoreFromDatabase(): Promise<DataStore | null> {
  if (!isDatabaseConfigured()) return null;

  const cached = await cacheGetJson<DataStore>(STORE_CACHE_KEY);
  if (cached?.services?.length) {
    setDataStore(cached);
    return cached;
  }

  const db = getDb();
  const [serviceRows, categoryRows, geoRows, edgeRows] = await Promise.all([
    db.select().from(services),
    db.select().from(serviceCategories),
    db.select().from(geoNodes),
    db.select().from(geoEdges),
  ]);

  if (!serviceRows.length || !geoRows.length) {
    return null;
  }

  const nearbyMap = new Map<string, string[]>();
  for (const edge of edgeRows) {
    if (edge.relation !== "nearby") continue;
    const list = nearbyMap.get(edge.fromId) ?? [];
    list.push(edge.toId);
    nearbyMap.set(edge.fromId, list);
  }

  const geoMapped = geoRows.map((row) => {
    const location = mapGeoNodeToLocation(row);
    location.nearbyLocationIds = nearbyMap.get(row.id) ?? [];
    return location;
  });

  const store: DataStore = {
    services: serviceRows.map(mapServiceRow).map(applyServiceMedia),
    categories: categoryRows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
    })),
    locations: geoMapped.filter(
      (node) => node.locationType === "city" || node.locationType === "town",
    ),
    geoNodes: geoMapped,
    areas: geoRows
      .filter((row) => row.type === "area" || row.type === "locality")
      .map(mapGeoNodeToArea),
    landmarks: INITIAL_LANDMARKS,
    propertyTypes: PROPERTY_TYPES,
    problems: PROBLEMS,
    guides: GUIDES,
    blogPosts: BLOG_POSTS,
  };

  setDataStore(store);
  await cacheSetJson(STORE_CACHE_KEY, store, 600);
  return store;
}

export async function loadPublishedServicesFromDb() {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.publicationStatus, "published"));
  return rows.map(mapServiceRow);
}

export async function loadCityBySlugFromDb(slug: string) {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(geoNodes)
    .where(
      and(
        eq(geoNodes.slug, slug),
        or(eq(geoNodes.type, "city"), eq(geoNodes.type, "town")),
      ),
    )
    .limit(1);
  return rows[0] ? mapGeoNodeToLocation(rows[0]) : null;
}

export async function loadAreasForParentFromDb(parentId: string) {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(geoNodes)
    .where(
      and(
        eq(geoNodes.parentId, parentId),
        inArray(geoNodes.type, ["area", "locality"]),
      ),
    );
  return rows.map(mapGeoNodeToArea);
}
