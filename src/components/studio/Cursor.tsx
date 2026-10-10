import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/studio/motion";

/**
 * Dot + trailing ring (difference blend). Elements with data-cursor="Label"
 * swap the ring for a pill badge; links and buttons grow the ring.
 */
export function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const badge = badgeRef.current;
    const label = labelRef.current;
    if (!wrap || !dot || !ring || !badge || !label) return;
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let bx = x;
    let by = y;
    let raf = 0;
    let visible = false;

    const place = (el: HTMLElement, px: number, py: number) => {
      el.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      bx += (x - bx) * 0.26;
      by += (y - by) * 0.26;
      place(ring, rx, ry);
      place(badge, bx, by);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      place(dot, x, y);
      if (!visible) {
        visible = true;
        rx = bx = x;
        ry = by = y;
        wrap.dataset.visible = "true";
      }
    };

    const setState = (target: Element | null) => {
      const el = target?.closest<HTMLElement>("[data-cursor], a, button, input, textarea, label, select");
      const text = el?.matches("input, textarea, select");
      const tag = el?.dataset.cursor;
      if (tag) {
        label.textContent = tag;
        badge.dataset.on = "true";
        wrap.dataset.state = "badge";
      } else {
        badge.dataset.on = "false";
        wrap.dataset.state = text ? "text" : el ? "link" : "";
      }
    };

    const onOver = (e: PointerEvent) => setState(e.target as Element);
    const onLeave = (e: PointerEvent) => {
      if (e.relatedTarget) return;
      visible = false;
      wrap.dataset.visible = "false";
      badge.dataset.on = "false";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onLeave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="st-cursor" ref={wrapRef} aria-hidden="true">
        <div className="st-cursor-dot" ref={dotRef} />
        <div className="st-cursor-ring" ref={ringRef}>
          <i />
        </div>
      </div>
      <div className="st-cursor-badge" ref={badgeRef} aria-hidden="true">
        <span ref={labelRef} />
        <svg className="ico" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}
