import React, { useCallback, useLayoutEffect, useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

const MENU_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/Convert", label: "Convertir" },
  { to: "/guide", label: "Tuto gratuit" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

const COLORS = ["#3D2F57", "#5227FF", "#222054"];
const POSITION = "right" as const;

interface StaggeredMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StaggeredMenu({ isOpen, onClose }: StaggeredMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  const offscreen = POSITION === "left" ? -100 : 100;

  useEffect(() => {
    if (isVisible) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.top = `-${scrollY}px`;
      document.documentElement.style.left = "0";
      document.documentElement.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.documentElement.style.top ? Math.abs(parseInt(document.documentElement.style.top, 10)) : 0;
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.documentElement.style.top = "";
      document.documentElement.style.left = "";
      document.documentElement.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, scrollY);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.documentElement.style.top = "";
      document.documentElement.style.left = "";
      document.documentElement.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useLayoutEffect(() => {
    if (!isVisible) return;
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;
      const preLayers = preContainer
        ? (Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[])
        : [];
      preLayerElsRef.current = preLayers;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
    });
    return () => ctx.revert();
  }, [isVisible, offscreen]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel")
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    ) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length)
      gsap.set(numberEls, { ["--sm-num-opacity" as string]: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity" as string]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) {
      setIsVisible(false);
      return;
    }

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel")
        ) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(
          panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
        ) as HTMLElement[];
        if (numberEls.length)
          gsap.set(numberEls, { ["--sm-num-opacity" as string]: 0 });
        busyRef.current = false;
        setIsVisible(false);
      },
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      playOpen();
    } else if (isVisible) {
      playClose();
    }
  }, [isOpen, isVisible, playOpen, playClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const rawColors = COLORS.length ? COLORS.slice(0, 4) : ["#1e1e22", "#35353c"];
  let layerColors = [...rawColors];
  if (layerColors.length >= 3) {
    const mid = Math.floor(layerColors.length / 2);
    layerColors.splice(mid, 1);
  }

  if (!isVisible) return null;

  return (
    <div className="sm-scope lg:hidden fixed inset-0 z-50 staggered-menu-wrapper" data-open={isOpen}>
      <div className="sm-menu-overlay" onClick={onClose} aria-hidden />
      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: auto; }
.sm-scope .sm-menu-overlay { position: absolute; inset: 0; z-index: 1; pointer-events: auto; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; text-transform: uppercase; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; font-size: 3rem; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: flex; align-items: flex-start; justify-content: flex-start; width: 100%; text-decoration: none; padding-right: 0; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; flex: 0 0 auto; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #5227FF); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); flex: 0 0 auto; font-size: 0.45em; font-weight: 400; color: var(--sm-accent, #5227FF); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); margin-left: 0.15em; }
.sm-scope .sm-panel-close { position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; color: #000; font-size: 1.5rem; line-height: 1; z-index: 15; }
.sm-scope .sm-panel-close:hover { color: var(--sm-accent, #5227FF); }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .sm-panel-item { font-size: 2.5rem; } }
`}</style>

      <div className="sm-prelayers" ref={preLayersRef} data-position={POSITION}>
        {layerColors.map((c, i) => (
          <div
            key={i}
            className="sm-prelayer"
            style={{ background: c }}
          />
        ))}
      </div>

      <div
        ref={panelRef}
        className="staggered-menu-panel"
        data-position={POSITION}
        style={{ ["--sm-accent" as string]: "#5227FF" }}
      >
        <button
          type="button"
          className="sm-panel-close"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          ✕
        </button>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" data-numbering>
            {MENU_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className="sm-panel-item"
                >
                  <span className="sm-panel-itemLabel">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
