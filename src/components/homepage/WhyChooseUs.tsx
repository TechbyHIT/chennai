"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  {
    title: "Quality materials",
    body: "SS316 / SS304 cable grades and UV-stabilised netting named in the written estimate — not hidden behind vague labels.",
  },
  {
    title: "Experienced installation",
    body: "Measured fixing, consistent tensioning and careful drilling planned around the facade and railing conditions.",
  },
  {
    title: "Professional measurement",
    body: "Every recommendation starts with opening size, access and household safety needs — not guesswork.",
  },
  {
    title: "Clean finishing",
    body: "Neat edges, secure anchors and a practical handover so day-to-day use stays simple.",
  },
  {
    title: "Transparent pricing",
    body: "Itemised scope after site measurement. No invented discounts or surprise add-ons mid-install.",
  },
  {
    title: "Responsive scheduling",
    body: "We confirm Tamil Nadu coverage first, then book measurement and installation windows that fit your building.",
  },
  {
    title: "Right system for the job",
    body: "Invisible grills, safety nets, bird control and mosquito mesh are treated as distinct solutions.",
  },
  {
    title: "Customer support",
    body: "Clear care guidance after handover, with contact channels for follow-up questions on installed work.",
  },
];

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {ITEMS.map((item, index) => (
        <motion.article
          key={item.title}
          className="premium-card p-6"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04, duration: 0.4 }}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 font-display text-lg font-bold text-cta-500">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="font-display text-xl text-brand-900 sm:text-2xl">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-500">{item.body}</p>
        </motion.article>
      ))}
    </div>
  );
}
