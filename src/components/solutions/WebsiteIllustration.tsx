
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Users, Zap, BarChart3 } from 'lucide-react';

const WebsiteIllustration: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <Globe className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{t('webSolution')}</h3>
          <p className="text-sm text-slate-500">{t('intelligentWebsites')}</p>
        </div>
      </div>
      
      <div className="mb-5 bg-slate-800 rounded-lg p-3 overflow-hidden">
        <div className="flex gap-1 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        <div className="relative h-32 bg-white rounded overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-amber-500 to-amber-600"></div>
          <div className="absolute top-6 left-0 w-1/4 h-full bg-slate-100 border-r border-slate-200"></div>
          <div className="absolute top-10 left-1/3 right-4 h-16 bg-amber-50 rounded-md border border-amber-100"></div>
          <div className="absolute bottom-4 left-1/3 right-4 h-8 bg-amber-500 rounded-md text-white text-xs flex items-center justify-center">
            {t('callToAction')}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 flex flex-col items-center">
          <Users className="w-6 h-6 text-amber-600 mb-1" />
          <p className="text-xs text-center text-slate-700">{t('personalizationTitle')}</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 flex flex-col items-center">
          <Zap className="w-6 h-6 text-amber-600 mb-1" />
          <p className="text-xs text-center text-slate-700">{t('speedTitle')}</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 flex flex-col items-center">
          <BarChart3 className="w-6 h-6 text-amber-600 mb-1" />
          <p className="text-xs text-center text-slate-700">{t('analyticsTitle')}</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 flex flex-col items-center">
          <Globe className="w-6 h-6 text-amber-600 mb-1" />
          <p className="text-xs text-center text-slate-700">{t('responsiveTitle')}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WebsiteIllustration;
