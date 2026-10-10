import { useContext, useEffect, useRef, useState } from "react";
import { gsap, Icon, LenisContext, MaskChars, MOTION_OK, ScrollTrigger, useGSAP } from "@/components/studio/motion";
import { STEPS } from "@/components/studio/data";

const TONES = ["ink", "graphite", "paper", "ink"] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** "Du brief à la prod." then four stacked step panels under a sticky tab bar. */
export function Method() {
  const rootRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lenis = useContext(LenisContext);
  const [active, setActive] = useState(0);

  // Panels stick right under the tab bar, whatever its height
  useEffect(() => {
    const bar = barRef.current;
    const steps = stepsRef.current;
    if (!bar || !steps) return;
    const ro = new ResizeObserver(() => {
      steps.style.setProperty("--bar-h", `${bar.offsetHeight}px`);
      ScrollTrigger.refresh();
    });
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const steps = stepsRef.current;
      if (!steps) return;
      const last = STEPS.length - 1;

      // Active tab + progress line (state, so it also runs with reduced motion)
      ScrollTrigger.create({
        trigger: steps,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${((p * last + 1) / STEPS.length).toFixed(4)})`;
          const i = Math.round(p * last);
          setActive((prev) => (prev === i ? prev : i));
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".st-method-title .d .mask > span",
          { yPercent: 108 },
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.035,
            scrollTrigger: { trigger: ".st-method-title", start: "top 95%", end: "top 45%", scrub: true },
          },
        );
        gsap.fromTo(
          ".st-method-title .s",
          { xPercent: -40, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: ".st-method-title", start: "top 98%", end: "top 55%", scrub: true },
          },
        );

        // Each panel sinks back (smaller, darker) while the next one slides over it
        const panels = Array.from(steps.querySelectorAll<HTMLElement>(".st-panel"));
        const barH = () => barRef.current?.offsetHeight ?? 0;
        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          const inner = panel.querySelector<HTMLElement>(".st-panel-in");
          if (!next || !inner) return;
          gsap.fromTo(
            inner,
            { scale: 1, borderRadius: 0, "--dim": 0 },
            {
              scale: 0.9,
              borderRadius: 28,
              "--dim": 0.62,
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: () => `top ${barH()}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
    },
    { scope: rootRef },
  );

  const goTo = (i: number) => {
    const steps = stepsRef.current;
    const bar = barRef.current;
    if (!steps || !bar) return;
    const top = steps.getBoundingClientRect().top + window.scrollY;
    const target = top + i * (window.innerHeight - bar.offsetHeight) + 2;
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.3 });
    else window.scrollTo({ top: target });
  };

  return (
    <section className="st-method" id="methode" ref={rootRef} aria-labelledby="st-method-title">
      <div className="st-method-intro">
        <p className="st-label">
          <b>03</b> Méthode
        </p>
        <p className="side">
          Une méthode courte et transparente&nbsp;: à chaque étape, vous savez ce qui est fait, ce qui arrive ensuite et
          pourquoi.
        </p>
        <h2 className="st-method-title" id="st-method-title">
          <span className="sr-only">Du brief à la prod.</span>
          <span className="s serif" aria-hidden="true">
            Du brief
          </span>
          <MaskChars text="À la prod." className="d" />
        </h2>
      </div>

      <div className="st-steps" ref={stepsRef}>
        <div className="st-steps-barwrap">
          <div className="st-steps-bar" ref={barRef}>
            <div className="st-steps-row">
              <p>
                Quatre étapes. <em>Zéro zone grise.</em>
              </p>
              <span>
                Faites défiler
                <i>
                  <Icon name="arrow-down" />
                </i>
              </span>
            </div>
            <nav className="st-tabs" aria-label="Étapes de la méthode">
              {STEPS.map((step, i) => (
                <button
                  type="button"
                  className="st-tab"
                  key={step.word}
                  aria-current={active === i ? "step" : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="n">{pad(i + 1)}</span>
                  {step.word}
                </button>
              ))}
              <span className="st-steps-progress" ref={progressRef} aria-hidden="true" />
            </nav>
          </div>
        </div>
        {STEPS.map((step, i) => (
          <article
            className="st-panel"
            key={step.word}
            data-tone={TONES[i]}
            data-side={i % 2 ? "right" : "left"}
            aria-label={`Étape ${i + 1} : ${step.word}`}
          >
            <div className="st-panel-in">
              <div className="st-panel-num">
                <b>{pad(i + 1)}</b>
                <span>{step.label}</span>
              </div>
              <div className="st-panel-body">
                <h3>{step.word}</h3>
                <p>{step.text}</p>
                <div className="st-panel-tags">
                  {step.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="st-panel-ghost" aria-hidden="true">
                {pad(i + 1)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
