import { describe, expect, it } from "vitest";
import { ensureTrailingSlash, toSlug } from "@/lib/utils/slug";

describe("slug utils", () => {
  it("creates lowercase hyphenated slugs", () => {
    expect(toSlug("Invisible Grills")).toBe("invisible-grills");
    expect(toSlug("Anna Nagar Madurai")).toBe("anna-nagar-madurai");
  });

  it("ensures trailing slash", () => {
    expect(ensureTrailingSlash("/chennai/invisible-grills")).toBe(
      "/chennai/invisible-grills/",
    );
  });
});
