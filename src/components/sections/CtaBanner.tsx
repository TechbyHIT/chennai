import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BUSINESS_CONFIG } from "@/config/business";

export function CtaBanner() {
  return (
    <section className="section-space">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-600 to-brand-500 px-6 py-12 text-white sm:px-10 sm:py-16">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-56 w-56 rounded-full bg-cta-500/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cta-500">
              Contact CTA
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Book a free inspection in Tamil Nadu
            </h2>
            <p className="text-white/85">
              Tell us your city, area and openings. We confirm availability, schedule measurement
              and share a clear quotation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact/" size="lg">
                Get a quote
              </Button>
              <Button
                href={`tel:${BUSINESS_CONFIG.phone.raw}`}
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                external
              >
                Call {BUSINESS_CONFIG.phone.display}
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
          </div>
        </div>
      </Container>
    </section>
  );
}
