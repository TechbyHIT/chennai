import { describe, expect, it } from "vitest";
import { listSitemapShardKeys, resolveShardEntries } from "@/lib/sitemap/shards";

describe("sitemap shards", () => {
  it("lists core, service-location and service-area shards", () => {
    const keys = listSitemapShardKeys().map((item) => item.id);
    expect(keys).toContain("core");
    expect(keys.some((id) => id.startsWith("service-locations-"))).toBe(true);
    expect(keys.some((id) => id.startsWith("service-areas-"))).toBe(true);
  });

  it("resolves core static URLs", () => {
    const entries = resolveShardEntries("core");
    expect(entries.some((entry) => entry.url.endsWith("/"))).toBe(true);
    expect(entries.length).toBeGreaterThan(5);
    expect(entries.some((entry) => entry.url.includes("/sitemap-page/"))).toBe(true);
  });

  it("attaches image URLs on the images shard", () => {
    const entries = resolveShardEntries("images-0");
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.some((entry) => (entry.images?.length ?? 0) > 0)).toBe(true);
  });
});
