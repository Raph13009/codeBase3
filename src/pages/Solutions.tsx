import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import MetaTags from '@/components/seo/MetaTags';
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
  const [selectedSolution, setSelectedSolution] = useState<SolutionType>('chatbot');

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const solutions: Solution[] = [
    {
      id: 'chatbot',
      title: 'Chatbot Solutions',
      description: 'Intelligent chatbots that handle customer inquiries 24/7',
      longDescription: 'Transform your customer service with AI-powered chatbots that provide instant, accurate responses around the clock. Our chatbots learn from every interaction to continuously improve their performance.',
      features: [
        'Natural language processing for human-like conversations',
        '24/7 availability with instant response times',
        'Integration with your existing CRM and systems',
        'Multi-language support for global reach',
        'Advanced analytics and performance tracking'
      ],
      benefits: [
        'Reduce customer service costs by up to 70%',
        'Improve response times from hours to seconds',
        'Handle multiple conversations simultaneously',
        'Scale your support without hiring additional staff'
      ],
      illustration: <ChatbotIllustration />,
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'bg-cyan-500/20 text-cyan-400',
      bgGradient: 'from-cyan-500/10 to-transparent',
      caseStudy: {
        client: "E-commerce Leader",
        result: "Augmentation de 35% des conversions",
        metrics: [
          {label: "Response Time", before: "24h", after: "Instantané"},
          {label: "Customer Satisfaction", before: "65%", after: "92%"},
          {label: "Conversion Rate", before: "2.1%", after: "3.5%"}
        ]
      }
    },
    {
      id: 'seo',
      title: 'SEO Optimization',
      description: 'Boost your website visibility in search engines',
      longDescription: 'Dominate search results with our comprehensive SEO strategies. We optimize every aspect of your online presence to drive organic traffic and increase your search engine rankings.',
      features: [
        'Comprehensive keyword research and analysis',
        'On-page and technical SEO optimization',
        'Content strategy and link building',
        'Local SEO for geographic targeting',
        'Regular performance monitoring and reporting'
      ],
      benefits: [
        'Achieve higher search engine rankings',
        'Increase organic traffic significantly',
        'Improve user experience and engagement',
        'Build long-term sustainable growth'
      ],
      illustration: <SeoPerformanceCard />,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-green-500/20 text-green-400',
      bgGradient: 'from-green-500/10 to-transparent',
      caseStudy: {
        client: "Startup Tech",
        result: "Position #1 pour les mots-clés stratégiques",
        metrics: [
          {label: "Google Ranking", before: "Page 4", after: "Page 1"},
          {label: "Organic Traffic", before: "2,500/mois", after: "12,000/mois"},
          {label: "Lead Generation", before: "45/mois", after: "210/mois"}
        ]
      }
    },
    {
      id: 'content',
      title: 'Content Creation',
      description: 'Engaging content that connects with your audience',
      longDescription: 'Create compelling content that resonates with your audience and drives engagement. Our content strategies are designed to build trust, establish authority, and convert visitors into customers.',
      features: [
        'SEO-optimized content creation',
        'Blog posts, articles, and whitepapers',
        'Social media content and campaigns',
        'Email marketing and newsletters',
        'Content calendar and strategy planning'
      ],
      benefits: [
        'Improve search engine rankings',
        'Increase brand awareness and authority',
        'Generate more qualified leads',
        'Build stronger customer relationships'
      ],
      illustration: <ContentCreationIllustration />,
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-purple-500/20 text-purple-400',
      bgGradient: 'from-purple-500/10 to-transparent',
      caseStudy: {
        client: "Journal Digital",
        result: "Croissance de 85% du trafic organique",
        metrics: [
          {label: "Content Production", before: "3/semaine", after: "12/semaine"},
          {label: "User Engagement", before: "1:20 min", after: "4:35 min"},
          {label: "Social Shares", before: "45/article", after: "320/article"}
        ]
      }
    },
    {
      id: 'web',
      title: 'Web Development',
      description: 'Modern, responsive websites that convert visitors',
      longDescription: 'Build stunning, high-performance websites that not only look great but also drive results. Our web development focuses on user experience, conversion optimization, and technical excellence.',
      features: [
        'Responsive design for all devices',
        'Fast loading times and optimization',
        'SEO-friendly structure and code',
        'E-commerce and payment integration',
        'Ongoing maintenance and support'
      ],
      benefits: [
        'Improve user experience and engagement',
        'Increase conversion rates significantly',
        'Boost search engine rankings',
        'Reduce bounce rates and increase time on site'
      ],
      illustration: <WebsiteIllustration />,
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-amber-500/20 text-amber-400',
      bgGradient: 'from-amber-500/10 to-transparent',
      caseStudy: {
        client: "Retail Chain",
        result: "Augmentation de 150% du taux de conversion",
        metrics: [
          {label: "Page Load Time", before: "4.2s", after: "0.8s"},
          {label: "Bounce Rate", before: "65%", after: "23%"},
          {label: "Conversion Rate", before: "1.8%", after: "4.5%"}
        ]
      }
    },
  ];

  const activeSolutionData = solutions.find(solution => solution.id === selectedSolution) || solutions[0];
  const otherSolutions = solutions.filter(solution => solution.id !== selectedSolution);

  return (
    <>
      <MetaTags 
        title="AI Solutions & Digital Transformation | BoostAI Consulting"
        description="Discover our AI-powered solutions: intelligent chatbots, SEO optimization, content creation, and smart web development. Transform your business with cutting-edge technology."
        keywords="AI solutions, chatbots, SEO optimization, content creation, web development, digital transformation, artificial intelligence, business automation"
      />
      <div className="flex flex-col min-h-screen bg-black relative">
        <AnimatedBackground />
        <Header />
      
      <main className="flex-grow relative z-10">
        <section className="pt-40 md:pt-44 lg:pt-48 pb-24 relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-white">
                Our Solutions
              </h1>
              <p className="text-gray-300 text-base md:text-xl mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Discover how we can transform your business with our innovative solutions
              </p>
              
              <div className="inline-flex p-1 md:p-1.5 border border-gray-700 rounded-full bg-gray-900/50 backdrop-blur-sm shadow-lg">
                <ToggleGroup 
                  type="single" 
                  value={selectedSolution} 
                  onValueChange={(value) => value && setSelectedSolution(value as SolutionType)}
                  className="w-full"
                >
                  {solutions.map((solution) => (
                    <ToggleGroupItem 
                      key={solution.id} 
                      value={solution.id}
                      className={`rounded-full flex items-center justify-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-medium transition-all duration-300
                        ${selectedSolution === solution.id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' : 'hover:bg-gray-800 text-gray-300 hover:text-white'}
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
                key={selectedSolution}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto mt-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className={`p-3 rounded-xl ${activeSolutionData.color} shadow-lg self-start`}>
                        {activeSolutionData.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white">
                        {activeSolutionData.title}
                      </h2>
                    </div>
                    
                    <p className="text-base md:text-lg text-gray-300">
                      {activeSolutionData.longDescription}
                    </p>
                    
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-lg md:text-xl font-display font-semibold text-white">Key Benefits</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {activeSolutionData.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 md:p-4 shadow-sm hover:border-cyan-500 transition-all duration-300">
                            <div className="rounded-full bg-cyan-500/20 p-1 mt-1 flex-shrink-0">
                              <Check className="h-4 w-4 text-cyan-400" />
                            </div>
                            <span className="text-sm md:text-base text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 text-sm md:text-base w-full md:w-auto justify-center md:justify-start"
                    >
                      Get Custom Quote <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden hover:border-cyan-500 transition-all duration-300"
                  >
                    {activeSolutionData.illustration}
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white">Key Features</h3>
                    
                    <div className="space-y-3 md:space-y-4">
                      {activeSolutionData.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 md:gap-4">
                          <div className="rounded-full bg-cyan-500/20 p-1.5 md:p-2 mt-1 flex-shrink-0">
                            <Check className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-base md:text-lg text-gray-300">{feature}</p>
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
                      className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg p-8 hover:border-cyan-500 transition-all duration-300"
                    >
                      <h3 className="text-2xl font-display font-semibold mb-6 text-white">Case Study</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-gray-400">Client</p>
                          <p className="text-xl font-medium text-white">{activeSolutionData.caseStudy.client}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400">Results</p>
                          <p className="text-xl font-medium text-white">{activeSolutionData.caseStudy.result}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-700">
                          <p className="font-medium mb-4 text-white">Key Metrics</p>
                          
                          <div className="space-y-4">
                            {activeSolutionData.caseStudy.metrics.map((metric, index) => (
                              <div key={index} className="grid grid-cols-3 gap-4">
                                <div className="font-medium text-gray-300">{metric.label}</div>
                                <div className="text-center bg-red-500/20 py-1 px-2 rounded text-red-400 border border-red-500/30">{metric.before}</div>
                                <div className="text-center bg-green-500/20 py-1 px-2 rounded text-green-400 border border-green-500/30">{metric.after}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Link 
                          to="/contact" 
                          className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:gap-3 transition-all hover:text-cyan-300"
                        >
                          Discuss Your Project <ExternalLink className="w-4 h-4" />
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
                  <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 md:mb-6 text-white">Other Solutions</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {otherSolutions.map((solution) => (
                      <div 
                        key={solution.id}
                        onClick={() => setSelectedSolution(solution.id)}
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center gap-3 md:gap-4 hover:shadow-lg hover:border-cyan-500 transition-all cursor-pointer group"
                      >
                        <div className={`p-2 md:p-3 rounded-full ${solution.color} group-hover:scale-110 transition-transform duration-300`}>
                          {solution.icon}
                        </div>
                        <h4 className="text-base md:text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">{solution.title}</h4>
                        <p className="text-gray-300 text-xs md:text-sm text-center">{solution.description}</p>
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
    </>
  );
};

export default Solutions;
