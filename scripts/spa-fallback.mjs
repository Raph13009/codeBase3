/**
 * Copy dist/index.html to key SPA paths so deep links work even if
 * Vercel rewrites fail (filesystem fallback).
 */
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const dist = join(process.cwd(), "dist");
const index = join(dist, "index.html");

if (!existsSync(index)) {
  console.error("[spa-fallback] dist/index.html missing — run vite build first");
  process.exit(1);
}

const routes = [
  "realisations",
  "about",
  "contact",
  "Convert",
  "ocr-terms",
  "hold-lp",
  "old-landing",
  "admin",
  "admin/home",
];

for (const route of routes) {
  const dest = join(dist, route, "index.html");
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(index, dest);
  console.log(`[spa-fallback] wrote ${route}/index.html`);
}

console.log("[spa-fallback] done");
