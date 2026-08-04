import { SITE_CONFIG } from "@/config/site";
import { listSitemapShardKeys, resolveShardEntries } from "@/lib/sitemap/shards";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

export async function generateSitemaps() {
  return listSitemapShardKeys();
}

export default async function sitemap(props: {
  id: Promise<string> | string;
}): Promise<MetadataRoute.Sitemap> {
  const id = typeof props.id === "string" ? props.id : await props.id;
  return resolveShardEntries(id).map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(entry.images && entry.images.length > 0 ? { images: entry.images } : {}),
  }));
}

/** Absolute shard URL helper for audits/docs */
export function sitemapShardUrl(id: string) {
  return `${SITE_CONFIG.url}/sitemap/${id}.xml`;
}
