import { useContext, useEffect, useRef } from "react";
import { Icon, LenisContext } from "@/components/studio/motion";
import type { Shot } from "@/components/studio/work";

type Props = {
  shots: Shot[];
  index: number;
  name: string;
  onIndex: (i: number) => void;
  onClose: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Full-screen image viewer: arrows / Escape on the keyboard, focus kept inside. */
export function Lightbox({ shots, index, name, onIndex, onClose }: Props) {
  const lenis = useContext(LenisContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = shots.length;
  const shot = shots[index];

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    lenis.current?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lenis.current?.start();
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % count);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
      else if (e.key === "Tab") {
        const focusables = rootRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onIndex, onClose]);

  return (
    <div
      className="st-lightbox"
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie ${name}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="st-lightbox-bar">
        <span>
          {name} — {pad(index + 1)} / {pad(count)}
        </span>
        <button type="button" ref={closeRef} onClick={onClose} aria-label="Fermer la galerie">
          Fermer <Icon name="close" />
        </button>
      </div>
      <figure className="st-lightbox-stage" key={shot.src}>
        <img src={shot.src} alt={`${name}, capture ${index + 1} sur ${count}`} style={{ aspectRatio: `${shot.w} / ${shot.h}` }} />
      </figure>
      {count > 1 ? (
        <div className="st-lightbox-nav">
          <button type="button" onClick={() => onIndex((index - 1 + count) % count)} aria-label="Image précédente">
            <Icon name="arrow-left" />
          </button>
          <button type="button" onClick={() => onIndex((index + 1) % count)} aria-label="Image suivante">
            <Icon name="arrow" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
