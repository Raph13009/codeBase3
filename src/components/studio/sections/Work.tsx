import { useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { gsap, Icon, LenisContext, MaskChars, MOTION_OK, ScrollTrigger, StLink, useGSAP } from "@/components/studio/motion";
import { PROJECTS } from "@/components/studio/data";

const PIN_QUERY = "(min-width: 961px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";
const pad = (n: number) => String(n).padStart(2, "0");

const pinAllowed = () => typeof window !== "undefined" && window.matchMedia(PIN_QUERY).matches;

/**
 * Projects reel. Desktop: the section pins and vertical scroll drives the reel
 * sideways, cards leaning in perspective as they cross the screen.
 * Mobile / short screens / reduced motion: a native swipe carousel.
 */
export function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const lenis = useContext(LenisContext);
  const [mode, setMode] = useState<"pin" | "swipe">(() => (pinAllowed() ? "pin" : "swipe"));

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const onChange = () => setMode(mq.matches ? "pin" : "swipe");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setCount = (i: number) => {
    if (countRef.current) countRef.current.textContent = `${pad(i + 1)} / ${pad(PROJECTS.length)}`;
  };

  // Title rises in as the section arrives (both modes)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = rootRef.current;
        gsap.fromTo(
          ".st-work-title .l1 .mask > span",
          { yPercent: 108 },
          { yPercent: 0, ease: "none", stagger: 0.07, scrollTrigger: { trigger, start: "top 88%", end: "top 22%", scrub: true } },
        );
        gsap.fromTo(
          ".st-work-title .l2 .mask > span",
          { yPercent: 108 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger, start: "top 72%", end: "top 8%", scrub: true } },
        );
        gsap.fromTo(
          ".st-reel-wrap",
          { y: 140 },
          { y: 0, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "top top", scrub: true } },
        );
      });
    },
    { scope: rootRef },
  );

  // Pinned horizontal reel
  useGSAP(
    () => {
      if (mode !== "pin") return;
      const pin = pinRef.current;
      const reel = reelRef.current;
      if (!pin || !reel) return;
      const cards = Array.from(reel.querySelectorAll<HTMLElement>(".st-card"));
      const panels = cards.map((card) => card.querySelector<HTMLElement>(".st-card-panel"));
      let maxX = 0;
      let boxes: { left: number; width: number }[] = [];
      let current = -1;

      const measure = () => {
        reel.style.transform = "translate3d(0,0,0)";
        boxes = cards.map((card) => ({ left: card.offsetLeft, width: card.offsetWidth }));
        maxX = Math.max(0, reel.scrollWidth - window.innerWidth);
        pin.style.height = `${window.innerHeight + maxX}px`;
      };

      const apply = (progress: number) => {
        const x = -maxX * progress;
        reel.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
        const half = window.innerWidth / 2;
        let best = 0;
        let bestD = Infinity;
        boxes.forEach((box, i) => {
          const d = (box.left + x + box.width / 2 - half) / half;
          const ad = Math.min(1.7, Math.abs(d));
          const panel = panels[i];
          if (panel) {
            panel.style.transform = `perspective(1100px) rotateY(${(-d * 13).toFixed(2)}deg) rotateZ(${(d * 1.3).toFixed(2)}deg) translateY(${(ad * 20).toFixed(1)}px) scale(${(1 - ad * 0.05).toFixed(3)})`;
          }
          if (Math.abs(d) < bestD) {
            bestD = Math.abs(d);
            best = i;
          }
        });
        if (best !== current) {
          current = best;
          setCount(best);
        }
      };

      measure();
      const st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
      ScrollTrigger.addEventListener("refreshInit", measure);
      apply(st.progress);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", measure);
        pin.style.height = "";
        reel.style.transform = "";
        panels.forEach((panel) => panel && (panel.style.transform = ""));
      };
    },
    { scope: rootRef, dependencies: [mode], revertOnUpdate: true },
  );

  // Swipe mode: counter follows the card nearest to the left edge
  useEffect(() => {
    if (mode !== "swipe") return;
    const wrap = wrapRef.current;
    const reel = reelRef.current;
    if (!wrap || !reel) return;
    const cards = Array.from(reel.querySelectorAll<HTMLElement>(".st-card"));
    const onScroll = () => {
      const x = wrap.scrollLeft;
      let best = 0;
      cards.forEach((card, i) => {
        if (card.offsetLeft - 40 <= x) best = i;
      });
      setCount(best);
    };
    onScroll();
    wrap.addEventListener("scroll", onScroll, { passive: true });
    return () => wrap.removeEventListener("scroll", onScroll);
  }, [mode]);

  const scrollReel = () => {
    if (mode === "swipe") {
      wrapRef.current?.scrollBy({ left: window.innerWidth * 0.7, behavior: "smooth" });
      return;
    }
    const pin = pinRef.current;
    if (!pin) return;
    const top = pin.getBoundingClientRect().top + window.scrollY;
    const span = pin.offsetHeight - window.innerHeight;
    const step = span / Math.max(1, PROJECTS.length - 1);
    const now = Math.max(0, window.scrollY - top);
    const target = top + Math.min(span, Math.round(now / step) * step + step);
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target });
  };

  return (
    <section className="st-work" id="projets" ref={rootRef} data-mode={mode} aria-labelledby="st-work-title">
      <div className="st-work-pin" ref={pinRef}>
        <div className="st-work-sticky">
          <div className="st-work-head">
            <p className="st-label">
              <b>02</b> Projets livrés
            </p>
            <h2 className="st-work-title" id="st-work-title">
              <span className="sr-only">Livré, pas promis.</span>
              <MaskChars text="Livré," className="l1" />
              <span className="l2 serif" aria-hidden="true">
                <span className="mask">
                  <span>pas promis.</span>
                </span>
              </span>
            </h2>
            <p className="st-work-count" aria-hidden="true">
              <span ref={countRef}>01 / {pad(PROJECTS.length)}</span>
            </p>
            <div className="st-work-lead">
              <p>Six produits en production : plateformes, MVP et sites, conçus et développés de bout en bout.</p>
              <button type="button" className="st-round" onClick={scrollReel} aria-label="Projet suivant">
                <Icon name="arrow-down-right" />
              </button>
            </div>
          </div>

          <div className="st-reel-wrap" ref={wrapRef}>
            <div className="st-reel" ref={reelRef}>
              {PROJECTS.map((project, i) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="st-card"
                  data-layout={project.layout}
                  data-cursor="Voir le projet"
                  style={{ "--off": project.offset, "--bg": project.bg, "--fg": project.fg } as CSSProperties}
                >
                  <div className="st-card-panel">
                    <div className="st-card-shot">
                      <img
                        src={project.image}
                        alt={`Aperçu du projet ${project.name}`}
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                    {project.layout === "tall" ? (
                      <span className="st-card-name" aria-hidden="true">
                        {project.name}
                      </span>
                    ) : null}
                  </div>
                  <div className="st-card-meta">
                    <span className="n">{pad(i + 1)}</span>
                    <h3>{project.name}</h3>
                    <p>
                      {project.kind} · {project.stack}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="st-work-foot">
            <span>Sélection · {pad(PROJECTS.length)} projets</span>
            <StLink href="/realisations" className="st-work-all" cursor="Tout voir">
              Toutes les réalisations <Icon name="arrow-up-right" />
            </StLink>
          </div>
        </div>
      </div>
    </section>
  );
}
