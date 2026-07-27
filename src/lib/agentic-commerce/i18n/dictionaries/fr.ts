import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    title:
      "Agentic Commerce by BoostAI Consulting | Évaluation & programme pilote",
    description:
      "Préparez votre plateforme e-commerce aux agents IA. BoostAI Consulting accompagne retailers et marketplaces avec une évaluation de maturité et des programmes pilotes fondateurs (UCP, ACP et protocoles émergents).",
    ogAlt: "Agentic Commerce by BoostAI Consulting",
  },
  nav: {
    problems: "Capacités",
    pilot: "Pilote",
    audience: "Pour qui",
    faq: "FAQ",
    assess: "Demander une évaluation",
    switchLabel: "EN",
    switchHref: "/en/agentic-commerce",
    homeLabel: "BoostAI Consulting",
  },
  hero: {
    brand: "Agentic Commerce by BoostAI Consulting",
    eyebrow: "Commerce agentique pour retailers et marketplaces en Europe",
    h1: "Rendez votre commerce compatible avec les agents IA",
    subtitle:
      "Nous aidons les retailers et marketplaces à connecter leurs catalogues, checkouts, paiements et systèmes de commande aux nouveaux canaux d’achat IA — via UCP, ACP et les futurs protocoles.",
    ctaPrimary: "Demander une évaluation",
    ctaSecondary: "Découvrir le programme pilote",
    reassurance:
      "Pensé pour le commerce, le paiement et la réglementation européenne.",
    flow: {
      assistants: "Assistants IA",
      gateway: "Passerelle commerce",
      systems: "Catalogue, checkout, paiement, commandes",
    },
  },
  market: {
    title: "Votre prochain client pourrait être un agent IA",
    p1: "La découverte produit se déplace progressivement des moteurs de recherche vers les recommandations générées par l’IA. L’étape suivante apparaît déjà : des assistants capables de comparer des offres, créer des paniers et réaliser des achats pour leurs utilisateurs.",
    p2: "La majorité des infrastructures e-commerce ont été conçues pour des sites utilisés par des humains, pas pour des agents autonomes.",
  },
  problems: {
    title: "Les problèmes que nous traitons",
    subtitle:
      "Quatre fondations pour rendre votre stack commerce lisible et opérable par les agents d’achat IA.",
    items: [
      {
        title: "Données produit prêtes pour l’IA",
        description:
          "Structurez catalogue, prix, disponibilité et livraison pour la découverte par les agents.",
      },
      {
        title: "Checkout compatible agents",
        description:
          "Exposez panier et checkout sécurisés via les protocoles de commerce.",
      },
      {
        title: "Paiements et consentement",
        description:
          "Connectez votre infrastructure de paiement tout en préservant authentification et consentement utilisateur.",
      },
      {
        title: "Conformité européenne",
        description:
          "Anticipez RGPD, SCA, protection des consommateurs et exigences marketplace.",
      },
    ],
  },
  pilot: {
    title: "Devenez partenaire pilote fondateur",
    subtitle:
      "Un programme ciblé pour évaluer la maturité, connecter un canal limité et définir une feuille de route de production.",
    steps: [
      {
        title: "Évaluation de maturité",
        description:
          "Analyse du catalogue, des APIs, du checkout, du paiement et des commandes.",
      },
      {
        title: "Intégration pilote",
        description: "Connexion d’un canal, protocole ou parcours limité.",
      },
      {
        title: "Mesure et feuille de route",
        description:
          "Tests, monitoring et feuille de route vers une mise en production plus large.",
      },
    ],
  },
  audience: {
    title: "Conçu pour des environnements commerce complexes",
    items: [
      "Marketplaces",
      "Retailers multi-pays",
      "Adobe Commerce et plateformes sur mesure",
      "Distributeurs B2B",
      "Plateformes travel et booking",
      "Entreprises multi-PSP ou multi-vendeurs",
    ],
  },
  whyNow: {
    title: "Pourquoi maintenant",
    items: [
      {
        title: "Canaux de découverte IA",
        description:
          "Les assistants IA deviennent des canaux de découverte produit.",
      },
      {
        title: "Interfaces standardisées",
        description:
          "UCP et ACP créent des interfaces commerce standardisées — pour éviter une intégration spécifique entre chaque agent et chaque marchand.",
      },
      {
        title: "Contraintes européennes",
        description:
          "Les entreprises européennes font face à des contraintes de paiement et de conformité que les parcours agents génériques ignorent souvent.",
      },
    ],
  },
  form: {
    title: "Évaluez votre maturité commerce agentique",
    subtitle:
      "Décrivez votre setup commerce. Nous l’analysons et vous répondons sous deux jours ouvrés.",
    fields: {
      email: "Email professionnel",
      name: "Nom et prénom",
      company: "Entreprise",
      website: "Site web de l’entreprise",
      role: "Fonction",
      platform: "Plateforme commerce",
      exploring: "Que souhaitez-vous explorer ?",
      volume: "Volume mensuel de commandes estimé",
      volumeOptional: "Facultatif",
      message: "Message",
      consent:
        "J’accepte d’être recontacté par BoostAI Consulting au sujet de cette évaluation.",
    },
    exploringOptions: [
      { value: "ai-product-discovery", label: "Découverte produit par IA" },
      { value: "ucp-acp", label: "Intégration UCP ou ACP" },
      { value: "agent-checkout", label: "Checkout compatible agents" },
      { value: "payments-compliance", label: "Paiements et conformité" },
      { value: "marketplace", label: "Intégration marketplace" },
      { value: "general", label: "Évaluation de maturité générale" },
    ],
    submit: "Envoyer la demande",
    submitting: "Envoi…",
    success:
      "Merci — nous analysons votre setup commerce et vous recontactons sous deux jours ouvrés.",
    error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
    validationError:
      "Veuillez renseigner tous les champs obligatoires avec des informations valides.",
    configError:
      "Ce formulaire est temporairement indisponible. Réessayez plus tard ou contactez-nous via la page Contact.",
    privacyNotice:
      "Vos informations sont utilisées uniquement pour répondre à cette demande d’évaluation. Consultez nos",
    privacyLinkLabel: "conditions OCR & confidentialité",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Qu’est-ce que le commerce agentique ?",
        answer:
          "Le commerce agentique désigne le modèle émergent où des assistants IA découvrent des produits, comparent des offres, construisent des paniers et finalisent des achats pour leurs utilisateurs — via des interfaces structurées, et non en naviguant un site comme un humain.",
      },
      {
        question: "Qu’est-ce que le Universal Commerce Protocol ?",
        answer:
          "Le Universal Commerce Protocol (UCP) vise à standardiser les interactions entre agents IA et marchands pour la découverte, le checkout et les actions commerce associées — afin d’éviter une intégration spécifique entre chaque agent et chaque boutique.",
      },
      {
        question: "Quelle est la différence entre UCP et ACP ?",
        answer:
          "UCP et ACP sont des initiatives de protocoles complémentaires dans le commerce agentique. Toutes deux définissent des interfaces machine pour interagir avec les systèmes commerce ; le choix dépend de vos canaux, partenaires et stack. Une évaluation de maturité identifie les chemins pertinents pour votre environnement.",
      },
      {
        question:
          "Un agent IA peut-il acheter directement sur une boutique en ligne ?",
        answer:
          "Oui — lorsque la boutique expose des capacités compatibles agents pour le catalogue, le panier, le checkout, le consentement de paiement et la confirmation de commande. Sans ces interfaces, les agents se limitent souvent à renvoyer l’utilisateur vers un site conçu pour les humains.",
      },
      {
        question:
          "UCP remplace-t-il une plateforme e-commerce ou un prestataire de paiement ?",
        answer:
          "Non. Les protocoles de type UCP s’interfacent entre les canaux IA et votre infrastructure existante (commerce, checkout, paiement). Votre plateforme et vos PSP restent les systèmes de référence.",
      },
      {
        question:
          "Comment un retailer peut-il se préparer aux agents d’achat IA ?",
        answer:
          "En structurant les données produit et disponibilité, en clarifiant checkout et consentement de paiement, en identifiant les cibles de protocole (UCP, ACP ou partenaires), puis en lançant un pilote limité avant un déploiement plus large.",
      },
      {
        question: "Quelles exigences de conformité en Europe ?",
        answer:
          "Les déploiements européens doivent typiquement prendre en compte le RGPD, l’authentification forte du client (SCA), la protection des consommateurs, et les obligations marketplace en cas de multi-vendeurs ou multi-PSP. Les parcours agents doivent préserver authentification et consentement.",
      },
    ],
  },
  footer: {
    tagline:
      "Agentic Commerce by BoostAI Consulting — évaluations de maturité et programmes pilotes fondateurs pour retailers et marketplaces en Europe.",
    contact: "Contact",
    privacy: "Conditions OCR & confidentialité",
    home: "BoostAI Consulting",
    rights: "Tous droits réservés.",
  },
};
