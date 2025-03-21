
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, BadgeCheck } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  color: string;
  bgColor: string;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  features,
  icon,
  image,
  color,
  bgColor,
  index,
}) => {
  const { t } = useTranslation();
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.2
      } 
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.3
      }
    })
  };
  
  return (
    <motion.div 
      className={`bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${bgColor}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${color}`}>
              {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              className="flex items-start gap-2"
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <div className={`rounded-full ${color} bg-opacity-20 p-1 mt-0.5`}>
                <BadgeCheck className="w-4 h-4" />
              </div>
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <Link 
          to="/contact" 
          className={`inline-flex items-center gap-1 ${color.replace('bg-', 'text-')} font-medium transition-all hover:gap-2`}
        >
          {t('contactUs')} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default SolutionCard;
