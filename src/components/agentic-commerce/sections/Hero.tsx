import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type View = "human" | "agent";

const AUTOPLAY_MS = 3800;

export function Hero({ locale, dict }: Props) {
  const { hero } = dict;

  return (
    <section className="mx-auto flex max-w-[1728px] flex-col items-center px-4 pb-24 pt-[150px] text-center sm:px-10 md:pb-32 md:pt-[210px]">
      <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row">
        <span className="ac-label max-w-[280px] leading-relaxed text-ac-muted sm:max-w-none">
          {hero.eyebrow}
        </span>
        <Link
          to={dict.nav.switchHref}
          hrefLang={locale === "en" ? "fr" : "en"}
          className="ac-label rounded-full border border-[var(--ac-line)] px-3 py-1.5 text-ac-on-surface transition-colors duration-200 hover:border-[#1b1b1b]"
          onClick={() => trackAgenticEvent("nav_lang", { locale })}
        >
          {dict.nav.switchLabel}
        </Link>
      </div>

      <h1 className="ac-display max-w-4xl text-ac-on-surface">{hero.h1}</h1>

      <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ac-muted md:text-lg">
        {hero.subtitle}
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href="#assess"
          className="ac-pill ac-pill-dark"
          onClick={() => trackAgenticEvent("cta_primary", { location: "hero" })}
        >
          {hero.ctaPrimary}
        </a>
        <a
          href="#pilot"
          className="ac-pill ac-pill-light"
          onClick={() => trackAgenticEvent("cta_secondary", { location: "hero" })}
        >
          {hero.ctaSecondary}
        </a>
      </div>

      <AgentDemo dict={dict} />
    </section>
  );
}

function AgentDemo({ dict }: { dict: Dictionary }) {
  const { demo } = dict;
  const [view, setView] = useState<View>("human");
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setView((current) => (current === "human" ? "agent" : "human"));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay]);

  const select = (next: View) => {
    setAutoplay(false);
    setView(next);
    trackAgenticEvent("demo_toggle", { view: next });
  };

  return (
    <div className="mt-20 w-full max-w-[1240px] rounded-[32px] bg-ac-surface-low px-4 py-8 sm:px-10 md:mt-24 md:rounded-[40px] md:py-12">
      <div
        role="tablist"
        aria-label={`${demo.human} / ${demo.agent}`}
        className="relative mx-auto grid w-full max-w-[340px] grid-cols-2 rounded-full bg-ac-surface-container p-1"
      >
        <span
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#1b1b1b] shadow-md transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: view === "agent" ? "translateX(100%)" : "none" }}
          aria-hidden="true"
        />
        {(["human", "agent"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={view === key}
            onClick={() => select(key)}
            className={`relative z-10 h-10 rounded-full text-[13px] font-semibold transition-colors duration-300 ${
              view === key ? "text-[#faf9f5]" : "text-ac-muted hover:text-ac-on-surface"
            }`}
          >
            {key === "human" ? demo.human : demo.agent}
          </button>
        ))}
      </div>

      <div className="mt-8 grid place-items-center md:mt-10">
        <div
          className="ac-swap col-start-1 row-start-1 w-full max-w-[460px]"
          data-active={view === "human"}
          aria-hidden={view !== "human"}
        >
          <HumanCard dict={dict} />
        </div>
        <div
          className="ac-swap col-start-1 row-start-1 w-full max-w-[460px]"
          data-active={view === "agent"}
          aria-hidden={view !== "agent"}
        >
          <AgentCard dict={dict} />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 md:mt-10">
        <p className="flex items-center gap-2 text-sm font-semibold text-ac-on-surface">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              view === "agent"
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                : "bg-ac-muted"
            }`}
            aria-hidden="true"
          />
          {view === "agent" ? demo.agentStatus : demo.humanStatus}
        </p>
        <p className="max-w-md text-[15px] leading-relaxed text-ac-muted">
          {dict.market.p2}
        </p>
      </div>
    </div>
  );
}

function HumanCard({ dict }: { dict: Dictionary }) {
  const { demo } = dict;
  return (
    <div className="flex items-center gap-5 rounded-3xl border border-[#d9d7d0]/40 bg-[var(--ac-card)] p-4 text-left shadow-xl sm:gap-6 sm:p-5">
      <div className="flex aspect-square w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f3ef] to-[#e9e8e4] sm:w-36">
        <span
          className="material-symbols-outlined text-ac-on-surface/80"
          style={{ fontSize: 60 }}
          aria-hidden="true"
        >
          watch
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold tracking-tight text-ac-on-surface sm:text-lg">
          {demo.product}
        </p>
        <p className="mt-1 text-[15px] text-ac-on-surface">{demo.price}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ac-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
          {demo.stock}
        </p>
        <span className="mt-4 inline-flex h-9 items-center rounded-full bg-[#1b1b1b] px-4 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#faf9f5]">
          {demo.addToCart}
        </span>
      </div>
    </div>
  );
}

function AgentCard({ dict }: { dict: Dictionary }) {
  const { demo } = dict;
  return (
    <div className="rounded-3xl border border-[#d9d7d0]/40 bg-[var(--ac-card)] p-5 text-left shadow-xl">
      <div className="flex items-center justify-between gap-3 border-b border-[#d9d7d0]/50 pb-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1b1b1b]">
            <span
              className="material-symbols-outlined text-[#faf9f5]"
                style={{ fontSize: 16 }}
              aria-hidden="true"
            >
              auto_awesome
            </span>
          </span>
          <span className="truncate text-sm font-bold tracking-tight text-ac-on-surface">
            {demo.product}
          </span>
        </div>
        <span className="ac-label shrink-0 text-ac-muted">{demo.agent}</span>
      </div>
      <dl className="mt-2">
        {demo.fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between gap-4 border-b border-[#d9d7d0]/30 py-2.5 last:border-b-0"
          >
            <dt className="text-[13px] text-ac-muted">{field.label}</dt>
            <dd className="flex items-center gap-2 text-right text-[13px] font-semibold text-ac-on-surface">
              {field.value}
              <span
                className="material-symbols-outlined text-green-600"
                style={{ fontSize: 16 }}
                aria-hidden="true"
              >
                check_circle
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
