import React from 'react';

const HeroSection: React.FC = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
      Your tech partner for smart tools and websites.
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
      OCR, dashboards, websites, landing pages, all tailored for you.
      </p>
      <a
        href="#contact"
        className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Let's talk
      </a>
        </div>
    </section>
  );

export default HeroSection;