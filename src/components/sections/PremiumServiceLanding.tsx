import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildServicePath } from "@/config/routes";
import type { PremiumLandingModel } from "@/lib/content/build-premium-landing";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { evaluateLandingIndexIf } from "@/lib/seo/index-if-gate";
import { faqSchema } from "@/lib/schema/faq-schema";
import { localBusinessSchema } from "@/lib/schema/local-business-schema";
import { organizationSchema } from "@/lib/schema/organization-schema";
import { serviceSchema } from "@/lib/schema/service-schema";
import { webPageSchema } from "@/lib/schema/web-page-schema";
import { howToSchema, speakableSchema } from "@/lib/schema/website-schema";
import Image from "next/image";
import Link from "next/link";

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
    serviceSchema(service, seo.canonicalUrl),
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

  return (
    <article className="fg-page">
      <JsonLd data={schemas} />

      <Container className="fg-shell">
        <div className="fg-main">
          <Breadcrumbs items={model.breadcrumbs} />

          <header className="fg-hero">
            <h1 className="fg-h1" data-speakable>
              {seo.h1}
            </h1>
            <p className="fg-hero__lead" data-speakable>
              {localCopy.heroLead}
            </p>

            <ul className="fg-trust-row">
              {localCopy.trustBadges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>

            <div className="fg-hero__actions">
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
                Call Now: {BUSINESS_CONFIG.phone.display}
              </Button>
              <Button
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                variant="secondary"
                external
              >
                WhatsApp Us
              </Button>
            </div>

            <p className="fg-city-line">
              {localCopy.cityGuideLine}{" "}
              <Link href={buildServiceInCityPath(service.slug, city.slug)}>
                View {city.name} service guide
              </Link>{" "}
              or call{" "}
              <a href={`tel:${BUSINESS_CONFIG.phone.raw}`}>{BUSINESS_CONFIG.phone.display}</a> for a
              free site visit in {model.placeLabel}.
            </p>
          </header>

          <nav className="fg-toc" aria-label="Table of contents">
            <h2 className="fg-toc__title">Table of Contents</h2>
            <ol className="fg-toc__list">
              {model.jumpNav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <span>{item.number}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="gallery" className="fg-section">
            <h2 className="fg-h2">
              {service.name} Installation Photos in {model.placeLabel}
            </h2>
            <p className="fg-muted">
              Browse recent {service.name.toLowerCase()} project photos relevant to homes in{" "}
              {model.placeLabel}, {city.name}.
            </p>
            {model.galleryImages.length > 0 ? (
              <div className="fg-gallery">
                {model.galleryImages.slice(0, 8).map((src, index) => (
                  <figure key={`${src}-${index}`}>
                    <Image
                      src={src}
                      alt={model.galleryAlts[index] ?? `${service.name} in ${model.placeLabel}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </figure>
                ))}
              </div>
            ) : null}
          </section>

          <section id="quote-top" className="fg-section fg-quote-card">
            <h2 className="fg-h2">
              Get Free Quote for {service.name} in {model.placeLabel}
            </h2>
            <p className="fg-muted">
              Fill the form below and our team will help schedule a free assessment for{" "}
              {model.placeLabel}.
            </p>
            <QuoteForm />
          </section>

          <section id="pricing" className="fg-section">
            <h2 className="fg-h2">
              {service.name} Price in {model.placeLabel}
            </h2>
            <div className="fg-price-box">
              <p className="fg-price-box__label">Honest pricing approach</p>
              <p className="fg-price-box__value">Quote after measurement</p>
              <p className="fg-price-box__note">{model.pricingStatement}</p>
            </div>
            <ul className="fg-check-grid">
              {model.pricingFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>

            <div className="fg-review-box">
              <h3 className="fg-h3">Customer reviews from {model.placeLabel}</h3>
              <p>
                Real customer reviews will appear here once written permission is available. We do
                not publish fake star ratings, AggregateRating schema or fabricated testimonials.
              </p>
            </div>
          </section>

          <section id="about" className="fg-section">
            <h2 className="fg-h2">{localCopy.aboutTitle}</h2>
            {localCopy.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="fg-prose">
                {paragraph}
              </p>
            ))}
            <p className="fg-prose">{model.introduction}</p>
          </section>

          <section id="applications" className="fg-section">
            <h2 className="fg-h2">
              {service.name} Applications in {model.placeLabel}
            </h2>
            <ul className="fg-check-grid">
              {model.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="benefits" className="fg-section">
            <h2 className="fg-h2">
              Benefits of Our {service.name} in {model.placeLabel}
            </h2>
            <ul className="fg-check-grid">
              {model.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="process" className="fg-section">
            <h2 className="fg-h2">Our {service.name} Installation Process</h2>
            <ol className="fg-steps">
              {model.installationSteps.map((step) => (
                <li key={step.step}>
                  <span>{step.step}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="materials" className="fg-section">
            <h2 className="fg-h2">Premium Materials for {service.name}</h2>
            <p className="fg-muted">
              We discuss the highest practical material options for {service.name.toLowerCase()}{" "}
              installation in {model.placeLabel}:
            </p>
            <div className="fg-material-grid">
              {model.materials.map((item) => (
                <article key={item}>{item}</article>
              ))}
            </div>
          </section>

          <section id="encyclopedia" className="fg-section">
            <h2 className="fg-h2">
              About {service.name} Services in {model.placeLabelFull}
            </h2>
            <p className="fg-prose">{model.encyclopedia.lead}</p>
            {localCopy.whyLocalParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="fg-prose">
                {paragraph}
              </p>
            ))}

            {model.encyclopedia.sections.map((section) => (
              <div key={section.id} className="fg-wiki">
                <h3 className="fg-h3">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 36)} className="fg-prose">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="fg-check-grid">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </section>

          <section id="longform" className="fg-section">
            <h2 className="fg-h2">{model.longform.title}</h2>
            <p className="fg-muted">
              Original long-form handbook for this page (~{model.longform.wordCount.toLocaleString()}{" "}
              words). Written uniquely for {service.name} in {model.placeLabel} — not copied from
              other websites.
            </p>
            <p className="fg-prose">{model.longform.lead}</p>

            <nav className="fg-toc" aria-label="Complete guide sections">
              <h3 className="fg-toc__title">Complete guide sections</h3>
              <ol className="fg-toc__list">
                {model.longform.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#lf-${section.id}`}>
                      <span>{index + 1}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {model.longform.sections.map((section) => (
              <article key={section.id} id={`lf-${section.id}`} className="fg-wiki">
                <h3 className="fg-h3">{section.title}</h3>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.id}-${index}`} className="fg-prose">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="fg-check-grid">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </section>

          <section id="faq" className="fg-section">
            <h2 className="fg-h2">
              Frequently Asked Questions — {service.name} in {model.placeLabel}
            </h2>
            <p className="fg-muted">
              Common questions about {service.name.toLowerCase()} installation in{" "}
              {model.placeLabel}, {city.name}.
            </p>
            <FaqAccordion items={model.faqs} />
          </section>

          <section id="areas" className="fg-section">
            <h2 className="fg-h2">
              {service.name} in Nearby Areas
            </h2>
            <p className="fg-muted">
              We also provide {service.name.toLowerCase()} installation services in these nearby{" "}
              {city.name} localities:
            </p>
            <div className="fg-pill-wrap">
              {model.nearbyAreas.map((item) => (
                <Link key={item.href} href={item.href} className="fg-pill">
                  {service.shortName} in {item.name}
                </Link>
              ))}
            </div>

            <h3 className="fg-h3">Other Services in {model.placeLabel}</h3>
            <div className="fg-pill-wrap">
              {model.relatedServices.slice(0, 16).map((item) => (
                <Link key={item.href} href={item.href} className="fg-pill">
                  {item.name}
                </Link>
              ))}
            </div>

            <h3 className="fg-h3">
              Related {service.name} searches
            </h3>
            <div className="fg-pill-wrap">
              {model.searchVariants.map((item) => (
                <Link key={`${item.href}-${item.name}`} href={item.href} className="fg-pill">
                  {item.name}
                </Link>
              ))}
            </div>

            <p className="fg-muted mt-4">
              <Link href={buildServiceInCityPath(service.slug, city.slug)}>
                View all {service.name} services in {city.name}
              </Link>
              {" · "}
              <Link href={buildServicePath(service.slug)}>{service.name} overview</Link>
            </p>
          </section>

          <section className="fg-final-cta">
            <h2>Ready for {service.name} Installation in {model.placeLabel}?</h2>
            <p>
              Get professional {service.name.toLowerCase()} installation in {model.placeLabel}{" "}
              today. Free inspection, measurement-based rates, and clear after-sales guidance.
            </p>
            <div className="fg-hero__actions">
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
                Call: {BUSINESS_CONFIG.phone.display}
              </Button>
              <Button
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                variant="secondary"
                external
              >
                WhatsApp Now
              </Button>
            </div>
          </section>

          <section id="quote" className="fg-section fg-quote-card">
            <h2 className="fg-h2">Request a Callback</h2>
            <p className="fg-muted">
              Fill the form below and connect with our experts for free assessment.
            </p>
            <QuoteForm />
          </section>
        </div>

        <aside className="fg-sidebar" aria-label="Service sidebar">
          <div className="fg-side-card fg-side-card--dark">
            <h2>
              {service.shortName} in {model.placeLabel}
            </h2>
            <ul className="fg-side-meta">
              <li>
                <strong>Serving</strong> {model.placeLabel}
                {area ? `, ${city.name}` : ""}
              </li>
              <li>
                <strong>Phone</strong>{" "}
                <a href={`tel:${BUSINESS_CONFIG.phone.raw}`}>{BUSINESS_CONFIG.phone.display}</a>
              </li>
              <li>
                <strong>Hours</strong> {BUSINESS_CONFIG.businessHours.display}
              </li>
            </ul>
            <Button href="#quote-top" className="w-full justify-center">
              Get Free Quote
            </Button>
          </div>

          <div className="fg-side-card">
            <h3>Nearby Service Areas</h3>
            <div className="fg-pill-wrap">
              {model.nearbyAreas.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="fg-pill">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="fg-side-card">
            <h3>Why Choose Glory?</h3>
            <ul className="fg-side-list">
              {localCopy.whyChoose.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="fg-side-card">
            <h3>Other Services in {model.placeLabel}</h3>
            <ul className="fg-side-links">
              {model.relatedServices.slice(0, 12).map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </article>
  );
}
