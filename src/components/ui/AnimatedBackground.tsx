import React, { useMemo } from 'react';

const AnimatedBackground: React.FC = () => {
  // Memoize the points data to avoid recalculating on every render
  const points = useMemo(() => {
    const smallPoints = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
    }));

    const largePoints = Array.from({ length: 6 }, (_, i) => ({
      id: `large-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.6,
    }));

    const purplePoints = Array.from({ length: 4 }, (_, i) => ({
      id: `purple-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2.5 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
    }));

    return { smallPoints, largePoints, purplePoints };
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        {/* Points lumineux animés - réduits drastiquement de 30 à 15 */}
        {points.smallPoints.map((point) => (
          <div
            key={point.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${point.left}%`,
              top: `${point.top}%`,
              animationDelay: `${point.delay}s`,
              animationDuration: `${point.duration}s`,
              opacity: point.opacity,
            }}
          />
        ))}
        
        {/* Points plus gros et plus lumineux - réduits de 12 à 6 */}
        {points.largePoints.map((point) => (
          <div
            key={point.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${point.left}%`,
              top: `${point.top}%`,
              animationDelay: `${point.delay}s`,
              animationDuration: `${point.duration}s`,
              opacity: point.opacity,
            }}
          />
        ))}
        
        {/* Points violets pour variété - réduits de 8 à 4 */}
        {points.purplePoints.map((point) => (
          <div
            key={point.id}
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${point.left}%`,
              top: `${point.top}%`,
              animationDelay: `${point.delay}s`,
              animationDuration: `${point.duration}s`,
              opacity: point.opacity,
            }}
          />
        ))}
      </div>
      
      {/* Gradient subtil pour plus de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
    </div>
  );
};

export default AnimatedBackground; 