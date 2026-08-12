/**
 * Sitemap inclusion policy — high commercial intent only.
 * Mass scaled locality × service URLs are generated on demand but NOT sitemapped
 * (crawl-budget protection). They remain reachable via internal links from city hubs.
 */
export const SITEMAP_CONFIG = {
  /** Absolute HTTPS base is enforced in serializers even if env is http. */
  requireHttps: true,

  /**
   * Page types always eligible when published + indexable.
   * service-location = /{service}-in-{city}/ (primary money pages).
   */
  highIntentPageTypes: [
    "service",
    "location",
    "service-location",
    "guide",
    "solution",
    "property-type-service",
    "blog",
  ] as const,

  /**
   * Include service×area URLs only for priority Chennai / Coimbatore localities
   * (not the full scaled locality graph).
   */
  includePriorityServiceAreas: true,

  /** Exclude duplicate image-only shards; images attach to primary URL entries. */
  includeImagesShard: false,

  /** Max URLs per sitemap file (sitemaps.org soft limit is 50k). */
  maxUrlsPerFile: 10_000,
} as const;

export type HighIntentPageType =
  (typeof SITEMAP_CONFIG.highIntentPageTypes)[number];
