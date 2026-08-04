import {
  getAreas,
  getBlogPosts,
  getGuides,
  getLocationById,
  getLocationBySlug,
  getLocations,
  getProblems,
  getPropertyTypes,
  getServiceBySlug,
  getServices,
  getAreaBySlug,
  countPublishedServedAreas,
  iterateAllServedAreas,
  paginate,
} from "@/lib/data/repositories";
import {
  createAreaPage,
  createBlogPage,
  createGuidePage,
  createLocationPage,
  createPropertyTypeServicePage,
  createServiceAreaPage,
  createServiceLocationPage,
  createServicePage,
  createSolutionPage,
} from "@/lib/pages/create-page-record";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import {
  buildServiceStateCityAreaPath,
  STATE_SLUG,
} from "@/lib/routing/service-location-urls";
import type { PageRecord, PageType } from "@/types/page";

/**
 * Core registry = curated hubs only (not all scaled localities).
 * Scaled service×area + area hubs resolve on demand for ~10M capacity.
 */
let cachedCorePages: PageRecord[] | null = null;
let cachedCoreByPath: Map<string, PageRecord> | null = null;

export function generateCorePageRecords(): PageRecord[] {
  const pages: PageRecord[] = [];
  const services = getServices({ publishedOnly: true });
  const locations = getLocations({ publishedOnly: true, servedOnly: true });
  // Curated area hubs only — scaled localities resolve on demand.
  const areas = getAreas({ publishedOnly: true, curatedOnly: true });

  for (const service of services) {
    pages.push(createServicePage(service));
  }

  for (const location of locations) {
    pages.push(createLocationPage(location));
  }

  for (const area of areas) {
    const parent = getLocationById(area.parentId);
    if (!parent || !parent.isServed) continue;
    pages.push(createAreaPage(parent, area));
  }

  for (const location of locations) {
    for (const service of services) {
      pages.push(createServiceLocationPage(service, location));
    }
  }

  for (const problem of getProblems({ publishedOnly: true })) {
    pages.push(createSolutionPage(problem));
  }

  for (const propertyType of getPropertyTypes({ publishedOnly: true })) {
    for (const service of services) {
      pages.push(createPropertyTypeServicePage(propertyType, service));
    }
  }

  for (const guide of getGuides({ publishedOnly: true })) {
    pages.push(createGuidePage(guide));
  }

  for (const post of getBlogPosts({ publishedOnly: true })) {
    pages.push(createBlogPage(post));
  }

  return pages;
}

/** Optional materialization with a service×area limit (tests / admin samples). */
export function generateAllPageRecords(options?: {
  includeServiceArea?: boolean;
  serviceAreaLimit?: number;
}): PageRecord[] {
  const pages = generateCorePageRecords();
  if (options?.includeServiceArea === false) return pages;

  const services = getServices({ publishedOnly: true });
  let count = 0;
  const limit = options?.serviceAreaLimit ?? Number.POSITIVE_INFINITY;

  for (const area of iterateAllServedAreas()) {
    const parent = getLocationById(area.parentId);
    if (!parent || !parent.isServed) continue;
    for (const service of services) {
      if (count >= limit) return pages;
      pages.push(createServiceAreaPage(service, parent, area));
      count += 1;
    }
  }
  return pages;
}

function getCoreRegistry(): PageRecord[] {
  if (!cachedCorePages) {
    cachedCorePages = generateCorePageRecords();
  }
  return cachedCorePages;
}

function getCoreByPath(): Map<string, PageRecord> {
  if (!cachedCoreByPath) {
    cachedCoreByPath = new Map(
      getCoreRegistry().map((page) => [page.path, page]),
    );
  }
  return cachedCoreByPath;
}

export function getPageRegistry(): PageRecord[] {
  return getCoreRegistry();
}

export function resetPageRegistryCache(): void {
  cachedCorePages = null;
  cachedCoreByPath = null;
}

function resolveServiceAreaPage(path: string): PageRecord | undefined {
  const parts = path.replace(/^\/|\/$/g, "").split("/");
  if (parts.length !== 4) return undefined;
  const serviceSlug = parts[0];
  const state = parts[1];
  const citySlug = parts[2];
  const areaSlug = parts[3];
  if (!serviceSlug || !state || !citySlug || !areaSlug) return undefined;
  if (state !== STATE_SLUG) return undefined;

  const service = getServiceBySlug(serviceSlug);
  const city = getLocationBySlug(citySlug);
  const area = city ? getAreaBySlug(citySlug, areaSlug) : undefined;
  if (!service || !city || !area || !city.isServed) return undefined;
  if (service.publicationStatus !== "published") return undefined;
  if (area.publicationStatus !== "published") return undefined;

  return createServiceAreaPage(service, city, area);
}

function resolveScaledAreaHubPage(path: string): PageRecord | undefined {
  const parts = path.replace(/^\/|\/$/g, "").split("/");
  if (parts.length !== 3 || parts[0] !== "locations") return undefined;
  const citySlug = parts[1];
  const areaSlug = parts[2];
  if (!citySlug || !areaSlug) return undefined;
  const city = getLocationBySlug(citySlug);
  const area = city ? getAreaBySlug(citySlug, areaSlug) : undefined;
  if (!city || !area || !city.isServed) return undefined;
  if (area.publicationStatus !== "published") return undefined;
  return createAreaPage(city, area);
}

export function getPageByPath(path: string): PageRecord | undefined {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return (
    getCoreByPath().get(normalized) ??
    resolveServiceAreaPage(normalized) ??
    resolveScaledAreaHubPage(normalized)
  );
}

export function getPagesByType(pageType: PageType): PageRecord[] {
  if (pageType === "service-area") return [];
  return getCoreRegistry().filter((page) => page.pageType === pageType);
}

export function getPublishedPages(): PageRecord[] {
  return getCoreRegistry().filter(
    (page) => page.publicationStatus === "published",
  );
}

export function getIndexablePages(): PageRecord[] {
  return getCoreRegistry().filter((page) => isPageIndexable(page));
}

export function getPageCounts() {
  const services = getServices({ publishedOnly: true }).length;
  const cities = getLocations({ publishedOnly: true, servedOnly: true }).length;
  const areas = countPublishedServedAreas();
  const solutions = getProblems({ publishedOnly: true }).length;
  const propertyTypeService =
    getPropertyTypes({ publishedOnly: true }).length * services;
  const guides = getGuides({ publishedOnly: true }).length;
  const blogs = getBlogPosts({ publishedOnly: true }).length;

  const byType: Record<string, number> = {
    service: services,
    location: cities,
    area: areas,
    "service-location": services * cities,
    "service-area": services * areas,
    solution: solutions,
    "property-type-service": propertyTypeService,
    guide: guides,
    blog: blogs,
  };

  const total = Object.values(byType).reduce((sum, n) => sum + n, 0);

  return {
    total,
    published: total,
    indexable: total,
    noindex: 0,
    draft: 0,
    review: 0,
    byType,
  };
}

export function getPagesCursor(options?: {
  status?: string;
  pageType?: PageType;
  cursor?: number;
  limit?: number;
}) {
  let pages = getCoreRegistry();
  if (options?.status) {
    pages = pages.filter((page) => page.publicationStatus === options.status);
  }
  if (options?.pageType) {
    pages = pages.filter((page) => page.pageType === options.pageType);
  }
  return paginate(pages, options?.cursor, options?.limit ?? 50);
}

export function estimatePossiblePageCapacity(): number {
  return getPageCounts().total;
}

export function* iterateServiceAreaUrls(): Generator<{
  urlPath: string;
  serviceId: string;
  locationId: string;
  areaId: string;
  priority: "high" | "normal";
}> {
  const services = getServices({ publishedOnly: true });
  for (const area of iterateAllServedAreas()) {
    const parent = getLocationById(area.parentId);
    if (!parent || !parent.isServed) continue;
    for (const service of services) {
      yield {
        urlPath: buildServiceStateCityAreaPath(
          service.slug,
          parent.slug,
          area.slug,
        ),
        serviceId: service.id,
        locationId: parent.id,
        areaId: area.id,
        priority:
          parent.slug === "coimbatore" || parent.slug === "chennai"
            ? "high"
            : "normal",
      };
    }
  }
}
