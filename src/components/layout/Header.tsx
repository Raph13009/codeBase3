import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    document.body.style.width = '';
  };

  return (
    <>
      {/* Minimalist Header */}
    <header 
        className={`fixed top-0 left-0 right-0 z-50 h-12 md:h-14 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'bg-black/60 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* Logo - Minimalist */}
          <NavLink 
            to="/" 
            className="flex items-center" 
            onClick={closeMobileMenu}
          >
            <img src="/images/favicon.png" alt="BoostAI Consulting" className="w-8 h-8 md:w-9 md:h-9" />
          </NavLink>

          {/* Desktop Navigation - Minimalist */}
          <nav className="hidden md:flex items-center space-x-12">
            {[
              { to: '/', label: 'Accueil' },
              { to: '/blog', label: 'Blog' },
              { to: '/convert', label: 'Convert', isNew: true },
              { to: '/about', label: 'À propos' },
              { to: '/contact', label: 'Contact' }
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  relative text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                  }
                  hover:scale-105
                `}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                                    {link.isNew && (
                  <span className="absolute -top-3 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
                    {/* Active underline */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    )}
                    {/* Hover underline */}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                  </>
                )}
            </NavLink>
            ))}
        </nav>

          {/* Right side - Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-3">
          <LanguageSwitcher />

            {/* Mobile Menu Button - Minimalist */}
          <button 
            onClick={toggleMobileMenu} 
              className="md:hidden p-1.5 text-gray-300 hover:text-white transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
              <Menu className="w-5 h-5" />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Minimalist Full Screen */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div className="flex items-center">
                <img src="/images/favicon.png" alt="BoostAI Consulting" className="w-8 h-8" />
              </div>
            <button 
              onClick={closeMobileMenu} 
                className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Close menu"
            >
                <X className="w-5 h-5" />
            </button>
      </div>

            {/* Navigation Links */}
            <div className="flex-1 flex items-center justify-center">
              <nav className="flex flex-col items-center space-y-8">
                                 {[
                   { to: '/', label: 'Accueil' },
                   { to: '/blog', label: 'Blog' },
                   { to: '/convert', label: 'Convert', isNew: true },
                   { to: '/about', label: 'À propos' },
                   { to: '/contact', label: 'Contact' }
                 ].map((link) => (
              <NavLink 
                     key={link.to}
                     to={link.to}
                     className={({ isActive }) => `
                       relative text-xl font-medium transition-all duration-200
                       ${isActive 
                         ? 'text-white' 
                         : 'text-gray-300 hover:text-white'
                       }
                       hover:scale-105
                     `}
                onClick={closeMobileMenu}
              >
                     {({ isActive }) => (
                       <>
                         <div className="flex items-center space-x-3">
                           <span>{link.label}</span>
                           {link.isNew && (
                             <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                               New
                             </span>
                           )}
                         </div>
                         {/* Active underline */}
                         {isActive && (
                           <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                         )}
                       </>
                     )}
          </NavLink>
                 ))}
            </nav>
            </div>
          </div>
      </div>
      )}
    </>
  );
};

export default Header;
