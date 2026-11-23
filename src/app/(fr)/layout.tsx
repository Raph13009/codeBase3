import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SiteDocument } from "../document";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B1028" };

/** Root layout of the French site (every page but /en/agentic-commerce). */
export default function FrenchRootLayout({ children }: { children: ReactNode }) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
