import React from "react";
import "./DarkVeil.css";

interface DarkVeilProps {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
}

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0,
  resolutionScale = 1,
}: DarkVeilProps) {
  return (
    <div 
      className="darkveil-container"
      style={{
        '--hue-shift': `${hueShift}deg`,
        '--noise-intensity': noiseIntensity,
        '--scanline-intensity': scanlineIntensity,
        '--animation-speed': `${speed}s`,
        '--scanline-frequency': scanlineFrequency,
        '--warp-amount': warpAmount,
      } as React.CSSProperties}
    >
      <div className="darkveil-animation"></div>
    </div>
  );
} 