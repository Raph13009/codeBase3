/**
 * Every project and agent shown on the site: the /realisations index,
 * the case study pages (/project/:id, /agent/:id) and the homepage reel.
 * Texts come from the previous project pages; colours from each product's identity.
 */

export type CaseType = "web" | "agent";

export type Shot = { src: string; w: number; h: number };

export type Case = {
  type: CaseType;
  /** Route parameter (/project/:id or /agent/:id). */
  id: string;
  href: string;
  name: string;
  /** Long title, used for the page <title>. */
  metaTitle: string;
  /** Short kind of product, e.g. "Application e-learning". */
  category: string;
  /** Three key technologies, e.g. "TypeScript · Supabase · Stripe". */
  stackShort: string;
  intro: string;
  summary: string;
  stack: string[];
  features: string[];
  tags: string[];
  /** Wide image at the top of the case study (none: typographic poster). */
  cover?: Shot;
  /** Image of the card in the index and the homepage reel. */
  card?: string;
  /** object-position of the card image when its framing needs a hint. */
  cardPos?: string;
  /** wide: screenshot fills the card · tall: screenshot + name · phone: mobile screenshot · poster: name only */
  layout: "wide" | "tall" | "phone" | "poster";
  gallery: Shot[];
  bg: string;
  fg: string;
  status?: string;
};

const shot = (src: string, w: number, h: number): Shot => ({ src, w, h });
const R = "/realisation";

const WEB: Omit<Case, "type" | "href">[] = [
  {
    id: "10",
    name: "Oenoboost",
    metaTitle: "OENOBOOST – Application éducative sur le monde du vin",
    category: "Application e-learning",
    stackShort: "TypeScript · Supabase · Stripe",
    intro:
      "Application web éducative autour du vin\u00a0: carte interactive des vignobles français (Mapbox), modules d'apprentissage, outil de dégustation guidée et quiz gamifiés avec abonnement premium.",
    summary:
      "OenoBoost est une plateforme e-learning complète dédiée au monde du vin, développée en TypeScript avec Supabase. Elle intègre une carte interactive des appellations françaises via Mapbox, des modules pédagogiques (vignoble, cépages, vinification, dictionnaire), un outil de dégustation visuelle, des quiz gamifiés et un système d'abonnement premium via Stripe. Un projet ambitieux, bilingue, mobile-first et monétisé dès le lancement.",
    stack: ["TypeScript", "Supabase (Auth + DB)", "Mapbox API", "Stripe (abonnements)", "Resend (emails)", "i18n FR/EN"],
    features: [
      "Carte interactive des vignobles français via l'API Mapbox avec navigation régions et AOP",
      "Modules d'apprentissage complets\u00a0: Vignoble, Cépages, Sols, Vinification, Dictionnaire",
      "Outil de dégustation guidée pas-à-pas avec sélection visuelle des couleurs de robe",
      "Système de quiz multi-niveaux\u00a0: débutant, intermédiaire, expert et question du jour",
      "Profil utilisateur avec système de progression XP et niveaux gamifiés",
      "Système d'abonnement premium géré via Stripe avec contrôle des accès",
      "Notifications et emails transactionnels via Resend",
      "Application bilingue FR/EN avec switch de langue intégré",
      "Interface mobile-first avec design élégant aux tons beige et bordeaux",
    ],
    tags: ["TypeScript", "Supabase", "Mapbox", "Stripe", "Resend", "Éducatif"],
    cover: shot(`${R}/oenoboost/main2.webp`, 1535, 1024),
    card: `${R}/oenoboost/main.webp`,
    layout: "phone",
    gallery: [
      shot(`${R}/oenoboost/main.webp`, 680, 1490),
      shot(`${R}/oenoboost/oenoboost-map-france.webp`, 690, 1480),
      shot(`${R}/oenoboost/oenoboost-map-region.webp`, 686, 1484),
      shot(`${R}/oenoboost/oenoboost-map-bordeaux.webp`, 2940, 1670),
      shot(`${R}/oenoboost/oenoboost-map-rhone.webp`, 2940, 1672),
      shot(`${R}/oenoboost/oenoboost-vinification.webp`, 2940, 1668),
      shot(`${R}/oenoboost/oenoboost-degustation.webp`, 2940, 1672),
      shot(`${R}/oenoboost/oenoboost-profil.webp`, 686, 1486),
      shot(`${R}/oenoboost/oenoboost-menu.webp`, 690, 1490),
    ],
    bg: "#e8dccb",
    fg: "#6b1d2b",
  },
  {
    id: "9",
    name: "MyTable",
    metaTitle: "MYTABLE – Plateforme full-stack de booking et gestion de missions",
    category: "Plateforme de réservation",
    stackShort: "Supabase Realtime · Resend",
    intro:
      "Plateforme complète où les clients réservent un chef à domicile, gèrent leurs demandes et communiquent en temps réel.",
    summary:
      "MYTABLE est une grosse plateforme B2C/B2B développée à 100% en TypeScript avec Supabase/PostgreSQL. Elle couvre tout le cycle métier\u00a0: acquisition de clients, réservation de chefs, coordination en temps réel, gestion des missions et communication automatisée. Une base technique robuste qui tourne en production et supporte des flux opérationnels complets.",
    stack: ["TypeScript", "Supabase (Auth + Realtime + DB)", "PostgreSQL", "Resend", "APIs tierces"],
    features: [
      "Parcours de réservation complet pour booker un chef à domicile",
      "Système de gestion des réservations avec statut de mission",
      "Messagerie temps réel intégrée via Supabase Realtime",
      "Gestion du menu, du nombre de couverts et du pricing dynamique",
      "Espace chef pour accepter ou refuser les missions reçues",
      "Notifications transactionnelles et communication email via Resend",
      "Synchronisation back-office des données clients, missions et paiements",
      "Architecture modulaire full TypeScript pensée pour évoluer rapidement",
    ],
    tags: ["TypeScript", "Supabase", "PostgreSQL", "Realtime", "Resend"],
    cover: shot(`${R}/mytable/mytable-2.webp`, 1920, 1098),
    card: `${R}/mytable/mytable-1.webp`,
    layout: "wide",
    gallery: [
      shot(`${R}/mytable/mytable-1.webp`, 1920, 921),
      shot(`${R}/mytable/mytable-3.webp`, 1920, 1091),
      shot(`${R}/mytable/mytable-4.webp`, 1920, 1094),
      shot(`${R}/mytable/mytable-5.webp`, 1920, 1101),
      shot(`${R}/mytable/mytable-6.webp`, 1920, 1105),
    ],
    bg: "#f2cc48",
    fg: "#1b1b1b",
  },
  {
    id: "8",
    name: "Koacher",
    metaTitle: "KOACHER B2B – Site web de présentation commerciale",
    category: "Site commercial B2B",
    stackShort: "Webflow · CMS · SEO",
    intro:
      "Site web B2B pour KOACHER, conçu pour présenter l'offre, rassurer les prospects et générer des prises de contact qualifiées.",
    summary:
      "KOACHER B2B est une vitrine commerciale moderne construite avec Webflow pour soutenir l'acquisition de leads. Le site met en avant les services, clarifie le positionnement de la marque et propose un parcours fluide pour transformer les visiteurs en prospects qualifiés.",
    stack: ["Webflow", "CMS Webflow", "Design system", "SEO on-page", "Responsive design"],
    features: [
      "Page d'accueil orientée conversion avec proposition de valeur claire",
      "Sections dédiées aux offres, bénéfices métier et cas d'usage",
      "Architecture de contenu pensée pour un parcours prospect B2B",
      "Composants visuels réutilisables pour accélérer les évolutions",
      "Mise en page responsive optimisée desktop, tablette et mobile",
      "Intégration de formulaires de contact pour la génération de leads",
      "Optimisation SEO on-page (titres, structure, lisibilité)",
      "Temps de chargement amélioré grâce à des visuels compressés",
    ],
    tags: ["Webflow", "B2B", "CMS", "Landing Page", "Responsive"],
    cover: shot(`${R}/koacher/koacher-b2b-1.webp`, 1920, 1078),
    card: `${R}/koacher/koacher-b2b-1.webp`,
    layout: "tall",
    gallery: [
      shot(`${R}/koacher/koacher-b2b-2.webp`, 1920, 1086),
      shot(`${R}/koacher/koacher-b2b-3.webp`, 1920, 1081),
      shot(`${R}/koacher/koacher-b2b-4.webp`, 1920, 1081),
      shot(`${R}/koacher/koacher-b2b-5.webp`, 1920, 1085),
      shot(`${R}/koacher/koacher-b2b-6.webp`, 1920, 1080),
      shot(`${R}/koacher/koacher-b2b-7.webp`, 1920, 1079),
    ],
    bg: "#151517",
    fg: "#f0efeb",
  },
  {
    id: "6",
    name: "Kivaiakids",
    metaTitle: "KIVAIAKIDS – Plateforme éducative multilingue pour enfants",
    category: "Plateforme éducative",
    stackShort: "Next.js · Supabase",
    intro:
      "Plateforme complète d'apprentissage des langues pour enfants avec interface professeur dédiée et système de gestion de contenu.",
    summary:
      "KIVAIAKIDS révolutionne l'apprentissage des langues pour les enfants avec une plateforme complète qui donne aux professeurs tous les outils nécessaires pour créer des cours engageants. L'interface professeur permet de gérer facilement le contenu, tandis que les enfants bénéficient d'une expérience d'apprentissage moderne et interactive.",
    stack: ["Next.js", "Supabase (auth + base de données)", "TailwindCSS", "Upload de fichiers", "Système de cours"],
    features: [
      "Interface professeur complète avec éditeur de cours intégré",
      "Système de création de cours avec éditeur de texte avancé (type Word)",
      "Upload et gestion de livres, audios et documents multimédias",
      "Organisation des cours par niveaux et catégories",
      "Interface élève intuitive et gamifiée",
      "Système de progression et de suivi des apprentissages",
      "Gestion des utilisateurs (professeurs et élèves)",
      "Design responsive optimisé pour tablettes et mobiles",
    ],
    tags: ["Next.js", "Supabase", "CMS", "Upload", "Multi-média"],
    cover: shot(`${R}/kivaiakidsMain.webp`, 1536, 1024),
    card: `${R}/kivaiakidsMain.webp`,
    layout: "wide",
    gallery: [
      shot(`${R}/kivaiakids1.webp`, 2940, 1662),
      shot(`${R}/kivaiakids2.webp`, 2940, 1660),
      shot(`${R}/kivaiakids3.webp`, 2938, 1662),
      shot(`${R}/kivaiakids4.webp`, 2938, 1662),
      shot(`${R}/kivaiakids5.webp`, 2940, 1654),
      shot(`${R}/kivaiakids6.webp`, 2940, 1658),
    ],
    bg: "#d9e9da",
    fg: "#1f5e3b",
  },
  {
    id: "1",
    name: "Avenirea",
    metaTitle: "AVENIREA – Plateforme d'orientation post-bac automatisée",
    category: "MVP d'orientation avec IA",
    stackShort: "Next.js · Stripe · GPT-4",
    intro: "Test d'orientation intelligent, automatisé et monétisé.",
    summary:
      "AVENIREA est un MVP complet conçu pour aider des lycéens à découvrir leur profil d'orientation. Le test repose sur une logique métier précise (modèle RIASEC), combinée à une base de données de formations et métiers. Une synthèse personnalisée est générée via GPT-4, puis monétisée à travers un système de déblocage sécurisé.",
    stack: ["Next.js", "Supabase (auth + base de données)", "Stripe", "GPT-4", "TailwindCSS"],
    features: [
      "Calcul du profil RIASEC selon les réponses de l'utilisateur",
      "Base de données structurée des filières et métiers associés",
      "Résumé personnalisé généré automatiquement via GPT-4 (OpenAI API)",
      "Prédictions de métiers et parcours d'études supérieures adaptés",
      "Blocage intelligent du résultat final, déverrouillé après paiement Stripe",
      "Interface fluide et responsive, optimisée pour desktop et mobile",
    ],
    tags: ["Next.js", "Supabase", "Stripe", "GPT-4"],
    cover: shot(`${R}/AvenireaMain.webp`, 1693, 929),
    card: `${R}/AvenireaMain.webp`,
    layout: "tall",
    gallery: [
      shot(`${R}/avenirea1.webp`, 2938, 1664),
      shot(`${R}/avenirea2.webp`, 2940, 1666),
      shot(`${R}/avenirea3.webp`, 2940, 1662),
      shot(`${R}/avenirea4.webp`, 2938, 1664),
      shot(`${R}/avenireamobile.webp`, 676, 1456),
    ],
    bg: "#d7eeee",
    fg: "#0f4c5c",
  },
  {
    id: "2",
    name: "Musiclinks",
    metaTitle: "MUSICLINKS – Plateforme de mise en relation pour artistes et prestataires",
    category: "Marketplace mobile-first",
    stackShort: "Next.js · Messagerie temps réel",
    intro:
      "Marketplace mobile-first où artistes et prestataires peuvent créer un compte, se faire repérer, liker des profils et échanger directement via messagerie.",
    summary:
      "MUSICLINKS est une plateforme complète de mise en relation dans le monde de la musique. Pensée pour mobile, elle permet à des utilisateurs de se découvrir, liker des profils, et discuter en direct. Le tout repose sur une architecture full stack légère et rapide, avec une vraie logique produit, un design épuré, et une expérience fluide dès la version 1.",
    stack: ["Next.js", "Supabase (auth, base de données, messaging)", "TailwindCSS", "Realtime messaging", "Auth multi-rôle"],
    features: [
      "Inscription & création de compte utilisateur",
      "Deux types de profils\u00a0: Artistes visibles dans un catalogue spécifique, Prestataires dans un autre catalogue",
      "Interface pensée mobile-first, fluide et rapide",
      "Système de like entre utilisateurs pour repérage ou coup de cœur",
      "Messagerie directe intégrée (type chat), connectée à Supabase",
      "Interface de profil\u00a0: bio, photos, disponibilité, etc.",
    ],
    tags: ["Next.js", "Supabase", "Realtime Messaging", "Mobile-first", "Marketplace"],
    cover: shot(`${R}/musiclinkscover-1600.jpg`, 1600, 820),
    card: `${R}/musiclinkscover-1600.jpg`,
    layout: "wide",
    gallery: [
      shot(`${R}/musiclinksreal.webp`, 682, 1474),
      shot(`${R}/musiclinksreal2.webp`, 678, 1472),
      shot(`${R}/musiclinksreal3.webp`, 680, 1468),
      shot(`${R}/musiclinksreal4.webp`, 1800, 1019),
      shot(`${R}/musiclinksreal5.webp`, 682, 1472),
    ],
    bg: "#1a1626",
    fg: "#e9e4ff",
  },
  {
    id: "3",
    name: "Getlazo",
    metaTitle: "GETLAZO – Marketplace de Loyalty Tests",
    category: "Marketplace de loyalty tests",
    stackShort: "Next.js · Node.js · Stripe",
    intro: "Plateforme complète pour orchestrer, vendre et gérer des tests de fidélité.",
    summary:
      "Plus de 1 000 tests réalisés en 6 mois. Process 100 % automatisé après onboarding client. Temps moyen de livraison\u00a0: moins de 12 h. ROI immédiat\u00a0: plateforme monétisée dès le premier mois.",
    stack: ["React.js (Next.js)", "Node.js + Express", "PostgreSQL", "Stripe", "EmailJS + Intercom", "Admin Panel"],
    features: [
      "Chat asynchrone entre clients & testeurs (modération intégrée)",
      "Catalogue dynamique avec filtres (sexe, prix, dispo…)",
      "Système d'attribution intelligent selon critères clients",
      "Workflow complet de mission\u00a0: création → validation → feedback",
      "Dashboard interne\u00a0: suivi des commandes, performances testeurs, stats mensuelles",
      "Paiement sécurisé avec Stripe + logique conditionnelle de release (test validé ou non)",
      "Gestion fine des permissions & statuts (admin, checker, client)",
      "Système de support automatisé avec Intercom",
    ],
    tags: ["Marketplace", "React", "PostgreSQL", "Stripe", "Backend Custom"],
    cover: shot(`${R}/lazo5.webp`, 1800, 1020),
    card: `${R}/lazo1.webp`,
    layout: "phone",
    gallery: [
      shot(`${R}/lazo1.webp`, 682, 1430),
      shot(`${R}/lazo2.webp`, 678, 1468),
      shot(`${R}/lazo3.webp`, 680, 1474),
      shot(`${R}/lazo4.webp`, 674, 1464),
    ],
    bg: "#f3e3ea",
    fg: "#7a1f45",
  },
  {
    id: "7",
    name: "Fast Consulting",
    metaTitle: "FAST CONSULTING – Plateforme d'automatisation des démarches administratives",
    category: "Automatisation administrative",
    stackShort: "Next.js 14 · Supabase · Stripe",
    intro:
      "Application web permettant d'automatiser les démarches administratives avec questionnaire intelligent, paiement sécurisé et notifications email.",
    summary:
      "FAST CONSULTING automatise entièrement la gestion des démarches administratives\u00a0: du questionnaire client au paiement, jusqu'à la notification de l'entreprise. Architecture moderne avec Next.js 14, base de données temps réel Supabase, paiements sécurisés Stripe et emails transactionnels via Hostinger. Une solution complète déployée sur Vercel pour des performances optimales.",
    stack: [
      "Next.js 14 (App Router)",
      "Supabase (auth + base de données)",
      "Stripe (paiement)",
      "Hostinger (email SMTP)",
      "Vercel (déploiement)",
      "TailwindCSS",
    ],
    features: [
      "Formulaire dynamique multi-étapes avec validation en temps réel",
      "Système de questionnaire intelligent adaptatif selon le type de démarche",
      "Intégration Stripe pour paiement sécurisé avec confirmation instantanée",
      "Envoi automatique d'emails récapitulatifs via Hostinger SMTP",
      "Notification email entreprise avec toutes les réponses du questionnaire formatées",
      "Dashboard de gestion des demandes avec statuts en temps réel",
      "Stockage sécurisé des données dans Supabase avec politique de confidentialité RGPD",
      "Interface responsive optimisée mobile et desktop",
      "Système de suivi des demandes pour les clients",
      "Gestion des pièces justificatives et documents administratifs",
    ],
    tags: ["Next.js", "Supabase", "Stripe", "Email automation", "Vercel"],
    cover: shot(`${R}/fast-consulting.webp`, 1800, 896),
    card: `${R}/fast-consulting.webp`,
    cardPos: "left center",
    layout: "wide",
    gallery: [],
    bg: "#dcf0f4",
    fg: "#0c5a6b",
  },
  {
    id: "5",
    name: "Blue Garden",
    metaTitle: "BLUE GARDEN – Site vitrine associatif en React",
    category: "Site vitrine associatif",
    stackShort: "React · Vite · EmailJS",
    intro: "Site vitrine simple et élégant pour une association, avec page contact et section événements.",
    summary:
      "Un site vitrine moderne et rapide pour l'association BLUE GARDEN, pensé pour être maintenu sans back-end lourd, avec un système simple pour publier des événements.",
    stack: ["React", "Vite", "TailwindCSS", "EmailJS (contact)", "Static content"],
    features: [
      "Design responsive et épuré",
      "Formulaire de contact avec envoi d'e-mail",
      "Section Événements\u00a0: ajout/modification simple sans base de données",
      "Pages statiques performantes (SEO-ready)",
    ],
    tags: ["React", "Responsive", "Contact", "CMS-less"],
    cover: shot(`${R}/BlueGardenMain.webp`, 1693, 929),
    card: `${R}/BlueGardenMain.webp`,
    layout: "tall",
    gallery: [
      shot(`${R}/bluegarden1.webp`, 2938, 1668),
      shot(`${R}/bluegarden2.webp`, 2928, 1664),
      shot(`${R}/bluegarden3.webp`, 2924, 1664),
    ],
    bg: "#e2eafb",
    fg: "#1d3f8f",
  },
  {
    id: "4",
    name: "Musiclinks Landing",
    metaTitle: "MUSICLINKS – Landing page d'inscription connectée à Supabase",
    category: "Landing page connectée",
    stackShort: "Next.js · Supabase",
    intro:
      "Landing page d'inscription avec création de compte automatisée, vidéo intégrée, et base connectée pour une plateforme musicale professionnelle.",
    summary:
      "Un projet simple mais complet, livré avec logique de back-end connectée. Le client peut suivre les préinscriptions, gérer ses utilisateurs et continuer à faire évoluer la plateforme en toute autonomie grâce à la documentation fournie.",
    stack: ["Next.js", "Supabase (auth + DB)", "Player vidéo intégré", "TailwindCSS"],
    features: [
      "Page responsive avec vidéo intégrée pour présenter le projet",
      "Formulaire de préinscription connecté à Supabase",
      "Création automatique de comptes utilisateurs dans la base",
      "Stockage structuré des leads / inscrits",
      "Interface pensée pour être autonome côté client",
      "Formation de l'équipe MUSICLINKS\u00a0: explication du fonctionnement de la base, création de tutoriels simples (SQL, dashboard), accompagnement sur les requêtes pour exploitation quotidienne",
    ],
    tags: ["Next.js", "Supabase", "Auth", "Video player", "SQL client training"],
    cover: shot(`${R}/musiclinkslanding2.webp`, 1800, 1024),
    card: `${R}/musiclinkslanding2.webp`,
    layout: "wide",
    gallery: [shot(`${R}/musicklinkslanding.webp`, 1800, 571)],
    bg: "#0f0f16",
    fg: "#cfc8ff",
  },
];

const AGENTS: Omit<Case, "type" | "href">[] = [
  {
    id: "1",
    name: "Agent OCR",
    metaTitle: "Agent OCR intelligent pour conversion PDF vers Excel",
    category: "PDF vers Excel avec GPT Vision",
    stackShort: "Python · GPT Vision · FastAPI",
    intro:
      "Extrait automatiquement des tableaux depuis des PDF identiques et génère un Excel propre, prêt à l'analyse.",
    summary:
      "Notre agent OCR utilise la vision GPT pour analyser des PDF et extraire des données structurées. Hébergé sur Render, accessible 24/7 sans installation client.",
    stack: ["Python", "OpenAI GPT Vision", "pandas", "FastAPI", "Render"],
    features: [
      "Analyse intelligente des PDF avec GPT Vision",
      "Extraction automatique des tableaux et données",
      "Génération d'Excel avec mise en forme optimisée",
      "API REST accessible en ligne",
      "Aucune installation client requise",
      "Hébergement cloud sur Render",
    ],
    tags: ["Python", "OpenAI GPT Vision", "FastAPI", "Render"],
    cover: shot(`${R}/OCR1.webp`, 1800, 940),
    card: `${R}/OCR1.webp`,
    layout: "wide",
    gallery: [shot(`${R}/OCR2.webp`, 1800, 1653)],
    bg: "#171a2c",
    fg: "#c8c2ff",
    status: "En production",
  },
  {
    id: "2",
    name: "Reporting Notion",
    metaTitle: "Agent de Reporting Automatisé sur Notion",
    category: "Agent de reporting automatisé",
    stackShort: "Python · SQL · Notion API",
    intro:
      "Récupère les données d'une base client, calcule les stats et comparaisons hebdos, et publie un rapport structuré dans Notion.",
    summary:
      "Cet agent transforme vos données brutes en un rapport clair, visuel et personnalisé livré chaque semaine directement dans votre espace Notion. Il se connecte à vos bases existantes, analyse en profondeur vos indicateurs clés et vous présente uniquement l'essentiel\u00a0: chiffres précis, tendances et recommandations. Idéal pour prendre des décisions rapides sans perdre de temps dans les extractions et les tableurs.",
    stack: ["Python", "PostgreSQL / MySQL", "Notion API", "Automatisation sur mesure"],
    features: [
      "Connexion automatique à vos bases de données existantes",
      "Analyse hebdomadaire détaillée et sur mesure",
      "Visualisation claire et synthétique directement dans Notion",
      "Suivi des tendances et comparaison avec les périodes précédentes",
      "Disponible 24/7, sans intervention manuelle",
      "Rapports adaptables à vos besoins et à votre secteur",
    ],
    tags: ["Python", "PostgreSQL/MySQL", "Notion API", "Automatisation"],
    cover: shot(`${R}/reporting1.1.webp`, 1800, 1212),
    card: `${R}/reporting1.1.webp`,
    cardPos: "left top",
    layout: "wide",
    gallery: [
      shot(`${R}/reporting1.2.webp`, 1132, 724),
      shot(`${R}/reporting1.3.webp`, 1800, 1187),
      shot(`${R}/reporting1.4.webp`, 1800, 1096),
    ],
    bg: "#efede6",
    fg: "#37352f",
    status: "En production",
  },
  {
    id: "3",
    name: "AutoReach",
    metaTitle: "Agent AutoReach – Envoi d'e-mails instantané",
    category: "Envoi d'e-mails instantané",
    stackShort: "Python · SMTP · HTML",
    intro: "Envoie des emails personnalisés et soignés à partir d'une liste, avec suivi simple des envois.",
    summary:
      "Nous avons créé cet agent pour un client qui avait besoin d'envoyer rapidement des centaines d'e-mails personnalisés. En quelques secondes, AutoReach prend une simple liste de destinataires, y applique un e-mail HTML soigné et conforme à son image de marque, puis l'envoie à tout le monde en un éclair. Résultat\u00a0: des campagnes professionnelles prêtes en quelques minutes et un gain de temps colossal.",
    stack: ["Python", "SMTP Automation", "HTML/CSS", "CSV/Excel Processing"],
    features: [
      "Envoi massif d'e-mails en moins d'une seconde",
      "Personnalisation du contenu et respect du branding",
      "Compatible avec n'importe quelle liste de contacts (CSV, Excel)",
      "Modèles HTML élégants et responsive",
      "Aucune installation requise, tout est automatisé",
    ],
    tags: ["Python", "SMTP Automation", "HTML/CSS", "CSV/Excel"],
    cover: shot(`${R}/autoreach1.webp`, 1188, 858),
    card: `${R}/autoreach1.webp`,
    layout: "tall",
    gallery: [shot(`${R}/autoreach2.webp`, 1800, 1384), shot(`${R}/autoreach3.webp`, 1722, 1382)],
    bg: "#1d2340",
    fg: "#ffc2cd",
    status: "En production",
  },
  {
    id: "4",
    name: "Factur-X",
    metaTitle: "Générateur automatique de factures Factur-X",
    category: "Générateur de factures conformes",
    stackShort: "Python · PDF · XML",
    intro: "Crée des factures au format Factur‑X (PDF + XML) prêtes pour l'e‑facturation.",
    summary:
      "Nous avons développé un générateur complet de factures au format Factur-X, intégrant un fichier XML directement dans le PDF afin de répondre aux normes en vigueur. L'outil permet de créer en quelques secondes des factures professionnelles, parfaitement mises en page, compatibles avec les systèmes de comptabilité et les plateformes de déclaration. Un historique intégré facilite la réutilisation des informations vendeur ou client, pour un gain de temps majeur à chaque nouvelle facture.",
    stack: ["Python", "Génération PDF", "Intégration XML", "Format Factur-X", "Base de données historique"],
    features: [
      "Génération de factures 100 % conformes Factur-X",
      "PDF avec intégration XML validée",
      "Historique des factures et réutilisation des données",
      "Personnalisation complète vendeur/client",
      "Création instantanée et export direct",
    ],
    tags: ["Python", "Génération PDF", "Intégration XML", "Factur-X"],
    layout: "poster",
    gallery: [],
    bg: "#e6e2d3",
    fg: "#2b2a25",
    status: "Beta",
  },
];

export const CASES: Case[] = [
  ...WEB.map((c) => ({ ...c, type: "web" as const, href: `/project/${c.id}` })),
  ...AGENTS.map((c) => ({ ...c, type: "agent" as const, href: `/agent/${c.id}` })),
];

export const WEB_CASES = CASES.filter((c) => c.type === "web");
export const AGENT_CASES = CASES.filter((c) => c.type === "agent");

export function findCase(type: CaseType, id: string | undefined) {
  return CASES.find((c) => c.type === type && c.id === id);
}

/** Next case in index order (wraps around). */
export function nextCase(current: Case) {
  const i = CASES.indexOf(current);
  return CASES[(i + 1) % CASES.length];
}

/** "Supabase (Auth + DB)" → "Supabase": short labels for big type. */
export const stackLabel = (s: string) => s.replace(/\s*\(.*?\)\s*/g, "").trim();

export const typeLabel = (type: CaseType) => (type === "agent" ? "Agent IA" : "Produit web");
