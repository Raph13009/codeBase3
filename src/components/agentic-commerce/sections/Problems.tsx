import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";
import { IMG, Icon } from "@/components/agentic-commerce/fx";

type Item = Dictionary["problems"]["items"][number];

const IMAGES = [IMG.serum, IMG.earbuds, IMG.cherub, IMG.silk];
const ICONS = ["inventory_2", "shopping_bag", "verified_user", "gavel"];

/** The four building blocks: pinned scroll stage on desktop, stacked cards below lg. */
export function Problems({ dict }: { dict: Dictionary }) {
  const items = dict.problems.items;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(items.length - 1, Math.max(0, Math.floor(value * items.length)));
    setActive((current) => (current === next ? current : next));
  });

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((index + 0.5) / items.length), behavior: "smooth" });
  };

  const current = items[active];

  return (
    <section id="capabilities" className="relative scroll-mt-24">
      {/* Desktop: pinned stage */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${items.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1648px] grid-cols-[1fr_1.15fr] items-center gap-16 px-10 xl:gap-24">
            <div className="flex h-[min(76vh,740px)] flex-col justify-between">
              <div>
                <h2 className="max-w-md text-[clamp(28px,2.6vw,40px)] font-bold leading-[1.04] tracking-[-0.04em] text-ac-on-surface">
                  {dict.problems.title}
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ac-muted">
                  {dict.problems.subtitle}
                </p>
              </div>

              <div>
                <div className="flex items-start gap-3 overflow-hidden">
                  <span
                    key={active}
                    className="ac-digit ac-tabular text-[clamp(120px,12vw,190px)] font-bold leading-[0.8] tracking-[-0.06em] text-ac-on-surface"
                  >
                    0{active + 1}
                  </span>
                  <span className="ac-tabular mt-2 text-[15px] font-semibold text-ac-muted">
                    / 0{items.length}
                  </span>
                </div>
                <div key={`copy-${active}`} className="ac-stage-swap mt-8 max-w-md">
                  <h3 className="text-[28px] font-bold leading-tight tracking-[-0.03em] text-ac-on-surface">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-ac-muted">
                    {current.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {items.map((item, index) => (
                  <Segment
                    key={item.title}
                    index={index}
                    count={items.length}
                    progress={scrollYProgress}
                    active={index === active}
                    label={item.title}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>
            </div>

            <div className="relative h-[min(76vh,740px)] overflow-hidden rounded-[40px] bg-ac-surface-low">
              {IMAGES.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    opacity: index === active ? 1 : 0,
                    transform: index === active ? "scale(1)" : "scale(1.08)",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div key={active} className="ac-stage-swap w-full max-w-[380px]">
                  <Visual index={active} item={current} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="mx-auto max-w-[680px] px-4 py-24 sm:px-10 lg:hidden">
        <Reveal>
          <h2 className="ac-h2 text-ac-on-surface">{dict.problems.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ac-muted">{dict.problems.subtitle}</p>
        </Reveal>
        <div className="mt-12 space-y-16">
          {items.map((item, index) => (
            <Reveal key={item.title}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-square">
                <img
                  src={IMAGES[index]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end p-4 sm:items-center sm:justify-center sm:p-8">
                  <div className="w-full max-w-[360px]">
                    <Visual index={index} item={item} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="ac-tabular text-[44px] font-bold leading-none tracking-[-0.05em] text-ac-on-surface">
                  0{index + 1}
                </span>
                <h3 className="text-[22px] font-bold leading-tight tracking-[-0.03em] text-ac-on-surface">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ac-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Segment({
  index,
  count,
  progress,
  active,
  label,
  onClick,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  const scaleX = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "step" : undefined}
      className="group flex flex-col self-start text-left"
    >
      <span className="block h-[3px] overflow-hidden rounded-full bg-black/10">
        <motion.span className="block h-full origin-left bg-[#1b1b1b]" style={{ scaleX }} />
      </span>
      <span
        className={`mt-3 block text-[12px] font-semibold leading-snug transition-colors duration-300 ${
          active ? "text-ac-on-surface" : "text-ac-muted group-hover:text-ac-on-surface"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

const CARD =
  "rounded-[28px] border border-white/60 bg-white/70 p-6 text-left text-ac-on-surface shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-2xl backdrop-saturate-150";

function CardHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1b1b1b] text-white">
        <Icon name={icon} size={17} />
      </span>
      <span className="text-[14px] font-bold leading-tight tracking-tight">{title}</span>
    </div>
  );
}

function Visual({ index, item }: { index: number; item: Item }) {
  if (index === 0) {
    return (
      <div className={CARD}>
        <CardHeader icon={ICONS[0]} title={item.title} />
        <ul className="ac-stagger mt-5 space-y-1.5">
          {item.points.map((point) => (
            <li
              key={point}
              className="flex items-center justify-between rounded-xl bg-white/70 px-3.5 py-3 text-[14px] font-medium"
            >
              {point}
              <Icon name="check_circle" size={18} className="text-green-600" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={CARD}>
        <CardHeader icon={ICONS[1]} title={item.title} />
        <ol className="ac-stagger mt-6">
          {item.points.map((point, i) => {
            const last = i === item.points.length - 1;
            return (
              <li key={point} className="relative flex gap-3 pb-5 last:pb-0">
                {!last ? (
                  <span className="absolute left-[11px] top-7 h-[calc(100%-16px)] w-px bg-[#1b1b1b]/20" />
                ) : null}
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    last ? "bg-white ring-2 ring-[#1b1b1b]" : "bg-[#1b1b1b] text-white"
                  }`}
                >
                  {last ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#1b1b1b]" />
                  ) : (
                    <Icon name="check" size={14} />
                  )}
                </span>
                <span className="pt-0.5 text-[14px] font-medium">{point}</span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  if (index === 2) {
    const icons = ["task_alt", "lock", "account_balance"];
    return (
      <div className={CARD}>
        <div className="flex items-center justify-between gap-3">
          <CardHeader icon={ICONS[2]} title={item.title} />
          <span className="relative h-6 w-10 shrink-0 rounded-full bg-[#1b1b1b] shadow-inner">
            <span
              className="ac-knob absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"
              style={{ animationDelay: "0.45s" }}
            />
          </span>
        </div>
        <ul className="ac-stagger mt-5 space-y-1.5">
          {item.points.map((point, i) => (
            <li
              key={point}
              className="flex items-center gap-3 rounded-xl bg-white/70 px-3.5 py-3 text-[14px] font-medium"
            >
              <Icon name={icons[i] ?? "check"} size={18} className="text-ac-on-surface/70" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={CARD}>
      <CardHeader icon={ICONS[3]} title={item.title} />
      <div className="ac-stagger mt-5 grid grid-cols-2 gap-2">
        {item.points.map((point) => (
          <div key={point} className="flex flex-col gap-3 rounded-2xl bg-white/70 p-3.5">
            <Icon name="verified" size={20} className="text-green-600" />
            <span className="text-[13px] font-semibold leading-tight">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
