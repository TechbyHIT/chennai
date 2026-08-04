import { describe, expect, it } from "vitest";
import { generateCanonical } from "@/lib/seo/generate-canonical";

describe("generateCanonical", () => {
  it("builds absolute trailing-slash URLs", () => {
    const url = generateCanonical("/chennai/invisible-grills");
    expect(url.endsWith("/chennai/invisible-grills/")).toBe(true);
    expect(url.startsWith("http")).toBe(true);
  });
});
