import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Phone, Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const [showMentionsLegales, setShowMentionsLegales] = useState(false);

  // Empêcher le scroll du body quand la modal est ouverte
  React.useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (showMentionsLegales) {
      // Bloquer le scroll avec event listener
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Home' || e.key === 'End') {
          e.preventDefault();
        }
      });
    } else {
      // Retirer les event listeners
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [showMentionsLegales]);

  const mentionsLegalesContent = `
    <h2 style="color: white; font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem;">Mentions Légales</h2>
    
    <div style="color: #cbd5e1; margin-top: 1.5rem;">
      <section style="margin-bottom: 1.5rem;">
        <h3 style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Éditeur</h3>
        <p style="color: #cbd5e1;">BoostAI Consulting<br />
        Créé pour les petites entreprises ambitieuses<br />
        Contact : contact@boostai.fr</p>
      </section>

      <section style="margin-bottom: 1.5rem;">
        <h3 style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Hébergement</h3>
        <p style="color: #cbd5e1;">Ce site est hébergé par Vercel Inc.<br />
        340 S Lemon Ave #4133<br />
        Walnut, CA 91789<br />
        États-Unis</p>
      </section>

      <section style="margin-bottom: 1.5rem;">
        <h3 style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Propriété Intellectuelle</h3>
        <p style="color: #cbd5e1;">L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
      </section>

      <section style="margin-bottom: 1.5rem;">
        <h3 style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Protection des Données</h3>
        <p style="color: #cbd5e1;">Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.</p>
      </section>

      <section style="margin-bottom: 1.5rem;">
        <h3 style="color: white; font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Cookies</h3>
        <p style="color: #cbd5e1;">Ce site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
      </section>
    </div>
  `;

  return (
    <>
      <footer className="bg-gradient-to-br from-[#0B0E1A] to-[#121826] border-t border-transparent relative">
        {/* Top Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content - 3 Columns */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Left Column - Logo & Tagline */}
            <div className="text-center md:text-left">
              <motion.div 
                className="flex items-center justify-center md:justify-start gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img 
                    src="/images/logo-white-long.png" 
                    alt="BoostAI Consulting" 
                    className="h-8 w-auto transition-transform duration-300 hover:scale-110 drop-shadow-lg"
                  />
                </div>
              </motion.div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Votre partenaire digital pour transformer vos idées en solutions innovantes
              </p>
            </div>

            {/* Center Column - Navigation */}
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <nav className="flex flex-col space-y-3">
                {[
                  { to: '/', label: 'Accueil' },
                  { to: '/contact', label: 'Contact' },
                  { 
                    label: 'Mentions légales', 
                    onClick: () => setShowMentionsLegales(true),
                    isButton: true 
                  }
                ].map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link.isButton ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          link.onClick();
                        }}
                        className="text-slate-300 hover:text-white transition-all duration-300 font-medium relative group"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                      </button>
                    ) : (
                      <Link 
                        to={link.to!}
                        className="text-slate-300 hover:text-white transition-all duration-300 font-medium relative group"
                        onClick={link.to === '/' ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right Column - Contact & Tech Stack */}
            <div className="text-center md:text-right">
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <div className="space-y-3 text-slate-400 text-sm">
                  <motion.a 
                    href="tel:+33602617329"
                    className="flex items-center justify-center md:justify-end gap-2 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="h-4 w-4" />
                    <span>+33 6 02 61 73 29</span>
                  </motion.a>
                  
                  <motion.a 
                    href="mailto:contact@boostaiconsulting.com"
                    className="flex items-center justify-center md:justify-end gap-2 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="h-4 w-4" />
                    <span>contact@boostaiconsulting.com</span>
                  </motion.a>
                  
                  <motion.a 
                    href="https://www.linkedin.com/company/boostai-consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-end gap-2 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <p className="text-slate-400 text-sm mb-2">
                  Propulsé par React, TypeScript et Tailwind CSS
                </p>
                <motion.div 
                  className="flex items-center justify-center md:justify-end gap-2 text-slate-400 text-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </motion.div>
                  <span>pour les entrepreneurs</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="text-center pt-8 border-t border-slate-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-500 text-sm">
              © 2025 BoostAI Consulting – Créé pour les petites entreprises ambitieuses.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Mentions Légales Modal */}
      <AnimatePresence>
        {showMentionsLegales && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMentionsLegales(false)}

          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src="/images/logo-white-long.png" alt="BoostAI Logo" className="h-6 w-auto" />
                </div>
                <button
                  onClick={() => setShowMentionsLegales(false)}
                  className="text-slate-400 hover:text-white transition-colors duration-200 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                <div 
                  className="prose prose-invert max-w-none text-white"
                  dangerouslySetInnerHTML={{ __html: mentionsLegalesContent }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
