
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-background/80 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink to="/" className="flex items-center" onClick={closeMobileMenu}>
          <span className="font-display text-xl font-bold tracking-tight">BoostAI Consulting</span>
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
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-background md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', paddingTop: '5rem' }}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
          <NavLink to="/" className="nav-link text-xl" onClick={closeMobileMenu}>
            {t('home')}
          </NavLink>
          <NavLink to="/solutions" className="nav-link text-xl" onClick={closeMobileMenu}>
            {t('solutions')}
          </NavLink>
          <NavLink to="/blog" className="nav-link text-xl" onClick={closeMobileMenu}>
            {t('blog')}
          </NavLink>
          <NavLink to="/contact" className="nav-link text-xl" onClick={closeMobileMenu}>
            {t('contact')}
          </NavLink>
          
          <div className="pt-4 mt-4 border-t border-border">
            <NavLink 
              to="/contact" 
              className="button-primary w-full justify-center"
              onClick={closeMobileMenu}
            >
              {t('contactUs')}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
