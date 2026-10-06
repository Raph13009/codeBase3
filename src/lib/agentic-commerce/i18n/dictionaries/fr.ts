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
    eyebrow: "Commerce IA · Retailers & marketplaces en Europe",
    h1: "Rendez votre catalogue achetable par les agents IA",
    subtitle:
      "Nous connectons votre catalogue, votre checkout et vos paiements aux assistants d’achat IA — via UCP, ACP et les protocoles à venir.",
    ctaPrimary: "Demander une évaluation",
    ctaSecondary: "Voir le programme pilote",
    reassurance: "Pensé pour le paiement et la réglementation européenne.",
    chips: {
      productName: "Sérum Hydra 30 ml",
      productPrice: "49 €",
      stock: "Stock synchronisé",
      agentName: "Assistant IA",
      agentAction: "Panier créé · 2 articles",
      paymentLabel: "Paiement",
      paymentDetail: "Authentification forte",
      order: "Commande confirmée",
    },
  },
  lens: {
    title: "Ce que voit un agent IA",
    hint: "Survolez le catalogue",
    hintTouch: "Touchez le catalogue",
    reveal: "Tout voir comme un agent",
    hide: "Revenir à la vue client",
    label: "Vue agent IA",
    inStock: "En stock",
    detected: "produit",
    products: [
      {
        name: "Sérum Hydra 30 ml",
        price: "49 €",
        fields: [
          { key: "prix", value: "49,00 EUR" },
          { key: "stock", value: "14 unités" },
          { key: "livraison", value: "48 h · UE" },
          { key: "checkout", value: "UCP" },
        ],
      },
      {
        name: "Écouteurs Air",
        price: "129 €",
        fields: [
          { key: "prix", value: "129,00 EUR" },
          { key: "stock", value: "32 unités" },
          { key: "livraison", value: "24 h · FR" },
          { key: "checkout", value: "ACP" },
        ],
      },
      {
        name: "Rouleau quartz rose",
        price: "39 €",
        fields: [
          { key: "prix", value: "39,00 EUR" },
          { key: "stock", value: "8 unités" },
          { key: "livraison", value: "48 h · UE" },
          { key: "checkout", value: "UCP" },
        ],
      },
      {
        name: "Foulard en soie",
        price: "89 €",
        fields: [
          { key: "prix", value: "89,00 EUR" },
          { key: "stock", value: "5 unités" },
          { key: "livraison", value: "72 h · UE" },
          { key: "checkout", value: "UCP" },
        ],
      },
    ],
  },
  market: {
    title: "Votre prochain client sera peut-être un agent IA",
    p1: "Les acheteurs commencent à demander à leur assistant de comparer, composer un panier et acheter à leur place.",
    p2: "Même produit, deux lecteurs. Un agent ne voit pas votre page : il lit vos données.",
  },
  problems: {
    title: "Quatre chantiers pour devenir achetable par l’IA",
    subtitle: "Ce que nous rendons lisible et opérable par les agents d’achat.",
    items: [
      {
        title: "Données produit prêtes pour l’IA",
        description: "Catalogue, prix, stock et livraison structurés pour les agents.",
        points: ["Titre & attributs", "Prix & devise", "Stock en temps réel", "Options de livraison"],
      },
      {
        title: "Checkout compatible agents",
        description: "Panier et checkout exposés de façon sécurisée via les protocoles.",
        points: ["Panier créé par l’agent", "Adresse & livraison", "Confirmation de commande"],
      },
      {
        title: "Paiements & consentement",
        description: "Votre paiement connecté, authentification et consentement préservés.",
        points: ["Consentement explicite", "Authentification forte (SCA)", "Vos PSP actuels"],
      },
      {
        title: "Conformité européenne",
        description: "RGPD, SCA, protection du consommateur et règles marketplace intégrés.",
        points: ["RGPD", "SCA", "Protection du consommateur", "Obligations marketplace"],
      },
    ],
  },
  pilot: {
    title: "Programme pilote fondateur",
    subtitle: "Trois étapes pour passer de l’audit à un premier canal IA en ligne.",
    steps: [
      {
        title: "Évaluation de maturité",
        description: "Catalogue, APIs, checkout, paiement et commandes passés en revue.",
      },
      {
        title: "Intégration pilote",
        description: "Un canal, un protocole ou un parcours connecté.",
      },
      {
        title: "Mesure & feuille de route",
        description: "Tests, monitoring et plan de déploiement plus large.",
      },
    ],
    previews: {
      audit: {
        title: "Audit de maturité",
        score: "Score",
        bars: ["Catalogue", "Checkout", "Paiement", "Commandes"],
      },
      connect: {
        title: "Connexion pilote",
        store: "Votre boutique",
        agent: "Agent IA",
        status: "Connecté · UCP",
        logs: ["Catalogue synchronisé", "Checkout exposé", "Paiement vérifié"],
      },
      measure: {
        title: "Suivi du pilote",
        metric: "Commandes via agents",
        roadmap: ["Pilote", "Extension", "Production"],
      },
    },
  },
  audience: {
    title: "Conçu pour le commerce complexe",
    items: [
      "Marketplaces",
      "Retailers multi-pays",
      "Adobe Commerce & sur-mesure",
      "Distributeurs B2B",
      "Travel & booking",
      "Multi-PSP ou multi-vendeurs",
    ],
  },
  whyNow: {
    title: "Pourquoi maintenant",
    items: [
      {
        title: "L’IA devient une vitrine",
        description: "Les assistants deviennent un canal de découverte produit.",
      },
      {
        title: "Les standards arrivent",
        description: "UCP et ACP évitent une intégration par agent et par marchand.",
      },
      {
        title: "L’Europe a ses règles",
        description: "Des contraintes de paiement et de conformité que les parcours génériques ignorent.",
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
