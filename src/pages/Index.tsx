import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HowWeHelp from '../components/home/HowWeHelp';
import SuccessStories from '../components/home/SuccessStories';
import SolutionsPreview from '../components/home/SolutionsPreview';
import BlogSection from '../components/home/BlogSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaTags from '@/components/seo/MetaTags';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const FAQSection: React.FC = () => (
  <section className="py-20 relative z-10">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">Frequently Asked Questions</h2>
      <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
        Everything you need to know about our services
      </p>
      
      <div className="space-y-6">
        <details className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-white hover:text-cyan-400 transition-colors">
            <span className="text-lg">What kind of tools do you build?</span>
            <span className="text-cyan-400 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-300 leading-relaxed">
            We build lean and custom digital tools — from OCR extractors to dashboards, internal automations, and landing pages.
          </p>
        </details>

        <details className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-white hover:text-cyan-400 transition-colors">
            <span className="text-lg">How long does it take to deliver a project?</span>
            <span className="text-cyan-400 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Most projects are delivered in 1 to 2 weeks. It depends on the complexity — we'll always give you a clear timeline upfront.
          </p>
        </details>

        <details className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-white hover:text-cyan-400 transition-colors">
            <span className="text-lg">Do I need any technical knowledge?</span>
            <span className="text-cyan-400 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Not at all. We guide you through every step. You explain what you need, we handle the tech.
          </p>
        </details>

        <details className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-white hover:text-cyan-400 transition-colors">
            <span className="text-lg">Can I request changes or updates after delivery?</span>
            <span className="text-cyan-400 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Yes. We offer ongoing support and can adapt or improve your tools anytime.
          </p>
        </details>

        <details className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-white hover:text-cyan-400 transition-colors">
            <span className="text-lg">Do you use AI in your solutions?</span>
            <span className="text-cyan-400 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Yes — we integrate AI when it's useful to save you time or automate tasks (OCR, content, chatbots, etc.).
          </p>
        </details>
      </div>
    </div>
  </section>
);

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      <MetaTags />
      <GoogleAnalytics />
      <AnimatedBackground />
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <HowWeHelp />
        <SuccessStories />
        <SolutionsPreview />
        <BlogSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
