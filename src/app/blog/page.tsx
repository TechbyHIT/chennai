import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildBlogPath } from "@/config/routes";
import { getBlogPosts } from "@/lib/data/repositories";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips and advice on balcony safety, invisible grills and home protection for Tamil Nadu readers.",
  alternates: { canonical: generateCanonical("/blog/") },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts({ publishedOnly: true });

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Blog</Heading>
            <p className="leading-8 text-ink-700">
              Practical articles for families comparing balcony and window safety options in Tamil
              Nadu.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={buildBlogPath(post.slug)}
                className="rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft transition hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {post.category}
                </p>
                <h2 className="mt-2 font-display text-xl text-brand-900">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{post.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
