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
import { validateSitemapIndexXml, validateUrlSetXml } from "../src/lib/sitemap/xml";

const errors: string[] = [];

try {
  const indexXml = renderSitemapIndexXml();
  const indexErrors = validateSitemapIndexXml(indexXml);
  errors.push(...indexErrors.map((e) => `index: ${e}`));
  assertValidSitemapIndex(indexXml);
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

const keys = listSitemapShardKeys();
if (keys.length === 0) errors.push("No sitemap shards listed");

const seenLocs = new Set<string>();
let totalUrls = 0;

for (const { id } of keys) {
  try {
    const entries = resolveShardEntries(id);
    const xml = renderSitemapShardXml(id);
    const shardErrors = validateUrlSetXml(xml);
    errors.push(...shardErrors.map((e) => `${id}: ${e}`));
    assertValidUrlSet(xml, id);

    for (const entry of entries) {
      if (seenLocs.has(entry.loc)) {
        errors.push(`Duplicate across shards: ${entry.loc}`);
      }
      seenLocs.add(entry.loc);
      if (!entry.loc.startsWith("https://")) {
        errors.push(`Non-HTTPS: ${entry.loc}`);
      }
      if (!entry.lastmod) errors.push(`Missing lastmod: ${entry.loc}`);
    }
    totalUrls += entries.length;
  } catch (error) {
    errors.push(
      `${id}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

const expected = countHighIntentSitemapUrls();
if (totalUrls !== expected) {
  errors.push(
    `URL count mismatch: serialized ${totalUrls} vs counted ${expected}`,
  );
}

// Guardrail: never ship mass scaled locality sitemaps.
if (totalUrls > 50_000) {
  errors.push(
    `High-intent sitemap unexpectedly large (${totalUrls}). Check SITEMAP_CONFIG.`,
  );
}

const report = {
  validatedAt: new Date().toISOString(),
  ok: errors.length === 0,
  policy: "high-intent-only",
  shardCount: keys.length,
  urlCount: totalUrls,
  errors,
};

mkdirSync(join(process.cwd(), "reports"), { recursive: true });
writeFileSync(
  join(process.cwd(), "reports/sitemap-validation.json"),
  JSON.stringify(report, null, 2),
);

console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
