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

  return (
    <footer className="border-t border-black/5 bg-ac-surface-low">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm">
          <div className="mb-3 flex items-center gap-2 text-ac-on-surface">
            <BoostAIMark size={28} variant="onLight" to={false} />
            <span className="text-lg font-extrabold tracking-tight">
              {agenticSiteConfig.shortName}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-ac-muted">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ac-muted">
          <Link to="/" className="hover:text-ac-primary">
            {dict.footer.home}
          </Link>
          <Link to="/contact" className="hover:text-ac-primary">
            {dict.footer.contact}
          </Link>
          <Link to="/ocr-terms" className="hover:text-ac-primary">
            {dict.footer.privacy}
          </Link>
          <a href="#assess" className="hover:text-ac-primary">
            {dict.nav.assess}
          </a>
        </div>
      </div>
      <div className="border-t border-black/5 px-6 py-4 text-center text-xs text-ac-muted md:px-8">
        © {year} {agenticSiteConfig.organization}. {dict.footer.rights}
        <span className="mx-2" aria-hidden="true">
          ·
        </span>
        <span lang={locale}>{agenticSiteConfig.productName}</span>
      </div>
    </footer>
  );
}
