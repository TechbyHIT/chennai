import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImageGallery } from "@/components/media/ImageGallery";
import { ContentModules } from "@/components/sections/ContentModules";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { InternalLinksList } from "@/components/sections/InternalLinksList";
import { QuoteFormLoader } from "@/components/forms/QuoteFormLoader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildPageContent } from "@/lib/content/build-page-content";
import { getServiceById } from "@/lib/data/repositories";
import { buildInternalLinks } from "@/lib/internal-links/build-internal-links";
import { getHomepageGallery, getServiceMedia } from "@/lib/media/catalog";
import { faqSchema } from "@/lib/schema/faq-schema";
import { webPageSchema } from "@/lib/schema/web-page-schema";
import type { PageRecord } from "@/types/page";
import type { BreadcrumbItem } from "@/types/seo";
import Image from "next/image";

export function ProgrammaticPage({
  page,
  breadcrumbs,
  extraSchema = [],
}: {
  page: PageRecord;
  breadcrumbs: BreadcrumbItem[];
  extraSchema?: Record<string, unknown>[];
}) {
  const { modules, faqs } = buildPageContent(page);
  const links = buildInternalLinks(page);
  const service = page.serviceId ? getServiceById(page.serviceId) : undefined;
  const media = service
    ? getServiceMedia(service.slug)
    : {
        hero: getHomepageGallery(1)[0] ?? "/images/homepage/glory-home-01.png",
        gallery: getHomepageGallery(8),
      };
  const hero = media.hero;
  const gallery = media.gallery.slice(0, 12);

  const jump = [
    { id: "content", label: "Content" },
    { id: "gallery", label: "Photos" },
    { id: "faq", label: "FAQ" },
    { id: "links", label: "Links" },
    { id: "quote", label: "Quote" },
  ];

  return (
    <article className="seo-page">
      <JsonLd data={[webPageSchema(page), faqSchema(faqs), ...extraSchema]} />

      <header className="seo-hero">
        <Image src={hero} alt={page.h1} fill priority sizes="100vw" className="object-cover" />
        <div className="seo-hero__veil" />
        <Container className="seo-hero__content">
          <Breadcrumbs items={breadcrumbs} light />
          <p className="seo-kicker seo-kicker--light">Tamil Nadu service coverage</p>
          <Heading as="h1" className="seo-hero__title">
            {page.h1}
          </Heading>
          <p className="seo-hero__sub">{page.introduction}</p>
          <div className="seo-hero__actions">
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
              Call now
            </Button>
            <Button
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
              variant="secondary"
              external
            >
              WhatsApp
            </Button>
            <Button
              href="#quote"
              variant="outline"
              className="border-white/35 bg-white/10 text-white hover:bg-white/20"
            >
              Get a quote
            </Button>
          </div>
        </Container>
      </header>

      <nav className="seo-toc" aria-label="On this page">
        <div className="seo-toc__inner">
          <span className="seo-toc__label">On this page</span>
          {jump.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="seo-toc__link">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="seo-layout">
        <div className="seo-layout__main">
          {gallery.length > 0 ? (
            <section id="gallery" className="seo-section">
              <ImageGallery title="Installation photos" images={gallery} columns="3" />
            </section>
          ) : null}

          <div id="content">
            <ContentModules
              modules={modules.filter((module) => module.key !== "quotation-cta")}
            />
          </div>

          <section className="seo-cta-band">
            <div>
              <p className="seo-kicker seo-kicker--light">Free inspection</p>
              <h2>Measure first, then quote</h2>
              <p>
                Pricing depends on measurements, material grade, spacing, access and total openings.
              </p>
            </div>
            <div className="seo-hero__actions">
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
                Call
              </Button>
              <Button
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                variant="secondary"
                external
              >
                WhatsApp
              </Button>
            </div>
          </section>

          <section id="faq" className="seo-section seo-section--muted">
            <header className="seo-section__head">
              <Heading as="h2">Frequently asked questions</Heading>
            </header>
            <FaqAccordion items={faqs} />
          </section>

          <section id="links" className="seo-section">
            <InternalLinksList links={links} />
          </section>

          <section id="quote" className="seo-section">
            <div className="seo-quote-panel">
              <div>
                <header className="seo-section__head">
                  <Heading as="h2">Request a quotation</Heading>
                  <p className="seo-section__sub">
                    Share your city or area in Tamil Nadu, property type and openings.
                  </p>
                </header>
              </div>
              <QuoteFormLoader />
            </div>
          </section>
        </div>

        <aside className="seo-layout__aside" aria-label="Quick contact">
          <div className="seo-rail">
            <p className="seo-kicker">Quick contact</p>
            <h2>{page.h1}</h2>
            <p>Call, WhatsApp or use the quote form for a measurement visit.</p>
            <div className="seo-rail__actions">
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
                Call {BUSINESS_CONFIG.phone.display}
              </Button>
              <Button
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                variant="secondary"
                external
              >
                WhatsApp
              </Button>
              <Button href="#quote" variant="outline">
                Quote form
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <CtaBanner />
    </article>
  );
}
