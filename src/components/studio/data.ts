/** Copy and content of the studio pages (FR). */

import { findCase } from "@/components/studio/work";

export const CONTACT_EMAIL = "contact@boostaiconsulting.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/106565801/";
/** Same FormSubmit endpoint as the /contact page. */
export const FORM_ENDPOINT = "https://formsubmit.co/raphael@boostaiconsulting.com";

/** Site-wide navigation (header). Paths with a hash scroll on the homepage. */
export const NAV = [
  { label: "Projets", href: "/realisations" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/about" },
  { label: "Commerce IA", href: "/fr/agentic-commerce" },
];

/** Secondary pages (mobile menu and footer). */
export const MENU_PAGES = [
  { label: "Méthode", href: "/#methode" },
  { label: "Agents IA", href: "/realisations?filtre=agents" },
  { label: "Convertir un PDF", href: "/Convert" },
  { label: "Contact", href: "/contact" },
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

/** Homepage reel: six web projects with their vertical offsets. */
const REEL: [id: string, offset: number][] = [
  ["10", 0],
  ["9", 7],
  ["8", 2],
  ["6", 9],
  ["1", 1],
  ["2", 6],
];

export const PROJECTS: Project[] = REEL.map(([id, offset]) => {
  const c = findCase("web", id)!;
  return {
    id: Number(c.id),
    name: c.name,
    kind: c.category,
    stack: c.stackShort,
    image: c.card ?? "",
    layout: c.layout === "poster" ? "wide" : c.layout,
    bg: c.bg,
    fg: c.fg,
    offset,
  };
});

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
    text: "Mise en ligne, suivi des performances et itérations. Le produit vit\u00a0: on mesure, on ajuste, on le fait évoluer.",
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
    text: "De l'idée au produit en ligne\u00a0: comptes, paiements, back-office, temps réel.",
    href: "/realisations",
  },
  {
    name: "Agents IA & automatisations",
    text: "Assistants, workflows et agents qui suppriment les tâches répétitives.",
    href: "/realisations?filtre=agents",
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
