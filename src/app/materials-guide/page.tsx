import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildGuidePath } from "@/config/routes";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Materials Guide",
  description:
    "Overview of invisible grill materials — stainless steel cables, coatings and fasteners — for Tamil Nadu homes including coastal areas.",
  alternates: { canonical: generateCanonical("/materials-guide/") },
};

export default function MaterialsGuidePage() {
  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Materials Guide", href: "/materials-guide/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Materials guide</Heading>
            <p className="leading-8 text-ink-700">
              Invisible grill performance depends on cable grade, protective coating, frame quality
              and fixing hardware. In coastal cities such as Chennai and Thoothukudi, humidity and
              salt exposure make material choices especially important.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Stainless steel cables",
                body: "High-tensile stainless steel cables provide strength while staying relatively low-profile. Ask about grade, expected tension behaviour and how the system handles thermal expansion.",
              },
              {
                title: "Protective coating",
                body: "Nylon or similar coatings can improve touch comfort and visual consistency. Discuss coating durability and cleaning expectations for your environment.",
              },
              {
                title: "Frames and terminations",
                body: "A strong cable is only as reliable as its frame and end fittings. Poor terminations or weak brackets reduce overall safety performance.",
              },
              {
                title: "Fasteners and anchors",
                body: "Fixing into concrete, masonry or metal railings requires appropriate anchors. Site assessment determines the safest fixing method.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft"
              >
                <Heading as="h2">{item.title}</Heading>
                <p className="mt-3 leading-7 text-ink-700">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="text-sm text-ink-600">
            For a deeper overview, read our{" "}
            <Link href={buildGuidePath("invisible-grill-material-guide")} className="text-brand-700 underline">
              invisible grill material guide
            </Link>
            .
          </p>

          <Button href="/contact/">Discuss materials for your home</Button>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
