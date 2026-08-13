import catalogJson from "@/data/generated-media.json";
import { FALLBACK_IMAGE, HOMEPAGE_PROJECT_IMAGES } from "@/data/homepage-images";

export type MediaCatalog = {
  generatedAt: string;
  totalImages: number;
  categories: Record<string, string[]>;
  services: Record<string, { hero: string; gallery: string[] }>;
  homepage: string[];
  galleryPage: string[];
};

const catalog = catalogJson as MediaCatalog;

/** Photos that actually ship in git (project folders are gitignored). */
const SHIPPED = HOMEPAGE_PROJECT_IMAGES.length
  ? HOMEPAGE_PROJECT_IMAGES
  : ["/images/logo.png"];

export { FALLBACK_IMAGE };

function pickShipped(index: number): string {
  return SHIPPED[Math.abs(index) % SHIPPED.length] ?? FALLBACK_IMAGE;
}

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % 997;
  }
  return hash;
}

export function getMediaCatalog(): MediaCatalog {
  return catalog;
}

export function getServiceMedia(serviceSlug: string): {
  hero: string;
  gallery: string[];
} {
  const start = hashSlug(serviceSlug);
  const gallery = Array.from({ length: Math.min(8, SHIPPED.length) }, (_, i) =>
    pickShipped(start + i),
  );
  return {
    hero: pickShipped(start),
    gallery,
  };
}

export function getHomepageGallery(limit = 12): string[] {
  return SHIPPED.slice(0, limit);
}

export function getSiteGallery(limit = 60): Array<{ src: string; alt: string }> {
  const loop = Math.max(limit, SHIPPED.length);
  return Array.from({ length: Math.min(limit, loop) }, (_, index) => {
    const src = pickShipped(index);
    return { src, alt: altFromPath(src, index) };
  });
}

export function altFromPath(src: string, index = 0): string {
  const parts = src.split("/").filter(Boolean);
  const category = parts[parts.length - 2] ?? "installation";
  const label = category.replace(/-/g, " ");
  return `Glory Invisible Grills ${label} installation photo ${index + 1}`;
}

export function applyServiceMedia<
  T extends { slug: string; heroImage: string; galleryImages: string[] },
>(service: T): T {
  const media = getServiceMedia(service.slug);
  return {
    ...service,
    heroImage: media.hero,
    galleryImages: media.gallery,
  };
}
