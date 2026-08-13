/**
 * Build-time HTML seed — keep empty on small VPS disks so deploys stay fast.
 * Published URLs still work via dynamicParams + ISR (first request writes the page).
 */
export const STATIC_GENERATION = {
  /** City hubs + /{service}-in-{city}/ prebuilt at build. Empty = none. */
  seedCitySlugs: [] as const,
} as const;

export function isSeedCity(slug: string): boolean {
  return (STATIC_GENERATION.seedCitySlugs as readonly string[]).includes(slug);
}
