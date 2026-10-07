import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import {
  ASSETS,
  Icon,
  Rich,
  prefersReducedMotion,
} from "@/components/agentic-commerce/shared";

const CARD_ICONS = ["search", "plug", "shield"];
const OFFER_IMAGES = [ASSETS.headphonesBlack, ASSETS.headphonesSand, ASSETS.headphonesBlue];

/** Three expanding cards; the open one plays its animated explainer then hands over to the next. */
export function WhyDeck({ dict }: { dict: Dictionary }) {
  const w = dict.whyNow;
  const deckRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  const [off, setOff] = useState(false);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const io = new IntersectionObserver(([entry]) => setOff(!entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(deck);
    return () => io.disconnect();
  }, []);

  const vizFor = (index: number) => {
    if (index === 0) return <VizSearch dict={dict} />;
    if (index === 1) return <VizProtocols dict={dict} />;
    return <VizEurope dict={dict} />;
  };

  return (
    <div className="why">
      <div className="why-head">
        <div>
          <p className="eyebrow">{w.eyebrow}</p>
          <h3 className="why-title">{w.heading}</h3>
        </div>
        <p className="why-hint">{w.hint}</p>
      </div>
      <div className={`deck${off ? " off" : ""}`} ref={deckRef}>
        {w.items.map((item, i) => {
          const isOn = open === i;
          return (
            <article className={`wc${isOn ? " is-on" : ""}`} key={item.title}>
              <button
                className="wc-hit"
                type="button"
                id={`wh${i}`}
                aria-expanded={isOn}
                aria-controls={`wb${i}`}
                onClick={() => setOpen(i)}
              >
                <span className="wc-top">
                  <span className="wc-ic">
                    <Icon name={CARD_ICONS[i]} />
                  </span>
                  <span className="wc-plus" aria-hidden="true" />
                </span>
                <span className="wc-name">{item.title}</span>
              </button>
              <div className="wc-body" id={`wb${i}`} role="region" aria-labelledby={`wh${i}`}>
                <div className="wc-copy">
                  <span className="wc-ic">
                    <Icon name={CARD_ICONS[i]} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="fact">
                      <Rich text={item.fact} />
                    </p>
                  </div>
                </div>
                {vizFor(i)}
              </div>
              <i
                className="wc-prog"
                onAnimationEnd={() => {
                  if (!prefersReducedMotion() && isOn) setOpen((i + 1) % w.items.length);
                }}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}

function VizSearch({ dict }: { dict: Dictionary }) {
  const v = dict.whyNow.search;
  return (
    <div className="vz" aria-hidden="true">
      <div className="va-bar">
        <Icon name="search" />
        <span className="va-q">{v.query}</span>
      </div>
      <div className="va-stage">
        <div className="va-links ph-a">
          <small>{v.links}</small>
          {[0, 1, 2, 3].map((row) => (
            <div className="va-row" key={row}>
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className="va-answer ph-b">
          <span className="va-k">
            <Icon name="spark" /> {v.answerLabel}
          </span>
          <p>{v.answer}</p>
          <div className="va-chips">
            {v.offers.map((offer, i) => (
              <span key={offer.merchant}>
                <img src={OFFER_IMAGES[i]} alt="" />
                <b>{offer.merchant}</b>
                <em>{offer.detail}</em>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="vz-leg">
        <span className="la">{v.legend[0]}</span>
        <span className="lb">{v.legend[1]}</span>
      </div>
    </div>
  );
}

const AGENT_Y = [60, 125, 190];
const MERCHANT_Y = [45, 100, 155, 210];

function VizProtocols({ dict }: { dict: Dictionary }) {
  const v = dict.whyNow.protocols;
  return (
    <div className="vz" aria-hidden="true">
      <svg className="vb-svg" viewBox="0 0 360 230" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="hubg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff416c" />
            <stop offset="1" stopColor="#e94057" />
          </linearGradient>
        </defs>
        <text x="30" y="16" textAnchor="middle">
          {v.agents}
        </text>
        <text x="330" y="16" textAnchor="middle">
          {v.merchants}
        </text>
        <g className="mesh">
          {AGENT_Y.flatMap((ay) =>
            MERCHANT_Y.map((my) => (
              <line key={`${ay}-${my}`} x1="30" y1={ay} x2="330" y2={my} pathLength={1} />
            )),
          )}
        </g>
        <g className="hub">
          {AGENT_Y.map((ay) => (
            <path key={`a${ay}`} d={`M30 ${ay} C105 ${ay} 105 125 152 125`} pathLength={1} />
          ))}
          {MERCHANT_Y.map((my) => (
            <path key={`m${my}`} d={`M208 125 C255 125 255 ${my} 330 ${my}`} pathLength={1} />
          ))}
          <circle cx="180" cy="125" r="28" />
          <text x="180" y="129" textAnchor="middle">
            UCP·ACP
          </text>
        </g>
        {AGENT_Y.map((ay) => (
          <circle key={`na${ay}`} className="node" cx="30" cy={ay} r="7" />
        ))}
        {MERCHANT_Y.map((my) => (
          <circle key={`nm${my}`} className="node-m" cx="330" cy={my} r="7" />
        ))}
      </svg>
      <div className="vb-num">
        <div className="ph-a">
          <strong>12</strong>
          <span>{v.customLabel}</span>
        </div>
        <div className="ph-b">
          <strong>7</strong>
          <span>{v.protocolLabel}</span>
        </div>
      </div>
      <div className="vz-leg">
        <span className="la">{v.legend[0]}</span>
        <span className="lb">{v.legend[1]}</span>
      </div>
    </div>
  );
}

function VizEurope({ dict }: { dict: Dictionary }) {
  const v = dict.whyNow.europe;
  const checkpoints = (
    <div className="vc-line">
      <i className="vc-dot" />
      {v.checkpoints.map((cp) => (
        <span className="cp" key={cp}>
          {cp}
        </span>
      ))}
    </div>
  );
  return (
    <div className="vz" aria-hidden="true">
      <div className="vc-track gen">
        <span className="vc-lab">
          {v.generic}
          <em>{v.genericResult}</em>
        </span>
        {checkpoints}
      </div>
      <div className="vc-sep" />
      <div className="vc-track boost">
        <span className="vc-lab">
          {v.boost}
          <em>{v.boostResult}</em>
        </span>
        {checkpoints}
      </div>
      <div className="vz-leg">
        {v.legend.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
