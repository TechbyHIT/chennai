import { SITEMAP_CONFIG } from "@/config/sitemap";
import { SITE_CONFIG } from "@/config/site";
import { CHENNAI_PRIORITY_AREA_SLUGS } from "@/data/chennai-priority-areas";
import { COIMBATORE_PRIORITY_AREA_SLUGS } from "@/data/coimbatore-priority-areas";
import { STATIC_CORE_PATHS } from "@/lib/pages/static-core-paths";
import { getIndexablePages } from "@/lib/pages/page-registry";
import {
  getAreaBySlug,
  getAreas,
  getLocationById,
  getLocations,
  getServices,
} from "@/lib/data/repositories";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import { createServiceAreaPage } from "@/lib/pages/create-page-record";
import {
  dedupeSitemapEntries,
  normalizeSitemapEntry,
  type SitemapUrlEntry,
} from "@/lib/sitemap/xml";
import { sitemapShardUrl, toAbsoluteHttpsUrl } from "@/lib/sitemap/absolute-url";
import type { PageRecord } from "@/types/page";

export type SitemapShardId =
  | "core"
  | "services"
  | "locations"
  | "areas"
  | "service-locations"
  | "priority-areas"
  | "blog"
  | "guides";

export const SITEMAP_SHARD_IDS: SitemapShardId[] = [
  "core",
  "services",
  "locations",
  "areas",
  "service-locations",
  ...(SITEMAP_CONFIG.includePriorityServiceAreas
    ? (["priority-areas"] as const)
    : []),
  "blog",
  "guides",
];

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function highIntentIndexable(): PageRecord[] {
  const allowed = new Set<string>(SITEMAP_CONFIG.highIntentPageTypes);
  return getIndexablePages().filter((page) => allowed.has(page.pageType));
}

function contentLastmod(page: PageRecord): Date {
  const raw = page.lastContentChangeAt ?? page.updatedAt ?? page.publishedAt;
  if (!raw) return new Date();
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function pageToEntry(page: PageRecord): SitemapUrlEntry {
  return normalizeSitemapEntry({
    url: page.canonicalUrl || `${SITE_CONFIG.url}${page.path}`,
    lastModified: contentLastmod(page),
    changeFrequency: "weekly",
    priority:
      page.crawlPriority === "critical"
        ? 1
        : page.crawlPriority === "high"
          ? 0.8
          : page.crawlPriority === "medium"
            ? 0.6
            : 0.4,
    images: page.openGraphImage?.startsWith("/images/homepage/")
      ? [toAbsoluteHttpsUrl(page.openGraphImage)]
      : undefined,
  });
}

/** Curated locality service×area landings (not the 9M scaled graph). */
export function getPriorityServiceAreaPages(): PageRecord[] {
  if (!SITEMAP_CONFIG.includePriorityServiceAreas) return [];

  const services = getServices({ publishedOnly: true });
  const pages: PageRecord[] = [];

  for (const area of getAreas({ publishedOnly: true, curatedOnly: true })) {
    if (area.publicationStatus !== "published" || !area.isServed) continue;
    const city = getLocationById(area.parentId);
    if (
      !city ||
      !city.isServed ||
      city.publicationStatus !== "published"
    ) {
      continue;
    }

    for (const service of services) {
      const page = createServiceAreaPage(service, city, area);
      if (isPageIndexable(page)) pages.push(page);
    }
  }

  // Keep well-known Chennai / Coimbatore corridors even if a seed file
  // omitted them from INITIAL_AREAS.
  const extraCities = getLocations({
    publishedOnly: true,
    servedOnly: true,
  }).filter((city) => city.slug === "chennai" || city.slug === "coimbatore");

  for (const city of extraCities) {
    const slugs =
      city.slug === "chennai"
        ? CHENNAI_PRIORITY_AREA_SLUGS
        : COIMBATORE_PRIORITY_AREA_SLUGS;

    for (const areaSlug of slugs) {
      const area = getAreaBySlug(city.slug, areaSlug);
      if (!area || area.publicationStatus !== "published") continue;
      for (const service of services) {
        const page = createServiceAreaPage(service, city, area);
        if (isPageIndexable(page)) pages.push(page);
      }
    }
  }

  return pages;
}

export function getPagesForShard(shard: SitemapShardId): PageRecord[] {
  const pages = highIntentIndexable();
  switch (shard) {
    case "core":
      return [];
    case "services":
      return pages.filter((page) => page.pageType === "service");
    case "locations":
      return pages.filter((page) => page.pageType === "location");
    case "areas":
      return pages.filter((page) => page.pageType === "area");
    case "service-locations":
      return pages.filter((page) => page.pageType === "service-location");
    case "priority-areas":
      return getPriorityServiceAreaPages();
    case "blog":
      return pages.filter((page) => page.pageType === "blog");
    case "guides":
      return pages.filter(
        (page) =>
          page.pageType === "guide" ||
          page.pageType === "solution" ||
          page.pageType === "property-type-service",
      );
    default:
      return [];
  }
}

export function listSitemapShardKeys(): Array<{ id: string }> {
  const keys: Array<{ id: string }> = [];
  const max = SITEMAP_CONFIG.maxUrlsPerFile;

  for (const shard of SITEMAP_SHARD_IDS) {
    if (shard === "core") {
      keys.push({ id: "core" });
      continue;
    }
    const pages = getPagesForShard(shard);
    const groups = chunk(pages, max);
    if (groups.length === 0) continue;
    groups.forEach((_, index) => keys.push({ id: `${shard}-${index}` }));
  }
  return keys;
}

export function resolveShardEntries(shardKey: string): SitemapUrlEntry[] {
  const key = shardKey.replace(/\.xml$/i, "");
  const revision = new Date(SITE_CONFIG.contentRevision);

  if (key === "core") {
    return dedupeSitemapEntries(
      STATIC_CORE_PATHS.map((path) =>
        normalizeSitemapEntry({
          url: toAbsoluteHttpsUrl(path),
          lastModified: revision,
          changeFrequency: path === "/" ? "daily" : "monthly",
          priority: path === "/" ? 1 : 0.7,
        }),
      ),
    );
  }

  const match = key.match(/^(.*)-(\d+)$/);
  if (!match) return [];
  const shard = match[1] as SitemapShardId;
  const index = Number(match[2]);
  if (!SITEMAP_SHARD_IDS.includes(shard)) return [];

  const pages = getPagesForShard(shard);
  const groups = chunk(pages, SITEMAP_CONFIG.maxUrlsPerFile);
  const group = groups[index] ?? [];
  return dedupeSitemapEntries(group.map(pageToEntry));
}

export function buildSitemapIndexEntries(): Array<{ loc: string; lastmod: string }> {
  const lastmod = SITE_CONFIG.contentRevision;
  return listSitemapShardKeys().map(({ id }) => ({
    loc: sitemapShardUrl(id),
    lastmod,
  }));
}

/** Total high-intent URLs currently eligible for sitemaps. */
export function countHighIntentSitemapUrls(): number {
  let total = STATIC_CORE_PATHS.length;
  for (const shard of SITEMAP_SHARD_IDS) {
    if (shard === "core") continue;
    total += getPagesForShard(shard).length;
  }
  return total;
}
