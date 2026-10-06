import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import { IMG, Icon, Magnetic, useParallax } from "@/components/agentic-commerce/fx";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: Props) {
  const { hero } = dict;
  const ref = useParallax<HTMLElement>();
  const [line1, ...rest] = agenticSiteConfig.shortName.split(" ");

  return (
    <section
      ref={ref}
      data-scene="cream"
      className="relative overflow-hidden pb-20 lg:h-[max(900px,100vh)] lg:pb-0"
    >
      <Collage dict={dict} />

      <div className="relative z-10 mx-auto flex max-w-[1728px] flex-col items-center px-4 pt-[128px] text-center sm:px-10 lg:h-full lg:justify-center lg:pt-10">
        <div className="ac-rise mb-7 flex flex-col items-center gap-3 sm:flex-row" style={{ "--i": 0 } as CSSProperties}>
          <span className="ac-label max-w-[280px] text-[var(--fg-muted)] sm:max-w-none">
            {hero.eyebrow}
          </span>
          <Link
            to={dict.nav.switchHref}
            hrefLang={locale === "en" ? "fr" : "en"}
            className="ac-label rounded-full border border-[var(--line)] px-3 py-1.5 text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)]"
            onClick={() => trackAgenticEvent("nav_lang", { locale })}
          >
            {dict.nav.switchLabel}
          </Link>
        </div>

        <p className="ac-display text-[var(--fg)]" aria-hidden="true">
          <span className="ac-line-mask">
            <span style={{ "--i": 1 } as CSSProperties}>{line1}</span>
          </span>
          <span className="ac-line-mask">
            <span style={{ "--i": 2 } as CSSProperties}>{rest.join(" ")}</span>
          </span>
        </p>

        <h1
          className="ac-rise mt-8 max-w-[560px] text-balance text-[clamp(20px,2vw,27px)] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--fg)]"
          style={{ "--i": 4 } as CSSProperties}
        >
          {hero.h1}
        </h1>
        <p
          className="ac-rise mt-4 max-w-[440px] text-[15px] leading-relaxed text-[var(--fg-muted)]"
          style={{ "--i": 5 } as CSSProperties}
        >
          {hero.subtitle}
        </p>

        <div
          className="ac-rise mt-9 flex flex-col items-center gap-3 sm:flex-row"
          style={{ "--i": 6 } as CSSProperties}
        >
          <Magnetic>
            <a
              href="#assess"
              className="ac-pill ac-pill-invert"
              onClick={() => trackAgenticEvent("cta_primary", { location: "hero" })}
            >
              {hero.ctaPrimary}
            </a>
          </Magnetic>
          <a
            href="#pilot"
            className="ac-pill ac-pill-light"
            onClick={() => trackAgenticEvent("cta_secondary", { location: "hero" })}
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      <MobileCollage dict={dict} />
    </section>
  );
}

/* ---------- Desktop collage (lg+) ---------- */

function Float({
  depth,
  index,
  className,
  children,
}: {
  depth: number;
  index: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={`absolute ${className}`} data-depth={depth}>
      <div className="ac-float-in" style={{ "--i": index } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function Photo({
  src,
  ratio,
  children,
  eager = false,
}: {
  src: string;
  ratio: string;
  children?: ReactNode;
  eager?: boolean;
}) {
  return (
    <div className="ac-glass-frame relative overflow-hidden rounded-[32px]">
      <img
        src={src}
        alt=""
        className={`w-full object-cover ${ratio}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {children}
    </div>
  );
}

function Collage({ dict }: { dict: Dictionary }) {
  const c = dict.hero.chips;

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <Float depth={-20} index={0} className="left-[5%] top-[14%] w-[clamp(190px,16vw,260px)]">
        <Photo src={IMG.serum} ratio="aspect-[4/5]" eager>
          <div className="ac-glass absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl px-4 py-3">
            <span className="text-[11px] font-bold text-ac-on-surface">{c.productName}</span>
            <span className="ac-tabular text-[11px] font-bold text-ac-on-surface">{c.productPrice}</span>
          </div>
        </Photo>
      </Float>

      <Float depth={28} index={1} className="right-[5%] top-[12%] w-[clamp(220px,20vw,320px)]">
        <Photo src={IMG.earbuds} ratio="aspect-[4/3]" eager>
          <div className="ac-glass absolute left-4 top-4 flex items-center gap-2 rounded-full px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="ac-label text-[10px] text-ac-on-surface">{c.stock}</span>
          </div>
        </Photo>
      </Float>

      <Float depth={14} index={2} className="left-[2.5%] top-[57%] hidden w-[248px] xl:block">
        <div className="ac-glass rounded-[28px] p-5 text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b1b1b] text-white">
              <Icon name="auto_awesome" size={18} />
            </span>
            <span className="flex flex-col">
              <span className="text-[11px] font-bold text-ac-on-surface">{c.agentName}</span>
              <span className="text-[12px] leading-tight text-ac-on-surface/70">{c.agentAction}</span>
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
            <div className="ac-bar h-full rounded-full bg-[#1b1b1b]" />
          </div>
        </div>
      </Float>

      <Float depth={-24} index={3} className="right-[3%] top-[52%] hidden w-[244px] xl:block">
        <div className="ac-glass rounded-[28px] p-5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ac-on-surface">{c.paymentLabel}</span>
            <span className="relative h-6 w-10 rounded-full bg-[#1b1b1b] shadow-inner">
              <span className="ac-knob absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-ac-on-surface/80">
            <Icon name="verified_user" size={18} />
            <span className="text-[12px]">{c.paymentDetail}</span>
          </div>
        </div>
      </Float>

      <Float depth={32} index={4} className="left-[8%] top-[76%] w-[clamp(200px,18vw,310px)]">
        <Photo src={IMG.roller} ratio="aspect-[3/2]" />
      </Float>

      <Float depth={-16} index={5} className="right-[9%] top-[77%] w-[clamp(190px,16vw,270px)]">
        <Photo src={IMG.silk} ratio="aspect-[4/3]">
          <div className="ac-glass absolute bottom-3 left-3 flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1b1b1b] text-white">
              <Icon name="check" size={14} />
            </span>
            <span className="text-[11px] font-bold text-ac-on-surface">{c.order}</span>
          </div>
        </Photo>
      </Float>
    </div>
  );
}

/* ---------- Mobile / tablet collage ---------- */

function MobileCollage({ dict }: { dict: Dictionary }) {
  const c = dict.hero.chips;

  return (
    <div className="relative mx-auto mt-16 h-[300px] w-full max-w-[460px] lg:hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-6 w-[46%] -translate-x-[105%] -rotate-[7deg]">
        <div className="ac-float-in" style={{ "--i": 3 } as CSSProperties}>
          <Photo src={IMG.serum} ratio="aspect-[4/5]" />
        </div>
      </div>
      <div className="absolute left-1/2 top-0 z-10 w-[48%] -translate-x-1/2">
        <div className="ac-float-in" style={{ "--i": 4 } as CSSProperties}>
          <Photo src={IMG.earbuds} ratio="aspect-[4/5]">
            <div className="ac-glass absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-full px-3 py-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="truncate text-[10px] font-bold text-ac-on-surface">{c.stock}</span>
            </div>
          </Photo>
        </div>
      </div>
      <div className="absolute left-1/2 top-6 w-[46%] translate-x-[5%] rotate-[7deg]">
        <div className="ac-float-in" style={{ "--i": 5 } as CSSProperties}>
          <Photo src={IMG.roller} ratio="aspect-[4/5]" />
        </div>
      </div>
    </div>
  );
}
