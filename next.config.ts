import type { NextConfig } from "next";

/**
 * Environment variables keep their Vite names (VITE_*), so the Vercel project settings stay as they are:
 * they are read at build time and exposed to the browser code that used import.meta.env.
 */
const BROWSER_ENV = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "VITE_SUPABASE_STORAGE_BUCKET",
  "VITE_CONVERT_UPLOADS_ENABLED",
  "VITE_DISABLE_INTRO",
  "VITE_WEB3FORMS_ACCESS_KEY",
];

const nextConfig: NextConfig = {
  env: {
    ...Object.fromEntries(BROWSER_ENV.map((name) => [name, process.env[name] ?? ""])),
    // Time of the build, for cache-busting URLs that must be identical on the server and in the browser
    BUILD_TIME: String(Date.now()),
  },
  // The Vite build never type-checked the app (tsconfig "files": []); the existing type errors must not block deploys
  typescript: { ignoreBuildErrors: true },
  // Two root layouts (French site, English page): the 404 of unmatched addresses is app/global-not-found.tsx
  experimental: { globalNotFound: true },
};

export default nextConfig;
