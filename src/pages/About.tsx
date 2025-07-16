import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetaTags from '@/components/seo/MetaTags';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    // Set document language to English
    document.documentElement.lang = 'en';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Technical Expertise",
      description: "Deep understanding of AI technologies and business applications",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Practical Focus", 
      description: "Results-driven approach with clear deliverables and measurable outcomes",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Human-Centered",
      description: "Technology solutions designed around human needs and workflows",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Clear Communication",
      description: "Complex technical concepts explained in accessible, actionable terms",
      color: "from-orange-500 to-red-600",
    }
  ];

  const achievements = [
    "Custom OCR solution for 10+ year SME",
    "Digital transformation strategies for nonprofits",
    "MVP development for innovative startups",
    "Business process automation implementations"
  ];

  return (
    <>
      <MetaTags 
        title="About BoostAI Consulting | Independent AI Consultant & Digital Transformation Expert"
        description="Learn about BoostAI Consulting's founder and approach to helping SMEs, nonprofits, and startups digitize operations through custom AI solutions and strategic consulting."
        keywords="AI consultant, digital transformation, independent consultant, business automation, startup MVP, SME digitization"
      />
      
      <div className="min-h-screen relative overflow-x-hidden bg-[#0B0D14]">
        <AnimatedBackground />
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
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent leading-tight">
                  Building the Future
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    One Solution at a Time
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Independent AI consultant helping organizations transform complexity into clarity through intelligent automation and strategic digital solutions.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-900/30"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  The BoostAI Approach
                </h2>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    BoostAI Consulting was founded on a simple philosophy: technology should amplify human capability, not replace it. As an independent consultant, I work directly with SMEs, nonprofits, and startups to identify where intelligent automation can create the most impact.
                  </p>
                  
                  <p>
                    Rather than pushing generic solutions, I take time to understand each organization's unique challenges and workflows. This approach has led to successful implementations ranging from custom OCR tools for established businesses to comprehensive digital transformation strategies for mission-driven organizations.
                  </p>
                  
                  <p>
                    My focus is on delivering concrete results through clear communication, practical implementation, and ongoing support. Every project begins with understanding not just what needs to be built, but why it matters to your business.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Values Grid */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  What Sets Us Apart
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  A different approach to consulting, focused on practical value and sustainable results
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-900/30"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Proven Track Record
                </h2>
                
                <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                  Real solutions for real businesses. Here's how we've helped organizations transform their operations:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + (0.1 * index) }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
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
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  To help small and medium organizations harness the power of artificial intelligence with clarity and intention. We believe that every business, regardless of size, deserves access to intelligent solutions that enhance their unique strengths and support their specific goals.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Start Your Transformation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.a>
                  
                  <motion.a
                    href="/solutions"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-gray-800/60 hover:bg-gray-700/60 text-white font-semibold rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300"
                  >
                    Explore Solutions
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About; 