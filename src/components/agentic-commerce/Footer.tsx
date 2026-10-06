import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import BoostAIMark from "@/components/brand/BoostAIMark";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function AgenticFooter({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  const linkClass =
    "text-white/60 transition-colors duration-200 hover:text-ac-primary";

  return (
    <footer className="overflow-hidden bg-[var(--ac-ink)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-16 md:flex-row md:items-start md:justify-between md:px-8 md:pt-20">
        <div className="max-w-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="rounded-full bg-white p-0.5">
              <BoostAIMark size={26} variant="onLight" to={false} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              {agenticSiteConfig.shortName}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          <Link to="/" className={linkClass}>
            {dict.footer.home}
          </Link>
          <Link to="/contact" className={linkClass}>
            {dict.footer.contact}
          </Link>
          <Link to="/ocr-terms" className={linkClass}>
            {dict.footer.privacy}
          </Link>
          <a href="#assess" className={linkClass}>
            {dict.nav.assess}
          </a>
        </div>
      </div>

      <div
        className="ac-serif mt-12 select-none whitespace-nowrap px-4 text-center text-[14vw] leading-[0.8] tracking-[-0.03em] text-white/[0.08] md:mt-16"
        aria-hidden="true"
      >
        {agenticSiteConfig.shortName}
      </div>

      <div className="ac-mono flex flex-col items-center justify-between gap-2 border-t border-[var(--ac-hairline-dark)] px-6 py-5 text-white/40 sm:flex-row md:px-8">
        <span>
          © {year} {agenticSiteConfig.organization}. {dict.footer.rights}
        </span>
        <span lang={locale}>{agenticSiteConfig.productName}</span>
      </div>
    </footer>
  );
}
