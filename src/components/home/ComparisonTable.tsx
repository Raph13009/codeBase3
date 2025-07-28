import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from '../ui/ShinyText';

const ComparisonTable: React.FC = () => {
  const tableData = [
    {
      label: "Délai",
      freelance: "Variable",
      agency: "Très long",
      boostai: "Rapide"
    },
    {
      label: "Prix",
      freelance: "Moyen",
      agency: "Élevé",
      boostai: "Abordable"
    },
    {
      label: "Qualité",
      freelance: "Aléatoire",
      agency: "Professionnelle",
      boostai: "Excellente"
    },
    {
      label: "Support",
      freelance: "Limité",
      agency: "Standard",
      boostai: "Premium"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-2 sm:gap-6 mb-8">
        {/* Empty cell for row labels */}
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16"></div>
        </div>
        
        {/* Freelance Column */}
        <motion.div 
          className="flex flex-col items-center space-y-2 sm:space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <img 
            src="/images/fiver.png" 
            alt="Freelance" 
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <h3 className="text-sm sm:text-xl font-bold text-white text-center">Freelance</h3>
        </motion.div>

        {/* Agency Column */}
        <motion.div 
          className="flex flex-col items-center space-y-4 sm:space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img 
            src="/images/capgemini.png" 
            alt="Agence classique" 
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
          />
          <h3 className="text-sm sm:text-xl font-bold text-white text-center">Agence classique</h3>
        </motion.div>

        {/* BoostAI Column */}
        <motion.div 
          className="flex flex-col items-center space-y-2 sm:space-y-3 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4B49D1]/10 via-[#8B5CF6]/10 to-[#4B49D1]/10 rounded-2xl blur-xl"></div>
          
          <img 
            src="/images/boostai-logo.png" 
            alt="BoostAI" 
            className="relative w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <h3 className="text-sm sm:text-xl font-bold text-transparent bg-gradient-to-r from-[#4B49D1] to-[#8B5CF6] bg-clip-text text-center">
            BoostAI
          </h3>
        </motion.div>
      </div>

      {/* Table Content */}
      <div className="space-y-3 sm:space-y-4">
        {tableData.map((row, index) => (
          <motion.div
            key={row.label}
            className="grid grid-cols-4 gap-2 sm:gap-6 items-center py-3 sm:py-4 border-b border-gray-700/30 last:border-b-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Row Label */}
            <div className="text-xs sm:text-base font-medium text-gray-400 text-left">
              {row.label}
            </div>

            {/* Freelance Value */}
            <div className="text-center text-gray-300 text-xs sm:text-base">
              {row.freelance}
            </div>

            {/* Agency Value */}
            <div className="text-center text-gray-300 text-xs sm:text-base">
              {row.agency}
            </div>

            {/* BoostAI Value */}
            <div className="text-center font-semibold text-transparent bg-gradient-to-r from-[#4B49D1] to-[#8B5CF6] bg-clip-text text-xs sm:text-base">
              {row.boostai}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable; 