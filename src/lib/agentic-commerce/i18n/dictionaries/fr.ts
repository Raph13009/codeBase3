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
    h1: "Rendez votre commerce achetable par les agents IA.",
    subtitle:
      "Nous connectons catalogues, checkouts, paiements et commandes aux nouveaux canaux d’achat IA, via UCP, ACP et les protocoles qui arrivent. Pour les retailers et marketplaces en Europe.",
    ctaPrimary: "Demander une évaluation",
    ctaSecondary: "Découvrir le programme pilote",
    reassurance: "Pensé pour le paiement et la réglementation européenne.",
    tag: "Commerce IA",
    badge: "Programme pilote fondateur ouvert",
    titleBefore: "Rendez votre commerce",
    titleAfter: "par les agents IA.",
    rotating: ["achetable", "comparable", "lisible", "payable"],
    ctaDemo: "Voir la démo",
  },
  console: {
    label: "Simulation",
    title: "Un agent d’achat passe commande chez un marchand équipé par BoostAI",
    region: "Démo : un agent d’achat passe commande",
    pause: "Mettre la démo en pause",
    resume: "Reprendre la démo",
    replay: "Rejouer la démo",
    chatTitle: "Assistant IA",
    chatSub: "Côté client",
    gatewayTitle: "Passerelle BoostAI",
    gatewaySub: "Requêtes agent en direct",
    gatewayChecks: ["Authentification", "Consentement", "Monitoring"],
    systemsTitle: "Vos systèmes",
    systemsSub: "Maison Tympan, marchand fictif",
    tiles: ["Catalogue", "Checkout", "Paiement", "Commandes"],
    pending: "En attente",
    stepsLabel: "Étapes de la démo",
    steps: ["Recherche", "Fiche produit", "Livraison", "Panier", "Paiement", "Commande"],
    script: {
      query:
        "Trouve-moi un casque à réduction de bruit pour le train, max 150 €, livré à Lyon avant vendredi.",
      searchDetail: 'q="casque réduction de bruit" · prix ≤ 150 €',
      searchTile: "3 produits trouvés",
      searchReply: "3 offres correspondent. Je vérifie la meilleure.",
      productDetail: "fiche structurée · en stock",
      productTile: "En stock · 119,00 €",
      productName: "Casque sans fil à réduction de bruit",
      productMeta: "Maison Tympan · 119,00 €",
      productStock: "En stock",
      deliveryDetail: "69002 · avant vendredi",
      deliveryTile: "Jeudi · 4,90 €",
      deliveryReply: "Livraison possible jeudi à Lyon, 4,90 €.",
      basketDetail: "1 article · 123,90 € TTC",
      basketTile: "Session ouverte",
      basketReply: "Panier prêt : 123,90 € TTC. J’ai besoin de votre accord pour payer.",
      consentLabel: "Accord de paiement",
      consentAmount: "123,90 € à Maison Tympan",
      consentNote: "Authentification forte requise",
      confirm: "Confirmer",
      authorized: "Paiement autorisé",
      paymentDetail: "123,90 € · authentification forte",
      paymentTile: "Authentification forte",
      paymentDoneDetail: "consentement vérifié",
      paymentDoneTile: "Autorisé",
      orderDetail: "MT-20418 · livraison jeudi",
      orderTile: "Créée · MT-20418",
      orderReplyStrong: "Commande MT-20418 confirmée.",
      orderReply: "Livraison jeudi.",
    },
  },
  marquee: {
    label: "Ce que nous rendons lisible par les agents",
    items: [
      "Catalogue",
      "Prix",
      "Stock",
      "Livraison",
      "Panier",
      "Checkout",
      "Paiement",
      "Consentement",
      "Commande",
      "Retours",
    ],
  },
  market: {
    title: "La découverte produit quitte la barre de recherche",
    p1: "Les assistants IA comparent les offres, composent le panier et achètent pour leurs utilisateurs.",
    p2: "La plupart des stacks e-commerce ont été conçues pour des humains qui cliquent, pas pour des agents qui appellent des API.",
  },
  manifesto: {
    eyebrow: "Le basculement",
    before: "La découverte produit quitte la barre de recherche. Les assistants IA",
    middle:
      "comparent les offres, composent le panier et achètent pour leurs utilisateurs. La plupart des stacks e‑commerce ont été conçues pour des humains qui cliquent, pas pour des",
    agents: "agents",
    after: "qui appellent des API.",
  },
  whyNow: {
    title: "Pourquoi maintenant",
    eyebrow: "Pourquoi maintenant",
    heading: "Le marché bouge sur trois fronts.",
    hint: "Cliquez sur une carte pour l’ouvrir.",
    items: [
      {
        title: "Canaux de découverte IA",
        description:
          "Les assistants IA deviennent des canaux de découverte produit. Votre client ne compare plus dix liens : il lit la sélection que son assistant lui propose.",
        fact: "L’agent ne retient que les offres dont il comprend les données.",
      },
      {
        title: "Interfaces standardisées",
        description:
          "UCP et ACP créent des interfaces commerce standardisées, pour éviter une intégration spécifique entre chaque agent et chaque marchand.",
        fact: "3 agents × 4 marchands = **12** intégrations. Avec un protocole commun : **3 + 4**.",
      },
      {
        title: "Contraintes européennes",
        description:
          "Les entreprises européennes font face à des contraintes de paiement et de conformité que les parcours agents génériques ignorent souvent.",
        fact: "RGPD, authentification forte, protection des consommateurs, obligations marketplace.",
      },
    ],
    search: {
      query: "casque réduction de bruit",
      links: "Moteur de recherche · 10 liens à ouvrir",
      answerLabel: "Assistant IA",
      answer: "Le même casque chez 3 marchands, livrable avant vendredi",
      offers: [
        { merchant: "Sonora", detail: "Noir · 115 €" },
        { merchant: "Maison Tympan", detail: "Sable · 119 €" },
        { merchant: "Ondine", detail: "Bleu nuit · 124 €" },
      ],
      legend: ["Recherche", "Assistant IA"],
    },
    protocols: {
      agents: "Agents",
      merchants: "Marchands",
      customLabel: "intégrations sur mesure",
      protocolLabel: "connexions via un protocole",
      legend: ["Sans protocole", "UCP · ACP"],
    },
    europe: {
      generic: "Parcours agent générique",
      genericResult: "Bloqué à l’authentification forte",
      boost: "Parcours BoostAI",
      boostResult: "Paiement autorisé, commande créée",
      checkpoints: ["RGPD", "SCA", "Conso", "Marketplace"],
      legend: ["RGPD", "SCA", "Protection conso", "Marketplace"],
    },
  },
  xray: {
    eyebrow: "Lecture agent",
    title: "Votre client voit une fiche produit. Son agent lit des données.",
    lead: "Faites glisser le curseur sur la fiche. Un agent ne regarde pas votre mise en page, il interroge des champs. Quand un champ manque, il ne peut pas conclure la vente.",
    group: "État de la fiche produit",
    today: "Aujourd’hui",
    withBoost: "Avec BoostAI",
    note: "Comparez la même fiche avant et après notre passage.",
    meter: "champs exploitables par un agent",
    fix: "Corriger les 4 champs",
    undo: "Revoir l’état actuel",
    tagClient: "Vue client",
    tagAgent: "Vue agent",
    range: "Comparer la vue client et la vue agent",
    shop: {
      brand: "Maison Tympan",
      categories: "Casques · Écouteurs · Enceintes",
      crumb: "Accueil › Casques › Sans fil",
      title: "Casque sans fil à réduction de bruit",
      price: "119,00 €",
      stock: "En stock",
      variant: "Couleur : Sable",
      cta: "Ajouter au panier",
      shipping: "Livraison rapide offerte dès 150 €",
      returns: "Retours : voir nos CGV",
      reference: "Réf. CQ-119",
    },
    agent: {
      request: "Requête de l’agent",
      fields: "application/json · 10 champs",
      category: "audio/casques",
      variants: '["sable", "noir", "bleu-nuit"]',
      shippingText: "Livraison rapide…",
      badges: {
        checkout: "Achat impossible",
        shipping: "Texte libre",
        gtin: "Manquant",
        returns: "Dans les CGV",
      },
    },
  },
  problems: {
    title: "Quatre fondations pour un commerce agent-ready.",
    subtitle:
      "Quatre fondations pour rendre votre stack commerce lisible et opérable par les agents d’achat IA.",
    eyebrow: "Ce que nous traitons",
    layer: "Couche",
    items: [
      {
        title: "Données produit prêtes pour l’IA",
        description:
          "Structurez catalogue, prix, disponibilité et livraison pour la découverte par les agents.",
      },
      {
        title: "Checkout compatible agents",
        description: "Exposez panier et checkout sécurisés via les protocoles de commerce.",
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
    slabs: {
      data: "Données produit",
      checkout: "Checkout",
      payment: "Paiement",
      compliance: "Conformité UE",
      dataTags: ["prix", "stock", "livraison", "GTIN"],
      consent: ["SCA ✓", "Consentement ✓"],
      complianceTags: ["RGPD", "SCA", "Conso", "Marketplace"],
    },
    ready: "Agent-ready",
  },
  architecture: {
    eyebrow: "Architecture",
    title: "Une passerelle entre les agents IA et votre stack.",
    lead: "UCP et ACP standardisent les échanges entre agents et marchands. Nous construisons la couche qui les traduit vers vos systèmes, avec authentification, consentement et monitoring.",
    channelsTitle: "Canaux IA",
    channels: ["Assistant conversationnel", "Agent d’achat", "Moteur de réponse IA"],
    systemsTitle: "Vos systèmes",
    systems: ["Catalogue · PIM", "Checkout", "PSP", "Commandes · OMS"],
    gatewayTitle: "Passerelle BoostAI",
    gatewaySub: "Un point d’entrée par protocole",
    gatewayChecks: ["Authentification", "Consentement de paiement", "Tests et monitoring"],
    claims: [
      {
        title: "Votre plateforme reste la référence.",
        text: "La passerelle s’interface avec votre infrastructure existante. Votre plateforme e-commerce et vos PSP restent les systèmes de référence.",
      },
      {
        title: "Une intégration par protocole.",
        text: "Un seul point d’entrée par protocole, au lieu d’une intégration par agent et par boutique.",
      },
      {
        title: "Le client garde la main.",
        text: "Les parcours agents préservent l’authentification forte et l’accord explicite du client avant chaque paiement.",
      },
    ],
  },
  pilot: {
    title: "Devenez partenaire pilote fondateur.",
    subtitle:
      "Un programme ciblé pour évaluer la maturité, connecter un canal limité et définir une feuille de route de production.",
    eyebrow: "Programme pilote",
    steps: [
      {
        title: "Évaluation de maturité",
        description:
          "Analyse du catalogue, des APIs, du checkout, du paiement et des commandes.",
      },
      {
        title: "Intégration pilote",
        description: "Connexion d’un canal, d’un protocole ou d’un parcours limité.",
      },
      {
        title: "Mesure et feuille de route",
        description:
          "Tests, monitoring et feuille de route vers une mise en production plus large.",
      },
    ],
    cardTitle: "Un canal, un protocole, un parcours limité.",
    cardText:
      "On le connecte, on le mesure en conditions réelles, puis on écrit avec vous la feuille de route de production.",
    cardCta: "Candidater au pilote",
  },
  audience: {
    title: "Conçu pour des environnements commerce complexes.",
    eyebrow: "Pour qui",
    items: [
      "Marketplaces",
      "Retailers multi-pays",
      "Adobe Commerce et plateformes sur mesure",
      "Distributeurs B2B",
      "Plateformes travel et booking",
      "Entreprises multi-PSP ou multi-vendeurs",
    ],
  },
  form: {
    title: "Évaluez votre maturité commerce agentique.",
    subtitle:
      "Décrivez votre setup commerce. Nous l’analysons et vous répondons sous deux jours ouvrés.",
    eyebrow: "Évaluation",
    gets: [
      "Catalogue, APIs, checkout, paiement et commandes passés en revue",
      "Les protocoles pertinents pour votre stack : UCP, ACP ou partenaires",
      "Réponse sous deux jours ouvrés",
    ],
    fields: {
      email: "Email professionnel",
      name: "Nom et prénom",
      company: "Entreprise",
      website: "Site web de l’entreprise",
      role: "Fonction",
      platform: "Plateforme commerce",
      exploring: "Que souhaitez-vous explorer ?",
      volume: "Volume mensuel de commandes estimé",
      volumeOptional: "facultatif",
      message: "Message",
      consent:
        "J’accepte d’être recontacté par BoostAI Consulting au sujet de cette évaluation.",
    },
    placeholders: {
      website: "https://",
      platform: "Adobe Commerce, sur mesure…",
      volume: "ex. 5 000",
    },
    errors: {
      email: "Saisissez un email professionnel valide, par exemple nom@entreprise.fr.",
      name: "Indiquez votre nom et prénom.",
      company: "Indiquez le nom de votre entreprise.",
      website: "Saisissez l’adresse du site, par exemple https://entreprise.fr.",
      role: "Indiquez votre fonction.",
      platform: "Indiquez votre plateforme commerce, ou « sur mesure ».",
      exploring: "Choisissez ce que vous souhaitez explorer.",
      consent: "Cochez cette case pour que nous puissions vous répondre.",
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
      "Merci, nous analysons votre setup commerce et vous recontactons sous deux jours ouvrés.",
    again: "Envoyer une autre demande",
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
    title: "Questions fréquentes.",
    eyebrow: "FAQ",
    items: [
      {
        question: "Qu’est-ce que le commerce agentique ?",
        answer:
          "Le commerce agentique désigne le modèle émergent où des assistants IA découvrent des produits, comparent des offres, construisent des paniers et finalisent des achats pour leurs utilisateurs, via des interfaces structurées, et non en naviguant un site comme un humain.",
      },
      {
        question: "Qu’est-ce que le Universal Commerce Protocol ?",
        answer:
          "Le Universal Commerce Protocol (UCP) vise à standardiser les interactions entre agents IA et marchands pour la découverte, le checkout et les actions commerce associées, afin d’éviter une intégration spécifique entre chaque agent et chaque boutique.",
      },
      {
        question: "Quelle est la différence entre UCP et ACP ?",
        answer:
          "UCP et ACP sont des initiatives de protocoles complémentaires dans le commerce agentique. Toutes deux définissent des interfaces machine pour interagir avec les systèmes commerce ; le choix dépend de vos canaux, partenaires et stack. Une évaluation de maturité identifie les chemins pertinents pour votre environnement.",
      },
      {
        question: "Un agent IA peut-il acheter directement sur une boutique en ligne ?",
        answer:
          "Oui, lorsque la boutique expose des capacités compatibles agents pour le catalogue, le panier, le checkout, le consentement de paiement et la confirmation de commande. Sans ces interfaces, les agents se limitent souvent à renvoyer l’utilisateur vers un site conçu pour les humains.",
      },
      {
        question: "UCP remplace-t-il une plateforme e-commerce ou un prestataire de paiement ?",
        answer:
          "Non. Les protocoles de type UCP s’interfacent entre les canaux IA et votre infrastructure existante (commerce, checkout, paiement). Votre plateforme et vos PSP restent les systèmes de référence.",
      },
      {
        question: "Comment un retailer peut-il se préparer aux agents d’achat IA ?",
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
  cta: {
    title: "Prêt à vendre aux agents IA",
    demo: "Revoir la démo",
    assess: "Demander une évaluation",
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
