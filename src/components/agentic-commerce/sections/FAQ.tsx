import { useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";

export function FAQ({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <h2 className="text-3xl font-bold tracking-tight text-ac-on-surface sm:text-4xl">
          {dict.faq.title}
        </h2>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {dict.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-base font-semibold text-ac-on-surface md:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 text-ac-muted transition ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {/* Keep answers in the DOM for accessibility / crawlers */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  hidden={!isOpen}
                  className={isOpen ? "pb-5 pr-8" : "sr-only"}
                >
                  <p className="text-base leading-relaxed text-ac-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
