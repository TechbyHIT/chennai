"use client";

import type { FAQItem } from "@/types/content";
import { useState } from "react";

export function FaqAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="seo-faq">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className={`seo-faq__item${open ? " is-open" : ""}`}>
            <button
              type="button"
              className="seo-faq__q"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{item.question}</span>
              <span className="seo-faq__icon" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? <div className="seo-faq__a">{item.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
