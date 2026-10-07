import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import {
  ASSETS,
  Icon,
  clamp,
  easeOut,
  lerp,
  prefersReducedMotion,
} from "@/components/agentic-commerce/shared";

const CHANNEL_ICONS = ["chat", "spark", "search"];
const SYSTEM_ICONS = ["box", "cart", "card", "truck"];
const SVG_NS = "http://www.w3.org/2000/svg";

type PathInfo = { el: SVGPathElement; len: number; node: string };
type Packet = { c: SVGCircleElement; pi: number; t: number; v: number; dir: number };

/** Dark panel that opens on scroll; packets flow between AI channels, the gateway and your systems. */
export function Architecture({ dict }: { dict: Dictionary }) {
  const a = dict.architecture;
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gatewayRef = useRef<HTMLDivElement>(null);

  // Panel opening: side inset shrinks to 0 as the section enters
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = easeOut(clamp((vh - r.top) / (vh * 0.75)));
      section.style.setProperty(
        "--ins",
        `${lerp(Math.min(48, window.innerWidth * 0.04), 0, t).toFixed(1)}px`,
      );
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Diagram: curves from each node to the gateway, with packets travelling both ways
  useEffect(() => {
    const dg = diagramRef.current;
    const svg = svgRef.current;
    const gw = gatewayRef.current;
    if (!dg || !svg || !gw) return;
    const reduce = prefersReducedMotion();
    const nodes = Array.from(dg.querySelectorAll<HTMLElement>(".dn"));
    let paths: PathInfo[] = [];
    let packets: Packet[] = [];
    let focusNode: string | null = null;
    let visible = false;
    let running = false;
    let lastT = 0;
    let raf = 0;

    const build = () => {
      svg.innerHTML = "";
      const R = dg.getBoundingClientRect();
      const G = gw.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${R.width} ${R.height}`);
      const vertical = G.top > R.top + 40 && window.innerWidth <= 960;
      const aN = nodes.filter((n) => n.dataset.side === "a");
      const sN = nodes.filter((n) => n.dataset.side === "s");
      paths = [];
      nodes.forEach((n) => {
        const B = n.getBoundingClientRect();
        const list = n.dataset.side === "a" ? aN : sN;
        const spread = list.indexOf(n) - (list.length - 1) / 2;
        let d: string;
        if (!vertical) {
          const gy = G.top + G.height / 2 - R.top + spread * 22;
          if (n.dataset.side === "a") {
            const x1 = B.right - R.left;
            const y1 = B.top + B.height / 2 - R.top;
            const x2 = G.left - R.left;
            const cx = (x1 + x2) / 2;
            d = `M${x1} ${y1} C${cx} ${y1} ${cx} ${gy} ${x2} ${gy}`;
          } else {
            const x1 = G.right - R.left;
            const x2 = B.left - R.left;
            const y2 = B.top + B.height / 2 - R.top;
            const cx = (x1 + x2) / 2;
            d = `M${x1} ${gy} C${cx} ${gy} ${cx} ${y2} ${x2} ${y2}`;
          }
        } else {
          const gx = G.left + G.width / 2 - R.left + spread * 26;
          if (n.dataset.side === "a") {
            const x1 = B.left + B.width / 2 - R.left;
            const y1 = B.bottom - R.top;
            const y2 = G.top - R.top;
            const cy = (y1 + y2) / 2;
            d = `M${x1} ${y1} C${x1} ${cy} ${gx} ${cy} ${gx} ${y2}`;
          } else {
            const y1 = G.bottom - R.top;
            const x2 = B.left + B.width / 2 - R.left;
            const y2 = B.top - R.top;
            const cy = (y1 + y2) / 2;
            d = `M${gx} ${y1} C${gx} ${cy} ${x2} ${cy} ${x2} ${y2}`;
          }
        }
        const p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", d);
        p.setAttribute("class", "dg-path");
        svg.appendChild(p);
        paths.push({ el: p, len: p.getTotalLength(), node: n.id });
      });
      packets = [];
      if (reduce) return;
      for (let i = 0; i < 16; i++) {
        const c = document.createElementNS(SVG_NS, "circle");
        const dir = Math.random() < 0.55 ? 1 : -1;
        c.setAttribute("r", dir > 0 ? "3" : "2.6");
        c.setAttribute("fill", dir > 0 ? "#faf9f5" : "#ff416c");
        svg.appendChild(c);
        packets.push({ c, pi: i % paths.length, t: Math.random(), v: 0.28 + Math.random() * 0.32, dir });
      }
    };

    const highlight = (id: string | null) => {
      focusNode = id;
      paths.forEach((p) => {
        p.el.classList.toggle("dim", !!id && id !== "gw" && p.node !== id);
        p.el.classList.toggle("hot", !!id && (id === "gw" || p.node === id));
      });
    };

    const loop = (now: number) => {
      const dt = Math.min(50, now - (lastT || now)) / 1000;
      lastT = now;
      packets.forEach((pk) => {
        pk.t += pk.v * dt;
        if (pk.t > 1) {
          pk.t = 0;
          pk.pi =
            focusNode && focusNode !== "gw"
              ? paths.findIndex((p) => p.node === focusNode)
              : Math.floor(Math.random() * paths.length);
          if (pk.pi < 0) pk.pi = 0;
        }
        const P = paths[pk.pi];
        if (!P) return;
        const pt = P.el.getPointAtLength(P.len * (pk.dir > 0 ? pk.t : 1 - pk.t));
        pk.c.setAttribute("cx", pt.x.toFixed(1));
        pk.c.setAttribute("cy", pt.y.toFixed(1));
        const show = !focusNode || focusNode === "gw" || P.node === focusNode;
        pk.c.setAttribute("opacity", show ? Math.sin(Math.PI * pk.t).toFixed(2) : "0");
      });
      if (visible) raf = requestAnimationFrame(loop);
      else {
        running = false;
        lastT = 0;
      }
    };

    const listeners: [EventTarget, string, EventListener][] = [];
    const on = (el: EventTarget, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      listeners.push([el, type, fn]);
    };
    nodes.forEach((n) => {
      on(n, "mouseenter", () => highlight(n.id));
      on(n, "mouseleave", () => highlight(null));
      on(n, "focus", () => highlight(n.id));
      on(n, "blur", () => highlight(null));
    });
    on(gw, "mouseenter", () => highlight("gw"));
    on(gw, "mouseleave", () => highlight(null));

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !running && !reduce) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(dg);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    };
    build();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(build).catch(() => undefined);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
      svg.innerHTML = "";
    };
  }, [a]);

  return (
    <section className="arch" id="architecture" ref={sectionRef}>
      <div className="wrap">
        <div className="arch-head">
          <div>
            <p className="eyebrow">{a.eyebrow}</p>
            <h2 className="h2">{a.title}</h2>
          </div>
          <p className="lead">{a.lead}</p>
        </div>
        <div className="diagram" ref={diagramRef}>
          <svg className="dg-svg" ref={svgRef} aria-hidden="true" />
          <div className="dg-col">
            <h4>{a.channelsTitle}</h4>
            {a.channels.map((label, i) => (
              <div className="dn" data-side="a" id={`n-a${i + 1}`} tabIndex={0} key={label}>
                <span className="di">
                  <Icon name={CHANNEL_ICONS[i]} />
                </span>
                {label}
              </div>
            ))}
          </div>
          <div className="gw" ref={gatewayRef}>
            <div className="gw-h">
              <img src={ASSETS.logo} alt="" />
              <div>
                <strong>{a.gatewayTitle}</strong>
                <small>{a.gatewaySub}</small>
              </div>
            </div>
            <div className="gw-p">
              <span>UCP</span>
              <span>ACP</span>
            </div>
            <ul>
              {a.gatewayChecks.map((label) => (
                <li key={label}>
                  {label} <Icon name="check" />
                </li>
              ))}
            </ul>
          </div>
          <div className="dg-col">
            <h4>{a.systemsTitle}</h4>
            {a.systems.map((label, i) => (
              <div className="dn" data-side="s" id={`n-s${i + 1}`} tabIndex={0} key={label}>
                <span className="di">
                  <Icon name={SYSTEM_ICONS[i]} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="claims">
          {a.claims.map((claim) => (
            <div key={claim.title}>
              <h3>{claim.title}</h3>
              <p>{claim.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
