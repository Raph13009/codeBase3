import { useRef } from "react";
import MetaTags from "@/components/seo/MetaTags";
import { gsap, Icon, MOTION_OK, StLink, useGSAP } from "@/components/studio/motion";
import { PageHero } from "@/components/studio/PageHero";
import { CtaBlock } from "@/components/studio/CtaBlock";

const STORY_LEAD =
  "J'ai commencé à coder en 2019, après avoir passé cinq jours à galérer sur le site d'assurance Ameli, qui buggait sans arrêt. Perdre autant de temps juste pour déposer un PDF m'a tellement énervé que je me suis dit\u00a0: «\u00a0je vais le refaire et leur envoyer\u00a0».";

const PRINCIPLES = [
  {
    word: "Vite",
    text: "Créer vite, bien, sans se perdre dans la complexité. Le MVP d'Avenirea a été livré en quatre jours, paiement compris.",
  },
  {
    word: "Sur mesure",
    text: "Chaque projet doit vraiment ressembler à son client\u00a0: pas de modèle plaqué, un produit pensé pour votre métier.",
  },
  {
    word: "Un seul interlocuteur",
    text: "Du premier appel à la mise en ligne, vous savez toujours qui fait quoi. Rien ne se perd entre la maquette et la production.",
  },
  {
    word: "Mesurable",
    text: "Des objectifs écrits noir sur blanc, puis un produit qu'on mesure, qu'on ajuste et qu'on fait évoluer après le lancement.",
  },
];

const STATS = [
  { value: "1", text: "interlocuteur, du premier appel à la mise en ligne" },
  { value: "3", text: "expertises reliées\u00a0: web, produit et IA" },
  { value: "4", text: "jours pour livrer le MVP complet d'Avenirea" },
];

/** /about: the people behind the studio, how it started and what guides the work. */
const About = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Photo opens from an inset frame, the image settles inside it
        const photo = { trigger: ".st-about-photo", start: "top bottom", end: "center center", scrub: true };
        gsap.fromTo(
          ".st-about-photo-frame",
          { clipPath: "inset(10% 10% 10% 10% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 4px)", ease: "none", scrollTrigger: photo },
        );
        gsap.fromTo(".st-about-photo-frame img", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: photo });

        gsap.fromTo(
          ".st-about-lead .w",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: ".st-about-lead", start: "top 80%", end: "bottom 50%", scrub: true },
          },
        );

        // Principles light up as they cross the middle of the screen
        gsap.utils.toArray<HTMLElement>(".st-principle").forEach((row) => {
          gsap.fromTo(
            row,
            { "--lit": 0 },
            {
              "--lit": 1,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 80%", end: "top 45%", scrub: true },
            },
          );
        });

        gsap.fromTo(
          ".st-about-net h2 .mask > span",
          { yPercent: 105 },
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: ".st-about-net", start: "top 80%", end: "top 35%", scrub: true },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <>
      <MetaTags
        title="À propos | BoostAI Consulting"
        description="Raphaël et un réseau de développeurs passionnés&nbsp;: BoostAI est un studio tech & IA pour PME et startups."
        keywords="BoostAI, à propos, studio, consultant IA, développement web"
      />
      <main id="contenu" tabIndex={-1} ref={rootRef}>
        <PageHero
          label="(Le studio)"
          line1="Humain"
          line2="avant tout."
          title="BoostAI, c'est avant tout une histoire humaine"
          foot={<span>Studio tech &amp; IA · Fondé par Raphaël L.</span>}
        >
          <p>
            Derrière BoostAI, Raphaël et un réseau de développeurs passionnés. Une petite équipe, un seul interlocuteur, et
            une obsession&nbsp;: des produits qui ressemblent à leurs clients.
          </p>
        </PageHero>

        <section className="st-about-photo" aria-label="Raphaël au travail">
          <figure>
            <div className="st-about-photo-frame">
              <picture>
                <source media="(max-width: 700px)" srcSet="/images/studio/raphael-bureau.webp" />
                <img
                  src="/images/studio/raphael-bureau-large.webp"
                  alt="Raphaël, fondateur de BoostAI, à son bureau devant son code"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption>
              <span>Raphaël L., fondateur</span>
              <span className="serif">Expert web &amp; IA</span>
            </figcaption>
          </figure>
        </section>

        <section className="st-about-story" aria-labelledby="st-about-story-title">
          <div className="st-about-side">
            <p className="st-paren">(Comment tout a commencé)</p>
          </div>
          <div className="st-about-body">
            <h2 className="sr-only" id="st-about-story-title">
              Comment tout a commencé
            </h2>
            <p className="st-about-lead">
              {STORY_LEAD.split(" ").map((word, i) => (
                <span className="w" key={i}>
                  {word}{" "}
                </span>
              ))}
            </p>
            <div className="st-about-cols">
              <p>
                Depuis ce jour, je n'ai jamais lâché. Quand j'ai découvert les outils no-code et vibe code, j'ai compris
                qu'on pouvait créer vite, bien et sans se perdre dans la complexité.
              </p>
              <p>
                Aujourd'hui, je construis BoostAI pour aider les entreprises à avancer sans perdre de temps. Ce qui me
                motive&nbsp;? L'automatisation, l'IA, et cette idée simple&nbsp;: chaque projet que je livre doit vraiment
                ressembler à son client.
              </p>
            </div>
            <p className="st-about-sign serif">Raphaël</p>
          </div>
        </section>

        <section className="st-about-principles" aria-labelledby="st-principles-title">
          <div className="st-about-principles-head">
            <p className="st-label">
              <b>01</b> Ce qui nous guide
            </p>
            <h2 id="st-principles-title">
              Quatre <span className="serif">principes</span>
            </h2>
          </div>
          <ol className="st-principles">
            {PRINCIPLES.map((p, i) => (
              <li className="st-principle" key={p.word}>
                <span className="n">0{i + 1}</span>
                <h3>{p.word}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="st-about-net" aria-labelledby="st-net-title">
          <div className="st-about-stats">
            {STATS.map((s) => (
              <div className="st-stat" key={s.value + s.text}>
                <b>{s.value}</b>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
          <div className="st-about-net-body">
            <h2 id="st-net-title">
              <span className="mask">
                <span>Un réseau,</span>
              </span>{" "}
              <span className="mask">
                <span className="serif">pas une usine.</span>
              </span>
            </h2>
            <p>
              Raphaël travaille avec un réseau de développeurs passionnés, toujours à la pointe et ouverts aux nouvelles
              idées. Chaque projet mobilise les bons profils (design, développement, IA) sans couche intermédiaire entre
              vous et ceux qui construisent.
            </p>
            <div className="st-about-links">
              <StLink href="/#methode" className="st-link" cursor="Lire">
                Notre méthode <Icon name="arrow" />
              </StLink>
              <StLink href="/realisations" className="st-link" cursor="Voir">
                Nos réalisations <Icon name="arrow" />
              </StLink>
            </div>
          </div>
        </section>

        <CtaBlock line1="On en" line2="parle&nbsp;?" />
      </main>
    </>
  );
};

export default About;
