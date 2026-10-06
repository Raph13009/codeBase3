import { useEffect, useRef, type ReactNode } from "react";

/** Homepage product photography (mint still lifes). */
export const IMG = {
  serum: "/lp/LP-BC/img/G8.jpg",
  earbuds: "/lp/LP-BC/img/G10.jpg",
  roller: "/lp/LP-BC/img/G6.jpg",
  silk: "/lp/LP-BC/img/G7.jpg",
  cherub: "/lp/LP-BC/img/G3.jpg",
  cherubRose: "/lp/LP-BC/img/G2.jpg",
} as const;

const finePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Moves every `[data-depth]` child with the pointer (and a little with scroll).
 * `data-depth` is the max offset in px; negative values move the other way.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    const pointer = finePointer();
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let scroll = 0;
    let raf = 0;
    let running = false;

    const render = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      for (const el of layers) {
        const depth = Number(el.dataset.depth);
        const y = cy * depth - scroll * (Math.abs(depth) / 90);
        el.style.transform = `translate3d(${(cx * depth).toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    const onScroll = () => {
      scroll = Math.min(window.scrollY, 1200);
      running = false;
      cancelAnimationFrame(raf);
      kick();
    };

    if (pointer) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ref;
}

/** Wraps a button/link so it leans toward the cursor (fine pointers only). */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-flex transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${className}`}
    >
      {children}
    </span>
  );
}

export function Icon({
  name,
  size = 18,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
