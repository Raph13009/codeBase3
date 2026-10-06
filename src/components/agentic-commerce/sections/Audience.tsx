import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Reveal } from "@/components/agentic-commerce/Reveal";

export function Audience({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="audience"
      className="mx-auto max-w-[1728px] scroll-mt-28 px-4 pb-24 sm:px-10 md:pb-32"
    >
      <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center rounded-[32px] bg-ac-surface-low px-6 py-14 text-center md:rounded-[40px] md:py-20">
        <h2 className="ac-h2 text-ac-on-surface">{dict.audience.title}</h2>
        <ul className="mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {dict.audience.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[#d9d7d0]/40 bg-white px-5 py-2.5 text-sm font-medium text-ac-on-surface shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
