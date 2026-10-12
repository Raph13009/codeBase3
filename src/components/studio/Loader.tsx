import { useRef } from "react";
import { gsap, useGSAP } from "@/components/studio/motion";

/** Geometric BoostAI monogram (same path as BMark). */
const B_PATH =
  "M74.41 94.63L41.70 53.52L12.01 18.36L11.82 6.45L12.30 4.00L62.50 4.00L66.80 4.79L72.27 6.93L76.17 9.47L80.18 13.48L83.89 20.70L84.86 26.17L84.47 31.84L82.71 37.30L79.79 41.60L74.22 46.39L71.48 47.95L62.40 50.39L70.51 51.66L77.34 54.98L81.45 58.30L83.11 60.35L85.84 64.65L87.21 68.55L87.99 73.24L87.79 77.34L86.62 82.23L85.45 84.77L80.47 90.72L74.41 94.63Z M55.66 95.61L55.08 95.02L34.57 95.02L34.18 95.41L33.40 95.02L23.63 95.02L23.24 95.61L21.88 95.61L21.48 95.02L12.01 94.92L12.11 41.31L13.18 41.99L48.34 84.77L56.15 94.53L55.66 95.61Z";
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
        <path className="glyph" fill="none" fillRule="evenodd" d={B_PATH} pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
        <path className="glyph-fill" fillRule="evenodd" d={B_PATH} />
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
