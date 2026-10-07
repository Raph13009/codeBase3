import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import {
  ASSETS,
  Icon,
  clamp,
  lerp,
  prefersReducedMotion,
} from "@/components/agentic-commerce/shared";

type FieldState = { fixed: boolean; flip: number };

/** Customer view vs agent view of the same product page, with a draggable split. */
export function XRay({ dict }: { dict: Dictionary }) {
  const x = dict.xray;
  const cmpRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const fixRef = useRef<HTMLButtonElement>(null);
  const fixedRef = useRef(false);
  const touchedRef = useRef(false);
  const scoreRef = useRef(6);
  const timers = useRef<number[]>([]);
  const countTimer = useRef(0);
  const [fixed, setFixed] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [score, setScore] = useState(6);
  const [fields, setFields] = useState<FieldState[]>(() =>
    Array.from({ length: 4 }, () => ({ fixed: false, flip: 0 })),
  );

  const applyFixed = (value: boolean) => {
    if (value === fixedRef.current) return;
    const reduce = prefersReducedMotion();
    fixedRef.current = value;
    setFixed(value);
    setNudge(false);

    window.clearInterval(countTimer.current);
    const target = value ? 10 : 6;
    countTimer.current = window.setInterval(
      () => {
        scoreRef.current += Math.sign(target - scoreRef.current);
        setScore(scoreRef.current);
        if (scoreRef.current === target) window.clearInterval(countTimer.current);
      },
      reduce ? 0 : 110,
    );

    const cmp = cmpRef.current;
    if (value && !reduce && cmp) {
      cmp.classList.remove("scanning");
      void cmp.offsetWidth;
      cmp.classList.add("scanning");
    }
    for (let i = 0; i < 4; i++) {
      timers.current.push(
        window.setTimeout(
          () =>
            setFields((prev) =>
              prev.map((f, k) => (k === i ? { fixed: value, flip: f.flip + 1 } : f)),
            ),
          reduce ? 0 : (value ? 560 : 80) + i * 130,
        ),
      );
    }
  };
  const applyRef = useRef(applyFixed);
  applyRef.current = applyFixed;

  // Split slider: drag, keyboard range, and a one-time demo sweep when it comes into view
  useEffect(() => {
    const cmp = cmpRef.current;
    const range = rangeRef.current;
    const fixButton = fixRef.current;
    if (!cmp || !range || !fixButton) return;
    const narrow = window.matchMedia("(max-width: 640px)").matches;
    const reduce = prefersReducedMotion();
    let dragging = false;
    let hinted = false;
    let raf = 0;

    const setSplit = (value: number) => {
      const v = clamp(value, 4, 96);
      cmp.style.setProperty("--split", `${v}%`);
      range.value = String(Math.round(v));
      fixButton.dataset.hide = String(v > (narrow ? 75 : 56));
    };
    setSplit(narrow ? (reduce ? 4 : 96) : 50);

    const fromX = (clientX: number) => {
      const r = cmp.getBoundingClientRect();
      setSplit(((clientX - r.left) / r.width) * 100);
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      hinted = true;
      cmp.dataset.dragging = "true";
      cmp.setPointerCapture(e.pointerId);
      fromX(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) fromX(e.clientX);
    };
    const endDrag = () => {
      dragging = false;
      cmp.dataset.dragging = "false";
    };
    const onRange = () => {
      hinted = true;
      setSplit(Number(range.value));
    };
    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName === "scan") cmp.classList.remove("scanning");
    };
    cmp.addEventListener("pointerdown", onDown);
    cmp.addEventListener("pointermove", onMove);
    cmp.addEventListener("pointerup", endDrag);
    cmp.addEventListener("pointercancel", endDrag);
    cmp.addEventListener("animationend", onAnimationEnd);
    range.addEventListener("input", onRange);

    const autoFix = () => {
      if (touchedRef.current || reduce) return;
      setNudge(true);
      timers.current.push(
        window.setTimeout(() => {
          if (!touchedRef.current) applyRef.current(true);
        }, 900),
      );
    };

    let io: IntersectionObserver | null = null;
    if (!reduce) {
      io = new IntersectionObserver(
        ([entry], observer) => {
          if (!entry.isIntersecting || hinted) return;
          observer.disconnect();
          hinted = true;
          const rest = narrow ? 4 : 50;
          const keys: [number, number][] = narrow
            ? [[0, 96], [1400, 4]]
            : [[0, 50], [900, 12], [1700, 12], [2700, 88], [3400, 88], [4300, 50]];
          const t0 = performance.now();
          const step = (now: number) => {
            if (dragging) return;
            const t = now - t0;
            const k = keys.findIndex(([at]) => at > t);
            if (k === -1) {
              setSplit(rest);
              autoFix();
              return;
            }
            const [ta, va] = keys[k - 1];
            const [tb, vb] = keys[k];
            const u = (t - ta) / (tb - ta);
            setSplit(lerp(va, vb, u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2));
            raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        },
        { threshold: 0.55 },
      );
      io.observe(cmp);
    }

    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
      cmp.removeEventListener("pointerdown", onDown);
      cmp.removeEventListener("pointermove", onMove);
      cmp.removeEventListener("pointerup", endDrag);
      cmp.removeEventListener("pointercancel", endDrag);
      cmp.removeEventListener("animationend", onAnimationEnd);
      range.removeEventListener("input", onRange);
    };
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      window.clearInterval(countTimer.current);
    },
    [],
  );

  const choose = (value: boolean) => {
    touchedRef.current = true;
    applyFixed(value);
  };

  const a = x.agent;
  const badFields: { before: ReactNode; after: ReactNode; badge: string }[] = [
    {
      before: (
        <>
          <b>"checkout"</b>: null
        </>
      ),
      after: (
        <>
          <b>"checkout"</b>: ["UCP", "ACP"]
        </>
      ),
      badge: a.badges.checkout,
    },
    {
      before: (
        <>
          <b>"shipping"</b>: "{a.shippingText}"
        </>
      ),
      after: (
        <>
          <b>"shipping"</b>: {'{"price": 4.90, "days": [2, 3], "free_over": 150}'}
        </>
      ),
      badge: a.badges.shipping,
    },
    {
      before: (
        <>
          <b>"gtin"</b>: null
        </>
      ),
      after: (
        <>
          <b>"gtin"</b>: "3760142830954"
        </>
      ),
      badge: a.badges.gtin,
    },
    {
      before: (
        <>
          <b>"return_policy"</b>: null
        </>
      ),
      after: (
        <>
          <b>"return_policy"</b>: {'{"days": 30, "free": true}'}
        </>
      ),
      badge: a.badges.returns,
    },
  ];

  const renderBad = (index: number) => {
    const field = badFields[index];
    const state = fields[index];
    return (
      <div
        key={`${index}-${state.flip}`}
        className={`f${state.fixed ? "" : " bad"}${state.flip ? " flip" : ""}`}
      >
        <code>{state.fixed ? field.after : field.before}</code>
        <span className="fs">
          {state.fixed ? (
            <Icon name="check" />
          ) : (
            <>
              <Icon name="x" />
              <em>{field.badge}</em>
            </>
          )}
        </span>
      </div>
    );
  };

  const goodField = (content: ReactNode) => (
    <div className="f">
      <code>{content}</code>
      <span className="fs">
        <Icon name="check" />
      </span>
    </div>
  );

  return (
    <section className="xray" id="lecture">
      <div className="wrap xray-grid">
        <div className="xray-copy">
          <div>
            <p className="eyebrow">{x.eyebrow}</p>
            <h2 className="h2">{x.title}</h2>
          </div>
          <p className="lead">{x.lead}</p>
          <div className="seg-wrap">
            <div
              className={`seg${fixed ? " on" : ""}${nudge ? " nudge" : ""}`}
              role="group"
              aria-label={x.group}
            >
              <button type="button" className="seg-b" data-v="0" aria-pressed={!fixed} onClick={() => choose(false)}>
                {x.today}
              </button>
              <button type="button" className="seg-b" data-v="1" aria-pressed={fixed} onClick={() => choose(true)}>
                <Icon name="spark" />
                {x.withBoost}
              </button>
              <i className="seg-thumb" />
            </div>
            <p className="seg-note">{x.note}</p>
          </div>
          <div className="meter" aria-live="polite">
            <strong>{score}/10</strong>
            <div className="meter-r">
              <span>{x.meter}</span>
              <div className="meter-bar">
                <i style={{ "--m": `${(fixed ? 10 : 6) * 10}%` } as CSSProperties} />
              </div>
            </div>
          </div>
        </div>

        <div className="cmp" ref={cmpRef} style={{ "--split": "50%" } as CSSProperties}>
          <span className="cmp-tag l">{x.tagClient}</span>
          <div className="shop" aria-hidden="true">
            <div className="shop-info">
              <div className="sh-bar">
                <b>{x.shop.brand}</b>
                <span>{x.shop.categories}</span>
              </div>
              <div className="sh-crumb">{x.shop.crumb}</div>
              <p className="sh-title">{x.shop.title}</p>
              <div className="sh-price">{x.shop.price}</div>
              <div className="sh-stock">{x.shop.stock}</div>
              <div className="sh-var">
                <span>{x.shop.variant}</span>
                <span>▾</span>
              </div>
              <div className="sh-cta">{x.shop.cta}</div>
              <div className="sh-ship">{x.shop.shipping}</div>
              <div className="sh-foot">
                <span>{x.shop.returns}</span>
                <span>{x.shop.reference}</span>
              </div>
            </div>
            <div className="shop-img">
              <img src={ASSETS.headphonesSand} alt="" />
            </div>
          </div>

          <div className="xr-agent" aria-hidden="true">
            <span className="cmp-tag r">{x.tagAgent}</span>
            <i className="xr-scan" />
            <div className="shop">
              <div className="ag-head">
                <span className="ag-k">{a.request}</span>
                <div className="ag-req">
                  <span className="m">GET</span>/products/cq-119
                </div>
                <code className="ag-meta">
                  Host: maison-tympan.fr
                  <br />
                  Accept: application/json
                </code>
                {goodField(
                  <>
                    <b>"images"</b>: ["cq-119.jpg"]
                  </>,
                )}
              </div>
              <div className="shop-info">
                <div className="ag-res">
                  <span className="st">200</span>
                  <span>{a.fields}</span>
                </div>
                {goodField(
                  <>
                    <b>"category"</b>: "{a.category}"
                  </>,
                )}
                {goodField(
                  <>
                    <b>"title"</b>: "{x.shop.title}"
                  </>,
                )}
                {goodField(
                  <>
                    <b>"price"</b>: {'{"value": 119.00, "currency": "EUR"}'}
                  </>,
                )}
                {goodField(
                  <>
                    <b>"availability"</b>: "in_stock"
                  </>,
                )}
                {goodField(
                  <>
                    <b>"variants"</b>: {a.variants}
                  </>,
                )}
                {renderBad(0)}
                {renderBad(1)}
                <div className="f-stack">
                  {renderBad(2)}
                  {renderBad(3)}
                </div>
              </div>
            </div>
          </div>

          <button
            className={`xr-fix${fixed ? " done" : ""}`}
            ref={fixRef}
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => choose(!fixedRef.current)}
          >
            <span className="xr-fix-ic">
              <Icon name="spark" />
            </span>
            <span className="xr-fix-t">{fixed ? x.undo : x.fix}</span>
          </button>
          <span className="cmp-line">
            <span className="cmp-knob">
              <Icon name="swap" />
            </span>
          </span>
          <input
            className="cmp-range sr"
            ref={rangeRef}
            type="range"
            min={4}
            max={96}
            defaultValue={50}
            aria-label={x.range}
          />
        </div>
      </div>
    </section>
  );
}
