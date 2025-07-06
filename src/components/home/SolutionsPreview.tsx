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
      title: 'Chatbot Solutions',
      description: 'Intelligent chatbots that handle customer inquiries 24/7',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-cyan-500/20 text-cyan-400',
      illustration: <ChatbotIllustration />,
      benefits: [
        '24/7 customer support',
        'Instant response times',
        'Reduced workload for your team',
        'Improved customer satisfaction'
      ]
    },
    {
      id: 'seo',
      title: 'SEO Optimization',
      description: 'Boost your website visibility in search engines',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-500/20 text-green-400',
      illustration: <SeoPerformanceCard />,
      benefits: [
        'Higher search rankings',
        'Increased organic traffic',
        'Better user experience',
        'Long-term growth strategy'
      ]
    },
    {
      id: 'content',
      title: 'Content Creation',
      description: 'Engaging content that connects with your audience',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-500/20 text-purple-400',
      illustration: <ContentCreationIllustration />,
      benefits: [
        'SEO-optimized content',
        'Engaging storytelling',
        'Consistent brand voice',
        'Increased engagement'
      ]
    },
    {
      id: 'web',
      title: 'Web Development',
      description: 'Modern, responsive websites that convert visitors',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-amber-500/20 text-amber-400',
      illustration: <WebsiteIllustration />,
      benefits: [
        'Mobile-first design',
        'Fast loading times',
        'SEO-friendly structure',
        'Conversion optimization'
      ]
    },
  ];

  const activeSolution = solutions.find(solution => solution.id === activeTab) || solutions[0];

  return (
    <section ref={ref} className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            Our Solutions
          </h2>
          <p className="text-gray-300 text-lg">
            Discover how we can transform your business with our innovative solutions
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <ToggleGroup 
            type="single" 
            value={activeTab} 
            onValueChange={(value) => value && setActiveTab(value as SolutionType)} 
            className="border border-gray-700 p-1.5 rounded-full bg-gray-900/50 backdrop-blur-sm shadow-xl"
          >
            {solutions.map((solution) => (
              <ToggleGroupItem 
                key={solution.id} 
                value={solution.id}
                className={`rounded-full flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all
                  ${activeTab === solution.id 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`}
                aria-label={solution.title}
              >
                <span className={`p-1.5 rounded-full ${activeTab === solution.id ? 'bg-white/20' : 'bg-gray-700'}`}>
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
              shadow-[0_20px_50px_-10px_rgba(0,212,255,0.1)] hover:shadow-[0_30px_60px_-12px_rgba(0,212,255,0.2)] 
              border border-gray-700 bg-gray-900/50 backdrop-blur-sm
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
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{activeSolution.title}</h3>
              </div>
              
              <p className="text-gray-300 text-lg">
                {activeSolution.description}
              </p>
              
              <div className="space-y-3 mt-8">
                <h4 className="font-medium text-lg text-white">Key Benefits</h4>
                <ul className="space-y-3">
                  {activeSolution.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="rounded-full bg-cyan-500/20 p-1 mt-1 shadow-sm">
                        <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-medium shadow-md transform hover:scale-105"
                >
                  Explore Our Solutions <ArrowRight className="w-5 h-5" />
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
