import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";

/** Market statement + "why now", merged into one compact section. */
export function MarketShift({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-[1728px] px-4 py-24 sm:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-2 lg:gap-[100px]">
        <Reveal>
          <h2 className="ac-h2 max-w-lg text-ac-on-surface">{dict.market.title}</h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ac-muted">
            {dict.market.p1}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <p className="ac-label mb-8 text-ac-muted">{dict.whyNow.title}</p>
          <div className="space-y-8 border-l-[3px] border-[var(--ac-line)] pl-8">
            {dict.whyNow.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-bold tracking-tight text-ac-on-surface">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ac-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
