import { useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";

/** FAQ: each answer toggles on its own; answers stay in the DOM for crawlers. */
export function FAQ({ dict }: { dict: Dictionary }) {
  const f = dict.faq;
  const [open, setOpen] = useState<boolean[]>(() => f.items.map((_, i) => i === 0));

  return (
    <section className="faq" id="faq">
      <div className="wrap aud-grid">
        <div className="aud-head">
          <p className="eyebrow">{f.eyebrow}</p>
          <h2 className="h2">{f.title}</h2>
        </div>
        <div>
          {f.items.map((item, i) => (
            <div className={`qa${open[i] ? " open" : ""}`} key={item.question}>
              <h3>
                <button
                  className="qa-b"
                  type="button"
                  id={`qb${i}`}
                  aria-expanded={open[i]}
                  aria-controls={`qp${i}`}
                  onClick={() => setOpen((prev) => prev.map((v, k) => (k === i ? !v : v)))}
                >
                  {item.question}
                  <span className="pm" aria-hidden="true" />
                </button>
              </h3>
              <div className="qa-a" id={`qp${i}`} role="region" aria-labelledby={`qb${i}`}>
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
