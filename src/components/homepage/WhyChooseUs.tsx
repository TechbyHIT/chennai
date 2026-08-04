"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  {
    title: "Measurement-first quotes",
    body: "Every recommendation starts with opening size, access and household safety needs — not guesswork.",
  },
  {
    title: "Honest TN coverage",
    body: "We publish cities and areas we can genuinely serve. No invented branch offices.",
  },
  {
    title: "Right system for the job",
    body: "Invisible grills, safety nets, mosquito nets and bird control are treated as distinct solutions.",
  },
  {
    title: "Clean finishing focus",
    body: "Installation prioritises secure fixing, neat edges and practical day-to-day use.",
  },
];

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {ITEMS.map((item, index) => (
        <motion.article
          key={item.title}
          className="premium-card p-6"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 font-display text-lg font-bold text-cta-500">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="font-display text-2xl text-brand-900">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-500">{item.body}</p>
        </motion.article>
      ))}
    </div>
  );
}
