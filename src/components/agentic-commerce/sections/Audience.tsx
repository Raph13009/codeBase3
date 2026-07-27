import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";

export function Audience({ dict }: { dict: Dictionary }) {
  return (
    <section id="audience" className="scroll-mt-28 px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ac-on-surface sm:text-4xl">
          {dict.audience.title}
        </h2>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {dict.audience.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 px-5 py-4 text-base font-medium text-ac-on-surface"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ac-primary"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
