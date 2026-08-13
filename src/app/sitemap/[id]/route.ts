import {
  assertValidUrlSet,
  renderSitemapShardXml,
} from "@/lib/sitemap/render";
import { listSitemapShardKeys } from "@/lib/sitemap/shards";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamic = "force-static";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listSitemapShardKeys().map(({ id }) => ({ id: `${id}.xml` }));
}

/** Serves /sitemap/core.xml, /sitemap/services-0.xml, etc. */
export async function GET(_request: Request, { params }: Props) {
  const { id: raw } = await params;
  const id = raw.replace(/\.xml$/i, "");
  const allowed = new Set(listSitemapShardKeys().map((item) => item.id));
  if (!allowed.has(id)) notFound();

  const xml = renderSitemapShardXml(id);
  assertValidUrlSet(xml, id);

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
