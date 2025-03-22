import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, TrendingUp, FileText, Globe, ArrowRight } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ChatbotIllustration from '@/components/solutions/ChatbotIllustration';
import SeoPerformanceCard from '@/components/solutions/SeoPerformanceCard';
import ContentCreationIllustration from '@/components/solutions/ContentCreationIllustration';
import WebsiteIllustration from '@/components/solutions/WebsiteIllustration';

type SolutionType = 'chatbot' | 'seo' | 'content' | 'web';

interface Solution {
  id: SolutionType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  illustration: React.ReactNode;
  benefits: string[];
}

const SolutionsPreview: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<SolutionType>('chatbot');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const solutions: Solution[] = [
    {
      id: 'chatbot',
      title: t('chatbotSolution'),
      description: t('chatbotDesc'),
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      illustration: <ChatbotIllustration />,
      benefits: [
        t('chatbotBenefit1'),
        t('chatbotBenefit2'),
        t('chatbotBenefit3'),
        t('chatbotBenefit4')
      ]
    },
    {
      id: 'seo',
      title: t('seoSolution'),
      description: t('seoDesc'),
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      illustration: <SeoPerformanceCard />,
      benefits: [
        t('seoBenefit1'),
        t('seoBenefit2'),
        t('seoBenefit3'),
        t('seoBenefit4')
      ]
    },
    {
      id: 'content',
      title: t('contentSolution'),
      description: t('contentDesc'),
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      illustration: <ContentCreationIllustration />,
      benefits: [
        t('contentBenefit1'),
        t('contentBenefit2'),
        t('contentBenefit3'),
        t('contentBenefit4')
      ]
    },
    {
      id: 'web',
      title: t('webSolution'),
      description: t('webDesc'),
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-amber-100 text-amber-600',
      illustration: <WebsiteIllustration />,
      benefits: [
        t('webBenefit1'),
        t('webBenefit2'),
        t('webBenefit3'),
        t('webBenefit4')
      ]
    },
  ];

  const activeSolution = solutions.find(solution => solution.id === activeTab) || solutions[0];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('ourSolutions')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('solutionsDescription')}
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <ToggleGroup 
            type="single" 
            value={activeTab} 
            onValueChange={(value) => value && setActiveTab(value as SolutionType)} 
            className="border border-border/50 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-xl"
          >
            {solutions.map((solution) => (
              <ToggleGroupItem 
                key={solution.id} 
                value={solution.id}
                className={`rounded-full flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all
                  ${activeTab === solution.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                aria-label={solution.title}
              >
                <span className={`p-1.5 rounded-full ${activeTab === solution.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {solution.icon}
                </span>
                <span className="hidden sm:inline">{solution.title}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className={`
              rounded-2xl overflow-hidden transform transition-all duration-500 
              shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] 
              border border-slate-200/50 bg-white/80 backdrop-blur-sm
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              {activeSolution.illustration}
            </div>
            
            <div className={`
              space-y-6 transition-opacity duration-500
              ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${activeSolution.color} shadow-sm`}>
                  {activeSolution.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold">{activeSolution.title}</h3>
              </div>
              
              <p className="text-muted-foreground text-lg">
                {activeSolution.description}
              </p>
              
              <div className="space-y-3 mt-8">
                <h4 className="font-medium text-lg">{t('keyBenefits')}</h4>
                <ul className="space-y-3">
                  {activeSolution.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1 mt-1 shadow-sm">
                        <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md"
                >
                  {t('exploreOurSolution')} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsPreview;
