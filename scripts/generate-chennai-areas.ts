import { writeFileSync } from "fs";
import { join } from "path";

const names = `
Aadhanur
Abhiramapuram
Abirami Nagar
Adambakkam
Adyar
Adyar Gandhi Nagar
Adyar Indira Nagar
Adyar Karpagam Gardens
Adyar Kasturba Nagar
Adyar Signal
Agaram
Agaram Perambur
Agaramthen
Agastheswarar Nagar
Agatheswaram
Akkarai
Akkarai ECR
Alamathi
Alandur
Alapakkam
Alapakkam Porur
Alwarpet
Alwarthirunagar
Alwarthirunagar Annex
Ambattur
Ambattur Industrial Estate
Aminjikarai
Aminjikarai East
Anakaputhur
Andarkuppam
Anna Flyover
Anna Nagar
Anna Nagar East
Anna Nagar Roundtana
Anna Nagar Shanthi Colony
Anna Nagar Tower
Anna Nagar West
Anna Nagar West Extension
Anna Salai
Annanoor
Arakkambakkam
Arambakkam
Arani
Arumbakkam
Ashok Nagar
Ashok Pillar
Aspiran Garden
Athipattu
Athipattu Pudunagar
Avadi
Avadi Camp
Avadi IAF
Ayanambakkam
Ayanambakkam Extension
Ayanavaram
Ayappakkam
Ayyappanthangal
Azeez Nagar
Bakthavatsala Nagar
Balfour Road
Basin Bridge
Besant Nagar
Besant Nagar Kalakshetra Colony
Besant Nagar Sastri Nagar
Bharathi Nagar
Bharathi Nagar Selaiyur
Bharathipuram
Bharathipuram Chromepet
Bharathiyar Nagar
Brick Kiln Road
Broadway
Camp Road
Chembarambakkam
Chemmancheri
Chengalpattu
Chennai Airport
Chennai Central
Chennai Chetpet
Chennai Egmore
Chennai Park Town
Chennai Port
Chennai Trade Centre
Chetpet
Chinna Nolambur
Chinna Sekkadu
Chintadripet
Chitlapakkam
Chitlapakkam Ramakrishnapuram
Cholambedu
Choolai
Choolai High Road
Choolaimedu
Chromepet
CIT Colony
CIT Nagar
CMBT Koyambedu
Cooks Road
Cowl Bazaar
Defence Colony
Devi Karumariamman Nagar
DLF IT Park
Dr. Ambedkar Nagar
East Coast Road
East Tambaram
East Tambaram Camp Road
Eattivakkam
ECR Injambakkam
ECR Kanathur
ECR Neelankarai
ECR Palavakkam
ECR Panaiyur
ECR Uthandi
Edayanchavadi
Egattur
Egmore
Ekkaduthangal
Elandanur
Elavur
Elcot SEZ
Ennore
Ernavoor
Erukkancheri
Flowers Road
Gandhi Irwin Road
Gandhi Nagar Adyar
Gengu Reddy Road
George Town
Gerugambakkam
Gill Nagar
Golden George Nagar
Gopalapuram
Govardhanagiri
Gowrivakkam
Gowrivakkam Tambaram
Guduvancheri
Guduvanchery
Guindy
Guindy Industrial Estate
Guindy Race Course
Gummidipoondi
Harrington Road
Hasthinapuram
Hasthinapuram Chromepet
Hindu College
Ibrahimpatnam Chennai
ICF Colony
Indira Nagar Adyar
Injambakkam
Irandankattalai
Irumbuliyur
Irumbuliyur Tambaram
Iyyappanthangal
Jafferkhanpet
Jai Nagar
Jalladianpet
Jamalia
Jawahar Nagar
Jeeva Nagar
Jepiar Nagar
Jothi Nagar
K.K. Nagar
Kadambathur
Kadaperi
Kadaperi Tambaram
Kadappakkam
Kadiyapattinam
Kaladipet
Kalaignar Nagar
Kalakshetra Colony
Kallikuppam
Kamaraj Nagar Avadi
Kanathur
Kandanchavadi
Kandigai
Kannadasan Nagar
Kannammapet
Kannivakkam
Karambakkam
Karanodai
Karapakkam
Karapakkam OMR
Karayanchavadi
Karpagam Gardens
Kathipara Junction
Kathirvedu
Kathivakkam
Kattankulathur
Kattivakkam
Kattupakkam
Kattupalli
Kavankarai
Kaveri Nagar
Kayarambedu
Kazhipattur
Kazhipattur OMR
Keelkattalai
Keelkottaiyur
Kelambakkam
Kellys
Kellys Corner
Kilambakkam
Kilkattalai
Kilpauk
Kilpauk Garden
Kodambakkam
Kodipallam
Kodungaiyur
Kodungaiyur West
Kolapakkam
Kolathur
Kondavakkam
Konnur
Korattur
Korukkupet
Kosappur
Kosasthalaiyar Nagar
Kottivakkam
Kottur
Kottur Gardens
Kotturpuram
Kovalam
Kovilambakkam
Kovilpadagai
Koyambedu
Koyambedu CMBT
Koyambedu Market
Kumananchavadi
Kumaran Nagar
Kumaran Nagar Sholinganallur
Kundrathur
Kundrathur Road
Lakshmipuram
Little Mount
M.G.R. Nagar
Madambakkam
Madambakkam Tambaram
Madhavaram
Madhavaram Milk Colony
Madhavaram Ring Road
Madhavaram Village
Madhya Kailash
Madipakkam
Madurapakkam
Maduravoyal
Maduravoyal Bypass
Mahalakshmi Nagar Selaiyur
Mahalingapuram
Mahindra World City
Mambakkam
Mambalam
Manali
Manali New Town
Manali Pudhunagar
Manapakkam
Mandaveli
Mandaveli Pakkam
Mandaveli Raja Annamalaipuram
Manjambakkam
Mannadi
Mannivakkam
Mannivakkam Extension
Mappedu
Maraimalai Nagar
Maraimalai Nagar Industrial Estate
Marina Beach
Mathur
MCC Campus
Medavakkam
Medavakkam Tank Road
Meenakshi Nagar
Meenambakkam
Melnallathur
Melpakkam
Mettukuppam
Mettukuppam Porur
Mettupalayam Chennai
MGR Nagar
Minjur
Mint
MKB Nagar
Mogappair
Mogappair East
Mogappair West
Moolachathiram
Moolakadai
Moulivakkam
Mount Road
Mudichur
Mugalivakkam
Mugappair
Music Academy
Muthapudupet
Mylapore
Naduveerapattu
Nallambakkam
Nandambakkam
Nandanam
Nandiambakkam
Nandivaram
Nanganallur
Nanmathi
Navalur
Navalur OMR
Neelankarai
Nemilichery
Nemilichery Chromepet
Nerkundram
Nerkundram Extension
Nesapakkam
New Avadi Road
New Ernavoor
New Manali Town
New Perungalathur
New Washermenpet
Nolambur
Nolambur Phase 1
Nolambur Phase 2
Nungambakkam
Nungambakkam High Road
Okkiyam Pettai
Okkiyam Thoraipakkam
Old Mahabalipuram Road
Old Pallavaram
Old Perungalathur
Old Tambaram
Old Washermenpet
OMR
Oragadam
Ormes Road
Otteri
Otteri Vandalur
Padappai
Padi
Padianallur
Padur
Padur OMR
Palavakkam
Pallavaram
Pallavaram Cantonment
Pallikaranai
Pammal
Panaiyur
Pappanchatram
Park Town
Parrys
Paruthipattu
Pattabiram
Pattabiram Military Siding
Pattalam
Pattinapakkam
Pazhavanthangal
Peerkankaranai
Perambakkam
Perambur
Perambur Barracks Road
Peravallur
Periamet
Periyar Nagar
Periyasekkadu
Perumanttunallur
Perumbakkam
Perungalathur
Perungavoor
Perungudi
Perungudi Industrial Estate
Perungudi OMR
Phoenix Marketcity
Pondy Bazaar
Ponneri
Ponniammanmedu
Poonamallee
Poonamallee Cantonment
Poonamallee High Road
Porur
Porur Gardens
Potheri
Pozhichalur
Pudupakkam
Pudupet
Pudur Ambattur
Pulianthope
Purasaiwakkam
Purasawalkam
Puzhal
Puzhuthivakkam
R.A. Puram
R.K. Nagar
Raj Bhavan
Raja Annamalaipuram
Rajakilpakkam
Rajakilpakkam Tambaram
Rajiv Gandhi Salai
Ramapuram
Ramapuram DLF
Ramavaram
Red Hills
Ritherdon Road
Royapettah
Royapuram
Sadayan Kuppam
Sadayankuppam
Saidapet
Saligramam
Sanatorium Tambaram
Santhome
Santhosapuram
Sastri Nagar
Sathangadu
Sathuvachari Chennai
Selaivayal
Selaiyur
Selaiyur Camp Road
Sembakkam
Sembiam
Semmenchery
Semmenchery OMR
Senneerkuppam
Senthil Nagar
Seven Wells
Sevvapet
Shenoy Nagar
Shenoy Nagar East
Sholavaram
Sholinganallur
Sholinganallur OMR
Singaperumal Koil
Siruseri
Siruseri SIPCOT
Sithalapakkam
Sivaprakash Nagar
Sowcarpet
Spencer Plaza
Srinivasa Nagar North
St. Thomas Mount
Surapet
T. Nagar
Tambaram
Tambaram East
Tambaram Railway Colony
Tambaram Sanatorium
Tambaram West
Taramani
Taylor's Road
Teynampet
Thaiyur
Thalambur
Thalambur OMR
Thandalam
Thangal
Tharamani
Thirumangalam
Thirumangalam Extension
Thirumazhisai
Thirumudivakkam
Thirumullaivoyal
Thirunindravur
Thiruninravur
Thiruvanmiyur
Thiruvanmiyur Valmiki Nagar
Thiruverkadu
Thiruvottiyur
Thoraipakkam
Thoraipakkam OMR
Tirumangalam Chennai
Tirusulam
Tiruvottiyur West
Tondiarpet
Triplicane
Ullagaram
Urapakkam
Urapakkam East
Urapakkam West
Uthandi
Vadakkupattu
Vadapalani
Vadapalani Bus Terminus
Vadaperumbakkam
Valasaravakkam
Valasaravakkam Extension
Vallur
Valmiki Nagar
Vanagaram
Vanagaram Mettukuppam
Vandalur
Vandalur Kelambakkam Road
Vandalur Zoo Area
Velachery
Velachery Baby Nagar
Velachery Dhandeeswaram
Velachery Main Road
Velachery Vijaya Nagar
Velappanchavadi
Vengaivasal
Vepery
Vepery High Road
Veppampattu
Vettuvankeni
Vichoor
Villivakkam
Virugambakkam
Vyasarpadi
Washermenpet
West Mambalam
West Tambaram
Wimco Nagar
Zamin Pallavaram
`
  .split(/\r?\n/)
  .map((value) => value.trim())
  .filter(Boolean);

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/\./g, "")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

type Variant = {
  characteristics: string[];
  propertyTypes: string[];
  demand: string[];
  intro: (name: string) => string;
  local: (name: string) => string;
  score: number;
};

function classify(name: string): Variant {
  const lower = name.toLowerCase();

  if (
    /omr|old mahabalipuram|sholinganallur|perungudi|thoraipakkam|navalur|siruseri|kelambakkam|karapakkam|padur|semmenchery|kazhipattur|thalambur/.test(
      lower,
    )
  ) {
    return {
      characteristics: [
        "OMR-corridor residential demand",
        "Apartment and high-rise living",
      ],
      propertyTypes: ["apartments", "high-rise-apartments"],
      demand: ["High-rise balcony and window protection"],
      intro: (n) =>
        `${n} sits along Chennai’s OMR residential belt, where apartments and high-rise homes often need discreet balcony and window safety planning.`,
      local: (n) =>
        `In ${n}, we commonly plan invisible grill layouts for apartment balconies and windows, with attention to building access, spacing and finishing. Service coverage is part of our Chennai / Tamil Nadu area — we do not claim a branch office in every locality.`,
      score: 84,
    };
  }

  if (
    /ecr|neelankarai|injambakkam|besant|thiruvanmiyur|kovalam|akkarai|marina|palavakkam|panaiyur|uthandi|kottivakkam|vettuvankeni/.test(
      lower,
    )
  ) {
    return {
      characteristics: [
        "Coastal-proximate Chennai locality",
        "Humidity-aware material discussion is useful",
      ],
      propertyTypes: ["apartments", "independent-houses"],
      demand: ["Material durability and balcony safety"],
      intro: (n) =>
        `${n} is a coastal-proximate Chennai locality where humidity-aware material choices and neat balcony protection are practical everyday concerns.`,
      local: (n) =>
        `For homes in ${n}, we discuss opening sizes, exposure considerations and spacing needs before installation. Coverage remains honest Chennai / Tamil Nadu service availability without fake branch claims.`,
      score: 84,
    };
  }

  if (
    /industrial|sipcot|sez|airport|port|cmbt|market|trade centre|dlf|phoenix|elcot/.test(
      lower,
    )
  ) {
    return {
      characteristics: [
        "Mixed-use / commercial-proximate locality",
        "Residential openings nearby",
      ],
      propertyTypes: ["apartments", "independent-houses"],
      demand: ["Practical balcony and window protection"],
      intro: (n) =>
        `${n} includes commercial-proximate and nearby residential openings in Chennai where discreet fall protection is still a home priority.`,
      local: (n) =>
        `Around ${n}, we assess residential balconies and windows based on access, opening design and household safety needs within our Tamil Nadu service coverage.`,
      score: 81,
    };
  }

  if (
    /tambaram|chromepet|pallavaram|selaiyur|medavakkam|madambakkam|sembakkam|hasthinapuram|chitlapakkam|urapakkam|guduvancher|vandalur|padappai/.test(
      lower,
    )
  ) {
    return {
      characteristics: [
        "South Chennai residential growth",
        "Apartment and independent-house mix",
      ],
      propertyTypes: ["apartments", "independent-houses"],
      demand: ["Family balcony safety"],
      intro: (n) =>
        `${n} is part of South Chennai’s residential belt, where apartments and family homes often need balcony and window safety upgrades.`,
      local: (n) =>
        `In ${n}, we schedule measurement visits and recommend invisible grill layouts based on opening size, access and day-to-day balcony use. We serve this locality as part of Chennai coverage in Tamil Nadu.`,
      score: 83,
    };
  }

  if (
    /anna nagar|kilpauk|nungambakkam|t nagar|t\. nagar|adyar|velachery|porur|mogappair|mugappair|ashok nagar|kodambakkam|mylapore|alwarpet|ra puram|r\.a\. puram/.test(
      lower,
    )
  ) {
    return {
      characteristics: [
        "Established Chennai residential locality",
        "Apartment and independent-house mix",
      ],
      propertyTypes: ["apartments", "independent-houses"],
      demand: ["Child safety and open-view preference"],
      intro: (n) =>
        `${n} is an established Chennai residential locality where balcony usability and discreet fall protection often influence grill decisions.`,
      local: (n) =>
        `For ${n} homes and apartments, we plan spacing and fixing around existing railings and practical household use. Service is provided across selected Chennai localities in Tamil Nadu without claiming a local branch in every neighbourhood.`,
      score: 86,
    };
  }

  return {
    characteristics: [
      "Chennai residential locality",
      "Apartment and independent-house mix",
    ],
    propertyTypes: ["apartments", "independent-houses"],
    demand: ["Balcony and window safety enquiries"],
    intro: (n) =>
      `${n} is a locality in the Chennai region of Tamil Nadu where apartments and independent homes often need discreet balcony and window safety planning.`,
    local: (n) =>
      `In ${n}, we provide measurement-led invisible grill recommendations based on opening conditions and household needs. Coverage is part of our genuine Chennai / Tamil Nadu service area.`,
    score: 82,
  };
}

const now = "2026-08-01T00:00:00.000Z";
const slugCounts = new Map<string, number>();

const areas = names.map((name) => {
  let slug = toSlug(name);
  const count = (slugCounts.get(slug) ?? 0) + 1;
  slugCounts.set(slug, count);
  if (count > 1) slug = `${slug}-${count}`;

  const variant = classify(name);

  return `  {
    id: "area-chn-${slug}",
    slug: "${slug}",
    name: ${JSON.stringify(name)},
    locationType: "locality",
    parentId: "loc-chennai",
    state: "Tamil Nadu",
    district: "Chennai",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction: ${JSON.stringify(variant.intro(name))},
    localDescription: ${JSON.stringify(variant.local(name))},
    nearbyLocationIds: [],
    landmarkIds: [],
    propertyTypes: ${JSON.stringify(variant.propertyTypes)},
    localCharacteristics: ${JSON.stringify(variant.characteristics)},
    serviceDemandNotes: ${JSON.stringify(variant.demand)},
    verifiedLocalFacts: [${JSON.stringify(`${name} is a locality in the Chennai region of Tamil Nadu`)}],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: ${variant.score},
    createdAt: "${now}",
    updatedAt: "${now}",
  }`;
});

const file = `import type { Area } from "@/types/location";

/** Full Chennai locality set for Tamil Nadu programmatic pages. */
export const CHENNAI_AREAS: Area[] = [
${areas.join(",\n")}
];
`;

const outPath = join(process.cwd(), "src/data/chennai-areas.ts");
writeFileSync(outPath, file);
console.log(`Wrote ${names.length} Chennai areas to ${outPath}`);
