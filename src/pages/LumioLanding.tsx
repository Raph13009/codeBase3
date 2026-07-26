import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/seo/MetaTags';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BoostAIMark from '@/components/brand/BoostAIMark';

const LumioLanding: React.FC = () => {
  useEffect(() => {
    const id = 'material-symbols-lumio';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
      document.head.appendChild(link);
    }
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#FAF9F5';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <>
      <MetaTags
        title="BoostAI Consulting - Agence Web Sur-Mesure | Développement Web & Solutions IA"
        description="Agence web spécialisée dans le développement web sur-mesure, MVP et solutions IA."
        keywords="agence web, développement web, MVP, solutions IA"
      />
      <GoogleAnalytics />
      <style dangerouslySetInnerHTML={{ __html: `
:root {
  --lumio-page-bg: #FAF9F5;
  --lumio-panel-bg: #F0EFEB;
  --lumio-soft-card: #E9E8E4;
  --lumio-soft-card-2: #F4F3EF;
  --lumio-text: #1B1B1B;
  --lumio-muted: #8C8880;
  --lumio-line: #D9D7D0;
  --lumio-white-card: #FFFDF8;
}
.lumio-root {
  background-color: var(--lumio-page-bg);
  color: var(--lumio-text);
  font-family: Helvetica, Arial, sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.lumio-root .bg-page-bg { background-color: var(--lumio-page-bg); }
.lumio-root .bg-panel-bg { background-color: var(--lumio-panel-bg); }
.lumio-root .bg-soft-card { background-color: var(--lumio-soft-card); }
.lumio-root .bg-soft-card-2 { background-color: var(--lumio-soft-card-2); }
.lumio-root .bg-white-card { background-color: var(--lumio-white-card); }
.lumio-root .text-text { color: var(--lumio-text); }
.lumio-root .text-muted { color: var(--lumio-muted); }
.lumio-root .text-page-bg { color: var(--lumio-page-bg); }
.lumio-root .text-page-bg\\/80 { color: rgba(250, 249, 245, 0.8); }
.lumio-root a.text-page-bg\\/80:hover { color: #FAF9F5; }
.lumio-root .border-line { border-color: var(--lumio-line); }
.lumio-root .border-line\\/30 { border-color: rgba(217, 215, 208, 0.3); }
.lumio-root .border-line\\/20 { border-color: rgba(217, 215, 208, 0.2); }
.lumio-root .from-soft-card-2 { --tw-gradient-from: var(--lumio-soft-card-2); --tw-gradient-to: rgb(244 243 239 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.lumio-root .to-soft-card { --tw-gradient-to: var(--lumio-soft-card); }
.lumio-root .font-display, .lumio-root .font-h1, .lumio-root .font-h2, .lumio-root .font-h3,
.lumio-root .font-label, .lumio-root .font-body-lg, .lumio-root .font-body-md {
  font-family: Helvetica, Arial, sans-serif;
}
.lumio-root .text-display { font-size: clamp(42px, 6vw, 82px); line-height: 1.05; letter-spacing: -0.04em; font-weight: 700; }
.lumio-root .text-h1 { font-size: 48px; line-height: 1.1; letter-spacing: -0.03em; font-weight: 700; }
.lumio-root .text-h2 { font-size: 32px; line-height: 1.2; letter-spacing: -0.02em; font-weight: 600; }
.lumio-root .text-h3 { font-size: 24px; line-height: 1.3; letter-spacing: -0.01em; font-weight: 600; }
.lumio-root .text-body-lg { font-size: 18px; line-height: 1.6; font-weight: 400; }
.lumio-root .text-body-md { font-size: 15px; line-height: 1.6; font-weight: 400; }
.lumio-root .text-label { font-size: 12px; line-height: 1; letter-spacing: 0.05em; font-weight: 600; }
.lumio-root .px-margin { padding-left: 40px; padding-right: 40px; }
.lumio-root .px-sm { padding-left: 16px; padding-right: 16px; }
.lumio-root .px-xs { padding-left: 8px; padding-right: 8px; }
.lumio-root .py-xs { padding-top: 8px; padding-bottom: 8px; }
.lumio-root .py-xl { padding-top: 128px; padding-bottom: 128px; }
.lumio-root .py-section { padding-top: 160px; padding-bottom: 160px; }
.lumio-root .pt-xl { padding-top: 128px; }
.lumio-root .pb-lg { padding-bottom: 64px; }
.lumio-root .pt-md { padding-top: 32px; }
.lumio-root .mb-lg { margin-bottom: 64px; }
.lumio-root .mb-md { margin-bottom: 32px; }
.lumio-root .mb-xl { margin-bottom: 128px; }
.lumio-root .gap-md { gap: 32px; }
.lumio-root .gap-xl { gap: 128px; }
.lumio-root .text-balance { text-wrap: balance; }
@keyframes lumio-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 50px)); }
}
.lumio-root .animate-marquee {
  display: flex;
  width: max-content;
  animation: lumio-scroll 30s linear infinite;
}
.lumio-root .marquee-container { overflow: hidden; width: 100%; }
` }} />
      <div className="lumio-root text-text font-body-lg antialiased selection:bg-black selection:text-white bg-page-bg">

{/* Shared Lumio nav */}
<Header />
<main>
{/* 1. Hero */}
<section className="pt-[240px] px-margin max-w-[1728px] mx-auto flex flex-col items-center text-center relative overflow-visible bg-page-bg pb-[200px]">
<h1 className="font-display text-display text-balance max-w-4xl mb-lg text-text tracking-tighter">Des solutions digitales sur-mesure</h1>
<p className="font-body-lg text-body-lg text-muted max-w-2xl mb-lg hidden">
        Decode your lorem ipsum DNA. Bring absolute clarity to your organization's most critical assets with a platform designed for deep focus.
      </p>
<div className="w-full max-w-[1492px] bg-panel-bg overflow-hidden shadow-2xl relative z-10 rounded-[40px] h-[800px]">
<img alt="Vibrant abstract gradient" className="w-full h-full object-cover" src="/lp/LP-BC/img/adadad.jpg"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
</div>
</section>
{/* 2. Trust Strip */}
<section className="py-xl px-margin border-t border-[#D9D7D0]/30 max-w-[1728px] mx-auto flex flex-col items-center bg-page-bg relative z-0 pt-[40px]">
<p className="font-label text-label text-muted mb-md uppercase tracking-widest text-center hidden">Built with lorem ipsum leaders from</p>
<div className="flex justify-center items-center opacity-100 text-muted w-full">
<div className="marquee-container">
<div className="marquee-content animate-marquee flex gap-[100px] items-center text-muted">
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Codig</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Avenirea</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Blue Garden</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Autoreach</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Kivaia</span>
{/* Duplicate for seamless loop */}
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Codig</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Avenirea</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Blue Garden</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Autoreach</span>
<span className="font-h3 text-h3 font-semibold tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default opacity-100">Kivaia</span>
</div>
</div>
</div>
</section>
{/* 3. Floating Visual Collage (CRITICAL REBUILD) */}
<section className="min-h-[1400px] w-full max-w-[1728px] mx-auto relative overflow-hidden bg-page-bg py-xl">
{/* Central Anchor */}
<div className="absolute inset-0 flex justify-center items-center opacity-100 text-muted pointer-events-none mt-20">
<h2 className="font-display text-[120px] font-bold text-text tracking-tighter leading-[0.9] text-center">Studio<br/>Tech &amp; IA</h2>
</div>
{/* 1. Top-left: Image with Glass UI Overlay */}
<div className="absolute rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl" style={{left: '10%', top: '12%', width: '340px', height: '260px', zIndex: '5'}}>
<img className="w-full h-full object-cover" src="/lp/LP-BC/img/G7.jpg"/>
<div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-lg">
<div className="flex justify-between items-center mb-2">
<span className="font-label text-[10px] text-text font-bold uppercase tracking-wider">En cours</span>
<span className="font-label text-[10px] text-text font-bold">78%</span>
</div>
<div className="w-full bg-black/10 rounded-full h-1.5">
<div className="bg-black w-[78%] h-1.5 rounded-full"></div>
</div>
</div>
</div>
{/* 2. Top-right: Tall Card with Image */}
<div className="absolute rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl" style={{right: '12%', top: '15%', width: '280px', height: '320px', zIndex: '5'}}>
<img className="w-full h-full object-cover" src="/lp/LP-BC/img/G2.jpg"/>
<div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-text text-sm">auto_awesome</span>
</div>
</div>
{/* 3. Mid-left: Floating Glass UI */}
<div className="absolute rounded-[28px] overflow-hidden bg-white/20 backdrop-blur-3xl backdrop-saturate-[1.8] border border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col p-5" style={{left: '6%', top: '45%', width: '260px', zIndex: '15'}}>
<div className="flex items-center justify-between mb-4">
<span className="font-label text-xs font-semibold text-text">Auto-Sync</span>
<div className="w-10 h-6 bg-black rounded-full relative shadow-inner cursor-pointer">
<div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF416C] to-[#FF4B2B] flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-white text-sm">sync</span>
</div>
<div className="flex flex-col">
<span className="font-label text-[11px] font-bold text-text">BoostAI Cloud</span>
<span className="font-body-md text-[12px] text-muted leading-tight">Connecté</span>
</div>
</div>
</div>
{/* 4. Mid-right: Image with Guidelines Label */}
<div className="absolute rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl" style={{right: '8%', top: '52%', width: '320px', height: '220px', zIndex: '5'}}>
<img className="w-full h-full object-cover" src="/lp/LP-BC/img/G3.jpg"/>
<div className="absolute top-4 left-4 bg-white/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/50 shadow-sm flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
<span className="font-label text-[10px] font-bold text-text uppercase tracking-wider">Guidelines</span>
</div>
</div>
{/* 5. Bottom-left: Large Image with Brand Voice */}
<div className="absolute rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl" style={{left: '15%', top: '72%', width: '380px', height: '260px', zIndex: '5'}}>
<img className="w-full h-full object-cover" src="/lp/LP-BC/img/G6.jpg"/>
<div className="absolute bottom-5 left-5 bg-white/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/50 shadow-sm flex items-center gap-2">
<span className="material-symbols-outlined text-text text-sm">record_voice_over</span>
<span className="font-label text-[10px] font-bold text-text uppercase tracking-wider">Brand Voice</span>
</div>
</div>
{/* 6. Bottom-right: Wide Image */}
<div className="absolute rounded-[32px] overflow-hidden bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl" style={{right: '15%', top: '78%', width: '360px', height: '240px', zIndex: '5'}}>
<img className="w-full h-full object-cover opacity-90" src="/lp/LP-BC/img/G10.jpg"/>
</div>
{/* 7. Floating Comment / Profile */}
<div className="absolute bg-white/30 backdrop-blur-3xl backdrop-saturate-[2] rounded-[24px] flex items-center gap-4 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-white/50 z-20" style={{left: '45%', top: '88%', width: 'max-content', zIndex: '20'}}>
<div className="w-10 h-10 rounded-full bg-soft-card overflow-hidden shadow-sm border border-white/60">
<img className="w-full h-full object-cover scale-[1.85] origin-center" style={{objectPosition: '50% 18%'}} src="/lp/LP-BC/img/portrait.png"/>
</div>
<div className="flex flex-col pr-4">
<span className="font-label text-[11px] text-text font-bold">Raphaël</span>
<span className="font-body-md text-[13px] text-text/80 leading-tight">Projet livré !</span>
</div>
</div>
</section>
{/* 4. Manifesto */}
<section className="py-[200px] px-margin max-w-[1728px] mx-auto relative flex flex-col items-center text-center bg-page-bg">
<div className="absolute top-0 right-[10%] w-[400px] h-[400px] opacity-10 pointer-events-none">
<svg className="w-full h-full" fill="none" stroke="url(#manifesto-grad)" strokeWidth="0.5" viewBox="0 0 100 100">
<defs>
<linearGradient id="manifesto-grad" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#FF416C"></stop>
<stop offset="100%" stopColor="#FF4B2B"></stop>
</linearGradient>
</defs>
<circle cx="50" cy="50" r="48"></circle>
<ellipse cx="50" cy="50" rx="24" ry="48"></ellipse>
<ellipse cx="50" cy="50" rx="48" ry="24"></ellipse>
<line x1="2" x2="98" y1="50" y2="50"></line>
<line x1="50" x2="50" y1="2" y2="98"></line>
</svg>
</div>
<h2 className="font-display text-[49px] leading-[1.1] text-balance tracking-tight text-text relative z-10 max-w-[1000px] font-light">
    Quand chaque PME a besoin d'un avantage digital clair, BoostAI unifie sites, MVP et agents IA autour d'une seule ambition : livrer vite, propre, et mesurable.
  </h2>
</section>
{/* 5. Brand OS */}
<section className="py-[120px] px-margin max-w-[1728px] mx-auto bg-page-bg">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-center">
<div className="bg-gradient-to-br from-[#F4F3EF] to-[#E9E8E4] rounded-[40px] p-8 h-[700px] flex items-center justify-center relative overflow-hidden border border-[#D9D7D0]/30 shadow-sm">
<div className="w-full max-w-md bg-white-card rounded-2xl shadow-xl border border-[#D9D7D0]/20 p-6">
<div className="flex items-center justify-between mb-8">
<span className="font-label font-bold text-sm text-text">Files</span>
<span className="material-symbols-outlined text-muted">more_horiz</span>
</div>
<div className="space-y-4">
<div className="flex items-center gap-4 p-3 hover:bg-soft-card rounded-xl transition-colors">
<span className="material-symbols-outlined text-[#FF4B2B]">folder</span>
<span className="font-body-md font-medium text-text">Brief_Projet</span>
</div>
<div className="flex items-center gap-4 p-3 hover:bg-soft-card rounded-xl transition-colors">
<span className="material-symbols-outlined text-[#8A2387]">description</span>
<span className="font-body-md font-medium text-text">Specs_MVP</span>
</div>
<div className="flex items-center gap-4 p-3 hover:bg-soft-card rounded-xl transition-colors">
<span className="material-symbols-outlined text-[#E94057]">image</span>
<span className="font-body-md font-medium text-text">Assets_UI</span>
</div>
<div className="flex items-center gap-4 p-3 hover:bg-soft-card rounded-xl transition-colors">
<span className="material-symbols-outlined text-[#F27121]">analytics</span>
<span className="font-body-md font-medium text-text">Dashboard_Perf</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col justify-center h-full max-w-lg">
<h3 className="font-display text-h2 mb-12 font-bold tracking-tight text-text">La fondation technique de votre business.</h3>
<div className="relative pl-8 border-l-[3px] border-[#D9D7D0] space-y-12">
<div className="absolute left-[-3px] top-0 w-[3px] h-1/3 bg-gradient-to-b from-[#FF416C] to-[#FF4B2B]"></div>
<div>
<h4 className="font-h3 text-xl font-bold mb-3 text-text">Connaissance centralisée</h4>
<p className="font-body-md text-muted leading-relaxed">Centralisez brief, specs, assets et décisions produit dans un environnement clair, actionnable et partagé.</p>
</div>
<div className="opacity-50 hover:opacity-100 transition-opacity">
<h4 className="font-h3 text-xl font-bold mb-3 text-text">Solutions IA contextuelle</h4>
<p className="font-body-md text-muted leading-relaxed">Nos solutions IA s'adaptent à votre métier pour automatiser, recommander et accélérer vos process.</p>
</div>
<div className="opacity-50 hover:opacity-100 transition-opacity">
<h4 className="font-h3 text-xl font-bold mb-3 text-text">Livraison sans friction</h4>
<p className="font-body-md text-muted leading-relaxed">De la conception à la mise en ligne, chaque livrable est prêt à être utilisé sans friction.</p>
</div>
</div>
</div>
</div>
</section>
{/* 6. Lumio Pack MVP */}
<section className="py-[120px] px-margin max-w-[1728px] mx-auto bg-page-bg">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-center">
<div className="flex flex-col justify-center h-full max-w-lg order-2 lg:order-1">
<h3 className="font-display text-h2 mb-12 font-bold tracking-tight text-text">Générez des actifs digitaux prêts à scaler.</h3>
<div className="relative pl-8 border-l-[3px] border-[#D9D7D0] space-y-10">
<div className="absolute left-[-3px] top-0 w-[3px] h-1/4 bg-gradient-to-b from-[#FF416C] to-[#FF4B2B]"></div>
<div>
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Alignement produit</h4>
<p className="font-body-md text-muted leading-relaxed">Chaque livrable est aligné sur vos objectifs business et votre identité.</p>
</div>
<div className="opacity-60 hover:opacity-100 transition-opacity">
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Interfaces contextuelles</h4>
<p className="font-body-md text-muted leading-relaxed">Des interfaces pensées pour le canal : web, mobile, dashboard ou agent.</p>
</div>
<div className="opacity-60 hover:opacity-100 transition-opacity">
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Déploiement multi-canal</h4>
<p className="font-body-md text-muted leading-relaxed">Déployez sites, outils et automatisations sur vos canaux en cohérence.</p>
</div>
<div className="opacity-60 hover:opacity-100 transition-opacity">
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Performance mesurable</h4>
<p className="font-body-md text-muted leading-relaxed">Suivez SEO, conversion et usage pour itérer sur des résultats concrets.</p>
</div>
</div>
</div>
<div className="bg-gradient-to-tr from-[#E0EAFC] to-[#CFDEF3] rounded-[40px] p-8 h-[700px] flex items-center justify-center relative overflow-hidden border border-[#D9D7D0]/30 shadow-inner order-1 lg:order-2">
<div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
<div className="flex items-center gap-3 mb-6">
<BoostAIMark size={24} variant="onLight" to={false} />
<span className="font-label text-xs font-bold text-muted">BOOSTAI STUDIO</span>
</div>
<div className="bg-white/60 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/50 shadow-sm">
<p className="font-body-md text-text">Rédige une page produit pour notre offre MVP, ton clair, pro et orienté conversion.</p>
</div>
<div className="flex justify-end">
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] flex items-center justify-center shadow-md animate-pulse">
<span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* 7. Team Use Cases — Vibrant Lumio "Built for every team" components */}
<section className="py-[160px] px-margin max-w-[1728px] mx-auto flex flex-col items-center bg-page-bg">
<h2 className="font-display text-h2 mb-12 font-bold tracking-tight text-center text-text">Conçu pour chaque besoin.</h2>
<div className="flex flex-wrap justify-center gap-3 mb-16">
<button type="button" className="px-6 py-2 rounded-full bg-white text-text font-label text-sm hover:bg-gray-50 transition-colors shadow-sm">Web</button>
<button type="button" className="px-6 py-2 rounded-full bg-white text-text font-label text-sm hover:bg-gray-50 transition-colors shadow-sm">MVP</button>
<button type="button" className="px-6 py-2 rounded-full bg-white text-text font-label text-sm hover:bg-gray-50 transition-colors shadow-sm">IA</button>
<button type="button" className="px-6 py-2 rounded-full bg-white text-text font-label text-sm hover:bg-gray-50 transition-colors shadow-sm">Accompagnement</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
{/* Sites Web — white card + skeleton UI panel */}
<div className="bg-white h-[400px] rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden relative shadow-sm border border-[#D9D7D0]/20">
<div className="relative z-10">
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Sites Web</h4>
<p className="font-body-md text-muted">Sites rapides, SEO et pensés pour convertir.</p>
</div>
<div className="absolute bottom-[-20px] right-[-20px] w-2/3 h-2/3 bg-[#FFFDF8] rounded-tl-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#D9D7D0]/10 p-6 transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
<div className="h-3 w-1/2 bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] rounded-full mb-4"></div>
<div className="h-2 w-full bg-[#D9D7D0]/50 rounded-full mb-3"></div>
<div className="h-2 w-5/6 bg-[#D9D7D0]/50 rounded-full mb-3"></div>
</div>
</div>
{/* Pack MVP — gradient card + image panel */}
<div className="bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC] h-[400px] rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden relative shadow-sm">
<div className="relative z-10">
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Pack MVP</h4>
<p className="font-body-md text-muted">Produits clés en main pour valider une idée vite.</p>
</div>
<div className="absolute bottom-[-20px] right-[-20px] w-2/3 h-2/3 bg-[#F0EFEB] rounded-tl-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 overflow-hidden transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
<img className="w-full h-full object-cover" src="/lumio-assets/team-2.jpg" alt=""/>
</div>
</div>
{/* Solutions IA — white card + dashboard UI panel */}
<div className="bg-white h-[400px] rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden relative border border-[#D9D7D0]/20 shadow-sm">
<div className="relative z-10">
<h4 className="font-h3 text-xl font-bold mb-2 text-text">Solutions IA</h4>
<p className="font-body-md text-muted">Workflows, automatisations et agents pour supprimer les tâches répétitives.</p>
</div>
<div className="absolute bottom-[-20px] right-[-20px] w-2/3 h-2/3 bg-[#FAF9F5] rounded-tl-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#D9D7D0]/10 p-6 transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 flex flex-col gap-3">
<div className="w-full h-1/2 bg-gradient-to-r from-[#8A2387] to-[#E94057] rounded-lg"></div>
<div className="w-full h-1/2 bg-[#E9E8E4] rounded-lg flex gap-2">
<div className="w-1/2 h-full bg-[#D9D7D0]/30 rounded-md"></div>
<div className="w-1/2 h-full bg-[#D9D7D0]/30 rounded-md"></div>
</div>
</div>
</div>
{/* Accompagnement — dark card + icon panel */}
<div className="bg-[#181818] h-[400px] rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden relative shadow-lg">
<div className="relative z-10">
<h4 className="font-h3 text-xl font-bold mb-2 text-white">Accompagnement</h4>
<p className="font-body-md text-white/70">Stratégie digitale pour moderniser votre activité et accélérer la croissance.</p>
</div>
<div className="absolute bottom-[20px] right-[20px] w-1/2 h-1/2 bg-gradient-to-br from-[#f12711] to-[#f5af19] rounded-2xl shadow-xl p-6 transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
<span className="material-symbols-outlined text-white text-[48px]">record_voice_over</span>
</div>
</div>
</div>
</section>
{/* 8. Testimonial */}
<section className="py-[160px] px-margin max-w-[1200px] mx-auto flex flex-col items-center text-center bg-page-bg">
<h2 className="font-display text-[40px] md:text-[56px] leading-[1.1] tracking-tight text-text mb-16 text-balance max-w-[1000px] font-normal">
    "BoostAI a su comprendre notre besoin très rapidement et livrer une solution propre, efficace et parfaitement fonctionnelle. Une collaboration fluide du début à la fin."
  </h2>
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-full bg-line overflow-hidden shadow-md">
<img className="w-full h-full object-cover" src="/lp/LP-BC/img/camille.png"/>
</div>
<div className="text-left">
<p className="font-label text-sm font-bold text-text">Camille</p>
<p className="font-label text-xs text-muted">Client · fondateur MyTable</p>
</div>
</div>
</section>
{/* 9. Updates */}
<section className="py-[120px] px-margin max-w-[1728px] mx-auto bg-page-bg">
<div className="flex justify-between items-end mb-12">
<h2 className="font-display text-h2 font-bold tracking-tight text-text">Projets récents</h2>
<Link to="/realisations" className="font-label text-sm font-bold border-b border-black text-text pb-1 hover:text-[#FF416C] hover:border-[#FF416C] transition-colors">Voir tout</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<Link to="/project/10" className="group cursor-pointer block">
<img alt="OENOBOOST" className="w-full h-[450px] rounded-[40px] mb-6 overflow-hidden shadow-xl border border-white/20 object-cover" src="/realisation/oenoboost/main2.webp"/>
<p className="font-label text-xs text-muted mb-3">Réalisation · Web</p>
<h4 className="font-h3 text-xl font-bold text-text group-hover:text-black transition-colors">OENOBOOST — Application éducative vin</h4>
</Link>
<Link to="/project/8" className="group cursor-pointer block">
<img alt="KOACHER B2B" className="w-full h-[450px] rounded-[40px] mb-6 overflow-hidden shadow-xl border border-white/20 object-cover" src="/realisation/koacher/koacher-b2b-1.webp"/>
<p className="font-label text-xs text-muted mb-3">Réalisation · Web</p>
<h4 className="font-h3 text-xl font-bold text-text group-hover:text-black transition-colors">KOACHER B2B — Site commercial</h4>
</Link>
<Link to="/project/9" className="group cursor-pointer block">
<img alt="MYTABLE" className="w-full h-[450px] rounded-[40px] mb-6 overflow-hidden shadow-xl border border-white/20 object-cover" src="/realisation/mytable/mytable-2.webp"/>
<p className="font-label text-xs text-muted mb-3">Réalisation · Produit</p>
<h4 className="font-h3 text-xl font-bold text-text group-hover:text-black transition-colors">MYTABLE — Réservation chef à domicile</h4>
</Link>
</div></section><section className="py-section px-margin">
<div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
<div className="relative z-10 flex flex-col items-center">
<div className="mb-12">
<BoostAIMark size={48} variant="onLight" to={false} />
</div>
<h2 className="font-display text-[56px] md:text-[80px] font-bold text-text tracking-tighter leading-[1.05] mb-12 max-w-4xl text-balance">
        Prêt à lancer votre projet digital
      </h2>
<div className="flex flex-col sm:flex-row gap-6"><Link to="/contact" className="bg-transparent border border-text/30 text-text font-label rounded-full hover:bg-text hover:text-white transition-all duration-300 shrink-0 flex items-center px-6 text-[10px] h-[40px] font-bold uppercase tracking-wider">Réserver un appel</Link>
<Link to="/realisations" className="bg-[#1B1B1B] text-[#FAF9F5] font-label rounded-full hover:opacity-90 transition-all duration-300 shrink-0 flex items-center px-6 text-[10px] h-[40px] font-bold uppercase tracking-wider shadow-sm">
          Voir les réalisations
        </Link></div>
</div>
</div>
</section></main><Footer />
      </div>
    </>
  );
};

export default LumioLanding;
