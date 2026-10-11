import { useCallback, useRef, useState, type CSSProperties } from "react";
import { gsap, Icon, MaskChars, MOTION_OK, prefersReducedMotion, StLink, useGSAP } from "@/components/studio/motion";
import { usePageReady } from "@/components/studio/PageTransition";
import { BMark } from "@/components/studio/BMark";
import { Lightbox } from "@/components/studio/Lightbox";
import { CASES, nextCase, stackLabel, typeLabel, type Case, type Shot } from "@/components/studio/work";

const pad = (n: number) => String(n).padStart(2, "0");
const isPortrait = (s: Shot) => s.h > s.w;
const longestWord = (text: string) => Math.max(...text.split(" ").map((w) => w.length));

type Row = { kind: "wide" | "pair" | "phones"; shots: Shot[] };

/** Editorial rhythm: runs of phone screens side by side, landscapes alternating full width and pairs. */
function galleryRows(shots: Shot[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let wideNext = true;
  while (i < shots.length) {
    if (isPortrait(shots[i])) {
      const run: Shot[] = [];
      while (i < shots.length && isPortrait(shots[i]) && run.length < 4) run.push(shots[i++]);
      rows.push({ kind: "phones", shots: run });
      continue;
    }
    const pairable = i + 1 < shots.length && !isPortrait(shots[i + 1]);
    if (!wideNext && pairable) {
      rows.push({ kind: "pair", shots: [shots[i], shots[i + 1]] });
      i += 2;
    } else {
      rows.push({ kind: "wide", shots: [shots[i]] });
      i += 1;
    }
    wideNext = !wideNext;
  }
  return rows;
}

/** Case study page shared by projects and agents. */
export function CaseStudy({ item }: { item: Case }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const [intro, setIntro] = useState<"pending" | "done">(() => (prefersReducedMotion() ? "done" : "pending"));
  const [viewer, setViewer] = useState<number | null>(null);

  const index = CASES.indexOf(item);
  const next = nextCase(item);
  const nextIndex = CASES.indexOf(next);
  const shots = item.cover ? [item.cover, ...item.gallery] : item.gallery;
  const galleryOffset = item.cover ? 1 : 0;
  const rows = galleryRows(item.gallery);
  const words = item.summary.split(" ");
  const kind = item.type === "agent" ? "agent" : "projet";

  const closeViewer = useCallback(() => setViewer(null), []);

  // Entrance once the page is revealed
  useGSAP(
    () => {
      if (!ready || intro === "done") return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".st-case-title .l1 .mask > span", { yPercent: 112 }, { yPercent: 0, duration: 1.3, stagger: 0.04 }, 0.05)
        .fromTo(".st-case-title .l2 .mask > span", { yPercent: 112 }, { yPercent: 0, duration: 1.4 }, 0.25)
        .fromTo(".st-case-facts > div", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.07 }, 0.45)
        .fromTo(".st-case-top", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.5)
        .fromTo(".st-case-cover-frame", { y: 120 }, { y: 0, duration: 1.6 }, 0.2);
      setIntro("done");
    },
    { scope: rootRef, dependencies: [ready] },
  );

  // Scroll scenes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(".st-case-title", {
          yPercent: -16,
          ease: "none",
          scrollTrigger: { trigger: ".st-case-hero", start: "top top", end: "bottom top", scrub: true },
        });

        // Cover opens from an inset card to full bleed
        const cover = { trigger: ".st-case-cover", start: "top bottom", end: "center center", scrub: true };
        gsap.fromTo(
          ".st-case-cover-frame",
          { clipPath: "inset(0% 8% 0% 8% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: cover },
        );
        gsap.fromTo(".st-case-cover-frame img", { scale: 1.22 }, { scale: 1, ease: "none", scrollTrigger: cover });

        // Summary lit word by word
        gsap.fromTo(
          ".st-case-lit .w",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: ".st-case-lit", start: "top 82%", end: "bottom 55%", scrub: true },
          },
        );

        // Features: rule draws, text rises
        gsap.utils.toArray<HTMLElement>(".st-flist li").forEach((li) => {
          const scrub = { trigger: li, start: "top 95%", end: "top 68%", scrub: true };
          gsap.fromTo(li.querySelector(".rule"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: scrub });
          gsap.fromTo(li.querySelectorAll(".n, p"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: scrub });
        });

        // Stack band slides sideways with the scroll
        const track = rootRef.current?.querySelector<HTMLElement>(".st-stack-track");
        if (track) {
          gsap.fromTo(
            track,
            { x: 0 },
            {
              x: () => -track.scrollWidth / 3,
              ease: "none",
              scrollTrigger: { trigger: ".st-case-stack", start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
            },
          );
        }

        // Gallery: each capture opens up, its image drifts inside the frame
        gsap.utils.toArray<HTMLElement>(".st-gshot").forEach((frame) => {
          const img = frame.querySelector("img");
          gsap.fromTo(
            frame,
            { clipPath: "inset(12% 6% 0% 6% round 14px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 6px)",
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top 98%", end: "top 55%", scrub: true },
            },
          );
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -5 },
              { yPercent: 5, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
            );
          }
        });

        gsap.fromTo(
          ".st-next-name",
          { yPercent: 35 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".st-case-next", start: "top bottom", end: "top 35%", scrub: true } },
        );
      });
    },
    { scope: rootRef },
  );

  const colors = { "--bg": item.bg, "--fg": item.fg } as CSSProperties;

  return (
    <div className="st-case" ref={rootRef} style={colors}>
      <section className="st-case-hero" data-intro={intro} id="top">
        <div className="st-case-top">
          <StLink href="/realisations" className="st-case-back" cursor="Index">
            <Icon name="arrow-left" /> Réalisations
          </StLink>
          <span>
            {typeLabel(item.type)} · {pad(index + 1)} / {pad(CASES.length)}
          </span>
        </div>

        <h1 className="st-case-title" style={{ "--word": longestWord(item.name) } as CSSProperties}>
          <span className="sr-only">
            {item.name}, {item.category}
          </span>
          <MaskChars text={item.name} className="l1" />
          <span className="l2 serif" aria-hidden="true">
            <span className="mask">
              <span>{item.category}</span>
            </span>
          </span>
        </h1>

        <dl className="st-case-facts">
          <div>
            <dt>(Livrable)</dt>
            <dd>
              {typeLabel(item.type)}
              {item.status ? (
                <>
                  <br />
                  {item.status}
                </>
              ) : null}
            </dd>
          </div>
          <div>
            <dt>(Stack)</dt>
            <dd>
              {item.stack.slice(0, 4).map((s) => (
                <span key={s}>{stackLabel(s)}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt>(Périmètre)</dt>
            <dd>{pad(item.features.length)} fonctionnalités clés</dd>
          </div>
          <div className="wide">
            <dt>(En bref)</dt>
            <dd>{item.intro}</dd>
          </div>
        </dl>
      </section>

      <section className="st-case-cover" aria-label="Aperçu principal">
        {item.cover ? (
          <button
            type="button"
            className="st-case-cover-frame"
            onClick={() => setViewer(0)}
            data-cursor="Agrandir"
            aria-label={`Agrandir l'aperçu de ${item.name}`}
          >
            <img src={item.cover.src} alt={`${item.name} : aperçu principal`} decoding="async" />
          </button>
        ) : (
          <div className="st-case-cover-frame st-case-poster" aria-hidden="true">
            <BMark />
            <span>{item.name}</span>
            <small>{item.stackShort}</small>
          </div>
        )}
      </section>

      <section className="st-case-summary" aria-labelledby="st-case-summary-title">
        <div className="st-case-summary-side">
          <p className="st-paren">(Le {kind})</p>
        </div>
        <div className="st-case-summary-body">
          <h2 className="sr-only" id="st-case-summary-title">
            Le {kind} en bref
          </h2>
          <p className="st-case-lit">
            {words.map((word, i) => (
              <span className="w" key={i}>
                {word}{" "}
              </span>
            ))}
          </p>
          <ul className="st-case-tags" aria-label="Mots-clés">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="st-case-features" aria-labelledby="st-case-features-title">
        <div className="st-case-features-head">
          <p className="st-paren">(Ce qu'on a construit)</p>
          <h2 id="st-case-features-title">
            Fonction&shy;nalités <span className="serif">clés</span>
          </h2>
          <span className="st-case-features-count" aria-hidden="true">
            {pad(item.features.length)}
          </span>
        </div>
        <ol className="st-flist">
          {item.features.map((feature, i) => (
            <li key={feature}>
              <span className="n">{pad(i + 1)}</span>
              <p>{feature}</p>
              <span className="rule" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section className="st-case-stack" aria-label={`Technologies : ${item.stack.map(stackLabel).join(", ")}`}>
        <div className="st-stack-track" aria-hidden="true">
          {[0, 1, 2].map((k) =>
            item.stack.map((s) => (
              <span key={`${k}-${s}`}>
                {stackLabel(s)}
                <BMark />
              </span>
            )),
          )}
        </div>
      </section>

      {rows.length ? (
        <section className="st-case-gallery" aria-labelledby="st-case-gallery-title">
          <div className="st-case-gallery-head">
            <h2 className="st-paren" id="st-case-gallery-title">
              (Galerie)
            </h2>
            <span>{pad(item.gallery.length)} captures · cliquer pour agrandir</span>
          </div>
          {rows.map((row, r) => (
            <div className="st-grow" data-kind={row.kind} key={r}>
              {row.shots.map((s) => {
                const i = item.gallery.indexOf(s);
                return (
                  <button
                    type="button"
                    className="st-gshot"
                    key={s.src}
                    onClick={() => setViewer(galleryOffset + i)}
                    data-cursor="Agrandir"
                    aria-label={`Agrandir la capture ${i + 1} de ${item.name}`}
                    style={{ aspectRatio: `${s.w} / ${s.h}` }}
                  >
                    <img src={s.src} alt="" loading="lazy" decoding="async" />
                  </button>
                );
              })}
            </div>
          ))}
        </section>
      ) : null}

      <section className="st-case-next" style={{ "--nbg": next.bg, "--nfg": next.fg } as CSSProperties}>
        <div className="st-case-more">
          <p className="st-paren">(Un {kind} similaire&nbsp;?)</p>
          <StLink href="/contact" className="st-link" cursor="Écrire">
            Parlons-en <Icon name="arrow" />
          </StLink>
        </div>
        <StLink href={next.href} className="st-next" cursor="Suivant">
          <span className="st-next-top">
            <span>({next.type === "agent" ? "Agent suivant" : "Projet suivant"})</span>
            <span>
              {pad(nextIndex + 1)} / {pad(CASES.length)}
            </span>
          </span>
          <span className="st-next-name" style={{ "--word": longestWord(next.name) } as CSSProperties}>
            {next.name}
          </span>
          <span className="st-next-cat">
            <span className="serif">{next.category}</span>
            <Icon name="arrow-up-right" />
          </span>
        </StLink>
      </section>

      {viewer !== null && shots.length ? (
        <Lightbox shots={shots} index={viewer} name={item.name} onIndex={setViewer} onClose={closeViewer} />
      ) : null}
    </div>
  );
}
