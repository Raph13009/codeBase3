import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SeoArticle } from "@/components/seo-article"
import { seoMetadata, seoPage, seoPages } from "@/lib/seo-playbook"

// Every page of seo/pages/*.md, at the address written in its header (/services/…, /avis, /courtier-ou-banque).
// Built once at deploy time. The site's own routes (/, /contact, /mentions-legales…) take precedence.
// Any other address reaches this route too: it answers with the studio's 404 page (not-found.tsx).
export const dynamicParams = true

export function generateStaticParams() {
  return seoPages().map((page) => ({ chemin: page.segments }))
}

type Props = { params: Promise<{ chemin: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = seoPage((await params).chemin)
  return page ? seoMetadata(page) : {}
}

export default async function PlaybookPage({ params }: Props) {
  const page = seoPage((await params).chemin)
  if (!page) notFound()
  return <SeoArticle page={page} />
}
