import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo et Copyright */}
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-bold text-xl">BoostAI</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2025 BoostAI Consulting – Créé pour les petites entreprises ambitieuses.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link 
              to="/solutions" 
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Offres
            </Link>
            <Link 
              to="/contact" 
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            <Link 
              to="/mentions-legales" 
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Mentions légales
            </Link>
          </motion.nav>
        </div>

        {/* Bottom Border */}
        <motion.div 
          className="mt-8 pt-8 border-t border-slate-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
            <p>
              Propulsé par React, TypeScript et Tailwind CSS
            </p>
            <p className="mt-2 sm:mt-0">
              Made with ❤️ pour les entrepreneurs
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
