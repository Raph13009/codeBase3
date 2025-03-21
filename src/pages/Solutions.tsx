
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MessageSquare, TrendingUp, FileText, Globe, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Link } from 'react-router-dom';
import ChatbotIllustration from '@/components/solutions/ChatbotIllustration';
import SeoPerformanceCard from '@/components/solutions/SeoPerformanceCard';
import ContentCreationIllustration from '@/components/solutions/ContentCreationIllustration';
import WebsiteIllustration from '@/components/solutions/WebsiteIllustration';

type SolutionType = 'chatbot' | 'seo' | 'content' | 'web';

interface Solution {
  id: SolutionType;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  illustration: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  caseStudy?: {
    client: string;
    result: string;
    metrics: Array<{label: string; before: string; after: string}>;
  };
}

const Solutions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeSolution, setActiveSolution] = useState<SolutionType>('chatbot');

  useEffect(() => {
    // Update document metadata for SEO
    document.title = t('solutionsTitle') + ' | AI Agency';
    
    // Set document language
    document.documentElement.lang = i18n.language;
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [t, i18n.language]);

  const solutions: Solution[] = [
    {
      id: 'chatbot',
      title: t('chatbotSolution'),
      description: t('chatbotDesc'),
      longDescription: t('chatbotLongDesc'),
      features: [
        t('chatbotFeature1'),
        t('chatbotFeature2'),
        t('chatbotFeature3'),
        t('chatbotFeature4'),
        t('chatbotFeature5')
      ],
      benefits: [
        t('chatbotBenefit1'),
        t('chatbotBenefit2'),
        t('chatbotBenefit3'),
        t('chatbotBenefit4')
      ],
      illustration: <ChatbotIllustration />,
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600',
      bgGradient: 'from-blue-50 to-transparent',
      caseStudy: {
        client: "E-commerce Leader",
        result: "Augmentation de 35% des conversions",
        metrics: [
          {label: t('responseTime'), before: "24h", after: "Instantané"},
          {label: t('customerSatisfaction'), before: "65%", after: "92%"},
          {label: t('conversionRate'), before: "2.1%", after: "3.5%"}
        ]
      }
    },
    {
      id: 'seo',
      title: t('seoSolution'),
      description: t('seoDesc'),
      longDescription: t('seoLongDesc'),
      features: [
        t('seoFeature1'),
        t('seoFeature2'),
        t('seoFeature3'),
        t('seoFeature4'),
        t('seoFeature5')
      ],
      benefits: [
        t('seoBenefit1'),
        t('seoBenefit2'),
        t('seoBenefit3'),
        t('seoBenefit4')
      ],
      illustration: <SeoPerformanceCard />,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600',
      bgGradient: 'from-green-50 to-transparent',
      caseStudy: {
        client: "Startup Tech",
        result: "Position #1 pour les mots-clés stratégiques",
        metrics: [
          {label: t('googleRanking'), before: "Page 4", after: "Page 1"},
          {label: t('organicTraffic'), before: "2,500/mois", after: "12,000/mois"},
          {label: t('leadGeneration'), before: "45/mois", after: "210/mois"}
        ]
      }
    },
    {
      id: 'content',
      title: t('contentSolution'),
      description: t('contentDesc'),
      longDescription: t('contentLongDesc'),
      features: [
        t('contentFeature1'),
        t('contentFeature2'),
        t('contentFeature3'),
        t('contentFeature4'),
        t('contentFeature5')
      ],
      benefits: [
        t('contentBenefit1'),
        t('contentBenefit2'),
        t('contentBenefit3'),
        t('contentBenefit4')
      ],
      illustration: <ContentCreationIllustration />,
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600',
      bgGradient: 'from-purple-50 to-transparent',
      caseStudy: {
        client: "Journal Digital",
        result: "Croissance de 85% du trafic organique",
        metrics: [
          {label: t('contentProduction'), before: "3/semaine", after: "12/semaine"},
          {label: t('userEngagement'), before: "1:20 min", after: "4:35 min"},
          {label: t('socialShares'), before: "45/article", after: "320/article"}
        ]
      }
    },
    {
      id: 'web',
      title: t('webSolution'),
      description: t('webDesc'),
      longDescription: t('webLongDesc'),
      features: [
        t('webFeature1'),
        t('webFeature2'),
        t('webFeature3'),
        t('webFeature4'),
        t('webFeature5')
      ],
      benefits: [
        t('webBenefit1'),
        t('webBenefit2'),
        t('webBenefit3'),
        t('webBenefit4')
      ],
      illustration: <WebsiteIllustration />,
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-600',
      bgGradient: 'from-amber-50 to-transparent',
      caseStudy: {
        client: "Retail Chain",
        result: "Augmentation de 150% du taux de conversion",
        metrics: [
          {label: t('pageLoadTime'), before: "4.2s", after: "0.8s"},
          {label: t('bounceRate'), before: "65%", after: "23%"},
          {label: t('conversionRate'), before: "1.8%", after: "4.5%"}
        ]
      }
    },
  ];

  const activeSolutionData = solutions.find(solution => solution.id === activeSolution) || solutions[0];
  const bgClass = `bg-gradient-to-b ${activeSolutionData.bgGradient}`;
  const otherSolutions = solutions.filter(solution => solution.id !== activeSolution);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className={`py-24 ${bgClass} transition-colors duration-700`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                {t('solutionsTitle')}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {t('solutionsSubtitle')}
              </p>
              
              <div className="inline-flex p-1.5 border border-border/60 rounded-full bg-background/80 backdrop-blur-sm shadow-lg">
                <ToggleGroup 
                  type="single" 
                  value={activeSolution} 
                  onValueChange={(value) => value && setActiveSolution(value as SolutionType)}
                  className="w-full"
                >
                  {solutions.map((solution) => (
                    <ToggleGroupItem 
                      key={solution.id} 
                      value={solution.id}
                      className={`rounded-full flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-300
                        ${activeSolution === solution.id ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-secondary'}
                      `}
                      aria-label={solution.title}
                    >
                      {solution.icon}
                      <span className="hidden sm:inline">{solution.title}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto mt-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${activeSolutionData.color} shadow-lg`}>
                        {activeSolutionData.icon}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold">
                        {activeSolutionData.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-muted-foreground">
                      {activeSolutionData.longDescription}
                    </p>
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-display font-semibold">{t('keyBenefits')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeSolutionData.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-sm">
                            <div className="rounded-full bg-primary/10 p-1 mt-1">
                              <Check className="h-4 w-4 text-primary" />
                            </div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-6 py-3 rounded-lg font-medium shadow-md"
                    >
                      {t('getCustomQuote')} <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
                  >
                    {activeSolutionData.illustration}
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-8"
                  >
                    <h3 className="text-2xl font-display font-semibold">{t('keyFeatures')}</h3>
                    
                    <div className="space-y-4">
                      {activeSolutionData.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2 mt-1">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg">{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {activeSolutionData.caseStudy && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-white rounded-xl border border-slate-200 shadow-lg p-8"
                    >
                      <h3 className="text-2xl font-display font-semibold mb-6">{t('caseStudy')}</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-muted-foreground">{t('client')}</p>
                          <p className="text-xl font-medium">{activeSolutionData.caseStudy.client}</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground">{t('results')}</p>
                          <p className="text-xl font-medium">{activeSolutionData.caseStudy.result}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-200">
                          <p className="font-medium mb-4">{t('keyMetrics')}</p>
                          
                          <div className="space-y-4">
                            {activeSolutionData.caseStudy.metrics.map((metric, index) => (
                              <div key={index} className="grid grid-cols-3 gap-4">
                                <div className="font-medium">{metric.label}</div>
                                <div className="text-center bg-red-50 py-1 px-2 rounded text-red-600">{metric.before}</div>
                                <div className="text-center bg-green-50 py-1 px-2 rounded text-green-600">{metric.after}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Link 
                          to="/contact" 
                          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                        >
                          {t('discussYourProject')} <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-display font-semibold mb-6">{t('otherSolutions')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {otherSolutions.map((solution) => (
                      <div 
                        key={solution.id}
                        onClick={() => setActiveSolution(solution.id)}
                        className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-all cursor-pointer"
                      >
                        <div className={`p-3 rounded-full ${solution.color}`}>
                          {solution.icon}
                        </div>
                        <h4 className="text-lg font-medium">{solution.title}</h4>
                        <p className="text-muted-foreground text-sm text-center">{solution.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Solutions;
