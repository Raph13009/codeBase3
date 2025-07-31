import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/home/HeroSection';
import HowWeHelp from '../components/home/HowWeHelp';
import LaptopSection from '../components/home/LaptopSection';
import WhatWeOffer from '../components/home/WhatWeOffer';
import OurOffers from '../components/home/OurOffers';
import StepperSection from '../components/home/StepperSection';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaTags from '@/components/seo/MetaTags';

const Index: React.FC = () => {
  return (
    <>
      <MetaTags 
        title="Agence Web BoostAI - Développement Web Sur-Mesure | Sites Internet & Solutions Digitales"
        description="Agence web spécialisée dans la création de sites internet sur-mesure et le développement web. Code rapide, clients conquis, solutions innovantes. Choisissez la meilleure agence web pour votre projet digital."
        keywords="agence web, développement web sur-mesure, agence digitale, création site internet, agence code, audit site web, refonte de site, accompagnement digital, agence SEO, choisir agence web, meilleure agence web, devis agence web"
      />
      <GoogleAnalytics />
      <div className="relative" style={{ backgroundColor: '#121417' }}>
        <Header />
        
        <main className="relative z-10">
          {/* 1. Hero Section */}
          <HeroSection />
          
          {/* Scroll Velocity */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#0b0f1a] to-[#1c2233] bg-opacity-95" style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)' }}>
            <ScrollVelocity
              texts={[
                <>
                  <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">+10 projets (2025)</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">100% satisfaits</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Livraison rapide</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Sur-mesure</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Code propre</span> <span className="text-blue-400 mx-2">•</span>
                  <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">+10 projets (2025)</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">100% satisfaits</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Livraison rapide</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Sur-mesure</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Code propre</span> <span className="text-blue-400 mx-2">•</span>
                </>,
                <>
                  <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Support premium</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">IA intégrée</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">SEO optimisé</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Sans stress</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Audit offert</span> <span className="text-blue-400 mx-2">•</span>
                  <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Support premium</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">IA intégrée</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">SEO optimisé</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Sans stress</span> <span className="text-blue-400 mx-2">•</span> <span className="text-[#e5e7eb] hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-300 hover:bg-clip-text hover:text-transparent transition-all duration-300">Audit offert</span> <span className="text-blue-400 mx-2">•</span>
                </>
              ]} 
              velocity={100} 
              className="text-base md:text-xl"
              parallaxClassName="py-8"
              scrollerClassName="text-base md:text-xl"
              parallaxStyle={{ marginTop: '-20px', marginBottom: '-20px' }}
            />
          </div>
          
          {/* 2. Comment on vous aide */}
          <HowWeHelp />
          
          {/* 3. Laptop Section */}
          <LaptopSection />
          
          {/* 4. Pourquoi BoostAI ? */}
          <WhatWeOffer />
          
          {/* 5. Nos offres */}
          <OurOffers />
          
          {/* 6. Processus Stepper */}
          <StepperSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
