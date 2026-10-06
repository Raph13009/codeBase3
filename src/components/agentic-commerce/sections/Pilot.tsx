import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { Reveal } from "@/components/agentic-commerce/Reveal";
import { IMG, Magnetic } from "@/components/agentic-commerce/fx";

const IMAGES = [IMG.cherubRose, IMG.earbuds, IMG.roller];
const PREVIEW_W = 220;
const PREVIEW_H = 280;

/** Pilot steps as big typographic rows; a photo follows the cursor on hover. */
export function Pilot({ dict }: { dict: Dictionary }) {
  const steps = dict.pilot.steps;
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let running = false;
    let placed = false;

    const render = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      preview.style.transform = `translate3d(${(x - PREVIEW_W / 2).toFixed(1)}px, ${(y - PREVIEW_H / 2).toFixed(1)}px, 0)`;
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };
    const onMove = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (!placed) {
        x = tx;
        y = ty;
        placed = true;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    const onLeave = () => {
      placed = false;
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="pilot"
      className="mx-auto max-w-[1728px] scroll-mt-24 px-4 py-28 sm:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1648px]">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="ac-h2 max-w-3xl text-ac-on-surface">
            {dict.pilot.title}
          </h2>
          <div className="flex max-w-sm flex-col items-start gap-6">
            <p className="text-[15px] leading-relaxed text-ac-muted">
              {dict.pilot.subtitle}
            </p>
            <Magnetic>
              <a
                href="#assess"
                className="ac-pill ac-pill-dark"
                onClick={() =>
                  trackAgenticEvent("cta_primary", { location: "pilot" })
                }
              >
                {dict.hero.ctaPrimary}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal className="mt-16 md:mt-24">
          <div
            ref={listRef}
            className="relative"
            onPointerLeave={() => setHovered(null)}
          >
            <ol className="border-t border-[#1b1b1b]">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  onPointerEnter={() => setHovered(index)}
                  className={`group relative z-10 grid grid-cols-[44px_1fr] gap-x-4 border-b border-[var(--ac-line)] py-8 transition-opacity duration-300 md:grid-cols-[120px_1.3fr_1fr] md:items-center md:py-12 ${
                    hovered !== null && hovered !== index ? "md:opacity-30" : ""
                  }`}
                >
                  <span className="ac-label ac-tabular pt-2 text-ac-muted md:pt-0">
                    0{index + 1}
                  </span>
                  <h3 className="text-[clamp(30px,4.4vw,68px)] font-bold leading-[0.98] tracking-[-0.05em] text-ac-on-surface transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:group-hover:translate-x-5">
                    {step.title}
                  </h3>
                  <p className="col-start-2 mt-3 max-w-md text-[15px] leading-relaxed text-ac-muted md:col-start-3 md:mt-0">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            <div
              ref={previewRef}
              className="pointer-events-none absolute left-0 top-0 z-0 hidden overflow-hidden rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-[opacity,scale] duration-300 ease-out [@media(hover:hover)]:block"
              style={{
                width: PREVIEW_W,
                height: PREVIEW_H,
                opacity: hovered === null ? 0 : 1,
                scale: hovered === null ? "0.85" : "1",
              }}
              aria-hidden="true"
            >
              {IMAGES.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                  style={{ opacity: hovered === index ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
