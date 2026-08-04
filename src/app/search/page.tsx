import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SearchResults } from "@/components/search/SearchResults";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search services and Tamil Nadu locations",
  description:
    "Search Glory Invisible Grills services, Tamil Nadu cities and localities to find the right invisible grill, safety net or bird netting page.",
  alternates: { canonical: generateCanonical("/search/") },
  // Search result URLs are user utility, not index targets.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="space-y-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Search", href: "/search/" },
          ]}
        />
        <div className="max-w-3xl space-y-4">
          <Heading as="h1">Search</Heading>
          <p className="leading-8 text-ink-700">
            Find a service, a Tamil Nadu city or a locality page. Every result links to a
            real coverage page with local details and contact options.
          </p>
        </div>
        <Suspense fallback={<p className="text-sm text-ink-500">Loading search…</p>}>
          <SearchResults />
        </Suspense>
      </Container>
    </Section>
  );
}
