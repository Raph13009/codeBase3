import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SiteDocument } from "../document";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B1028" };

/** Root layout of the English pages (/en/agentic-commerce): same document, lang="en" from the first byte. */
export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
