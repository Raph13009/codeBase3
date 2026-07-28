import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LumioStyles from '@/components/layout/LumioStyles';
import BoostAIMark from '@/components/brand/BoostAIMark';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/Convert', label: 'Convertir' },
  { to: '/fr/agentic-commerce', label: 'Commerce Agentique' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const close = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggle = () => {
    setOpen((v) => {
      document.body.style.overflow = !v ? 'hidden' : 'auto';
      return !v;
    });
  };

  return (
    <>
      <LumioStyles />
      <header className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center px-4 w-full pointer-events-none">
        <div className="pointer-events-auto w-full md:w-auto max-w-[calc(100vw-2rem)] flex items-center justify-between md:justify-start md:gap-5 bg-black backdrop-blur-xl rounded-full px-2 py-2 shadow-xl border border-white/10 h-14">
          <div className="flex items-center gap-5 pl-1 md:pl-0">
            <BoostAIMark size={34} variant="onDark" to="/" />
            <nav className="hidden md:flex items-center gap-5">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[12px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap transition-colors duration-300 ${
                    pathname === l.to
                      ? 'text-[#FAF9F5]'
                      : 'text-[#FAF9F5]/80 hover:text-[#FAF9F5]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 pr-1">
            <Link
              to="/contact"
              onClick={close}
              className="hidden sm:flex md:ml-1 rounded-full hover:bg-[#FAF9F5] hover:text-black transition-all duration-300 items-center px-4 text-[10px] h-8 font-semibold uppercase tracking-wider bg-white/10 text-[#FAF9F5] whitespace-nowrap"
            >
              Nous contacter
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#FAF9F5]"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[#FAF9F5] pt-28 px-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={close}
                className="text-2xl font-semibold tracking-tight text-[#1B1B1B]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={close}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-black text-[#FAF9F5] px-6 h-12 text-sm font-semibold uppercase tracking-wider"
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
