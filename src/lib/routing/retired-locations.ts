/**
 * Towns that used to be their own city hub and are now covered as a locality
 * of a nearby served city. Their old URLs redirect to the surviving locality
 * so indexed links keep landing on a page that still describes real coverage.
 *
 * Cities we no longer serve at all are deliberately absent — those 404 rather
 * than redirecting to an unrelated city we cannot actually visit.
 *
 * Walajapet and Katpadi used to be hubs and are now localities of Ranipet
 * and Vellore (both inside the Chennai 150km belt), so their old URLs
 * redirect instead of going 410.
 */
export const RETIRED_TOWN_LOCALITIES: Record<
  string,
  { citySlug: string; areaSlug: string }
> = {
  // Coimbatore district
  pollachi: { citySlug: "coimbatore", areaSlug: "pollachi" },
  mettupalayam: { citySlug: "coimbatore", areaSlug: "mettupalayam" },
  annur: { citySlug: "coimbatore", areaSlug: "annur" },
  karamadai: { citySlug: "coimbatore", areaSlug: "karamadai" },
  madukkarai: { citySlug: "coimbatore", areaSlug: "madukkarai" },
  kinathukadavu: { citySlug: "coimbatore", areaSlug: "kinathukadavu-town" },

  // Salem district
  omalur: { citySlug: "salem", areaSlug: "omalur" },
  attur: { citySlug: "salem", areaSlug: "attur" },
  sankari: { citySlug: "salem", areaSlug: "sankari" },

  // Tiruppur district
  avinashi: { citySlug: "tiruppur", areaSlug: "avinashi" },
  palladam: { citySlug: "tiruppur", areaSlug: "palladam" },
  dharapuram: { citySlug: "tiruppur", areaSlug: "dharapuram" },
  kangeyam: { citySlug: "tiruppur", areaSlug: "kangeyam" },
  udumalpet: { citySlug: "tiruppur", areaSlug: "udumalpet" },

  // Erode district
  perundurai: { citySlug: "erode", areaSlug: "perundurai" },
  bhavani: { citySlug: "erode", areaSlug: "bhavani" },
  gobichettipalayam: { citySlug: "erode", areaSlug: "gobichettipalayam" },
  sathyamangalam: { citySlug: "erode", areaSlug: "sathyamangalam" },

  // Tirunelveli / Tenkasi
  tenkasi: { citySlug: "tirunelveli", areaSlug: "tenkasi" },
  sankarankovil: { citySlug: "tirunelveli", areaSlug: "sankarankovil" },
  ambasamudram: { citySlug: "tirunelveli", areaSlug: "ambasamudram" },

  // Krishnagiri district
  denkanikottai: { citySlug: "hosur", areaSlug: "denkanikottai" },

  // Chennai 150km belt — former hubs now covered as localities
  walajapet: { citySlug: "ranipet", areaSlug: "walajapet" },
  katpadi: { citySlug: "vellore", areaSlug: "katpadi" },
};

/**
 * Cities we used to publish hubs for and no longer serve at all. Their old
 * URLs answer 410 Gone so Google drops them, instead of the soft 200 the
 * streaming not-found would otherwise return.
 */
export const RETIRED_CITY_SLUGS = new Set<string>([
  "ambur",
  "aranthangi",
  "ariyalur",
  "bodinayakanur",
  "chengam",
  "chidambaram",
  "colachel",
  "coonoor",
  "cuddalore",
  "cumbum",
  "devakottai",
  "dharmapuri",
  "dindigul",
  "edappadi",
  "gudalur",
  "gudiyatham",
  "harur",
  "kadayanallur",
  "kallakurichi",
  "kanyakumari",
  "karaikudi",
  "karur",
  "kodaikanal",
  "kovilpatti",
  "krishnagiri",
  "kulithalai",
  "kumbakonam",
  "lalgudi",
  "mannargudi",
  "marthandam",
  "mayiladuthurai",
  "melur",
  "mettur",
  "musiri",
  "nagapattinam",
  "nagercoil",
  "namakkal",
  "neyveli",
  "oddanchatram",
  "palani",
  "panruti",
  "paramakudi",
  "pattukkottai",
  "perambalur",
  "periyakulam",
  "pudukkottai",
  "rajapalayam",
  "ramanathapuram",
  "rameswaram",
  "rasipuram",
  "sirkazhi",
  "sivaganga",
  "sivakasi",
  "srivilliputhur",
  "thanjavur",
  "theni",
  "thirumangalam",
  "thoothukudi",
  "thuraiyur",
  "tiruchendur",
  "tiruchengode",
  "tirupathur",
  "tiruvannamalai",
  "tiruvarur",
  "usilampatti",
  "vaniyambadi",
  "velankanni",
  "villupuram",
  "virudhunagar",
]);
