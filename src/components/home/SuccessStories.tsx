import React, { useState, useEffect, useRef } from 'react';
import InfiniteCarousel from '../ui/InfiniteCarousel';
import CountUp from '../ui/CountUp';
import GradientText from '../ui/GradientText';

const testimonials = [
  {
    id: "sophie",
    name: "Sophie",
    role: "Head of Accounting",
    company: "Codig",
    description: "Huge thanks for the OCR tool, I used to waste over 30 minutes manually entering data. Now it's done in seconds. Thanks a lot.",
    logo: "/images/CodigLogo.png",
    moneySaved: 3000
  },
  {
    id: "nacia",
    name: "Nacia",
    role: "Director",
    company: "Blue Garden",
    description: "The site is exactly what I had in mind. Clean, modern and perfectly aligned with Blue Garden's spirit. I'm proud to share it with my clients.",
    logo: "/images/bluegarden.png",
    moneySaved: 1300
  },
  {
    id: "nicolas",
    name: "Nicolas",
    role: "CEO",
    company: "MusicLinks",
    description: "Raphaël helped me build the MVP of MusicLinks. He delivered a clean and functional marketplace with a well-structured database. It was exactly what I needed to launch.",
    logo: "/images/musicLinks.png",
    moneySaved: 15000
  }
];

const TestimonialCard: React.FC<{ 
  testimonial: typeof testimonials[0];
  isInCenter: boolean;
}> = ({ testimonial, isInCenter }) => {
  return (
    <div className="w-64 md:w-80 lg:w-96 h-72 md:h-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden border border-white/20">
            <img 
              src={testimonial.logo} 
              alt={testimonial.company} 
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          </div>
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 px-2 py-1 md:px-3 md:py-2 rounded-lg text-center border border-cyan-500/30">
            <div className="text-xs font-medium text-cyan-400 uppercase tracking-wide">Money saved</div>
            <div className="text-xs md:text-sm font-bold">
              {isInCenter ? (
                <GradientText className="text-xs md:text-sm font-bold">
                  <CountUp
                    from={0}
                    to={testimonial.moneySaved}
                    separator=","
                    direction="up"
                    duration={1.5}
                    className=""
                    startWhen={isInCenter}
                  />
                  €
                </GradientText>
              ) : (
                <GradientText className="text-xs md:text-sm font-bold">
                  {testimonial.moneySaved.toLocaleString()}€
                </GradientText>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{testimonial.name}</h3>
          <p className="text-cyan-400 text-xs md:text-sm mb-3 md:mb-4 opacity-80">{testimonial.role} - {testimonial.company}</p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">"{testimonial.description}"</p>
        </div>
      </div>
    </div>
  );
};

const SuccessStories: React.FC = () => {
  const [centerCardIndex, setCenterCardIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const checkCenterCards = () => {
      const cards = document.querySelectorAll('[data-index]');
      let closestToCenter = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const windowCenter = window.innerWidth / 2;
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - windowCenter);

        // Vérifier si la carte est visible et proche du centre
        if (rect.left < window.innerWidth && rect.right > 0 && distance < minDistance) {
          minDistance = distance;
          closestToCenter = parseInt(card.getAttribute('data-index') || '0');
        }
      });

      // Seulement mettre à jour si la carte au centre a changé
      if (closestToCenter !== centerCardIndex) {
        setCenterCardIndex(closestToCenter);
      }
    };

    // Fonction optimisée pour RAF
    const updateCenterCard = () => {
      checkCenterCards();
      animationRef.current = requestAnimationFrame(updateCenterCard);
    };

    // Démarrer la boucle RAF
    animationRef.current = requestAnimationFrame(updateCenterCard);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [centerCardIndex]);

  const carouselItems = testimonials.map((testimonial, index) => ({
    id: testimonial.id,
    content: (
      <div data-index={index} key={`card-${index}`}>
        <TestimonialCard 
          testimonial={testimonial} 
          isInCenter={centerCardIndex === index}
        />
      </div>
    )
  }));

  return (
    <section className="py-16 md:py-20 lg:py-32 relative z-10 bg-gradient-to-b from-[#0B0D14] to-[#1a1a2e] w-full max-w-none">
      <div className="w-full max-w-none mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 text-white">They Trusted Us</h2>
          <p className="text-sm md:text-base lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Real feedback from clients who transformed their business with our solutions
          </p>
        </div>
        
        <div className="py-4 md:py-8" ref={containerRef}>
          <InfiniteCarousel 
            items={carouselItems}
            speed={50}
            direction="left"
            className="py-2 md:py-4"
          />
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 