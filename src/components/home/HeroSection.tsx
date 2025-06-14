import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
    <style>{`
      .animated-gradient-text {
        background: linear-gradient(270deg, #2563eb, #6366f1, #0ea5e9, #2563eb);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        animation: gradientMove 5s ease-in-out infinite;
      }
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="animated-gradient-text text-5xl md:text-6xl font-bold mb-6">
        Your tech partner for smart tools and websites.
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
        OCR, dashboards, websites, landing pages, all tailored for you.
      </p>
      <Link
        to="/contact"
        className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Let's talk
      </Link>
    </div>
  </section>
);

export default HeroSection;