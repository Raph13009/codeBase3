import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import {
  ASSETS,
  Icon,
  clamp,
  prefersReducedMotion,
} from "@/components/agentic-commerce/shared";
import { WhyDeck } from "@/components/agentic-commerce/sections/WhyDeck";

/** Wraps every word of a copy string so it can light up on scroll. */
function words(text: string) {
  return text
    .split(/(\s+)/)
    .filter(Boolean)
    .map((part, i) =>
      /^\s+$/.test(part) ? (
        part
      ) : (
        <span className="sw" key={i}>
          {part}
        </span>
      ),
    );
}

/** "The shift": manifesto lit word by word with the scroll, then the "why now" deck. */
export function Manifesto({ dict }: { dict: Dictionary }) {
  const m = dict.manifesto;
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".sw"));
    if (prefersReducedMotion()) {
      spans.forEach((s) => s.classList.add("on"));
      return;
    }
    let lit = -1;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.3));
      const n = Math.round(p * spans.length);
      if (n === lit) return;
      lit = n;
      spans.forEach((s, i) => s.classList.toggle("on", i < n));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [m]);

  return (
    <section className="shift" id="basculement">
      <div className="wrap">
        <p className="eyebrow">{m.eyebrow}</p>
        <p className="shift-text" ref={textRef}>
          {words(m.before)}{" "}
          <span className="ip">
            <img src={ASSETS.headphonesSand} alt="" />
          </span>{" "}
          {words(m.middle)}{" "}
          <span className="ia">
            <Icon name="spark" />
            {m.agents}
          </span>{" "}
          {words(m.after)}
        </p>
        <WhyDeck dict={dict} />
      </div>
    </section>
  );
}
