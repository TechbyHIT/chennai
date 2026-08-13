import {
  assertValidUrlSet,
  renderCombinedSitemapXml,
} from "@/lib/sitemap/render";

export const revalidate = 86400;
export const dynamic = "force-static";

/**
 * Combined high-intent urlset (not an index).
 * Google Search Console fetches this one file; child shards stay at /sitemap/*.xml.
 */
export async function GET() {
  const xml = renderCombinedSitemapXml();
  assertValidUrlSet(xml, "combined");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
