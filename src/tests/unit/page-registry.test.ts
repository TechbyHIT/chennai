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

  it("reports counts and capacity near 10000k (10M) scale", () => {
    const counts = getPageCounts();
    expect(counts.total).toBeGreaterThan(9_500_000);
    expect(counts.byType["service-area"]).toBeGreaterThan(9_000_000);
    expect(estimatePossiblePageCapacity()).toBe(counts.total);
  });

  it("resolves scaled service×area paths on demand", () => {
    const page = getPageByPath(
      "/invisible-grills/tamil-nadu/coimbatore/coimbatore-ward-1/",
    );
    expect(page?.pageType).toBe("service-area");
    expect(page?.allowIndexing).toBe(true);
  });
});
