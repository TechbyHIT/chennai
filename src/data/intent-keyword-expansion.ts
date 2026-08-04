/**
 * Additional high-intent topical keywords (beyond core service names).
 * Every keyword maps to a real published URL — no thin doorway pages.
 */

export type IntentKeywordLink = {
  label: string;
  href: string;
};

const S = {
  invisible: "/services/invisible-grills/",
  balconyGrill: "/services/balcony-safety-grills/",
  windowGrill: "/services/window-invisible-grills/",
  childGrill: "/services/children-safety-grills/",
  petGrill: "/services/pet-safety-grills/",
  safety: "/services/safety-nets/",
  balconyNet: "/services/balcony-safety-nets/",
  childNet: "/services/children-safety-nets/",
  petNet: "/services/pet-safety-nets/",
  buildingNet: "/services/building-safety-nets/",
  bird: "/services/bird-nets/",
  spikes: "/services/bird-spikes/",
  monkey: "/services/monkey-nets/",
  cloth: "/services/cloth-hangers/",
  contact: "/contact/",
  install: "/installation-process/",
  materials: "/materials-guide/",
  safetyGuide: "/safety-guide/",
  pricing: "/pricing-guide/",
  solutions: "/solutions/",
  childSol: "/solutions/child-balcony-safety/",
  petSol: "/solutions/pet-fall-protection/",
  birdSol: "/solutions/pigeon-balcony-control/",
  highRise: "/solutions/high-rise-window-safety/",
  apartments: "/property-types/apartments/invisible-grills/",
  highRiseApt: "/property-types/high-rise-apartments/safety-nets/",
  faq: "/faq/",
} as const;

export const RESIDENTIAL_SOLUTION_KEYWORDS: IntentKeywordLink[] = [
  { label: "Balcony Fall Protection", href: S.childSol },
  { label: "Balcony Child Protection", href: S.childNet },
  { label: "High Rise Safety Solutions", href: S.highRiseApt },
  { label: "Balcony Security Solutions", href: S.balconyNet },
  { label: "Window Fall Protection", href: S.windowGrill },
  { label: "Open Area Protection", href: S.safety },
  { label: "Balcony Enclosure Solutions", href: S.balconyGrill },
  { label: "Safety Mesh Installation", href: S.balconyNet },
  { label: "Protective Net Systems", href: S.safety },
  { label: "Home Safety Installations", href: S.solutions },
  { label: "Residential Safety Systems", href: S.invisible },
  { label: "Family Safety Solutions", href: S.childSol },
  { label: "Balcony Edge Protection", href: S.balconyGrill },
  { label: "Apartment Protection Systems", href: S.apartments },
  { label: "Balcony Barrier Solutions", href: S.balconyNet },
];

export const BIRD_CONTROL_KEYWORDS: IntentKeywordLink[] = [
  { label: "Bird Proofing Services", href: S.bird },
  { label: "Bird Exclusion Systems", href: S.bird },
  { label: "Bird Nest Prevention", href: S.birdSol },
  { label: "Balcony Bird Control", href: S.birdSol },
  { label: "Terrace Bird Control", href: S.bird },
  { label: "Commercial Bird Control", href: S.bird },
  { label: "Residential Bird Control", href: S.bird },
  { label: "Warehouse Bird Protection", href: S.bird },
  { label: "Factory Bird Control", href: S.bird },
  { label: "Bird Entry Prevention", href: S.bird },
  { label: "Pigeon Nest Removal", href: S.birdSol },
  { label: "Bird Damage Prevention", href: S.bird },
  { label: "Bird Infestation Solutions", href: S.bird },
  { label: "Bird Deterrent Systems", href: S.spikes },
  { label: "Anti Roosting Solutions", href: S.spikes },
];

export const BALCONY_SOLUTION_KEYWORDS: IntentKeywordLink[] = [
  { label: "Balcony Protection Systems", href: S.balconyNet },
  { label: "Balcony Renovation Safety", href: S.balconyGrill },
  { label: "Balcony Security Mesh", href: S.balconyNet },
  { label: "Balcony Edge Safety", href: S.childSol },
  { label: "Balcony Guard Systems", href: S.balconyGrill },
  { label: "Balcony Safety Installation", href: S.install },
  { label: "Balcony Utility Protection", href: S.cloth },
  { label: "Balcony Maintenance Solutions", href: S.safetyGuide },
  { label: "Balcony Living Safety", href: S.balconyNet },
  { label: "Balcony Upgrade Solutions", href: S.balconyGrill },
];

export const WINDOW_PROTECTION_KEYWORDS: IntentKeywordLink[] = [
  { label: "Window Protection Systems", href: S.windowGrill },
  { label: "Window Security Mesh", href: S.safety },
  { label: "Window Child Protection", href: S.childGrill },
  { label: "Window Pet Protection", href: S.petGrill },
  { label: "Window Bird Protection", href: S.bird },
  { label: "Window Safety Solutions", href: S.highRise },
  { label: "Window Opening Protection", href: S.windowGrill },
  { label: "Window Fall Prevention", href: S.windowGrill },
];

export const TERRACE_PROTECTION_KEYWORDS: IntentKeywordLink[] = [
  { label: "Terrace Protection Systems", href: S.balconyNet },
  { label: "Rooftop Safety Solutions", href: S.buildingNet },
  { label: "Roof Edge Protection", href: S.buildingNet },
  { label: "Rooftop Bird Control", href: S.bird },
  { label: "Rooftop Security Nets", href: S.buildingNet },
  { label: "Open Terrace Safety", href: S.safety },
  { label: "Terrace Barrier Systems", href: S.balconyGrill },
  { label: "Terrace Safety Installation", href: S.install },
];

export const UTILITY_AREA_KEYWORDS: IntentKeywordLink[] = [
  { label: "Utility Area Protection", href: S.buildingNet },
  { label: "Utility Shaft Covers", href: S.buildingNet },
  { label: "Service Duct Protection", href: S.buildingNet },
  { label: "Open Shaft Protection", href: S.buildingNet },
  { label: "Balcony Utility Covers", href: S.cloth },
  { label: "Utility Mesh Solutions", href: S.safety },
  { label: "Ventilation Opening Protection", href: S.bird },
  { label: "Service Area Nets", href: S.buildingNet },
];

export const COMMERCIAL_KEYWORDS: IntentKeywordLink[] = [
  { label: "Office Safety Nets", href: S.buildingNet },
  { label: "Hotel Bird Control", href: S.bird },
  { label: "Hospital Safety Systems", href: S.safety },
  { label: "School Safety Solutions", href: S.childNet },
  { label: "College Safety Nets", href: S.safety },
  { label: "Mall Safety Installations", href: S.buildingNet },
  { label: "Warehouse Protection", href: S.buildingNet },
  { label: "Factory Safety Installations", href: S.buildingNet },
  { label: "Industrial Protection Systems", href: S.buildingNet },
  { label: "Commercial Safety Solutions", href: S.buildingNet },
];

export const CONSTRUCTION_KEYWORDS: IntentKeywordLink[] = [
  { label: "Edge Protection Nets", href: S.buildingNet },
  { label: "Worker Protection Nets", href: S.buildingNet },
  { label: "Site Safety Nets", href: S.buildingNet },
  { label: "Building Edge Safety", href: S.buildingNet },
  { label: "Exterior Protection Nets", href: S.buildingNet },
  { label: "Temporary Safety Barriers", href: S.buildingNet },
  { label: "Construction Fall Prevention", href: S.buildingNet },
  { label: "High Rise Construction Nets", href: S.highRiseApt },
];

export const PREMIUM_KEYWORDS: IntentKeywordLink[] = [
  { label: "Luxury Balcony Protection", href: S.balconyGrill },
  { label: "Premium Invisible Solutions", href: S.invisible },
  { label: "Designer Balcony Safety", href: S.balconyGrill },
  { label: "Modern Home Protection", href: S.invisible },
  { label: "Smart Balcony Systems", href: S.balconyNet },
  { label: "Elegant Safety Solutions", href: S.invisible },
  { label: "Premium Home Upgrades", href: S.materials },
  { label: "Contemporary Balcony Design", href: S.balconyGrill },
];

export const MAINTENANCE_KEYWORDS: IntentKeywordLink[] = [
  { label: "Safety Net Inspection", href: S.contact },
  { label: "Annual Net Maintenance", href: S.safetyGuide },
  { label: "Net Replacement Service", href: S.contact },
  { label: "Grill Maintenance Service", href: S.materials },
  { label: "Safety System Upgrade", href: S.contact },
  { label: "Net Reinstallation", href: S.install },
  { label: "Mesh Replacement", href: S.contact },
  { label: "Hardware Replacement", href: S.contact },
];

export const EMERGENCY_KEYWORDS: IntentKeywordLink[] = [
  { label: "Emergency Bird Removal", href: S.contact },
  { label: "Urgent Net Installation", href: S.contact },
  { label: "Same Day Safety Installation", href: S.contact },
  { label: "Express Installation", href: S.contact },
  { label: "Instant Site Visit", href: S.contact },
  { label: "Emergency Balcony Protection", href: S.childSol },
  { label: "Quick Safety Solutions", href: S.contact },
  { label: "Fast Installation Team", href: S.install },
];

export const SEASONAL_KEYWORDS: IntentKeywordLink[] = [
  { label: "Rain Protection Solutions", href: "/guides/monsoon-ready-balcony-protection/" },
  { label: "Monsoon Balcony Safety", href: "/guides/monsoon-ready-balcony-protection/" },
  { label: "Summer Bird Control", href: S.bird },
  { label: "Winter Balcony Protection", href: S.balconyNet },
  { label: "Storm Safety Nets", href: S.buildingNet },
  { label: "Wind Resistant Nets", href: S.buildingNet },
  { label: "UV Resistant Protection", href: S.materials },
  { label: "All Weather Safety Systems", href: S.safety },
];

export const TRUST_INTENT_KEYWORDS: IntentKeywordLink[] = [
  { label: "Trusted Installation Experts", href: "/about/" },
  { label: "Professional Safety Installers", href: S.install },
  { label: "Local Installation Team", href: "/locations/" },
  { label: "Verified Safety Company", href: "/about/" },
  { label: "Experienced Installation Service", href: S.install },
  { label: "Residential Protection Experts", href: S.apartments },
  { label: "Commercial Protection Experts", href: S.buildingNet },
  { label: "Certified Installation Team", href: "/about/" },
  { label: "Premium Service Provider", href: S.invisible },
  { label: "Home Improvement Specialists", href: S.solutions },
];

export const SMART_HOME_KEYWORDS: IntentKeywordLink[] = [
  { label: "Smart Balcony Protection", href: S.balconyGrill },
  { label: "Modern Apartment Safety", href: S.apartments },
  { label: "Home Improvement Solutions", href: S.solutions },
  { label: "Safe Living Solutions", href: S.childSol },
  { label: "Family Protection Systems", href: S.childNet },
  { label: "Balcony Lifestyle Solutions", href: S.cloth },
  { label: "Home Security Upgrades", href: S.invisible },
  { label: "Property Safety Enhancements", href: S.safety },
];

/** Voice / AI-style questions → real pages with answers. */
export const VOICE_SEARCH_KEYWORDS: IntentKeywordLink[] = [
  {
    label: "Who installs balcony safety systems?",
    href: S.balconyNet,
  },
  {
    label: "Which safety solution is best for apartments?",
    href: S.apartments,
  },
  {
    label: "How can I protect my balcony from birds?",
    href: S.birdSol,
  },
  {
    label: "What is the safest balcony protection option?",
    href: S.childSol,
  },
  {
    label: "Which net is suitable for pets?",
    href: S.petSol,
  },
  {
    label: "Which solution keeps pigeons away?",
    href: S.birdSol,
  },
  {
    label: "How do I make my balcony child-safe?",
    href: S.childSol,
  },
  {
    label: "What is the best bird-proofing solution?",
    href: S.bird,
  },
  {
    label: "Which protection system preserves the view?",
    href: S.invisible,
  },
  {
    label: "What safety option works for high-rise apartments?",
    href: S.highRiseApt,
  },
];

export const INTENT_KEYWORD_MENU_COLUMNS: Array<{
  title: string;
  href: string;
  links: IntentKeywordLink[];
}> = [
  {
    title: "Residential Solutions",
    href: S.solutions,
    links: RESIDENTIAL_SOLUTION_KEYWORDS,
  },
  {
    title: "Bird Control Topics",
    href: S.bird,
    links: BIRD_CONTROL_KEYWORDS,
  },
  {
    title: "Balcony Solutions",
    href: S.balconyNet,
    links: BALCONY_SOLUTION_KEYWORDS,
  },
  {
    title: "Window Protection",
    href: S.windowGrill,
    links: WINDOW_PROTECTION_KEYWORDS,
  },
  {
    title: "Terrace Protection",
    href: S.buildingNet,
    links: TERRACE_PROTECTION_KEYWORDS,
  },
  {
    title: "Utility Area",
    href: S.buildingNet,
    links: UTILITY_AREA_KEYWORDS,
  },
  {
    title: "Commercial",
    href: S.buildingNet,
    links: COMMERCIAL_KEYWORDS,
  },
  {
    title: "Construction",
    href: S.buildingNet,
    links: CONSTRUCTION_KEYWORDS,
  },
  {
    title: "Premium & Seasonal",
    href: S.invisible,
    links: [...PREMIUM_KEYWORDS, ...SEASONAL_KEYWORDS],
  },
  {
    title: "Maintenance & Emergency",
    href: S.contact,
    links: [...MAINTENANCE_KEYWORDS, ...EMERGENCY_KEYWORDS],
  },
  {
    title: "Trust & Smart Living",
    href: "/about/",
    links: [...TRUST_INTENT_KEYWORDS, ...SMART_HOME_KEYWORDS],
  },
  {
    title: "Voice Search Questions",
    href: S.faq,
    links: VOICE_SEARCH_KEYWORDS,
  },
];

export function getAllIntentKeywordLinks(): IntentKeywordLink[] {
  return INTENT_KEYWORD_MENU_COLUMNS.flatMap((column) => column.links);
}
