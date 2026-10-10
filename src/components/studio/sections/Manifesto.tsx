import { useRef } from "react";
import { gsap, Icon, MOTION_OK, StLink, useGSAP } from "@/components/studio/motion";

const TEXT =
  "Quand chaque PME a besoin d'un avantage digital clair, BoostAI unifie sites, MVP et agents IA autour d'une seule ambition : livrer vite, propre, et mesurable.";
const WORDS = TEXT.split(" ");

/** The studio statement, lit word by word as it scrolls through. */
export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".st-man-text .w",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: { trigger: ".st-man-text", start: "top 80%", end: "bottom 52%", scrub: true },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="st-manifesto" id="studio" ref={rootRef} aria-labelledby="st-man-title">
      <aside className="st-man-side">
        <p className="st-paren">(Le studio)</p>
        <div className="st-stat">
          <b>1</b>
          <span>interlocuteur, du premier appel à la mise en ligne</span>
        </div>
        <div className="st-stat">
          <b>3</b>
          <span>expertises reliées&nbsp;: web, produit et IA</span>
        </div>
      </aside>

      <div className="st-man-body">
        <h2 className="sr-only" id="st-man-title">
          Le studio
        </h2>
        <p className="st-man-text">
          {WORDS.map((word, i) => (
            <span className="w" key={i}>
              {word}{" "}
            </span>
          ))}
        </p>
        <div className="st-man-sub">
          <p>
            Stratégie, design, code et IA dans la même équipe&nbsp;: rien ne se perd entre la maquette et la production, et
            vous savez toujours qui fait quoi.
            <br />
            <StLink href="/about" className="st-link" cursor="Lire">
              Découvrir le studio <Icon name="arrow" />
            </StLink>
          </p>
        </div>
      </div>
    </section>
  );
}
