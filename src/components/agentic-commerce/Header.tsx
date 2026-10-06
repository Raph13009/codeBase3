import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import BoostAIMark from "@/components/brand/BoostAIMark";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function AgenticHeader({ locale, dict }: Props) {
  const links = [
    { href: "#capabilities", label: dict.nav.problems },
    { href: "#pilot", label: dict.nav.pilot },
    { href: "#audience", label: dict.nav.audience },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2">
      <nav
        className="ac-glass flex items-center justify-between rounded-full px-4 py-2.5 md:px-6"
        aria-label={locale === "fr" ? "Navigation principale" : "Primary"}
      >
        <Link
          to={`/${locale}/agentic-commerce`}
          className="flex items-center gap-2 text-ac-primary"
          onClick={() => trackAgenticEvent("nav_logo", { locale })}
        >
          <BoostAIMark size={28} variant="onLight" to={false} />
          <span className="hidden text-sm font-extrabold tracking-tight text-ac-on-surface sm:inline sm:text-base">
            {agenticSiteConfig.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ac-muted transition-colors hover:text-ac-primary"
              onClick={() =>
                trackAgenticEvent("nav_anchor", {
                  locale,
                  target: link.href.slice(1),
                })
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full border border-ac-muted/20 bg-white/30 px-3 py-1.5 text-sm font-semibold text-ac-on-surface shadow-sm transition-all hover:border-ac-primary/30 hover:bg-white/50 hover:text-ac-primary"
            onClick={() => trackAgenticEvent("nav_home", { locale })}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{dict.nav.homeLabel}</span>
          </Link>
          <Link
            to={dict.nav.switchHref}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-ac-muted transition-colors hover:text-ac-primary"
            hrefLang={locale === "en" ? "fr" : "en"}
            onClick={() => trackAgenticEvent("nav_lang", { locale })}
          >
            {dict.nav.switchLabel}
          </Link>
          <a
            href="#assess"
            className="rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-semibold text-ac-on-surface shadow-sm transition hover:bg-white/80"
            onClick={() => trackAgenticEvent("nav_cta", { locale })}
          >
            {dict.nav.assess}
          </a>
        </div>
      </nav>
    </header>
  );
}
