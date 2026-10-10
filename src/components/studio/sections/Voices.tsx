import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, Icon, MOTION_OK, StLink, useGSAP } from "@/components/studio/motion";

gsap.registerPlugin(SplitText);

/** Client quote (lines slide up with the scroll) and the "in two words" summary. */
export function Voices() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(".st-quote blockquote p", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              ease: "none",
              stagger: 0.12,
              scrollTrigger: { trigger: ".st-quote", start: "top 88%", end: "top 38%", scrub: true },
            }),
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="st-voices" id="avis" ref={rootRef} aria-label="Avis client et présentation">
      <p className="st-paren">(Ils en parlent)</p>
      <figure className="st-quote">
        <blockquote>
          <p>
            <span className="q">«&nbsp;</span>BoostAI a su comprendre notre besoin très rapidement et livrer une solution
            propre, efficace et parfaitement fonctionnelle. Une collaboration fluide du début à la fin.
            <span className="q">&nbsp;»</span>
          </p>
        </blockquote>
        <figcaption className="st-author">
          <img src="/lp/LP-BC/img/camille-160.jpg" alt="" width={52} height={52} loading="lazy" decoding="async" />
          <span>
            <b>Camille</b>
            <span>Fondateur de MyTable</span>
          </span>
        </figcaption>
      </figure>

      <p className="st-paren">(En bref)</p>
      <div className="st-bref">
        <h2>BoostAI, en deux mots</h2>
        <p>
          BoostAI Consulting est un studio tech et IA qui accompagne les PME et les startups de l'idée à la mise en
          ligne&nbsp;: sites web sur mesure, MVP, plateformes SaaS, agents IA et automatisations. Raphaël et un réseau
          de développeurs passionnés conçoivent, développent et déploient chaque projet avec une seule obsession&nbsp;:
          un produit qui ressemble à son client et qui sert son business.
        </p>
        <StLink href="/about" className="st-link" cursor="Lire">
          Qui sommes-nous <Icon name="arrow" />
        </StLink>
      </div>
    </section>
  );
}
