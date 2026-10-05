import type { ReactNode } from "react";
import Link from "next/link";
import { AboutIntro } from "@/components/homepage/AboutIntro";
import { FeaturedCategory } from "@/components/homepage/FeaturedCategory";
import { HomeHero } from "@/components/homepage/HomeHero";
import { HomeQuote } from "@/components/homepage/HomeQuote";
import { MainServicesShowcase } from "@/components/homepage/MainServicesShowcase";
import { ServiceCardsGrid } from "@/components/homepage/ServiceCardsGrid";
import { TrustReviews } from "@/components/homepage/TrustReviews";
import { WhyChooseUs } from "@/components/homepage/WhyChooseUs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { ContentModules } from "@/components/sections/ContentModules";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { InternalLinksList } from "@/components/sections/InternalLinksList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { MAIN_SERVICE_SLUGS } from "@/config/main-services";
import type { ContentModule, FAQItem } from "@/types/content";
import type { BreadcrumbItem, InternalLink } from "@/types/seo";
import type { Service } from "@/types/service";

export type PlaceDirectoryGroup = {
  heading?: string;
  pills: Array<{ name: string; href: string }>;
};

export type PlacePageProps = {
  breadcrumbs: BreadcrumbItem[];
  schemas: Record<string, unknown> | Record<string, unknown>[];
  hero: {
    kicker: string;
    title: string;
    lead: string;
    image: string;
    imageAlt: string;
    trust: string[];
    stats: Array<{ label: string; value: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
    secondaryImage?: string;
    imageAlt?: string;
    secondaryAlt?: string;
    points: Array<{ title: string; text: string }>;
    primaryCta: { label: string; href: string };
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Service[];
    /** Serializable slug → href map for the showcase cards. */
    hrefs: Record<string, string>;
    /** Serializable slug → href map for the grid cards; defaults to hrefs. */
    cardHrefs?: Record<string, string>;
    images: string[];
    placeLabel: string;
    moreTitle?: string;
  };
  featured: {
    service: Service;
    eyebrow: string;
    title: string;
    lead: string;
    points: string[];
    exploreHref: string;
    imageAlt: string;
    reverse?: boolean;
    muted?: boolean;
  };
  directory: {
    eyebrow: string;
    title: string;
    lead: string;
    groups: PlaceDirectoryGroup[];
    footer?: { label: string; href: string };
  };
  gallery: {
    title: string;
    lead: string;
    images: string[];
    link?: { label: string; href: string };
  };
  contentModules: ContentModule[];
  internalLinks: InternalLink[];
  faqs: {
    title: string;
    lead?: string;
    items: FAQItem[];
  };
  extra?: ReactNode;
};

function PlaceSectionHeader({
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

/**
 * Convert free-text local notes into the { title, text } pillar cards
 * used by the about section.
 */
export function textPoints(
  place: string,
  items: string[],
  limit = 3,
): Array<{ title: string; text: string }> {
  return items.slice(0, limit).map((text) => {
    const parts = text.split(/\s*[:–—]\s*/);
    if (parts.length > 1) {
      return {
        title: (parts[0] ?? place).trim().slice(0, 48) || place,
        text: text.trim(),
      };
    }
    return { title: place, text: text.trim() };
  });
}

/**
 * Shared location-page template: the homepage design language
 * (hero, about, service showcase, featured spotlight, dark directory,
 * gallery, why-choose, reviews, FAQ, quote, CTA) with every word, title,
 * picture and link scoped to the connected location.
 */
export function PlacePage({
  breadcrumbs,
  schemas,
  hero,
  about,
  services,
  featured,
  directory,
  gallery,
  contentModules,
  internalLinks,
  faqs,
  extra,
}: PlacePageProps) {
  const showcaseVisible = services.items.some((item) =>
    (MAIN_SERVICE_SLUGS as readonly string[]).includes(item.slug),
  );
  const cardHrefs = services.cardHrefs ?? services.hrefs;
  return (
    <>
      <JsonLd data={schemas} />
      <div className="bg-white">
        <Container className="pt-5">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      <HomeHero
        heroSrc={hero.image}
        stats={{ services: 0, cities: 0, localities: 0 }}
        statCards={hero.stats}
        kicker={hero.kicker}
        title={hero.title}
        lead={hero.lead}
        trust={hero.trust}
        heroAlt={hero.imageAlt}
        quoteHref="#contact"
      />

      <AboutIntro
        imageSrc={about.image}
        secondarySrc={about.secondaryImage}
        eyebrow={about.eyebrow}
        title={about.title}
        body={
          <>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-ink-700">
                {paragraph}
              </p>
            ))}
          </>
        }
        pillars={about.points}
        imageAlt={about.imageAlt}
        secondaryAlt={about.secondaryAlt}
        primaryCta={about.primaryCta}
      />

      <Section id="services" className="bg-white scroll-mt-28">
        <Container className="space-y-8">
          <PlaceSectionHeader
            eyebrow={services.eyebrow}
            title={services.title}
            lead={services.lead}
          />
          {showcaseVisible ? (
            <MainServicesShowcase
              services={services.items}
              fallbackImage={services.images[0] ?? services.items[0]?.heroImage ?? ""}
              hrefs={services.hrefs}
              placeLabel={services.placeLabel}
            />
          ) : null}
          <div className="space-y-4 pt-4">
            <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
              {services.moreTitle ?? `More installations in ${services.placeLabel}`}
            </h3>
            <ServiceCardsGrid
              services={services.items}
              images={services.images}
              excludeSlugs={showcaseVisible ? MAIN_SERVICE_SLUGS : []}
              hrefs={cardHrefs}
              placeLabel={services.placeLabel}
            />
          </div>
        </Container>
      </Section>

      <FeaturedCategory
        service={featured.service}
        eyebrow={featured.eyebrow}
        title={featured.title}
        lead={featured.lead}
        points={featured.points}
        exploreHref={featured.exploreHref}
        quoteHref="#contact"
        imageAlt={featured.imageAlt}
        reverse={featured.reverse}
        muted={featured.muted}
      />

      <section id="areas" className="section-space scroll-mt-28 bg-brand-900 text-white">
        <div className="container-page space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cta-500">
              <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
              {directory.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{directory.title}</h2>
            <p className="text-base leading-7 text-white/75">{directory.lead}</p>
          </div>
          {directory.groups.map((group) => (
            <div key={group.heading ?? group.pills[0]?.href ?? "group"} className="space-y-3">
              {group.heading ? (
                <h3 className="font-display text-xl font-bold text-white">{group.heading}</h3>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {group.pills.map((pill) => (
                  <Link
                    key={pill.href}
                    href={pill.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {pill.name}
                    <span aria-hidden="true" className="text-cta-500">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {directory.footer ? (
            <Link
              href={directory.footer.href}
              className="inline-flex rounded-full bg-cta-500 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-cta-600"
            >
              {directory.footer.label}
            </Link>
          ) : null}
        </div>
      </section>

      <Section className="bg-white">
        <Container className="space-y-6">
          <PlaceSectionHeader
            eyebrow="Our work"
            title={gallery.title}
            lead={gallery.lead}
          />
          <ImageGallery images={gallery.images.slice(0, 8)} columns="4" priorityCount={1} />
          {gallery.link ? (
            <p className="text-sm text-ink-500">
              <Link
                href={gallery.link.href}
                className="font-semibold text-brand-500 hover:text-brand-600"
              >
                {gallery.link.label}
              </Link>
            </p>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <PlaceSectionHeader
            eyebrow="Why choose Glory"
            title="Safety-first process. Honest claims."
            lead="Capabilities we actually deliver - measurement, materials, finishing and Tamil Nadu coverage."
          />
          <WhyChooseUs />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          <PlaceSectionHeader
            eyebrow="What our customers say"
            title="Reviews publish when verified"
            lead="We only display permissioned customer feedback. Until then, we share process and photography you can trust."
          />
          <TrustReviews />
        </Container>
      </Section>

      {contentModules.length > 0 || internalLinks.length > 0 ? (
        <Section className="bg-white">
          <Container className="space-y-8">
            <ContentModules modules={contentModules} />
            <InternalLinksList links={internalLinks} />
          </Container>
        </Section>
      ) : null}

      {extra}

      <Section>
        <Container className="space-y-8">
          <PlaceSectionHeader eyebrow="FAQ" title={faqs.title} lead={faqs.lead} />
          <FaqAccordion items={faqs.items} />
          <Link
            href="/faq/"
            className="inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600"
          >
            More FAQs →
          </Link>
        </Container>
      </Section>

      <HomeQuote />

      <CtaBanner />
    </>
  );
}
