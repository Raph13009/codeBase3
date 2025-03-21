
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Solution {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface SolutionsToggleProps {
  solutions: Solution[];
  activeSolution: string;
  setActiveSolution: (id: string) => void;
}

const SolutionsToggle: React.FC<SolutionsToggleProps> = ({
  solutions,
  activeSolution,
  setActiveSolution,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16 sticky top-[80px] z-10 bg-white/80 backdrop-blur-md py-3 px-4 rounded-full shadow-md border border-slate-200">
      {solutions.map((solution) => (
        <button
          key={solution.id}
          onClick={() => setActiveSolution(solution.id)}
          className={`
            relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium 
            transition-all duration-300 ease-in-out
            ${activeSolution === solution.id 
              ? 'text-white' 
              : `${solution.color.replace('bg-', 'text-')} bg-opacity-10 hover:bg-opacity-20`
            }
          `}
        >
          {activeSolution === solution.id && (
            <motion.div
              layoutId="solution-active-background"
              className={`absolute inset-0 ${solution.color} rounded-full`}
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {solution.icon}
            {solution.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SolutionsToggle;
