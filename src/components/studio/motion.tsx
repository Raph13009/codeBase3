import { createContext, Fragment, useCallback, useContext, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Media query under which scroll-linked motion runs. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type LenisRef = { current: Lenis | null };

export const LenisContext = createContext<LenisRef>({ current: null });

/** Stops (true) or restarts (false) the page's smooth scroll, e.g. while the intro plays. */
export const ScrollLockContext = createContext<(locked: boolean) => void>(() => {});
export const useScrollLock = () => useContext(ScrollLockContext);

/** Scrolls to an in-page anchor with Lenis when it runs, natively otherwise. */
export function useScrollTo() {
  const lenis = useContext(LenisContext);
  return useCallback(
    (hash: string) => {
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return false;
      if (lenis.current) {
        // force: the mobile menu stops Lenis while it is open
        lenis.current.scrollTo(target, { duration: 1.4, force: true });
      } else if (target === 0) {
        window.scrollTo({ top: 0 });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
      return true;
    },
    [lenis],
  );
}

type StLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  cursor?: string;
  onNavigate?: () => void;
  "aria-label"?: string;
  "aria-current"?: "page" | "step" | "location" | boolean;
};

/** Splits "/#services" into its path and hash, "?…" stays with the path. */
function splitHref(href: string) {
  const i = href.indexOf("#");
  return i === -1 ? { path: href, hash: "" } : { path: href.slice(0, i), hash: href.slice(i) };
}

/**
 * Anchor for every link of the studio pages: in-page targets scroll smoothly
 * ("#x", or "/#x" and "/" while already on the homepage), site paths go
 * through the router (and the page transition), anything else opens in a new tab.
 */
export function StLink({ href, className, children, cursor, onNavigate, ...rest }: StLinkProps) {
  const scrollTo = useScrollTo();
  const { pathname } = useLocation();
  const extra = cursor ? { "data-cursor": cursor } : {};
  const { path, hash } = splitHref(href);
  const inPage = href.startsWith("#") || (href.startsWith("/") && path === pathname);

  if (inPage) {
    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (scrollTo(hash || "#top")) e.preventDefault();
      onNavigate?.();
    };
    return (
      <a href={href} className={className} onClick={onClick} data-smooth-scroll="true" {...extra} {...rest}>
        {children}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} onClick={onNavigate} {...extra} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...extra} {...rest}>
      {children}
    </a>
  );
}

export type IconName =
  | "arrow"
  | "arrow-left"
  | "arrow-up-right"
  | "arrow-down"
  | "arrow-down-right"
  | "plus"
  | "close";

/** Small inline icons (stroke follows currentColor). */
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, string> = {
    arrow: "M3 8h10M9 4l4 4-4 4",
    "arrow-left": "M13 8H3M7 4L3 8l4 4",
    "arrow-up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
    "arrow-down": "M8 3v10M4 9l4 4 4-4",
    "arrow-down-right": "M4.5 4.5l7 7M11.5 5.5v6h-6",
    plus: "M8 3v10M3 8h10",
    close: "M4 4l8 8M12 4l-8 8",
  };
  return (
    <svg className={`ico ${className}`.trim()} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Splits a text into masked characters for slide-up reveals (words never break apart). */
export function MaskChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {w > 0 ? " " : null}
          <span className="mask-word">
            {Array.from(word).map((ch, i) => (
              <span className="mask" key={i}>
                <span>{ch}</span>
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
