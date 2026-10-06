import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/agentic-commerce/sections/Hero";
import { AgentLens } from "@/components/agentic-commerce/sections/AgentLens";
import { MarketShift } from "@/components/agentic-commerce/sections/MarketShift";
import { Problems } from "@/components/agentic-commerce/sections/Problems";
import { Pilot } from "@/components/agentic-commerce/sections/Pilot";
import { Audience } from "@/components/agentic-commerce/sections/Audience";
import { AssessmentForm } from "@/components/agentic-commerce/sections/AssessmentForm";
import { FAQ } from "@/components/agentic-commerce/sections/FAQ";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function AgenticLandingPage({ locale, dict }: Props) {
  const mainRef = useRef<HTMLElement>(null);

  // The page background/text colours follow the section crossing the middle of the viewport
  useEffect(() => {
    const main = mainRef.current;
    const root = main?.closest<HTMLElement>(".agentic-commerce");
    if (!main || !root) return;
    const sections = Array.from(main.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            root.dataset.scene = (entry.target as HTMLElement).dataset.scene;
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      delete root.dataset.scene;
    };
  }, []);

  return (
    <>
      {/* Shared site header/footer, same as the homepage */}
      <Header />
      <main ref={mainRef}>
        <Hero locale={locale} dict={dict} />
        <AgentLens dict={dict} />
        <MarketShift dict={dict} />
        <Problems dict={dict} />
        <Pilot dict={dict} />
        <Audience dict={dict} />
        <AssessmentForm locale={locale} dict={dict} />
        <FAQ dict={dict} />
      </main>
      <Footer />
    </>
  );
}
