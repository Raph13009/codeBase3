import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";

type Props = {
  dict: Dictionary;
};

export function Hero({ dict }: Props) {
  const { hero } = dict;

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
      <div className="ac-hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="ac-animate-rise mb-5 text-sm font-bold uppercase tracking-[0.14em] text-ac-primary">
          {hero.brand}
        </p>
        <div className="ac-animate-rise ac-glass mb-8 inline-flex items-center rounded-full px-4 py-2">
          <span className="text-sm font-medium text-ac-on-surface">
            {hero.eyebrow}
          </span>
        </div>

        <h1 className="ac-animate-rise-delay ac-text-balance text-4xl font-extrabold tracking-[-0.04em] text-ac-on-surface sm:text-5xl md:text-[64px] md:leading-[1.08]">
          {hero.h1}
        </h1>

        <p className="ac-animate-rise-delay mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ac-muted md:text-xl">
          {hero.subtitle}
        </p>

        <div className="ac-animate-rise-delay-2 mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#assess"
            className="inline-flex items-center justify-center rounded-full bg-ac-primary px-7 py-3.5 text-sm font-bold text-ac-on-primary shadow-sm transition hover:brightness-105 active:scale-[0.98]"
            onClick={() =>
              trackAgenticEvent("cta_primary", { location: "hero" })
            }
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#pilot"
            className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/45 px-7 py-3.5 text-sm font-semibold text-ac-on-surface backdrop-blur-md transition hover:bg-white/70 active:scale-[0.98]"
            onClick={() =>
              trackAgenticEvent("cta_secondary", { location: "hero" })
            }
          >
            {hero.ctaSecondary}
          </a>
        </div>

        <p className="mt-5 text-sm text-ac-muted">{hero.reassurance}</p>

        <div className="ac-animate-rise-delay-2 mt-14 w-full max-w-3xl">
          <div className="ac-glass grid gap-3 rounded-3xl p-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-2 sm:p-5">
            <FlowNode label={hero.flow.assistants} />
            <Arrow />
            <FlowNode label={hero.flow.gateway} highlight />
            <Arrow />
            <FlowNode label={hero.flow.systems} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({
  label,
  highlight = false,
}: {
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-4 text-center text-sm font-semibold leading-snug ${
        highlight
          ? "bg-ac-primary text-ac-on-primary shadow-sm"
          : "bg-white/55 text-ac-on-surface"
      }`}
    >
      {label}
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden justify-center text-ac-muted sm:flex" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 10h12M12 6l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
