import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  isLocale,
  type Locale,
} from "@/lib/agentic-commerce/i18n/config";
import { getDictionary } from "@/lib/agentic-commerce/i18n/get-dictionary";
import { AgenticLandingPage } from "@/components/agentic-commerce/LandingPage";
import { AgenticCommerceMeta } from "@/components/agentic-commerce/AgenticCommerceMeta";
import "@/styles/agentic-commerce.css";

const AgenticCommerce = () => {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const localeValid = Boolean(localeParam && isLocale(localeParam));
  const locale: Locale = localeValid ? (localeParam as Locale) : "en";
  const dict = getDictionary(locale);

  useEffect(() => {
    if (!localeValid) return;
    document.documentElement.lang = locale;
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.lang = "en";
    };
  }, [locale, localeValid]);

  if (!localeValid) {
    return <Navigate to="/en/agentic-commerce" replace />;
  }

  return (
    <div className="agentic-commerce min-h-screen bg-ac-surface text-ac-on-surface">
      <AgenticCommerceMeta locale={locale} dict={dict} />
      <AgenticLandingPage locale={locale} dict={dict} />
    </div>
  );
};

export default AgenticCommerce;
