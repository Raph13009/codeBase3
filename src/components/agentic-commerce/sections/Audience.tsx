import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Scrub } from "@/components/agentic-commerce/Scrub";
import { IMG } from "@/components/agentic-commerce/fx";

const THUMBS = [IMG.serum, IMG.earbuds, IMG.roller, IMG.silk, IMG.cherub, IMG.cherubRose];
const BASE_SPEED = 60; // px per second

/** Who it's for: oversized marquee that speeds up and flips direction with the scroll. */
export function Audience({ dict }: { dict: Dictionary }) {
  const items = dict.audience.items;
  const copyRef = useRef<HTMLUListElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);
  const reduceMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(-1);

  useEffect(() => {
    const copy = copyRef.current;
    if (!copy) return;
    const ro = new ResizeObserver(() => setCopyWidth(copy.offsetWidth));
    ro.observe(copy);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || copyWidth === 0) return;
    const factor = boost.get();
    if (factor > 0) direction.current = -1;
    else if (factor < 0) direction.current = 1;
    const moveBy = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(factor));
    // Wrap within one copy width so the loop is seamless
    let next = baseX.get() + moveBy;
    if (next <= -copyWidth) next += copyWidth;
    if (next > 0) next -= copyWidth;
    baseX.set(next);
  });

  return (
    <section id="audience" data-scene="cream" className="scroll-mt-24 overflow-hidden pb-12 md:pb-16">
      <Scrub className="mx-auto max-w-[1728px] px-4 sm:px-10">
        <h2 className="ac-label mx-auto max-w-[1648px] text-[var(--fg-muted)]">{dict.audience.title}</h2>
      </Scrub>

      <div className="mt-8 border-y border-[var(--line)] py-7 md:py-10">
        <motion.div className="flex w-max" style={{ x: baseX }}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              ref={copy === 0 ? copyRef : undefined}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {items.map((item, index) => (
                <li key={item} className="flex items-center">
                  <span className="whitespace-nowrap px-5 text-[clamp(36px,5.4vw,84px)] font-bold leading-none tracking-[-0.05em] text-[var(--fg)] md:px-8">
                    {item}
                  </span>
                  <img
                    src={THUMBS[index % THUMBS.length]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-[clamp(44px,5vw,78px)] w-[clamp(44px,5vw,78px)] shrink-0 rounded-full object-cover"
                  />
                </li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
