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
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-xs md:max-w-4xl rounded-full shadow-2xl border border-cyan-900/40 bg-gradient-to-br from-[#232733] via-[#232a38] to-[#181c23] backdrop-blur-md px-4 md:px-12 py-4 md:py-4 flex items-center justify-between transition-all duration-300"
        style={{
          boxShadow: '0 4px 32px 0 rgba(0,255,255,0.08), 0 1.5px 8px 0 rgba(0,0,0,0.18)',
          border: '1.5px solid rgba(0,255,255,0.10)',
        }}
    >
        {/* Logo mobile (centré) */}
        <div className="flex-1 flex md:block justify-center md:justify-start">
          <NavLink to="/" className="flex items-center min-w-[120px] mx-auto md:hidden" onClick={closeMobileMenu}>
            <img src="/assets/logo-header-mobile.png" alt="BoostAI Consulting" className="h-7 w-auto" />
          </NavLink>
          {/* Logo desktop (à gauche) */}
          <NavLink to="/" className="hidden md:flex items-center min-w-[120px] md:mx-0" onClick={closeMobileMenu}>
            <img src="/assets/Logo2.png" alt="BoostAI Consulting" className="h-14 md:h-16 w-auto" />
        </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 mx-auto">
          <NavLink to="/" className={({ isActive }) => 
            `text-white text-lg font-medium px-2 py-1 transition-colors duration-200 rounded hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus:text-cyan-400 ${isActive ? 'text-cyan-400' : ''}`
          }>Home</NavLink>
          <NavLink to="/solutions" className={({ isActive }) => 
            `text-white text-lg font-medium px-2 py-1 transition-colors duration-200 rounded hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus:text-cyan-400 ${isActive ? 'text-cyan-400' : ''}`
          }>Solutions</NavLink>
          <NavLink to="/blog" className={({ isActive }) => 
            `text-white text-lg font-medium px-2 py-1 transition-colors duration-200 rounded hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus:text-cyan-400 ${isActive ? 'text-cyan-400' : ''}`
          }>Blog</NavLink>
            <NavLink to="/convert" className={({ isActive }) => 
            `text-white text-lg font-medium px-2 py-1 transition-colors duration-200 rounded hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus:text-cyan-400 ${isActive ? 'text-cyan-400' : ''} relative`
            }>
            Convert
            <span className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs px-2 py-0.5 rounded-full animate-pulse border border-cyan-200">New</span>
            </NavLink>
          <NavLink to="/about" className={({ isActive }) => 
            `text-white text-lg font-medium px-2 py-1 transition-colors duration-200 rounded hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus:text-cyan-400 ${isActive ? 'text-cyan-400' : ''}`
          }>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            `text-white text-lg font-medium px-2 py-1 transition-colors duration-200 rounded hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus:text-cyan-400 ${isActive ? 'text-cyan-400' : ''}`
          }>Contact</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <LanguageSwitcher />
          <button 
            onClick={toggleMobileMenu} 
            className="p-2 rounded-md text-white hover:bg-cyan-400/10 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 md:hidden overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-cyan-900/40">
            <span className="font-display text-lg font-medium text-white">Menu</span>
            <button 
              onClick={closeMobileMenu} 
              className="p-2 text-white hover:bg-cyan-400/10 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
      </div>

          <div className="p-6">
            <nav className="flex flex-col space-y-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `text-xl font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                onClick={closeMobileMenu}
              >
                Home
          </NavLink>
              <NavLink 
                to="/solutions" 
                className={({ isActive }) => `text-xl font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                onClick={closeMobileMenu}
              >
                Solutions
          </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => `text-xl font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                onClick={closeMobileMenu}
              >
                Blog
          </NavLink>
              <NavLink 
                to="/convert" 
                className={({ isActive }) => `text-xl font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} relative`}
                onClick={closeMobileMenu}
              >
                Convert
                <span className="ml-2 bg-cyan-400 text-black text-xs px-2 py-0.5 rounded-full animate-pulse border border-cyan-200">New</span>
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `text-xl font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `text-xl font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                onClick={closeMobileMenu}
              >
                Contact
          </NavLink>
            </nav>
          </div>
      </div>
      )}
    </>
  );
};

export default Header;
