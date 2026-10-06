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

  useEffect(() => {
    // Global `overflow-x: hidden` on html/body breaks `position: sticky`
    // (pinned capabilities stage). `clip` hides overflow without creating a scroll container.
    const html = document.documentElement;
    const { body } = document;
    const prev = [html.style.overflowX, body.style.overflowX];
    html.style.overflowX = "clip";
    body.style.overflowX = "clip";
    return () => {
      html.style.overflowX = prev[0];
      body.style.overflowX = prev[1];
    };
  }, []);

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
