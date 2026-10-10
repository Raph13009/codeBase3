import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap, Icon, MaskChars, MOTION_OK, prefersReducedMotion, StLink, useGSAP } from "@/components/studio/motion";
import { HERO_PROJECTS } from "@/components/studio/data";

const HeroMark3D = lazy(() => import("@/components/studio/HeroMark3D"));

const MARQUEE_ITEMS = Array.from({ length: 5 });

/** "STUDIO / Tech & IA", the 3D mark, three recent projects and a scroll-driven marquee. */
export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState<"pending" | "done">(() => (prefersReducedMotion() ? "done" : "pending"));

  // Entrance, once the loader lifts (or straight away when there is no loader)
  useGSAP(
    () => {
      if (!ready || intro === "done") return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".l1 .mask > span", { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.05 }, 0)
        .fromTo(".l2 .mask > span", { yPercent: 110 }, { yPercent: 0, duration: 1.5 }, 0.22)
        .fromTo(".st-hero-canvas", { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" }, 0.05)
        .fromTo(".st-hero-side > p", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.2 }, 0.45)
        .fromTo(".st-hero-list li", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.55)
        .fromTo(".st-marquee", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.4 }, 0.6);
      setIntro("done");
    },
    { scope: rootRef, dependencies: [ready] },
  );

  // Hero drifts up and dims as it scrolls away
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrub = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".st-hero-title", { yPercent: -24, ease: "none", scrollTrigger: scrub });
        gsap.to(".st-hero-side", { y: -110, ease: "none", scrollTrigger: scrub });
        gsap.to(".st-hero-inner", { opacity: 0.2, ease: "none", scrollTrigger: { ...scrub, start: "30% top" } });
      });
    },
    { scope: rootRef },
  );

  // Marquee: constant drift, pushed by scroll speed, follows scroll direction
  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    let x = 0;
    let dir = -1;
    let raf = 0;
    let running = false;
    let last = performance.now();
    let lastY = window.scrollY;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? -1 : 1;
      const speed = 55 + Math.min(900, Math.abs(dy) * 55);
      const half = track.scrollWidth / 2;
      x += dir * speed * dt;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(track);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section className="st-hero" id="top" ref={rootRef} data-intro={intro}>
      <div className="st-hero-canvas">
        <Suspense fallback={null}>
          <HeroMark3D heroRef={rootRef} ready={ready} />
        </Suspense>
      </div>

      <div className="st-hero-inner">
        <h1 className="st-hero-title">
          <span className="sr-only">
            BoostAI Consulting, studio tech et IA : sites web, MVP et agents IA sur mesure pour les PME et les startups.
          </span>
          <MaskChars text="Studio" className="l1" />
          <span className="l2 serif" aria-hidden="true">
            <span className="mask">
              <span>Tech &amp; IA</span>
            </span>
          </span>
        </h1>

        <div className="st-hero-side">
          <p>
            BoostAI conçoit et développe des sites, des MVP et des agents IA pour les PME et les startups. Livrés vite,
            propres, et mesurables.
          </p>
          <ul className="st-hero-list" aria-label="Projets récents">
            {HERO_PROJECTS.map((project, i) => (
              <li key={project.id}>
                <StLink href={`/project/${project.id}`} cursor="Voir">
                  <span className="n">0{i + 1}</span>
                  {project.name}
                  <span className="k">{project.kind}</span>
                  <Icon name="arrow-up-right" />
                </StLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="st-marquee" aria-hidden="true">
        <div className="st-marquee-track" ref={trackRef}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((_, i) => (
            <span className="st-marquee-item" key={i}>
              Boost<em>AI</em>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
