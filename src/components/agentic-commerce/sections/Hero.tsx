import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { ArrowIcon } from "@/components/agentic-commerce/motion";

type Props = {
  dict: Dictionary;
};

const ACCENT_WORDS = 2;

export function Hero({ dict }: Props) {
  const { hero } = dict;
  const words = hero.h1.split(" ");
  const accentStart = words.length - ACCENT_WORDS;

  return (
    <section className="ac-grain relative overflow-hidden px-6 pb-20 pt-32 md:px-8 md:pb-28 md:pt-44">
      <div className="ac-hero-gradient absolute inset-0 -z-20" aria-hidden="true" />
      <div className="ac-grid-bg absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="ac-animate-rise ac-mono mb-6 hidden text-ac-muted sm:block">
          {hero.brand}
        </p>
        <div className="ac-animate-rise ac-glass mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2">
          <span
            className="ac-pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-ac-primary text-ac-primary"
            aria-hidden="true"
          />
          <span className="text-[13px] font-medium text-ac-on-surface sm:text-sm">
            {hero.eyebrow}
          </span>
        </div>

        <h1 className="ac-text-balance text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-ac-on-surface sm:text-6xl md:text-[84px] md:leading-[0.98]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span
                className={`ac-word ${
                  i >= accentStart
                    ? "ac-serif pr-[0.04em] text-[1.12em] leading-none text-ac-primary"
                    : ""
                }`}
                style={{ "--i": i } as CSSProperties}
              >
                {word}
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <p className="ac-animate-rise-delay mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ac-muted md:text-xl">
          {hero.subtitle}
        </p>

        <div className="ac-animate-rise-delay-2 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#assess"
            className="ac-btn bg-ac-on-surface py-2 pl-6 pr-2 text-sm font-semibold text-white hover:bg-ac-primary"
            onClick={() =>
              trackAgenticEvent("cta_primary", { location: "hero" })
            }
          >
            {hero.ctaPrimary}
            <span className="ac-btn-arrow flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <ArrowIcon />
            </span>
          </a>
          <a
            href="#pilot"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ac-on-surface"
            onClick={() =>
              trackAgenticEvent("cta_secondary", { location: "hero" })
            }
          >
            <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
              {hero.ctaSecondary}
            </span>
            <span className="text-ac-primary" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>

        <p className="ac-mono mt-8 text-ac-muted/80">{hero.reassurance}</p>

        <div className="ac-animate-rise-delay-2 mt-14 w-full max-w-3xl md:mt-16">
          <FlowConsole dict={dict} />
        </div>
      </div>
    </section>
  );
}

function FlowConsole({ dict }: Props) {
  const { flow } = dict.hero;

  return (
    <div className="rounded-[1.75rem] bg-[var(--ac-ink)] p-2 text-left shadow-[0_30px_80px_-30px_rgba(11,11,12,0.5)]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="ac-mono flex items-center gap-2.5 text-white/60">
          <span
            className="ac-pulse-dot h-1.5 w-1.5 rounded-full bg-ac-primary text-ac-primary"
            aria-hidden="true"
          />
          {dict.labels.flow}
        </div>
        <div className="ac-mono hidden text-white/30 sm:block">UCP · ACP</div>
      </div>

      <div className="grid items-center gap-0 rounded-[1.35rem] bg-[var(--ac-ink-soft)] p-4 sm:grid-cols-[1fr_64px_1.1fr_64px_1fr] sm:p-5">
        <FlowNode index="01" label={flow.assistants} />
        <Rail />
        <FlowNode index="02" label={flow.gateway} highlight />
        <Rail />
        <FlowNode index="03" label={flow.systems} />
      </div>
    </div>
  );
}

function FlowNode({
  index,
  label,
  highlight = false,
}: {
  index: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-4 ${
        highlight
          ? "bg-ac-primary text-white shadow-[0_0_40px_-8px_rgba(255,94,58,0.6)]"
          : "border border-white/10 text-white"
      }`}
    >
      <div className={`ac-mono ${highlight ? "text-white/70" : "text-white/40"}`}>
        {index}
      </div>
      <div className="mt-2 text-sm font-semibold leading-snug">{label}</div>
    </div>
  );
}

function Rail() {
  return (
    <>
      <div
        className="ac-rail ac-rail-v mx-auto h-10 w-px sm:hidden"
        style={{ "--len": "40px" } as CSSProperties}
        aria-hidden="true"
      >
        <span className="ac-packet" />
        <span className="ac-packet" style={{ "--delay": "1.2s" } as CSSProperties} />
      </div>
      <div
        className="ac-rail mx-2 hidden h-px sm:block"
        style={{ "--len": "48px" } as CSSProperties}
        aria-hidden="true"
      >
        <span className="ac-packet" />
        <span className="ac-packet" style={{ "--delay": "1.2s" } as CSSProperties} />
      </div>
    </>
  );
}
