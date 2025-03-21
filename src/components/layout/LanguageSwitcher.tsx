
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium transition-all hover:bg-accent"
      aria-label={t('language')}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
