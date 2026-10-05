/**
 * Tamil Nadu district + city/town coverage for geo_nodes seeding.
 * Coverage is deliberately limited to places we can genuinely schedule visits for:
 * the Chennai 150km belt (primary SEO focus, listed first so it leads every
 * ordered list), Coimbatore, and the named regional cities.
 * Satellite towns outside this list stay reachable as localities under their parent city.
 *
 * Order matters: `buildTamilNaduLocations()` preserves it, and the homepage,
 * locations index and sitemaps all iterate in this order.
 */

export type TnDistrictSeed = {
  slug: string;
  name: string;
  cities: Array<{ slug: string; name: string; served?: boolean }>;
};

export const TN_STATE = {
  id: "geo-state-tamil-nadu",
  slug: "tamil-nadu",
  name: "Tamil Nadu",
} as const;

/** Helper — every city in this file is a real place we can schedule visits for. */
const S = true;

export const TN_DISTRICTS: TnDistrictSeed[] = [
  // Chennai 150km belt — Chennai plus the Chengalpattu, Kanchipuram,
  // Tiruvallur, Ranipet, Vellore, Tiruvannamalai and Villupuram district
  // towns that fall inside the radius.
  {
    slug: "chennai",
    name: "Chennai",
    cities: [
      { slug: "chennai", name: "Chennai", served: S },
      { slug: "tambaram", name: "Tambaram", served: S },
    ],
  },
  {
    slug: "chengalpattu",
    name: "Chengalpattu",
    cities: [
      { slug: "chengalpattu", name: "Chengalpattu", served: S },
      { slug: "mahabalipuram", name: "Mahabalipuram", served: S },
      { slug: "guduvancheri", name: "Guduvancheri", served: S },
    ],
  },
  {
    slug: "kanchipuram",
    name: "Kanchipuram",
    cities: [
      { slug: "kanchipuram", name: "Kanchipuram", served: S },
      { slug: "sriperumbudur", name: "Sriperumbudur", served: S },
    ],
  },
  {
    slug: "tiruvallur",
    name: "Tiruvallur",
    cities: [
      { slug: "tiruvallur", name: "Tiruvallur", served: S },
      { slug: "avadi", name: "Avadi", served: S },
      { slug: "poonamallee", name: "Poonamallee", served: S },
      { slug: "tiruttani", name: "Tiruttani", served: S },
    ],
  },
  {
    slug: "ranipet",
    name: "Ranipet",
    cities: [
      { slug: "ranipet", name: "Ranipet", served: S },
      { slug: "arakkonam", name: "Arakkonam", served: S },
      { slug: "arcot", name: "Arcot", served: S },
    ],
  },
  {
    slug: "vellore",
    name: "Vellore",
    cities: [{ slug: "vellore", name: "Vellore", served: S }],
  },
  {
    slug: "tiruvannamalai",
    name: "Tiruvannamalai",
    cities: [
      { slug: "vandavasi", name: "Vandavasi", served: S },
      { slug: "cheyyar", name: "Cheyyar", served: S },
      { slug: "arani", name: "Arani", served: S },
    ],
  },
  {
    slug: "villupuram",
    name: "Villupuram",
    cities: [{ slug: "tindivanam", name: "Tindivanam", served: S }],
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    cities: [{ slug: "coimbatore", name: "Coimbatore", served: S }],
  },
  {
    slug: "tiruppur",
    name: "Tiruppur",
    cities: [{ slug: "tiruppur", name: "Tiruppur", served: S }],
  },
  {
    slug: "erode",
    name: "Erode",
    cities: [{ slug: "erode", name: "Erode", served: S }],
  },
  {
    slug: "salem",
    name: "Salem",
    cities: [{ slug: "salem", name: "Salem", served: S }],
  },
  {
    slug: "madurai",
    name: "Madurai",
    cities: [{ slug: "madurai", name: "Madurai", served: S }],
  },
  {
    slug: "tiruchirappalli",
    name: "Tiruchirappalli",
    cities: [{ slug: "tiruchirappalli", name: "Tiruchirappalli", served: S }],
  },
  {
    slug: "tirunelveli",
    name: "Tirunelveli",
    cities: [{ slug: "tirunelveli", name: "Tirunelveli", served: S }],
  },
  {
    slug: "nilgiris",
    name: "The Nilgiris",
    cities: [{ slug: "ooty", name: "Ooty", served: S }],
  },
  {
    slug: "krishnagiri",
    name: "Krishnagiri",
    cities: [{ slug: "hosur", name: "Hosur", served: S }],
  },
];
