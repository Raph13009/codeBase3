import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, Check, ArrowRight, Lightbulb, Rocket, Users, Globe2, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BlobCursor from '../ui/BlobCursor';
import DecryptedText from '../ui/DecryptedText';

const OurOffers: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start on Pack MVP (index 1)
  const carouselRef = useRef<HTMLDivElement>(null);

  const journeySteps = [
    {
      step: "Étape 1",
      title: "Un site qui crédibilise votre projet",
      description: "Nous créons un site moderne qui attire vos premiers clients.",
      icon: Globe2,
      illustration: "/images/website-mockup.png", // Placeholder
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "Étape 2", 
      title: "Un produit qui transforme votre idée",
      description: "Nous développons rapidement votre MVP pour tester et séduire.",
      icon: Rocket,
      illustration: "/images/mvp-illustration.png", // Placeholder
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "Étape 3",
      title: "Pack IA & Automatisation",
      description: "Intégrez IA et automatisations intelligentes pour libérer du temps et accélérer votre croissance.",
      icon: Bot,
      illustration: "/images/ai-automation.png", // Placeholder
      color: "from-orange-500 to-red-500"
    }
  ];

  const offers = [
    {
      icon: Globe,
      title: "Pack Site Web",
      price: "à partir de 199€",
      description: "Un site moderne et optimisé pour développer votre présence en ligne",
      features: [
        "Design responsive et moderne",
        "Optimisation SEO de base",
        "Formulaire de contact",
        "Hébergement inclus 1 an",
        "Formation d'utilisation",
        "Support 30 jours"
      ],
      color: "from-blue-500 to-cyan-500",
      popular: false,
      mockup: "/images/website-mockup.png" // Placeholder
    },
    {
      icon: Smartphone,
      title: "Pack MVP",
      price: "à partir de 1 500€",
      description: "Un produit clé en main pour tester et valider votre idée",
      features: [
        "Application web complète",
        "Base de données sécurisée",
        "Authentification utilisateurs",
        "Dashboard administrateur",
        "API REST complète",
        "Support 90 jours"
      ],
      color: "from-purple-500 to-pink-500",
      popular: true,
      mockup: "/images/mvp-mockup.png" // Placeholder
    },
    {
      icon: Zap,
      title: "Pack IA & Automatisation",
      price: "sur devis",
      description: "Des outils intelligents pour gagner du temps et accélérer votre croissance",
      features: [
        "Agents IA personnalisés (assistants, chatbots)",
        "Automatisation des tâches répétitives",
        "Workflows intelligents (CRM, gestion, suivi)",
        "Intégrations avec vos outils existants",
        "Optimisation des processus métiers",
        "Support premium & évolutions IA"
      ],
      color: "from-orange-500 to-red-500",
      popular: false,
      mockup: "/images/complete-mockup.png", // Placeholder
      futuristic: true
    }
  ];

  // Transform offers for carousel
  const carouselItems = offers.map((offer, index) => ({
    id: index + 1,
    title: offer.title === "Pack IA & Automatisation" ? "Solutions IA & Automatisation" : offer.title,
    description: `${offer.price} - ${offer.description}`,
    icon: React.createElement(offer.icon, { className: "h-[16px] w-[16px] text-white" })
  }));

  const nextSlide = () => {
    if (currentSlide < offers.length - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: newSlide * 320,
          behavior: 'smooth'
        });
      }
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: newSlide * 320,
          behavior: 'smooth'
        });
      }
    }
  };

  // Update current slide based on scroll position with better logic
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const cardWidth = 320;
        const newSlide = Math.round(scrollLeft / cardWidth);
        // Ensure we stay within bounds
        const clampedSlide = Math.max(0, Math.min(newSlide, offers.length - 1));
        setCurrentSlide(clampedSlide);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [offers.length]);

  // Initialize scroll position to Pack MVP on mount
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 1 * 320, // Start on Pack MVP
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* BlobCursor - Desktop Only */}
      <div className="absolute inset-0 hidden md:block">
        <BlobCursor
          blobType="circle"
          fillColor="#5227FF"
          trailCount={3}
          sizes={[30, 60, 40]}
          innerSizes={[10, 20, 15]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={5}
          shadowOffsetX={10}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={100}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nous boostons votre business à chaque étape
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            De votre première présence en ligne jusqu'à l'automatisation avancée, BoostAI vous accompagne.
          </p>
        </motion.div>

        {/* Journey Steps - Horizontal Timeline */}
        <div className="mb-20">
          {/* Desktop Version */}
          <div className="hidden md:block">
            <div className="text-center mb-12">
              <p className="text-slate-400 text-sm italic">
                Choisissez la solution qui correspond à votre stade actuel.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {journeySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {/* Title with accent color */}
                  <h3 className={`text-2xl font-bold mb-3 leading-tight ${
                    index === 0 ? 'text-blue-400' : 
                    index === 1 ? 'text-purple-400' : 
                    'text-orange-400'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Version - Dynamic Titles */}
          <div className="md:hidden">
            <div className="text-center mb-12">
              <p className="text-slate-400 text-sm italic mb-8">
                Choisissez la solution qui correspond à votre stade actuel.
              </p>
              
              {/* Dynamic Title Section */}
              <div className="h-32 flex items-center justify-center">
                <div className="relative">
                  {journeySteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: currentSlide === index ? 1 : 0,
                        y: currentSlide === index ? 0 : 20,
                        scale: currentSlide === index ? 1 : 0.95
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className={`absolute inset-0 flex flex-col items-center justify-center ${
                        currentSlide === index ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                    >
                      <DecryptedText
                        text={step.title}
                        animateOn="view"
                        revealDirection="center"
                        className={`text-2xl font-bold mb-3 leading-tight ${
                          index === 0 ? 'text-blue-400' : 
                          index === 1 ? 'text-purple-400' : 
                          'text-orange-400'
                        }`}
                        encryptedClassName="text-slate-400"
                      />
                      <DecryptedText
                        text={step.description}
                        animateOn="view"
                        revealDirection="center"
                        className="text-slate-300 text-sm leading-relaxed max-w-xs"
                        encryptedClassName="text-slate-500"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        {/* Desktop Version */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <Card className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 group h-full ${offer.popular ? 'ring-2 ring-purple-500/50 scale-105' : 'hover:scale-105'} ${offer.futuristic ? 'ring-1 ring-orange-500/30 hover:ring-orange-500/50 hover:shadow-orange-500/20' : ''}`}>
                {offer.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Le plus populaire
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${offer.color} p-4 group-hover:scale-110 transition-transform duration-300 ${offer.futuristic ? 'shadow-lg shadow-orange-500/30' : ''}`}>
                    <offer.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {offer.title === "Pack IA & Automatisation" ? "Solutions IA & Automatisation" : offer.title}
                  </CardTitle>
                  <div className="text-3xl font-bold mb-2 animate-gradient-price">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-shine-slow">
                      {offer.price}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {offer.description}
                  </p>
                </CardHeader>

                {/* Mockup Placeholder */}
                <div className="px-6 mb-6">
                  <div className={`w-full h-32 bg-slate-700/30 rounded-lg flex items-center justify-center border border-slate-600 ${offer.futuristic ? 'border-orange-500/30 group-hover:border-orange-500/50' : ''}`}>
                    <span className="text-slate-400 text-sm">Mockup {offer.title}</span>
                  </div>
                </div>

                <CardContent className="text-center">
                  <ul className="space-y-3 text-left mb-8">
                    {offer.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-300 text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${offer.color} hover:from-opacity-90 hover:to-opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg ${offer.futuristic ? 'shadow-orange-500/20 group-hover:shadow-orange-500/40' : ''}`}
                    onClick={() => window.location.href = '/contact'}
                  >
                    Demander un devis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Version - Horizontal Scroll Snap Carousel */}
        <div className="md:hidden mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            

            {/* Navigation Arrows */}
            {currentSlide > 0 && (
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}

            {currentSlide < offers.length - 1 && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Carousel Container */}
            <div className="mobile-carousel flex overflow-x-auto scrollbar-hide px-4" ref={carouselRef}>
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    className="mobile-carousel-item relative group"
                    style={{ 
                      width: '280px',
                      flexShrink: 0
                    }}
                  >
                    <Card className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group h-full shadow-lg hover:shadow-xl ${offer.popular ? 'ring-2 ring-purple-500/50' : ''} ${offer.futuristic ? 'ring-1 ring-orange-500/30 hover:ring-orange-500/50' : ''}`}>
                      {offer.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            Le plus populaire
                          </span>
                        </div>
                      )}
                      <CardHeader className="text-center pb-4 pt-6 px-4">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${offer.color} p-3 group-hover:scale-110 transition-transform duration-300 ${offer.futuristic ? 'shadow-lg shadow-orange-500/30' : ''}`}>
                          {React.createElement(offer.icon, { className: "w-6 h-6 text-white" })}
                        </div>
                        <CardTitle className="text-lg font-bold text-white mb-2 leading-tight">
                          {offer.title === "Pack IA & Automatisation" ? "Solutions IA & Automatisation" : offer.title}
                        </CardTitle>
                        <div className="text-2xl font-bold mb-3">
                          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-shine-slow">
                            {offer.price}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {offer.description}
                        </p>
                      </CardHeader>

                      {/* Mockup Placeholder */}
                      <div className="px-4 mb-6">
                        <div className={`w-full h-20 bg-slate-700/30 rounded-lg flex items-center justify-center border border-slate-600 ${offer.futuristic ? 'border-orange-500/30 group-hover:border-orange-500/50' : ''}`}>
                          <span className="text-slate-400 text-xs">Mockup {offer.title}</span>
                        </div>
                      </div>

                      <CardContent className="text-center px-4 pb-6">
                        <ul className="space-y-2 text-left mb-6">
                          {offer.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-slate-300 text-xs">
                              <Check className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button
                          className={`w-full bg-gradient-to-r ${offer.color} hover:from-opacity-90 hover:to-opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg ${offer.futuristic ? 'shadow-orange-500/20 group-hover:shadow-orange-500/40' : ''}`}
                          onClick={() => window.location.href = '/contact'}
                        >
                          Demander un devis
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicators */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      if (carouselRef.current) {
                        carouselRef.current.scrollTo({
                          left: index * 320,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-purple-400 scale-125' 
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Diagnostic Banner */}
        <motion.div
          className="w-full max-w-3xl mx-auto mt-12 p-8 rounded-2xl backdrop-blur-md bg-white/5 text-center shadow-lg border border-slate-600/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Animated Title */}
          <DecryptedText
            text="Pas sûr de ce qui vous convient ?"
            animateOn="view"
            revealDirection="center"
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            encryptedClassName="text-slate-400"
          />

          {/* Subtitle */}
          <p className="mt-2 text-slate-300 text-lg">
            Diagnostic gratuit avec un expert BoostAI
          </p>

          {/* CTA Button */}
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 shadow-md hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              Réserver un diagnostic gratuit
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurOffers; 