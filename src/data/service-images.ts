/**
 * Shipped, service-matched HD photos (public/images/services/…).
 * Paths are named by service so grill pages never show nets, hangers, etc.
 */
const GRILLS = [
  "/images/services/invisible-grills/01.jpg",
  "/images/services/invisible-grills/02.jpg",
  "/images/services/invisible-grills/03.jpg",
  "/images/services/invisible-grills/04.jpg",
  "/images/services/invisible-grills/05.jpg",
  "/images/services/invisible-grills/06.jpg",
  "/images/services/invisible-grills/07.jpg",
  "/images/services/invisible-grills/08.jpg",
  "/images/services/invisible-grills/09.jpg",
  "/images/services/invisible-grills/10.jpg",
  "/images/services/invisible-grills/11.jpg",
  "/images/services/invisible-grills/12.jpg",
] as const;

const WINDOWS = [
  "/images/services/window-invisible-grills/01.jpg",
  "/images/services/window-invisible-grills/02.jpg",
  "/images/services/window-invisible-grills/03.jpg",
  "/images/services/window-invisible-grills/04.jpg",
  "/images/services/window-invisible-grills/05.jpg",
  "/images/services/window-invisible-grills/06.jpg",
] as const;

const NETS = [
  "/images/services/safety-nets/01.jpg",
  "/images/services/safety-nets/02.jpg",
  "/images/services/safety-nets/03.jpg",
  "/images/services/safety-nets/04.jpg",
  "/images/services/safety-nets/05.jpg",
] as const;

const CHILDREN = [
  "/images/services/children-safety-nets/01.jpg",
  "/images/services/children-safety-nets/02.jpg",
  "/images/services/children-safety-nets/03.jpg",
] as const;

const PETS = [
  "/images/services/pet-safety-nets/01.jpg",
  "/images/services/pet-safety-nets/02.jpg",
  "/images/services/pet-safety-nets/03.jpg",
] as const;

const CLOTH = [
  "/images/services/cloth-hangers/01.jpg",
  "/images/services/cloth-hangers/02.webp",
  "/images/services/cloth-hangers/03.jpg",
] as const;

const SPORTS = [
  "/images/services/sports-nets/01.jpg",
  "/images/services/sports-nets/02.jpg",
  "/images/services/sports-nets/03.png",
] as const;

const SPIKES = [
  "/images/services/bird-spikes/01.webp",
  "/images/services/bird-spikes/02.jpg",
  "/images/services/bird-spikes/03.jpg",
] as const;

const MOSQUITO = [
  "/images/services/mosquito-nets/01.jpg",
  "/images/services/mosquito-nets/02.png",
] as const;

const BUILDING = [
  "/images/services/building-safety-nets/01.jpg",
  "/images/services/building-safety-nets/02.jpg",
  "/images/services/building-safety-nets/03.jpg",
] as const;

const MONKEY = ["/images/services/monkey-nets/01.jpg"] as const;

/** Extra HD invisible-grill shots for homepage / gallery. */
export const INVISIBLE_GRILL_HD_IMAGES: string[] = [...GRILLS, ...WINDOWS];

export const SERVICE_SHIPPED_IMAGES: Record<string, string[]> = {
  "invisible-grills": [...GRILLS],
  "balcony-safety-grills": [...GRILLS],
  "window-invisible-grills": [...WINDOWS, ...GRILLS.slice(0, 4)],
  "children-safety-grills": [...CHILDREN, ...GRILLS.slice(0, 4)],
  "pet-safety-grills": [...PETS, ...GRILLS.slice(0, 4)],
  "safety-nets": [...NETS],
  "balcony-safety-nets": [...NETS],
  "kids-safety-nets": [...CHILDREN, ...NETS.slice(0, 2)],
  "children-safety-nets": [...CHILDREN, ...NETS.slice(0, 2)],
  "pet-safety-nets": [...PETS, ...NETS.slice(0, 2)],
  "building-safety-nets": [...BUILDING, ...NETS.slice(0, 2)],
  "mosquito-nets": [...MOSQUITO, ...WINDOWS.slice(0, 2)],
  "bird-nets": [...SPIKES, ...NETS.slice(0, 2)],
  "bird-spikes": [...SPIKES],
  "monkey-nets": [...MONKEY, ...NETS.slice(0, 3)],
  "cloth-hangers": [...CLOTH],
  "ceiling-cloth-hangers": [...CLOTH],
  "sports-nets": [...SPORTS],
};

export function imagesForService(slug: string): string[] {
  return SERVICE_SHIPPED_IMAGES[slug] ?? [...GRILLS];
}
