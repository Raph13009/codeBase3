import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";
import { IMG } from "@/components/agentic-commerce/fx";

const THUMBS = [IMG.serum, IMG.earbuds, IMG.roller, IMG.silk, IMG.cherub, IMG.cherubRose];

/** Who it's for: oversized marquee with product thumbnails between segments. */
export function Audience({ dict }: { dict: Dictionary }) {
  const items = dict.audience.items;

  return (
    <section id="audience" className="scroll-mt-24 overflow-hidden pb-12 md:pb-16">
      <Reveal className="mx-auto max-w-[1728px] px-4 sm:px-10">
        <h2 className="ac-label mx-auto max-w-[1648px] text-ac-muted">{dict.audience.title}</h2>
      </Reveal>

      <div className="ac-marquee mt-8 border-y border-[var(--ac-line)] py-7 md:py-10">
        <div className="ac-marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {items.map((item, index) => (
                <li key={item} className="flex items-center">
                  <span className="whitespace-nowrap px-5 text-[clamp(36px,5.4vw,84px)] font-bold leading-none tracking-[-0.05em] text-ac-on-surface md:px-8">
                    {item}
                  </span>
                  <img
                    src={THUMBS[index % THUMBS.length]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-[clamp(44px,5vw,78px)] w-[clamp(44px,5vw,78px)] shrink-0 rounded-full object-cover"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
