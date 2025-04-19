import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowUp } from 'lucide-react';

const QualityPledge: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="quality-pledge" className="w-full bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 bg-white rounded-xl p-8 shadow-sm relative">
          <ShieldCheck className="w-12 h-12 text-blue-600" />
          <h3 className="text-xl font-semibold text-slate-800">
            {t('blog.qualityPledge.title', 'Engagement de qualité')}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {t('blog.qualityPledge.content', 
              'Chez BoostAI Consulting, nous nous engageons à offrir une information de qualité basée sur des recherches approfondies et alignée avec nos valeurs. Nous vous invitons à consulter plusieurs sources pour former votre opinion. Malgré nos efforts pour assurer l\'exactitude de nos contenus, l\'erreur est humaine. Si vous remarquez des incohérences, n\'hésitez pas à nous contacter.'
            )}
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            {t('common.backToTop', 'Retour en haut')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualityPledge; 