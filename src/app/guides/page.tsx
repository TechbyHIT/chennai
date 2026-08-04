import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildGuidePath } from "@/config/routes";
import { getGuides } from "@/lib/data/repositories";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides on invisible grill materials, pricing factors and installation planning for Tamil Nadu homes.",
  alternates: { canonical: generateCanonical("/guides/") },
};

export default function GuidesIndexPage() {
  const guides = getGuides({ publishedOnly: true });

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Guides", href: "/guides/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Guides</Heading>
            <p className="leading-8 text-ink-700">
              In-depth guides to help you compare materials, understand pricing factors and prepare
              for installation across Tamil Nadu.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={buildGuidePath(guide.slug)}
                className="rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft transition hover:-translate-y-0.5"
              >
                <h2 className="font-display text-xl text-brand-900">{guide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{guide.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
