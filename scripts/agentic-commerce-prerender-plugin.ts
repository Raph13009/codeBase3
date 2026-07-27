import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { en } from "../src/lib/agentic-commerce/i18n/dictionaries/en";
import { fr } from "../src/lib/agentic-commerce/i18n/dictionaries/fr";
import type { Dictionary } from "../src/lib/agentic-commerce/i18n/dictionaries/en";
import { agenticSiteConfig } from "../src/lib/agentic-commerce/site";
import type { Locale } from "../src/lib/agentic-commerce/i18n/config";

function pageUrl(locale: Locale) {
  return `${agenticSiteConfig.url}${agenticSiteConfig.path[locale]}`;
}

function buildJsonLd(locale: Locale, dict: Dictionary) {
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderBody(locale: Locale, dict: Dictionary): string {
  const faq = dict.faq.items
    .map(
      (item) => `
      <div>
        <h3>${escapeHtml(item.question)}</h3>
        <p>${escapeHtml(item.answer)}</p>
      </div>`,
    )
    .join("");

  const problems = dict.problems.items
    .map(
      (item) => `
      <article>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>`,
    )
    .join("");

  const steps = dict.pilot.steps
    .map(
      (item) => `
      <li>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </li>`,
    )
    .join("");

  const audience = dict.audience.items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const whyNow = dict.whyNow.items
    .map(
      (item) => `
      <article>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>`,
    )
    .join("");

  return `
  <div class="agentic-commerce" lang="${locale}">
    <header>
      <p>${escapeHtml(agenticSiteConfig.productName)}</p>
      <nav aria-label="Primary">
        <a href="/">${escapeHtml(dict.nav.homeLabel)}</a>
        <a href="#capabilities">${escapeHtml(dict.nav.problems)}</a>
        <a href="#pilot">${escapeHtml(dict.nav.pilot)}</a>
        <a href="#audience">${escapeHtml(dict.nav.audience)}</a>
        <a href="#faq">${escapeHtml(dict.nav.faq)}</a>
        <a href="#assess">${escapeHtml(dict.nav.assess)}</a>
        <a href="${escapeHtml(dict.nav.switchHref)}">${escapeHtml(dict.nav.switchLabel)}</a>
      </nav>
    </header>
    <main>
      <section>
        <p>${escapeHtml(dict.hero.brand)}</p>
        <p>${escapeHtml(dict.hero.eyebrow)}</p>
        <h1>${escapeHtml(dict.hero.h1)}</h1>
        <p>${escapeHtml(dict.hero.subtitle)}</p>
        <p><a href="#assess">${escapeHtml(dict.hero.ctaPrimary)}</a></p>
        <p><a href="#pilot">${escapeHtml(dict.hero.ctaSecondary)}</a></p>
        <p>${escapeHtml(dict.hero.reassurance)}</p>
      </section>
      <section>
        <h2>${escapeHtml(dict.market.title)}</h2>
        <p>${escapeHtml(dict.market.p1)}</p>
        <p>${escapeHtml(dict.market.p2)}</p>
      </section>
      <section id="capabilities">
        <h2>${escapeHtml(dict.problems.title)}</h2>
        <p>${escapeHtml(dict.problems.subtitle)}</p>
        ${problems}
      </section>
      <section id="pilot">
        <h2>${escapeHtml(dict.pilot.title)}</h2>
        <p>${escapeHtml(dict.pilot.subtitle)}</p>
        <ol>${steps}</ol>
      </section>
      <section id="audience">
        <h2>${escapeHtml(dict.audience.title)}</h2>
        <ul>${audience}</ul>
      </section>
      <section>
        <h2>${escapeHtml(dict.whyNow.title)}</h2>
        ${whyNow}
      </section>
      <section id="assess">
        <h2>${escapeHtml(dict.form.title)}</h2>
        <p>${escapeHtml(dict.form.subtitle)}</p>
        <p>${escapeHtml(dict.form.submit)}</p>
      </section>
      <section id="faq">
        <h2>${escapeHtml(dict.faq.title)}</h2>
        ${faq}
      </section>
    </main>
    <footer>
      <p>${escapeHtml(dict.footer.tagline)}</p>
      <a href="/">${escapeHtml(dict.footer.home)}</a>
      <a href="/contact">${escapeHtml(dict.footer.contact)}</a>
      <a href="/ocr-terms">${escapeHtml(dict.footer.privacy)}</a>
    </footer>
  </div>`;
}

function injectHead(html: string, locale: Locale, dict: Dictionary): string {
  const url = pageUrl(locale);
  const enUrl = pageUrl("en");
  const frUrl = pageUrl("fr");
  const image = `${agenticSiteConfig.url}/android-chrome-512x512.png`;
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  const jsonLd = JSON.stringify(buildJsonLd(locale, dict));

  const headExtras = `
    <title>${escapeHtml(dict.meta.title)}</title>
    <meta name="description" content="${escapeHtml(dict.meta.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(enUrl)}" />
    <link rel="alternate" hreflang="fr" href="${escapeHtml(frUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(enUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:title" content="${escapeHtml(dict.meta.title)}" />
    <meta property="og:description" content="${escapeHtml(dict.meta.description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(dict.meta.ogAlt)}" />
    <meta property="og:site_name" content="${escapeHtml(agenticSiteConfig.organization)}" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(dict.meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(dict.meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${jsonLd}</script>
  `;

  let next = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${locale}"`);
  next = next.replace(/<title>[\s\S]*?<\/title>/gi, "");
  next = next.replace(/<meta\s+name="description"[^>]*>/gi, "");
  next = next.replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "");
  next = next.replace("</head>", `${headExtras}</head>`);
  next = next.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${renderBody(locale, dict)}</div>`,
  );
  return next;
}

export function agenticCommercePrerender(): Plugin {
  return {
    name: "agentic-commerce-prerender",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) {
        console.warn("[agentic-prerender] dist/index.html missing — skip");
        return;
      }

      const template = fs.readFileSync(indexPath, "utf8");
      const pages: { locale: Locale; dict: Dictionary }[] = [
        { locale: "en", dict: en },
        { locale: "fr", dict: fr },
      ];

      for (const page of pages) {
        const targetDir = path.join(outDir, page.locale, "agentic-commerce");
        fs.mkdirSync(targetDir, { recursive: true });
        const html = injectHead(template, page.locale, page.dict);
        fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf8");
        console.info(
          `[agentic-prerender] wrote ${page.locale}/agentic-commerce/index.html`,
        );
      }
    },
  };
}
