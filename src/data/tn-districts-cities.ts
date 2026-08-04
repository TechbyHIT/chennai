/**
 * Expanded Tamil Nadu district + city/town coverage for geo_nodes seeding.
 * Coimbatore is the primary service hub; all district HQ cities and major towns
 * are marked served so city hubs publish for genuine appointment coverage.
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
  {
    slug: "coimbatore",
    name: "Coimbatore",
    cities: [
      { slug: "coimbatore", name: "Coimbatore", served: S },
      { slug: "pollachi", name: "Pollachi", served: S },
      { slug: "mettupalayam", name: "Mettupalayam", served: S },
      { slug: "annur", name: "Annur", served: S },
      { slug: "karamadai", name: "Karamadai", served: S },
      { slug: "kinathukadavu", name: "Kinathukadavu", served: S },
      { slug: "madukkarai", name: "Madukkarai", served: S },
    ],
  },
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
    ],
  },
  {
    slug: "tiruppur",
    name: "Tiruppur",
    cities: [
      { slug: "tiruppur", name: "Tiruppur", served: S },
      { slug: "avinashi", name: "Avinashi", served: S },
      { slug: "palladam", name: "Palladam", served: S },
      { slug: "udumalpet", name: "Udumalpet", served: S },
      { slug: "dharapuram", name: "Dharapuram", served: S },
      { slug: "kangeyam", name: "Kangeyam", served: S },
    ],
  },
  {
    slug: "erode",
    name: "Erode",
    cities: [
      { slug: "erode", name: "Erode", served: S },
      { slug: "perundurai", name: "Perundurai", served: S },
      { slug: "bhavani", name: "Bhavani", served: S },
      { slug: "gobichettipalayam", name: "Gobichettipalayam", served: S },
      { slug: "sathyamangalam", name: "Sathyamangalam", served: S },
    ],
  },
  {
    slug: "salem",
    name: "Salem",
    cities: [
      { slug: "salem", name: "Salem", served: S },
      { slug: "attur", name: "Attur", served: S },
      { slug: "omalur", name: "Omalur", served: S },
      { slug: "sankari", name: "Sankari", served: S },
      { slug: "edappadi", name: "Edappadi", served: S },
      { slug: "mettur", name: "Mettur", served: S },
    ],
  },
  {
    slug: "namakkal",
    name: "Namakkal",
    cities: [
      { slug: "namakkal", name: "Namakkal", served: S },
      { slug: "tiruchengode", name: "Tiruchengode", served: S },
      { slug: "rasipuram", name: "Rasipuram", served: S },
    ],
  },
  {
    slug: "madurai",
    name: "Madurai",
    cities: [
      { slug: "madurai", name: "Madurai", served: S },
      { slug: "usilampatti", name: "Usilampatti", served: S },
      { slug: "thirumangalam", name: "Thirumangalam", served: S },
      { slug: "melur", name: "Melur", served: S },
    ],
  },
  {
    slug: "dindigul",
    name: "Dindigul",
    cities: [
      { slug: "dindigul", name: "Dindigul", served: S },
      { slug: "palani", name: "Palani", served: S },
      { slug: "kodaikanal", name: "Kodaikanal", served: S },
      { slug: "oddanchatram", name: "Oddanchatram", served: S },
    ],
  },
  {
    slug: "theni",
    name: "Theni",
    cities: [
      { slug: "theni", name: "Theni", served: S },
      { slug: "periyakulam", name: "Periyakulam", served: S },
      { slug: "bodinayakanur", name: "Bodinayakanur", served: S },
      { slug: "cumbum", name: "Cumbum", served: S },
    ],
  },
  {
    slug: "tiruchirappalli",
    name: "Tiruchirappalli",
    cities: [
      { slug: "tiruchirappalli", name: "Tiruchirappalli", served: S },
      { slug: "thuraiyur", name: "Thuraiyur", served: S },
      { slug: "musiri", name: "Musiri", served: S },
      { slug: "lalgudi", name: "Lalgudi", served: S },
    ],
  },
  {
    slug: "thanjavur",
    name: "Thanjavur",
    cities: [
      { slug: "thanjavur", name: "Thanjavur", served: S },
      { slug: "kumbakonam", name: "Kumbakonam", served: S },
      { slug: "pattukkottai", name: "Pattukkottai", served: S },
    ],
  },
  {
    slug: "tiruvarur",
    name: "Tiruvarur",
    cities: [
      { slug: "tiruvarur", name: "Tiruvarur", served: S },
      { slug: "mannargudi", name: "Mannargudi", served: S },
    ],
  },
  {
    slug: "nagapattinam",
    name: "Nagapattinam",
    cities: [
      { slug: "nagapattinam", name: "Nagapattinam", served: S },
      { slug: "velankanni", name: "Velankanni", served: S },
    ],
  },
  {
    slug: "mayiladuthurai",
    name: "Mayiladuthurai",
    cities: [
      { slug: "mayiladuthurai", name: "Mayiladuthurai", served: S },
      { slug: "sirkazhi", name: "Sirkazhi", served: S },
    ],
  },
  {
    slug: "pudukkottai",
    name: "Pudukkottai",
    cities: [
      { slug: "pudukkottai", name: "Pudukkottai", served: S },
      { slug: "aranthangi", name: "Aranthangi", served: S },
    ],
  },
  {
    slug: "karur",
    name: "Karur",
    cities: [
      { slug: "karur", name: "Karur", served: S },
      { slug: "kulithalai", name: "Kulithalai", served: S },
    ],
  },
  {
    slug: "perambalur",
    name: "Perambalur",
    cities: [{ slug: "perambalur", name: "Perambalur", served: S }],
  },
  {
    slug: "ariyalur",
    name: "Ariyalur",
    cities: [{ slug: "ariyalur", name: "Ariyalur", served: S }],
  },
  {
    slug: "vellore",
    name: "Vellore",
    cities: [
      { slug: "vellore", name: "Vellore", served: S },
      { slug: "gudiyatham", name: "Gudiyatham", served: S },
      { slug: "katpadi", name: "Katpadi", served: S },
    ],
  },
  {
    slug: "ranipet",
    name: "Ranipet",
    cities: [
      { slug: "ranipet", name: "Ranipet", served: S },
      { slug: "arcot", name: "Arcot", served: S },
      { slug: "walajapet", name: "Walajapet", served: S },
    ],
  },
  {
    slug: "tirupathur",
    name: "Tirupathur",
    cities: [
      { slug: "tirupathur", name: "Tirupathur", served: S },
      { slug: "vaniyambadi", name: "Vaniyambadi", served: S },
      { slug: "ambur", name: "Ambur", served: S },
    ],
  },
  {
    slug: "tiruvannamalai",
    name: "Tiruvannamalai",
    cities: [
      { slug: "tiruvannamalai", name: "Tiruvannamalai", served: S },
      { slug: "arani", name: "Arani", served: S },
      { slug: "chengam", name: "Chengam", served: S },
    ],
  },
  {
    slug: "cuddalore",
    name: "Cuddalore",
    cities: [
      { slug: "cuddalore", name: "Cuddalore", served: S },
      { slug: "chidambaram", name: "Chidambaram", served: S },
      { slug: "neyveli", name: "Neyveli", served: S },
      { slug: "panruti", name: "Panruti", served: S },
    ],
  },
  {
    slug: "villupuram",
    name: "Villupuram",
    cities: [
      { slug: "villupuram", name: "Villupuram", served: S },
      { slug: "tindivanam", name: "Tindivanam", served: S },
    ],
  },
  {
    slug: "kallakurichi",
    name: "Kallakurichi",
    cities: [{ slug: "kallakurichi", name: "Kallakurichi", served: S }],
  },
  {
    slug: "tirunelveli",
    name: "Tirunelveli",
    cities: [
      { slug: "tirunelveli", name: "Tirunelveli", served: S },
      { slug: "ambasamudram", name: "Ambasamudram", served: S },
    ],
  },
  {
    slug: "tenkasi",
    name: "Tenkasi",
    cities: [
      { slug: "tenkasi", name: "Tenkasi", served: S },
      { slug: "sankarankovil", name: "Sankarankovil", served: S },
      { slug: "kadayanallur", name: "Kadayanallur", served: S },
    ],
  },
  {
    slug: "thoothukudi",
    name: "Thoothukudi",
    cities: [
      { slug: "thoothukudi", name: "Thoothukudi", served: S },
      { slug: "kovilpatti", name: "Kovilpatti", served: S },
      { slug: "tiruchendur", name: "Tiruchendur", served: S },
    ],
  },
  {
    slug: "kanyakumari",
    name: "Kanyakumari",
    cities: [
      { slug: "nagercoil", name: "Nagercoil", served: S },
      { slug: "kanyakumari", name: "Kanyakumari", served: S },
      { slug: "colachel", name: "Colachel", served: S },
      { slug: "marthandam", name: "Marthandam", served: S },
    ],
  },
  {
    slug: "virudhunagar",
    name: "Virudhunagar",
    cities: [
      { slug: "virudhunagar", name: "Virudhunagar", served: S },
      { slug: "sivakasi", name: "Sivakasi", served: S },
      { slug: "rajapalayam", name: "Rajapalayam", served: S },
      { slug: "srivilliputhur", name: "Srivilliputhur", served: S },
    ],
  },
  {
    slug: "ramanathapuram",
    name: "Ramanathapuram",
    cities: [
      { slug: "ramanathapuram", name: "Ramanathapuram", served: S },
      { slug: "rameswaram", name: "Rameswaram", served: S },
      { slug: "paramakudi", name: "Paramakudi", served: S },
    ],
  },
  {
    slug: "sivaganga",
    name: "Sivaganga",
    cities: [
      { slug: "sivaganga", name: "Sivaganga", served: S },
      { slug: "karaikudi", name: "Karaikudi", served: S },
      { slug: "devakottai", name: "Devakottai", served: S },
    ],
  },
  {
    slug: "nilgiris",
    name: "The Nilgiris",
    cities: [
      { slug: "ooty", name: "Ooty", served: S },
      { slug: "coonoor", name: "Coonoor", served: S },
      { slug: "gudalur", name: "Gudalur", served: S },
    ],
  },
  {
    slug: "dharmapuri",
    name: "Dharmapuri",
    cities: [
      { slug: "dharmapuri", name: "Dharmapuri", served: S },
      { slug: "harur", name: "Harur", served: S },
    ],
  },
  {
    slug: "krishnagiri",
    name: "Krishnagiri",
    cities: [
      { slug: "krishnagiri", name: "Krishnagiri", served: S },
      { slug: "hosur", name: "Hosur", served: S },
      { slug: "denkanikottai", name: "Denkanikottai", served: S },
    ],
  },
];
