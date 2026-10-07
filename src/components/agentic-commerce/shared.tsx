import { Fragment } from "react";

export const ASSETS = {
  logo: "/brand/boostai-logo-128.png",
  headphonesSand: "/agentic-commerce/casque-sable.jpg",
  headphonesBlack: "/agentic-commerce/casque-noir.jpg",
  headphonesBlue: "/agentic-commerce/casque-bleu-nuit.jpg",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Inline SVG icon from the page sprite (see IconSprite). */
export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg className={`ico ${className}`.trim()} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Renders `**bold**` segments of a copy string. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Icon symbols used across the page (rendered once, hidden). */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.6L19.5 10l-5.7 1.5L12 17l-1.8-5.5L4.5 10l5.7-1.4z" /><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17" /></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></symbol>
      <symbol id="i-box" viewBox="0 0 24 24"><path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z" /><path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" /></symbol>
      <symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2.5l2.2 10.5h10.6L20.5 8H7" /><circle cx="9.5" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></symbol>
      <symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h4" /></symbol>
      <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></symbol>
      <symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 6.5h11v9H3zM14 9.5h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4.5 3.5v-3.5h0a2 2 0 0 1-2-2z" /></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" /></symbol>
      <symbol id="i-plug" viewBox="0 0 24 24"><path d="M9 3.5v4M15 3.5v4M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0zM12 16v4.5" /></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.5l7.5 3v5.5c0 4.5-3.2 7.5-7.5 8.5-4.3-1-7.5-4-7.5-8.5V6.5z" /><path d="M9 12l2.2 2.2L15.5 10" /></symbol>
      <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" /></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" /></symbol>
      <symbol id="i-pause" viewBox="0 0 24 24"><path d="M8.5 5.5v13M15.5 5.5v13" /></symbol>
      <symbol id="i-replay" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" /><path d="M4.5 4.5v4h4" /></symbol>
      <symbol id="i-swap" viewBox="0 0 24 24"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" /></symbol>
      <symbol id="i-store" viewBox="0 0 24 24"><path d="M4 9.5l1.5-5h13l1.5 5M4 9.5v10h16v-10M4 9.5h16M9.5 19.5v-5h5v5" /></symbol>
      <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 4l8.5 4.5L12 13 3.5 8.5z" /><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5" /></symbol>
    </svg>
  );
}
