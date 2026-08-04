import { describe, expect, it } from "vitest";
import { buildTamilNaduLocations } from "@/lib/geo/build-tn-locations";
import { getServiceBySlug, getServices } from "@/lib/data/repositories";

describe("Tamil Nadu geo expansion", () => {
  it("includes state, districts and major cities", () => {
    const nodes = buildTamilNaduLocations();
    expect(nodes.some((n) => n.locationType === "state")).toBe(true);
    expect(nodes.filter((n) => n.locationType === "district").length).toBeGreaterThan(30);
    expect(nodes.some((n) => n.slug === "chennai" && n.isServed)).toBe(true);
    expect(nodes.some((n) => n.slug === "hosur")).toBe(true);
  });

  it("exposes expanded netting services", () => {
    const slugs = getServices({ publishedOnly: true }).map((s) => s.slug);
    for (const slug of [
      "mosquito-nets",
      "bird-nets",
      "monkey-nets",
      "balcony-safety-nets",
      "children-safety-nets",
      "building-safety-nets",
      "ceiling-cloth-hangers",
    ]) {
      expect(slugs).toContain(slug);
      expect(getServiceBySlug(slug)?.allowIndexing).toBe(true);
    }
  });
});
