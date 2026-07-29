import React from 'react';
import { Link } from 'react-router-dom';
import BoostAIMark from '@/components/brand/BoostAIMark';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-32 pb-16 px-10 rounded-t-[64px] relative z-20 mt-20">
      <div className="max-w-[1728px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          <div className="flex flex-col gap-8">
            <BoostAIMark size={40} variant="onDark" to="/" />
            <p className="text-[15px] leading-relaxed text-white/50 max-w-xs font-[Helvetica,Arial,sans-serif]">
              Studio tech &amp; IA pour PME et startups. Sites, MVP et agents livrés vite, pensés pour convertir.
            </p>
            <a
              href="https://www.linkedin.com/company/106565801/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn BoostAI Consulting"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-[10px] font-semibold">Services</h4>
            <ul className="flex flex-col gap-4 text-[15px]">
              <li><span className="text-white/60">Développement Web</span></li>
              <li><span className="text-white/60">Solutions IA</span></li>
              <li><span className="text-white/60">Pack MVP</span></li>
              <li><span className="text-white/60">Accompagnement</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-[10px] font-semibold">Entreprise</h4>
            <ul className="flex flex-col gap-4 text-[15px]">
              <li><Link to="/about" className="text-white/60 hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/realisations" className="text-white/60 hover:text-white transition-colors">Réalisations</Link></li>
              <li><Link to="/Convert" className="text-white/60 hover:text-white transition-colors">Convertir</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-[10px] font-semibold">Ressources</h4>
            <ul className="flex flex-col gap-4 text-[15px]">
              <li><Link to="/ocr-terms" className="text-white/60 hover:text-white transition-colors">Conditions OCR</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40">© 2026 BoostAI Consulting. Tous droits réservés.</p>
          <div className="flex gap-8">
            <Link to="/ocr-terms" className="text-[11px] text-white/40 hover:text-white transition-colors">Confidentialité</Link>
            <span className="text-[11px] text-white/40">Mentions légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
