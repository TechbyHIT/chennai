import { AboutIntro } from "@/components/homepage/AboutIntro";
import { AreasServe } from "@/components/homepage/AreasServe";
import { ChennaiRegionDirectory } from "@/components/homepage/ChennaiRegionDirectory";
import { FeaturedCategory } from "@/components/homepage/FeaturedCategory";
import { HomeHero } from "@/components/homepage/HomeHero";
import { HomeQuote } from "@/components/homepage/HomeQuote";
import { MainServicesShowcase } from "@/components/homepage/MainServicesShowcase";
import { ServiceCardsGrid } from "@/components/homepage/ServiceCardsGrid";
import { TrustReviews } from "@/components/homepage/TrustReviews";
import { WhyChooseUs } from "@/components/homepage/WhyChooseUs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { isChennaiBeltTown, sortChennaiRegionFirst } from "@/config/chennai-region";
import { MAIN_SERVICE_SLUGS, sortMainServicesFirst } from "@/config/main-services";
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

const HOME_TITLE = "Invisible Grills & Safety Nets in Chennai | Glory Grills";
const HOME_DESCRIPTION =
  "Invisible grills, safety nets, cloth hangers, sports nets and bird spikes in Chennai and within 150 km. Apartments and gated communities. Free site visit.";

export const metadata: Metadata = {
  // `absolute` skips the "| Glory Grills" suffix so the full title fits in the SERP.
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  keywords: [
    "invisible grills Chennai",
    "invisible grill installation Chennai",
    "safety nets Chennai",
    "balcony safety nets Chennai",
    "invisible grills near me",
    "invisible grills",
    "invisible grills Tamil Nadu",
    "safety nets",
    "balcony safety nets",
    "cloth hangers",
    "ceiling cloth hangers",
    "sports nets",
    "cricket practice nets",
    "bird spikes",
    "bird nets",
    "pigeon nets",
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
      "Our main service region is Chennai and the towns within roughly 150 km - Tambaram, Avadi, Poonamallee, Sriperumbudur, Guduvancheri, Tiruvallur, Chengalpattu, Mahabalipuram, Arakkonam, Kanchipuram, Tiruttani, Vandavasi, Ranipet, Cheyyar, Arcot, Tindivanam, Arani and Vellore. We also serve Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Hosur, Tirunelveli and Ooty. Share your exact area and we will confirm availability.",
  },
  {
    question: "Do you cover apartments and gated communities, including under-construction flats?",
    answer:
      "Yes - apartments and gated communities are most of our work. We measure ready-to-move flats, new bookings before handover and resale homes across Chennai, the 150 km belt towns and our other cities. For under-construction flats, book the measurement close to handover so openings, railing positions and society rules are final. High-rise towers need society permission for external work, which we plan into the visit.",
  },
  {
    question: "Do you cover all areas of Chennai?",
    answer:
      "Yes - from Adyar, Velachery and the OMR / ECR corridor in the south to Anna Nagar, Porur and Avadi in the west, and Perambur, Kolathur and Madhavaram in the north, plus Tambaram, Chromepet and Pallavaram along GST Road. Each locality has its own page with the services available there.",
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
    question: "Do you install cloth hangers and sports nets?",
    answer:
      "Yes. We fit ceiling and balcony cloth drying hangers sized to your span and ceiling height, and cricket practice or sports perimeter nets sized to your terrace, compound or ground. Both are measured on site before the quote.",
  },
  {
    question: "What are bird spikes and when should I use them instead of bird nets?",
    answer:
      "Bird spikes stop pigeons landing on specific points such as ledges, sunshades, parapets and AC units. Bird nets close off a whole opening such as a balcony or duct. Many homes use both - we recommend after seeing where the birds actually roost.",
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
  { label: "Invisible Grills in Chennai", service: "invisible-grills", city: "chennai" },
  { label: "Safety Nets in Chennai", service: "safety-nets", city: "chennai" },
  { label: "Balcony Safety Nets in Chennai", service: "balcony-safety-nets", city: "chennai" },
  { label: "Bird Nets in Chennai", service: "bird-nets", city: "chennai" },
  { label: "Cloth Hangers in Chennai", service: "cloth-hangers", city: "chennai" },
  { label: "Sports Nets in Chennai", service: "sports-nets", city: "chennai" },
  { label: "Bird Spikes in Chennai", service: "bird-spikes", city: "chennai" },
  { label: "Invisible Grills in Tambaram", service: "invisible-grills", city: "tambaram" },
  { label: "Invisible Grills in Avadi", service: "invisible-grills", city: "avadi" },
  { label: "Safety Nets in Chengalpattu", service: "safety-nets", city: "chengalpattu" },
  { label: "Invisible Grills in Kanchipuram", service: "invisible-grills", city: "kanchipuram" },
  { label: "Safety Nets in Sriperumbudur", service: "safety-nets", city: "sriperumbudur" },
  { label: "Invisible Grills in Vellore", service: "invisible-grills", city: "vellore" },
  { label: "Safety Nets in Ranipet", service: "safety-nets", city: "ranipet" },
  { label: "Invisible Grills in Coimbatore", service: "invisible-grills", city: "coimbatore" },
  { label: "Safety Nets in Coimbatore", service: "safety-nets", city: "coimbatore" },
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
  const locations = sortChennaiRegionFirst(
    getLocations({ publishedOnly: true, servedOnly: true }),
  );
  const localityCount = countPublishedServedAreas();
  const gallery = HOMEPAGE_PROJECT_IMAGES;
  const fallbackHero = HOMEPAGE_PROJECT_IMAGES[0] ?? "/images/logo.png";
  const galleryImage = (index: number): string =>
    gallery[index] || gallery[0] || fallbackHero;
  const aboutSecondary = galleryImage(1);
  const featuredInvisibleImage: string = galleryImage(10);
  const featuredSafetyImage: string = galleryImage(8);

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
    itemListElement: sortMainServicesFirst(services).map((service, index) => ({
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
        heroSrc={galleryImage(0)}
        stats={{
          services: services.length,
          cities: locations.length,
          localities: Math.floor(localityCount / 1000) * 1000 || localityCount,
        }}
      />

      <AboutIntro
        imageSrc={galleryImage(0)}
        secondarySrc={aboutSecondary}
      />

      <ChennaiRegionDirectory />

      <Section id="services" className="bg-white scroll-mt-28">
        <Container className="space-y-8">
          <SectionHeader
            eyebrow="Our core services"
            title="Invisible grills, safety nets, cloth hangers, sports nets and bird spikes"
            lead="The five installations we fit most in Chennai and within 150 km — each measured on site before the quote."
          />
          <MainServicesShowcase services={services} fallbackImage={fallbackHero} />
          <div className="space-y-4 pt-4">
            <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
              More protection and utility installations
            </h3>
            <ServiceCardsGrid
              services={services}
              images={gallery}
              limit={6}
              excludeSlugs={MAIN_SERVICE_SLUGS}
            />
          </div>
          <p className="text-sm text-ink-500">
            Need a specific installation?{" "}
            <Link href="/services/" className="font-semibold text-brand-500 hover:text-brand-600">
              View all services
            </Link>{" "}
            or{" "}
            <Link href="/contact/" className="font-semibold text-brand-500 hover:text-brand-600">
              request a quote
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

      {/* Belt towns are already listed in <ChennaiRegionDirectory />; show Chennai + the other hubs here. */}
      <AreasServe
        locations={locations.filter((city) => !isChennaiBeltTown(city.slug))}
        localityCount={localityCount}
      />

      <Section className="bg-white">
        <Container className="space-y-6">
          <SectionHeader
            eyebrow="Our work"
            title="A glimpse of our recent installations"
            lead="Real Glory project photography - invisible grills, safety nets, bird nets, sports nets and cloth hangers."
          />
          <ImageGallery images={gallery.slice(0, 8)} columns="4" priorityCount={1} />
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
            More FAQs →
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
                  →
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/locations/"
            className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600"
          >
            Browse all service areas →
          </Link>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

