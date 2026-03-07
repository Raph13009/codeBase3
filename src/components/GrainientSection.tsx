import Grainient from "@/components/Grainient";

const OVERLAY =
  "radial-gradient(ellipse at top, rgba(61,47,87,0.4) 0%, rgba(34,32,84,0.3) 40%, rgba(10,10,15,0.95) 100%)";

const VARIANTS = {
  a: {
    color1: "#1a1625",
    color2: "#3D2F57",
    color3: "#222054",
    timeSpeed: 0.2,
    warpStrength: 0.8,
    colorBalance: 0,
  },
  b: {
    color1: "#151520",
    color2: "#222054",
    color3: "#3D2F57",
    timeSpeed: 0.15,
    warpStrength: 0.6,
    colorBalance: 0.1,
  },
} as const;

interface GrainientSectionProps {
  variant: "a" | "b";
  children: React.ReactNode;
  className?: string;
}

export default function GrainientSection({ variant, children, className = "" }: GrainientSectionProps) {
  const props = VARIANTS[variant];
  return (
    <section className={`relative min-h-0 overflow-hidden ${className}`.trim()}>
      <div className="absolute inset-0 z-0">
        <Grainient
          className="absolute inset-0 w-full h-full"
          {...props}
          grainAmount={0.06}
          contrast={1.2}
          saturation={0.9}
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: OVERLAY }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
