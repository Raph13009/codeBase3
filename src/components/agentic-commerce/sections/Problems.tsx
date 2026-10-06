import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal, SectionLabel, useSpotlight } from "@/components/agentic-commerce/motion";

export function Problems({ dict }: { dict: Dictionary }) {
  const gridRef = useSpotlight<HTMLDivElement>();
  const total = String(dict.problems.items.length).padStart(2, "0");

  return (
    <section
      id="capabilities"
      className="scroll-mt-28 bg-[var(--ac-ink)] px-6 py-28 text-white md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <SectionLabel index="02" label={dict.nav.problems} dark />
            <h2 className="ac-text-balance mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.035em] md:text-6xl">
              {dict.problems.title}
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-white/55 md:justify-self-end">
            {dict.problems.subtitle}
          </p>
        </Reveal>

        <div
          ref={gridRef}
          className="ac-spotlight mt-16 grid overflow-hidden rounded-[1.75rem] border border-[var(--ac-hairline-dark)] sm:grid-cols-2"
        >
          {dict.problems.items.map((item, index) => (
            <Reveal
              as="article"
              key={item.title}
              delay={index}
              className={`group relative flex min-h-[260px] flex-col justify-between p-8 md:min-h-[300px] md:p-10 ${
                index % 2 === 0 ? "sm:border-r" : ""
              } ${index < 2 ? "border-b" : index === 2 ? "border-b sm:border-b-0" : ""} border-[var(--ac-hairline-dark)]`}
            >
              <div className="flex items-start justify-between">
                <span className="ac-serif text-6xl leading-none text-white/90 md:text-7xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ac-mono text-white/30">
                  {String(index + 1).padStart(2, "0")} / {total}
                </span>
              </div>
              <div>
                <span
                  className="mb-5 block h-px w-10 origin-left bg-ac-primary transition-transform duration-500 ease-out group-hover:scale-x-[2.5]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
