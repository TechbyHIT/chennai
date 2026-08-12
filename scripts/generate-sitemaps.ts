import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import {
  countHighIntentSitemapUrls,
  listSitemapShardKeys,
  resolveShardEntries,
} from "../src/lib/sitemap/shards";
import {
  assertValidSitemapIndex,
  assertValidUrlSet,
  renderSitemapIndexXml,
  renderSitemapShardXml,
} from "../src/lib/sitemap/render";

/**
 * Offline high-intent sitemap generation + validation.
 * Live site serves the same shards via /sitemap.xml and /sitemap/[id].xml.
 */
const outDir = join(process.cwd(), "reports", "sitemaps");
mkdirSync(outDir, { recursive: true });

const indexXml = renderSitemapIndexXml();
assertValidSitemapIndex(indexXml);
writeFileSync(join(outDir, "sitemap.xml"), indexXml);

const files: Array<{ id: string; count: number; file: string }> = [];

for (const { id } of listSitemapShardKeys()) {
  const entries = resolveShardEntries(id);
  const xml = renderSitemapShardXml(id);
  assertValidUrlSet(xml, id);
  const file = `${id}.xml`;
  writeFileSync(join(outDir, file), xml);
  files.push({ id, count: entries.length, file });
}

const summary = {
  generatedAt: new Date().toISOString(),
  policy: "high-intent-only",
  highIntentUrls: countHighIntentSitemapUrls(),
  shardCount: files.length,
  files,
};

writeFileSync(
  join(process.cwd(), "reports/sitemap-summary.json"),
  JSON.stringify(summary, null, 2),
);
console.log(JSON.stringify(summary, null, 2));
