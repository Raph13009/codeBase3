import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { AgenticHeader } from "@/components/agentic-commerce/Header";
import { AgenticFooter } from "@/components/agentic-commerce/Footer";
import { Hero } from "@/components/agentic-commerce/sections/Hero";
import { MarketShift } from "@/components/agentic-commerce/sections/MarketShift";
import { Problems } from "@/components/agentic-commerce/sections/Problems";
import { Pilot } from "@/components/agentic-commerce/sections/Pilot";
import { Audience } from "@/components/agentic-commerce/sections/Audience";
import { WhyNow } from "@/components/agentic-commerce/sections/WhyNow";
import { AssessmentForm } from "@/components/agentic-commerce/sections/AssessmentForm";
import { FAQ } from "@/components/agentic-commerce/sections/FAQ";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function AgenticLandingPage({ locale, dict }: Props) {
  return (
    <>
      <AgenticHeader locale={locale} dict={dict} />
      <main>
        <Hero dict={dict} />
        <MarketShift dict={dict} />
        <Problems dict={dict} />
        <Pilot dict={dict} />
        <Audience dict={dict} />
        <WhyNow dict={dict} />
        <AssessmentForm locale={locale} dict={dict} />
        <FAQ dict={dict} />
      </main>
      <AgenticFooter locale={locale} dict={dict} />
    </>
  );
}
