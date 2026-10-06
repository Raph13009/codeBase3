import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { Reveal } from "@/components/agentic-commerce/Reveal";
import { IMG } from "@/components/agentic-commerce/fx";

const IMAGES = [IMG.serum, IMG.earbuds, IMG.roller, IMG.silk];
const GRID = "grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4";

/**
 * Catalogue seen two ways: the customer layer, and an "agent" layer revealed
 * through a lens that follows the cursor (or wanders on its own when idle).
 */
export function AgentLens({ dict }: { dict: Dictionary }) {
  const { lens } = dict;
  const stageRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef(false);
  const [revealAll, setRevealAll] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    revealRef.current = revealAll;
  }, [revealAll]);

  useEffect(() => {
    const stage = stageRef.current;
    const agent = agentRef.current;
    const ring = ringRef.current;
    if (!stage || !agent || !ring) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTouch(!fine);

    let w = stage.clientWidth;
    let h = stage.clientHeight;
    let baseR = w < 640 ? 88 : 150;
    let x = w * 0.3;
    let y = h * 0.45;
    let tx = x;
    let ty = y;
    let r = baseR;
    let t = 0;
    let last = performance.now();
    let pointerActive = false;
    let touchTimer = 0;
    let visible = false;
    let raf = 0;

    const sizeRing = () => {
      ring.style.width = `${baseR * 2}px`;
      ring.style.height = `${baseR * 2}px`;
    };
    sizeRing();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!pointerActive) {
        if (reduce) {
          tx = w / 2;
          ty = h / 2;
        } else {
          t += dt;
          // Wander while keeping the whole ring inside the stage
          const ax = Math.max(0, w / 2 - baseR * 1.05);
          const ay = Math.max(0, h / 2 - baseR * 1.05);
          tx = w / 2 + ax * Math.sin(t * 0.42);
          ty = h / 2 + ay * Math.sin(t * 0.67 + 1);
        }
      }

      const follow = 1 - Math.pow(1 - 0.14, dt * 60);
      const grow = 1 - Math.pow(1 - 0.09, dt * 60);
      const targetR = revealRef.current ? Math.hypot(w, h) : baseR;
      x += (tx - x) * follow;
      y += (ty - y) * follow;
      r += (targetR - r) * grow;

      agent.style.clipPath = `circle(${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
      ring.style.transform = `translate3d(${(x - baseR).toFixed(1)}px, ${(y - baseR).toFixed(1)}px, 0)`;
      ring.style.opacity = revealRef.current ? "0" : "1";

      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(stage);

    const ro = new ResizeObserver(() => {
      w = stage.clientWidth;
      h = stage.clientHeight;
      baseR = w < 640 ? 88 : 150;
      sizeRing();
    });
    ro.observe(stage);

    const local = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerActive = true;
      local(event);
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerActive = false;
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      pointerActive = true;
      local(event);
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(() => {
        pointerActive = false;
      }, 2600);
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(touchTimer);
      io.disconnect();
      ro.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <section className="px-3 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1648px] rounded-[32px] bg-[var(--ac-ink)] px-4 py-10 text-[#faf9f5] sm:px-8 md:rounded-[48px] md:px-12 md:py-16">
        <Reveal className="flex flex-col gap-8 px-1 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="ac-label flex items-center gap-2 text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              {lens.label}
            </p>
            <h2 className="ac-h2 mt-5 max-w-2xl">{lens.title}</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              {dict.market.p2}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <span className="text-[13px] text-white/40">
              {touch ? lens.hintTouch : lens.hint}
            </span>
            <button
              type="button"
              className="ac-pill ac-pill-ghost"
              aria-pressed={revealAll}
              onClick={() => {
                setRevealAll((value) => !value);
                trackAgenticEvent("lens_reveal_all", { on: !revealAll });
              }}
            >
              {revealAll ? lens.hide : lens.reveal}
            </button>
          </div>
        </Reveal>

        <div
          ref={stageRef}
          className="relative mt-10 touch-pan-y select-none md:mt-14 [@media(hover:hover)]:cursor-none"
        >
          {/* Customer layer */}
          <div className={GRID}>
            {lens.products.map((product, index) => (
              <article
                key={product.name}
                className="overflow-hidden rounded-[22px] bg-[var(--ac-card)] text-ac-on-surface md:rounded-[28px]"
              >
                <img
                  src={IMAGES[index]}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div className="flex h-[112px] flex-col justify-between p-4 md:h-[128px] md:p-5">
                  <div>
                    <h3 className="text-[14px] font-bold leading-tight tracking-tight md:text-[16px]">
                      {product.name}
                    </h3>
                    <p className="ac-tabular mt-1 text-[14px]">{product.price}</p>
                  </div>
                  <p className="flex items-center gap-1.5 text-[12px] text-ac-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {lens.inStock}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Agent layer, clipped to the lens */}
          <div
            ref={agentRef}
            className={`ac-lens-agent pointer-events-none absolute inset-0 ${GRID}`}
            style={{ clipPath: "circle(0px at 50% 50%)" }}
            aria-hidden="true"
          >
            {lens.products.map((product, index) => (
              <div
                key={product.name}
                className="overflow-hidden rounded-[22px] bg-[#151515] ring-1 ring-inset ring-white/15 md:rounded-[28px]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={IMAGES[index]}
                    alt=""
                    className="h-full w-full object-cover brightness-[0.38] contrast-125 grayscale"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <div className="ac-dots absolute inset-0 opacity-70" />
                  <div className="ac-scan" style={{ "--delay": `${index * 0.5}s` } as CSSProperties} />
                  <div className="absolute inset-[17%] border border-white/70">
                    <Corner className="-left-px -top-px border-l-2 border-t-2" />
                    <Corner className="-right-px -top-px border-r-2 border-t-2" />
                    <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
                    <Corner className="-bottom-px -right-px border-b-2 border-r-2" />
                    <span className="ac-tabular absolute -left-px -top-[21px] bg-white px-1.5 py-[3px] text-[10px] font-bold leading-none text-black">
                      {lens.detected} · 0.9{8 - index}
                    </span>
                  </div>
                </div>
                <dl className="ac-tabular flex h-[112px] flex-col justify-center gap-[5px] px-4 text-[11px] md:h-[128px] md:px-5 md:text-[12px]">
                  {product.fields.map((field) => (
                    <div key={field.key} className="flex items-baseline justify-between gap-2">
                      <dt className="text-white/40">{field.key}</dt>
                      <dd className="truncate font-semibold text-white">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Lens ring */}
          <div
            ref={ringRef}
            className="pointer-events-none absolute left-0 top-0 rounded-full border border-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_30px_80px_rgba(0,0,0,0.45)] transition-opacity duration-300"
            aria-hidden="true"
          >
            <span className="ac-label absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-[#faf9f5] px-3 py-1.5 text-[10px] text-[#0b0b0b]">
              {lens.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-3 w-3 border-white ${className}`} />;
}
