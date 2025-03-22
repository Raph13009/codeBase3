import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Code, PenTool, Rocket, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const OtherSolutions: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Update document metadata for SEO
    document.title = t('otherSolutions') + ' | AI Agency';
    
    // Set document language
    document.documentElement.lang = i18n.language;
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [t, i18n.language]);
  
  const solutions: Solution[] = [
    {
      id: 'web-dev',
      title: 'Développement Web IA',
      description: 'Création de sites web et d\'applications sur mesure avec des fonctionnalités IA intégrées pour une expérience utilisateur personnalisée.',
      icon: <Code />,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      id: 'content-creation',
      title: 'Création de Contenu',
      description: 'Génération de contenu de qualité optimisé pour le SEO avec l\'aide de l\'intelligence artificielle. Articles, descriptions, emails marketing.',
      icon: <PenTool />,
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      id: 'digital-marketing',
      title: 'Marketing Digital',
      description: 'Stratégies marketing basées sur l\'IA pour améliorer votre présence en ligne et augmenter votre taux de conversion.',
      icon: <Rocket />,
      color: 'bg-orange-500/10 text-orange-600',
    },
    {
      id: 'analytics',
      title: 'Analytics Avancé',
      description: 'Analyse approfondie de vos données pour identifier des tendances et opportunités grâce à des algorithmes d\'intelligence artificielle.',
      icon: <BarChart />,
      color: 'bg-green-500/10 text-green-600',
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="pt-40 md:pt-44 lg:pt-48 pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {t('otherSolutions')}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Découvrez nos solutions IA complémentaires pour répondre à tous vos besoins digitaux.
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {solutions.map((solution) => (
                <motion.div 
                  key={solution.id}
                  className="bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden card-hover"
                  variants={itemVariants}
                >
                  <div className="p-8">
                    <div className={`w-14 h-14 ${solution.color} rounded-2xl flex items-center justify-center mb-6`}>
                      {solution.icon}
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-4">{solution.title}</h3>
                    
                    <p className="text-muted-foreground mb-6">
                      {solution.description}
                    </p>
                    
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {t('readMore')}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-16 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Vous ne trouvez pas ce que vous cherchez ?
              </p>
              <Link to="/contact" className="button-primary">
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OtherSolutions;
