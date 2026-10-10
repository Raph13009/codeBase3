import { useContext, useEffect, useRef, useState } from "react";
import { LenisContext, StLink } from "@/components/studio/motion";
import { BMark } from "@/components/studio/BMark";
import { MENU_PAGES, NAV } from "@/components/studio/data";

/** Fixed header in difference blend: legible on dark and light sections alike. */
export function StudioHeader() {
  const [open, setOpen] = useState(false);
  const lenis = useContext(LenisContext);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (open) lenis.current?.stop();
    else lenis.current?.start();
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  const close = () => setOpen(false);

  return (
    <>
      <header className="st-header">
        <StLink href="#top" className="st-logo" aria-label="BoostAI Consulting, retour en haut" onNavigate={close}>
          <BMark />
          <span>
            Boost<em>AI</em>
          </span>
        </StLink>

        <nav className="st-nav" aria-label="Navigation principale">
          {NAV.map((link) => (
            <StLink key={link.href} href={link.href}>
              {link.label}
            </StLink>
          ))}
        </nav>

        <StLink href="#contact" className="st-pill">
          Démarrer un projet
        </StLink>

        <button
          type="button"
          className="st-burger"
          aria-expanded={open}
          aria-controls="st-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className="st-menu" id="st-menu" data-open={open} aria-hidden={!open}>
        <nav className="st-menu-main" aria-label="Menu">
          {NAV.map((link) => (
            <StLink key={link.href} href={link.href} onNavigate={close}>
              {link.label}
            </StLink>
          ))}
          <StLink href="#contact" onNavigate={close}>
            Contact
          </StLink>
        </nav>
        <div>
          <StLink href="#contact" className="st-pill st-pill--light" onNavigate={close}>
            Démarrer un projet
          </StLink>
          <div className="st-menu-sub" style={{ marginTop: 28 }}>
            {MENU_PAGES.map((link) => (
              <StLink key={link.href} href={link.href} onNavigate={close}>
                {link.label}
              </StLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
