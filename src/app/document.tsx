/**
 * The <html> document shared by the two root layouts (French site, English agentic commerce page): what index.html
 * held in the Vite version. The Lovable editor script (cdn.gpteng.co) is not carried over: it only served the Lovable
 * editor, which no longer edits this repository.
 */
import type { ReactNode } from "react";
import Script from "next/script";
import { Providers } from "./providers";
import { BotpressScripts } from "./botpress";
// Same stylesheets, in the same order, as the single CSS file of the Vite build: loaded on every page (the page
// transition curtain, styled in studio-pages.css, is on every page too).
import "@/styles/studio.css";
import "@/styles/agentic-commerce.css";
import "@/styles/studio-pages.css";
import "@/index.css";

const HIDE_BOTPRESS_BRANDING = `
  const checkIfExists = setInterval(function () {
    const ifrm = document.getElementsByClassName("bpOpen bpWebchat bpReset").item(0);
    let exists = null;
    if (ifrm) {
      const doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
      exists = doc.getElementsByClassName("bpComposerPoweredBy").item(0);
    }
    if (exists) {
      clearInterval(checkIfExists);
      exists.setAttribute("data-hidden", "true");
    }
  }, 25);
`;

export function SiteDocument({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="author" content="BoostAI Consulting" />
        {/* Favicons: BoostAI geometric monogram */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0B1028" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#0B1028" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>

        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-8WY18DVJ39" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8WY18DVJ39');`}
        </Script>

        {/* Botpress chatbot */}
        <BotpressScripts />
        <Script id="botpress-branding" strategy="afterInteractive">
          {HIDE_BOTPRESS_BRANDING}
        </Script>
      </body>
    </html>
  );
}
