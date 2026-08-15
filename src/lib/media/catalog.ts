import catalogJson from "@/data/generated-media.json";
import { FALLBACK_IMAGE, HOMEPAGE_PROJECT_IMAGES } from "@/data/homepage-images";
import {
  INVISIBLE_GRILL_HD_IMAGES,
  imagesForService,
} from "@/data/service-images";

export type MediaCatalog = {
  generatedAt: string;
  totalImages: number;
  categories: Record<string, string[]>;
  services: Record<string, { hero: string; gallery: string[] }>;
  homepage: string[];
  galleryPage: string[];
};

const catalog = catalogJson as MediaCatalog;

export { FALLBACK_IMAGE };

export function getMediaCatalog(): MediaCatalog {
  return catalog;
}

/** Always use the shipped, name-matched set for that service. */
export function getServiceMedia(serviceSlug: string): {
  hero: string;
  gallery: string[];
} {
  const gallery = imagesForService(serviceSlug);
  return {
    hero: gallery[0] ?? FALLBACK_IMAGE,
    gallery,
  };
}

export function getHomepageGallery(limit = 12): string[] {
  const merged = Array.from(
    new Set([...INVISIBLE_GRILL_HD_IMAGES, ...HOMEPAGE_PROJECT_IMAGES]),
  );
  return merged.slice(0, limit);
}

export function getSiteGallery(limit = 60): Array<{ src: string; alt: string }> {
  const merged = Array.from(
    new Set([...INVISIBLE_GRILL_HD_IMAGES, ...HOMEPAGE_PROJECT_IMAGES]),
  );
  return merged.slice(0, limit).map((src, index) => ({
    src,
    alt: altFromPath(src, index),
  }));
}

export function altFromPath(src: string, index = 0): string {
  const parts = src.split("/").filter(Boolean);
  const folder = parts[parts.length - 2] ?? "installation";
  const label = folder.replace(/-/g, " ");
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
