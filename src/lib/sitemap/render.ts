import {
  buildSitemapIndexEntries,
  resolveShardEntries,
} from "@/lib/sitemap/shards";
import {
  serializeSitemapIndex,
  serializeUrlSet,
  validateSitemapIndexXml,
  validateUrlSetXml,
} from "@/lib/sitemap/xml";

export function renderSitemapIndexXml(): string {
  return serializeSitemapIndex(buildSitemapIndexEntries());
}

export function renderSitemapShardXml(id: string): string {
  return serializeUrlSet(resolveShardEntries(id));
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
