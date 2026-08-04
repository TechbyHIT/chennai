import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { getMediaCatalog, getSiteGallery } from "@/lib/media/catalog";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "HD installation gallery for invisible grills, safety nets, mosquito nets and related work across Tamil Nadu.",
  alternates: { canonical: generateCanonical("/gallery/") },
};

export default function GalleryPage() {
  const items = getSiteGallery(96);
  const catalog = getMediaCatalog();

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Gallery", href: "/gallery/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Installation gallery</Heading>
            <p className="leading-8 text-ink-700">
              {catalog.totalImages} HD project photos across invisible grills, balcony safety nets,
              mosquito nets, cloth hangers, bird spikes and more — organized from verified
              installation work for Tamil Nadu homes.
            </p>
          </div>
          <ImageGallery
            images={items.map((item) => item.src)}
            columns="4"
            priorityCount={4}
          />
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
