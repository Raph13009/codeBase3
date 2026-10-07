import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { Icon, clamp, prefersReducedMotion } from "@/components/agentic-commerce/shared";

/** Founding pilot: three steps on a track that fills with the scroll, then the apply card. */
export function PilotTrack({ dict }: { dict: Dictionary }) {
  const p = dict.pilot;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const bar = track.querySelector<HTMLElement>(".track-bar");
    const items = Array.from(track.querySelectorAll<HTMLLIElement>("li"));
    if (!bar) return;
    const reduce = prefersReducedMotion();
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = reduce ? 1 : clamp((vh * 0.8 - r.top) / (vh * 0.5));
      track.style.setProperty("--p", progress.toFixed(3));
      const B = bar.getBoundingClientRect();
      const vertical = B.height > B.width;
      items.forEach((li) => {
        const node = li.querySelector(".node");
        if (!node) return;
        const N = node.getBoundingClientRect();
        const threshold = vertical
          ? (N.top + N.height / 2 - B.top) / B.height
          : (N.left + N.width / 2 - B.left) / B.width;
        li.classList.toggle("on", progress >= threshold - 0.001);
      });
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
  }, []);

  return (
    <section className="pilot" id="pilot">
      <div className="wrap">
        <div className="pilot-head">
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 className="h2">{p.title}</h2>
          </div>
          <p className="lead">{p.subtitle}</p>
        </div>
        <div className="track" ref={trackRef}>
          <div className="track-bar">
            <i />
          </div>
          <ol>
            {p.steps.map((step, i) => (
              <li key={step.title}>
                <span className="node">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="pilot-card">
          <span className="pc-tile" />
          <div>
            <h3>{p.cardTitle}</h3>
            <p>{p.cardText}</p>
          </div>
          <a
            className="btn btn-light mag"
            href="#assess"
            onClick={() => trackAgenticEvent("cta_primary", { location: "pilot" })}
          >
            {p.cardCta} <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
