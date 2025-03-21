
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SeoPerformanceCard: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 14.5L10.5 10.5L14.5 15L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-semibold text-slate-800 text-lg">SEO Performance</span>
        </div>
        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">AI-optimized</span>
      </div>
      
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1 items-center">
            <span className="text-sm font-medium text-slate-700">{t('startingPosition')}</span>
            <span className="text-amber-500 font-medium">{t('page')} 4</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-amber-500 h-2.5 rounded-full w-1/4"></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1 items-center">
            <span className="text-sm font-medium text-slate-700">{t('after')} 8 {t('weeks')}</span>
            <span className="text-emerald-500 font-medium">{t('page')} 1</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-emerald-500 h-2.5 rounded-full w-3/4"></div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-2 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-slate-700">{t('organicTraffic')}</span>
            <span className="text-emerald-500 font-medium">+210%</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-slate-700">{t('conversionRate')}</span>
            <span className="text-emerald-500 font-medium">+180%</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-slate-700">{t('revenue')}</span>
            <span className="text-emerald-500 font-medium">+250%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SeoPerformanceCard;
