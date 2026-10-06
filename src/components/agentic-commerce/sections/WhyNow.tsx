import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal, SectionLabel } from "@/components/agentic-commerce/motion";

export function WhyNow({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ac-surface px-6 pb-28 md:px-8 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="05" label={dict.labels.whyNow} />
          <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-ac-on-surface md:text-6xl">
            {dict.whyNow.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid border-t border-[var(--ac-hairline)] md:grid-cols-3">
          {dict.whyNow.items.map((item, index) => (
            <Reveal
              as="article"
              key={item.title}
              delay={index * 2}
              className={`border-b border-[var(--ac-hairline)] py-10 md:border-b-0 md:py-12 ${
                index > 0 ? "md:border-l md:pl-10" : ""
              } ${index < 2 ? "md:pr-10" : ""}`}
            >
              <span className="ac-serif text-5xl leading-none text-ac-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight text-ac-on-surface">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ac-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
