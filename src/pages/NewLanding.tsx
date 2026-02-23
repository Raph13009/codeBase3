import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, Check, Search, Facebook, Twitter, Instagram, MapPin, Mail, Quote } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MetaTags from '@/components/seo/MetaTags';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { ScrollVelocity } from '@/components/ui/ScrollVelocity';
import TextType from '@/components/ui/TextType';
import BoostAIFlowingMenu from '@/components/home/BoostAIFlowingMenu';
import CinematicIntro from '@/components/ui/CinematicIntro';

const NewLanding: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Play intro on every page load
  useEffect(() => {
    // Check for environment flag to disable intro
    const disableIntro = import.meta.env.VITE_DISABLE_INTRO === 'true';
    
    if (disableIntro) {
      setIsLoading(false);
      return;
    }

    // Preload hero image
    const preloadImage = () => {
      const img = new Image();
      img.src = '/lp/LP-BC/img/portrait.png';
      
      // Preload in a link tag for better browser caching
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = '/lp/LP-BC/img/portrait.png';
      document.head.appendChild(link);
    };
    
    preloadImage();
    
    // Show intro on every page load
    setIsLoading(true);
  }, []);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };

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

  const services = [
    { img: '/lp/LP-BC/img/6-Brand-Identity.png', title: 'Développement Web', desc: 'Sites web rapides, optimisés SEO et pensés pour convertir et évoluer dans le temps' },
    { img: '/lp/LP-BC/img/1-Ui-Ux.png', title: 'Pack MVP', desc: 'Produits clés en main pour tester et valider rapidement votre idée sans sur-investir', special: true },
    { img: '/lp/LP-BC/img/5-Web-Design.png', title: 'Solutions IA', desc: 'Agents IA, automatisations et workflows intelligents pour gagner du temps, réduire les coûts et scaler plus intelligemment', special: true },
    { img: '/lp/LP-BC/img/4-Video-Marketing.png', title: 'Accompagnement', desc: 'De la conception à la mise en ligne, nous vous accompagnons comme un partenaire technique, à chaque étape' },
  ];

  const stats = [
    { img: '/lp/LP-BC/img/10-Project-Done.png', value: '10', label: 'Projets (2025)' },
    { img: '/lp/LP-BC/img/7-Happy-Costumer.png', value: '100', label: 'Clients Satisfaits' },
    { img: '/lp/LP-BC/img/8-Award-Winning.png', value: 'Rapide', label: 'Livraison' },
    { img: '/lp/LP-BC/img/9-Team-Crew.png', value: 'Adapté', label: 'Solutions' },
  ];

  const team = [
    { img: '/lp/LP-BC/img/T1.png', name: 'Raphaël', role: 'Lead Produit & Stratégie', description: 'Pilotage des projets, vision produit et avancée stratégique.', isHiring: false },
    { img: '/lp/LP-BC/img/T2.png', name: 'Sébastien', role: 'Développeur Full-Stack', description: 'Expert technique en renfort sur des projets complexes.', isHiring: false },
    { img: '/lp/LP-BC/img/T3.png', name: 'UI / UX Designer', role: 'Poste à pourvoir', description: 'Design centré utilisateur selon les besoins clients.', isHiring: true },
    { img: '/lp/LP-BC/img/T4.png', name: 'Développement Commercial', role: 'Poste à pourvoir', description: 'Relation client, partenariats et croissance des projets.', isHiring: true },
  ];


  const promoLogos = [
    '/lp/LP-BC/img/1-5.png', '/lp/LP-BC/img/1-2.png', '/lp/LP-BC/img/1-3.png',
    '/lp/LP-BC/img/1-1.png', '/lp/LP-BC/img/1-6.png',
  ];

  return (
    <>
      <MetaTags 
        title="BoostAI Consulting - Agence Web Sur-Mesure | Développement Web & Solutions IA"
        description="Agence web spécialisée dans le développement web sur-mesure, création de sites internet, MVP et solutions IA pour faire croître votre business."
        keywords="agence web, développement web sur-mesure, création site internet, MVP, solutions IA, automatisation, agence digitale"
      />
      <GoogleAnalytics />
      
      {/* Cinematic Intro - shows once per session on initial load */}
      {isLoading && (
        <CinematicIntro
          onComplete={handleIntroComplete}
        />
      )}

      {/* Main Content - Always mounted (no reflow), pointer-events disabled during intro */}
      <div style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
        <motion.div
          initial={{ opacity: isLoading ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isLoading ? 0 : 0.5 }}
          className="min-h-screen text-white"
          style={{ 
            background: 'radial-gradient(ellipse at top, #3D2F57 0%, #222054 50%, #0a0a0f 100%)'
          }}
        >
        {/* Navbar */}
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

        {/* Hero Section */}
        <header id="home" className="relative flex items-center py-5 min-h-screen pt-32 overflow-hidden">
          {/* Image Background - Desktop: unchanged */}
          <div 
            className="absolute top-0 right-0 h-full w-[730px] bg-cover bg-center bg-no-repeat z-0 opacity-80 hidden md:block"
            style={{ 
              backgroundImage: 'url(/lp/LP-BC/img/portrait.png)',
              backgroundAttachment: 'fixed',
              willChange: 'transform'
            }}
          ></div>
          {/* Image Background - Mobile: absolute position, scrolls with content, no zoom */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat z-0 opacity-80 md:hidden"
            style={{ 
              backgroundImage: 'url(/lp/LP-BC/img/portrait.png)',
              backgroundPosition: 'center right',
              backgroundSize: 'cover',
              backgroundAttachment: 'scroll'
            }}
          ></div>
          {/* Dark overlay - Mobile only */}
          <div className="absolute inset-0 z-[1] md:hidden" style={{ background: 'rgba(10, 10, 15, 0.3)' }}></div>
          {/* Gradient overlay - Desktop unchanged, mobile slightly enhanced */}
          <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(61, 47, 87, 0.4) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(34, 32, 84, 0.3) 0%, transparent 50%)' }}></div>
          
          <div className="container mx-auto px-3 md:px-4 lg:px-5 relative z-10">
            <div className="flex items-center justify-start md:items-center md:justify-start h-full mt-5 md:mt-5">
              <div className="max-w-xl md:max-w-lg lg:max-w-xl xl:max-w-2xl ml-0 md:ml-4 lg:ml-8 text-left w-full md:w-auto px-4 md:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="uppercase font-bold bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent text-sm md:text-lg tracking-[4px] mb-2 md:mb-4">STUDIO TECH & IA</h3>
                  <h2 className="font-bold text-3xl md:text-6xl lg:text-7xl leading-tight mb-4 md:mb-8 relative text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:drop-shadow-none h-[140px] md:h-[240px] flex flex-col justify-start">
                    <div className="flex-1">
                      <TextType
                        as="span"
                        text={["DES SOLUTIONS DIGITALES SUR-MESURE"]}
                        typingSpeed={75}
                        pauseDuration={2000}
                        showCursor={true}
                        cursorCharacter="|"
                        className="block text-3xl md:text-6xl lg:text-7xl"
                        textColors={['#ffffff']}
                      />
                    </div>
                    <span className="absolute bottom-[-15px] md:bottom-[-25px] left-0 w-[30%] md:w-[15%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
                  </h2>
                  <p className="text-white text-sm md:text-base mt-6 md:mt-16 mb-6 md:mb-16 leading-relaxed max-w-lg mx-0">
                    Développement sur-mesure & solutions intelligentes. Nous concevons des MVP, outils digitaux et solutions IA pour accélérer la croissance de votre business.
                  </p>
                  <NavLink to="/realisations" className="flex items-center justify-start md:justify-start mt-4 md:mt-12 hover:opacity-90 transition-opacity">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center me-3 md:me-4" style={{ background: 'radial-gradient(circle, #3D2F57 0%, #222054 100%)' }}>
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white border-b border-[#3D2F57]/50 font-bold text-xs md:text-sm">RÉALISATIONS</p>
                      <p className="text-[#3D2F57] text-[10px] md:text-xs mt-0">BoostAI Consulting</p>
                    </div>
                  </NavLink>
                </motion.div>
              </div>
            </div>
          </div>
        </header>

        {/* Scroll Velocity */}
        <div className="relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, rgba(34, 32, 84, 0.6) 0%, rgba(10, 10, 15, 0.95) 100%)' }}>
          <ScrollVelocity
            texts={[
              <>
                <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">+10 projets (2025)</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">100% satisfaits</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Livraison rapide</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Sur-mesure</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Code propre</span> <span className="text-[#3D2F57] mx-2">•</span>
                <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">+10 projets (2025)</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">100% satisfaits</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Livraison rapide</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Sur-mesure</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Code propre</span> <span className="text-[#3D2F57] mx-2">•</span>
              </>,
              <>
                <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Support premium</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">IA intégrée</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">SEO optimisé</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Sans stress</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Audit offert</span> <span className="text-[#3D2F57] mx-2">•</span>
                <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Support premium</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">IA intégrée</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">SEO optimisé</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Sans stress</span> <span className="text-[#3D2F57] mx-2">•</span> <span className="text-white hover:bg-gradient-to-r hover:from-[#3D2F57] hover:to-[#5a4a6f] hover:bg-clip-text hover:text-transparent transition-all duration-300">Audit offert</span> <span className="text-[#3D2F57] mx-2">•</span>
              </>
            ]} 
            velocity={100} 
            className="text-base md:text-xl"
            parallaxClassName="py-8"
            scrollerClassName="text-base md:text-xl"
            parallaxStyle={{ marginTop: '-20px', marginBottom: '-20px' }}
          />
        </div>

        {/* Services Section */}
        <section id="services" className="py-20 min-h-screen flex items-center relative" style={{ background: 'radial-gradient(ellipse at bottom, #222054 0%, #0a0a0f 70%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(61, 47, 87, 0.15) 0%, transparent 50%)' }}></div>
          <div className="container mx-auto px-5 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="uppercase font-bold bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent text-lg tracking-[4px] mb-2">NOS SERVICES</h3>
                <h4 className="font-bold text-5xl text-white mb-4 relative">
                  Ce que nous <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">Faisons</span>.
                  <span className="absolute bottom-[-15px] left-0 w-[15%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
                </h4>
                <p className="text-white/70 mb-4 max-w-[80%]">
                  Nous concevons des solutions digitales sur-mesure, des MVP performants et des outils IA concrets pour aider les entreprises à lancer, automatiser et scaler plus vite.
                </p>
                <p className="text-white/70 mb-6">
                  Chaque projet est pensé pour la performance réelle : rapidité, SEO, automatisation et expérience utilisateur, avec un objectif clair — des résultats mesurables.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-center p-4 flex flex-col items-center rounded-lg backdrop-blur-sm transition-all duration-400 ${
                      service.special 
                        ? 'bg-gradient-to-br from-[#3D2F57]/30 to-[#222054]/50 border border-[#3D2F57]/30' 
                        : 'bg-[#222054]/30 border border-[#3D2F57]/20'
                    } hover:bg-gradient-to-br hover:from-[#3D2F57]/40 hover:to-[#222054]/60 hover:border-[#3D2F57]/50 hover:scale-105`}
                  >
                    <img src={service.img} alt={service.title} className="max-w-[60px] mb-3" />
                    <h5 className="text-white font-bold text-sm mb-2">{service.title}</h5>
                    <p className="text-white/60 text-sm">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 text-white relative" style={{ background: 'radial-gradient(ellipse at top, #3D2F57 0%, #222054 50%, #0a0a0f 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(61, 47, 87, 0.2) 0%, transparent 60%)' }}></div>
          <div className="container mx-auto px-5 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-end">
                <img src="/lp/LP-BC/img/Untitled-1.png" alt="About us" className="img-fluid" />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-4">Visibilité & Performance</h3>
                <h4 className="text-5xl font-bold mb-4 relative">
                  Des outils qui donnent <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">de la clarté</span> sur votre activité.
                  <span className="absolute bottom-[-15px] left-0 w-[15%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
                </h4>
                <p className="text-white/70 mb-8 hidden md:block">
                  Nous construisons des dashboards clients, des portails de suivi et des outils internes qui vous donnent une vision claire en temps réel : projets, revenus, messages, performance. Tout ce dont vous avez besoin pour piloter votre activité.
                </p>
                <p className="text-white/70 mb-10 md:mb-8 md:hidden text-lg font-medium">
                  Vision claire en temps réel sur vos projets, revenus et performance.
                </p>
                <div className="flex flex-col md:flex-row gap-8 md:gap-8 mt-12 md:mt-10">
                  <div className="flex items-start">
                    <img 
                      src="/lp/LP-BC/img/Clean-Code.png" 
                      alt="Code Propre" 
                      className="w-12 me-3 flex-shrink-0" 
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(2000%) hue-rotate(240deg) brightness(0.9) contrast(1.1)'
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Performance Réelle</h3>
                      <p className="text-white/60 hidden md:block">Des outils rapides et fiables qui affichent vos données en temps réel.</p>
                      <p className="text-white/80 md:hidden font-medium">Temps réel</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <img 
                      src="/lp/LP-BC/img/Modern-Design.png" 
                      alt="Design Moderne" 
                      className="w-12 me-3 flex-shrink-0" 
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(2000%) hue-rotate(240deg) brightness(0.9) contrast(1.1)'
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Interface Cliente</h3>
                      <p className="text-white/60 hidden md:block">Dashboards et portails conçus pour la lisibilité et l'action immédiate.</p>
                      <p className="text-white/80 md:hidden font-medium">Action immédiate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section 
          className="py-20 text-white text-center relative"
          style={{
            background: `radial-gradient(ellipse at top left, rgba(61, 47, 87, 0.4) 0%, rgba(34, 32, 84, 0.6) 50%, rgba(10, 10, 15, 0.9) 100%), url(/lp/LP-BC/img/1.jpg) no-repeat right center`,
            backgroundSize: 'cover'
          }}
        >
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <img 
                    src={stat.img} 
                    alt={stat.label} 
                    className="w-[13vw] md:w-[4vw] mb-2 md:mb-2" 
                    style={{ 
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(2000%) hue-rotate(240deg) brightness(0.9) contrast(1.1)',
                      // Convert green to #3D2F57 color
                    }}
                  />
                  <h3 className="text-[8.5vw] md:text-[2.5vw] font-bold bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent mb-2">
                    {stat.value}{stat.value !== 'Rapide' && stat.value !== 'Sur-Mesure' && stat.value !== 'Adapté' && <span className="text-[5.5vw] md:text-[1.5vw] font-medium text-white">+</span>}
                  </h3>
                  <h4 className="text-[3.5vw] md:text-[1vw] font-medium text-white">{stat.label}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Section */}
        <section className="py-20 relative" style={{ background: 'radial-gradient(ellipse at center, #222054 0%, #0a0a0f 100%)' }}>
          <div className="container mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h3 className="uppercase font-bold text-lg mb-4">Derniers Projets</h3>
                <h4 className="text-5xl font-bold mb-4 relative">
                  Nos <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">Réalisations</span>.
                  <span className="absolute bottom-[-15px] left-0 w-[15%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
                </h4>
                <p className="text-white/70 mb-6">
                  Découvrez nos projets récents : sites web performants, MVP sur-mesure 
                  et solutions IA qui ont transformé le business de nos clients.
                </p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#3D2F57] me-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Sites web optimisés SEO et pensés pour la conversion.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#3D2F57] me-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white">MVP livrés rapidement pour tester et valider vos idées.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img src="/lp/LP-BC/img/G9.jpg" alt="Project" className="rounded hover:scale-105 transition-transform duration-400" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <img src="/lp/LP-BC/img/G5.png" alt="Project" className="rounded hover:scale-105 transition-transform duration-400" />
              <img src="/lp/LP-BC/img/G4.jpg" alt="Project" className="rounded hover:scale-105 transition-transform duration-400" />
              <img src="/lp/LP-BC/img/G1.jpg" alt="Project" className="rounded hover:scale-105 transition-transform duration-400" />
            </div>
          </div>
        </section>

        {/* Promote Section */}
        <section 
          className="py-20 flex justify-center items-center min-h-[230px] relative"
          style={{
            background: `radial-gradient(ellipse at top left, rgba(61, 47, 87, 0.4) 0%, rgba(34, 32, 84, 0.6) 50%, rgba(10, 10, 15, 0.9) 100%), url(/lp/LP-BC/img/side-view-portrait-of-a-woman-with-make-up.jpg) no-repeat center`,
            backgroundSize: 'cover'
          }}
        >
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-5 gap-3 justify-center">
              {promoLogos.map((logo, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={logo} 
                    alt="Promo" 
                    className="w-full max-w-[12.5vw] hover:opacity-100 transition-all duration-400" 
                    style={{ 
                      filter: 'brightness(1.1) saturate(0.4) sepia(0.8) hue-rotate(250deg) saturate(1.5) brightness(1)',
                      opacity: 0.9
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="choose-us" className="py-20 relative" style={{ background: 'radial-gradient(ellipse at top, #3D2F57 0%, #222054 50%, #0a0a0f 100%)' }}>
          <div className="container mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div>
                <h3 className="font-bold text-2xl mb-4">POURQUOI NOUS CHOISIR</h3>
                <h2 className="text-5xl font-bold mb-6">
                  Une expertise <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">Reconnue</span> pour développer votre business.
                </h2>
              </div>
              <div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Nous combinons expertise technique, livraison rapide et accompagnement 
                  personnalisé pour transformer vos idées en solutions digitales performantes.
                </p>
                <ul className="list-none space-y-3">
                  <li className="flex items-center text-white text-lg font-medium">
                    <Check className="w-5 h-5 text-[#3D2F57] me-2" />
                    100% Clients Satisfaits
                  </li>
                  <li className="flex items-center text-white text-lg font-medium">
                    <Check className="w-5 h-5 text-[#3D2F57] me-2" />
                    Livraison Rapide
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-12">
              <img 
                src="/lp/LP-BC/img/apelah.jpg" 
                alt="Choose Us" 
                className="rounded shadow-lg w-full object-cover" 
                style={{ 
                  filter: 'brightness(0.95) saturate(0.5) sepia(0.3) hue-rotate(250deg) saturate(1.2)',
                  maxHeight: '350px',
                  height: 'auto',
                  objectPosition: 'center'
                }}
              />
              <img 
                src="/lp/LP-BC/img/11.jpg" 
                alt="Choose Us" 
                className="rounded shadow-lg w-full object-cover" 
                style={{ 
                  filter: 'brightness(0.95) saturate(0.5) sepia(0.3) hue-rotate(250deg) saturate(1.2)',
                  maxHeight: '400px',
                  height: 'auto',
                  objectPosition: 'center'
                }}
              />
            </div>
            
            {/* Flowing Menu - Full Width */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div style={{ height: '400px', position: 'relative' }} className="bg-[#0F1115] overflow-hidden rounded-lg">
                <BoostAIFlowingMenu items={[
                  {
                    title: "Livraison rapide",
                    subtitle: "Vos projets livrés en jours.",
                    icon: "⚡",
                    image: "/images/livraison.png"
                  },
                  {
                    title: "Tarifs abordables",
                    subtitle: "Des prix adaptés aux petites entreprises.",
                    icon: "💰",
                    image: "/images/tarif.png"
                  },
                  {
                    title: "Design pro",
                    subtitle: "Des interfaces modernes.",
                    icon: "🎨",
                    image: "/images/design.png"
                  },
                  {
                    title: "IA intégrée",
                    subtitle: "Automatisations et IA incluses.",
                    icon: "🤖",
                    image: "/images/ia.png"
                  }
                ]} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section 
          id="team" 
          className="py-20 relative"
          style={{
            background: `url(/lp/LP-BC/img/Bg-1.jpg) no-repeat center center`,
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(61, 47, 87, 0.4)' }}></div>
          <div className="container mx-auto px-5 relative z-10">
            <div className="text-center mb-12">
              <h3 className="uppercase font-bold text-lg mb-4">Notre Équipe</h3>
              <h2 className="text-5xl font-bold mb-4 relative inline-block">
                Rencontrez notre <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">Équipe</span>.
                <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-[25%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
              </h2>
              <p className="text-white/70 max-w-xl mx-auto">
                Une équipe passionnée et expérimentée, dédiée à transformer vos idées 
                en solutions digitales innovantes et performantes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded flex flex-col md:flex-row gap-5 backdrop-blur-sm border border-[#3D2F57]/30" 
                  style={{ background: 'radial-gradient(circle at top left, rgba(61, 47, 87, 0.3) 0%, rgba(34, 32, 84, 0.2) 100%)' }}
                >
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="max-w-[250px] h-auto grayscale hover:grayscale-0 -translate-y-10 transition-all duration-400" 
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <h5 className={`text-lg mb-4 ${member.isHiring ? 'text-white/70' : 'bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent'}`}>{member.role}</h5>
                    <p className="text-white/60 mb-5">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section 
          id="testimonial"
          className="py-20 min-h-screen flex items-center justify-center relative"
          style={{
            background: 'radial-gradient(ellipse at center, #222054 0%, #0a0a0f 100%)'
          }}
        >
          {/* Image de fond détourée */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `url(/lp/LP-BC/img/adadad.png?t=${new Date().getTime()})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              opacity: 0.4
            }}
          ></div>
          <div className="container mx-auto px-5 relative z-10 -mt-32 md:-mt-40">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-bold text-2xl mb-4">TÉMOIGNAGES</h3>
                <h2 className="text-5xl font-bold mb-4 relative">
                  Ce que nos <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">Clients</span> Disent.
                  <span className="absolute bottom-[-15px] left-0 w-[15%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
                </h2>
                <p className="text-white/70 mb-6">
                  Nos clients témoignent de la qualité de nos services, de notre 
                  réactivité et de l'impact positif de nos solutions sur leur business.
                </p>
              </div>
              <div className="p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-400 backdrop-blur-sm border border-[#3D2F57]/30" style={{ background: 'radial-gradient(circle at top right, rgba(61, 47, 87, 0.4) 0%, rgba(34, 32, 84, 0.3) 100%)' }}>
                <p className="text-white font-medium leading-relaxed mb-4">
                  "BoostAI a su comprendre notre besoin très rapidement et livrer une solution propre, efficace et parfaitement fonctionnelle. Le projet a été mené avec sérieux, réactivité et un vrai sens du détail. Une collaboration fluide du début à la fin."
                </p>
                <div className="flex items-center">
                  <img src="/lp/LP-BC/img/camille.png" alt="Camille" className="w-[70px] h-[70px] rounded-full me-3 object-cover" />
                  <div>
                    <h5 className="text-white mb-1">Camille</h5>
                    <small className="font-bold bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">ENTREPRENEUR</small>
                  </div>
                  <div className="ms-auto">
                    <Quote className="w-12 h-12 text-[#3D2F57]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-20 relative"
          style={{
            background: '#0b0b0b'
          }}
        >
          {/* Image de fond avec filtre violet */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/lp/LP-BC/img/contact-us-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.7) saturate(0.4) sepia(0.4) hue-rotate(250deg) saturate(1.2)',
              opacity: 0.6
            }}
          ></div>
          <div className="relative z-10">
            <div className="container mx-auto px-5">
              <div className="grid md:grid-cols-2 gap-12">
              <form 
                action="https://formsubmit.co/raphael@boostaiconsulting.com" 
                method="POST"
                className="p-3 border-2 flex flex-col rounded-lg backdrop-blur-sm" 
                style={{ borderColor: '#3D2F57', background: 'radial-gradient(circle at top left, rgba(61, 47, 87, 0.3) 0%, rgba(34, 32, 84, 0.2) 100%)' }}
              >
                <input type="hidden" name="_subject" value="Nouveau message depuis le site BoostAI Consulting" />
                <input type="hidden" name="_captcha" value="false" />
                <label htmlFor="name" className="text-[#3D2F57] font-medium text-base mb-2">Votre Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-[#222054]/50 border border-[#3D2F57] p-4 text-[#3D2F57] font-medium my-2 focus:bg-transparent focus:text-white transition-all rounded"
                  required
                />
                <label htmlFor="email" className="text-[#3D2F57] font-medium text-base mb-2">Votre Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-[#222054]/50 border border-[#3D2F57] p-4 text-[#3D2F57] font-medium my-2 focus:bg-transparent focus:text-white transition-all rounded"
                  required
                />
                <label htmlFor="message" className="text-[#3D2F57] font-medium text-base mb-2">Votre Message (optionnel)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="bg-[#222054]/50 border border-[#3D2F57] p-4 text-[#3D2F57] font-medium my-2 resize-none focus:bg-transparent focus:text-white transition-all rounded"
                ></textarea>
                <button type="submit" className="px-6 py-4 text-white border-2 transition-all duration-400 w-full mt-4 rounded-lg relative overflow-hidden group" style={{ background: 'radial-gradient(circle, #3D2F57 0%, #222054 100%)', borderColor: '#3D2F57' }}>
                  <span className="relative z-10">Envoyer le Message</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3D2F57] to-[#222054] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>

              <div className="p-4">
                <h3 className="font-bold text-2xl mb-4">CONTACT</h3>
                <h2 className="text-5xl font-bold mb-4 relative">
                  Restons en <span className="bg-gradient-to-r from-[#3D2F57] to-[#5a4a6f] bg-clip-text text-transparent">Contact</span>.
                  <span className="absolute bottom-[-25px] left-0 w-[30%] h-[3px] bg-gradient-to-r from-[#3D2F57] to-[#222054] rounded-full"></span>
                </h2>
                <p className="text-white/70 mb-8">
                  Discutons de votre projet et découvrons comment nous pouvons 
                  transformer vos idées en solutions digitales performantes.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-9 h-9 text-[#3D2F57] me-3 flex-shrink-0" />
                    <div>
                      <h5 className="text-white text-xl mb-0">Adresse</h5>
                      <p className="text-[#3D2F57] text-sm">Paris, France</p>
                      <p className="text-[#3D2F57] text-sm">London, UK</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-9 h-9 text-[#3D2F57] me-3 flex-shrink-0" />
                    <div>
                      <h5 className="text-white text-xl mb-0">Email</h5>
                      <p className="text-[#3D2F57] text-sm">contact@boostaiconsulting.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 relative" style={{ background: 'radial-gradient(ellipse at top, #222054 0%, #0a0a0f 100%)' }}>
          <div className="container mx-auto px-5 text-center">
            <div className="mb-6">
              <h1 className="mb-0 font-bold text-4xl md:text-5xl text-center" style={{ fontFamily: "'Darker Grotesque', sans-serif", color: '#ffffff' }}>
                BoostAI Consulting<span className="ml-3 md:ml-4" style={{ color: '#5a4a6f', textShadow: '0 0 15px rgba(90, 74, 111, 1), 0 0 30px rgba(90, 74, 111, 0.8), 0 0 45px rgba(90, 74, 111, 0.6)', filter: 'drop-shadow(0 0 8px rgba(90, 74, 111, 0.9))' }}>.</span>
              </h1>
            </div>
            <ul className="flex flex-wrap justify-center gap-6 mb-6">
              <li><NavLink to="/" className="hover:text-[#3D2F57] transition-colors">Accueil</NavLink></li>
              <li><NavLink to="/realisations" className="hover:text-[#3D2F57] transition-colors">Réalisations</NavLink></li>
              <li><NavLink to="/Convert" className="hover:text-[#3D2F57] transition-colors">Convertir</NavLink></li>
              <li><NavLink to="/guide" className="hover:text-[#3D2F57] transition-colors">Tuto gratuit</NavLink></li>
              <li><NavLink to="/about" className="hover:text-[#3D2F57] transition-colors">À propos</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-[#3D2F57] transition-colors">Blog</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-[#3D2F57] transition-colors">Contact</NavLink></li>
            </ul>
            <p className="text-white/60 mb-6">
              Agence digitale spécialisée dans le développement web sur-mesure, 
              création de sites internet, MVP et solutions IA pour faire croître votre business.
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <a href="https://www.linkedin.com/company/boostaiconsulting" target="_blank" rel="noopener noreferrer" className="text-[#3D2F57] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <div className="text-white/60">
              <p>Copyright © 2026 BoostAI Consulting. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
        </motion.div>
      </div>
    </>
  );
};

export default NewLanding;

