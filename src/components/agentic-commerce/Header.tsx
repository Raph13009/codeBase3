import { useEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "#capabilities", label: dict.nav.problems },
    { href: "#pilot", label: dict.nav.pilot },
    { href: "#audience", label: dict.nav.audience },
    { href: "#faq", label: dict.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Keep the hidden menu out of the tab order (React 18 has no `inert` prop)
    if (menuRef.current) menuRef.current.inert = !menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const onAnchor = (target: string) => {
    setMenuOpen(false);
    trackAgenticEvent("nav_anchor", { locale, target });
  };

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <nav
        className={`flex items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 md:px-4 ${
          scrolled || menuOpen
            ? "border-black/5 bg-white/80 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)]"
            : "border-white/60 bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
        }`}
        aria-label={locale === "fr" ? "Navigation principale" : "Primary"}
      >
        <Link
          to={`/${locale}/agentic-commerce`}
          className="flex items-center gap-2.5 pl-1 text-ac-primary"
          onClick={() => trackAgenticEvent("nav_logo", { locale })}
        >
          <BoostAIMark size={28} variant="onLight" to={false} />
          <span className="text-sm font-bold tracking-tight text-ac-on-surface sm:text-base">
            {agenticSiteConfig.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ac-muted transition-colors duration-200 hover:bg-black/[0.04] hover:text-ac-on-surface"
              onClick={() => onAnchor(link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ac-muted transition-colors duration-200 hover:text-ac-on-surface"
            onClick={() => trackAgenticEvent("nav_home", { locale })}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.nav.homeLabel}
          </Link>
          <Link
            to={dict.nav.switchHref}
            className="ac-mono rounded-full px-3 py-2 text-ac-muted transition-colors duration-200 hover:text-ac-on-surface"
            hrefLang={locale === "en" ? "fr" : "en"}
            onClick={() => trackAgenticEvent("nav_lang", { locale })}
          >
            {dict.nav.switchLabel}
          </Link>
          <a
            href="#assess"
            className="ac-btn ml-1 bg-ac-on-surface px-5 py-2.5 text-sm font-semibold text-white hover:bg-ac-primary"
            onClick={() => trackAgenticEvent("nav_cta", { locale })}
          >
            {dict.nav.assess}
          </a>
        </div>

        <button
          type="button"
          className="ac-btn h-10 w-10 bg-ac-on-surface text-white max-md:flex md:!hidden"
          aria-expanded={menuOpen}
          aria-controls="ac-mobile-menu"
          aria-label="Menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span
            className={`absolute h-px w-4 bg-current transition-transform duration-300 ease-out ${
              menuOpen ? "rotate-45" : "-translate-y-[3px]"
            }`}
          />
          <span
            className={`absolute h-px w-4 bg-current transition-transform duration-300 ease-out ${
              menuOpen ? "-rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
      </nav>

      <div
        id="ac-mobile-menu"
        ref={menuRef}
        className={`mt-2 origin-top rounded-[1.75rem] border border-black/5 bg-white/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out md:hidden ${
          menuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <ul>
          {links.map((link, index) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold text-ac-on-surface"
                onClick={() => onAnchor(link.href.slice(1))}
              >
                {link.label}
                <span className="ac-mono text-ac-muted/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-black/5 px-4 pt-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-ac-muted"
            onClick={() => trackAgenticEvent("nav_home", { locale })}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.nav.homeLabel}
          </Link>
          <Link
            to={dict.nav.switchHref}
            className="ac-mono text-ac-muted"
            hrefLang={locale === "en" ? "fr" : "en"}
            onClick={() => trackAgenticEvent("nav_lang", { locale })}
          >
            {dict.nav.switchLabel}
          </Link>
        </div>
        <a
          href="#assess"
          className="ac-btn mt-3 w-full bg-ac-primary px-5 py-3.5 text-sm font-semibold text-white"
          onClick={() => {
            setMenuOpen(false);
            trackAgenticEvent("nav_cta", { locale });
          }}
        >
          {dict.nav.assess}
        </a>
      </div>
    </header>
  );
}
