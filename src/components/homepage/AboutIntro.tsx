"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SafeImage } from "@/components/media/SafeImage";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildServicePath } from "@/config/routes";

const PILLARS = [
  {
    title: "Vision",
    text: "Safer, more comfortable modern spaces across Tamil Nadu - without heavy iron clutter.",
  },
  {
    title: "Mission",
    text: "Deliver reliable invisible-grill and safety solutions with careful measurement and professional installation.",
  },
  {
    title: "Our Promise",
    text: "Quality materials named in writing, precise fitting and dependable service follow-through.",
  },
];

export function AboutIntro({
  imageSrc = "/images/homepage/glory-home-01.png",
  secondarySrc,
}: {
  imageSrc?: string;
  secondarySrc?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-space scroll-mt-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mt-6 aspect-[3/4] overflow-hidden rounded-[1.35rem]">
            <SafeImage
              src={imageSrc}
              alt={`${BUSINESS_CONFIG.name} invisible grill installation`}
              fill
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover"
                          />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem]">
            <SafeImage
              src={secondarySrc || imageSrc}
              alt={`${BUSINESS_CONFIG.name} balcony safety installation`}
              fill
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover"
                          />
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
              <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
              About {BUSINESS_CONFIG.name}
            </p>
            <h2 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
              Premium safety solutions for modern homes
            </h2>
            <p className="text-base leading-8 text-ink-700">
              {BUSINESS_CONFIG.name} installs{" "}
              <Link
                href={buildServicePath("invisible-grills")}
                className="font-semibold text-brand-500 hover:text-brand-600"
              >
                invisible grills
              </Link>
              ,{" "}
              <Link
                href={buildServicePath("safety-nets")}
                className="font-semibold text-brand-500 hover:text-brand-600"
              >
                safety nets
              </Link>
              , bird netting and related protection systems for balconies, windows, terraces and
              utility areas across Tamil Nadu. Every project starts with a free site measurement so
              spacing, tension and fixing decisions follow the actual opening - not a brochure.
            </p>
            <p className="text-base leading-8 text-ink-700">
              We focus on clear views, honest material grades and neat finishing for apartments,
              villas and high-rises - so families get practical protection without compromising the
              look of their home.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-brand-100 bg-white p-4 shadow-soft"
              >
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-cta-600">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{pillar.text}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="/about/" variant="secondary">
              Learn more
            </Button>
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
              Call {BUSINESS_CONFIG.phone.display}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

