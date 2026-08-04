import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { getMediaCatalog, getSiteGallery } from "@/lib/media/catalog";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "HD project photography from invisible grill and safety net installations across Tamil Nadu.",
  alternates: { canonical: generateCanonical("/projects/") },
};

export default function ProjectsPage() {
  const catalog = getMediaCatalog();
  const highlights = getSiteGallery(24).map((item) => item.src);

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Projects", href: "/projects/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Projects</Heading>
            <p className="leading-8 text-ink-700">
              Installation photography from Tamil Nadu work across {Object.keys(catalog.categories).length}{" "}
              categories. Browse the full set in the gallery, or open a service page for matched
              photos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/gallery/">View gallery</Button>
              <Button href="/contact/" variant="outline">
                Request a quotation
              </Button>
            </div>
          </div>

          <ImageGallery title="Project highlights" images={highlights} columns="3" />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(catalog.categories).map(([category, images]) => (
              <Link
                key={category}
                href="/gallery/"
                className="rounded-2xl border border-brand-100 bg-white/80 px-4 py-4 hover:border-cta-500"
              >
                <p className="font-display text-lg text-brand-900">
                  {category.replace(/-/g, " ")}
                </p>
                <p className="mt-1 text-sm text-ink-600">{images.length} photos</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
