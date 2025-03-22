import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, MessageCircle } from 'lucide-react';

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

  // Animation variants for staggered animations
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Button hover animations
  const primaryButtonHover = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const secondaryButtonHover = {
    y: -3,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  return (
    <section className="relative pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-28 overflow-hidden">
      {/* Background gradient with subtle wave */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        {/* Decorative elements with animation */}
        <motion.div 
          className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-blue-400/5 blur-3xl"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-[5%] w-72 h-72 rounded-full bg-purple-400/5 blur-3xl"
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      <motion.div 
        className="container max-w-screen-xl mx-auto px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Text content - Now with more space and prominence */}
        <motion.div 
          className="space-y-12 mx-auto text-center mb-20 md:mb-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-5">
            <motion.div
              className="inline-block bg-primary/10 px-4 py-1.5 rounded-full mb-3"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <span className="text-primary font-medium text-sm">{t('newGeneration')}</span>
            </motion.div>
            
            <motion.h1 
              className="font-display text-4xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] w-full mx-auto px-0 md:px-2 bg-gradient-to-r from-foreground via-foreground/95 to-foreground bg-clip-text"
              variants={titleVariants}
              style={{ 
                letterSpacing: "-0.015em"
              }}
            >
              {t('heroTitle')}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mt-4"
              variants={titleVariants}
            >
              {t('heroSubtitle')}
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center"
            variants={titleVariants}
          >
            {/* Primary CTA with gradient */}
            <motion.div
              whileHover={primaryButtonHover}
              className="relative"
            >
              <Link 
                to="/solutions" 
                className="relative flex items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg overflow-hidden shadow-md z-10"
              >
                <span className="relative flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {t('discoverSolutions')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
            
            {/* Secondary CTA with shadow effect */}
            <motion.div
              whileHover={secondaryButtonHover}
              className="relative"
            >
              <Link 
                to="/contact" 
                className="relative flex items-center justify-center py-3 px-6 bg-white border border-border/70 text-foreground font-medium shadow-lg rounded-lg overflow-hidden backdrop-blur-sm"
              >
                <span className="relative flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t('contactUs')}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Chat demonstration - With better spacing and presentation */}
        <motion.div 
          className="relative mx-auto w-full max-w-xl mt-8 md:mt-0"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: 0.9,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.div 
            className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-2xl rounded-3xl transform translate-y-4 scale-[0.95] opacity-70"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0.7, 0.8, 0.7]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          
          <div className="relative rounded-2xl bg-card/70 border border-border/40 shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Chat header */}
            <div className="bg-white/30 p-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 2v0a10 10 0 0 1 10 10c0 3.5-2.33 6.82-4.92 9.12a17.49 17.49 0 0 1-5.08 3.88"></path>
                      <path d="M12 2C6.26 2 2 6.26 2 12c0 3.5 2.33 6.82 4.92 9.12a17.49 17.49 0 0 0 5.08 3.88"></path>
                      <path d="M5 9c2 0 2-2 4-2 1 0 1 1 2 1 4 0 4-3 4-3"></path>
                      <path d="M14.5 16.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">{t('chatbotTitle')}</h3>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div 
              ref={messageContainerRef}
              className="p-5 h-[360px] overflow-y-auto flex flex-col gap-4 scroll-smooth bg-white/10"
            >
              {messages.map((message) => (
                <motion.div 
                  key={message.id} 
                  className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.isTyping ? (
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    message.text
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t border-border/30 bg-white/20">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder={t('typeMessage')}
                  className="flex-1 px-4 py-3 rounded-full border border-border/50 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
                  disabled
                />
                <button className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-90 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-primary/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-blue-500/10 blur-3xl"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
