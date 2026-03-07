import Grainient from "@/components/Grainient";

const GRAINIENT_OVERLAY =
  "radial-gradient(ellipse at top, rgba(61,47,87,0.4) 0%, rgba(34,32,84,0.3) 40%, rgba(10,10,15,0.95) 100%)";

interface GrainientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function GrainientBackground({ children, className = "" }: GrainientBackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`.trim()}>
      <div className="absolute inset-0 z-0">
        <Grainient
          className="absolute inset-0 w-full h-full"
          timeSpeed={0.2}
          color1="#1a1625"
          color2="#3D2F57"
          color3="#222054"
          warpStrength={0.8}
          grainAmount={0.06}
          contrast={1.2}
          saturation={0.9}
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: GRAINIENT_OVERLAY }}
        aria-hidden
      />
      {children}
    </div>
  );
}
