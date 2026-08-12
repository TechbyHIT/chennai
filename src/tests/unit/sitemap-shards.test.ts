import { describe, expect, it } from "vitest";
import {
  countHighIntentSitemapUrls,
  listSitemapShardKeys,
  resolveShardEntries,
} from "@/lib/sitemap/shards";
import { renderSitemapIndexXml, renderSitemapShardXml } from "@/lib/sitemap/render";
import { validateSitemapIndexXml, validateUrlSetXml } from "@/lib/sitemap/xml";

describe("high-intent sitemap shards", () => {
  it("lists compact high-intent shards (no mass service-areas)", () => {
    const keys = listSitemapShardKeys().map((item) => item.id);
    expect(keys).toContain("core");
    expect(keys.some((id) => id.startsWith("service-locations-"))).toBe(true);
    expect(keys.some((id) => id.startsWith("service-areas-"))).toBe(false);
    expect(keys.length).toBeLessThan(30);
  });

  it("resolves core static HTTPS URLs with lastmod", () => {
    const entries = resolveShardEntries("core");
    expect(entries.length).toBeGreaterThan(5);
    expect(entries.every((e) => e.loc.startsWith("https://"))).toBe(true);
    expect(entries.every((e) => Boolean(e.lastmod))).toBe(true);
    expect(entries.some((e) => e.loc.includes("/sitemap-page/"))).toBe(true);
  });

  it("keeps total high-intent URLs well under crawl-budget blowups", () => {
    const total = countHighIntentSitemapUrls();
    expect(total).toBeGreaterThan(20);
    expect(total).toBeLessThan(20_000);
  });

  it("emits valid sitemap index + core urlset XML", () => {
    const indexXml = renderSitemapIndexXml();
    expect(validateSitemapIndexXml(indexXml)).toEqual([]);
    const coreXml = renderSitemapShardXml("core");
    expect(validateUrlSetXml(coreXml)).toEqual([]);
  });
});
