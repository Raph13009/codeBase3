import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetaTags from '@/components/seo/MetaTags';
import ProfileCard from '@/components/ui/ProfileCard';
import ContactPopup from '@/components/ui/ContactPopup';

import { Check, ArrowRight, Coffee, Zap, Target, Users, Brain } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    // Set document language to English
    document.documentElement.lang = 'en';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    "Custom OCR tool for a 10+ year SME",
    "Full MVP in 3 weeks for a solo founder", 
    "Automation workflows for a nonprofit",
    "AI-powered customer service chatbot"
  ];

  const differentiators = [
    {
      emoji: "⚙️",
      title: "Tech that makes sense",
      description: "No PhD required — I explain complex solutions in plain English or french ;)"
    },
    {
      emoji: "📈", 
      title: "Clear outcomes, fast delivery",
      description: "You know exactly what you're getting and when you'll get it"
    },
    {
      emoji: "🙋‍♂️",
      title: "Human-first approach",
      description: "You talk to me, not a black box. Real conversations, real solutions"
    },
    {
      emoji: "🧠",
      title: "Built with strategy, not just code",
      description: "Every solution starts with understanding your business goals"
    }
  ];

  return (
    <>
      <MetaTags 
        title="About Raphaël | BoostAI Consulting - Independent AI Consultant"
        description="Meet Raphaël, the independent AI consultant behind BoostAI. Turning chaos into clarity with AI, coffee, and practical solutions that actually work."
        keywords="AI consultant, independent consultant, digital transformation, business automation, startup MVP, SME solutions"
      />
      
      <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <Header />
        
        <main className="relative z-10 pt-32 pb-20">
          {/* Hero Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white leading-tight">
                  Qui se cache derrière <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">BoostAI</span> ?
                </h1>
                
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Consultant IA indépendant qui aide les vraies entreprises à résoudre de vrais problèmes. Pas de jargon corporate, juste des solutions pratiques qui fonctionnent.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Profile Card Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Rencontrez Raphaël
                </h2>
                <p className="text-xl text-gray-300">
                  Le fondateur derrière BoostAI Consulting
                </p>
              </motion.div>
              
              <div className="flex justify-center">
                <ProfileCard
                  name="Raphaël L."
                  title="Expert Web & IA"
                  handle="BoostAI_Consulting"
                  status="Ouvert aux projets"
                  contactText="Me Contacter"
                  avatarUrl="/images/raph-pp.png"
                  miniAvatarUrl="/images/raph-pp.png"
                  behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)"
                  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => setIsContactPopupOpen(true)}
                />
              </div>
            </div>
          </section>

          {/* Intro with Image */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700"
              >
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/2">
                    <img 
                      src="/images/raphWorking.jpeg" 
                      alt="Raphaël working on his laptop" 
                      className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                    />
                    <p className="text-center text-gray-400 mt-4 text-sm italic">
                      Hi, I'm Raphaël — the guy behind BoostAI.
                    </p>
                  </div>
                  
                  <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-display font-bold text-white">
                      Why I Started BoostAI
                    </h2>
                    
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <p>
                        I got tired of seeing businesses struggle with overcomplicated, overpriced solutions that didn't actually solve their problems.
                      </p>
                      
                      <p>
                      In my first 6 months, I helped 3 founders automate real parts of their business. From building MVPs to custom internal tools. Every single project saved them hours or unlocked new revenue.
                      </p>
                      
                      <p>
                        BoostAI exists because every business deserves smart tools & tech improvements. And you shouldn't need a tech team or a massive budget to get them.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* What Makes BoostAI Different */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  What Makes BoostAI Different
                </h2>
                <p className="text-xl text-gray-300">
                  Four simple principles that guide everything I do
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {differentiators.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + (0.1 * index) }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {item.emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* What I've Built */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/30"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 text-center">
                  What I've Built
                </h2>
                
                <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                  Real projects, real results. Here's what I've delivered for clients:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + (0.1 * index) }}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{project}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-500/30"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  The Mission
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Every business deserves smart tools. Whether you're a solo founder or a growing SME, you should have access to the same intelligent solutions that big companies use.
                </p>
                
                <p className="text-lg text-cyan-400 font-medium">
                  That's what I'm building, one project at a time.
                </p>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  Let's Build Something That Works
                </h2>
                
                <p className="text-xl text-gray-300 mb-8">
                  Ready to turn your ideas into reality? Let's talk about what we can build together.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <motion.button
                    onClick={() => navigate('/contact')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Start your project
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  
                  <motion.a
                    href="https://www.byraphaellevy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-gray-800/60 hover:bg-gray-700/60 text-white font-semibold rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300"
                  >
                    Read my technical blog
                  </motion.a>
                </div>
                
                <p className="text-gray-400 text-lg font-medium">
                  — Raph
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
        
        <ContactPopup 
          isOpen={isContactPopupOpen}
          onClose={() => setIsContactPopupOpen(false)}
        />
      </div>
    </>
  );
};

export default About; 