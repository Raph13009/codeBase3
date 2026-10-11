import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, prefersReducedMotion } from "@/components/studio/motion";
import { BMark } from "@/components/studio/BMark";
import { findCase } from "@/components/studio/work";

type TransitionApi = {
  /** Navigates behind the curtain (plain navigation when motion is reduced). */
  go: (to: string) => void;
  /** True until the first client-side navigation (the homepage intro only plays then). */
  isFirstView: () => boolean;
  /** False while the curtain covers the screen: page entrances wait for it. */
  revealed: boolean;
};

const TransitionContext = createContext<TransitionApi>({
  go: () => {},
  isFirstView: () => true,
  revealed: true,
});

export const usePageTransition = () => useContext(TransitionContext);

/** True once the page is visible (after the curtain has started lifting). */
export const usePageReady = () => useContext(TransitionContext).revealed;

/** Name shown on the curtain while the destination loads. */
function labelFor(to: string) {
  const path = to.split(/[?#]/)[0];
  if (path === "/") return "Accueil";
  if (path === "/realisations") return "Réalisations";
  const match = path.match(/^\/(project|agent)\/([^/]+)/);
  if (match) return findCase(match[1] === "agent" ? "agent" : "web", match[2])?.name ?? "Projet";
  if (path === "/about") return "Studio";
  if (path === "/contact") return "Contact";
  if (path.toLowerCase() === "/convert") return "PDF → Excel";
  if (path === "/ocr-terms") return "Confidentialité";
  if (path.endsWith("/agentic-commerce")) return "Commerce IA";
  return "BoostAI";
}

/**
 * Page transitions for the whole site: internal links are intercepted, a dark
 * curtain rises with the destination's name, the route changes behind it,
 * then the curtain lifts off the new page.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const phase = useRef<"idle" | "covering" | "covered" | "revealing">("idle");
  const firstView = useRef(true);
  const firstKey = useRef(location.key);
  const [revealed, setRevealed] = useState(true);
  const [label, setLabel] = useState("");

  const reveal = useCallback(() => {
    const curtain = curtainRef.current;
    if (!curtain || phase.current !== "covered") return;
    phase.current = "revealing";
    setRevealed(true);
    gsap
      .timeline({
        onComplete: () => {
          phase.current = "idle";
          gsap.set(curtain, { visibility: "hidden", yPercent: 100 });
        },
      })
      .to(labelRef.current, { yPercent: -105, duration: 0.45, ease: "expo.in" }, 0)
      .to(curtain, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 0.12);
  }, []);

  const go = useCallback(
    (to: string) => {
      if (phase.current !== "idle") return;
      const curtain = curtainRef.current;
      if (!curtain || prefersReducedMotion()) {
        navigate(to);
        return;
      }
      setLabel(labelFor(to));
      phase.current = "covering";
      gsap
        .timeline()
        .set(curtain, { visibility: "visible", y: 0, yPercent: 100 })
        .set(labelRef.current, { yPercent: 105 })
        .to(curtain, { yPercent: 0, duration: 0.62, ease: "expo.inOut" })
        .to(labelRef.current, { yPercent: 0, duration: 0.7, ease: "expo.out" }, 0.28)
        .add(() => {
          phase.current = "covered";
          setRevealed(false);
          navigate(to);
        }, 0.66);
    },
    [navigate],
  );

  // The new route has rendered behind the curtain: let it paint, then lift
  useEffect(() => {
    if (location.key !== firstKey.current) firstView.current = false;
    if (phase.current !== "covered") return;
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => window.setTimeout(reveal, 90));
    });
    // Safety net: never leave the curtain down
    const safety = window.setTimeout(reveal, 1600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, [location.key, reveal]);

  // Intercept every internal link (router <Link>s included: their own handler
  // skips navigation once the default is prevented, other handlers still run)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (prefersReducedMotion()) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return;
      if (anchor.target && anchor.target !== "_self") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return;
      // Same page (anchors, filters): the page handles it
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      go(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [go]);

  const api = useMemo<TransitionApi>(
    () => ({ go, isFirstView: () => firstView.current, revealed }),
    [go, revealed],
  );

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <div className="bt-curtain" ref={curtainRef} aria-hidden="true">
        <div className="bt-curtain-top">
          <BMark />
          <span>
            Boost<em>AI</em>
          </span>
        </div>
        <div className="bt-curtain-label">
          <span ref={labelRef}>{label}</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
