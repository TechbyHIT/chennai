"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { title: "Contact", body: "Share your city, area and openings via call, WhatsApp or form." },
  { title: "Site inspection", body: "We measure openings and discuss safety or exclusion needs." },
  { title: "Free quote", body: "Receive a measurement-based quotation with clear scope." },
  { title: "Installation", body: "Secure fixing and neat finishing for the approved openings." },
  { title: "Quality check", body: "Final review, handover guidance and maintenance tips." },
];

export function ProcessTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <ol className="relative grid gap-6 md:grid-cols-5">
      <div
        className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-brand-100 md:block"
        aria-hidden="true"
      />
      {STEPS.map((step, index) => (
        <motion.li
          key={step.title}
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
        >
          <div className="relative z-10 mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 font-display text-lg font-bold text-cta-500 shadow-soft">
            {index + 1}
          </div>
          <h3 className="font-display text-xl text-brand-900">{step.title}</h3>
          <p className="mt-2 text-sm leading-7 text-ink-500">{step.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
