import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-scrubbed entrance: opacity and offset follow the scroll position
 * (no timed fade), so blocks arrive with the page instead of "popping" in.
 */
export function Scrub({
  children,
  className,
  distance = 56,
  start = 96,
  end = 62,
}: {
  children: ReactNode;
  className?: string;
  /** Initial vertical offset in px. */
  distance?: number;
  /** Viewport % (from top) where the element's top starts / finishes its entrance. */
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}%`, `start ${end}%`],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [distance, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { opacity, y }}
    >
      {children}
    </motion.div>
  );
}
