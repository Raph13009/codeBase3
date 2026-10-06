import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Scrub } from "@/components/agentic-commerce/Scrub";
import { IMG, Icon } from "@/components/agentic-commerce/fx";

type Item = Dictionary["problems"]["items"][number];

const IMAGES = [IMG.serum, IMG.earbuds, IMG.cherub, IMG.silk];
const ICONS = ["inventory_2", "shopping_bag", "verified_user", "gavel"];

/** Smoothstep plateaus: the reel rests on each panel and travels around step boundaries. */
function reelPosition(progress: number, count: number) {
  const s = progress * count;
  let position = 0;
  for (let k = 1; k < count; k++) {
    const t = Math.min(1, Math.max(0, (s - (k - 0.35)) / 0.7));
    position += t * t * (3 - 2 * t);
  }
  return position;
}

/** The four building blocks: pinned "staircase" list + scroll reel on desktop, rail list below lg. */
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

  return (
    <section id="capabilities" data-scene="mint" className="relative scroll-mt-24">
      {/* Desktop: pinned */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${items.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1648px] grid-cols-[1fr_1.15fr] items-center gap-16 px-10 xl:gap-24">
            <div className="flex h-[min(76vh,740px)] flex-col justify-between">
              <div>
                <h2 className="max-w-md text-[clamp(30px,2.8vw,44px)] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--fg)]">
                  {dict.problems.title}
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--fg-muted)]">
                  {dict.problems.subtitle}
                </p>
              </div>

              <div className="border-l-[3px] border-[var(--line)]" role="list">
                {items.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      role="listitem"
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => goTo(index)}
                      className={`relative block w-full py-4 pl-8 text-left transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                      }`}
                    >
                      <StepBar progress={scrollYProgress} index={index} count={items.length} visible={isActive} />
                      <span className="flex items-baseline gap-3">
                        <span className="ac-tabular text-[12px] font-semibold text-[var(--fg-muted)]">
                          0{index + 1}
                        </span>
                        <span className="text-[22px] font-bold leading-tight tracking-[-0.03em] text-[var(--fg)]">
                          {item.title}
                        </span>
                      </span>
                      <span className="ac-collapse" data-open={isActive}>
                        <span className="block">
                          <span className="block max-w-sm pl-[30px] pt-2 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                            {item.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Reel progress={scrollYProgress} items={items} active={active} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: list with a scroll rail */}
      <MobileList dict={dict} />
    </section>
  );
}

/** Bar segment of the active step; fills downward as you scroll through that step. */
function StepBar({
  progress,
  index,
  count,
  visible,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  visible: boolean;
}) {
  const scaleY = useTransform(progress, [index / count, (index + 1) / count], [0.08, 1]);

  return (
    <motion.span
      aria-hidden="true"
      className={`absolute -left-[3px] top-0 h-full w-[3px] origin-top rounded-full bg-[var(--fg)] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ scaleY }}
    />
  );
}

function Reel({
  progress,
  items,
  active,
}: {
  progress: MotionValue<number>;
  items: Item[];
  active: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameHeight, setFrameHeight] = useState(0);
  // Panels animate their content the first time they become active, then keep it
  const [seen, setSeen] = useState<number[]>([0]);
  const reduceMotion = useReducedMotion();
  const smooth = useSpring(progress, { stiffness: 140, damping: 30, mass: 0.6, restDelta: 0.0005 });
  const y = useTransform(smooth, (value) => -reelPosition(value, items.length) * frameHeight);

  useEffect(() => {
    setSeen((current) => (current.includes(active) ? current : [...current, active]));
  }, [active]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const ro = new ResizeObserver(() => setFrameHeight(frame.clientHeight));
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative h-[min(76vh,740px)] overflow-hidden rounded-[40px] shadow-[0_40px_100px_-40px_rgba(14,26,19,0.45)]"
    >
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ y: reduceMotion ? -active * frameHeight : y }}
      >
        {items.map((item, index) => (
          <div key={item.title} className="relative overflow-hidden" style={{ height: frameHeight || "100%" }}>
            <img
              src={IMAGES[index]}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div className="w-full max-w-[380px]">
                <Visual index={index} item={item} play={seen.includes(index)} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="ac-glass absolute left-5 top-5 flex items-center gap-2 rounded-full px-3.5 py-2">
        <span className="ac-tabular text-[11px] font-bold text-[#1b1b1b]">
          0{active + 1} / 0{items.length}
        </span>
      </div>
    </div>
  );
}

function MobileList({ dict }: { dict: Dictionary }) {
  const items = dict.problems.items;
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 70%"],
  });

  return (
    <div className="mx-auto max-w-[680px] px-4 py-24 sm:px-10 lg:hidden">
      <Scrub>
        <h2 className="ac-h2 text-[var(--fg)]">{dict.problems.title}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--fg-muted)]">{dict.problems.subtitle}</p>
      </Scrub>
      <div ref={listRef} className="relative mt-12 pl-6">
        <span className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-[var(--line)]" aria-hidden="true" />
        <motion.span
          className="absolute left-0 top-0 h-full w-[3px] origin-top rounded-full bg-[var(--fg)]"
          style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
          aria-hidden="true"
        />
        <div className="space-y-14">
          {items.map((item, index) => (
            <div key={item.title}>
              <div className="flex items-baseline gap-3">
                <span className="ac-tabular text-[12px] font-semibold text-[var(--fg-muted)]">0{index + 1}</span>
                <h3 className="text-[22px] font-bold leading-tight tracking-[-0.03em] text-[var(--fg)]">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-muted)]">{item.description}</p>
              <div className="relative mt-5 aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-square">
                <img
                  src={IMAGES[index]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end p-4 sm:items-center sm:justify-center sm:p-8">
                  <div className="w-full max-w-[360px]">
                    <Visual index={index} item={item} play />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CARD =
  "rounded-[28px] border border-white/60 bg-white/70 p-6 text-left text-[#1b1b1b] shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-2xl backdrop-saturate-150";

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

function Visual({ index, item, play }: { index: number; item: Item; play: boolean }) {
  const stagger = play ? "ac-stagger" : "ac-stagger-idle";

  if (index === 0) {
    return (
      <div className={CARD}>
        <CardHeader icon={ICONS[0]} title={item.title} />
        <ul className={`${stagger} mt-5 space-y-1.5`}>
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
        <ol className={`${stagger} mt-6`}>
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
              className={`${play ? "ac-knob" : ""} absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm`}
              style={{ animationDelay: "0.45s" }}
            />
          </span>
        </div>
        <ul className={`${stagger} mt-5 space-y-1.5`}>
          {item.points.map((point, i) => (
            <li
              key={point}
              className="flex items-center gap-3 rounded-xl bg-white/70 px-3.5 py-3 text-[14px] font-medium"
            >
              <Icon name={icons[i] ?? "check"} size={18} className="text-[#1b1b1b]/70" />
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
      <div className={`${stagger} mt-5 grid grid-cols-2 gap-2`}>
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
