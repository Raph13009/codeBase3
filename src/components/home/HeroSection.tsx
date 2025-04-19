import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, MessageCircle, ChevronDown } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
}

type ChatSequenceItem = {
  sender: 'user' | 'bot';
  text: string;
};

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Using translation keys for the messages to ensure they change with language
  const chatSequence: ChatSequenceItem[] = [
    { sender: 'user', text: t('chatbotUserQuestion') },
    { sender: 'bot', text: t('chatbotAnswer') },
    { sender: 'user', text: t('chatbotUserResponse') },
    { sender: 'bot', text: t('chatbotDetailAnswer') },
  ];

  // Auto-scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isRestarting) {
      setMessages([]);
      setCurrentStep(0);
      setIsRestarting(false);
      return;
    }

    if (currentStep < chatSequence.length) {
      const timer = setTimeout(() => {
        // First add a typing indicator
        if (chatSequence[currentStep].sender === 'bot') {
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'bot',
            text: '',
            isTyping: true
          }]);
          
          // Then after a delay, replace it with the actual message
          setTimeout(() => {
            setMessages(prev => {
              const newMessages = [...prev];
              // Remove the typing indicator
              newMessages.pop();
              // Add the actual message
              newMessages.push({
                id: Date.now(),
                sender: chatSequence[currentStep].sender,
                text: chatSequence[currentStep].text
              });
              return newMessages;
            });
            setCurrentStep(prev => prev + 1);
          }, 1500);
        } else {
          // For user messages, just add them directly
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: chatSequence[currentStep].sender,
            text: chatSequence[currentStep].text
          }]);
          setCurrentStep(prev => prev + 1);
        }
      }, currentStep === 0 ? 800 : 2000);

      return () => clearTimeout(timer);
    } else if (currentStep === chatSequence.length) {
      // Restart the sequence after a longer pause
      const restartTimer = setTimeout(() => {
        setIsRestarting(true);
      }, 5000);
      
      return () => clearTimeout(restartTimer);
    }
  }, [currentStep, isRestarting, t]);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Button hover animations
  const primaryButtonHover = {
    scale: 1.03,
    boxShadow: "0 10px 30px -10px rgba(66, 103, 230, 0.5)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const secondaryButtonHover = {
    y: -3,
    boxShadow: "0 15px 25px -10px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  return (
    <section className="relative w-full min-h-[90vh] pt-24 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwVjYwSDYwVjBaIiBmaWxsPSJ1cmwoI3BhdHQwKSIvPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0MCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIwLjA1IiBoZWlnaHQ9IjAuMDUiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDAuMDVIMFYwLjA1VjBaIiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48L3N2Zz4=')]"></div>
        
        {/* Blurred gradient shapes */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-300/20 to-purple-400/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/20 to-blue-300/20 blur-3xl"></div>
        
        {/* Animated elements */}
        <motion.div 
          className="absolute top-1/3 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30"
          animate={{ 
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
          animate={{ 
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        ></motion.div>
        
        <motion.div 
          className="absolute top-1/4 left-[25%] w-12 h-12 rounded-full bg-gradient-to-br from-primary/25 to-blue-400/25"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 30, 0],
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        ></motion.div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left column: Enhanced text content */}
          <motion.div 
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex self-start items-center px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md border border-blue-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-blue-700 font-bold text-sm uppercase tracking-wider">{t('newGeneration')}</span>
              </span>
            </motion.div>
            
            {/* Main Title */}
            <motion.div 
              className="mb-6" 
              variants={titleVariants}
            >
              <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4">
              <span className="inline-block text-[#1a2c4e]">
                  {t('heroTitle')}
              </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-lg mt-6 leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 mt-8" 
              variants={titleVariants}
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={primaryButtonHover}
                className="relative"
              >
                <Link 
                  to="/solutions" 
                  className="relative flex items-center justify-center h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg overflow-hidden shadow-lg border border-blue-500/20 group"
                >
                  <span className="relative flex items-center gap-3">
                    <Zap className="w-5 h-5 text-white" />
                    {t('discoverSolutions')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0" 
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 2,
                      ease: 'linear',
                    }}
                  />
                </Link>
              </motion.div>
              
              {/* Secondary CTA */}
              <motion.div
                whileHover={secondaryButtonHover}
                className="relative"
              >
                <Link 
                  to="/contact" 
                  className="relative flex items-center justify-center h-14 px-8 bg-white text-[#1a2c4e] border border-slate-200 font-semibold shadow-md rounded-lg overflow-hidden backdrop-blur-sm hover:bg-slate-50 transition-colors duration-300"
                >
                  <span className="relative flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    {t('contactUs')}
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column: Enhanced chat demonstration */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* 3D Floating effect wrapper */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              className="relative z-10"
            >
              {/* Chat window with enhanced design */}
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
                {/* Decorative top light bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
                
                {/* Chat header */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v0a10 10 0 0 1 10 10c0 3.5-2.33 6.82-4.92 9.12a17.49 17.49 0 0 1-5.08 3.88"></path>
                          <path d="M12 2C6.26 2 2 6.26 2 12c0 3.5 2.33 6.82 4.92 9.12a17.49 17.49 0 0 0 5.08 3.88"></path>
                          <path d="M5 9c2 0 2-2 4-2 1 0 1 1 2 1 4 0 4-3 4-3"></path>
                          <path d="M14.5 16.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{t('chatbotTitle')}</h3>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          {t('online')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div 
                  ref={messageContainerRef}
                  className="p-5 h-[380px] overflow-y-auto flex flex-col gap-4 scroll-smooth bg-gradient-to-b from-white to-slate-50"
                >
                  {messages.map((message) => (
                    <motion.div 
                      key={message.id} 
                      className={`${message.sender === 'user' ? 'ml-auto bg-blue-500 text-white rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-2xl shadow-sm' : 'mr-auto bg-white border border-slate-200 text-slate-800 rounded-tr-2xl rounded-tl-md rounded-br-2xl rounded-bl-2xl shadow'} px-4 py-3 max-w-[80%]`}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.isTyping ? (
                        <div className="flex gap-1.5 py-1 px-1">
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-blue-300"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0 }}
                          ></motion.span>
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-blue-300"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                          ></motion.span>
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-blue-300"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                          ></motion.span>
                        </div>
                      ) : (
                        message.text
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Chat input */}
                <div className="p-4 border-t border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <input 
                      type="text" 
                      placeholder={t('typeMessage')}
                      className="flex-1 px-4 py-3 rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/40 shadow-sm"
                      disabled
                    />
                    <button className="p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Shadow effect */}
              <div className="absolute -bottom-3 left-[5%] right-[5%] h-[20px] bg-black/10 blur-xl rounded-full z-0"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
