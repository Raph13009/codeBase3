import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { IconSprite, prefersReducedMotion } from "@/components/agentic-commerce/shared";
import { Hero } from "@/components/agentic-commerce/sections/Hero";
import { Marquee } from "@/components/agentic-commerce/sections/Marquee";
import { Manifesto } from "@/components/agentic-commerce/sections/Manifesto";
import { XRay } from "@/components/agentic-commerce/sections/XRay";
import { StackBuild } from "@/components/agentic-commerce/sections/StackBuild";
import { Architecture } from "@/components/agentic-commerce/sections/Architecture";
import { PilotTrack } from "@/components/agentic-commerce/sections/PilotTrack";
import { Audience } from "@/components/agentic-commerce/sections/Audience";
import { FAQ } from "@/components/agentic-commerce/sections/FAQ";
import { AssessmentForm } from "@/components/agentic-commerce/sections/AssessmentForm";
import { FinalCta } from "@/components/agentic-commerce/sections/FinalCta";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** Page layout from the Claude Design mockup, inside the shared site header/footer. */
export function AgenticLandingPage({ locale, dict }: Props) {
  const mainRef = useRef<HTMLElement>(null);

  // Magnetic buttons (.mag) lean toward the cursor
  useEffect(() => {
    const main = mainRef.current;
    if (!main || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const buttons = Array.from(main.querySelectorAll<HTMLElement>(".mag"));
    const cleanups = buttons.map((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
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
    });
    return () => cleanups.forEach((fn) => fn());
  }, [locale]);

  return (
    <>
      <IconSprite />
      <Header showProgress />
      <main ref={mainRef}>
        <Hero locale={locale} dict={dict} />
        <Marquee dict={dict} />
        <Manifesto dict={dict} />
        <XRay dict={dict} />
        <StackBuild dict={dict} />
        <Architecture dict={dict} />
        <PilotTrack dict={dict} />
        <Audience dict={dict} />
        <FAQ dict={dict} />
        <AssessmentForm locale={locale} dict={dict} />
        <FinalCta dict={dict} />
      </main>
      <Footer />
    </>
  );
}
