import React from 'react';
import DarkVeil from './DarkVeil';

export default function DarkVeilDemo() {
  return (
    <div className="darkveil-demo">
      <h2>DarkVeil Background Demo</h2>
      
      {/* Basic usage */}
      <div style={{ width: '100%', height: '400px', position: 'relative', marginBottom: '20px' }}>
        <DarkVeil />
      </div>

      {/* With custom parameters */}
      <div style={{ width: '100%', height: '400px', position: 'relative', marginBottom: '20px' }}>
        <DarkVeil
          hueShift={45}
          noiseIntensity={0.1}
          scanlineIntensity={0.2}
          speed={1.0}
          scanlineFrequency={0.5}
          warpAmount={0.3}
        />
      </div>

      {/* Subtle effect */}
      <div style={{ width: '100%', height: '400px', position: 'relative', marginBottom: '20px' }}>
        <DarkVeil
          hueShift={180}
          noiseIntensity={0.05}
          scanlineIntensity={0.1}
          speed={0.3}
          scanlineFrequency={0.2}
          warpAmount={0.1}
        />
      </div>

      {/* Intense effect */}
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <DarkVeil
          hueShift={90}
          noiseIntensity={0.3}
          scanlineIntensity={0.4}
          speed={2.0}
          scanlineFrequency={1.0}
          warpAmount={0.8}
        />
      </div>
    </div>
  );
} 