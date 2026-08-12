import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { getLocations, getServices } from "@/lib/data/repositories";

const BENEFITS = [
  "Free site inspection",
  "Professional installation",
  "Quality materials named in the quote",
  "Transparent pricing",
  "Fast response on call & WhatsApp",
  "Service across Tamil Nadu",
];

export function HomeQuote() {
  const services = getServices({ publishedOnly: true }).map((service) => ({
    id: service.id,
    name: service.name,
  }));
  const locations = getLocations({ publishedOnly: true, servedOnly: true }).map((location) => ({
    id: location.id,
    name: location.name,
  }));

  return (
    <section id="contact" className="section-space scroll-mt-28 bg-white">
      <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
              <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
              Get in touch
            </p>
            <h2 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
              Request your free quote
            </h2>
            <p className="text-base leading-8 text-ink-600">
              Share your city, openings and preferred service. We confirm availability, schedule a
              free measurement where we serve, and send a clear written estimate.
            </p>
          </div>

          <ul className="grid gap-2.5 sm:grid-cols-2">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-ink-700">
                <span className="text-cta-500" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} size="lg" external>
              Call Now
            </Button>
            <Button
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
              variant="whatsapp"
              size="lg"
              external
            >
              WhatsApp
            </Button>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm leading-7 text-ink-600">
            <p className="font-semibold text-brand-900">Prefer to talk first?</p>
            <p className="mt-1">
              Call{" "}
              <a
                href={`tel:${BUSINESS_CONFIG.phone.raw}`}
                className="font-semibold text-brand-500 hover:text-brand-600"
              >
                {BUSINESS_CONFIG.phone.display}
              </a>{" "}
              · Hours: {BUSINESS_CONFIG.businessHours.display}
            </p>
          </div>
        </div>

        <div id="quote" className="scroll-mt-32">
          <QuoteForm services={services} locations={locations} />
        </div>
      </div>
    </section>
  );
}
