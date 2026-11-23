import type { SeoPage } from "@/lib/seo-playbook"

import styles from "./seo-article.module.css"

/**
 * The text of a playbook page, rendered on the server: everything is in the HTML that Google and AI crawlers read.
 * No accordion, no tabs, no entrance animation that hides the text before JavaScript runs.
 */
export function SeoArticle({ page }: { page: SeoPage }) {
  return <article className={styles.article} dangerouslySetInnerHTML={{ __html: page.html }} />
}

/** JSON-LD script; "<" is escaped so the content can never close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  )
}
