import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { lerp, prefersReducedMotion } from "@/components/agentic-commerce/shared";

/** Words agents need to read; the strip speeds up and flips with the scroll. */
export function Marquee({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = dict.marquee.items;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;
    let x = 0;
    let velocity = 0;
    let direction = 1;
    let lastY = window.scrollY;
    let visible = false;
    let running = false;
    let raf = 0;

    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy) direction = dy > 0 ? 1 : -1;
      velocity = lerp(velocity, Math.min(Math.abs(dy), 80), 0.08);
      x -= (0.55 + velocity * 0.22) * direction;
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (visible) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !running) {
        running = true;
        lastY = window.scrollY;
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(section);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="marquee" aria-label={dict.marquee.label} ref={sectionRef}>
      <div className="mq-track" ref={trackRef}>
        {[0, 1].map((copy) =>
          items.map((item) => (
            <span
              className="mq-item"
              key={`${copy}-${item}`}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {item}
              <i />
            </span>
          )),
        )}
      </div>
    </section>
  );
}
