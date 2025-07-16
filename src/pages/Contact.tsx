import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import Map from '@/components/contact/Map';
import MetaTags from '@/components/seo/MetaTags';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Phone, Mail, Globe, Calendar, Clock, Map as MapIcon, Star, Zap, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Set document language to English
    document.documentElement.lang = 'en';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ['+33 6 02 61 73 29'],
      color: "from-cyan-500 to-blue-600",
      hoverColor: "hover:border-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ['contact@boostaiconsulting.com'],
      color: "from-purple-500 to-pink-600",
      hoverColor: "hover:border-purple-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Our Presence",
      details: ['Paris, France'],
      color: "from-green-500 to-emerald-600",
      hoverColor: "hover:border-green-500",
    },
  ];

  const teamMembers = [
    {
      name: 'Raphaël Levy',
      role: "AI Consultant",
      image: '/assets/raph-pp.jpg',
      description: "Expert in AI solutions and digital transformation"
    },
    {
      name: 'Sébastien',
      role: "Full-stack Developer",
      image: '/assets/seb-pp.png',
      description: "Specialized in modern web technologies"
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast Response",
      description: "24h response time guaranteed"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Expert Team",
      description: "Experienced AI specialists"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Free Consultation",
      description: "No-cost initial project assessment"
    }
  ];

  return (
    <>
      <MetaTags
        title="Contact Us | BoostAI Consulting"
        description="Get in touch with our AI experts. Let's discuss your needs and see how our AI expertise can help transform your business."
        keywords="contact, AI consulting, business transformation, chatbots, SEO optimization, content creation, web development"
      />
      <div className="min-h-screen relative overflow-x-hidden bg-[#0B0D14]">
        <AnimatedBackground />
        <Header />
        
        <main className="relative z-10 pt-32 pb-20">
          {/* Hero Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6"
                >
                  <span className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    💬 Let's Talk Business
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Ready to Transform
                  <span className="block text-gradient bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Your Business?
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Get a <span className="text-cyan-400 font-semibold">free consultation</span> and discover how AI can revolutionize your operations
                </motion.p>

                {/* Benefits Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                          {benefit.icon}
                        </div>
                        <h3 className="font-semibold text-white">{benefit.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="pb-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 max-w-7xl mx-auto">
                
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="order-2 xl:order-1"
                >
                  <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10 hover:border-cyan-500/30 transition-all duration-500">
                    <div className="mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Start Your AI Journey
                      </h2>
                      <p className="text-gray-300 text-lg">
                        Fill out the form below and get a <span className="text-cyan-400 font-semibold">free quote</span> for your project. 
                        Our team will get back to you within <span className="text-cyan-400 font-semibold">24 hours</span>.
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="order-1 xl:order-2 space-y-8"
                >
                  {/* Contact Info Cards */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => (
                        <motion.div 
                          key={index} 
                          className={`bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ${info.hoverColor} transition-all duration-300 group hover:bg-gray-800/50`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 bg-gradient-to-r ${info.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                              {info.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-lg mb-2">{info.title}</h3>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Availability Card */}
                  <motion.div 
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-white text-xl">Available Hours</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                        <span className="text-gray-300">Monday - Friday</span>
                        <span className="text-cyan-400 font-medium">9:00 AM - 6:00 PM CET</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                        <span className="text-gray-300">Saturday</span>
                        <span className="text-cyan-400 font-medium">10:00 AM - 2:00 PM CET</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-300">Sunday</span>
                        <span className="text-red-400 font-medium">Closed</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-medium">Guaranteed response within 24 hours</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Map Card */}
                  <motion.div 
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                        <MapIcon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-white text-xl">Our Location</h3>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Map />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Expert Team</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Industry professionals dedicated to transforming your business with cutting-edge AI solutions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 group hover:bg-gray-800/50"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                  >
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-1 group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-400 leading-relaxed">{member.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
