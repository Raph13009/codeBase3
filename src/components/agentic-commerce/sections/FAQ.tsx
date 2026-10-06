import { useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal, SectionLabel } from "@/components/agentic-commerce/motion";

export function FAQ({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <Reveal className="md:sticky md:top-32 md:self-start">
          <SectionLabel index="07" label={dict.nav.faq} />
          <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-ac-on-surface md:text-5xl">
            {dict.faq.title}
          </h2>
        </Reveal>

        <Reveal className="border-t border-[var(--ac-hairline)]">
          {dict.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className="border-b border-[var(--ac-hairline)]">
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="ac-mono shrink-0 text-ac-muted/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base font-semibold transition-colors duration-200 md:text-lg ${
                        isOpen ? "text-ac-primary" : "text-ac-on-surface group-hover:text-ac-primary"
                      }`}
                    >
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-out ${
                      isOpen
                        ? "rotate-45 border-ac-primary bg-ac-primary text-white"
                        : "border-black/10 text-ac-on-surface"
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
                    <p className="pb-6 pl-[2.6rem] pr-12 text-base leading-relaxed text-ac-muted">
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
