/** Copy and content of the studio homepage (FR). */

export const CONTACT_EMAIL = "contact@boostaiconsulting.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/106565801/";
/** Same FormSubmit endpoint as the /contact page. */
export const FORM_ENDPOINT = "https://formsubmit.co/raphael@boostaiconsulting.com";

export const NAV = [
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Méthode", href: "#methode" },
  { label: "Commerce IA", href: "/fr/agentic-commerce" },
];

export const MENU_PAGES = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Commerce IA", href: "/fr/agentic-commerce" },
  { label: "Convertir", href: "/Convert" },
  { label: "À propos", href: "/about" },
];

export type Project = {
  id: number;
  name: string;
  kind: string;
  stack: string;
  image: string;
  /** wide: screenshot fills the panel · tall: screenshot + name poster · phone: mobile screenshot */
  layout: "wide" | "tall" | "phone";
  /** Panel colours, taken from each project's identity. */
  bg: string;
  fg: string;
  /** Vertical offset of the card in the reel (vh). */
  offset: number;
};

export const PROJECTS: Project[] = [
  {
    id: 10,
    name: "Oenoboost",
    kind: "Application e-learning",
    stack: "TypeScript · Supabase · Stripe",
    image: "/realisation/oenoboost/main.webp",
    layout: "phone",
    bg: "#e8dccb",
    fg: "#6b1d2b",
    offset: 0,
  },
  {
    id: 9,
    name: "MyTable",
    kind: "Plateforme de réservation",
    stack: "Supabase Realtime · Resend",
    image: "/realisation/mytable/mytable-1.webp",
    layout: "wide",
    bg: "#f2cc48",
    fg: "#1b1b1b",
    offset: 7,
  },
  {
    id: 8,
    name: "Koacher",
    kind: "Site commercial B2B",
    stack: "Webflow · CMS · SEO",
    image: "/realisation/koacher/koacher-b2b-1.webp",
    layout: "tall",
    bg: "#151517",
    fg: "#f0efeb",
    offset: 2,
  },
  {
    id: 6,
    name: "Kivaiakids",
    kind: "Plateforme éducative",
    stack: "Next.js · Supabase",
    image: "/realisation/kivaiakidsMain.webp",
    layout: "wide",
    bg: "#d9e9da",
    fg: "#1f5e3b",
    offset: 9,
  },
  {
    id: 1,
    name: "Avenirea",
    kind: "MVP d'orientation avec IA",
    stack: "Next.js · Stripe · GPT-4",
    image: "/realisation/AvenireaMain.webp",
    layout: "tall",
    bg: "#d7eeee",
    fg: "#0f4c5c",
    offset: 1,
  },
  {
    id: 2,
    name: "Musiclinks",
    kind: "Marketplace mobile-first",
    stack: "Next.js · Messagerie temps réel",
    image: "/realisation/musiclinkscover-1600.jpg",
    layout: "wide",
    bg: "#1a1626",
    fg: "#e9e4ff",
    offset: 6,
  },
];

export const HERO_PROJECTS = PROJECTS.slice(0, 3);

export const STEPS = [
  {
    word: "Cadrer",
    label: "Diagnostic",
    text: "Atelier de lancement, audit de l'existant et objectifs mesurables. On écrit noir sur blanc ce qu'on construit, pour qui, et comment on saura que ça marche.",
    tags: ["Atelier", "Audit", "Cahier des charges"],
  },
  {
    word: "Concevoir",
    label: "Design",
    text: "Parcours, maquettes et prototype cliquable. Vous validez l'expérience avant la première ligne de code.",
    tags: ["UX", "UI", "Prototype"],
  },
  {
    word: "Développer",
    label: "Production",
    text: "Front, back, paiements et intégrations IA, développés sur mesure. Vous suivez l'avancement sur un lien de préproduction.",
    tags: ["React", "Supabase", "IA"],
  },
  {
    word: "Déployer",
    label: "Lancement",
    text: "Mise en ligne, suivi des performances et itérations. Le produit vit : on mesure, on ajuste, on le fait évoluer.",
    tags: ["Mise en ligne", "Analytics", "Itérations"],
  },
];

export const SERVICES = [
  {
    name: "Sites web sur mesure",
    text: "Vitrines et sites commerciaux rapides, prêts pour le SEO et pensés pour convertir.",
    href: "/realisations",
  },
  {
    name: "MVP & plateformes",
    text: "De l'idée au produit en ligne : comptes, paiements, back-office, temps réel.",
    href: "/realisations",
  },
  {
    name: "Agents IA & automatisations",
    text: "Assistants, workflows et agents qui suppriment les tâches répétitives.",
    href: "/realisations#agents",
  },
  {
    name: "Commerce agentique",
    text: "Rendre votre catalogue lisible, comparable et achetable par les agents IA.",
    href: "/fr/agentic-commerce",
  },
  {
    name: "Accompagnement digital",
    text: "Stratégie, choix techniques et feuille de route pour avancer sans vous disperser.",
    href: "#contact",
  },
];

export const PROJECT_TYPES = ["Site web", "MVP / SaaS", "Agent IA", "Commerce agentique", "Autre"];
export const BUDGETS = ["< 5 k€", "5 – 15 k€", "15 – 40 k€", "40 k€ +", "À définir"];
