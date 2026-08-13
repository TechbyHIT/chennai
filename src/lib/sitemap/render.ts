import {
  buildSitemapIndexEntries,
  listSitemapShardKeys,
  resolveShardEntries,
} from "@/lib/sitemap/shards";
import {
  dedupeSitemapEntries,
  serializeSitemapIndex,
  serializeUrlSet,
  validateSitemapIndexXml,
  validateUrlSetXml,
} from "@/lib/sitemap/xml";

export function getAllSitemapEntries() {
  return dedupeSitemapEntries(
    listSitemapShardKeys().flatMap(({ id }) => resolveShardEntries(id)),
  );
}

export function renderSitemapIndexXml(): string {
  return serializeSitemapIndex(buildSitemapIndexEntries());
}

export function renderSitemapShardXml(id: string): string {
  return serializeUrlSet(resolveShardEntries(id));
}

/** Single urlset for GSC — avoids child-sitemap 500s and extra fetches. */
export function renderCombinedSitemapXml(): string {
  return serializeUrlSet(getAllSitemapEntries());
}

export function assertValidSitemapIndex(xml: string): void {
  const errors = validateSitemapIndexXml(xml);
  if (errors.length) {
    throw new Error(`Invalid sitemap index: ${errors.join("; ")}`);
  }
}

export function assertValidUrlSet(xml: string, label = "urlset"): void {
  const errors = validateUrlSetXml(xml);
  if (errors.length) {
    throw new Error(`Invalid ${label}: ${errors.join("; ")}`);
  }
}
