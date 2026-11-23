import { seoSitemap } from "@/lib/seo-playbook";

/**
 * /sitemap-pages.xml: the pages written with the SEO playbook (seo/pages/*.md) and their hub, rebuilt at each
 * deploy. The other pages of the site stay in public/sitemap.xml; robots.txt declares both.
 */
export const dynamic = "force-static";

export function GET() {
  const urls = seoSitemap()
    .map((entry) => `  <url><loc>${entry.url}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
