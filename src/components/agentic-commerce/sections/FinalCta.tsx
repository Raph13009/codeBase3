import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { ASSETS } from "@/components/agentic-commerce/shared";

/** Closing call to action before the shared footer. */
export function FinalCta({ dict }: { dict: Dictionary }) {
  return (
    <section className="cta wrap">
      <img src={ASSETS.logo} alt="" />
      <h2>{dict.cta.title}</h2>
      <div className="row">
        <a className="btn btn-outline mag" href="#demo">
          {dict.cta.demo}
        </a>
        <a
          className="btn btn-solid mag"
          href="#assess"
          onClick={() => trackAgenticEvent("cta_primary", { location: "final" })}
        >
          {dict.cta.assess}
        </a>
      </div>
    </section>
  );
}
