import { describe, expect, it } from "vitest";
import { toAbsoluteHttpsUrl } from "@/lib/sitemap/absolute-url";

describe("toAbsoluteHttpsUrl", () => {
  it("rewrites localhost sitemap clicks to the live domain", () => {
    expect(
      toAbsoluteHttpsUrl("http://localhost:3009/blog/how-to-choose-balcony-safety-grills/"),
    ).toBe(
      "https://gloryinvisiblegrills.in/blog/how-to-choose-balcony-safety-grills/",
    );
    expect(toAbsoluteHttpsUrl("https://127.0.0.1:3009/guides/")).toBe(
      "https://gloryinvisiblegrills.in/guides/",
    );
  });

  it("keeps production HTTPS locs unchanged", () => {
    expect(
      toAbsoluteHttpsUrl("https://gloryinvisiblegrills.in/blog/how-to-choose-balcony-safety-grills/"),
    ).toBe(
      "https://gloryinvisiblegrills.in/blog/how-to-choose-balcony-safety-grills/",
    );
  });
});
