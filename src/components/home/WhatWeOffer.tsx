import React from 'react';
import { motion } from 'framer-motion';
import BoostAIFlowingMenu from './BoostAIFlowingMenu';
import ComparisonTable from './ComparisonTable';
import ShinyText from '../ui/ShinyText';

const WhatWeOffer: React.FC = () => {
  const menuItems = [
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
  ];

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pourquoi choisir notre agence web ?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Les critères pour choisir la meilleure agence web : expertise technique, livraison rapide et accompagnement personnalisé
          </p>
        </motion.div>
              </div>
              
      {/* Flowing Menu - Full Width */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div style={{ height: '400px', position: 'relative' }} className="bg-[#0F1115] overflow-hidden">
          <BoostAIFlowingMenu items={menuItems} />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Comparison Table */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <ShinyText 
              text="Comparaison des approches" 
              disabled={false} 
              speed={3} 
              className="text-2xl font-bold"
            />
          </div>

          <ComparisonTable />
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer; 