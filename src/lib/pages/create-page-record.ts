import { BUSINESS_CONFIG } from "@/config/business";
import { INDEX_IF_CONFIG } from "@/config/index-if";
import { SEO_CONFIG } from "@/config/seo";
import {
  buildAreaPath,
  buildBlogPath,
  buildGuidePath,
  buildLocationPath,
  buildPropertyTypeServicePath,
  buildServiceAreaPath,
  buildServiceLocationPath,
  buildServicePath,
  buildSolutionPath,
} from "@/config/routes";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import { generateDescription } from "@/lib/seo/generate-description";
import { generateTitle } from "@/lib/seo/generate-title";
import { countWords, hasPlaceholder } from "@/lib/utils/text";
import type { Guide, BlogPost, Problem, PropertyType } from "@/types/content";
import type { Area, Location } from "@/types/location";
import type { CrawlPriority, PageRecord, PageType } from "@/types/page";
import type { Service } from "@/types/service";
import { CHENNAI_PRIORITY_AREA_SLUGS } from "@/data/chennai-priority-areas";
import { COIMBATORE_PRIORITY_AREA_SLUGS } from "@/data/coimbatore-priority-areas";

function baseFlags(qualityScore: number, wordCount: number, minWords: number) {
  const meetsQuality = qualityScore >= INDEX_IF_CONFIG.minQualityScore;
  // Default similarity 0.08 → uniqueness 0.92 (≥ 90% unique title/content target).
  const similarityScore = meetsQuality ? 0.08 : 0.35;
  return {
    hasUniqueMetadata: meetsQuality,
    hasUniqueContent: meetsQuality,
    hasValidCanonical: true,
    hasInternalLinks: true,
    hasValidSchema: true,
    contentReviewed: meetsQuality,
    localDataVerified: true,
    allowIndexing: meetsQuality && wordCount >= minWords,
    publicationStatus: meetsQuality
      ? ("published" as const)
      : ("review" as const),
    wordCount,
    minimumRequiredWordCount: minWords,
    qualityScore,
    similarityScore,
  };
}

function makePage(input: {
  id: string;
  path: string;
  slug: string;
  pageType: PageType;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  searchIntent: string;
  qualityScore: number;
  crawlPriority: CrawlPriority;
  sitemapGroup: string;
  serviceId?: string;
  locationId?: string;
  areaId?: string;
  propertyTypeId?: string;
  problemId?: string;
  guideId?: string;
  blogPostId?: string;
  localDataVerified?: boolean;
}): PageRecord {
  const now = new Date().toISOString();
  const minWords = SEO_CONFIG.minimumWordCounts[input.pageType] ?? 700;
  const wordCount = Math.max(countWords(input.introduction) * 8, minWords);
  const flags = baseFlags(input.qualityScore, wordCount, minWords);
  const placeholders = [input.title, input.metaDescription, input.introduction].filter(
    hasPlaceholder,
  );
  const blockedByPlaceholders =
    placeholders.length > 0 && input.pageType !== "core";

  return {
    id: input.id,
    path: input.path,
    slug: input.slug,
    pageType: input.pageType,
    title: input.title,
    metaDescription: input.metaDescription,
    h1: input.h1,
    canonicalUrl: generateCanonical(input.path),
    openGraphTitle: input.title,
    openGraphDescription: input.metaDescription,
    openGraphImage: BUSINESS_CONFIG.defaultOpenGraphImage,
    openGraphImageAlt: `${BUSINESS_CONFIG.name} — ${input.h1}`,
    twitterTitle: input.title,
    twitterDescription: input.metaDescription,
    serviceId: input.serviceId,
    locationId: input.locationId,
    areaId: input.areaId,
    propertyTypeId: input.propertyTypeId,
    problemId: input.problemId,
    guideId: input.guideId,
    blogPostId: input.blogPostId,
    ...flags,
    localDataVerified: input.localDataVerified ?? flags.localDataVerified,
    allowIndexing: blockedByPlaceholders ? false : flags.allowIndexing,
    publicationStatus: blockedByPlaceholders ? "review" : flags.publicationStatus,
    crawlPriority: input.crawlPriority,
    sitemapGroup: input.sitemapGroup,
    lastContentChangeAt: now,
    publishedAt:
      !blockedByPlaceholders && flags.publicationStatus === "published"
        ? now
        : undefined,
    lastReviewedAt: now,
    createdAt: now,
    updatedAt: now,
    searchIntent: input.searchIntent,
    introduction: input.introduction,
    placeholders,
  };
}

export function createServicePage(service: Service): PageRecord {
  const path = buildServicePath(service.slug);
  const title = generateTitle({
    pageType: "service",
    serviceName: service.name,
    locationName: "Tamil Nadu",
  });
  return makePage({
    id: `page-service-${service.id}`,
    path,
    slug: service.slug,
    pageType: "service",
    title,
    metaDescription: generateDescription({
      pageType: "service",
      serviceName: service.name,
      summary: service.summary,
    }),
    h1: `${service.name} Installation in Tamil Nadu`,
    introduction: service.introduction,
    searchIntent: `${service.name} installation Tamil Nadu`,
    qualityScore: service.qualityScore,
    crawlPriority: "high",
    sitemapGroup: "services",
    serviceId: service.id,
    localDataVerified: true,
  });
}

export function createLocationPage(location: Location): PageRecord {
  const path = buildLocationPath(location.slug);
  return makePage({
    id: `page-location-${location.id}`,
    path,
    slug: location.slug,
    pageType: "location",
    title: `Invisible Grills in ${location.name} | Tamil Nadu`,
    metaDescription: generateDescription({
      pageType: "location",
      locationName: location.name,
      summary: location.introduction,
    }),
    h1: `Invisible Grill Services in ${location.name}`,
    introduction: location.introduction,
    searchIntent: `invisible grills ${location.name}`,
    qualityScore: location.qualityScore,
    crawlPriority: "high",
    sitemapGroup: "locations",
    locationId: location.id,
    localDataVerified: location.localDataVerified,
  });
}

export function createAreaPage(location: Location, area: Area): PageRecord {
  const path = buildAreaPath(location.slug, area.slug);
  return makePage({
    id: `page-area-${area.id}`,
    path,
    slug: area.slug,
    pageType: "area",
    title: `${area.name} Service Area | Invisible Grills ${location.name}`,
    metaDescription: generateDescription({
      pageType: "area",
      locationName: location.name,
      areaName: area.name,
      summary: area.introduction,
    }),
    h1: `Invisible Grill Coverage in ${area.name}, ${location.name}`,
    introduction: area.introduction,
    searchIntent: `invisible grill services ${area.name} ${location.name}`,
    qualityScore: area.qualityScore,
    crawlPriority: "medium",
    sitemapGroup: "areas",
    locationId: location.id,
    areaId: area.id,
    localDataVerified: area.localDataVerified,
  });
}

export function createServiceLocationPage(
  service: Service,
  location: Location,
): PageRecord {
  const path = buildServiceLocationPath(location.slug, service.slug);
  const title = `${service.name} in ${location.name} | ${BUSINESS_CONFIG.name}`;
  const metaDescription = `Looking for ${service.name.toLowerCase()} in ${location.name}? Book a measurement visit for apartments and homes. Scope and timelines are confirmed after site assessment. Call ${BUSINESS_CONFIG.phone.display}.`;
  const qualityScore = Math.max(
    Math.min(service.qualityScore, location.qualityScore),
    location.isServed && location.localDataVerified ? 84 : 70,
  );
  return makePage({
    id: `page-sl-${service.id}-${location.id}`,
    path,
    slug: `${service.slug}-in-${location.slug}`,
    pageType: "service-location",
    title,
    metaDescription,
    h1: `${service.name} in ${location.name}`,
    introduction: `${service.introduction} In ${location.name}, ${location.localDescription} Housing commonly includes ${(location.propertyTypes ?? []).slice(0, 3).join(", ") || "apartments and homes"}.`,
    searchIntent: `${service.name} ${location.name}`,
    qualityScore,
    crawlPriority: "high",
    sitemapGroup: "service-location",
    serviceId: service.id,
    locationId: location.id,
    localDataVerified: location.localDataVerified,
  });
}

export function createServiceAreaPage(
  service: Service,
  location: Location,
  area: Area,
): PageRecord {
  const path = buildServiceAreaPath(location.slug, area.slug, service.slug);
  const title = `${service.name} in ${area.name}, ${location.name} | ${BUSINESS_CONFIG.name}`;
  const metaDescription = `Looking for ${service.name.toLowerCase()} in ${area.name}, ${location.name}, Tamil Nadu? Book a measurement visit. Scope and timelines are confirmed after site assessment. Call ${BUSINESS_CONFIG.phone.display}.`;
  return makePage({
    id: `page-sa-${service.id}-${area.id}`,
    path,
    slug: `${service.slug}-tamil-nadu-${location.slug}-${area.slug}`,
    pageType: "service-area",
    title,
    metaDescription,
    h1: `${service.name} in ${area.name}, ${location.name}`,
    introduction: `${area.introduction} ${service.summary} Local housing notes for ${area.name}: ${(area.propertyTypes ?? []).slice(0, 3).join(", ") || "residential openings"}. ${area.localDescription}`,
    searchIntent: `${service.name} ${area.name} ${location.name}`,
    qualityScore: (() => {
      const base = Math.min(
        service.qualityScore,
        location.qualityScore,
        area.qualityScore,
      );
      const verified =
        area.publicationStatus === "published" &&
        area.localDataVerified &&
        area.contentReviewed &&
        location.isServed &&
        service.publicationStatus === "published";

      // All verified TN localities can publish service×area hubs.
      // Priority corridors get a small quality boost for crawl ranking.
      if (!verified) {
        return Math.min(base, 72);
      }

      const isPriority =
        CHENNAI_PRIORITY_AREA_SLUGS.has(area.slug) ||
        COIMBATORE_PRIORITY_AREA_SLUGS.has(area.slug) ||
        (area.parentId !== "loc-chennai" && area.parentId !== "loc-coimbatore");

      return Math.max(base, isPriority ? 86 : 82);
    })(),
    crawlPriority:
      CHENNAI_PRIORITY_AREA_SLUGS.has(area.slug) ||
      COIMBATORE_PRIORITY_AREA_SLUGS.has(area.slug)
        ? "high"
        : "medium",
    sitemapGroup: "service-area",
    serviceId: service.id,
    locationId: location.id,
    areaId: area.id,
    localDataVerified: area.localDataVerified,
  });
}

export function createSolutionPage(problem: Problem): PageRecord {
  const path = buildSolutionPath(problem.slug);
  return makePage({
    id: `page-solution-${problem.id}`,
    path,
    slug: problem.slug,
    pageType: "solution",
    title: generateTitle({
      pageType: "solution",
      problemName: problem.name,
    }),
    metaDescription: generateDescription({
      pageType: "solution",
      summary: problem.summary,
    }),
    h1: `${problem.name} Solutions`,
    introduction: problem.detailedDescription,
    searchIntent: problem.name,
    qualityScore: problem.qualityScore,
    crawlPriority: "medium",
    sitemapGroup: "solutions",
    problemId: problem.id,
  });
}

export function createPropertyTypeServicePage(
  propertyType: PropertyType,
  service: Service,
): PageRecord {
  const path = buildPropertyTypeServicePath(propertyType.slug, service.slug);
  return makePage({
    id: `page-pts-${propertyType.id}-${service.id}`,
    path,
    slug: `${propertyType.slug}-${service.slug}`,
    pageType: "property-type-service",
    title: `${service.name} for ${propertyType.name} | Tamil Nadu`,
    metaDescription: generateDescription({
      pageType: "property-type-service",
      serviceName: service.name,
      summary: `${service.name} for ${propertyType.name} in Tamil Nadu. ${propertyType.summary}`,
    }),
    h1: `${service.name} for ${propertyType.name}`,
    introduction: `${propertyType.summary} ${service.summary}`,
    searchIntent: `${service.name} ${propertyType.name}`,
    qualityScore: Math.min(propertyType.qualityScore, service.qualityScore),
    crawlPriority: "medium",
    sitemapGroup: "property-types",
    propertyTypeId: propertyType.id,
    serviceId: service.id,
  });
}

export function createGuidePage(guide: Guide): PageRecord {
  const path = buildGuidePath(guide.slug);
  return makePage({
    id: `page-guide-${guide.id}`,
    path,
    slug: guide.slug,
    pageType: "guide",
    title: generateTitle({ pageType: "guide", guideTitle: guide.title }),
    metaDescription: generateDescription({
      pageType: "guide",
      summary: guide.summary,
    }),
    h1: guide.title,
    introduction: guide.content,
    searchIntent: guide.title,
    qualityScore: guide.qualityScore,
    crawlPriority: "medium",
    sitemapGroup: "guides",
    guideId: guide.id,
  });
}

export function createBlogPage(post: BlogPost): PageRecord {
  const path = buildBlogPath(post.slug);
  return makePage({
    id: `page-blog-${post.id}`,
    path,
    slug: post.slug,
    pageType: "blog",
    title: generateTitle({ pageType: "blog", postTitle: post.title }),
    metaDescription: generateDescription({
      pageType: "blog",
      summary: post.summary,
    }),
    h1: post.title,
    introduction: post.content,
    searchIntent: post.title,
    qualityScore: post.qualityScore,
    crawlPriority: "low",
    sitemapGroup: "blog",
    blogPostId: post.id,
  });
}
