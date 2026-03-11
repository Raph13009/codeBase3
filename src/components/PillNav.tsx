import React, { useCallback, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/Convert", label: "Convertir" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

const ease = "power3.easeOut";
const BASE_COLOR = "#151515";
const PILL_BG = "#3D2F57";
const PILL_TEXT = "rgba(255,255,255,0.9)";
const HOVER_TEXT = "#ffffff";

interface PillNavProps {
  onLinkClick?: () => void;
  extra?: React.ReactNode;
}

export default function PillNav({ onLinkClick, extra }: PillNavProps) {
  const location = useLocation();
  const locationPathRef = useRef(location.pathname);
  locationPathRef.current = location.pathname;
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  const applyActiveState = useCallback(() => {
    const pathname = locationPathRef.current;
    links.forEach((item, i) => {
      const isActive =
        pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
      const circle = circleRefs.current[i];
      const pill = circle?.parentElement as HTMLElement | null;
      if (!circle || !pill) return;
      activeTweenRefs.current[i]?.kill();
      const label = pill.querySelector(".pill-label") as HTMLElement | null;
      const white = pill.querySelector(".pill-label-hover") as HTMLElement | null;
      const h = pill.getBoundingClientRect().height;
      if (isActive) {
        gsap.set(circle, { scale: 1, xPercent: -50 });
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });
      } else {
        gsap.set(circle, { scale: 0, xPercent: -50 });
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });
      }
    });
  }, []);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const R = (w * w) / 4 / h + h / 2;
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label") as HTMLElement | null;
        const white = pill.querySelector(".pill-label-hover") as HTMLElement | null;

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 0.4, ease, overwrite: "auto" },
          0
        );
        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: "auto" }, 0);
        }
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: "auto" }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => {
      layout();
      requestAnimationFrame(() => applyActiveState());
    };
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

    return () => window.removeEventListener("resize", onResize);
  }, [applyActiveState]);

  // Sync active pill: show circle only, keep default label visible (React Bits: active ≠ hover, no label animation)
  useEffect(() => {
    applyActiveState();
  }, [location.pathname, applyActiveState]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    const tween = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
    activeTweenRefs.current[i] = tween as gsap.core.Tween;
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    const tween = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
    activeTweenRefs.current[i] = tween as gsap.core.Tween;
  };

  const cssVars = {
    "--base": BASE_COLOR,
    "--pill-bg": PILL_BG,
    "--hover-text": HOVER_TEXT,
    "--pill-text": PILL_TEXT,
    "--nav-h": "42px",
    "--pill-pad-x": "18px",
    "--pill-gap": "3px",
  } as React.CSSProperties;

  return (
    <div
      ref={navRef}
      className="hidden lg:inline-flex items-center gap-[var(--pill-gap)] rounded-full overflow-hidden pl-1 pr-1.5 py-1 border border-[#3D2F57]/40 backdrop-blur-sm"
      style={{
        ...cssVars,
        height: "var(--nav-h)",
        background: "var(--base)",
      }}
    >
      {links.map((item, i) => {
        const isActive =
          location.pathname === item.to ||
          (item.to !== "/" && location.pathname.startsWith(item.to));

        const pillContent = (
          <>
            <div
              ref={(el) => {
                circleRefs.current[i] = el;
              }}
              className="absolute left-1/2 rounded-full bg-[var(--pill-bg)] pointer-events-none"
              aria-hidden
            />
            <span className="pill-label relative z-10 font-semibold text-[16px] leading-none uppercase tracking-[0.02em] whitespace-nowrap">
              {item.label}
            </span>
            <span
              className="pill-label-hover absolute inset-0 flex items-center justify-center z-10 font-semibold text-[16px] leading-none uppercase tracking-[0.02em] whitespace-nowrap text-[var(--hover-text)]"
              aria-hidden
            >
              {item.label}
            </span>
          </>
        );

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onLinkClick}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            className={({ isActive }) =>
              `relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border px-0 cursor-pointer min-w-0` +
              (isActive ? " text-white" : " text-[var(--pill-text)]")
            }
            style={{
              paddingLeft: "var(--pill-pad-x)",
              paddingRight: "var(--pill-pad-x)",
            }}
          >
            {pillContent}
          </NavLink>
        );
      })}
      {extra != null ? <span className="pl-1">{extra}</span> : null}
    </div>
  );
}
