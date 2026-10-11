import { useLayoutEffect, useState } from "react";
import MetaTags from "@/components/seo/MetaTags";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { prefersReducedMotion, useScrollLock } from "@/components/studio/motion";
import { usePageReady, usePageTransition } from "@/components/studio/PageTransition";
import { Loader } from "@/components/studio/Loader";
import { Hero } from "@/components/studio/sections/Hero";
import { Manifesto } from "@/components/studio/sections/Manifesto";
import { Work } from "@/components/studio/sections/Work";
import { Method } from "@/components/studio/sections/Method";
import { Services } from "@/components/studio/sections/Services";
import { Voices } from "@/components/studio/sections/Voices";
import { Contact } from "@/components/studio/sections/Contact";

const INTRO_KEY = "boostai-intro-seen";

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return true;
  }
}

/** Homepage in the studio direction: dark/cream, big type, scroll-driven scenes. */
const StudioHome = () => {
  const lockScroll = useScrollLock();
  const pageReady = usePageReady();
  const { isFirstView } = usePageTransition();
  // The intro only plays when the site is opened on this page, once per session
  const [loader, setLoader] = useState(() => isFirstView() && !prefersReducedMotion() && !introAlreadySeen());
  const [revealedByLoader, setRevealedByLoader] = useState(false);
  const heroReady = loader ? revealedByLoader : pageReady;

  useLayoutEffect(() => {
    if (!loader) return;
    lockScroll(true);
    return () => lockScroll(false);
    // Only on mount: the loader decides once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onReveal = () => {
    setRevealedByLoader(true);
    lockScroll(false);
  };

  const onLoaderDone = () => {
    setRevealedByLoader(true);
    setLoader(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private mode: the intro simply plays again next time */
    }
  };

  return (
    <>
      <MetaTags
        title="BoostAI Consulting - Agence Web Sur-Mesure | Développement Web & Solutions IA"
        description="Agence web spécialisée dans le développement web sur-mesure, MVP et solutions IA."
        keywords="agence web, développement web, MVP, solutions IA"
      />
      <GoogleAnalytics />
      {loader ? <Loader onReveal={onReveal} onDone={onLoaderDone} /> : null}
      <main id="contenu" tabIndex={-1}>
        <Hero ready={heroReady} />
        <Manifesto />
        <Work />
        <Method />
        <Services />
        <Voices />
        <Contact />
      </main>
    </>
  );
};

export default StudioHome;
