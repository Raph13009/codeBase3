import { useRef, useState } from "react";
import { Icon, ScrollTrigger, StLink, useGSAP } from "@/components/studio/motion";
import { SERVICES } from "@/components/studio/data";

const pad = (n: number) => String(n).padStart(2, "0");

/** Big service list: the row crossing the middle of the screen (or hovered) comes forward. */
export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const hovering = useRef(false);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const rows = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".st-svc") ?? []);
      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive && !hovering.current) setActive(i);
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section className="st-services" id="services" ref={rootRef} aria-labelledby="st-svc-title">
      <h2 className="st-label" id="st-svc-title">
        <b>04</b> Services
      </h2>

      <ul className="st-svc-list">
        {SERVICES.map((service, i) => (
          <li
            className="st-svc"
            key={service.name}
            data-active={active === i}
            onMouseEnter={() => {
              hovering.current = true;
              setActive(i);
            }}
            onMouseLeave={() => {
              hovering.current = false;
            }}
          >
            <StLink href={service.href} cursor="Découvrir">
              <h3 className="t">{service.name}</h3>
              <span className="d">
                <span>
                  <span>{service.text}</span>
                </span>
              </span>
              <Icon name="arrow-up-right" />
            </StLink>
          </li>
        ))}
      </ul>

      <div className="st-svc-side" aria-hidden="true">
        <div className="st-svc-num">{pad(active + 1)}</div>
        <p>
          {pad(active + 1)} / {pad(SERVICES.length)}
        </p>
      </div>
    </section>
  );
}
