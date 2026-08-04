import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { SITE_CONFIG } from "../src/config/site";
import { getIndexablePages } from "../src/lib/pages/page-registry";

const pages = getIndexablePages();
const groups = new Map<string, typeof pages>();

for (const page of pages) {
  const group = page.sitemapGroup ?? "core";
  groups.set(group, [...(groups.get(group) ?? []), page]);
}

const files: Array<{ group: string; count: number; file: string }> = [];
const outDir = join(process.cwd(), "reports", "sitemaps");
mkdirSync(outDir, { recursive: true });

for (const [group, groupPages] of groups) {
  const chunks = Math.ceil(groupPages.length / SITE_CONFIG.maxSitemapUrlsPerFile) || 1;
  for (let i = 0; i < chunks; i += 1) {
    const slice = groupPages.slice(
      i * SITE_CONFIG.maxSitemapUrlsPerFile,
      (i + 1) * SITE_CONFIG.maxSitemapUrlsPerFile,
    );
    const file = `${group}-${i + 1}.xml`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slice
  .map(
    (page) => `  <url>
    <loc>${page.canonicalUrl}</loc>
    <lastmod>${page.lastContentChangeAt ?? page.updatedAt}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
    writeFileSync(join(outDir, file), xml);
    files.push({ group, count: slice.length, file });
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  indexableUrls: pages.length,
  files,
};

writeFileSync(join(process.cwd(), "reports/sitemap-summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
