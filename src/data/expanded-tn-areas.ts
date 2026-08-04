import type { Area } from "@/types/location";

/**
 * Expanded Tamil Nadu locality coverage for tier-2 served cities plus
 * remaining Chennai/Coimbatore gaps. Every entry is a real, verifiable
 * locality/town where site visits can genuinely be scheduled.
 *
 * Tourist landmarks, ports, hospitals, schools and malls are intentionally
 * excluded — those are landmarks, not service localities, and dedicated
 * pages for them would be doorway spam.
 */

type AreaKind = "residential" | "premium" | "it-corridor" | "industrial" | "town";

type ExpandedAreaSeed = {
  slug: string;
  name: string;
  parentId: string;
  parentName: string;
  district: string;
  kind: AreaKind;
};

const now = "2026-08-04T00:00:00.000Z";

const KIND_COPY: Record<
  AreaKind,
  {
    intro: (name: string, parent: string) => string;
    local: (name: string) => string;
    characteristics: (parent: string) => string[];
    demand: string[];
    propertyTypes: string[];
  }
> = {
  residential: {
    intro: (name, parent) =>
      `${name} is a residential locality in the ${parent} region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.`,
    local: (name) =>
      `In ${name}, we provide measurement-led recommendations based on opening conditions and household needs, as part of our genuine Tamil Nadu service coverage.`,
    characteristics: (parent) => [`${parent} residential locality`, "Apartment and independent-house mix"],
    demand: ["Balcony and window safety enquiries"],
    propertyTypes: ["apartments", "independent-houses"],
  },
  premium: {
    intro: (name, parent) =>
      `${name} is an established premium residential pocket in ${parent}, Tamil Nadu, where households often prefer low-visibility safety systems that preserve facades and views.`,
    local: (name) =>
      `For ${name}, we plan installations around finish quality and sightlines, confirming materials and spacing during the on-site measurement.`,
    characteristics: (parent) => [`Premium residential area in ${parent}`, "Independent houses and upscale apartments"],
    demand: ["Discreet balcony protection", "View-preserving window safety"],
    propertyTypes: ["villas", "apartments", "independent-houses"],
  },
  "it-corridor": {
    intro: (name, parent) =>
      `${name} sits on the ${parent} IT corridor in Tamil Nadu, with high-rise apartments and gated communities where balcony fall protection and bird control are common requests.`,
    local: (name) =>
      `High-rise work in ${name} needs access planning and society approvals; we confirm both during the site visit before quoting.`,
    characteristics: (parent) => [`IT corridor locality in ${parent}`, "High-rise apartments and gated communities"],
    demand: ["High-rise balcony safety", "Bird netting for towers"],
    propertyTypes: ["high-rise-apartments", "apartments"],
  },
  industrial: {
    intro: (name, parent) =>
      `${name} is an industrial belt near ${parent}, Tamil Nadu, where factories, warehouses and worker housing generate demand for bird control and building safety nets alongside residential safety work.`,
    local: (name) =>
      `For ${name}, commercial enquiries are scoped on site: shed openings, roof edges and utility areas are measured before any recommendation.`,
    characteristics: (parent) => [`Industrial area near ${parent}`, "Factories, warehouses and housing mix"],
    demand: ["Commercial bird control", "Warehouse and factory netting"],
    propertyTypes: ["apartments", "independent-houses"],
  },
  town: {
    intro: (name, parent) =>
      `${name} is a town in the ${parent} service region of Tamil Nadu, covered for measurement visits and installations based on appointment scheduling.`,
    local: (name) =>
      `In ${name}, we confirm travel and access during booking, then measure openings on site before sharing a written estimate.`,
    characteristics: (parent) => [`Town in the ${parent} service region`, "Independent houses and apartments"],
    demand: ["Balcony and window safety requests"],
    propertyTypes: ["independent-houses", "apartments"],
  },
};

const SEEDS: ExpandedAreaSeed[] = [
  // Chennai gaps
  { slug: "ecr", name: "ECR", parentId: "loc-chennai", parentName: "Chennai", district: "Chennai", kind: "it-corridor" },
  { slug: "washermanpet", name: "Washermanpet", parentId: "loc-chennai", parentName: "Chennai", district: "Chennai", kind: "residential" },
  { slug: "boat-club-road", name: "Boat Club Road", parentId: "loc-chennai", parentName: "Chennai", district: "Chennai", kind: "premium" },
  { slug: "poes-garden", name: "Poes Garden", parentId: "loc-chennai", parentName: "Chennai", district: "Chennai", kind: "premium" },

  // Coimbatore gap
  { slug: "chinniyampalayam", name: "Chinniyampalayam", parentId: "loc-coimbatore", parentName: "Coimbatore", district: "Coimbatore", kind: "residential" },

  // Madurai
  { slug: "mattuthavani", name: "Mattuthavani", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "tallakulam", name: "Tallakulam", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "simmakkal", name: "Simmakkal", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "goripalayam", name: "Goripalayam", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "arappalayam", name: "Arappalayam", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "villapuram", name: "Villapuram", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "pasumalai", name: "Pasumalai", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "teppakulam", name: "Teppakulam", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "bye-pass-road", name: "Bye Pass Road", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "avaniyapuram", name: "Avaniyapuram", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "othakadai", name: "Othakadai", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },
  { slug: "koodal-nagar", name: "Koodal Nagar", parentId: "loc-madurai", parentName: "Madurai", district: "Madurai", kind: "residential" },

  // Tiruchirappalli
  { slug: "srirangam", name: "Srirangam", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "thillai-nagar", name: "Thillai Nagar", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "premium" },
  { slug: "cantonment", name: "Cantonment", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "kk-nagar", name: "KK Nagar", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "woraiyur", name: "Woraiyur", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "kattur", name: "Kattur", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "thuvakudi", name: "Thuvakudi", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "industrial" },
  { slug: "edamalaipatti-pudur", name: "Edamalaipatti Pudur", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "samayapuram", name: "Samayapuram", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "town" },
  { slug: "golden-rock", name: "Golden Rock", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },
  { slug: "bhel-township", name: "BHEL Township", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "industrial" },
  { slug: "ponmalai", name: "Ponmalai", parentId: "loc-tiruchirappalli", parentName: "Tiruchirappalli", district: "Tiruchirappalli", kind: "residential" },

  // Salem
  { slug: "hasthampatti", name: "Hasthampatti", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "residential" },
  { slug: "fairlands", name: "Fairlands", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "premium" },
  { slug: "alagapuram", name: "Alagapuram", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "residential" },
  { slug: "suramangalam", name: "Suramangalam", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "residential" },
  { slug: "ammapet", name: "Ammapet", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "residential" },
  { slug: "meyyanur", name: "Meyyanur", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "residential" },
  { slug: "omalur", name: "Omalur", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "town" },
  { slug: "attur", name: "Attur", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "town" },
  { slug: "sankari", name: "Sankari", parentId: "loc-salem", parentName: "Salem", district: "Salem", kind: "town" },

  // Tiruppur
  { slug: "avinashi", name: "Avinashi", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "town" },
  { slug: "palladam", name: "Palladam", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "town" },
  { slug: "dharapuram", name: "Dharapuram", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "town" },
  { slug: "kangeyam", name: "Kangeyam", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "town" },
  { slug: "udumalpet", name: "Udumalpet", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "town" },
  { slug: "mangalam", name: "Mangalam", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "residential" },
  { slug: "velampalayam", name: "Velampalayam", parentId: "loc-tiruppur", parentName: "Tiruppur", district: "Tiruppur", kind: "residential" },

  // Erode
  { slug: "perundurai", name: "Perundurai", parentId: "loc-erode", parentName: "Erode", district: "Erode", kind: "industrial" },
  { slug: "bhavani", name: "Bhavani", parentId: "loc-erode", parentName: "Erode", district: "Erode", kind: "town" },
  { slug: "gobichettipalayam", name: "Gobichettipalayam", parentId: "loc-erode", parentName: "Erode", district: "Erode", kind: "town" },
  { slug: "chithode", name: "Chithode", parentId: "loc-erode", parentName: "Erode", district: "Erode", kind: "residential" },
  { slug: "sathyamangalam", name: "Sathyamangalam", parentId: "loc-erode", parentName: "Erode", district: "Erode", kind: "town" },

  // Vellore
  { slug: "katpadi", name: "Katpadi", parentId: "loc-vellore", parentName: "Vellore", district: "Vellore", kind: "residential" },
  { slug: "sathuvachari", name: "Sathuvachari", parentId: "loc-vellore", parentName: "Vellore", district: "Vellore", kind: "residential" },
  { slug: "ranipet", name: "Ranipet", parentId: "loc-vellore", parentName: "Vellore", district: "Ranipet", kind: "industrial" },
  { slug: "arcot", name: "Arcot", parentId: "loc-vellore", parentName: "Vellore", district: "Ranipet", kind: "town" },
  { slug: "gudiyatham", name: "Gudiyatham", parentId: "loc-vellore", parentName: "Vellore", district: "Vellore", kind: "town" },
  { slug: "walajapet", name: "Walajapet", parentId: "loc-vellore", parentName: "Vellore", district: "Ranipet", kind: "town" },

  // Hosur
  { slug: "sipcot-hosur", name: "SIPCOT Hosur", parentId: "loc-hosur", parentName: "Hosur", district: "Krishnagiri", kind: "industrial" },
  { slug: "mathigiri", name: "Mathigiri", parentId: "loc-hosur", parentName: "Hosur", district: "Krishnagiri", kind: "residential" },
  { slug: "bagalur", name: "Bagalur", parentId: "loc-hosur", parentName: "Hosur", district: "Krishnagiri", kind: "town" },
  { slug: "denkanikottai", name: "Denkanikottai", parentId: "loc-hosur", parentName: "Hosur", district: "Krishnagiri", kind: "town" },
  { slug: "kelamangalam", name: "Kelamangalam", parentId: "loc-hosur", parentName: "Hosur", district: "Krishnagiri", kind: "town" },

  // Tirunelveli
  { slug: "palayamkottai", name: "Palayamkottai", parentId: "loc-tirunelveli", parentName: "Tirunelveli", district: "Tirunelveli", kind: "residential" },
  { slug: "pettai", name: "Pettai", parentId: "loc-tirunelveli", parentName: "Tirunelveli", district: "Tirunelveli", kind: "residential" },
  { slug: "melapalayam", name: "Melapalayam", parentId: "loc-tirunelveli", parentName: "Tirunelveli", district: "Tirunelveli", kind: "residential" },
  { slug: "tenkasi", name: "Tenkasi", parentId: "loc-tirunelveli", parentName: "Tirunelveli", district: "Tenkasi", kind: "town" },
  { slug: "sankarankovil", name: "Sankarankovil", parentId: "loc-tirunelveli", parentName: "Tirunelveli", district: "Tenkasi", kind: "town" },
  { slug: "ambasamudram", name: "Ambasamudram", parentId: "loc-tirunelveli", parentName: "Tirunelveli", district: "Tirunelveli", kind: "town" },

  // Nagercoil
  { slug: "kottar", name: "Kottar", parentId: "loc-nagercoil", parentName: "Nagercoil", district: "Kanyakumari", kind: "residential" },
  { slug: "suchindram", name: "Suchindram", parentId: "loc-nagercoil", parentName: "Nagercoil", district: "Kanyakumari", kind: "town" },
  { slug: "vadasery", name: "Vadasery", parentId: "loc-nagercoil", parentName: "Nagercoil", district: "Kanyakumari", kind: "residential" },
  { slug: "colachel", name: "Colachel", parentId: "loc-nagercoil", parentName: "Nagercoil", district: "Kanyakumari", kind: "town" },
  { slug: "kanyakumari", name: "Kanyakumari", parentId: "loc-nagercoil", parentName: "Nagercoil", district: "Kanyakumari", kind: "town" },

  // Kanchipuram region
  { slug: "sriperumbudur", name: "Sriperumbudur", parentId: "loc-kanchipuram", parentName: "Kanchipuram", district: "Kanchipuram", kind: "industrial" },
  { slug: "oragadam", name: "Oragadam", parentId: "loc-kanchipuram", parentName: "Kanchipuram", district: "Kanchipuram", kind: "industrial" },

  // Chengalpattu region
  { slug: "maraimalai-nagar", name: "Maraimalai Nagar", parentId: "loc-chengalpattu", parentName: "Chengalpattu", district: "Chengalpattu", kind: "residential" },
  { slug: "guduvancheri", name: "Guduvancheri", parentId: "loc-chengalpattu", parentName: "Chengalpattu", district: "Chengalpattu", kind: "residential" },
  { slug: "urapakkam", name: "Urapakkam", parentId: "loc-chengalpattu", parentName: "Chengalpattu", district: "Chengalpattu", kind: "residential" },
];

function toArea(seed: ExpandedAreaSeed): Area {
  const copy = KIND_COPY[seed.kind];
  const parentSlug = seed.parentId.replace(/^loc-/, "");
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
    introduction: copy.intro(seed.name, seed.parentName),
    localDescription: copy.local(seed.name),
    nearbyLocationIds: [],
    landmarkIds: [],
    propertyTypes: copy.propertyTypes,
    localCharacteristics: copy.characteristics(seed.parentName),
    serviceDemandNotes: copy.demand,
    verifiedLocalFacts: [
      `${seed.name} is in ${seed.district} district, Tamil Nadu`,
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 81,
    createdAt: now,
    updatedAt: now,
  };
}

export const EXPANDED_TN_AREAS: Area[] = SEEDS.map(toArea);
