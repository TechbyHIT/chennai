"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { buildServicePath } from "@/config/routes";
import type { Service } from "@/types/service";

const FEATURED_SLUGS = [
  "invisible-grills",
  "balcony-safety-nets",
  "mosquito-nets",
  "bird-nets",
  "monkey-nets",
  "children-safety-nets",
];

export function FeaturedServices({ services }: { services: Service[] }) {
  const reduceMotion = useReducedMotion();
  const list = FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (service): service is Service => Boolean(service),
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((service, index) => (
        <motion.div
          key={service.id}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: Math.min(index * 0.04, 0.24), duration: 0.45 }}
        >
          <Link
            href={buildServicePath(service.slug)}
            className="premium-card gradient-border group block h-full overflow-hidden"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={service.heroImage || "/images/hero-balcony.jpg"}
                alt={`${service.name} installation`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="space-y-3 p-5">
              <h3 className="font-display text-2xl text-brand-900 group-hover:text-brand-500">
                {service.name}
              </h3>
              <p className="text-sm leading-7 text-ink-500">{service.summary}</p>
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-600">
                Read more →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
