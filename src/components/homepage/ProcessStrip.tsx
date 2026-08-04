"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    title: "Share openings",
    body: "Tell us your city or area in Tamil Nadu and the balconies, windows or edges to assess.",
  },
  {
    title: "Site measurement",
    body: "We measure openings, discuss safety needs and recommend a practical system.",
  },
  {
    title: "Install & handover",
    body: "Installation focuses on secure fixing, neat finishing and clear usage guidance.",
  },
];

export function ProcessStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {STEPS.map((step, index) => (
        <motion.li
          key={step.title}
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
        >
          <span className="font-display text-5xl text-brand-200">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-display text-2xl text-brand-900">{step.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-700">{step.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
