/**
 * Sitemap inclusion — all curated commercial pages.
 * Mass scaled locality × service URLs stay on-demand (not sitemapped)
 * so crawl budget and XML size stay under 50k.
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
    "area",
    "service-location",
    "guide",
    "solution",
    "property-type-service",
    "blog",
  ] as const,

  /**
   * Include service×area URLs for every curated (seed) locality,
   * not only Chennai / Coimbatore priority lists.
   */
  includePriorityServiceAreas: true,

  /** Exclude duplicate image-only shards; images attach to primary URL entries. */
  includeImagesShard: false,

  /** Max URLs per sitemap file (sitemaps.org soft limit is 50k). */
  maxUrlsPerFile: 10_000,
} as const;

export type HighIntentPageType =
  (typeof SITEMAP_CONFIG.highIntentPageTypes)[number];
