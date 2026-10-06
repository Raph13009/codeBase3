import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";

/** Manifesto that darkens word by word on scroll, then the three "why now" points. */
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
    <section className="mx-auto max-w-[1728px] px-4 py-28 sm:px-10 md:py-44">
      <div
        ref={ref}
        className="relative mx-auto max-w-[1180px] text-center text-[clamp(30px,4vw,60px)] font-bold leading-[1.04] tracking-[-0.045em]"
      >
        <h2 className="inline font-bold tracking-[-0.045em]">
          {title.map((word, i) => (
            <Word key={`t${i}`} progress={scrollYProgress} index={i} total={total} to="#1b1b1b">
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
              to="#8c8880"
            >
              {word}
            </Word>
          ))}
        </p>
      </div>

      <div className="mx-auto mt-24 grid max-w-[1648px] gap-10 md:mt-36 md:grid-cols-3 md:gap-8">
        {dict.whyNow.items.map((item, index) => (
          <Reveal key={item.title} delay={index} className="border-t border-[#1b1b1b] pt-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[22px] font-bold tracking-[-0.03em] text-ac-on-surface">
                {item.title}
              </h3>
              <span className="ac-label ac-tabular text-ac-muted">0{index + 1}</span>
            </div>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ac-muted">
              {item.description}
            </p>
          </Reveal>
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
  to: string;
  children: string;
}) {
  const start = index / total;
  const color = useTransform(progress, [start, start + 1.5 / total], ["#dcdad3", to]);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.span style={{ color: reduceMotion ? to : color }}>{children}</motion.span>{" "}
    </>
  );
}
