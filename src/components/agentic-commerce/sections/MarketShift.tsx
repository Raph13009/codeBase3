import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Scrub } from "@/components/agentic-commerce/Scrub";

/** Manifesto that lights up word by word on scroll, then the three "why now" points. */
export function MarketShift({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  const title = dict.market.title.split(" ");
  const body = dict.market.p1.split(" ");
  const total = title.length + body.length;

  return (
    <section data-scene="ink" className="px-4 pb-28 pt-12 sm:px-10 md:pb-40 md:pt-20">
      <div
        ref={ref}
        className="relative mx-auto max-w-[1180px] text-center text-[clamp(30px,4vw,60px)] font-bold leading-[1.04] tracking-[-0.045em] text-[var(--fg)]"
      >
        <h2 className="inline font-bold tracking-[-0.045em]">
          {title.map((word, i) => (
            <Word key={`t${i}`} progress={scrollYProgress} index={i} total={total} to={1}>
              {word}
            </Word>
          ))}
        </h2>{" "}
        <p className="inline">
          {body.map((word, i) => (
            <Word
              key={`b${i}`}
              progress={scrollYProgress}
              index={title.length + i}
              total={total}
              to={0.5}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>

      <div className="mx-auto mt-24 grid max-w-[1648px] gap-10 md:mt-36 md:grid-cols-3 md:gap-8">
        {dict.whyNow.items.map((item, index) => (
          <Scrub key={item.title} distance={40 + index * 24} className="border-t border-[var(--fg)] pt-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[var(--fg)]">
                {item.title}
              </h3>
              <span className="ac-label ac-tabular text-[var(--fg-muted)]">0{index + 1}</span>
            </div>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--fg-muted)]">
              {item.description}
            </p>
          </Scrub>
        ))}
      </div>
    </section>
  );
}

function Word({
  progress,
  index,
  total,
  to,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  /** Final opacity of the word. */
  to: number;
  children: string;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 1.5 / total], [0.12, to]);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.span style={{ opacity: reduceMotion ? to : opacity }}>{children}</motion.span>{" "}
    </>
  );
}
