
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background gradient with subtle wave */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text content */}
          <motion.div 
            className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.h1 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('heroTitle')}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('heroSubtitle')}
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link 
                to="/solutions" 
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-primary/90"
              >
                <span className="relative flex items-center gap-2">
                  {t('discoverSolutions')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-secondary px-8 py-3 font-medium shadow-md transition-all duration-300 hover:bg-secondary/70"
              >
                <span className="relative">
                  {t('contactUs')}
                </span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Chat demonstration */}
          <motion.div 
            className="relative mx-auto w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative rounded-2xl bg-card border border-border/40 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Chat header */}
              <div className="bg-primary/5 p-4 border-b border-border/40">
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
                className="p-4 h-[360px] overflow-y-auto flex flex-col gap-4 scroll-smooth"
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
              <div className="p-4 border-t border-border/40 bg-secondary/30">
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder={t('typeMessage')}
                    className="flex-1 px-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                    disabled
                  />
                  <button className="p-2 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
