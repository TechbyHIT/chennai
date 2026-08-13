import { describe, expect, it } from "vitest";
import {
  countHighIntentSitemapUrls,
  listSitemapShardKeys,
  resolveShardEntries,
} from "@/lib/sitemap/shards";
import { renderCombinedSitemapXml, renderSitemapIndexXml, renderSitemapShardXml } from "@/lib/sitemap/render";
import { validateSitemapIndexXml, validateUrlSetXml } from "@/lib/sitemap/xml";

describe("high-intent sitemap shards", () => {
  it("lists curated shards including areas (no mass scaled service-areas)", () => {
    const keys = listSitemapShardKeys().map((item) => item.id);
    expect(keys).toContain("core");
    expect(keys.some((id) => id.startsWith("service-locations-"))).toBe(true);
    expect(keys.some((id) => id.startsWith("areas-"))).toBe(true);
    expect(keys.some((id) => id.startsWith("priority-areas-"))).toBe(true);
    expect(keys.some((id) => id.startsWith("blog-"))).toBe(true);
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

  it("keeps total sitemap URLs well under crawl-budget blowups", () => {
    const total = countHighIntentSitemapUrls();
    expect(total).toBeGreaterThan(100);
    expect(total).toBeLessThan(20_000);
  });

  it("emits valid sitemap index + core urlset XML", () => {
    const indexXml = renderSitemapIndexXml();
    expect(validateSitemapIndexXml(indexXml)).toEqual([]);
    const coreXml = renderSitemapShardXml("core");
    expect(validateUrlSetXml(coreXml)).toEqual([]);
  });

  it("emits a combined urlset with live-site HTTPS locs for GSC", () => {
    const xml = renderCombinedSitemapXml();
    expect(validateUrlSetXml(xml)).toEqual([]);
    expect(xml).toContain("<urlset");
    expect(xml).not.toContain("<sitemapindex");
    expect(xml).not.toMatch(/localhost|127\.0\.0\.1/i);
    expect(xml).toContain("https://gloryinvisiblegrills.in/");
    expect(xml).toContain("/blog/how-to-choose-balcony-safety-grills/");
    expect((xml.match(/<loc>/g) ?? []).length).toBeGreaterThan(100);
  });

  it("does not list empty child shards", () => {
    const keys = listSitemapShardKeys().map((item) => item.id);
    for (const id of keys) {
      expect(resolveShardEntries(id).length).toBeGreaterThan(0);
    }
  });
});
