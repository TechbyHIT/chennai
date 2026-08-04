import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

function seedOf(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 33 + input.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Builds a place-specific intro that is more than string substitution.
 * Keys off geo traits, building mix, climate flags and service applications.
 */
export function composeUniqueIntro(input: {
  service?: Service;
  location?: Location;
  area?: Area;
}): string {
  const { service, location, area } = input;
  const place = area ?? location;
  if (!service || !place) {
    return service?.introduction ?? place?.introduction ?? "";
  }

  const seed = seedOf(`${service.slug}:${location?.slug ?? ""}:${area?.slug ?? ""}`);
  const coastal = [...place.localCharacteristics, ...place.verifiedLocalFacts]
    .join(" ")
    .toLowerCase()
    .includes("coastal");

  const buildingMix = place.propertyTypes.slice(0, 3).join(", ") || "homes and apartments";
  const demand =
    place.serviceDemandNotes[seed % Math.max(place.serviceDemandNotes.length, 1)] ??
    place.serviceDemandNotes[0];
  const trait =
    place.localCharacteristics[seed % Math.max(place.localCharacteristics.length, 1)] ??
    place.localCharacteristics[0];
  const application =
    service.applications[seed % Math.max(service.applications.length, 1)] ??
    service.applications[0];

  const openers = [
    `${service.name} in ${place.name}${location && area ? `, ${location.name}` : ""}, Tamil Nadu, starts with a measured look at your openings — not a one-size template.`,
    `Homeowners searching for ${service.name.toLowerCase()} around ${place.name} usually want a clear specification path before they approve installation.`,
    `For ${place.name}${area && location ? ` in ${location.name}` : ""}, ${service.shortName.toLowerCase()} decisions work best when the opening use-case is defined first.`,
  ];

  const clauses = [
    openers[seed % openers.length],
    `Local housing here commonly includes ${buildingMix}, which shapes fixing points, access and spacing recommendations.`,
    coastal
      ? `Coastal or humid exposure around ${place.name} is considered when discussing cable coating, mesh grade and cleaning intervals.`
      : `Site conditions in ${place.name} guide material talk, tensioning and finishing details.`,
    trait ? `${trait}.` : "",
    demand ? `A frequent local request: ${demand.charAt(0).toLowerCase()}${demand.slice(1)}.` : "",
    application
      ? `Typical use for this service includes ${application.toLowerCase()}, adapted to the opening you share during assessment.`
      : "",
    place.localDescription,
    service.summary,
  ].filter(Boolean);

  return clauses.join(" ").replace(/\s+/g, " ").trim();
}

export function composeLocalSection(input: {
  service: Service;
  location?: Location;
  area?: Area;
}): { title: string; body: string; bullets: string[] } {
  const place = input.area ?? input.location;
  const title = place
    ? `${input.service.shortName} considerations in ${place.name}`
    : `${input.service.shortName} local considerations`;

  const bullets = [
    ...(place?.verifiedLocalFacts.slice(0, 2) ?? []),
    ...(place?.serviceDemandNotes.slice(0, 2) ?? []),
    ...input.service.safetyInformation.slice(0, 2),
  ].slice(0, 5);

  const body = place
    ? `For ${input.service.name.toLowerCase()} projects in ${place.name}, we combine ${place.name}'s verified local notes with service-specific safety and installation guidance. Pages stay unpublished when critical local fields are empty.`
    : `Local sections publish only when place-level facts and service modules meet quality gates.`;

  return { title, body, bullets };
}
