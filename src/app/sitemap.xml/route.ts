import {
  assertValidSitemapIndex,
  renderSitemapIndexXml,
} from "@/lib/sitemap/render";

export const revalidate = 86400;
export const dynamic = "force-static";

/**
 * Explicit high-intent sitemap index.
 * MetadataRoute index was soft-404'ing into app/[segment]; this route guarantees HTTP 200 XML.
 */
export async function GET() {
  const xml = renderSitemapIndexXml();
  assertValidSitemapIndex(xml);

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
