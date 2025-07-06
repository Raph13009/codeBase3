import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => (
  <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
    <style>{`
      .animated-gradient-text {
        background: linear-gradient(270deg, #00d4ff, #0099cc, #00ffff, #00d4ff);
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
      
      .glow-effect {
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
      }
      
      .glow-effect:hover {
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
      }
    `}</style>
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="animated-gradient-text text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Your tech partner for smart tools and websites.
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
        OCR, dashboards, websites, landing pages, all tailored for you.
      </p>
      <Link
        to="/contact"
        className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 glow-effect transform hover:scale-105"
      >
        Let's talk
      </Link>
    </div>
  </section>
);

export default HeroSection;