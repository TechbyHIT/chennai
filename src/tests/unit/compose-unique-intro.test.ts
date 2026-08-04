import { describe, expect, it } from "vitest";
import { composeUniqueIntro } from "@/lib/content/compose-unique-intro";
import { getLocationBySlug, getServiceBySlug } from "@/lib/data/repositories";

describe("composeUniqueIntro", () => {
  it("builds place-specific intros for TN service×city pages", () => {
    const service = getServiceBySlug("mosquito-nets");
    const location = getLocationBySlug("chennai");
    expect(service).toBeTruthy();
    expect(location).toBeTruthy();

    const intro = composeUniqueIntro({ service, location });
    expect(intro).toContain("Mosquito Nets");
    expect(intro).toContain("Chennai");
    expect(intro).toContain("Tamil Nadu");
    expect(intro.toLowerCase()).not.toContain("same-day guarantee");
  });
});
