import { BUSINESS_CONFIG } from "./business";

export const SITE_CONFIG = {
  name: BUSINESS_CONFIG.name,
  url: BUSINESS_CONFIG.websiteUrl.replace(/\/$/, ""),
  locale: "en_IN",
  defaultTitle: `${BUSINESS_CONFIG.name} | Invisible Grill Installation`,
  titleTemplate: `%s | ${BUSINESS_CONFIG.name}`,
  description: BUSINESS_CONFIG.description,
  trailingSlash: true,
  maxSitemapUrlsPerFile: 10_000,
  /** Bump when bulk content changes so lastmod/revalidate stay meaningful. */
  contentRevision: "2026-08-12",
  qualityThreshold: 80,
  similarityThreshold: 0.7,
} as const;
