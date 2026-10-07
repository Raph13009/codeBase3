import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Icon, clamp, easeOut, prefersReducedMotion } from "@/components/agentic-commerce/shared";

/** Pinned "four foundations": isometric slabs drop in one by one while the rail fills. */
export function StackBuild({ dict }: { dict: Dictionary }) {
  const p = dict.problems;
  const sectionRef = useRef<HTMLElement>(null);
  const isoRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const readyRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const iso = isoRef.current;
    const rail = railRef.current;
    const ready = readyRef.current;
    const root = section?.closest<HTMLElement>(".agentic-commerce");
    if (!section || !iso || !rail || !ready || !root) return;
    const slabs = Array.from(iso.querySelectorAll<HTMLElement>(".slab"));
    const items = Array.from(rail.querySelectorAll<HTMLLIElement>("li"));
    const reduce = prefersReducedMotion();
    const pinQuery = window.matchMedia("(min-width: 961px) and (min-height: 720px)");
    let hover: number | null = null;
    let ticking = false;

    const applyPinMode = () => root.classList.toggle("unpinned", reduce || !pinQuery.matches);
    const setLayers = (act: number, done: boolean) => {
      slabs.forEach((s, i) => {
        s.classList.toggle("act", !done && i === act);
        s.classList.toggle("ghost", !done && act >= 0 && i > act);
      });
      items.forEach((it, i) => it.classList.toggle("on", done || i === act));
    };
    const update = () => {
      ticking = false;
      if (root.classList.contains("unpinned")) {
        slabs.forEach((s) => {
          s.style.setProperty("--o", "1");
          s.style.setProperty("--dz", "0px");
        });
        rail.style.setProperty("--p", "1");
        ready.classList.toggle("on", hover === null);
        setLayers(hover ?? -1, hover === null);
        return;
      }
      const r = section.getBoundingClientRect();
      const progress = clamp(-r.top / (r.height - window.innerHeight));
      slabs.forEach((s, i) => {
        const t =
          hover !== null && i <= hover ? 1 : easeOut(clamp((progress - (i * 0.2 - 0.14)) / 0.16));
        s.style.setProperty("--o", t.toFixed(3));
        s.style.setProperty("--dz", `${((1 - t) * 380).toFixed(1)}px`);
      });
      const done = progress > 0.76;
      const act = Math.min(3, Math.floor((progress + 0.06) / 0.2));
      rail.style.setProperty("--p", clamp((progress + 0.06) / 0.8).toFixed(3));
      ready.classList.toggle("on", done && hover === null);
      iso.style.setProperty("--rz", `${(-48 + progress * 12).toFixed(2)}deg`);
      if (hover !== null) setLayers(hover, false);
      else setLayers(done ? -2 : act, done);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onPinChange = () => {
      applyPinMode();
      update();
    };

    const cleanups: (() => void)[] = [];
    items.forEach((it, i) => {
      const enter = () => {
        hover = i;
        update();
      };
      const leave = () => {
        if (hover === i) {
          hover = null;
          update();
        }
      };
      const onLeave = (e: PointerEvent) => {
        if (e.pointerType !== "touch") leave();
      };
      it.addEventListener("pointerenter", enter);
      it.addEventListener("pointerleave", onLeave);
      it.addEventListener("focus", enter);
      it.addEventListener("blur", leave);
      cleanups.push(() => {
        it.removeEventListener("pointerenter", enter);
        it.removeEventListener("pointerleave", onLeave);
        it.removeEventListener("focus", enter);
        it.removeEventListener("blur", leave);
      });
    });

    applyPinMode();
    update();
    pinQuery.addEventListener("change", onPinChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cleanups.forEach((fn) => fn());
      pinQuery.removeEventListener("change", onPinChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("unpinned");
    };
  }, []);

  const s = p.slabs;

  return (
    <section className="stack-sec" id="capabilities" ref={sectionRef}>
      <div className="wrap stack-sticky">
        <div className="stack-copy">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 className="h2">{p.title}</h2>
          <div className="rail-zone">
            <div className="stage" aria-hidden="true">
              <div className="iso" ref={isoRef}>
                <div className="ground" />
                <div className="slab s1">
                  <i className="edge e2" />
                  <i className="edge e1" />
                  <div className="face">
                    <div className="fh">
                      <span className="fn">01</span>
                      <span className="sl-k">{s.data}</span>
                    </div>
                    <div className="cat">
                      {Array.from({ length: 8 }, (_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                    <div className="tags">
                      {s.dataTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="slab s2">
                  <i className="edge e2" />
                  <i className="edge e1" />
                  <div className="face">
                    <div className="fh">
                      <span className="fn">02</span>
                      <span className="sl-k">{s.checkout}</span>
                    </div>
                    <div className="rows">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="ep">
                      POST /checkout <b>201</b>
                    </span>
                  </div>
                </div>
                <div className="slab s3">
                  <i className="edge e2" />
                  <i className="edge e1" />
                  <div className="face">
                    <div className="fh">
                      <span className="fn">03</span>
                      <span className="sl-k">{s.payment}</span>
                    </div>
                    <div className="mid">
                      <span className="lock">
                        <Icon name="lock" />
                      </span>
                      <div className="okl">
                        {s.consent.map((label) => (
                          <span key={label}>{label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slab s4">
                  <i className="edge e2" />
                  <i className="edge e1" />
                  <div className="face">
                    <div className="fh">
                      <span className="fn">04</span>
                      <span className="sl-k">{s.compliance}</span>
                    </div>
                    <div className="ckl">
                      {s.complianceTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ol className="rail" ref={railRef}>
              {p.items.map((item, i) => (
                <li key={item.title} tabIndex={0}>
                  <small>
                    {p.layer} {i + 1}
                  </small>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
            <span className="ready" ref={readyRef}>
              <span className="live" />
              {p.ready}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
