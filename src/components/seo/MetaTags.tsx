import React from 'react';
import { useTranslation } from 'react-i18next';

const MetaTags: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <title>BoostAI Consulting — IA Agents & Process Automation</title>
      <meta name="description" content="BoostAI crée des agents IA pour automatiser vos process métier, améliorer votre efficacité et gagner un temps précieux." />
      
      {/* Open Graph pour les réseaux sociaux */}
      <meta property="og:title" content="BoostAI Consulting — IA Agents & Process Automation" />
      <meta property="og:description" content="On conçoit des agents IA pour automatiser vos process, optimiser votre temps et booster votre productivité." />
      <meta property="og:image" content="https://www.boostaiconsulting.com/assets/Logo2.png" />
      <meta property="og:url" content="https://www.boostaiconsulting.com/" />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="BoostAI Consulting — IA Agents & Automation" />
      <meta name="twitter:description" content="Automatisez vos tâches avec des agents IA sur mesure." />
      <meta property="twitter:domain" content="boostaiconsulting.com" />
      <meta property="twitter:url" content="https://www.boostaiconsulting.com/" />
      <meta name="twitter:image" content="https://www.boostaiconsulting.com/assets/Logo2.png" />
    </>
  );
};

export default MetaTags; 