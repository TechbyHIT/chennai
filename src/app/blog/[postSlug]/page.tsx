import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { buildBlogPath } from "@/config/routes";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { articleSchema } from "@/lib/schema/article-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ postSlug: string }> };

export async function generateStaticParams() {
  return getBlogPosts({ publishedOnly: true })
    .slice(0, 3)
    .map((post) => ({ postSlug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postSlug } = await params;
  const page = getPageByPath(buildBlogPath(postSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function BlogPostPage({ params }: Props) {
  const { postSlug } = await params;
  const post = getBlogPostBySlug(postSlug);
  if (!post || post.publicationStatus !== "published") notFound();

  const path = buildBlogPath(postSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  return (
    <ProgrammaticPage
      page={page}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog/" },
        { name: post.title, href: path },
      ]}
      extraSchema={[articleSchema(post, page.canonicalUrl, "BlogPosting")]}
    />
  );
}
