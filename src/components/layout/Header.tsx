import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import PillNav from '@/components/PillNav';
import StaggeredMenu from '@/components/layout/StaggeredMenu';

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
          
          <PillNav />

          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden text-[#3D2F57] text-2xl"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <StaggeredMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </nav>
  );
};

export default Header;
