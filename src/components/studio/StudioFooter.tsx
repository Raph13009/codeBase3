import { useRef } from "react";
import { gsap, MOTION_OK, StLink, useGSAP } from "@/components/studio/motion";
import { BMark } from "@/components/studio/BMark";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/components/studio/data";

const MENU = [
  { label: "Projets", href: "/realisations" },
  { label: "Services", href: "/#services" },
  { label: "Méthode", href: "/#methode" },
  { label: "Studio", href: "/about" },
];

const PAGES = [
  { label: "Commerce IA", href: "/fr/agentic-commerce" },
  { label: "Agents IA", href: "/realisations?filtre=agents" },
  { label: "Convertir un PDF", href: "/Convert" },
  { label: "Contact", href: "/contact" },
];

/** Columns, legal line and the giant wordmark rising from the bottom edge. */
export function StudioFooter() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".st-wordmark > *",
          { yPercent: 70 },
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: ".st-wordmark", start: "top bottom", end: "bottom bottom", scrub: true },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <footer className="st-footer" ref={rootRef}>
      <div className="st-foot-grid">
        <div className="st-foot-brand">
          <BMark />
          <p>Studio tech &amp; IA pour PME et startups. Sites, MVP et agents livrés vite, pensés pour convertir.</p>
        </div>
        <nav className="st-foot-col" aria-label="Menu du site">
          <h3>Menu</h3>
          <ul>
            {MENU.map((link) => (
              <li key={link.href}>
                <StLink href={link.href}>{link.label}</StLink>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="st-foot-col" aria-label="Pages">
          <h3>Pages</h3>
          <ul>
            {PAGES.map((link) => (
              <li key={link.href}>
                <StLink href={link.href}>{link.label}</StLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="st-foot-col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <StLink href={LINKEDIN_URL}>LinkedIn</StLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="st-foot-legal">
        <span>© 2026 BoostAI Consulting</span>
        <nav aria-label="Informations légales">
          <StLink href="/ocr-terms">Confidentialité</StLink>
          <span>Mentions légales</span>
        </nav>
        <span>Tous droits réservés</span>
      </div>

      <div className="st-wordmark" aria-hidden="true">
        <BMark />
        <span className="w">
          Boost<em>AI</em>
        </span>
      </div>
    </footer>
  );
}
