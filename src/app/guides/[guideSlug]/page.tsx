import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { buildGuidePath } from "@/config/routes";
import { getGuideBySlug, getGuides } from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { articleSchema } from "@/lib/schema/article-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ guideSlug: string }> };

export async function generateStaticParams() {
  return getGuides({ publishedOnly: true }).map((guide) => ({
    guideSlug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guideSlug } = await params;
  const page = getPageByPath(buildGuidePath(guideSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function GuidePage({ params }: Props) {
  const { guideSlug } = await params;
  const guide = getGuideBySlug(guideSlug);
  if (!guide || guide.publicationStatus !== "published") notFound();

  const path = buildGuidePath(guideSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  return (
    <ProgrammaticPage
      page={page}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides/" },
        { name: guide.title, href: path },
      ]}
      extraSchema={[articleSchema(guide, page.canonicalUrl, "Article")]}
    />
  );
}
