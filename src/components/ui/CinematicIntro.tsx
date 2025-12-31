import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import TextType from './TextType';

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [showSkip, setShowSkip] = useState(true);
  const [isSkipping, setIsSkipping] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Threshold: hide text when scale exceeds this value (before pixel zoom visible)
  const SCALE_THRESHOLD = 10;
  const FLASH_DURATION = 0.08; // 80ms hard cut
  const TOTAL_DURATION = 1.35; // 1.35s total (within 1.15-1.45s range)
  
  // Timing phases:
  // Phase A: 0.00-1.30s (typing - slower for readability)
  // Phase B: 0.80-1.75s (zoom: 0.80-1.50s slow, 1.50-1.75s fast)
  // Phase C: 1.75-1.83s (flash)
  // Phase D: 1.83s (reveal)

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !flashRef.current || isSkipping) return;

    const textElement = textRef.current;
    const flashElement = flashRef.current;

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    timelineRef.current = tl;

    // PHASE A: Kinetic Type Reveal (0.00s → ~0.45s)
    // TextType component handles the typing animation
    // We just ensure it's visible and ready
    tl.set(textElement, { opacity: 1, scale: 1 });
    
    // Show dot during typing (appears when "Consulting" is being typed)
    // "BoostAI Consulting" = 20 chars at 65ms = 1300ms total
    // "Consulting" starts at char 9, so ~585ms, dot appears mid-word
    const dotElement = textElement.querySelector('.dot-element');
    if (dotElement) {
      tl.to(dotElement, {
        opacity: 1,
        duration: 0.15,
        ease: 'easeOut'
      }, 1.0); // Appears during "Consulting" typing (around 1.0s)
    }

    // PHASE B: Camera Push / Acceleration (starts ~0.80s, overlaps with end of A)
    // Begin subtle scale-up after text is mostly written, then aggressive acceleration
    // 0.80-1.50s: scale 1.0 → ~12 (increasing speed, slow start)
    // 1.50-1.75s: scale ~12 → ~35+ (very fast "punch")
    tl.to(textElement, {
      scale: SCALE_THRESHOLD,
      duration: 0.70, // 0.80s to 1.50s
      ease: 'power2.in', // Moderate acceleration, slow start
      startAt: { scale: 1 },
    }, 0.80) // Start at 0.80s (overlaps with typing, after text is readable)
    .to(textElement, {
      scale: 35, // Continue to very large scale
      duration: 0.25, // 1.50s to 1.75s
      ease: 'expo.in', // Extreme acceleration (punch)
    }, 1.50)
    // CRITICAL: Hide text BEFORE pixel zoom becomes visible
    .set(textElement, {
      opacity: 0,
      visibility: 'hidden',
      display: 'none'
    }, 1.75) // Hide at 1.75s (when scale ~12-15, before pixel zoom)
    // PHASE C: Flash / Hard Cut (1.75-1.83s)
    .set(flashElement, {
      opacity: 0,
      display: 'block'
    }, 1.75)
    .to(flashElement, {
      opacity: 1,
      duration: FLASH_DURATION,
      ease: 'none' // Linear, instant flash
    }, 1.75)
    // PHASE D: Reveal Site (immediate after flash)
    .to(flashElement, {
      opacity: 0,
      duration: 0.05,
      ease: 'none'
    }, 1.75 + FLASH_DURATION);

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [onComplete, isSkipping, SCALE_THRESHOLD, FLASH_DURATION]);

  const handleSkip = () => {
    setIsSkipping(true);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    // Instant reveal
    if (textRef.current) {
      textRef.current.style.display = 'none';
    }
    if (flashRef.current) {
      flashRef.current.style.display = 'none';
    }
    onComplete();
  };

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSkipping) {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSkipping]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-auto"
      style={{
        background: 'radial-gradient(ellipse at center, #222054 0%, #0a0a0f 100%)'
      }}
    >
      {/* Skip Button - Top Right, Subtle */}
      {showSkip && !isSkipping && (
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-[10001] text-white/60 hover:text-white/90 text-xs font-light tracking-wider transition-colors duration-200 px-3 py-1.5"
          style={{
            fontFamily: "'Darker Grotesque', sans-serif"
          }}
        >
          SKIP
        </button>
      )}

      {/* Main Title Animation */}
      <div
        ref={textRef}
        className="text-center px-4"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: '1000px',
          transform: 'translateZ(0)'
        }}
      >
        <div
          className="font-bold select-none"
          style={{
            fontFamily: "'Darker Grotesque', sans-serif",
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            // Responsive typography: clamp for mobile
            fontSize: 'clamp(2rem, 6vw, 6rem)',
            maxWidth: '95vw',
            wordBreak: 'keep-all',
            whiteSpace: 'nowrap'
          }}
        >
          <span className="inline-flex items-center">
            <TextType
              as="span"
              text={["BoostAI Consulting"]}
              typingSpeed={65}
              pauseDuration={0}
              showCursor={true}
              cursorCharacter="|"
              className="block"
              textColors={['#ffffff']}
              loop={false}
            />
            <span
              className="ml-2 md:ml-4 inline-block dot-element"
              style={{
                color: '#5a4a6f',
                textShadow: '0 0 15px rgba(90, 74, 111, 1), 0 0 30px rgba(90, 74, 111, 0.8), 0 0 45px rgba(90, 74, 111, 0.6)',
                filter: 'drop-shadow(0 0 8px rgba(90, 74, 111, 0.9))',
                opacity: 0 // Will be animated by GSAP during typing
              }}
            >
              .
            </span>
          </span>
        </div>
      </div>

      {/* Full-Screen Flash - Hard Cut */}
      <div
        ref={flashRef}
        className="fixed inset-0 z-[10000] pointer-events-none"
        style={{
          background: '#3D2F57', // Brand deep purple - solid color, NO gradient
          display: 'none',
          opacity: 0
        }}
      />
    </div>
  );
};

export default CinematicIntro;
