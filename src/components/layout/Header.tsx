import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Header: React.FC = () => {
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#151515]/95 shadow-lg' : 'bg-[#151515]'
    }`}>
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="text-center">
            <h1 className="mb-0 font-bold text-4xl md:text-5xl" style={{ fontFamily: "'Darker Grotesque', sans-serif", color: '#ffffff' }}>
              BoostAI Consulting<span className="ml-3 md:ml-4" style={{ color: '#5a4a6f', textShadow: '0 0 15px rgba(90, 74, 111, 1), 0 0 30px rgba(90, 74, 111, 0.8), 0 0 45px rgba(90, 74, 111, 0.6)', filter: 'drop-shadow(0 0 8px rgba(90, 74, 111, 0.9))' }}>.</span>
            </h1>
          </NavLink>
          
          <div className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className="font-bold text-white hover:text-[#3D2F57] transition-colors">Accueil</NavLink>
            <NavLink to="/realisations" className="font-bold text-white hover:text-[#3D2F57] transition-colors">Réalisations</NavLink>
            <NavLink to="/Convert" className="font-bold text-white hover:text-[#3D2F57] transition-colors">Convertir</NavLink>
            <NavLink to="/guide" className="font-bold text-white hover:text-[#3D2F57] transition-colors">Tuto gratuit</NavLink>
            <NavLink to="/about" className="font-bold text-white hover:text-[#3D2F57] transition-colors">À propos</NavLink>
            <NavLink to="/blog" className="font-bold text-white hover:text-[#3D2F57] transition-colors">Blog</NavLink>
            <NavLink to="/contact" className="font-bold text-white hover:text-[#3D2F57] transition-colors">Contact</NavLink>
            <NavLink to="#" className="text-[#3D2F57] hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </NavLink>
          </div>

          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden text-[#3D2F57] text-2xl"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 pt-20" style={{ background: 'radial-gradient(circle at center, #3D2F57 0%, #222054 100%)' }}>
          <div className="flex flex-col gap-4 px-5">
            <NavLink to="/" className="text-white text-lg py-2" onClick={toggleMobileMenu}>Accueil</NavLink>
            <NavLink to="/realisations" className="text-white text-lg py-2" onClick={toggleMobileMenu}>Réalisations</NavLink>
            <NavLink to="/Convert" className="text-white text-lg py-2" onClick={toggleMobileMenu}>Convertir</NavLink>
            <NavLink to="/guide" className="text-white text-lg py-2" onClick={toggleMobileMenu}>Tuto gratuit</NavLink>
            <NavLink to="/about" className="text-white text-lg py-2" onClick={toggleMobileMenu}>À propos</NavLink>
            <NavLink to="/blog" className="text-white text-lg py-2" onClick={toggleMobileMenu}>Blog</NavLink>
            <NavLink to="/contact" className="text-white text-lg py-2" onClick={toggleMobileMenu}>Contact</NavLink>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-[#3D2F57] p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
