import { AboutIntro } from "@/components/homepage/AboutIntro";
import { AreasServe } from "@/components/homepage/AreasServe";
import { FeaturedCategory } from "@/components/homepage/FeaturedCategory";
import { HomeHero } from "@/components/homepage/HomeHero";
import { HomeQuote } from "@/components/homepage/HomeQuote";
import { ServiceCardsGrid } from "@/components/homepage/ServiceCardsGrid";
import { TrustReviews } from "@/components/homepage/TrustReviews";
import { WhyChooseUs } from "@/components/homepage/WhyChooseUs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SITE_CONFIG } from "@/config/site";
import { buildServicePath } from "@/config/routes";
import { HOMEPAGE_PROJECT_IMAGES } from "@/data/homepage-images";
import {
  countPublishedServedAreas,
  getLocations,
  getServices,
} from "@/lib/data/repositories";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { faqSchema } from "@/lib/schema/faq-schema";
import { speakableSchema } from "@/lib/schema/website-schema";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 86400;

const HOME_TITLE =
  "Invisible Grills & Safety Nets in Tamil Nadu | Glory Invisible Grills";
const HOME_DESCRIPTION =
  "Premium invisible grill and safety net installation across Tamil Nadu - balconies, windows, apartments and villas. Free site measurement, written estimates, honest material grades.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [
    "invisible grills",
    "invisible grills Tamil Nadu",
    "balcony safety nets",
    "safety nets Chennai",
    "bird nets",
    "pigeon nets",
    "mosquito nets",
    "child safety nets",
    "pet safety nets",
    "balcony invisible grill installation",
    "invisible grill near me",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const HOME_FAQS = [
  {
    question: "Which cities in Tamil Nadu do you serve?",
    answer:
      "We serve customers across Tamil Nadu including Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Vellore, Hosur, Tirunelveli, Nagercoil and more - plus locality pages under those cities as verified coverage is ready. Share your exact area and we will confirm availability.",
  },
  {
    question: "What is the difference between invisible grills and safety nets?",
    answer:
      "Invisible grills use tensioned stainless steel cables for a near-transparent barrier that suits view-focused balconies and windows. Safety nets use knotted mesh for wider openings, terraces and duct areas. A site visit confirms which system fits your opening.",
  },
  {
    question: "Is a site visit required before quotation?",
    answer:
      "Yes, for accuracy. Opening size, access, fixing surfaces and household safety needs all affect the recommendation and the written estimate. Inspection is free where we serve.",
  },
  {
    question: "How do you handle child and pet safety requests?",
    answer:
      "Spacing is planned around the actual risk: closer cable or mesh spacing for toddlers and small pets, confirmed during measurement rather than assumed from a catalogue.",
  },
  {
    question: "Do you install bird netting and pigeon control?",
    answer:
      "Yes - bird nets, bird spikes and pigeon exclusion for balconies, terraces, utility shafts and commercial buildings across our Tamil Nadu coverage.",
  },
  {
    question: "Are mosquito nets the same as safety nets?",
    answer:
      "No. Mosquito nets are insect screens. Safety nets and invisible grills are engineered for fall protection or exclusion - different intents, different systems.",
  },
  {
    question: "What materials do you use?",
    answer:
      "Marine-grade SS316 and SS304 stainless steel cables, UV-stabilised HDPE netting and quality hardware. Exact grades are named in the written quote, not hidden.",
  },
  {
    question: "How long does installation usually take?",
    answer:
      "Most balcony and window jobs complete in a planned visit after measurement and material readiness. Complex high-rise or multi-opening projects may need staged access - we confirm timelines in the quote.",
  },
  {
    question: "Do you publish customer star ratings on every page?",
    answer:
      "Only when we have verified reviews. We do not fabricate ratings or install-count claims.",
  },
];

const POPULAR_COMBOS: Array<{ label: string; service: string; city: string }> = [
  { label: "Invisible Grills in Coimbatore", service: "invisible-grills", city: "coimbatore" },
  { label: "Safety Nets in Coimbatore", service: "safety-nets", city: "coimbatore" },
  { label: "Balcony Safety Nets in Coimbatore", service: "balcony-safety-nets", city: "coimbatore" },
  { label: "Bird Nets in Coimbatore", service: "bird-nets", city: "coimbatore" },
  { label: "Invisible Grills in Chennai", service: "invisible-grills", city: "chennai" },
  { label: "Safety Nets in Chennai", service: "safety-nets", city: "chennai" },
  { label: "Invisible Grills in Madurai", service: "invisible-grills", city: "madurai" },
  { label: "Invisible Grills in Tiruppur", service: "invisible-grills", city: "tiruppur" },
  { label: "Invisible Grills in Erode", service: "invisible-grills", city: "erode" },
  { label: "Invisible Grills in Salem", service: "invisible-grills", city: "salem" },
  { label: "Invisible Grills in Trichy", service: "invisible-grills", city: "tiruchirappalli" },
  { label: "Invisible Grills in Hosur", service: "invisible-grills", city: "hosur" },
];

function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
        <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
        {eyebrow}
      </p>
      <Heading as="h2" className="text-3xl sm:text-4xl">
        {title}
      </Heading>
      {lead ? <p className="text-base leading-7 text-ink-500">{lead}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const services = getServices({ publishedOnly: true });
  const locations = getLocations({ publishedOnly: true, servedOnly: true });
  const localityCount = countPublishedServedAreas();
  const gallery = HOMEPAGE_PROJECT_IMAGES;
  const aboutSecondary = gallery[1] ?? gallery[0];
  const featuredInvisibleImage = gallery[10] ?? gallery[0];
  const featuredSafetyImage = gallery[8] ?? gallery[2];

  const invisible =
    services.find((s) => s.slug === "invisible-grills") ?? services[0];
  const safety =
    services.find((s) => s.slug === "safety-nets") ??
    services.find((s) => s.slug === "balcony-safety-nets") ??
    services[1];

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Installation services by Glory Invisible Grills",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${SITE_CONFIG.url}${buildServicePath(service.slug)}`,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          faqSchema(HOME_FAQS),
          serviceListSchema,
          speakableSchema(`${SITE_CONFIG.url}/`),
        ]}
      />

      <HomeHero
        heroSrc={gallery[0] ?? "/images/hero-balcony.jpg"}
        stats={{
          services: services.length,
          cities: locations.length,
          localities: Math.floor(localityCount / 1000) * 1000 || localityCount,
        }}
      />

      <AboutIntro
        imageSrc={gallery[0] ?? "/images/hero-balcony.jpg"}
        secondarySrc={aboutSecondary}
      />

      <Section id="services" className="bg-white scroll-mt-28">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Our services"
            title="Complete safety solutions for homes and apartments"
            lead="Invisible grills, safety nets, bird protection and related systems - measured for Tamil Nadu homes."
          />
          <ServiceCardsGrid services={services} images={gallery} />
          <p className="text-sm text-ink-500">
            Showing all {services.length} published services. Need something specific?{" "}
            <Link href="/contact/" className="font-semibold text-brand-500 hover:text-brand-600">
              Request a quote
            </Link>
            .
          </p>
        </Container>
      </Section>

      {invisible ? (
        <FeaturedCategory
          service={{ ...invisible, heroImage: featuredInvisibleImage }}
          eyebrow="Most requested"
          title="Invisible Grills - uninterrupted views, reliable protection"
          lead="Near-transparent stainless steel cable systems for balconies and windows that keep the outlook open while securing the opening."
          points={[
            "Clear visibility compared with conventional iron grills",
            "SS316 / SS304 grades discussed openly in the quote",
            "Spacing planned for children, pets or general fall protection",
            "Custom-fitted for apartments, villas and high-rises",
            "Neat finishing with care guidance after handover",
          ]}
        />
      ) : null}

      {safety ? (
        <FeaturedCategory
          service={{ ...safety, heroImage: featuredSafetyImage }}
          eyebrow="Practical protection"
          title="Safety Nets - protection that blends into open spaces"
          lead="UV-stabilised mesh systems for balconies, terraces, ducts and wider openings where a netted barrier is the better fit."
          points={[
            "Suitable for children, pets and bird exclusion use-cases",
            "Transparent mesh that preserves light and airflow",
            "Even tensioning with corrosion-resistant hardware",
            "Practical for wider spans and utility areas",
            "Clean, budget-conscious installation after measurement",
          ]}
          reverse
          muted
        />
      ) : null}

      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Why choose Glory"
            title="Safety-first process. Honest claims."
            lead="Capabilities we actually deliver - measurement, materials, finishing and Tamil Nadu coverage."
          />
          <WhyChooseUs />
        </Container>
      </Section>

      <AreasServe locations={locations} localityCount={localityCount} />

      <Section className="bg-white">
        <Container className="space-y-6">
          <SectionHeader
            eyebrow="Our work"
            title="A glimpse of our recent installations"
            lead="Real Glory project photography - invisible grills, safety nets, bird nets, sports nets and cloth hangers."
          />
          <ImageGallery images={gallery} columns="4" priorityCount={1} />
          <p className="text-sm text-ink-500">
            {gallery.length} project photos on this page.{" "}
            <Link
              href="/gallery/"
              className="font-semibold text-brand-500 hover:text-brand-600"
            >
              Open full gallery →
            </Link>
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="What our customers say"
            title="Reviews publish when verified"
            lead="We only display permissioned customer feedback. Until then, we share process and photography you can trust."
          />
          <TrustReviews />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="space-y-8">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <div className="space-y-3">
            {HOME_FAQS.map((item) => (
              <details
                key={item.question}
                className="group premium-card px-5 py-4 open:shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-brand-900 marker:content-none sm:text-xl">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-cta-500 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-500">{item.answer}</p>
              </details>
            ))}
          </div>
          <Link
            href="/faq/"
            className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600"
          >
            More FAQs â†’
          </Link>
        </Container>
      </Section>

      <HomeQuote />

      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Service area directory"
            title="Popular Tamil Nadu searches"
            lead="Jump to frequently requested service and city combinations, or browse the full directory."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_COMBOS.map((combo) => (
              <Link
                key={combo.label}
                href={buildServiceInCityPath(combo.service, combo.city)}
                className="premium-card group flex items-center justify-between gap-3 px-5 py-4"
              >
                <span className="text-sm font-semibold text-brand-800 group-hover:text-brand-500">
                  {combo.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-cta-500 transition group-hover:translate-x-1"
                >
                  â†’
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/locations/"
            className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600"
          >
            Browse all service areas â†’
          </Link>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

