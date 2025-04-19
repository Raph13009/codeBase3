import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatSection from '@/components/home/StatSection';
import SolutionsPreview from '@/components/home/SolutionsPreview';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import FAQ from '@/components/home/FAQ';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaTags from '@/components/seo/MetaTags';

const Index: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Set document language
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags />
      <GoogleAnalytics />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatSection />
        <SolutionsPreview />
        <Testimonials />
        <BlogSection />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
