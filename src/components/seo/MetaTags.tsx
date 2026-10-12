import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = "BoostAI Consulting – Agence web sur-mesure & automatisations IA",
  description = "Agence digitale spécialisée dans le développement web, création de sites internet modernes, MVP sur-mesure et automatisations IA pour faire croître votre business.",
  image = "https://www.boostaiconsulting.com/images/og-image-boostai.png",
  type = "website",
  keywords = "agence web, développement web sur-mesure, agence digitale, création site internet, agence code, audit site web, refonte de site, accompagnement digital, agence SEO, choisir agence web, meilleure agence web, devis agence web, MVP, automatisations IA, intelligence artificielle"
}) => {
  const location = useLocation();
  const url = `https://www.boostaiconsulting.com${location.pathname}`;

  return (
    <Helmet>
      {/* Set document language to French */}
      <html lang="fr" />
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BoostAI Consulting" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta name="application-name" content="BoostAI Consulting" />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="BoostAI Consulting" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@BoostAIConsult" />
      <meta name="twitter:site" content="@BoostAIConsult" />
      <meta name="twitter:domain" content="boostaiconsulting.com" />

      {/* Mobile / Apple Touch */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="BoostAI" />
      <meta name="format-detection" content="telephone=no" />

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="Paris" />
      <meta name="geo.position" content="48.8566;2.3522" />
      <meta name="ICBM" content="48.8566, 2.3522" />
      <meta name="language" content="fr" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="BoostAI Consulting" />
    </Helmet>
  );
};

export default MetaTags; 