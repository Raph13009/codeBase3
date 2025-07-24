import React, { memo, Suspense, lazy } from 'react';
import HeroSection from '../components/home/HeroSection';
import HowWeHelp from '../components/home/HowWeHelp';
import SuccessStories from '../components/home/SuccessStories';
import WhatWeOffer from '../components/home/WhatWeOffer';
import BlogSection from '../components/home/BlogSection';
import OngoingProjects from '../components/home/OngoingProjects';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaTags from '@/components/seo/MetaTags';
import DarkVeil from '@/components/DarkVeil';

// Lazy load FAQSection for better performance
const FAQSection = lazy(() => import('../components/home/FAQSection'));

const Index: React.FC = () => {
  return (
    <>
      <MetaTags 
        title="BoostAI Consulting | AI Solutions & Digital Transformation Experts"
        description="Transform your business with AI-powered solutions. Expert in chatbots, SEO optimization, content creation, and intelligent web development. Boost productivity and customer engagement."
        keywords="AI solutions, digital transformation, chatbots, SEO optimization, content creation, web development, business automation, artificial intelligence"
      />
      <GoogleAnalytics />
      <div className="min-h-screen relative bg-[#0B0D14]">
        <div className="fixed inset-0 z-0">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.05}
            scanlineIntensity={0}
            speed={0.3}
            scanlineFrequency={0}
            warpAmount={0.1}
            resolutionScale={1}
          />
        </div>
        <Header />
        
        <main className="relative z-10">
          <HeroSection />
          <HowWeHelp />
          <SuccessStories />
          <WhatWeOffer />
          <BlogSection />
          <Suspense fallback={<div className="py-20" />}>
            <FAQSection />
          </Suspense>
        </main>
        
        <Footer />
        <OngoingProjects />
      </div>
    </>
  );
};

export default Index;
