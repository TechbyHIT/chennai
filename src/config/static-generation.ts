/**
 * Fast VPS builds: pre-render only a small seed (hundreds, not millions).
 * Everything else is ISR — first request generates the page, later requests
 * are served from cache.
 */
export const STATIC_GENERATION = {
  /**
   * City hubs + /{service}-in-{city}/ prebuilt at build.
   * Empty = none of those money pages at build (ISR on first visit).
   * Add slugs here only if you want a few cities hot on deploy.
   */
  seedCitySlugs: [] as const,
  /** Soft cap for generateStaticParams across programmatic routes. */
  maxBuildPages: 800,
} as const;

export function isSeedCity(slug: string): boolean {
  return (STATIC_GENERATION.seedCitySlugs as readonly string[]).includes(slug);
}
