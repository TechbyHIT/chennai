"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SafeImage } from "@/components/media/SafeImage";
import { InstantSearch } from "@/components/search/InstantSearch";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";

const TRUST = [
  "Free site inspection",
  "Measured, written quotes",
  "SS316 / SS304 discussed openly",
  "Serving customers across Tamil Nadu",
];

export type HomeHeroStats = {
  services: number;
  cities: number;
  localities: number;
};

export function HomeHero({
  heroSrc = "/images/homepage/glory-home-01.png",
  stats,
}: {
  heroSrc?: string;
  stats: HomeHeroStats;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[88svh] overflow-hidden sm:min-h-[92svh]">
      <SafeImage
        src={heroSrc}
        alt={`${BUSINESS_CONFIG.name} premium invisible grill installation in Tamil Nadu`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/80 to-brand-600/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-900/85 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:min-h-[92svh] sm:px-6 sm:pb-20 lg:px-8">
        <motion.div
          className="max-w-3xl space-y-6 text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-cta-500 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-900">
            {BUSINESS_CONFIG.name} · Tamil Nadu
          </p>
          <h1 className="text-hero font-display font-extrabold leading-[1.05] text-white">
            Premium Invisible Grills
            <span className="mt-2 block text-cta-500">Across Tamil Nadu</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
            Elegant safety solutions for balconies, windows, apartments, villas and modern
            homes — measured on site, quoted in writing, finished with care.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/#contact" size="lg">
              Get Free Quote
            </Button>
            <Button
              href={`tel:${BUSINESS_CONFIG.phone.raw}`}
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              external
            >
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
        </motion.div>

        <motion.div
          id="site-search"
          className="mt-8 max-w-xl scroll-mt-28"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          <InstantSearch />
        </motion.div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {TRUST.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:text-sm"
            >
              <span className="text-cta-500" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Installation systems", value: `${stats.services} services` },
            { label: "Cities covered", value: `${stats.cities} Tamil Nadu cities` },
            {
              label: "Local pages",
              value: `${stats.localities.toLocaleString("en-IN")}+ localities`,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">{card.label}</p>
              <p className="mt-2 font-display text-lg font-semibold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
