import { describe, expect, it } from "vitest";
import {
  estimatePossiblePageCapacity,
  getPageByPath,
  getPageCounts,
} from "@/lib/pages/page-registry";

describe("page registry", () => {
  it("includes Tamil Nadu service and city pages", () => {
    expect(getPageByPath("/services/invisible-grills/")).toBeTruthy();
    expect(getPageByPath("/locations/chennai/")).toBeTruthy();
    expect(getPageByPath("/invisible-grills-in-chennai/")).toBeTruthy();
  });

  it("does not include Visakhapatnam pages", () => {
    expect(getPageByPath("/locations/visakhapatnam/")).toBeUndefined();
  });

  it("reports counts for curated pages only", () => {
    const counts = getPageCounts();
    expect(counts.total).toBeGreaterThan(500);
    expect(counts.total).toBeLessThan(100_000);
    expect(counts.byType["service-area"]).toBeGreaterThan(100);
    expect(counts.byType["service-area"]).toBeLessThan(50_000);
    expect(estimatePossiblePageCapacity()).toBe(counts.total);
  });

  it("does not publish generated doorway localities", () => {
    expect(
      getPageByPath("/invisible-grills/tamil-nadu/coimbatore/coimbatore-ward-1/"),
    ).toBeUndefined();
    expect(
      getPageByPath("/invisible-grills/tamil-nadu/chennai/anna-nagar-extension/"),
    ).toBeUndefined();
  });
});
