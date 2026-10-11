import MetaTags from "@/components/seo/MetaTags";
import { PageHero } from "@/components/studio/PageHero";
import { Contact as ContactForm } from "@/components/studio/sections/Contact";

/** /contact: short hero, then the brief form with the email and what happens next. */
const Contact = () => (
  <>
    <MetaTags
      title="Contactez-Nous | BoostAI Consulting - Consultation Gratuite IA"
      description="Un site, un MVP, un agent IA&nbsp;? Décrivez votre projet en quelques lignes&nbsp;: réponse sous 24 h avec des premières pistes concrètes."
      keywords="contact, consultation gratuite, développement web, MVP, agent IA, BoostAI Consulting"
    />
    <main id="contenu" tabIndex={-1}>
      <PageHero
        label="(Contact)"
        line1="Parlons"
        line2="de votre projet."
        title="Contact&nbsp;: parlons de votre projet"
        height="md"
        foot={<span className="st-badge">Réponse sous 24 h</span>}
      >
        <p>
          Un site, un MVP, un agent IA&nbsp;? Quelques lignes suffisent&nbsp;: on vous répond sous 24&nbsp;h avec des
          premières pistes concrètes.
        </p>
      </PageHero>
      <ContactForm variant="page" />
    </main>
  </>
);

export default Contact;
