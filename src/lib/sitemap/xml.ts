import { toAbsoluteHttpsUrl } from "@/lib/sitemap/absolute-url";

export type SitemapUrlEntry = {
  loc: string;
  lastmod: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  images?: string[];
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

export function normalizeSitemapEntry(input: {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: SitemapUrlEntry["changefreq"];
  priority?: number;
  images?: string[];
}): SitemapUrlEntry {
  return {
    loc: toAbsoluteHttpsUrl(input.url),
    lastmod: toLastmod(input.lastModified ?? new Date()),
    changefreq: input.changeFrequency,
    priority: input.priority,
    images: input.images?.map(toAbsoluteHttpsUrl),
  };
}

/** Deduplicate by loc; keep first occurrence. */
export function dedupeSitemapEntries(entries: SitemapUrlEntry[]): SitemapUrlEntry[] {
  const seen = new Set<string>();
  const out: SitemapUrlEntry[] = [];
  for (const entry of entries) {
    if (seen.has(entry.loc)) continue;
    seen.add(entry.loc);
    out.push(entry);
  }
  return out;
}

export function serializeUrlSet(entries: SitemapUrlEntry[]): string {
  const unique = dedupeSitemapEntries(entries);
  const hasImages = unique.some((e) => (e.images?.length ?? 0) > 0);
  const imageNs = hasImages
    ? ` xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`
    : "";

  const body = unique
    .map((entry) => {
      const imagesXml = (entry.images ?? [])
        .map(
          (img) => `    <image:image>
      <image:loc>${escapeXml(img)}</image:loc>
    </image:image>`,
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>${
      entry.changefreq
        ? `\n    <changefreq>${entry.changefreq}</changefreq>`
        : ""
    }${
      typeof entry.priority === "number"
        ? `\n    <priority>${entry.priority.toFixed(1)}</priority>`
        : ""
    }${imagesXml ? `\n${imagesXml}` : ""}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${imageNs}>
${body}
</urlset>
`;
}

export function serializeSitemapIndex(
  shards: Array<{ loc: string; lastmod: string }>,
): string {
  const body = shards
    .map(
      (shard) => `  <sitemap>
    <loc>${escapeXml(shard.loc)}</loc>
    <lastmod>${escapeXml(shard.lastmod)}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export function validateUrlSetXml(xml: string): string[] {
  const errors: string[] = [];
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push("Missing urlset xmlns");
  }
  if (!xml.trimStart().startsWith("<?xml")) {
    errors.push("Missing XML declaration");
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? "");
  const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)];
  if (locs.length === 0) errors.push("No <loc> entries");
  if (lastmods.length < locs.length) {
    errors.push("Every URL must include <lastmod>");
  }
  for (const loc of locs) {
    if (!loc.startsWith("https://")) {
      errors.push(`Non-HTTPS loc: ${loc}`);
      break;
    }
  }
  const unique = new Set(locs);
  if (unique.size !== locs.length) {
    errors.push("Duplicate <loc> entries detected");
  }
  return errors;
}

export function validateSitemapIndexXml(xml: string): string[] {
  const errors: string[] = [];
  if (!xml.includes("<sitemapindex")) errors.push("Missing sitemapindex root");
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push("Missing sitemapindex xmlns");
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? "");
  if (locs.length === 0) errors.push("Index has no child sitemaps");
  for (const loc of locs) {
    if (!loc.startsWith("https://")) {
      errors.push(`Non-HTTPS sitemap loc: ${loc}`);
      break;
    }
  }
  return errors;
}
