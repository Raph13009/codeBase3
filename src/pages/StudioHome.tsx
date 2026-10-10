import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Lenis from "lenis";
import MetaTags from "@/components/seo/MetaTags";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { gsap, LenisContext, prefersReducedMotion, ScrollTrigger } from "@/components/studio/motion";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { Cursor } from "@/components/studio/Cursor";
import { Loader } from "@/components/studio/Loader";
import { Hero } from "@/components/studio/sections/Hero";
import { Manifesto } from "@/components/studio/sections/Manifesto";
import { Work } from "@/components/studio/sections/Work";
import { Method } from "@/components/studio/sections/Method";
import { Services } from "@/components/studio/sections/Services";
import { Voices } from "@/components/studio/sections/Voices";
import { Contact } from "@/components/studio/sections/Contact";
import "@/styles/studio.css";

const INTRO_KEY = "boostai-intro-seen";

function shouldPlayLoader() {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return false;
  }
}

/** Homepage in the studio direction: dark/cream, big type, scroll-driven scenes. */
const StudioHome = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [loader, setLoader] = useState(shouldPlayLoader);
  const [heroReady, setHeroReady] = useState(() => !loader);
  const loaderRef = useRef(loader);

  // Page-wide settings: sticky needs overflow clip (not hidden) on html/body
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflowX, body: body.style.overflowX, bg: body.style.backgroundColor };
    html.style.overflowX = "clip";
    body.style.overflowX = "clip";
    body.style.backgroundColor = "#0e0e0d";
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
    if (loaderRef.current) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Web fonts change line heights: re-measure every trigger once they are in
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  const onReveal = () => {
    setHeroReady(true);
    lenisRef.current?.start();
  };

  const onLoaderDone = () => {
    loaderRef.current = false;
    setLoader(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private mode: the intro simply plays again next time */
    }
  };

  return (
    <LenisContext.Provider value={lenisRef}>
      <MetaTags
        title="BoostAI Consulting - Agence Web Sur-Mesure | Développement Web & Solutions IA"
        description="Agence web spécialisée dans le développement web sur-mesure, MVP et solutions IA."
        keywords="agence web, développement web, MVP, solutions IA"
      />
      <Helmet>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        {/* One family per request: the Fontshare API only honours the first f[] */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" />
        <meta name="theme-color" content="#0e0e0d" />
      </Helmet>
      <GoogleAnalytics />

      <div className="studio">
        {loader ? <Loader onReveal={onReveal} onDone={onLoaderDone} /> : null}
        <StudioHeader />
        <main>
          <Hero ready={heroReady} />
          <Manifesto />
          <Work />
          <Method />
          <Services />
          <Voices />
          <Contact />
        </main>
        <StudioFooter />
        <Cursor />
      </div>
    </LenisContext.Provider>
  );
};

export default StudioHome;
