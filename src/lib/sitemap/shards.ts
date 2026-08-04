import { SITE_CONFIG } from "@/config/site";
import {
  countPublishedServedAreas,
  getServices,
} from "@/lib/data/repositories";
import { STATIC_CORE_PATHS } from "@/lib/pages/static-core-paths";
import {
  getIndexablePages,
  iterateServiceAreaUrls,
} from "@/lib/pages/page-registry";
import type { PageRecord } from "@/types/page";

export type SitemapShardId =
  | "core"
  | "services"
  | "locations"
  | "service-locations"
  | "service-areas"
  | "blog"
  | "guides"
  | "images";

export const SITEMAP_SHARD_IDS: SitemapShardId[] = [
  "core",
  "services",
  "locations",
  "service-locations",
  "service-areas",
  "blog",
  "guides",
  "images",
];

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function coreIndexable(): PageRecord[] {
  return getIndexablePages();
}

function countServiceAreaUrlsFast(): number {
  const services = getServices({ publishedOnly: true }).length;
  return services * countPublishedServedAreas();
}

export function getPagesForShard(shard: SitemapShardId): PageRecord[] {
  const pages = coreIndexable();
  switch (shard) {
    case "core":
      return pages.filter((page) =>
        ["home", "about", "contact", "core"].includes(page.pageType),
      );
    case "services":
      return pages.filter((page) => page.pageType === "service");
    case "locations":
      return pages.filter(
        (page) => page.pageType === "location" || page.pageType === "area",
      );
    case "service-locations":
      return pages.filter((page) => page.pageType === "service-location");
    case "service-areas":
      return [];
    case "blog":
      return pages.filter((page) => page.pageType === "blog");
    case "guides":
      return pages.filter(
        (page) =>
          page.pageType === "guide" ||
          page.pageType === "solution" ||
          page.pageType === "property-type-service",
      );
    case "images":
      return pages.filter(
        (page) => Boolean(page.openGraphImage) && page.openGraphImage.length > 0,
      );
    default:
      return [];
  }
}

export function listSitemapShardKeys(): Array<{ id: string }> {
  const keys: Array<{ id: string }> = [];
  const max = SITE_CONFIG.maxSitemapUrlsPerFile;

  for (const shard of SITEMAP_SHARD_IDS) {
    if (shard === "core") {
      keys.push({ id: "core" });
      continue;
    }
    if (shard === "service-areas") {
      const total = countServiceAreaUrlsFast();
      const groups = Math.max(1, Math.ceil(total / max));
      for (let i = 0; i < groups; i += 1) keys.push({ id: `${shard}-${i}` });
      continue;
    }
    const pages = getPagesForShard(shard);
    const groups = chunk(pages, max);
    if (groups.length === 0) {
      keys.push({ id: `${shard}-0` });
      continue;
    }
    groups.forEach((_, index) => keys.push({ id: `${shard}-${index}` }));
  }
  return keys;
}

export function resolveShardEntries(shardKey: string): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
  images?: string[];
}> {
  const now = new Date();

  if (shardKey === "core") {
    return STATIC_CORE_PATHS.map((path) => ({
      url: `${SITE_CONFIG.url}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? ("daily" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    }));
  }

  const match = shardKey.match(/^(.*)-(\d+)$/);
  if (!match) return [];
  const shard = match[1] as SitemapShardId;
  const index = Number(match[2]);
  if (!SITEMAP_SHARD_IDS.includes(shard)) return [];

  if (shard === "service-areas") {
    const max = SITE_CONFIG.maxSitemapUrlsPerFile;
    const start = index * max;
    const end = start + max;
    const entries: Array<{
      url: string;
      lastModified: Date;
      changeFrequency: "weekly";
      priority: number;
    }> = [];
    let i = 0;
    for (const item of iterateServiceAreaUrls()) {
      if (i >= end) break;
      if (i >= start) {
        entries.push({
          url: `${SITE_CONFIG.url}${item.urlPath}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: item.priority === "high" ? 0.8 : 0.6,
        });
      }
      i += 1;
    }
    return entries;
  }

  const pages = getPagesForShard(shard);
  const groups = chunk(pages, SITE_CONFIG.maxSitemapUrlsPerFile);
  const group = groups[index] ?? [];

  return group.map((page) => {
    const lastModified = page.lastContentChangeAt
      ? new Date(page.lastContentChangeAt)
      : page.updatedAt
        ? new Date(page.updatedAt)
        : now;

    const base = {
      url: `${SITE_CONFIG.url}${page.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority:
        page.crawlPriority === "critical"
          ? 1
          : page.crawlPriority === "high"
            ? 0.8
            : 0.6,
    };

    if (shard === "images") {
      return { ...base, images: [absoluteImageUrl(page.openGraphImage)] };
    }
    return base;
  });
}

function absoluteImageUrl(src: string): string {
  return /^https?:\/\//.test(src) ? src : `${SITE_CONFIG.url}${src}`;
}
