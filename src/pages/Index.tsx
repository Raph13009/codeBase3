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

const Index: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Update document metadata for SEO
    document.title = t('heroTitle') + ' | AI Agency';
    
    // You would typically dynamically update meta tags here
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('heroSubtitle'));
    }
    
    // Set document language
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language]);
  
  return (
    <div className="flex flex-col min-h-screen">
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
