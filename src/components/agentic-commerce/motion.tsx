import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/** Fades/slides children in once they enter the viewport (CSS-driven, see [data-reveal]). */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ ...style, "--d": delay } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** "01 — Label" mono kicker used above every section title. */
export function SectionLabel({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`ac-mono flex items-center gap-3 ${
        dark ? "text-white/50" : "text-ac-muted"
      }`}
    >
      <span className="text-ac-primary">{index}</span>
      <span className={`h-px w-8 ${dark ? "bg-white/20" : "bg-black/15"}`} />
      <span>{label}</span>
    </div>
  );
}

/** Renders `text` with its last `count` words in the italic serif accent. */
export function Accent({ text, count = 2 }: { text: string; count?: number }) {
  const words = text.split(" ");
  const head = words.slice(0, -count).join(" ");
  const tail = words.slice(-count).join(" ");
  return (
    <>
      {head}{" "}
      <span className="ac-serif text-ac-primary">{tail}</span>
    </>
  );
}

/** Tracks the cursor inside an element and exposes it as --mx / --my for spotlight effects. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}

export function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M12 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
