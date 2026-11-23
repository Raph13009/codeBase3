import { Icon, StLink } from "@/components/studio/motion";
import { PageHero } from "@/components/studio/PageHero";
import { Helmet } from "@/lib/helmet-compat";

/** Unknown /project/:id or /agent/:id. */
export function CaseMissing({ kind }: { kind: "projet" | "agent" }) {
  return (
    <main id="contenu" tabIndex={-1}>
      <Helmet>
        <title>{`${kind === "agent" ? "Agent introuvable" : "Projet introuvable"} | BoostAI Consulting`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHero
        label="(Introuvable)"
        line1="Oups"
        line2={kind === "agent" ? "agent introuvable." : "projet introuvable."}
        title={kind === "agent" ? "Agent introuvable" : "Projet introuvable"}
        height="md"
      >
        <p>Ce lien ne correspond à aucune réalisation, ou elle a été retirée.</p>
        <StLink href="/realisations" className="st-link" cursor="Index">
          Voir toutes les réalisations <Icon name="arrow" />
        </StLink>
      </PageHero>
    </main>
  );
}
