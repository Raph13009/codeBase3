import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import {
  ArrowIcon,
  Reveal,
  SectionLabel,
} from "@/components/agentic-commerce/motion";

export function Pilot({ dict }: { dict: Dictionary }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const lineScale = reduceMotion ? 1 : progress;

  return (
    <section
      id="pilot"
      className="ac-grain scroll-mt-28 bg-ac-surface-low px-6 py-28 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="03" label={dict.nav.pilot} />
          </div>
          <h2 className="ac-text-balance mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-ac-on-surface md:text-6xl">
            {dict.pilot.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ac-muted">
            {dict.pilot.subtitle}
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
          {/* Track + animated progress (horizontal on desktop, vertical on mobile) */}
          <span
            className="absolute left-[11px] top-0 h-full w-px bg-black/10 md:left-0 md:top-[11px] md:h-px md:w-full"
            aria-hidden="true"
          />
          <motion.span
            className="absolute left-[11px] top-0 hidden h-px w-full origin-left bg-ac-primary md:top-[11px] md:left-0 md:block"
            style={{ scaleX: lineScale }}
            aria-hidden="true"
          />
          <motion.span
            className="absolute left-[11px] top-0 h-full w-px origin-top bg-ac-primary md:hidden"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />

          {dict.pilot.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 2}
              className="relative pl-12 md:pl-0 md:pt-14"
            >
              <span
                className="absolute left-0 top-0 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-ac-primary/40 bg-ac-surface-low"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-ac-primary" />
              </span>
              <div className="ac-mono text-ac-muted">
                {dict.nav.pilot} · {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ac-on-surface">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-ac-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-20 text-center">
          <a
            href="#assess"
            className="ac-btn bg-ac-on-surface py-2 pl-6 pr-2 text-sm font-semibold text-white hover:bg-ac-primary"
            onClick={() =>
              trackAgenticEvent("cta_primary", { location: "pilot" })
            }
          >
            {dict.hero.ctaPrimary}
            <span className="ac-btn-arrow flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
