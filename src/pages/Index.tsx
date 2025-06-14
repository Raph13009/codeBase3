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

const FAQSection: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Everything you need to know about our services
      </p>
      
      <div className="space-y-6">
        <details className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-gray-800">
            <span className="text-lg">What kind of tools do you build?</span>
            <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-600 leading-relaxed">
            We build lean and custom digital tools — from OCR extractors to dashboards, internal automations, and landing pages.
          </p>
        </details>

        <details className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-gray-800">
            <span className="text-lg">How long does it take to deliver a project?</span>
            <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Most projects are delivered in 1 to 2 weeks. It depends on the complexity — we'll always give you a clear timeline upfront.
          </p>
        </details>

        <details className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-gray-800">
            <span className="text-lg">Do I need any technical knowledge?</span>
            <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Not at all. We guide you through every step. You explain what you need, we handle the tech.
          </p>
        </details>

        <details className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-gray-800">
            <span className="text-lg">Can I request changes or updates after delivery?</span>
            <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Yes. We offer ongoing support and can adapt or improve your tools anytime.
          </p>
        </details>

        <details className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <summary className="font-semibold cursor-pointer flex items-center justify-between text-gray-800">
            <span className="text-lg">Do you use AI in your solutions?</span>
            <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Yes — we integrate AI when it's useful to save you time or automate tasks (OCR, content, chatbots, etc.).
          </p>
        </details>
      </div>
    </div>
  </section>
);

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags />
      <GoogleAnalytics />
      <Header />
      <main className="flex-grow">
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
