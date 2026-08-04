import { truncate } from "@/lib/utils/text";

type DescriptionInput = {
  pageType: string;
  serviceName?: string;
  locationName?: string;
  areaName?: string;
  summary?: string;
};

export function generateDescription(input: DescriptionInput): string {
  if (input.summary) {
    return truncate(input.summary, 158);
  }

  const service = input.serviceName ?? "invisible grills";
  const location = input.areaName
    ? `${input.areaName}, ${input.locationName ?? "Tamil Nadu"}`
    : (input.locationName ?? "Tamil Nadu");

  switch (input.pageType) {
    case "service":
      return truncate(
        `Professional ${service} installation across Tamil Nadu with careful measurement, safety-led spacing and neat finishing for balconies and windows.`,
        158,
      );
    case "service-location":
      return truncate(
        `Get ${service} installation in ${location}. Measurement-based quotations, practical safety guidance and clean finishing for homes and apartments.`,
        158,
      );
    case "service-area":
      return truncate(
        `${service} in ${location}. Local measurement visits, clear spacing recommendations and installation planning for residential openings.`,
        158,
      );
    case "location":
      return truncate(
        `Invisible grill services in ${location}, Tamil Nadu. Balcony and window safety solutions with honest service-area coverage.`,
        158,
      );
    case "area":
      return truncate(
        `Invisible grill installation in ${location}. Practical balcony and window safety planning for local homes and apartments.`,
        158,
      );
    default:
      return truncate(
        `Glory Invisible Grills provides measured invisible grill installation across Tamil Nadu for balconies, windows and family safety needs.`,
        158,
      );
  }
}
