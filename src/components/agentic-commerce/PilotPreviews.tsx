import { useId, type CSSProperties, type ReactNode } from "react";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { Icon } from "@/components/agentic-commerce/fx";

type Previews = Dictionary["pilot"]["previews"];

/** Mini product UIs that illustrate each pilot step (audit, connection, tracking). */
export function PilotPreview({ index, dict }: { index: number; dict: Dictionary }) {
  const previews = dict.pilot.previews;
  if (index === 0) return <AuditPreview copy={previews.audit} />;
  if (index === 1) return <ConnectPreview copy={previews.connect} />;
  return <MeasurePreview copy={previews.measure} />;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[24px] bg-gradient-to-br from-[#dcf5e7] to-[#a8e4c5] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
      <div className="rounded-[18px] border border-white/70 bg-white/85 p-4 text-left text-[#1b1b1b] backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

function Header({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[12px] font-bold tracking-tight">{title}</span>
      {aside}
    </div>
  );
}

const AUDIT_VALUES = [82, 54, 68, 77];
const AUDIT_SCORE = 72;
const GAUGE_RADIUS = 27;
const GAUGE_LENGTH = 2 * Math.PI * GAUGE_RADIUS;

function AuditPreview({ copy }: { copy: Previews["audit"] }) {
  return (
    <Frame>
      <Header title={copy.title} aside={<span className="ac-label text-[9px] text-black/40">{copy.score}</span>} />
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
            <circle cx="32" cy="32" r={GAUGE_RADIUS} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="6" />
            <circle
              className="ac-gauge-arc"
              cx="32"
              cy="32"
              r={GAUGE_RADIUS}
              fill="none"
              stroke="#1b1b1b"
              strokeWidth="6"
              strokeLinecap="round"
              style={
                {
                  "--len": GAUGE_LENGTH,
                  "--target": GAUGE_LENGTH * (1 - AUDIT_SCORE / 100),
                } as CSSProperties
              }
            />
          </svg>
          <span className="ac-tabular absolute inset-0 flex items-center justify-center text-[17px] font-bold">
            {AUDIT_SCORE}
          </span>
        </div>
        <div className="flex-1 space-y-2">
          {copy.bars.map((bar, i) => (
            <div key={bar}>
              <div className="flex justify-between text-[10px] font-medium">
                <span>{bar}</span>
                <span className="ac-tabular text-black/45">{AUDIT_VALUES[i]}</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-black/10">
                <div
                  className="ac-grow h-full rounded-full bg-[#1b1b1b]"
                  style={{ width: `${AUDIT_VALUES[i]}%`, "--i": i } as CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Node({ icon, label, dark = false }: { icon: string; label: string; dark?: boolean }) {
  return (
    <div className="flex w-[76px] shrink-0 flex-col items-center gap-1.5 text-center">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
          dark ? "bg-[#1b1b1b] text-white" : "border border-black/10 bg-white text-[#1b1b1b]"
        }`}
      >
        <Icon name={icon} size={18} />
      </span>
      <span className="text-[10px] font-semibold leading-tight">{label}</span>
    </div>
  );
}

function ConnectPreview({ copy }: { copy: Previews["connect"] }) {
  return (
    <Frame>
      <Header
        title={copy.title}
        aside={
          <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-1 text-[9px] font-bold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            {copy.status}
          </span>
        }
      />
      <div className="mt-4 flex items-center">
        <Node icon="storefront" label={copy.store} />
        <svg className="h-6 min-w-0 flex-1" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="12" x2="100" y2="12" stroke="#1b1b1b" strokeWidth="1.5" className="ac-dash-flow" />
        </svg>
        <Node icon="auto_awesome" label={copy.agent} dark />
      </div>
      <ul className="ac-stagger mt-4 space-y-1.5">
        {copy.logs.map((log) => (
          <li key={log} className="flex items-center gap-2 text-[11px] font-medium">
            <Icon name="check_circle" size={14} className="text-green-600" />
            {log}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const CHART_LINE = "M0,62 C20,60 30,55 50,50 C70,45 82,41 100,34 C118,27 134,29 150,20 C166,12 182,10 200,5";

function MeasurePreview({ copy }: { copy: Previews["measure"] }) {
  const gradientId = useId();

  return (
    <Frame>
      <Header title={copy.title} />
      <p className="mt-1 text-[10px] text-black/45">{copy.metric}</p>
      <svg viewBox="0 0 200 70" className="mt-2 h-[64px] w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${CHART_LINE} L200,70 L0,70 Z`} fill={`url(#${gradientId})`} />
        <path
          d={CHART_LINE}
          fill="none"
          stroke="#1b1b1b"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          className="ac-draw"
        />
      </svg>
      <div className="mt-3 flex items-start">
        {copy.roadmap.map((step, i) => (
          <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              <span className={`h-px flex-1 ${i === 0 ? "bg-transparent" : "bg-black/15"}`} />
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  i === 0
                    ? "bg-[#1b1b1b] text-white"
                    : i === 1
                      ? "bg-white ring-2 ring-[#1b1b1b]"
                      : "border border-black/20 bg-white"
                }`}
              >
                {i === 0 ? <Icon name="check" size={11} /> : null}
              </span>
              <span className={`h-px flex-1 ${i === copy.roadmap.length - 1 ? "bg-transparent" : "bg-black/15"}`} />
            </div>
            <span className={`text-[9px] font-semibold ${i === 0 ? "text-[#1b1b1b]" : "text-black/45"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
