import { useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Scrub } from "@/components/agentic-commerce/Scrub";

export function FAQ({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-scene="cream"
      className="mx-auto max-w-[1728px] scroll-mt-28 px-4 py-28 sm:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1648px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Scrub>
          <h2 className="ac-h2 text-[var(--fg)]">{dict.faq.title}</h2>
        </Scrub>

        <Scrub distance={80} className="border-t border-[var(--fg)]">
          {dict.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-base font-bold tracking-tight text-[var(--fg)] md:text-lg">
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
                    <p className="pb-6 pr-12 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Scrub>
      </div>
    </section>
  );
}
