import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/home/HeroSection';
import HowWeHelp from '../components/home/HowWeHelp';
import WhatWeOffer from '../components/home/WhatWeOffer';
import OurOffers from '../components/home/OurOffers';
import StepperSection from '../components/home/StepperSection';
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
          
          {/* 2. Comment on vous aide */}
          <HowWeHelp />
          
          {/* 3. Pourquoi BoostAI ? */}
          <WhatWeOffer />
          
          {/* 4. Nos offres */}
          <OurOffers />
          
          {/* 5. Processus Stepper */}
          <StepperSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
