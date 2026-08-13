"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SafeImage } from "@/components/media/SafeImage";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildServicePath } from "@/config/routes";
import type { Service } from "@/types/service";
import { cn } from "@/lib/utils/cn";

export function FeaturedCategory({
  service,
  eyebrow,
  title,
  lead,
  points,
  reverse = false,
  muted = false,
}: {
  service: Service;
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
  reverse?: boolean;
  muted?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={cn("section-space", muted && "bg-white")}>
      <div
        className={cn(
          "container-page grid items-center gap-10 lg:grid-cols-2",
          reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
        )}
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-brand-100"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <SafeImage
            src={service.heroImage || "/images/homepage/glory-home-01.png"}
            alt={`${service.name} by ${BUSINESS_CONFIG.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            placeholder="blur"
            loading="lazy" />
        </motion.div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
              <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">{title}</h2>
            <p className="text-base leading-8 text-ink-600">{lead}</p>
          </div>
          <ul className="grid gap-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-ink-700">
                <span className="mt-0.5 text-cta-500" aria-hidden="true">
                  âœ“
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button href={buildServicePath(service.slug)} variant="secondary">
              Explore {service.shortName || service.name}
            </Button>
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
              Call Now
            </Button>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-500 hover:text-brand-600"
            >
              Get a quote â†’
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

