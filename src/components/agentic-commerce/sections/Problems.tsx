import { useEffect, useState, type CSSProperties } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";

const AUTOPLAY_MS = 5000;
const icons = ["inventory_2", "shopping_bag", "verified_user", "gavel"];

export function Problems({ dict }: { dict: Dictionary }) {
  const items = dict.problems.items;
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, items.length]);

  const current = items[active];

  return (
    <section
      id="capabilities"
      className="mx-auto max-w-[1728px] scroll-mt-28 px-4 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-2 lg:gap-[100px]">
        <Reveal className="order-2 lg:order-1">
          <div className="flex aspect-[4/3] items-center justify-center rounded-[32px] bg-gradient-to-br from-[#f4f3ef] to-[#e9e8e4] p-6 md:rounded-[40px] md:p-12">
            <div
              key={active}
              className="ac-card-in w-full max-w-md rounded-2xl border border-[#d9d7d0]/20 bg-[var(--ac-card)] p-6 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-bold text-ac-on-surface">{current.title}</span>
                <span
                  className="material-symbols-outlined text-ac-muted"
                style={{ fontSize: 20 }}
                  aria-hidden="true"
                >
                  {icons[active]}
                </span>
              </div>
              <ul className="space-y-1">
                {current.points.map((point, index) => (
                  <li
                    key={point}
                    className="ac-row-in flex items-center gap-3 rounded-xl p-3 text-[15px] font-medium text-ac-on-surface"
                    style={{ "--i": index } as CSSProperties}
                  >
                    <span
                      className="material-symbols-outlined text-green-600"
                style={{ fontSize: 18 }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1} className="order-1 max-w-lg lg:order-2">
          <h2 className="ac-h2 text-ac-on-surface">{dict.problems.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ac-muted">
            {dict.problems.subtitle}
          </p>

          <div className="mt-12 border-l-[3px] border-[var(--ac-line)]" role="tablist">
            {items.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setAutoplay(false);
                    setActive(index);
                  }}
                  className={`relative block w-full py-4 pl-8 text-left transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-100"
                  }`}
                >
                  {isActive ? (
                    <span
                      key={`${active}-${autoplay}`}
                      className={`absolute -left-[3px] top-0 h-full w-[3px] bg-[#1b1b1b] ${
                        autoplay ? "ac-progress" : ""
                      }`}
                      style={{ "--ac-duration": `${AUTOPLAY_MS}ms` } as CSSProperties}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="block text-xl font-bold tracking-tight text-ac-on-surface">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-ac-muted">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
