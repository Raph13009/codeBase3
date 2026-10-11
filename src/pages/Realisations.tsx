import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MetaTags from "@/components/seo/MetaTags";
import { gsap, Icon, MOTION_OK, ScrollTrigger, StLink, useGSAP } from "@/components/studio/motion";
import { PageHero } from "@/components/studio/PageHero";
import { CtaBlock } from "@/components/studio/CtaBlock";
import { AGENT_CASES, CASES, WEB_CASES, typeLabel, type Case } from "@/components/studio/work";

type Filter = "tout" | "web" | "agents";
type View = "grille" | "liste";

const FILTERS: { id: Filter; label: string; items: Case[] }[] = [
  { id: "tout", label: "Tout", items: CASES },
  { id: "web", label: "Produits web", items: WEB_CASES },
  { id: "agents", label: "Agents IA", items: AGENT_CASES },
];

const pad = (n: number) => String(n).padStart(2, "0");
const caseColors = (c: Case) => ({ "--bg": c.bg, "--fg": c.fg }) as CSSProperties;

/** Screenshot (or name poster) inside a project-coloured panel. */
function CasePanel({ item, eager = false }: { item: Case; eager?: boolean }) {
  return (
    <div className="st-wpanel" data-layout={item.layout}>
      {item.card ? (
        <div className="st-wpanel-shot">
          <img
            src={item.card}
            alt={`Aperçu de ${item.name}`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            style={item.cardPos ? { objectPosition: item.cardPos } : undefined}
          />
        </div>
      ) : null}
      {item.layout === "tall" || item.layout === "poster" ? (
        <span className="st-wpanel-name" aria-hidden="true">
          {item.name}
        </span>
      ) : null}
      {item.layout === "poster" ? (
        <span className="st-wpanel-tags" aria-hidden="true">
          {item.stackShort}
        </span>
      ) : null}
    </div>
  );
}

/** Two staggered columns of large cards; the right column floats with the scroll. */
function WorkGrid({ items }: { items: Case[] }) {
  const rootRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".st-wcard").forEach((card) => {
          const panel = card.querySelector<HTMLElement>(".st-wpanel");
          const img = card.querySelector<HTMLElement>(".st-wpanel-shot img");
          const scrub = { trigger: card, start: "top 96%", end: "top 45%", scrub: true };
          if (panel) {
            gsap.fromTo(
              panel,
              { clipPath: "inset(16% 9% 0% 9% round 10px)" },
              { clipPath: "inset(0% 0% 0% 0% round 4px)", ease: "none", scrollTrigger: scrub },
            );
          }
          if (img) gsap.fromTo(img, { scale: 1.28 }, { scale: 1.06, ease: "none", scrollTrigger: scrub });
        });
      });
      mm.add(`${MOTION_OK} and (min-width: 961px)`, () => {
        gsap.fromTo(
          ".st-wcard:nth-child(even)",
          { y: 150 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <ul className="st-wgrid" ref={rootRef}>
      {items.map((item, i) => (
        <li className="st-wcard" key={`${item.type}-${item.id}`} style={caseColors(item)}>
          <StLink href={item.href} cursor={item.type === "agent" ? "Voir l'agent" : "Voir le projet"}>
            <CasePanel item={item} eager={i < 2} />
            <div className="st-wcard-meta">
              <span className="n">{pad(i + 1)}</span>
              <h3>{item.name}</h3>
              <span className="k">{typeLabel(item.type)}</span>
              <p>
                {item.category} · {item.stackShort}
              </p>
            </div>
          </StLink>
        </li>
      ))}
    </ul>
  );
}

/** Index rows; on desktop a preview card follows the pointer over the list. */
function WorkList({ items }: { items: Case[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const target = useRef({ x: 0, y: 0, on: false });

  // Rows rise and their rules draw in as they enter
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".st-wrow").forEach((row) => {
          const scrub = { trigger: row, start: "top 98%", end: "top 70%", scrub: true };
          gsap.fromTo(row.querySelector(".st-wrow-rule"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: scrub });
          gsap.fromTo(row.querySelector(".t"), { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: scrub });
        });
      });
    },
    { scope: rootRef },
  );

  // Pointer-following preview (fine pointers only)
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let px = x;
    let raf = 0;
    const loop = () => {
      const t = target.current;
      const dx = t.x - x;
      x += dx * 0.14;
      y += (t.y - y) * 0.14;
      const tilt = Math.max(-9, Math.min(9, (x - px) * 0.5));
      px = x;
      // Sits to the right of the pointer so the hovered name stays readable
      preview.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(40px, -62%) rotate(${tilt.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    target.current.x = e.clientX;
    target.current.y = e.clientY;
  };

  return (
    <div className="st-wlist" ref={rootRef} onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <div className="st-wlist-head" aria-hidden="true">
        <span>N°</span>
        <span>Projet</span>
        <span>Catégorie</span>
        <span>Stack</span>
      </div>
      <ul data-hovering={active !== null}>
        {items.map((item, i) => (
          <li
            className="st-wrow"
            key={`${item.type}-${item.id}`}
            data-active={active === i}
            onPointerEnter={() => setActive(i)}
          >
            <StLink href={item.href} cursor="Voir">
              <span className="n">{pad(i + 1)}</span>
              <span className="t">{item.name}</span>
              <span className="c">{item.category}</span>
              <span className="s">{item.stackShort}</span>
              <Icon name="arrow-up-right" />
            </StLink>
            <span className="st-wrow-rule" aria-hidden="true" />
          </li>
        ))}
      </ul>
      <div className="st-wpreview" ref={previewRef} data-on={active !== null} aria-hidden="true">
        {items.map((item, i) => (
          <div className="st-wpreview-item" key={`${item.type}-${item.id}`} data-on={active === i} style={caseColors(item)}>
            <CasePanel item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** /realisations: every project and agent, filterable, as a grid or an index list. */
const Realisations = () => {
  const [params, setParams] = useSearchParams();
  const { hash } = useLocation();
  const filter: Filter = params.get("filtre") === "agents" ? "agents" : params.get("filtre") === "web" ? "web" : "tout";
  const view: View = params.get("vue") === "liste" ? "liste" : "grille";
  const current = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];
  const bodyRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Old links pointed to /realisations#agents
  useEffect(() => {
    if (hash === "#agents") setParams({ filtre: "agents" }, { replace: true });
  }, [hash, setParams]);

  const update = (next: { filtre?: Filter; vue?: View }) => {
    const f = next.filtre ?? filter;
    const v = next.vue ?? view;
    const p: Record<string, string> = {};
    if (f !== "tout") p.filtre = f;
    if (v !== "grille") p.vue = v;
    setParams(p, { replace: true, preventScrollReset: true });
  };

  // New selection: items come in, every trigger below re-measures
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const body = bodyRef.current;
    if (body && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        body.querySelectorAll(".st-wcard > a, .st-wrow > a"),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.035, clearProps: "opacity,transform" },
      );
    }
    ScrollTrigger.refresh();
  }, [filter, view]);

  return (
    <>
      <MetaTags
        title="Nos Réalisations | BoostAI Consulting - Projets Web & IA"
        description="Découvrez nos réalisations en développement web et intelligence artificielle&nbsp;: plateformes, MVP, sites vitrines, agents IA et automatisations."
        keywords="réalisations, projets web, intelligence artificielle, développement, automatisation, BoostAI"
        image="/android-chrome-512x512.png"
      />
      <main id="contenu" tabIndex={-1}>
        <PageHero
          label="(Index)"
          line1="Projets"
          line2="& agents IA"
          title="Réalisations BoostAI&nbsp;: projets web et agents IA"
          foot={<span>{pad(CASES.length)} réalisations</span>}
        >
          <p>
            Plateformes, MVP, sites vitrines et agents IA&nbsp;: une sélection de {CASES.length} projets conçus et
            développés par le studio.
          </p>
        </PageHero>

        <section className="st-work-index" aria-label="Liste des réalisations">
          <div className="st-wtools">
            <div className="st-wfilters" role="group" aria-label="Filtrer les réalisations">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => update({ filtre: f.id })}
                >
                  {f.label}
                  <sup>{pad(f.items.length)}</sup>
                </button>
              ))}
            </div>
            <div className="st-wviews" role="group" aria-label="Affichage">
              <button type="button" aria-pressed={view === "grille"} onClick={() => update({ vue: "grille" })}>
                Grille
              </button>
              <button type="button" aria-pressed={view === "liste"} onClick={() => update({ vue: "liste" })}>
                Liste
              </button>
            </div>
          </div>

          <div className="st-wbody" ref={bodyRef} key={`${filter}-${view}`}>
            {view === "grille" ? <WorkGrid items={current.items} /> : <WorkList items={current.items} />}
          </div>
        </section>

        <CtaBlock line1="Votre projet" line2="sera le prochain&nbsp;?" />
      </main>
    </>
  );
};

export default Realisations;
