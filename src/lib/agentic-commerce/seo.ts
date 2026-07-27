import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";

export function pagePath(locale: Locale) {
  return agenticSiteConfig.path[locale];
}

export function pageUrl(locale: Locale) {
  return `${agenticSiteConfig.url}${pagePath(locale)}`;
}

export function buildJsonLd(locale: Locale, dict: Dictionary) {
  const url = pageUrl(locale);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: agenticSiteConfig.organization,
      url: agenticSiteConfig.url,
      email: agenticSiteConfig.email,
      description: dict.meta.description,
      areaServed: "Europe",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: agenticSiteConfig.productName,
      provider: {
        "@type": "Organization",
        name: agenticSiteConfig.organization,
      },
      description: dict.meta.description,
      areaServed: "Europe",
      url,
      serviceType: "Agentic commerce readiness assessment and pilot program",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: dict.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
