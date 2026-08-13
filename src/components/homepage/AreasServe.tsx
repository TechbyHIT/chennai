"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { buildLocationPath } from "@/config/routes";
import type { Location } from "@/types/location";

export function AreasServe({
  locations,
  localityCount,
}: {
  locations: Location[];
  localityCount: number;
}) {
  const reduceMotion = useReducedMotion();
  const cities = locations.slice(0, 8);

  return (
    <section className="section-space bg-brand-900 text-white">
      <div className="container-page space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cta-500">
            <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
            Areas we serve
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Serving customers across Tamil Nadu
          </h2>
          <p className="text-base leading-7 text-white/75">
            Free site inspection and professional installation for homes and apartments in{" "}
            {locations.length} cities — with {localityCount.toLocaleString("en-IN")}+ locality pages
            as verified coverage expands. We do not claim a branch office in every town.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, index) => (
            <motion.article
              key={city.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.03, 0.2), duration: 0.4 }}
            >
              <h3 className="font-display text-xl font-bold text-white">{city.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/70">
                {city.introduction ||
                  `Invisible grills and safety nets for homes and apartments in ${city.name}.`}
              </p>
              <Link
                href={buildLocationPath(city.slug)}
                className="mt-4 inline-flex text-sm font-semibold text-cta-500 hover:text-cta-600"
              >
                Explore {city.name} →
              </Link>
            </motion.article>
          ))}
        </div>

        <Link
          href="/locations/"
          className="inline-flex rounded-full bg-cta-500 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-cta-600"
        >
          Service area directory →
        </Link>
      </div>
    </section>
  );
}
