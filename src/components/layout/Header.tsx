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
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
            ? 'py-3 bg-background shadow-lg backdrop-blur-md' 
            : 'py-4 bg-white/90 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink to="/" className="flex items-center" onClick={closeMobileMenu}>
            <img src="/assets/Logo.png" alt="BoostAI Consulting" className="h-16" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => 
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }>
            {t('home')}
          </NavLink>
          <NavLink to="/solutions" className={({ isActive }) => 
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }>
            {t('solutions')}
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => 
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }>
            {t('blog')}
          </NavLink>
            <NavLink to="/convert" className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : ''} relative`
            }>
              {t('convert')}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                New
              </span>
            </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }>
            {t('contact')}
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <NavLink to="/contact" className="button-primary">
            {t('contactUs')}
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <LanguageSwitcher />
          <button 
            onClick={toggleMobileMenu} 
            className="p-2 rounded-md text-foreground"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
              <Menu className="w-6 h-6" />
          </button>
        </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <span className="font-display text-lg font-medium">{t('menu')}</span>
            <button 
              onClick={closeMobileMenu} 
              className="p-2 text-foreground hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
      </div>

          <div className="p-6">
            <nav className="flex flex-col space-y-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `text-xl font-medium ${isActive ? 'text-primary' : 'text-foreground'}`} 
                onClick={closeMobileMenu}
              >
            {t('home')}
          </NavLink>
              <NavLink 
                to="/solutions" 
                className={({ isActive }) => `text-xl font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}
                onClick={closeMobileMenu}
              >
            {t('solutions')}
          </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => `text-xl font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}
                onClick={closeMobileMenu}
              >
            {t('blog')}
          </NavLink>
              <NavLink 
                to="/convert" 
                className={({ isActive }) => `text-xl font-medium ${isActive ? 'text-primary' : 'text-foreground'} relative`}
                onClick={closeMobileMenu}
              >
                {t('convert')}
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                  New
                </span>
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `text-xl font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}
                onClick={closeMobileMenu}
              >
            {t('contact')}
          </NavLink>
            </nav>
          
            <div className="mt-8 pt-6 border-t border-gray-200">
            <NavLink 
              to="/contact" 
                className="flex items-center justify-center w-full py-3 px-4 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors"
              onClick={closeMobileMenu}
            >
              {t('contactUs')}
            </NavLink>
          </div>
          </div>
      </div>
      )}
    </>
  );
};

export default Header;
