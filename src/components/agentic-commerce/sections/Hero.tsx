import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { Icon, prefersReducedMotion } from "@/components/agentic-commerce/shared";
import { AgentConsole } from "@/components/agentic-commerce/sections/AgentConsole";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const ROTATE_MS = 2800;
const SWAP_MS = 420;

export function Hero({ locale, dict }: Props) {
  const { hero } = dict;
  const rotRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const before = hero.titleBefore.split(" ");
  const after = hero.titleAfter.split(" ");

  // Rotating word: slide out, swap, slide back in, then redraw the underline
  useEffect(() => {
    const rot = rotRef.current;
    const word = wordRef.current;
    const measure = measureRef.current;
    if (!rot || !word || !measure) return;
    const words = hero.rotating;
    const reduce = prefersReducedMotion();
    let index = 0;
    const timers: number[] = [];

    const fit = () => {
      measure.textContent = words[index];
      rot.style.width = `${Math.ceil(measure.getBoundingClientRect().width + 2)}px`;
    };
    fit();
    timers.push(window.setTimeout(() => rot.classList.add("lined"), reduce ? 0 : 1100));

    let interval = 0;
    if (!reduce) {
      interval = window.setInterval(() => {
        if (document.hidden) return;
        word.classList.add("out");
        rot.classList.remove("lined");
        timers.push(
          window.setTimeout(() => {
            index = (index + 1) % words.length;
            word.textContent = words[index];
            fit();
            word.classList.remove("out");
            word.classList.add("in");
            void word.offsetWidth;
            word.classList.remove("in");
            rot.classList.add("lined");
          }, SWAP_MS),
        );
      }, ROTATE_MS);
    }

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("resize", onResize);
    };
  }, [hero.rotating]);

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-meta">
          <span className="tag">{hero.tag}</span>
          <span className="badge">
            <span className="live" />
            {hero.badge}
          </span>
          <Link
            className="badge"
            to={dict.nav.switchHref}
            hrefLang={locale === "en" ? "fr" : "en"}
            onClick={() => trackAgenticEvent("nav_lang", { locale })}
          >
            {dict.nav.switchLabel}
          </Link>
        </div>

        <h1 className="hero-title">
          <span className="sr">{hero.h1}</span>
          <span aria-hidden="true">
            {before.map((w, i) => (
              <Fragment key={`b${i}`}>
                <span className="w">
                  <span style={{ "--i": i } as CSSProperties}>{w}</span>
                </span>{" "}
              </Fragment>
            ))}
            <span className="w rot" ref={rotRef}>
              <span style={{ "--i": before.length } as CSSProperties}>
                <span className="rot-word" ref={wordRef}>
                  {hero.rotating[0]}
                </span>
              </span>
              <i className="rot-line" />
            </span>{" "}
            {after.map((w, i) => (
              <Fragment key={`a${i}`}>
                <span className="w">
                  <span style={{ "--i": before.length + 1 + i } as CSSProperties}>{w}</span>
                </span>
                {i < after.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
          <span className="rot-measure" ref={measureRef} aria-hidden="true" />
        </h1>

        <div className="hero-foot">
          <p className="lead">{hero.subtitle}</p>
          <div className="hero-actions">
            <div className="row">
              <a
                className="btn btn-solid mag"
                href="#assess"
                onClick={() => trackAgenticEvent("cta_primary", { location: "hero" })}
              >
                {hero.ctaPrimary} <Icon name="arrow" />
              </a>
              <a
                className="btn btn-outline mag"
                href="#demo"
                onClick={() => trackAgenticEvent("cta_secondary", { location: "hero" })}
              >
                {hero.ctaDemo} <Icon name="down" />
              </a>
            </div>
            <p className="reassure">{hero.reassurance}</p>
          </div>
        </div>

        <AgentConsole dict={dict} />
      </div>
    </section>
  );
}
