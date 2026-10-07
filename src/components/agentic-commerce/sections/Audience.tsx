import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Icon } from "@/components/agentic-commerce/shared";

/** Who it's for: sticky heading, oversized list with a hover arrow. */
export function Audience({ dict }: { dict: Dictionary }) {
  const a = dict.audience;
  return (
    <section className="aud" id="audience">
      <div className="wrap aud-grid">
        <div className="aud-head">
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 className="h2">{a.title}</h2>
        </div>
        <ul className="aud-list">
          {a.items.map((item) => (
            <li key={item}>
              <span>{item}</span>
              <Icon name="arrow" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
