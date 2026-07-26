import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('notFoundTitle') + ' | BoostAI Consulting';
    document.documentElement.lang = 'fr';
  }, [t]);

  return (
    <div className="lumio-page flex flex-col min-h-screen bg-[#FAF9F5] text-[#1B1B1B]">
      <Header />

      <main className="flex-grow pt-36 pb-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <div
                className="font-bold text-8xl md:text-9xl tracking-tighter mb-6 text-[#1B1B1B]/15"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                404
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h1
                className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {t('notFoundTitle')}
              </h1>

              <p className="text-[#8C8880] text-lg mb-10">{t('notFoundText')}</p>

              <Link
                to="/"
                className="inline-flex items-center rounded-full bg-black text-[#FAF9F5] px-6 h-11 text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
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
