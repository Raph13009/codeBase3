import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Accent, Reveal, SectionLabel } from "@/components/agentic-commerce/motion";

export function MarketShift({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const p1 = dict.market.p1.split(" ");
  const p2 = dict.market.p2.split(" ");
  const total = p1.length + p2.length;

  return (
    <section className="bg-ac-surface px-6 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.5fr] md:gap-20">
        <Reveal className="md:sticky md:top-32 md:self-start">
          <SectionLabel index="01" label={dict.labels.market} />
          <h2 className="ac-text-balance mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-ac-on-surface md:text-5xl">
            <Accent text={dict.market.title} />
          </h2>
        </Reveal>

        <p
          ref={ref}
          className="relative text-pretty text-2xl font-medium leading-[1.4] tracking-[-0.015em] md:text-[2rem] md:leading-[1.35]"
        >
          {p1.map((word, i) => (
            <Word key={`a${i}`} progress={scrollYProgress} index={i} total={total}>
              {word}
            </Word>
          ))}
          <span className="block h-6 md:h-8" aria-hidden="true" />
          {p2.map((word, i) => (
            <Word
              key={`b${i}`}
              progress={scrollYProgress}
              index={p1.length + i}
              total={total}
              strong
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  progress,
  index,
  total,
  strong = false,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  strong?: boolean;
  children: string;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.span
        style={{ opacity: reduceMotion ? 1 : opacity }}
        className={strong ? "text-ac-on-surface" : "text-ac-on-surface/85"}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
