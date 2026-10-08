import type { Area } from "@/types/location";

/**
 * Named apartment and gated-community projects. Each record becomes one
 * locality URL plus a service page for every published service.
 * Only projects that are real communities in that city are listed.
 */
const NOW = "2026-10-08T00:00:00.000Z";

type Project = {
  city: "chennai" | "avadi";
  slug: string;
  name: string;
  locality: string;
  kind: "gated" | "towers";
};

const PROJECTS: Project[] = [
  // Chennai
  { city: "chennai", slug: "casagrand-supremus", name: "Casagrand Supremus", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "casagrand-crescendo", name: "Casagrand Crescendo", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "casagrand-bellissimo", name: "Casagrand Bellissimo", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "casagrand-zenith", name: "Casagrand Zenith", locality: "Sholinganallur", kind: "towers" },
  { city: "chennai", slug: "casagrand-irene", name: "Casagrand Irene", locality: "Perumbakkam", kind: "towers" },
  { city: "chennai", slug: "casagrand-asta", name: "Casagrand Asta", locality: "Perumbakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-pavilion", name: "Casagrand Pavilion", locality: "Sholinganallur", kind: "towers" },
  { city: "chennai", slug: "casagrand-palm-springs", name: "Casagrand Palm Springs", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "prestige-bella-vista", name: "Prestige Bella Vista", locality: "Iyyappanthangal", kind: "towers" },
  { city: "chennai", slug: "prestige-courtyards", name: "Prestige Courtyards", locality: "Iyyappanthangal", kind: "gated" },
  { city: "chennai", slug: "brigade-buena-vista", name: "Brigade Buena Vista", locality: "Mogappair", kind: "towers" },
  { city: "chennai", slug: "brigade-residences", name: "Brigade Residences", locality: "Perungudi", kind: "towers" },
  { city: "chennai", slug: "mantri-synergy", name: "Mantri Synergy", locality: "OMR", kind: "towers" },
  { city: "chennai", slug: "akshaya-today", name: "Akshaya Today", locality: "Sholinganallur", kind: "towers" },
  { city: "chennai", slug: "akshaya-republic", name: "Akshaya Republic", locality: "Kelambakkam", kind: "gated" },
  { city: "chennai", slug: "akshaya-metropolis", name: "Akshaya Metropolis", locality: "Pallavaram", kind: "towers" },
  { city: "chennai", slug: "alliance-orchid-springs", name: "Alliance Orchid Springs", locality: "Korattur", kind: "gated" },
  { city: "chennai", slug: "alliance-humming-gardens", name: "Alliance Humming Gardens", locality: "Korattur", kind: "gated" },
  { city: "chennai", slug: "olympia-grande", name: "Olympia Grande", locality: "Navalur", kind: "gated" },
  { city: "chennai", slug: "olympia-panache", name: "Olympia Panache", locality: "Navalur", kind: "towers" },
  { city: "chennai", slug: "purva-windermere", name: "Purva Windermere", locality: "Pallikaranai", kind: "towers" },
  { city: "chennai", slug: "purva-swanlake", name: "Purva Swanlake", locality: "OMR", kind: "gated" },
  { city: "chennai", slug: "sobha-gardenia", name: "Sobha Gardenia", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "sobha-meritta", name: "Sobha Meritta", locality: "Kelambakkam", kind: "gated" },
  { city: "chennai", slug: "l-and-t-raintree-boulevard", name: "L&T Raintree Boulevard", locality: "Manapakkam", kind: "towers" },
  { city: "chennai", slug: "l-and-t-emerald-isle", name: "L&T Emerald Isle", locality: "Manapakkam", kind: "towers" },
  { city: "chennai", slug: "dlf-commanders-court", name: "DLF Commanders Court", locality: "Egmore", kind: "towers" },
  { city: "chennai", slug: "tvh-ouranya-bay", name: "TVH Ouranya Bay", locality: "ECR", kind: "towers" },
  { city: "chennai", slug: "tvh-vista-heights", name: "TVH Vista Heights", locality: "Anna Nagar", kind: "towers" },
  { city: "chennai", slug: "tvh-taus", name: "TVH Taus", locality: "OMR", kind: "towers" },
  { city: "chennai", slug: "navins-starwood-towers", name: "Navin's Starwood Towers", locality: "Medavakkam", kind: "towers" },
  { city: "chennai", slug: "ceebros-boulevard", name: "Ceebros Boulevard", locality: "Thoraipakkam", kind: "towers" },
  { city: "chennai", slug: "ceebros-one-paramount", name: "Ceebros One Paramount", locality: "Taramani", kind: "towers" },
  { city: "chennai", slug: "arihant-frangipani", name: "Arihant Frangipani", locality: "Perungudi", kind: "towers" },
  { city: "chennai", slug: "arihant-advika", name: "Arihant Advika", locality: "Sholinganallur", kind: "towers" },
  { city: "chennai", slug: "bollineni-hillside", name: "Bollineni Hillside", locality: "Perumbakkam", kind: "gated" },
  { city: "chennai", slug: "appaswamy-altezza", name: "Appaswamy Altezza", locality: "Kilpauk", kind: "towers" },
  // Porur and the west corridor
  { city: "chennai", slug: "casagrand-osaka", name: "Casagrand Osaka", locality: "Porur", kind: "gated" },
  { city: "chennai", slug: "appaswamy-platina", name: "Appaswamy Platina", locality: "Porur", kind: "gated" },
  { city: "chennai", slug: "dra-truliv-porur", name: "DRA Truliv", locality: "Porur", kind: "towers" },
  { city: "chennai", slug: "lancor-subhashree", name: "Lancor Subhashree", locality: "Porur", kind: "towers" },
  { city: "chennai", slug: "radiance-royale", name: "Radiance Royale", locality: "Porur", kind: "towers" },
  { city: "chennai", slug: "xs-real-symphony", name: "XS Real Symphony", locality: "Porur", kind: "towers" },
  { city: "chennai", slug: "osian-chlorophyll", name: "Osian Chlorophyll", locality: "Porur", kind: "towers" },
  { city: "chennai", slug: "jkb-tulips-park", name: "JKB Tulips Park", locality: "Porur", kind: "gated" },
  { city: "chennai", slug: "green-leaves-lemon-grass", name: "Green Leaves Lemon Grass", locality: "Porur", kind: "towers" },
  { city: "chennai", slug: "casagrand-linore", name: "Casagrand Linore", locality: "Kattupakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-ventra", name: "Casagrand Ventra", locality: "Kattupakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-elysium", name: "Casagrand Elysium", locality: "Manapakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-majestica", name: "Casagrand Majestica", locality: "Manapakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-utopia", name: "Casagrand Utopia", locality: "Manapakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-highclere", name: "Casagrand Highclere", locality: "Kundrathur", kind: "towers" },
  { city: "chennai", slug: "casagrand-massimo", name: "Casagrand Massimo", locality: "Kundrathur", kind: "gated" },
  // Chennai, other localities
  { city: "chennai", slug: "casagrand-madelyn", name: "Casagrand Madelyn", locality: "Chromepet", kind: "towers" },
  { city: "chennai", slug: "casagrand-mercury", name: "Casagrand Mercury", locality: "Perambur", kind: "gated" },
  { city: "chennai", slug: "casagrand-suncity", name: "Casagrand Suncity", locality: "Kelambakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-casamia", name: "Casagrand Casamia", locality: "Pallavaram", kind: "gated" },
  { city: "chennai", slug: "casagrand-primrose", name: "Casagrand Primrose", locality: "Perungalathur", kind: "gated" },
  { city: "chennai", slug: "casagrand-holachennai", name: "Casagrand Hola Chennai", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "casagrand-flagship", name: "Casagrand Flagship", locality: "Pallikaranai", kind: "gated" },
  { city: "chennai", slug: "casagrand-dior", name: "Casagrand Dior", locality: "Kilpauk", kind: "towers" },
  { city: "chennai", slug: "casagrand-medora", name: "Casagrand Medora", locality: "Korattur", kind: "towers" },
  { city: "chennai", slug: "casagrand-frenchtown", name: "Casagrand Frenchtown", locality: "Kovilancheri", kind: "gated" },
  { city: "chennai", slug: "casagrand-estilo", name: "Casagrand Estilo", locality: "Pallavaram", kind: "towers" },
  { city: "chennai", slug: "casagrand-aria", name: "Casagrand Aria", locality: "Tambaram", kind: "towers" },
  { city: "chennai", slug: "casagrand-southbrooke", name: "Casagrand Southbrooke", locality: "Kalavakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-aspires", name: "Casagrand Aspires", locality: "Karanai", kind: "towers" },
  { city: "chennai", slug: "casagrand-elinor", name: "Casagrand Elinor", locality: "Karanai", kind: "towers" },
  { city: "chennai", slug: "casagrand-millenia", name: "Casagrand Millenia", locality: "Mogappair", kind: "towers" },
  { city: "chennai", slug: "casagrand-royale", name: "Casagrand Royale", locality: "Sholinganallur", kind: "gated" },
  { city: "chennai", slug: "casagrand-estoria", name: "Casagrand Estoria", locality: "Kelambakkam", kind: "towers" },
  { city: "chennai", slug: "casagrand-riviera", name: "Casagrand Riviera", locality: "Pallikaranai", kind: "towers" },
  { city: "chennai", slug: "casagrand-tulipso", name: "Casagrand Tulipso", locality: "Pallikaranai", kind: "towers" },
  { city: "chennai", slug: "casagrand-vienna", name: "Casagrand Vienna", locality: "Adyar", kind: "towers" },
  { city: "chennai", slug: "casagrand-zanora", name: "Casagrand Zanora", locality: "Adyar", kind: "towers" },
  { city: "chennai", slug: "casagrand-marina-bay", name: "Casagrand Marina Bay", locality: "Thiruvanmiyur", kind: "towers" },
  { city: "chennai", slug: "casagrand-aquagrove", name: "Casagrand Aquagrove", locality: "Madhavaram", kind: "gated" },
  { city: "chennai", slug: "casagrand-estia", name: "Casagrand Estia", locality: "East Tambaram", kind: "towers" },
  { city: "chennai", slug: "casagrand-highcity", name: "Casagrand Highcity", locality: "Thirumudivakkam", kind: "gated" },
  { city: "chennai", slug: "casagrand-zodiac", name: "Casagrand Zodiac", locality: "Mogappair", kind: "gated" },
  { city: "chennai", slug: "casagrand-reva", name: "Casagrand Reva", locality: "Pallavaram", kind: "gated" },
  { city: "chennai", slug: "casagrand-jarvis", name: "Casagrand Jarvis", locality: "Siruseri", kind: "gated" },
  { city: "chennai", slug: "casagrand-wesley", name: "Casagrand Wesley", locality: "Arumbakkam", kind: "towers" },
  { city: "chennai", slug: "brigade-stellaris", name: "Brigade Stellaris", locality: "Velachery", kind: "towers" },
  { city: "chennai", slug: "prestige-pallava-gardens", name: "Prestige Pallava Gardens", locality: "Pallavaram", kind: "gated" },
  { city: "chennai", slug: "navins-vijayasree", name: "Navin's Vijayasree", locality: "Anna Nagar", kind: "towers" },
  { city: "chennai", slug: "navins-tara-garden", name: "Navin's Tara Garden", locality: "OMR", kind: "towers" },
  // Avadi
  { city: "avadi", slug: "vgn-fairmont", name: "VGN Fairmont", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "vgn-stafford", name: "VGN Stafford", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "vgn-kensington", name: "VGN Kensington", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "vgn-victoria-park", name: "VGN Victoria Park", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "vgn-mayfield-park", name: "VGN Mayfield Park", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "urbanrise-city-of-joy", name: "Urbanrise City of Joy", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "radiance-icon", name: "Radiance Icon", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "radiance-the-pride", name: "Radiance The Pride", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "radiance-mercury", name: "Radiance Mercury", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "casagrand-castle", name: "Casagrand Castle", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "casagrand-tudor", name: "Casagrand Tudor", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "casagrand-northern-star", name: "Casagrand Northern Star", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "casagrand-smart-town", name: "Casagrand SMART TOWN", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "casagrand-athens", name: "Casagrand Athens", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "casagrand-lorenza", name: "Casagrand Lorenza", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "shriram-the-gateway", name: "Shriram The Gateway", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "tvs-emerald-peninsula", name: "TVS Emerald Peninsula", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "tvs-emerald-haven", name: "TVS Emerald Haven", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "bollineni-bion", name: "Bollineni Bion", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "bollineni-zion", name: "Bollineni Zion", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "bollineni-iris", name: "Bollineni Iris", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "doshi-risington", name: "Doshi Risington", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "doshi-etopia", name: "Doshi Etopia", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "prince-courtyard", name: "Prince Courtyard", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "arihant-north-town", name: "Arihant North Town", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "kg-signature-city", name: "KG Signature City", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "pacifica-hillcrest", name: "Pacifica Hillcrest", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "navins-jayaram-gardens", name: "Navin's Jayaram Gardens", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "navins-hanging-gardens", name: "Navin's Hanging Gardens", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "appaswamy-riveria", name: "Appaswamy The Riveria", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "vgn-aviv-court", name: "VGN Aviv Court", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "vgn-aviv-square", name: "VGN Aviv Square", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "vgn-royal-enclave", name: "VGN Royal Enclave", locality: "Avadi", kind: "gated" },
  { city: "avadi", slug: "vgn-ernest", name: "VGN Ernest", locality: "Avadi", kind: "towers" },
  { city: "avadi", slug: "vgn-amity", name: "VGN Amity", locality: "Avadi", kind: "gated" },
];

function toArea(project: Project): Area {
  const cityName = project.city === "chennai" ? "Chennai" : "Avadi";
  const district = project.city === "chennai" ? "Chennai" : "Tiruvallur";
  const gated = project.kind === "gated";
  return {
    id: `area-${project.city}-${project.slug}`,
    slug: project.slug,
    name: project.name,
    locationType: "locality",
    parentId: `loc-${project.city}`,
    state: "Tamil Nadu",
    district,
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction: gated
      ? `${project.name} in ${project.locality}, ${cityName} is a gated apartment community where balcony, terrace and window openings need measured fall protection that follows community rules.`
      : `${project.name} in ${project.locality}, ${cityName} is an apartment complex where balcony and window openings across the towers need measured fall protection and bird control.`,
    localDescription: gated
      ? `For ${project.name}, installations are planned around community access and facade rules. Materials and spacing are confirmed on site before the quote.`
      : `In ${project.name}, balcony and window openings are measured tower by tower for invisible grills, safety nets and bird control, with society access planned into the visit.`,
    nearbyLocationIds: [],
    landmarkIds: [],
    propertyTypes: ["apartments", "high-rise-apartments"],
    localCharacteristics: gated
      ? ["Gated community", "Apartment towers", "Community facade guidelines"]
      : ["Apartment complex", "High-rise and mid-rise towers", "Society-managed maintenance"],
    serviceDemandNotes: [
      "Apartment balcony safety",
      "Child and pet safety in flats",
      "Pigeon control for balconies",
    ],
    verifiedLocalFacts: [
      `${project.name} is a residential project in ${project.locality}, ${cityName}, Tamil Nadu`,
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 84,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export const EXTRA_APARTMENT_AREAS: Area[] = PROJECTS.map(toArea);

export const EXTRA_APARTMENT_IDS: ReadonlySet<string> = new Set(
  EXTRA_APARTMENT_AREAS.map((area) => area.id),
);
