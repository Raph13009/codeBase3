import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 relative" style={{ background: 'radial-gradient(ellipse at top, #222054 0%, #0a0a0f 100%)' }}>
      <div className="container mx-auto px-5 text-center">
        <div className="mb-6">
          <h1 className="mb-0 font-bold text-4xl md:text-5xl text-center" style={{ fontFamily: "'Darker Grotesque', sans-serif", color: '#ffffff' }}>
            BoostAI Consulting<span className="ml-3 md:ml-4" style={{ color: '#5a4a6f', textShadow: '0 0 15px rgba(90, 74, 111, 1), 0 0 30px rgba(90, 74, 111, 0.8), 0 0 45px rgba(90, 74, 111, 0.6)', filter: 'drop-shadow(0 0 8px rgba(90, 74, 111, 0.9))' }}>.</span>
          </h1>
        </div>
        <ul className="flex flex-wrap justify-center gap-6 mb-6 text-white/90">
          <li><NavLink to="/" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">Accueil</NavLink></li>
          <li><NavLink to="/realisations" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">Réalisations</NavLink></li>
          <li><NavLink to="/Convert" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">Convertir</NavLink></li>
          <li><NavLink to="/guide" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">Tuto gratuit</NavLink></li>
          <li><NavLink to="/about" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">À propos</NavLink></li>
          <li><NavLink to="/blog" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">Blog</NavLink></li>
          <li><NavLink to="/contact" className="font-medium text-white/90 hover:text-[#d7c6ff] transition-colors">Contact</NavLink></li>
        </ul>
        <p className="text-white/60 mb-6">
          Agence digitale spécialisée dans le développement web sur-mesure, 
          création de sites internet, MVP et solutions IA pour faire croître votre business.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://www.linkedin.com/company/boostaiconsulting" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn BoostAI Consulting" className="text-white/85 hover:text-[#d7c6ff] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <div className="text-white/60">
          <p>Copyright © 2026 BoostAI Consulting. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
