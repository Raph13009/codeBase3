import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";

const accents = [
  "from-sky-200/50 to-violet-100/40",
  "from-orange-100/60 to-rose-100/40",
  "from-lime-100/70 to-emerald-50/50",
  "from-cyan-100/50 to-sky-50/60",
];

export function Problems({ dict }: { dict: Dictionary }) {
  return (
    <section id="capabilities" className="scroll-mt-28 px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ac-on-surface sm:text-4xl">
            {dict.problems.title}
          </h2>
          <p className="mt-4 text-lg text-ac-muted">{dict.problems.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {dict.problems.items.map((item, index) => (
            <article
              key={item.title}
              className={`ac-glass overflow-hidden rounded-[1.25rem] bg-gradient-to-br ${accents[index]} p-8`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-ac-muted">
                {String(index + 1).padStart(2, "0")} / 04
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
