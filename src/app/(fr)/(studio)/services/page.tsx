import type { Metadata } from "next"
import Link from "next/link"

import styles from "@/components/seo-article.module.css"
import { fiche, hubPath, seoPages, siteUrl } from "@/lib/seo-playbook"

// The services hub. Rename this folder to match the hub of the plan (src/app/prestations/ for "/prestations/"),
// and link it from the footer of the layout: every service page then sits two clicks from the home page.
const GROUPS: Array<[string, string]> = [
  ["service", "Nos prestations"],
  ["service_ville", "Près de chez vous"],
  ["public", "Selon votre situation"],
  ["comparaison", "Pour bien choisir"],
]

export function generateMetadata(): Metadata {
  const client = (fiche().client as string | undefined) ?? ""
  return {
    title: { absolute: client ? `Nos services | ${client}` : "Nos services" },
    description: client ? `Toutes les prestations de ${client}, chacune sur sa page.` : undefined,
    alternates: { canonical: (siteUrl() || "") + hubPath() },
  }
}

export default function ServicesHub() {
  const hub = hubPath()
  const pages = seoPages().filter((p) => p.slug.startsWith(hub + "/"))
  const f = fiche()
  const client = (f.client as string | undefined) ?? ""
  const action = f.action as { url?: string; libelle?: string } | undefined
  const phone = f.telephone as string | undefined
  return (
    <section className={styles.hub}>
      <h1>Nos services</h1>
      <p>
        {client ? `Toutes les prestations de ${client}` : "Toutes nos prestations"}, chacune expliquée sur sa propre
        page.
      </p>
      {(action?.url || phone) && (
        <p>
          {action?.url && (
            <a className="seo-cta" href={action.url}>
              {action.libelle ?? "Nous contacter"}
            </a>
          )}{" "}
          {phone && (
            <a className="seo-tel" href={`tel:${phone.replace(/[^\d+]/g, "").replace(/^0/, "+33")}`}>
              {phone}
            </a>
          )}
        </p>
      )}
      {GROUPS.map(([type, title]) => {
        const group = pages.filter((p) => p.type === type)
        if (!group.length) return null
        return (
          <div key={type}>
            <h2>{title}</h2>
            <ul>
              {group.map((p) => (
                <li key={p.slug}>
                  <Link href={p.slug}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
