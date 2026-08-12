import catalogJson from "@/data/generated-media.json";

export type MediaCatalog = {
  generatedAt: string;
  totalImages: number;
  categories: Record<string, string[]>;
  services: Record<string, { hero: string; gallery: string[] }>;
  homepage: string[];
  galleryPage: string[];
};

const catalog = catalogJson as MediaCatalog;

export function getMediaCatalog(): MediaCatalog {
  return catalog;
}

export function getServiceMedia(serviceSlug: string): {
  hero: string;
  gallery: string[];
} {
  const media = catalog.services[serviceSlug];
  if (!media) {
    return {
      hero: "/images/hero-balcony.jpg",
      gallery: catalog.homepage.slice(0, 8),
    };
  }
  return {
    hero: media.hero || "/images/hero-balcony.jpg",
    gallery: media.gallery.length ? media.gallery : catalog.homepage.slice(0, 8),
  };
}

export function getHomepageGallery(limit = 12): string[] {
  const fallback = "/images/hero-balcony.jpg";
  const list = catalog.homepage.filter(Boolean);
  if (!list.length) return [fallback];
  return list.slice(0, limit);
}

export function getSiteGallery(limit = 60): Array<{ src: string; alt: string }> {
  return catalog.galleryPage.slice(0, limit).map((src, index) => ({
    src,
    alt: altFromPath(src, index),
  }));
}

export function altFromPath(src: string, index = 0): string {
  const parts = src.split("/").filter(Boolean);
  const category = parts[parts.length - 2] ?? "installation";
  const label = category.replace(/-/g, " ");
  return `Glory Invisible Grills ${label} installation photo ${index + 1}`;
}

export function applyServiceMedia<T extends { slug: string; heroImage: string; galleryImages: string[] }>(
  service: T,
): T {
  const media = getServiceMedia(service.slug);
  return {
    ...service,
    heroImage: media.hero || service.heroImage,
    galleryImages: media.gallery.length ? media.gallery : service.galleryImages,
  };
}
