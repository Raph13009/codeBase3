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
  title = "BoostAI Consulting | AI Solutions & Digital Transformation Experts",
  description = "Transform your business with AI-powered solutions. Expert in chatbots, SEO optimization, content creation, and intelligent web development. Boost productivity and customer engagement.",
  image = "https://www.boostaiconsulting.com/images/bc.png",
  type = "website",
  keywords = "AI solutions, digital transformation, chatbots, SEO optimization, content creation, web development, business automation, artificial intelligence"
}) => {
  const location = useLocation();
  const url = `https://www.boostaiconsulting.com${location.pathname}`;

  return (
    <Helmet>
      {/* Set document language to English */}
      <html lang="en" />
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BoostAI Consulting" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="BoostAI Consulting" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@BoostAIConsult" />

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="Paris" />
      <meta name="geo.position" content="48.8566;2.3522" />
      <meta name="ICBM" content="48.8566, 2.3522" />
    </Helmet>
  );
};

export default MetaTags; 