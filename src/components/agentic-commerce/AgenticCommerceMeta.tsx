import { Helmet } from "react-helmet-async";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import { buildJsonLd, pageUrl } from "@/lib/agentic-commerce/seo";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function AgenticCommerceMeta({ locale, dict }: Props) {
  const url = pageUrl(locale);
  const enUrl = pageUrl("en");
  const frUrl = pageUrl("fr");
  const jsonLd = buildJsonLd(locale, dict);
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const image = `${agenticSiteConfig.url}/android-chrome-512x512.png`;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{dict.meta.title}</title>
      <meta name="description" content={dict.meta.description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={agenticSiteConfig.organization} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={dict.meta.title} />
      <meta property="og:description" content={dict.meta.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={dict.meta.ogAlt} />
      <meta property="og:site_name" content={agenticSiteConfig.organization} />
      <meta property="og:locale" content={ogLocale} />
      <meta
        property="og:locale:alternate"
        content={locale === "fr" ? "en_US" : "fr_FR"}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={dict.meta.title} />
      <meta name="twitter:description" content={dict.meta.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@BoostAIConsult" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Helmet>
  );
}
