import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { Reveal } from "@/components/agentic-commerce/Reveal";

export function Pilot({ dict }: { dict: Dictionary }) {
  const steps = dict.pilot.steps;

  return (
    <section
      id="pilot"
      className="mx-auto max-w-[1728px] scroll-mt-28 px-4 py-24 sm:px-10 md:py-32"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="ac-h2 text-ac-on-surface">{dict.pilot.title}</h2>
        <p className="mt-4 text-[17px] leading-relaxed text-ac-muted">
          {dict.pilot.subtitle}
        </p>
      </Reveal>

      <ol className="mx-auto mt-14 grid max-w-[1240px] gap-4 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <Reveal
              as="li"
              key={step.title}
              delay={index}
              className={`flex min-h-[260px] flex-col justify-between rounded-[32px] p-8 ${
                isLast
                  ? "bg-[#1b1b1b] text-[#faf9f5]"
                  : "border border-[#d9d7d0]/40 bg-white text-ac-on-surface"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  isLast ? "bg-white/10 text-[#faf9f5]" : "bg-ac-surface-low text-ac-on-surface"
                }`}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                <p
                  className={`mt-2 text-[15px] leading-relaxed ${
                    isLast ? "text-white/60" : "text-ac-muted"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>

      <div className="mt-12 text-center">
        <a
          href="#assess"
          className="ac-pill ac-pill-dark"
          onClick={() => trackAgenticEvent("cta_primary", { location: "pilot" })}
        >
          {dict.hero.ctaPrimary}
        </a>
      </div>
    </section>
  );
}
