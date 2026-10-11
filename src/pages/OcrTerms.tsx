import MetaTags from "@/components/seo/MetaTags";
import { Icon, StLink } from "@/components/studio/motion";
import { PageHero } from "@/components/studio/PageHero";

const CLAUSES = [
  {
    title: "Conservation limitée",
    text: "Dans le cadre de l'utilisation de notre outil OCR, certains documents transmis ainsi que les informations qui en sont extraites peuvent être conservés pour une durée limitée et strictement proportionnée à des finalités techniques d'analyse, de contrôle qualité et d'amélioration continue du service.",
  },
  {
    title: "Usage interne uniquement",
    text: "Ces données sont utilisées exclusivement par BoostAI Consulting afin d'améliorer la précision des traitements, la fiabilité des extractions et la performance globale de l'outil. Elles ne sont en aucun cas cédées, revendues, louées ou communiquées à des tiers à des fins commerciales.",
  },
  {
    title: "Accès restreint",
    text: "L'accès à ces informations est limité aux seules personnes habilitées lorsque cela est nécessaire pour la maintenance, la sécurité ou l'optimisation du service. Nous appliquons une logique de minimisation des données et veillons à ne conserver que les éléments utiles pendant la durée nécessaire.",
  },
  {
    title: "Votre accord",
    text: "En utilisant l'outil, vous reconnaissez cette possibilité de conservation temporaire dans un cadre exclusivement interne, avec un engagement explicite de confidentialité, de non-partage et de non-commercialisation des données auprès de tiers.",
  },
];

/** /ocr-terms: how documents sent to the PDF → Excel tool are handled. */
const OcrTerms = () => (
  <>
    <MetaTags
      title="Conditions d'utilisation OCR | BoostAI Consulting"
      description="Informations relatives au traitement, à la conservation temporaire et à la confidentialité des documents transmis via l'outil OCR de BoostAI Consulting."
      keywords="OCR, confidentialité, conditions d'utilisation, protection des données, BoostAI Consulting"
    />
    <main id="contenu" tabIndex={-1}>
      <PageHero
        label="(Conditions OCR)"
        line1="Vos données"
        line2="et l'outil OCR."
        title="Traitement et confidentialité des données OCR"
        size="lg"
        height="md"
      >
        <p>
          Transparence sur la conservation temporaire des informations extraites par l'outil, dans un cadre strictement
          interne, confidentiel et orienté vers l'amélioration du service.
        </p>
      </PageHero>

      <section className="st-legal" aria-label="Conditions">
        <div className="st-legal-side">
          <p className="st-paren">(En résumé)</p>
          <p>Conservation limitée, usage strictement interne&nbsp;: vos données ne sont ni vendues, ni partagées avec des tiers.</p>
          <StLink href="/Convert" className="st-link" cursor="Outil">
            Retour à l'outil OCR <Icon name="arrow" />
          </StLink>
        </div>
        <ol className="st-legal-list">
          {CLAUSES.map((clause, i) => (
            <li key={clause.title}>
              <span className="n">0{i + 1}</span>
              <div>
                <h2>{clause.title}</h2>
                <p>{clause.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  </>
);

export default OcrTerms;
