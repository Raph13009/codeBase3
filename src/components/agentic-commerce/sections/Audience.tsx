import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal, SectionLabel } from "@/components/agentic-commerce/motion";

export function Audience({ dict }: { dict: Dictionary }) {
  const items = dict.audience.items;

  return (
    <section id="audience" className="scroll-mt-28 overflow-hidden py-28 md:py-36">
      <Reveal className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionLabel index="04" label={dict.nav.audience} />
        <h2 className="ac-text-balance mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-ac-on-surface md:text-6xl">
          {dict.audience.title}
        </h2>
      </Reveal>

      <div className="ac-marquee mt-16 border-y border-[var(--ac-hairline)] py-8 md:py-10">
        <div className="ac-marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="ac-serif flex items-center whitespace-nowrap text-4xl text-ac-on-surface md:text-6xl"
                >
                  <span className="px-8 md:px-12">{item}</span>
                  <span
                    className="h-2 w-2 rounded-full bg-ac-primary"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
