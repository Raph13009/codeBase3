import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";

export function WhyNow({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ac-surface px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ac-on-surface sm:text-4xl">
          {dict.whyNow.title}
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {dict.whyNow.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.25rem] border border-black/5 bg-ac-surface-container/60 p-8"
            >
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-ac-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-ac-on-surface">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ac-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
