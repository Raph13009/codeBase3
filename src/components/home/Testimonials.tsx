import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  text: string;
  language: 'fr' | 'en';
}

const Testimonials: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const allTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sophie Martin",
      position: "E-commerce animalier",
      text: "Le chatbot IA m’a fait gagner un temps fou ces derniers mois. Plus besoin de répondre manuellement aux mêmes questions tous les jours, et l'équipe BoostAI est super réactive pour les mises à jour. Franchement, c’est devenu indispensable pour mon site.",
      language: "fr"
    },
    {
      id: 2,
      name: "John Smith",
      position: "Digital",
      text: "Their AI solutions have transformed our business operations. The results exceeded our expectations, with a 200% increase in customer engagement.",
      language: "en"
    },
    {
      id: 3,
      name: "Thomas Dubois",
      position: "E-commerce",
      text: "L'optimisation SEO réalisée par leur équipe a boosté notre visibilité en ligne. Notre trafic a doublé en seulement 3 mois.",
      language: "fr"
    }
  ];
  

  // Get testimonials based on current language
  const testimonials = i18n.language === 'fr' 
    ? [
        allTestimonials[0], // First French testimonial
        allTestimonials[2], // Second French testimonial
        allTestimonials[1]  // English testimonial
      ]
    : [
        allTestimonials[1], // English testimonial
        allTestimonials[0], // First French testimonial
        allTestimonials[2]  // Second French testimonial
      ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            {t('testimonials')}
          </h2>
          
          <div className={`relative transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute -top-6 -left-6 text-primary/20">
              <Quote size={80} />
            </div>
            
            <div className="relative z-10 overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg p-8 md:p-10">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col gap-6">
                      <div className="relative max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl italic text-center line-clamp-6 md:line-clamp-none">
                          "{testimonial.text}"
                        </p>
                      </div>
                      
                      <div className="text-center mt-4">
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button 
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors pointer-events-auto"
                  aria-label={t('previousTestimonial')}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors pointer-events-auto"
                  aria-label={t('nextTestimonial')}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex 
                        ? 'bg-primary w-4' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
