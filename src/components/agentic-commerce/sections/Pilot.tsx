import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { Scrub } from "@/components/agentic-commerce/Scrub";
import { Magnetic } from "@/components/agentic-commerce/fx";
import { PilotPreview } from "@/components/agentic-commerce/PilotPreviews";

const PREVIEW_W = 320;
const PREVIEW_OFFSET = 32;

/** Pilot steps as big typographic rows; a mini UI of the hovered step follows the cursor. */
export function Pilot({ dict }: { dict: Dictionary }) {
  const steps = dict.pilot.steps;
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (hovered !== null) setShown(hovered);
  }, [hovered]);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

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
      preview.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };
    const onMove = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      // Float above the cursor so the hovered row stays readable (below it near the top)
      const h = preview.offsetHeight;
      tx = Math.min(Math.max(px - PREVIEW_W / 2, 0), rect.width - PREVIEW_W);
      ty = py - h - PREVIEW_OFFSET < -PREVIEW_OFFSET ? py + PREVIEW_OFFSET : py - h - PREVIEW_OFFSET;
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
      data-scene="cream"
      className="mx-auto max-w-[1728px] scroll-mt-24 px-4 py-28 sm:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1648px]">
        <Scrub className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="ac-h2 max-w-3xl text-[var(--fg)]">{dict.pilot.title}</h2>
          <div className="flex max-w-sm flex-col items-start gap-6">
            <p className="text-[15px] leading-relaxed text-[var(--fg-muted)]">{dict.pilot.subtitle}</p>
            <Magnetic>
              <a
                href="#assess"
                className="ac-pill ac-pill-invert"
                onClick={() => trackAgenticEvent("cta_primary", { location: "pilot" })}
              >
                {dict.hero.ctaPrimary}
              </a>
            </Magnetic>
          </div>
        </Scrub>

        <Scrub className="mt-16 md:mt-24" distance={80}>
          <div ref={listRef} className="relative" onPointerLeave={() => setHovered(null)}>
            <ol className="border-t border-[var(--fg)]">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  onPointerEnter={() => setHovered(index)}
                  className={`group grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 border-b border-[var(--line)] py-8 transition-opacity duration-300 md:grid-cols-[120px_1.3fr_1fr] md:items-center md:py-12 ${
                    hovered !== null && hovered !== index ? "md:opacity-30" : ""
                  }`}
                >
                  <span className="ac-label ac-tabular pt-2 text-[var(--fg-muted)] md:pt-0">0{index + 1}</span>
                  <h3 className="text-[clamp(30px,4.4vw,68px)] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--fg)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:group-hover:translate-x-5">
                    {step.title}
                  </h3>
                  <p className="col-start-2 mt-3 max-w-md text-[15px] leading-relaxed text-[var(--fg-muted)] md:col-start-3 md:mt-0">
                    {step.description}
                  </p>
                  {/* Devices without hover: show the preview inline */}
                  <div className="col-start-2 mt-6 w-full max-w-[340px] md:col-span-2 md:col-start-2 [@media(hover:hover)]:hidden">
                    <PilotPreview index={index} dict={dict} />
                  </div>
                </li>
              ))}
            </ol>

            <div
              ref={previewRef}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden transition-[opacity,scale] duration-300 ease-out [@media(hover:hover)]:block"
              style={{
                width: PREVIEW_W,
                opacity: hovered === null ? 0 : 1,
                scale: hovered === null ? "0.9" : "1",
              }}
              aria-hidden="true"
            >
              <PilotPreview key={shown} index={shown} dict={dict} />
            </div>
          </div>
        </Scrub>
      </div>
    </section>
  );
}
