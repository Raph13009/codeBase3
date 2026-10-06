import { useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";

export function FAQ({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-[1728px] scroll-mt-28 px-4 pb-24 pt-8 sm:px-10 md:pb-32"
    >
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <h2 className="ac-h2 text-ac-on-surface lg:sticky lg:top-32">{dict.faq.title}</h2>
        </Reveal>

        <Reveal delay={1} className="border-t border-[var(--ac-line)]">
          {dict.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className="border-b border-[var(--ac-line)]">
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-base font-bold tracking-tight text-ac-on-surface md:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-out ${
                      isOpen
                        ? "rotate-45 bg-[#1b1b1b] text-[#faf9f5]"
                        : "bg-ac-surface-low text-ac-on-surface group-hover:bg-ac-surface-container"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current" />
                  </span>
                </button>
                {/* Answers stay in the DOM for accessibility / crawlers */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className="ac-collapse"
                  data-open={isOpen}
                >
                  <div>
                    <p className="pb-6 pr-12 text-[15px] leading-relaxed text-ac-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
