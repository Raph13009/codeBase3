import { useRef } from "react";
import { gsap, Icon, MaskChars, MOTION_OK, StLink, useGSAP } from "@/components/studio/motion";
import { CONTACT_EMAIL } from "@/components/studio/data";

type Props = {
  label?: string;
  line1?: string;
  line2?: string;
};

/** End-of-page call to action: big title rising with the scroll, round button, email. */
export function CtaBlock({ label = "(Et maintenant\u00a0?)", line1 = "Un projet", line2 = "en tête\u00a0?" }: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = rootRef.current;
        gsap.fromTo(
          ".l1 .mask > span",
          { yPercent: 110 },
          { yPercent: 0, ease: "none", stagger: 0.05, scrollTrigger: { trigger, start: "top 85%", end: "top 30%", scrub: true } },
        );
        gsap.fromTo(
          ".l2 .mask > span",
          { yPercent: 110 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger, start: "top 72%", end: "top 20%", scrub: true } },
        );
        gsap.fromTo(
          ".st-cta-btn",
          { scale: 0.6, rotate: -25 },
          { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger, start: "top 75%", end: "top 25%", scrub: true } },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="st-cta" ref={rootRef} aria-labelledby="st-cta-title">
      <p className="st-paren">{label}</p>
      <h2 className="st-cta-title" id="st-cta-title">
        <span className="sr-only">
          {line1} {line2}
        </span>
        <MaskChars text={line1} className="l1" />
        <span className="l2 serif" aria-hidden="true">
          <span className="mask">
            <span>{line2}</span>
          </span>
        </span>
      </h2>
      <div className="st-cta-side">
        <StLink href="/contact" className="st-cta-btn" cursor="C'est parti">
          <span>
            Démarrer
            <br />
            un projet
          </span>
          <Icon name="arrow-up-right" />
        </StLink>
        <p>
          Ou écrivez-nous directement&nbsp;:
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`} className="st-cta-mail">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
