import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/home/HeroSection';
import HowWeHelp from '../components/home/HowWeHelp';
import WhatWeOffer from '../components/home/WhatWeOffer';
import OurOffers from '../components/home/OurOffers';
import FAQSection from '../components/home/FAQSection';
import OngoingProjects from '../components/home/OngoingProjects';
import StackTech from '../components/home/StackTech';
import ContactForm from '../components/contact/ContactForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaTags from '@/components/seo/MetaTags';

const Index: React.FC = () => {
  return (
    <>
      <MetaTags 
        title="BoostAI Consulting | Outils modernes pour faire grandir votre business"
        description="BoostAI crée des sites, MVP et automatisations pour les petites entreprises qui veulent avancer sans se ruiner. Livraison rapide, tarifs abordables, design pro."
        keywords="site web, MVP, automatisation, IA, business, développement, nocode, React, TypeScript, Supabase"
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
          
          {/* 5. Réalisations / Cas clients */}
          <OngoingProjects />
          
          {/* 6. Process */}
          <FAQSection />
          
          {/* 7. Stack & Tech */}
          <StackTech />
          
          {/* 8. Contact */}
          <ContactForm />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
