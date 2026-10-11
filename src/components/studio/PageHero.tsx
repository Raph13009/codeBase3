import { useRef, useState, type ReactNode } from "react";
import { gsap, Icon, MaskChars, MOTION_OK, prefersReducedMotion, useGSAP } from "@/components/studio/motion";
import { usePageReady } from "@/components/studio/PageTransition";

type Props = {
  /** Small italic label, e.g. "(Index)". */
  label: string;
  /** Giant uppercase word(s). */
  line1: string;
  /** Italic serif line under it. */
  line2?: string;
  /** Full heading for screen readers and search engines. */
  title: string;
  /** Right column, next to the title. */
  children?: ReactNode;
  /** Bottom row, left side. */
  foot?: ReactNode;
  /** lg: smaller title for long words · md: shorter hero. */
  size?: "xl" | "lg";
  height?: "full" | "md";
};

/** Opening of every inner page: huge masked title that rises once the page is revealed. */
export function PageHero({ label, line1, line2, title, children, foot, size = "xl", height = "full" }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const ready = usePageReady();
  const [intro, setIntro] = useState<"pending" | "done">(() => (prefersReducedMotion() ? "done" : "pending"));

  useGSAP(
    () => {
      if (!ready || intro === "done") return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".l1 .mask > span", { yPercent: 112 }, { yPercent: 0, duration: 1.3, stagger: 0.045 }, 0.05)
        .fromTo(".l2 .mask > span", { yPercent: 112 }, { yPercent: 0, duration: 1.4 }, 0.24)
        .fromTo(".st-phero-aside > *", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.42)
        .fromTo([".st-phero-top", ".st-phero-foot"], { opacity: 0 }, { opacity: 1, duration: 1 }, 0.5);
      setIntro("done");
    },
    { scope: rootRef, dependencies: [ready] },
  );

  // Title drifts up and the hero dims as it scrolls away
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrub = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".st-phero-title", { yPercent: -18, ease: "none", scrollTrigger: scrub });
        gsap.to(".st-phero-aside", { y: -70, ease: "none", scrollTrigger: scrub });
        gsap.to(".st-phero-main", { opacity: 0.25, ease: "none", scrollTrigger: { ...scrub, start: "35% top" } });
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="st-phero" ref={rootRef} data-intro={intro} data-size={size} data-height={height} id="top">
      <div className="st-phero-top">
        <p className="st-paren">{label}</p>
      </div>
      <div className="st-phero-main">
        <h1 className="st-phero-title">
          <span className="sr-only">{title}</span>
          <MaskChars text={line1} className="l1" />
          {line2 ? (
            <span className="l2 serif" aria-hidden="true">
              <span className="mask">
                <span>{line2}</span>
              </span>
            </span>
          ) : null}
        </h1>
        {children ? <div className="st-phero-aside">{children}</div> : null}
      </div>
      <div className="st-phero-foot">
        <div>{foot}</div>
        <span className="st-phero-scroll" aria-hidden="true">
          Défiler <Icon name="arrow-down" />
        </span>
      </div>
    </section>
  );
}
