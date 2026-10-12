import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, LenisContext, prefersReducedMotion, ScrollLockContext, ScrollTrigger } from "@/components/studio/motion";
import { StudioFonts } from "@/components/studio/StudioFonts";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { Cursor } from "@/components/studio/Cursor";
import "@/styles/studio.css";
import "@/styles/studio-pages.css";

/** Scrolls to an element id (from a URL hash), through Lenis when it runs. */
function scrollToHash(hash: string, lenis: Lenis | null) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!el) return;
  if (lenis) {
    // The page just changed: Lenis still clamps to the previous page's height
    lenis.resize();
    lenis.scrollTo(el, { immediate: true, force: true });
  } else {
    el.scrollIntoView();
  }
}

/**
 * Shell shared by every studio page: smooth scroll, header, footer and cursor
 * stay mounted between pages, only the routed content changes.
 */
export default function StudioLayout() {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const lockedRef = useRef(false);
  const firstRoute = useRef(true);

  const setScrollLock = useCallback((locked: boolean) => {
    lockedRef.current = locked;
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  // Sticky scenes need overflow clip (not hidden) on html/body
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflowX, body: body.style.overflowX, bg: body.style.backgroundColor };
    html.style.overflowX = "clip";
    body.style.overflowX = "clip";
    body.style.backgroundColor = "#0b1028";
    return () => {
      html.style.overflowX = prev.html;
      body.style.overflowX = prev.body;
      body.style.backgroundColor = prev.bg;
    };
  }, []);

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (lockedRef.current) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Web fonts change line heights: re-measure once they are in
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      ScrollTrigger.refresh();
      if (window.location.hash) scrollToHash(window.location.hash, lenisRef.current);
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  // New page (behind the transition curtain): back to the top, or to its #anchor
  useLayoutEffect(() => {
    if (!firstRoute.current) {
      lenisRef.current?.resize();
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    firstRoute.current = false;
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lenisRef.current?.resize();
        if (hash) scrollToHash(hash, lenisRef.current);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return (
    <LenisContext.Provider value={lenisRef}>
      <ScrollLockContext.Provider value={setScrollLock}>
        <StudioFonts />
        <Helmet>
          <html lang="fr" />
          <meta name="theme-color" content="#0B1028" />
        </Helmet>
        <div className="studio">
          <a className="st-skip" href="#contenu" data-smooth-scroll="true">
            Aller au contenu
          </a>
          <StudioHeader />
          <Outlet key={pathname} />
          <StudioFooter />
          <Cursor />
        </div>
      </ScrollLockContext.Provider>
    </LenisContext.Provider>
  );
}
