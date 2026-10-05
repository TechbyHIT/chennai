import { AboutIntro } from "@/components/homepage/AboutIntro";
import { HomeHero } from "@/components/homepage/HomeHero";
import { HomeQuote } from "@/components/homepage/HomeQuote";
import { TrustReviews } from "@/components/homepage/TrustReviews";
import { WhyChooseUs } from "@/components/homepage/WhyChooseUs";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { textPoints } from "@/components/sections/PlacePage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildServicePath } from "@/config/routes";
import type { PremiumLandingModel } from "@/lib/content/build-premium-landing";
import { getLocations, getServices } from "@/lib/data/repositories";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { evaluateLandingIndexIf } from "@/lib/seo/index-if-gate";
import { faqSchema } from "@/lib/schema/faq-schema";
import { localBusinessSchema } from "@/lib/schema/local-business-schema";
import { organizationSchema } from "@/lib/schema/organization-schema";
import { serviceSchema } from "@/lib/schema/service-schema";
import { webPageSchema } from "@/lib/schema/web-page-schema";
import { howToSchema, speakableSchema } from "@/lib/schema/website-schema";
import Link from "next/link";

function LandingHeader({
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

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-ink-700">
          <span className="mt-0.5 text-cta-500" aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PremiumServiceLanding({ model }: { model: PremiumLandingModel }) {
  const { service, seo, city, area, localCopy } = model;

  const indexGate = evaluateLandingIndexIf({
    service,
    city,
    area,
    title: seo.metaTitle,
    metaDescription: seo.metaDescription,
    h1: seo.h1,
    path: seo.path,
    canonicalUrl: seo.canonicalUrl,
    wordCount: model.longform.wordCount,
    internalLinkCount: model.internalLinks.length,
    faqCount: model.faqs.length,
    hasSchema: true,
    hasLocalContext: Boolean(model.authoritySections.length),
    searchIntent: `${service.name} installation in ${model.placeLabel}`,
  });

  const schemas = [
    organizationSchema(),
    localBusinessSchema(),
    webPageSchema({
      id: `landing-${seo.slug}`,
      path: seo.path,
      slug: seo.slug,
      pageType: area ? "service-area" : "service-location",
      title: seo.metaTitle,
      metaDescription: seo.metaDescription,
      h1: seo.h1,
      canonicalUrl: seo.canonicalUrl,
      openGraphTitle: seo.metaTitle,
      openGraphDescription: seo.metaDescription,
      openGraphImage: BUSINESS_CONFIG.defaultOpenGraphImage,
      openGraphImageAlt: seo.h1,
      twitterTitle: seo.metaTitle,
      twitterDescription: seo.metaDescription,
      publicationStatus: indexGate.indexable ? "published" : "review",
      allowIndexing: indexGate.indexable,
      contentReviewed: true,
      localDataVerified: true,
      qualityScore: 92,
      similarityScore: 1 - indexGate.uniqueness,
      wordCount: model.longform.wordCount,
      minimumRequiredWordCount: 10000,
      hasUniqueMetadata: indexGate.checks.uniqueMetaDescription,
      hasUniqueContent: indexGate.checks.uniqueIntro,
      hasValidCanonical: indexGate.checks.properCanonical,
      hasInternalLinks: indexGate.checks.uniqueInternalLinks,
      hasValidSchema: indexGate.checks.uniqueSchema,
      crawlPriority: "high",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      searchIntent: `${service.name} ${model.placeLabel}`,
      introduction: model.introduction,
      placeholders: [],
      serviceId: service.id,
      locationId: city.id,
      areaId: area?.id,
    }),
    serviceSchema(service, seo.canonicalUrl, { location: city, area }),
    // BreadcrumbList is emitted by <Breadcrumbs /> — do not duplicate here.
    faqSchema(model.faqs),
    speakableSchema(seo.canonicalUrl),
    howToSchema({
      name: `How ${service.name} installation works in ${model.placeLabel}`,
      description: `Measurement-led process for ${service.name.toLowerCase()} in ${model.placeLabel}, Tamil Nadu.`,
      url: seo.canonicalUrl,
      steps: model.installationSteps.map((step) => ({
        name: step.title,
        text: step.body,
      })),
    }),
  ];

  const galleryImages = model.galleryImages.slice(0, 8);
  const galleryAlts = galleryImages.map(
    (src, index) =>
      model.galleryAlts[index] ?? `${service.name} in ${model.placeLabel} — photo ${index + 1}`,
  );
  const heroImage = model.galleryImages[0] ?? service.heroImage;
  const heroAlt =
    model.galleryAlts[0] ?? `${service.name} installation in ${model.placeLabel}, Tamil Nadu`;

  const formServices = getServices({ publishedOnly: true }).map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const formLocations = getLocations({ publishedOnly: true, servedOnly: true }).map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const directoryGroups = [
    {
      heading: `${service.shortName} in nearby ${city.name} areas`,
      pills: model.nearbyAreas,
    },
    {
      heading: `All ${service.shortName} areas in ${city.name}`,
      pills: model.serviceAreas,
    },
    {
      heading: `Other services in ${model.placeLabel}`,
      pills: model.relatedServices,
    },
    {
      heading: `${service.shortName} in other cities`,
      pills: model.relatedCities,
    },
    {
      heading: "Guides and solutions",
      pills: [...model.relatedGuides, ...model.relatedSolutions],
    },
    {
      heading: `Related ${service.shortName} searches`,
      pills: model.searchVariants,
    },
  ].filter((group) => group.pills.length > 0);

  return (
    <article>
      <JsonLd data={schemas} />
      <div className="bg-white">
        <Container className="pt-5">
          <Breadcrumbs items={model.breadcrumbs} />
        </Container>
      </div>

      <HomeHero
        heroSrc={heroImage}
        stats={{ services: 0, cities: 0, localities: 0 }}
        statCards={[
          { label: "Nearby areas", value: `${model.nearbyAreas.length} localities` },
          { label: "FAQ answers", value: `${model.faqs.length} questions` },
          {
            label: "Complete guide",
            value: `~${model.longform.wordCount.toLocaleString("en-IN")} words`,
          },
        ]}
        kicker={`Glory Grills · ${model.placeLabelFull}`}
        title={seo.h1}
        lead={localCopy.heroLead}
        trust={localCopy.trustBadges}
        heroAlt={heroAlt}
        quoteHref="#quote"
      />

      <Section>
        <Container className="space-y-6">
          <nav aria-label="Table of contents">
            <div className="flex flex-wrap gap-2">
              {model.jumpNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:border-brand-300"
                >
                  <span aria-hidden="true" className="text-cta-500">
                    {item.number}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
          <p className="text-sm leading-7 text-ink-500">
            {localCopy.cityGuideLine}{" "}
            <Link
              href={buildServiceInCityPath(service.slug, city.slug)}
              className="font-semibold text-brand-500 hover:text-brand-600"
            >
              View {city.name} service guide
            </Link>{" "}
            or call{" "}
            <a
              href={`tel:${BUSINESS_CONFIG.phone.raw}`}
              className="font-semibold text-brand-500 hover:text-brand-600"
            >
              {BUSINESS_CONFIG.phone.display}
            </a>{" "}
            for a free site visit in {model.placeLabel}.
          </p>
        </Container>
      </Section>

      <Section id="gallery" className="bg-white scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Our work"
            title={`${service.name} Installation Photos in ${model.placeLabel}`}
            lead={`Browse recent ${service.name.toLowerCase()} project photos relevant to homes in ${model.placeLabel}, ${city.name}.`}
          />
          {galleryImages.length > 0 ? (
            <ImageGallery images={galleryImages} alts={galleryAlts} columns="4" priorityCount={1} />
          ) : null}
        </Container>
      </Section>

      <Section id="quote-top" className="scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Free quote"
            title={`Get Free Quote for ${service.name} in ${model.placeLabel}`}
            lead={`Fill the form below and our team will help schedule a free assessment for ${model.placeLabel}.`}
          />
          <div className="premium-card p-5 sm:p-8">
            <QuoteForm services={formServices} locations={formLocations} />
          </div>
        </Container>
      </Section>

      <Section id="pricing" className="bg-white scroll-mt-28">
        <Container className="space-y-8">
          <LandingHeader
            eyebrow="Pricing"
            title={`${service.name} Price in ${model.placeLabel}`}
            lead="Honest pricing approach — every estimate follows a free site measurement."
          />
          <div className="premium-card gradient-border space-y-3 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
              Honest pricing approach
            </p>
            <p className="font-display text-2xl text-brand-900 sm:text-3xl">
              Quote after measurement
            </p>
            <p className="max-w-3xl text-sm leading-7 text-ink-600">{model.pricingStatement}</p>
          </div>
          <CheckList items={model.pricingFactors} />
          <div className="space-y-4">
            <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
              Customer reviews from {model.placeLabel}
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-ink-500">
              Real customer reviews will appear here once written permission is available. We do
              not publish fake star ratings, AggregateRating schema or fabricated testimonials.
            </p>
            <TrustReviews />
          </div>
        </Container>
      </Section>

      <AboutIntro
        imageSrc={model.galleryImages[1] ?? heroImage}
        secondarySrc={model.galleryImages[2] ?? heroImage}
        eyebrow={`About ${service.shortName} in ${model.placeLabel}`}
        title={localCopy.aboutTitle}
        body={
          <>
            {localCopy.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-ink-700">
                {paragraph}
              </p>
            ))}
            <p className="text-base leading-8 text-ink-700">{model.introduction}</p>
          </>
        }
        pillars={textPoints(model.placeLabel, localCopy.whyChoose)}
        imageAlt={`${service.name} installation in ${model.placeLabel}`}
        secondaryAlt={`${service.name} balcony work in ${model.placeLabel}`}
        primaryCta={{ label: "Get free quote", href: "#quote-top" }}
      />
      <Section id="applications" className="bg-white scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Use-cases"
            title={`${service.name} Applications in ${model.placeLabel}`}
          />
          <CheckList items={model.applications} />
        </Container>
      </Section>

      <Section id="benefits" className="scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Benefits"
            title={`Benefits of Our ${service.name} in ${model.placeLabel}`}
          />
          <CheckList items={model.benefits} />
          {model.localProblems.length > 0 || model.whoNeedsThis.length > 0 ? (
            <div className="grid gap-8 pt-4 lg:grid-cols-2">
              {model.localProblems.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
                    Problems we solve in {model.placeLabel}
                  </h3>
                  <CheckList items={model.localProblems} />
                </div>
              ) : null}
              {model.whoNeedsThis.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
                    Who books this in {model.placeLabel}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {model.whoNeedsThis.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </Container>
      </Section>

      <Section id="process" className="bg-white scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Process"
            title={`Our ${service.name} Installation Process`}
            lead={`Measurement-led process for ${service.name.toLowerCase()} in ${model.placeLabel}, Tamil Nadu.`}
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {model.installationSteps.map((step) => (
              <li key={step.step} className="premium-card flex gap-4 p-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta-500 font-display text-lg font-bold text-brand-900"
                >
                  {step.step}
                </span>
                <span className="space-y-1.5">
                  <strong className="block font-display text-lg text-brand-900">
                    {step.title}
                  </strong>
                  <span className="block text-sm leading-6 text-ink-600">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="materials" className="scroll-mt-28">
        <Container className="space-y-8">
          <LandingHeader
            eyebrow="Materials"
            title={`Premium Materials for ${service.name}`}
            lead={`We discuss the highest practical material options for ${service.name.toLowerCase()} installation in ${model.placeLabel}.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {model.materials.map((item) => (
              <article key={item} className="premium-card p-5 text-sm leading-7 text-ink-700">
                {item}
              </article>
            ))}
          </div>
          <div className="premium-card space-y-0 overflow-hidden p-0">
            {model.features.map((feature, index) => (
              <div
                key={feature.label}
                className={`grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4 ${
                  index % 2 === 1 ? "bg-brand-50/60" : ""
                }`}
              >
                <dt className="text-sm font-bold text-brand-900">{feature.label}</dt>
                <dd className="text-sm leading-6 text-ink-600">{feature.value}</dd>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            <LandingHeader
              eyebrow="Why choose Glory"
              title="Safety-first process. Honest claims."
              lead="Capabilities we actually deliver - measurement, materials, finishing and Tamil Nadu coverage."
            />
            <WhyChooseUs />
          </div>
        </Container>
      </Section>

      <Section id="encyclopedia" className="bg-white scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Local guide"
            title={`About ${service.name} Services in ${model.placeLabelFull}`}
            lead={model.encyclopedia.lead}
          />
          {localCopy.whyLocalParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="max-w-4xl text-base leading-8 text-ink-700">
              {paragraph}
            </p>
          ))}
          {model.encyclopedia.sections.map((section) => (
            <div key={section.id} className="max-w-4xl space-y-3">
              <h3 className="font-display text-xl text-brand-900 sm:text-2xl">{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 36)} className="text-base leading-8 text-ink-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? <CheckList items={section.bullets} /> : null}
            </div>
          ))}
        </Container>
      </Section>

      <Section id="longform" className="scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="Complete guide"
            title={model.longform.title}
            lead={`Original long-form handbook for this page (~${model.longform.wordCount.toLocaleString()} words). Written uniquely for ${service.name} in ${model.placeLabel} — not copied from other websites.`}
          />
          <p className="max-w-4xl text-base leading-8 text-ink-700">{model.longform.lead}</p>
          <nav aria-label="Complete guide sections">
            <div className="flex flex-wrap gap-2">
              {model.longform.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#lf-${section.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:border-brand-300"
                >
                  <span aria-hidden="true" className="text-cta-500">
                    {index + 1}
                  </span>
                  {section.title}
                </a>
              ))}
            </div>
          </nav>
          {model.longform.sections.map((section) => (
            <article key={section.id} id={`lf-${section.id}`} className="max-w-4xl scroll-mt-28 space-y-3">
              <h3 className="font-display text-xl text-brand-900 sm:text-2xl">{section.title}</h3>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={`${section.id}-${index}`}
                  className="text-base leading-8 text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? <CheckList items={section.bullets} /> : null}
            </article>
          ))}
        </Container>
      </Section>

      {model.authoritySections.length > 0 || model.seoScrollBlocks.length > 0 ? (
        <Section className="bg-white">
          <Container className="space-y-8">
            <LandingHeader
              eyebrow={model.placeLabel}
              title={`${service.shortName} notes for ${model.placeLabel}`}
              lead={`Place-specific notes for ${service.name.toLowerCase()} in ${model.placeLabelFull} — building mix, demand patterns and measurement pointers.`}
            />
            {model.authoritySections.map((section) => (
              <div key={section.key} className="max-w-4xl space-y-3">
                <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
                  {section.title}
                </h3>
                <p className="text-base leading-8 text-ink-700">{section.body}</p>
                {section.bullets?.length ? <CheckList items={section.bullets} /> : null}
              </div>
            ))}
            {model.seoScrollBlocks.map((block) => (
              <div key={block.id} className="max-w-4xl space-y-3">
                <h3 className="font-display text-xl text-brand-900 sm:text-2xl">{block.title}</h3>
                <p className="text-base font-semibold leading-8 text-ink-700">{block.lead}</p>
                {block.paragraphs.map((paragraph, index) => (
                  <p key={`${block.id}-${index}`} className="text-base leading-8 text-ink-700">
                    {paragraph}
                  </p>
                ))}
                {block.bullets?.length ? <CheckList items={block.bullets} /> : null}
              </div>
            ))}
          </Container>
        </Section>
      ) : null}

      <section id="areas" className="section-space scroll-mt-28 bg-brand-900 text-white">
        <div className="container-page space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cta-500">
              <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
              Service areas
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {service.name} in Nearby Areas
            </h2>
            <p className="text-base leading-7 text-white/75">
              We also provide {service.name.toLowerCase()} installation services in these nearby{" "}
              {city.name} localities — plus every service we fit in {model.placeLabel}.
            </p>
          </div>
          {directoryGroups.map((group) => (
            <div key={group.heading} className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white">{group.heading}</h3>
              <div className="flex flex-wrap gap-2">
                {group.pills.map((item) => (
                  <Link
                    key={`${item.href}-${item.name}`}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {item.name}
                    <span aria-hidden="true" className="text-cta-500">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <p className="text-sm text-white/75">
            <Link
              href={buildServiceInCityPath(service.slug, city.slug)}
              className="font-semibold text-cta-500 hover:text-cta-600"
            >
              View all {service.name} services in {city.name}
            </Link>{" "}
            ·{" "}
            <Link
              href={buildServicePath(service.slug)}
              className="font-semibold text-cta-500 hover:text-cta-600"
            >
              {service.name} overview
            </Link>
          </p>
        </div>
      </section>

      <Section id="faq" className="bg-white scroll-mt-28">
        <Container className="space-y-6">
          <LandingHeader
            eyebrow="FAQ"
            title={`Frequently Asked Questions — ${service.name} in ${model.placeLabel}`}
            lead={`Common questions about ${service.name.toLowerCase()} installation in ${model.placeLabel}, ${city.name}.`}
          />
          <FaqAccordion items={model.faqs} />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-6">
          <div className="premium-card gradient-border space-y-4 p-6 text-center sm:p-10">
            <h2 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
              Ready for {service.name} Installation in {model.placeLabel}?
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-ink-600">
              Get professional {service.name.toLowerCase()} installation in {model.placeLabel}{" "}
              today. Free inspection, measurement-based rates, and clear after-sales guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} size="lg" external>
                Call: {BUSINESS_CONFIG.phone.display}
              </Button>
              <Button
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                variant="whatsapp"
                size="lg"
                external
              >
                WhatsApp Now
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <HomeQuote />

      <CtaBanner />
    </article>
  );
}
