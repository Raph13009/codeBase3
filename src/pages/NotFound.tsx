
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Update document metadata
    document.title = t('notFoundTitle') + ' | AI Agency';
    
    // Set document language
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mx-auto w-48 h-48 mb-8">
                <span className="absolute font-display font-bold text-8xl text-primary/20 top-0 left-0 right-0 text-center">
                  404
                </span>
                <span className="absolute font-display font-bold text-7xl text-primary top-4 left-0 right-0 text-center">
                  404
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {t('notFoundTitle')}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8">
                {t('notFoundText')}
              </p>
              
              <Link to="/" className="button-primary">
                {t('backToHome')}
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
