import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  image: string;
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
      position: "Directrice Marketing",
      company: "TechVision France",
      text: "Le chatbot IA développé par l'équipe a révolutionné notre service client. Nos clients sont plus satisfaits que jamais et nos coûts opérationnels ont significativement diminué.",
      image: "/lovable-uploads/ae9cc7de-acd7-4613-9834-0fdc60117dfe.png",
      language: "fr"
    },
    {
      id: 2,
      name: "John Smith",
      position: "Head of Digital",
      company: "InnovateTech UK",
      text: "Their AI solutions have transformed our business operations. The results exceeded our expectations, with a 200% increase in customer engagement.",
      image: "/lovable-uploads/1e45b816-f132-479c-8c97-8438831e48bd.png",
      language: "en"
    },
    {
      id: 3,
      name: "Thomas Dubois",
      position: "Responsable E-commerce",
      company: "ShopFrance",
      text: "L'optimisation SEO réalisée par leur équipe a boosté notre visibilité en ligne. Notre trafic organique a doublé en seulement 3 mois.",
      image: "/lovable-uploads/3e45b816-f132-479c-8c97-8438831e48bd.png",
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
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/30 flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <div>
                        <p className="text-lg md:text-xl mb-6 italic">
                          "{testimonial.text}"
                        </p>
                        
                        <div>
                          <p className="font-bold text-lg">{testimonial.name}</p>
                          <p className="text-muted-foreground">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
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
