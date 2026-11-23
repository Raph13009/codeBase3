/**
 * seo-playbook: serves the pages written by the playbook (seo/pages/*.md) as real pages of a Next.js site.
 *
 * Everything is read at build time from the seo/ folder at the root of the Next.js project (next to package.json):
 *   seo/pages/*.md         page text with its flat header (mot_cle, title, slug, meta_description)
 *   seo/plan.json          page types and natural labels (optional)
 *   seo/fiche-client.json  verified facts: name, phone, address, zones (optional, used for JSON-LD)
 *
 * Server only (reads the file system). Dependency: marked.
 */
import fs from "node:fs"
import path from "node:path"

import { marked } from "marked"
import type { Metadata, MetadataRoute } from "next"

const ROOT = path.join(process.cwd(), "seo")
const WRITTEN_TYPES = new Set(["service", "service_ville", "public", "comparaison", "avis"])

export type SeoPage = {
  slug: string // "/services/courtier-rachat-credit-lyon"
  segments: string[] // ["services", "courtier-rachat-credit-lyon"]
  title: string
  description: string
  keyword: string
  type: string // from plan.json: service, service_ville, public, comparaison, avis
  label: string // link text for the hub page
  html: string
  file: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Fiche = Record<string, any>
type Plan = { hub?: string; pages?: Array<Record<string, any>> }
/* eslint-enable @typescript-eslint/no-explicit-any */

function readJson<T>(file: string): T | null {
  const full = path.join(ROOT, file)
  return fs.existsSync(full) ? (JSON.parse(fs.readFileSync(full, "utf8")) as T) : null
}

export const fiche = (): Fiche => readJson<Fiche>("fiche-client.json") ?? {}
export const plan = (): Plan => readJson<Plan>("plan.json") ?? {}

function normalizePath(url = ""): string {
  const p = url.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0] || "/"
  return p.length > 1 ? p.replace(/\/+$/, "") : "/"
}

/** Same reading as page_lint.py: flat "key: value" lines between two "---". */
function frontMatter(text: string): { meta: Record<string, string>; body: string } {
  if (!text.startsWith("---")) return { meta: {}, body: text }
  const end = text.indexOf("\n---", 3)
  if (end === -1) return { meta: {}, body: text }
  const meta: Record<string, string> = {}
  for (const line of text.slice(3, end).split("\n")) {
    const i = line.indexOf(":")
    if (i > 0 && !line.trimStart().startsWith("#")) {
      meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "")
    }
  }
  return { meta, body: text.slice(end + 4).replace(/^\n+/, "") }
}

/**
 * Marks the action and phone links so they can be styled, and turns links to planned pages that are not published
 * yet into plain text: pages go online one at a time, and a link to a sibling that does not exist yet would be a 404.
 * The link comes back by itself at the build that publishes the sibling.
 */
function decorate(html: string, actionUrl: string | undefined, planned: Set<string>, published: Set<string>): string {
  let out = html.replace(/<a href="([^"]+)">(.*?)<\/a>/g, (whole, href: string, text: string) => {
    const target = normalizePath(href)
    return href.startsWith("/") && target !== "/" && planned.has(target) && !published.has(target)
      ? `<span class="seo-a-venir">${text}</span>`
      : whole
  })
  out = out.replace(/<a href="tel:/g, '<a class="seo-tel" href="tel:')
  if (actionUrl) {
    const escaped = actionUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    out = out.replace(new RegExp(`<a href="${escaped}"`, "g"), `<a class="seo-cta" href="${actionUrl}"`)
  }
  return out
}

let cache: SeoPage[] | null = null

/** Every page written by the playbook, except the home page (it belongs to the site's own design). */
export function seoPages(): SeoPage[] {
  if (cache) return cache
  const dir = path.join(ROOT, "pages")
  if (!fs.existsSync(dir)) return (cache = [])
  const byPath = new Map((plan().pages ?? []).map((p) => [normalizePath(p.url), p]))
  const actionUrl = fiche().action?.url as string | undefined
  const sources = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .flatMap((file) => {
      const { meta, body } = frontMatter(fs.readFileSync(path.join(dir, file), "utf8"))
      if (!meta.slug || /^(non|no|false)$/i.test(meta.publie ?? "")) return []
      const slug = normalizePath(meta.slug)
      return slug === "/" ? [] : [{ file, meta, body, slug }]
    })
  const published = new Set(sources.map((s) => s.slug))
  // Only the pages the playbook writes as .md: the home page, the hub and the fixed pages (/contact…) are routes
  // of the site itself and always exist.
  const planned = new Set([...byPath].filter(([, p]) => WRITTEN_TYPES.has(p.type as string)).map(([url]) => url))
  cache = sources.map(({ file, meta, body, slug }) => {
    const entry = byPath.get(slug)
    const h1 = body.match(/^#\s+(.+)$/m)?.[1] ?? ""
    return {
      slug,
      segments: slug.split("/").filter(Boolean),
      title: meta.title ?? "",
      description: meta.meta_description ?? meta.description ?? "",
      keyword: meta.mot_cle ?? "",
      type: (entry?.type as string) ?? "service",
      label: (entry?.naturel as string) ?? h1.split(" : ")[0].trim(),
      html: decorate(marked.parse(body, { async: false }) as string, actionUrl, planned, published),
      file,
    }
  })
  return cache
}

export function seoPage(segments: string[]): SeoPage | undefined {
  const slug = normalizePath("/" + segments.map((s) => decodeURIComponent(s)).join("/"))
  return seoPages().find((p) => p.slug === slug)
}

export const hubPath = (): string => normalizePath(plan().hub ?? fiche().hub ?? "/services/")

export const siteUrl = (): string =>
  (process.env.NEXT_PUBLIC_SITE_URL ?? (fiche().site as string | undefined) ?? "").replace(/\/+$/, "")

/** title as written (no layout template appended), description, canonical URL. */
export function seoMetadata(page: SeoPage): Metadata {
  const url = siteUrl() ? siteUrl() + page.slug : page.slug
  return {
    title: { absolute: page.title },
    description: page.description || undefined,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.description || undefined, url, type: "website" },
  }
}

/** Entries to add to app/sitemap.ts: the hub and every page written by the playbook. */
export function seoSitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const hub = hubPath()
  const pages = seoPages()
  const entries: MetadataRoute.Sitemap = pages.map((p) => ({ url: base + p.slug }))
  if (pages.some((p) => p.slug.startsWith(hub + "/"))) entries.unshift({ url: base + hub })
  return entries
}

function toE164(phone?: string): string | undefined {
  if (!phone) return undefined
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("33")) return "+" + digits
  if (digits.startsWith("0") && digits.length === 10) return "+33" + digits.slice(1)
  return phone
}

function postalAddress(raw?: string): Record<string, string> | undefined {
  if (!raw) return undefined
  const m = raw.match(/^(.*?),?\s*(\d{5})\s+(.+)$/)
  return m
    ? { "@type": "PostalAddress", streetAddress: m[1].replace(/,\s*$/, ""), postalCode: m[2], addressLocality: m[3], addressCountry: "FR" }
    : { "@type": "PostalAddress", streetAddress: raw, addressCountry: "FR" }
}

/**
 * LocalBusiness block built from the fact sheet, so the name, address and phone of the site never drift from the
 * Google Business Profile. No aggregateRating: Google ignores self-published ratings for local businesses.
 * Optional fields of fiche-client.json: schema_type (default LocalBusiness; FinancialService or InsuranceAgency for
 * a broker; ProfessionalService or Organization for a business without premises open to clients), fiche_google
 * (link to the Business Profile), profils (social profiles), portee and zone_desservie (areaServed).
 */
export function businessJsonLd(): Record<string, unknown> | null {
  const f = fiche()
  if (!f.client) return null
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": f.schema_type ?? (f.portee === "nationale" ? "Organization" : "LocalBusiness"),
    name: f.client,
    url: siteUrl() || undefined,
    telephone: toE164(f.telephone),
    address: postalAddress(f.adresse),
    // National scope (portee: "nationale"): the country, or zone_desservie, then the cities with a page of their own.
    areaServed: (f.portee === "nationale"
      ? [f.zone_desservie ?? "France", ...(f.zones ?? [])]
      : [f.ville_principale, ...(f.zones ?? [])]
    ).filter(Boolean),
    sameAs: [f.fiche_google, ...(f.profils ?? [])].filter(Boolean),
    identifier: f.reglementaire?.orias ? `ORIAS ${f.reglementaire.orias}` : undefined,
  }
  for (const key of Object.keys(data)) {
    const value = data[key]
    if (value === undefined || (Array.isArray(value) && value.length === 0)) delete data[key]
  }
  return data
}
