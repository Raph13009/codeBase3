import { useRef } from "react";
import { gsap, useGSAP } from "@/components/studio/motion";
import { bSvgPath } from "@/components/studio/brand";

const B_PATH = bSvgPath(26);
const TICKER = Array.from({ length: 8 }, () => "BoostAI Consulting · Studio tech & IA · 2026");

type Props = {
  /** Called when the curtain starts lifting (the hero can start its entrance). */
  onReveal: () => void;
  /** Called once the loader is fully gone. */
  onDone: () => void;
};

/** First-visit intro: the mark is drawn while a counter runs, then the curtain lifts. */
export function Loader({ onReveal, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.fromTo(".ring", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.25 }, 0)
        .fromTo(".glyph", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.15 }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: 1.45,
            ease: "power1.inOut",
            onUpdate: () => {
              if (pctRef.current) pctRef.current.textContent = String(Math.round(counter.v));
            },
          },
          0,
        )
        .to(".glyph-fill", { opacity: 1, duration: 0.35, ease: "power1.out" }, 1.4)
        .to(".glyph", { opacity: 0, duration: 0.3 }, 1.45)
        .add(onReveal, 1.85)
        .to(rootRef.current, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, 1.8)
        .add(onDone);
    },
    { scope: rootRef },
  );

  return (
    <div className="st-loader" ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <circle className="ring" cx="50" cy="50" r="48" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        <path className="glyph" d={B_PATH} pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        <path className="glyph-fill" d={B_PATH} />
      </svg>
      <div className="st-loader-pct">
        <span ref={pctRef}>0</span>
        <small>%</small>
      </div>
      <div className="st-loader-ticker">
        <div>
          {TICKER.concat(TICKER).map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
