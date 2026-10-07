import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import {
  ASSETS,
  Icon,
  clamp,
  easeOut,
  lerp,
  prefersReducedMotion,
} from "@/components/agentic-commerce/shared";

const STEP_DURATIONS = [5200, 2900, 2700, 2700, 4000, 3200];
const TILE_ICONS = ["box", "cart", "card", "truck"];

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const iconHtml = (id: string) => `<svg class="ico"><use href="#i-${id}"/></svg>`;

type Controller = {
  play: (index: number) => void;
  togglePause: () => void;
  replay: () => void;
};

/**
 * Live simulation: an AI assistant buys through the BoostAI gateway while the
 * merchant's systems light up. Runs imperatively (DOM appends), like the mockup.
 */
export function AgentConsole({ dict }: { dict: Dictionary }) {
  const c = dict.console;
  const conRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const wire1Ref = useRef<HTMLDivElement>(null);
  const wire2Ref = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const controller = useRef<Controller | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Simulation engine
  useEffect(() => {
    const con = conRef.current;
    const chat = chatRef.current;
    const log = logRef.current;
    const w1 = wire1Ref.current;
    const w2 = wire2Ref.current;
    const stepsEl = stepsRef.current;
    if (!con || !chat || !log || !w1 || !w2 || !stepsEl) return;

    const s = c.script;
    const reduce = prefersReducedMotion();
    setReduced(reduce);
    const tiles = Array.from(con.querySelectorAll<HTMLElement>(".tile"));
    const stepItems = Array.from(stepsEl.querySelectorAll<HTMLLIElement>("li"));
    const stepButtons = stepItems.map((li) => li.querySelector("button") as HTMLButtonElement);
    let token = 0;
    let isPaused = false;
    let visible = true;
    let spent = 0;

    const sleep = (ms: number, tk: number, fast = false) =>
      new Promise<boolean>((resolve) => {
        if (fast) return resolve(tk === token);
        let elapsed = 0;
        let last = performance.now();
        const frame = (now: number) => {
          if (tk !== token) return resolve(false);
          const dt = Math.min(64, now - last);
          last = now;
          if (!isPaused && visible) elapsed += dt;
          if (elapsed >= ms) {
            spent += ms;
            return resolve(true);
          }
          requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      });
    const trim = (el: HTMLElement, n: number) => {
      while (el.children.length > n) el.firstElementChild?.remove();
    };
    const msg = (cls: string, html: string) => {
      const d = document.createElement("div");
      d.className = `msg ${cls}`;
      d.innerHTML = html;
      chat.appendChild(d);
      trim(chat, 7);
      return d;
    };
    const line = (method: string, path: string, detail: string, status: string, statusClass = "") => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="m">${method}</span><span class="lp"><b>${esc(path)}</b><small>${esc(detail)}</small></span><span class="st ${statusClass}">${status}</span>`;
      log.appendChild(li);
      trim(log, 7);
    };
    const pulse = (wire: HTMLElement, back: boolean, fast: boolean) => {
      if (fast) return;
      wire.classList.remove("go", "back");
      void wire.offsetWidth;
      wire.classList.add(back ? "back" : "go");
    };
    const tile = (i: number, status: string | null, done: boolean) => {
      tiles.forEach((t, k) => t.classList.toggle("on", k === i && !done));
      const label = tiles[i]?.querySelector(".tile-st");
      if (status && label) label.textContent = status;
      if (done) tiles[i]?.classList.add("done");
    };
    const type = async (el: HTMLElement, text: string, tk: number, fast: boolean) => {
      if (fast) {
        el.textContent = text;
        return true;
      }
      for (let i = 1; i <= text.length; i++) {
        el.textContent = text.slice(0, i);
        if (!(await sleep(20, tk))) return false;
      }
      return true;
    };
    const say = async (html: string, tk: number, fast: boolean) => {
      const m = msg("bot", fast ? html : '<span class="dots"><i></i><i></i><i></i></span>');
      if (fast) return true;
      if (!(await sleep(600, tk))) return false;
      m.innerHTML = html;
      return true;
    };
    const roundTrip = async (
      tk: number,
      fast: boolean,
      method: string,
      path: string,
      detail: string,
      status: string,
      tileIndex: number,
      tileStatus: string,
      done = false,
      statusClass = "",
    ) => {
      pulse(w1, false, fast);
      if (!(await sleep(380, tk, fast))) return false;
      line(method, path, detail, status, statusClass);
      pulse(w2, false, fast);
      tile(tileIndex, tileStatus, false);
      if (!(await sleep(560, tk, fast))) return false;
      if (done) tile(tileIndex, null, true);
      pulse(w2, true, fast);
      if (!(await sleep(380, tk, fast))) return false;
      pulse(w1, true, fast);
      return sleep(300, tk, fast);
    };

    const RUN: ((tk: number, fast: boolean) => Promise<boolean>)[] = [
      async (tk, f) => {
        const u = msg("user", "");
        if (!(await type(u, s.query, tk, f))) return false;
        if (!(await sleep(350, tk, f))) return false;
        if (!(await roundTrip(tk, f, "POST", "/catalog/search", s.searchDetail, "200", 0, s.searchTile))) return false;
        return say(esc(s.searchReply), tk, f);
      },
      async (tk, f) => {
        if (!(await roundTrip(tk, f, "GET", "/products/cq-119", s.productDetail, "200", 0, s.productTile, true))) return false;
        return say(
          `<div class="pc"><img src="${ASSETS.headphonesSand}" alt=""><div><strong>${esc(s.productName)}</strong><span>${esc(s.productMeta)}</span><em>${esc(s.productStock)}</em></div></div>`,
          tk,
          f,
        );
      },
      async (tk, f) => {
        if (!(await roundTrip(tk, f, "POST", "/delivery/quote", s.deliveryDetail, "200", 1, s.deliveryTile))) return false;
        return say(esc(s.deliveryReply), tk, f);
      },
      async (tk, f) => {
        if (!(await roundTrip(tk, f, "POST", "/checkout/sessions", s.basketDetail, "201", 1, s.basketTile, true))) return false;
        return say(esc(s.basketReply), tk, f);
      },
      async (tk, f) => {
        const card = msg(
          "bot",
          `<div class="cc"><span class="cc-k">${esc(s.consentLabel)}</span><strong>${esc(s.consentAmount)}</strong><span class="cc-s">${esc(s.consentNote)}</span><span class="cbtn">${esc(s.confirm)}</span></div>`,
        );
        pulse(w1, false, f);
        if (!(await sleep(380, tk, f))) return false;
        line("POST", "/payments/authorize", s.paymentDetail, "SCA", "sca");
        pulse(w2, false, f);
        tile(2, s.paymentTile, false);
        if (!(await sleep(1300, tk, f))) return false;
        const button = card.querySelector(".cbtn");
        button?.classList.add("press");
        if (!(await sleep(220, tk, f))) return false;
        if (button) {
          button.classList.remove("press");
          button.innerHTML = iconHtml("check") + esc(s.authorized);
        }
        card.querySelector(".cc")?.classList.add("ok");
        return roundTrip(tk, f, "POST", "/payments/authorize", s.paymentDoneDetail, "200", 2, s.paymentDoneTile, true);
      },
      async (tk, f) => {
        if (!(await roundTrip(tk, f, "POST", "/orders", s.orderDetail, "201", 3, s.orderTile, true))) return false;
        return say(`<strong>${esc(s.orderReplyStrong)}</strong> ${esc(s.orderReply)}`, tk, f);
      },
    ];

    const reset = () => {
      chat.innerHTML = "";
      log.innerHTML = "";
      tiles.forEach((t) => {
        t.classList.remove("on", "done");
        const label = t.querySelector(".tile-st");
        if (label) label.textContent = c.pending;
      });
      stepItems.forEach((li, i) => {
        li.classList.remove("done", "run");
        stepButtons[i].removeAttribute("aria-current");
      });
    };
    const mark = (i: number, state: "run" | "done") => {
      const li = stepItems[i];
      li.classList.remove("run", "done");
      if (state === "run") {
        li.style.setProperty("--dur", `${STEP_DURATIONS[i]}ms`);
        void li.offsetWidth;
        li.classList.add("run");
        stepButtons[i].setAttribute("aria-current", "step");
      } else {
        li.classList.add("done");
        stepButtons[i].removeAttribute("aria-current");
      }
    };
    const play = async (from = 0, stopAfter: number | null = null): Promise<void> => {
      const tk = ++token;
      reset();
      for (let i = 0; i < from; i++) {
        await RUN[i](tk, true);
        mark(i, "done");
      }
      if (tk !== token) return;
      const last = stopAfter ?? RUN.length - 1;
      for (let i = from; i <= last; i++) {
        mark(i, "run");
        spent = 0;
        const ok = await RUN[i](tk, reduce);
        if (!ok || tk !== token) return;
        if (!reduce && spent < STEP_DURATIONS[i]) {
          if (!(await sleep(STEP_DURATIONS[i] - spent, tk))) return;
        }
        mark(i, "done");
      }
      if (reduce || stopAfter !== null) return;
      if (!(await sleep(3000, tk))) return;
      if (tk === token) play(0);
    };
    const setEnginePaused = (p: boolean) => {
      isPaused = p;
      con.classList.toggle("paused", p || !visible);
      setPaused(p);
    };

    controller.current = {
      play: (i) => {
        setEnginePaused(false);
        if (reduce) play(i, i);
        else play(i);
      },
      togglePause: () => setEnginePaused(!isPaused),
      replay: () => {
        setEnginePaused(false);
        play(0);
      },
    };

    let io: IntersectionObserver | null = null;
    const onVisibility = () => {
      visible = !document.hidden;
    };
    if (reduce) {
      play(0, RUN.length - 1);
      setEnginePaused(true);
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          con.classList.toggle("paused", isPaused || !visible);
        },
        { threshold: 0.15 },
      );
      io.observe(con);
      document.addEventListener("visibilitychange", onVisibility);
      play(0);
    }

    return () => {
      token++;
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      controller.current = null;
    };
  }, [c]);

  // The console settles from 92% to full size as it scrolls into view
  useEffect(() => {
    const con = conRef.current;
    if (!con || prefersReducedMotion()) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const t = easeOut(clamp((vh - con.getBoundingClientRect().top) / (vh * 0.75)));
      con.style.transform = `scale(${lerp(0.92, 1, t).toFixed(4)})`;
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

  return (
    <div className="console" id="demo" role="region" aria-label={c.region} ref={conRef}>
      <div className="c-top">
        <div className="c-title">
          <b>{c.label}</b>
          <span>{c.title}</span>
        </div>
        <div className="c-ctrl">
          <button
            className="icon-btn"
            type="button"
            aria-label={paused ? c.resume : c.pause}
            disabled={reduced}
            onClick={() => controller.current?.togglePause()}
          >
            <Icon name={paused ? "play" : "pause"} />
          </button>
          <button
            className="icon-btn"
            type="button"
            aria-label={c.replay}
            onClick={() => controller.current?.replay()}
          >
            <Icon name="replay" />
          </button>
        </div>
      </div>

      <div className="c-grid">
        <article className="pane pane-chat">
          <div className="pane-head">
            <span className="pi">
              <Icon name="spark" />
            </span>
            <div>
              <strong>{c.chatTitle}</strong>
              <small>{c.chatSub}</small>
            </div>
          </div>
          <div className="chat" ref={chatRef} aria-live="off" />
        </article>

        <div className="wire" ref={wire1Ref}>
          <i />
        </div>

        <article className="pane pane-gw">
          <div className="pane-head">
            <span className="pi">
              <img src={ASSETS.logo} alt="" />
            </span>
            <div>
              <strong>{c.gatewayTitle}</strong>
              <small>{c.gatewaySub}</small>
            </div>
            <div className="protos">
              <span className="proto">UCP</span>
              <span className="proto on">ACP</span>
            </div>
          </div>
          <ol className="log" ref={logRef} />
          <div className="gw-foot">
            {c.gatewayChecks.map((label) => (
              <span key={label}>
                <Icon name="check" />
                {label}
              </span>
            ))}
          </div>
        </article>

        <div className="wire" ref={wire2Ref}>
          <i />
        </div>

        <article className="pane pane-sys">
          <div className="pane-head">
            <span className="pi">
              <Icon name="store" />
            </span>
            <div>
              <strong>{c.systemsTitle}</strong>
              <small>{c.systemsSub}</small>
            </div>
          </div>
          <div className="sys">
            {c.tiles.map((label, i) => (
              <div className="tile" key={label}>
                <span className="ti">
                  <Icon name={TILE_ICONS[i]} />
                </span>
                <span className="tm">
                  <strong>{label}</strong>
                  <span className="tile-st">{c.pending}</span>
                </span>
                <span className="ok">
                  <Icon name="check" />
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <ol className="steps" ref={stepsRef} aria-label={c.stepsLabel}>
        {c.steps.map((label, i) => (
          <li key={label}>
            <button type="button" onClick={() => controller.current?.play(i)}>
              <span>0{i + 1}</span>
              <strong>{label}</strong>
              <i className="bar" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
