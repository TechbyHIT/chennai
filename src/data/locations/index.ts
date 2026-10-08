import type { Area, Location } from "@/types/location";
import { EXTRA_APARTMENT_AREAS, EXTRA_APARTMENT_IDS } from "@/data/apartment-projects";
import { TN_TOWN_HUB_AREAS } from "@/data/tn-town-hub-areas";
import * as chennai from "./chennai";
import * as tambaram from "./tambaram";
import * as chengalpattu from "./chengalpattu";
import * as mahabalipuram from "./mahabalipuram";
import * as guduvancheri from "./guduvancheri";
import * as kanchipuram from "./kanchipuram";
import * as sriperumbudur from "./sriperumbudur";
import * as tiruvallur from "./tiruvallur";
import * as avadi from "./avadi";
import * as poonamallee from "./poonamallee";
import * as tiruttani from "./tiruttani";
import * as ranipet from "./ranipet";
import * as arakkonam from "./arakkonam";
import * as arcot from "./arcot";
import * as vellore from "./vellore";
import * as vandavasi from "./vandavasi";
import * as cheyyar from "./cheyyar";
import * as arani from "./arani";
import * as tindivanam from "./tindivanam";
import * as coimbatore from "./coimbatore";
import * as tiruppur from "./tiruppur";
import * as erode from "./erode";
import * as salem from "./salem";
import * as madurai from "./madurai";
import * as tiruchirappalli from "./tiruchirappalli";
import * as tirunelveli from "./tirunelveli";
import * as ooty from "./ooty";
import * as hosur from "./hosur";

/**
 * One module per served city: each exports LOCATION (the city record) and
 * AREAS (every curated area parented to it). Generated "{City} Town" hubs
 * still come from tn-town-hub-areas.ts so new cities gain one automatically.
 */
const MODULES = [chennai, tambaram, chengalpattu, mahabalipuram, guduvancheri, kanchipuram, sriperumbudur, tiruvallur, avadi, poonamallee, tiruttani, ranipet, arakkonam, arcot, vellore, vandavasi, cheyyar, arani, tindivanam, coimbatore, tiruppur, erode, salem, madurai, tiruchirappalli, tirunelveli, ooty, hosur];

export const INITIAL_LOCATIONS: Location[] = MODULES.map((m) => m.LOCATION);

const seen = new Set<string>();
export const INITIAL_AREAS: Area[] = [...MODULES.flatMap((m) => m.AREAS), ...TN_TOWN_HUB_AREAS, ...EXTRA_APARTMENT_AREAS].filter(
  (area) => {
    const key = `${area.parentId}::${area.slug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  },
);

/**
 * Apartment/gated-community project localities, matched by id (not slug:
 * "mahindra-world-city" also exists as a plain Chennai locality entry).
 */
const APARTMENT_IDS = new Set<string>([
  "area-chennai-dlf-garden-city",
  "area-chennai-olympia-opaline",
  "area-chennai-l-and-t-eden-park",
  "area-chennai-hiranandani-upscale",
  "area-chennai-akshaya-tango",
  "area-chennai-casagrand-first-city",
  "area-chennai-shriram-park-63",
  "area-chennai-urbanrise-opus-96",
  "area-chennai-godrej-azure",
  "area-chennai-appaswamy-azure",
  "area-chennai-akshaya-adora",
  "area-chennai-casagrand-elysia",
  "area-chennai-casagrand-cloud9",
  "area-chennai-pacifica-aurum",
  "area-chennai-purva-somerset-house",
  "area-chennai-dra-ascot",
  "area-chennai-prestige-pallavaram-gardens",
  "area-chennai-alliance-galleria-palladium",
  "area-chennai-sobha-winchester",
  "area-chennai-brigade-xanadu",
  "area-chennai-vgn-notting-hill",
  "area-chennai-radiance-suprema",
  "area-chengalpattu-tvs-emerald-jardin",
  "area-chengalpattu-mahindra-world-city",
  "area-guduvancheri-shriram-shankari",
  "area-kanchipuram-hiranandani-parks",
  ...EXTRA_APARTMENT_IDS,
]);

export const CHENNAI_APARTMENT_AREAS: Area[] = INITIAL_AREAS.filter((area) =>
  APARTMENT_IDS.has(area.id),
);
