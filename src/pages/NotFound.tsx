import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { gsap, Icon, prefersReducedMotion, StLink, useGSAP } from "@/components/studio/motion";
import { usePageReady } from "@/components/studio/PageTransition";
import { BMark } from "@/components/studio/BMark";

/** 404: the mark stands in for the zero. */
const NotFound = () => {
  const rootRef = useRef<HTMLElement>(null);
  const ready = usePageReady();
  const [intro, setIntro] = useState<"pending" | "done">(() => (prefersReducedMotion() ? "done" : "pending"));

  useGSAP(
    () => {
      if (!ready || intro === "done") return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".st-404-code .mask > span", { yPercent: 112 }, { yPercent: 0, duration: 1.3, stagger: 0.08 }, 0.05)
        .fromTo(".st-404-code svg", { rotate: -120, scale: 0.4 }, { rotate: 0, scale: 1, duration: 1.6 }, 0.1)
        .fromTo(".st-404-body > *", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.45);
      setIntro("done");
    },
    { scope: rootRef, dependencies: [ready] },
  );

  return (
    <>
      <Helmet>
        <title>Page introuvable | BoostAI Consulting</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main id="contenu" tabIndex={-1}>
        <section className="st-404" ref={rootRef} data-intro={intro} id="top">
          <p className="st-paren">(Erreur 404)</p>
          <h1 className="st-404-code">
            <span className="sr-only">Erreur 404 : page introuvable</span>
            <span className="mask" aria-hidden="true">
              <span>4</span>
            </span>
            <BMark />
            <span className="mask" aria-hidden="true">
              <span>4</span>
            </span>
          </h1>
          <div className="st-404-body">
            <p className="serif">Cette page n'existe pas, ou plus.</p>
            <p>Le lien est peut-être incomplet, ou la page a été déplacée. Le reste du site, lui, est bien là.</p>
            <div className="st-404-links">
              <StLink href="/" className="st-pill st-pill--light">
                Retour à l'accueil
              </StLink>
              <StLink href="/realisations" className="st-link" cursor="Voir">
                Voir les réalisations <Icon name="arrow" />
              </StLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
