import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";

export function Pilot({ dict }: { dict: Dictionary }) {
  return (
    <section id="pilot" className="scroll-mt-28 bg-ac-surface-low px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ac-on-surface sm:text-4xl">
            {dict.pilot.title}
          </h2>
          <p className="mt-4 text-lg text-ac-muted">{dict.pilot.subtitle}</p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {dict.pilot.steps.map((step, index) => (
            <li key={step.title} className="ac-glass rounded-[1.25rem] p-8">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ac-secondary-container text-sm font-bold text-ac-on-secondary-container">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-ac-on-surface">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ac-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a
            href="#assess"
            className="inline-flex rounded-full bg-ac-primary px-7 py-3.5 text-sm font-bold text-ac-on-primary transition hover:brightness-105"
            onClick={() =>
              trackAgenticEvent("cta_primary", { location: "pilot" })
            }
          >
            {dict.hero.ctaPrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
