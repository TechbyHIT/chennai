import { describe, expect, it } from "vitest";
import {
  buildServiceInCityPath,
  buildServiceStateCityAreaPath,
  parseServiceInCitySlug,
} from "@/lib/routing/service-location-urls";
import { buildServiceLocationPath, buildServiceAreaPath } from "@/config/routes";

describe("preferred service location URLs", () => {
  it("builds /{service}-in-{city}/", () => {
    expect(buildServiceInCityPath("invisible-grills", "chennai")).toBe(
      "/invisible-grills-in-chennai/",
    );
    expect(buildServiceLocationPath("chennai", "invisible-grills")).toBe(
      "/invisible-grills-in-chennai/",
    );
  });

  it("builds /{service}/{state}/{city}/{area}/", () => {
    expect(
      buildServiceStateCityAreaPath("safety-nets", "chennai", "adyar"),
    ).toBe("/safety-nets/tamil-nadu/chennai/adyar/");
    expect(buildServiceAreaPath("chennai", "adyar", "safety-nets")).toBe(
      "/safety-nets/tamil-nadu/chennai/adyar/",
    );
  });

  it("parses service-in-city slugs", () => {
    expect(parseServiceInCitySlug("invisible-grills-in-chennai")).toEqual({
      serviceSlug: "invisible-grills",
      citySlug: "chennai",
    });
  });
});
