import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildSolutionPath } from "@/config/routes";
import { getProblems } from "@/lib/data/repositories";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Safety solutions with invisible grills for common balcony and window concerns across Tamil Nadu homes.",
  alternates: { canonical: generateCanonical("/solutions/") },
};

export default function SolutionsIndexPage() {
  const problems = getProblems({ publishedOnly: true });

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Solutions</Heading>
            <p className="leading-8 text-ink-700">
              Practical invisible grill approaches for common safety concerns in apartments and
              homes across Tamil Nadu.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                href={buildSolutionPath(problem.slug)}
                className="rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft transition hover:-translate-y-0.5"
              >
                <h2 className="font-display text-xl text-brand-900">{problem.name}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{problem.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
