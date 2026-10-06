import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";

export function MarketShift({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ac-surface px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="ac-text-balance text-3xl font-bold tracking-tight text-ac-on-surface sm:text-4xl md:text-5xl md:leading-[1.15]">
          {dict.market.title}
        </h2>
        <p className="mt-8 text-pretty text-lg leading-relaxed text-ac-muted md:text-xl">
          {dict.market.p1}
        </p>
        <p className="mt-6 text-pretty text-lg font-medium leading-relaxed text-ac-on-surface md:text-xl">
          {dict.market.p2}
        </p>
      </div>
    </section>
  );
}
