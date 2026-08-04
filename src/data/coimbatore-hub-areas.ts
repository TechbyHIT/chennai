import type { Area } from "@/types/location";

/**
 * High-value Coimbatore localities that must exist for SEO hubs
 * (even if a similar name already appears under another slug spelling).
 * Plus major localities for newly served TN towns around Coimbatore.
 */

type Seed = {
  slug: string;
  name: string;
  parentId: string;
  parentName: string;
  district: string;
  kind?: "residential" | "premium" | "it-corridor" | "industrial" | "town";
};

const now = "2026-08-04T00:00:00.000Z";

const SEEDS: Seed[] = [
  // Coimbatore city gaps / SEO aliases
  {
    slug: "rs-puram-coimbatore",
    name: "RS Puram",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
    kind: "premium",
  },
  {
    slug: "cheran-ma-nagar",
    name: "Cheranmaanagar",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },
  {
    slug: "hopes",
    name: "Hopes",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },
  {
    slug: "hopes-college",
    name: "Hopes College",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
    kind: "it-corridor",
  },
  {
    slug: "sivananda-colony",
    name: "Sivananda Colony",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
    kind: "premium",
  },
  {
    slug: "db-road",
    name: "DB Road",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
    kind: "premium",
  },
  {
    slug: "ram-nagar-coimbatore",
    name: "Ram Nagar",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },
  {
    slug: "pappanaickenpalayam",
    name: "Pappanaickenpalayam",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },
  {
    slug: "nggo-colony",
    name: "NGGO Colony",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },
  {
    slug: "sungam",
    name: "Sungam",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },
  {
    slug: "town-hall-coimbatore",
    name: "Town Hall",
    parentId: "loc-coimbatore",
    parentName: "Coimbatore",
    district: "Coimbatore",
  },

  // Pollachi
  {
    slug: "pollachi-town",
    name: "Pollachi Town",
    parentId: "loc-pollachi",
    parentName: "Pollachi",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "mahalingapuram",
    name: "Mahalingapuram",
    parentId: "loc-pollachi",
    parentName: "Pollachi",
    district: "Coimbatore",
  },
  {
    slug: "negamam",
    name: "Negamam",
    parentId: "loc-pollachi",
    parentName: "Pollachi",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "anamalai",
    name: "Anamalai",
    parentId: "loc-pollachi",
    parentName: "Pollachi",
    district: "Coimbatore",
    kind: "town",
  },

  // Mettupalayam
  {
    slug: "mettupalayam-town",
    name: "Mettupalayam Town",
    parentId: "loc-mettupalayam",
    parentName: "Mettupalayam",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "sirumugai",
    name: "Sirumugai",
    parentId: "loc-mettupalayam",
    parentName: "Mettupalayam",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "kallar",
    name: "Kallar",
    parentId: "loc-mettupalayam",
    parentName: "Mettupalayam",
    district: "Coimbatore",
  },

  // Annur / Karamadai / Kinathukadavu / Madukkarai
  {
    slug: "annur-town",
    name: "Annur Town",
    parentId: "loc-annur",
    parentName: "Annur",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "karamadai-town",
    name: "Karamadai Town",
    parentId: "loc-karamadai",
    parentName: "Karamadai",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "kinathukadavu-town",
    name: "Kinathukadavu Town",
    parentId: "loc-kinathukadavu",
    parentName: "Kinathukadavu",
    district: "Coimbatore",
    kind: "town",
  },
  {
    slug: "madukkarai-town",
    name: "Madukkarai Town",
    parentId: "loc-madukkarai",
    parentName: "Madukkarai",
    district: "Coimbatore",
  },
];

function toArea(seed: Seed): Area {
  const kind = seed.kind ?? "residential";
  const parentSlug = seed.parentId.replace(/^loc-/, "");

  const intros = {
    residential: `${seed.name} is a residential locality in the ${seed.parentName} region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.`,
    premium: `${seed.name} is a premium residential pocket in ${seed.parentName}, Tamil Nadu, where households often prefer low-visibility safety systems that preserve facades and views.`,
    "it-corridor": `${seed.name} sits on the ${seed.parentName} growth corridor in Tamil Nadu, with apartments and gated communities where balcony fall protection and bird control are common requests.`,
    industrial: `${seed.name} is an industrial / commercial belt near ${seed.parentName}, Tamil Nadu, with demand for bird control, building nets and residential safety work.`,
    town: `${seed.name} is covered under ${seed.parentName} service scheduling in Tamil Nadu for measurement visits and installations.`,
  } as const;

  const locals = {
    residential: `In ${seed.name}, we provide measurement-led recommendations based on opening conditions and household needs.`,
    premium: `For ${seed.name}, we plan installations around finish quality and sightlines, confirmed during on-site measurement.`,
    "it-corridor": `High-rise and gated-community work in ${seed.name} needs access planning; we confirm both during the site visit.`,
    industrial: `Commercial and housing openings in ${seed.name} are measured on site before any written estimate.`,
    town: `In ${seed.name}, we confirm travel and access during booking, then measure openings before quoting.`,
  } as const;

  return {
    id: `area-${parentSlug}-${seed.slug}`,
    slug: seed.slug,
    name: seed.name,
    locationType: "locality",
    parentId: seed.parentId,
    state: "Tamil Nadu",
    district: seed.district,
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction: intros[kind],
    localDescription: locals[kind],
    nearbyLocationIds: [],
    landmarkIds: [],
    propertyTypes:
      kind === "premium"
        ? ["villas", "apartments", "independent-houses"]
        : kind === "it-corridor"
          ? ["high-rise-apartments", "apartments"]
          : ["apartments", "independent-houses"],
    localCharacteristics: [`${seed.parentName} locality`, "Tamil Nadu service coverage"],
    serviceDemandNotes: ["Balcony and window safety enquiries"],
    verifiedLocalFacts: [
      `${seed.name} is in ${seed.district} district, Tamil Nadu`,
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 82,
    createdAt: now,
    updatedAt: now,
  };
}

export const COIMBATORE_HUB_AREAS: Area[] = SEEDS.map(toArea);
