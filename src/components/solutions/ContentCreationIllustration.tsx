
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';

const ContentCreationIllustration: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <FileText className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{t('contentSolution')}</h3>
          <p className="text-sm text-slate-500">{t('aiPowered')}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-1">{t('seoOptimized')}</h4>
              <p className="text-sm text-slate-600">
                {t('contentSeoDesc')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-1">{t('multipleFormats')}</h4>
              <p className="text-sm text-slate-600">
                {t('contentFormatsDesc')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-purple-600 font-bold text-2xl">5x</p>
            <p className="text-xs text-slate-600">{t('fasterCreation')}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-purple-600 font-bold text-2xl">70%</p>
            <p className="text-xs text-slate-600">{t('moreSocialShares')}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCreationIllustration;
