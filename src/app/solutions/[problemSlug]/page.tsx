import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { buildSolutionPath } from "@/config/routes";
import { getProblemBySlug } from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ problemSlug: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { problemSlug } = await params;
  const page = getPageByPath(buildSolutionPath(problemSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function SolutionPage({ params }: Props) {
  const { problemSlug } = await params;
  const problem = getProblemBySlug(problemSlug);
  if (!problem || problem.publicationStatus !== "published") notFound();

  const path = buildSolutionPath(problemSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  return (
    <ProgrammaticPage
      page={page}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Solutions", href: "/solutions/" },
        { name: problem.name, href: path },
      ]}
    />
  );
}
