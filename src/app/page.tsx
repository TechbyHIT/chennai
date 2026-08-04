import { FeaturedServices } from "@/components/homepage/FeaturedServices";
import { HomeHero } from "@/components/homepage/HomeHero";
import { IndustriesServe } from "@/components/homepage/IndustriesServe";
import { ProcessTimeline } from "@/components/homepage/ProcessTimeline";
import { ServiceCategories } from "@/components/homepage/ServiceCategories";
import { TrustReviews } from "@/components/homepage/TrustReviews";
import { WhyChooseUs } from "@/components/homepage/WhyChooseUs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  buildGuidePath,
  buildLocationPath,
  buildServicePath,
  buildSolutionPath,
} from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import {
  countPublishedServedAreas,
  getGuides,
  getLocations,
  getProblems,
  getServices,
} from "@/lib/data/repositories";
import { getHomepageGallery } from "@/lib/media/catalog";
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
  "Invisible grill and safety net installation across Tamil Nadu — balcony, window, terrace and utility area protection for children, pets and bird control. Free site measurement, written estimates, SS316/SS304 materials named openly.";

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
      "We serve Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Vellore, Hosur, Tirunelveli, Nagercoil and more — plus over a thousand localities under those cities. Coverage pages expand as verified local content is ready.",
  },
  {
    question: "What is the difference between invisible grills and safety nets?",
    answer:
      "Invisible grills use tensioned stainless steel cables for a near-transparent barrier that suits view-focused balconies. Safety nets use knotted mesh for wider openings, terraces and duct areas. A site visit confirms which fits your opening.",
  },
  {
    question: "Is a site visit required before quotation?",
    answer:
      "Yes, for accuracy. Opening size, access, fixing surfaces and household safety needs all affect the recommendation and the written estimate.",
  },
  {
    question: "How do you handle child and pet safety requests?",
    answer:
      "Spacing is planned around the actual risk: closer cable or mesh spacing for toddlers and small pets, confirmed during measurement rather than assumed.",
  },
  {
    question: "Do you install bird netting and pigeon control?",
    answer:
      "Yes — bird nets, bird spikes and pigeon exclusion for balconies, terraces, utility shafts and commercial buildings across our Tamil Nadu coverage.",
  },
  {
    question: "Are mosquito nets the same as safety nets?",
    answer:
      "No. Mosquito nets are insect screens. Safety nets and invisible grills are engineered for fall protection or exclusion — different intents, different systems.",
  },
  {
    question: "What materials do you use?",
    answer:
      "Marine-grade SS316 and SS304 stainless steel cables, UV-stabilised HDPE netting and quality hardware. Exact grades are named in the written quote, not hidden.",
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
  { label: "Bird Spikes in Coimbatore", service: "bird-spikes", city: "coimbatore" },
  { label: "Mosquito Nets in Coimbatore", service: "mosquito-nets", city: "coimbatore" },
  { label: "Children Safety Nets in Coimbatore", service: "children-safety-nets", city: "coimbatore" },
  { label: "Pet Safety Nets in Coimbatore", service: "pet-safety-nets", city: "coimbatore" },
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
  const solutions = getProblems({ publishedOnly: true });
  const guides = getGuides({ publishedOnly: true }).slice(0, 6);
  const gallery = getHomepageGallery(12);

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
          localities: Math.floor(localityCount / 1000) * 1000,
        }}
      />

      {/* SEO intro: what we do, with internal links */}
      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5">
            <SectionHeader
              eyebrow="Tamil Nadu home safety specialists"
              title="Safety systems that keep your view, your light and your peace of mind"
            />
            <div className="space-y-4 text-base leading-8 text-ink-700">
              <p data-speakable>
                {BUSINESS_CONFIG.name} installs{" "}
                <Link href={buildServicePath("invisible-grills")} className="font-semibold text-brand-500 hover:text-brand-600">
                  invisible grills
                </Link>
                ,{" "}
                <Link href={buildServicePath("safety-nets")} className="font-semibold text-brand-500 hover:text-brand-600">
                  safety nets
                </Link>
                ,{" "}
                <Link href={buildServicePath("bird-nets")} className="font-semibold text-brand-500 hover:text-brand-600">
                  bird netting
                </Link>{" "}
                and{" "}
                <Link href={buildServicePath("mosquito-nets")} className="font-semibold text-brand-500 hover:text-brand-600">
                  mosquito mesh
                </Link>{" "}
                for balconies, windows, terraces and utility areas across Tamil Nadu. Every
                project starts with a free site measurement, because spacing, tension and
                fixing decisions should follow the actual opening — not a brochure.
              </p>
              <p>
                Families choose us for{" "}
                <Link href={buildSolutionPath("child-balcony-safety")} className="font-semibold text-brand-500 hover:text-brand-600">
                  child balcony safety
                </Link>
                ,{" "}
                <Link href={buildSolutionPath("pet-fall-protection")} className="font-semibold text-brand-500 hover:text-brand-600">
                  pet fall protection
                </Link>{" "}
                and{" "}
                <Link href={buildSolutionPath("pigeon-balcony-control")} className="font-semibold text-brand-500 hover:text-brand-600">
                  pigeon control
                </Link>{" "}
                — the three most common reasons Tamil Nadu households call us. High-rise
                societies engage us for tower-wide balcony protection with access planning
                and association approvals handled up front.
              </p>
              <p>
                Our quotes name the material grade (SS316 or SS304 cable, UV-stabilised
                HDPE net), the spacing intent and the scope, opening by opening. No fake
                discounts, no invented ratings — just measured work, in writing.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Free site measurement",
                body: "Openings measured, access checked and household needs discussed before any price is quoted.",
              },
              {
                title: "Honest materials",
                body: "Material grades are named in the written estimate — SS316, SS304 or HDPE — so you can compare fairly.",
              },
              {
                title: "Neat, careful finishing",
                body: "Drilling, anchoring and tensioning planned for the facade, with a clean handover and care guidance.",
              },
            ].map((card) => (
              <div key={card.title} className="premium-card p-6">
                <p className="font-display text-xl font-semibold text-brand-900">{card.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink-500">{card.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Service categories"
            title="Built for Tamil Nadu homes"
            lead="Browse by category — then open city and area pages for local coverage."
          />
          <ServiceCategories services={services} />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Featured services"
            title="High-demand installations"
          />
          <FeaturedServices services={services} />
          <Link href="/services/" className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600">
            View all services →
          </Link>
        </Container>
      </Section>

      {/* Popular service + city internal links */}
      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Popular searches"
            title="Frequently requested service pages"
            lead="Jump straight to the service and city combination you need."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_COMBOS.map((combo) => (
              <Link
                key={combo.label}
                href={buildServiceInCityPath(combo.service, combo.city)}
                className="premium-card group flex items-center justify-between gap-3 px-5 py-4"
              >
                <span className="text-sm font-semibold text-brand-800 group-hover:text-brand-500">
                  {combo.label}
                </span>
                <span aria-hidden="true" className="text-cta-500 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Why choose us"
            title="Enterprise process. Honest claims."
          />
          <WhyChooseUs />
        </Container>
      </Section>

      {/* Solutions strip */}
      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Problems we solve"
            title="Start from the problem, not the product"
            lead="Pick the situation that matches your home — each solution page explains the options honestly."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.slice(0, 6).map((problem) => (
              <Link
                key={problem.id}
                href={buildSolutionPath(problem.slug)}
                className="premium-card group flex flex-col gap-2 p-6"
              >
                <p className="font-display text-lg font-semibold text-brand-900 group-hover:text-brand-500">
                  {problem.name}
                </p>
                <p className="text-sm leading-6 text-ink-500 line-clamp-2">
                  {problem.summary}
                </p>
                <span className="mt-auto pt-2 text-sm font-semibold text-cta-600">
                  See the solution →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Industries we serve"
            title="Property types & use cases"
          />
          <IndustriesServe />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Our process"
            title="From enquiry to quality check"
          />
          <ProcessTimeline />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="space-y-6">
          <SectionHeader
            eyebrow="Gallery"
            title="Real installation photography"
          />
          <ImageGallery images={gallery} columns="4" priorityCount={0} />
          <Link href="/gallery/" className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600">
            Open full gallery →
          </Link>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Customer trust"
            title="Reviews when they are real"
          />
          <TrustReviews />
        </Container>
      </Section>

      {/* Guides teaser */}
      <Section className="bg-white">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Guides"
            title="Learn before you buy"
            lead="Materials, pricing factors, monsoon prep and safety planning — written for Tamil Nadu homes."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={buildGuidePath(guide.slug)}
                className="premium-card group flex flex-col gap-2 p-6"
              >
                <p className="font-display text-lg font-semibold text-brand-900 group-hover:text-brand-500">
                  {guide.title}
                </p>
                <span className="mt-auto pt-2 text-sm font-semibold text-cta-600">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
          <Link href="/guides/" className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600">
            All guides →
          </Link>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <SectionHeader eyebrow="FAQ" title="Common questions" />
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
          <Link href="/faq/" className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600">
            More FAQs →
          </Link>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Service areas"
            title="Popular Tamil Nadu locations"
            lead={`${locations.length} cities and ${localityCount.toLocaleString("en-IN")} localities with dedicated coverage pages.`}
          />
          <div className="flex flex-wrap gap-3">
            {locations.slice(0, 16).map((location) => (
              <Link
                key={location.id}
                href={buildLocationPath(location.slug)}
                className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:border-cta-500 hover:text-brand-600"
              >
                {location.name}
              </Link>
            ))}
            <Link
              href="/locations/"
              className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              All locations →
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
