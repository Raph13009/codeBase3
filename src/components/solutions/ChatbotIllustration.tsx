import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ChatbotIllustration: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
    >
      {/* Decorative gradient elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
      
      <div className="flex flex-col gap-4 p-6 relative z-10">
        <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M12 2v0a10 10 0 0 1 10 10c0 3.5-2.33 6.82-4.92 9.12a17.49 17.49 0 0 1-5.08 3.88"></path>
              <path d="M12 2C6.26 2 2 6.26 2 12c0 3.5 2.33 6.82 4.92 9.12a17.49 17.49 0 0 0 5.08 3.88"></path>
              <path d="M5 9c2 0 2-2 4-2 1 0 1 1 2 1 4 0 4-3 4-3"></path>
              <path d="M14.5 16.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{t('aiChatbot')}</h3>
            <p className="text-sm text-slate-500">{t('liveDemo')}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* User message */}
          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-blue-500 text-white px-4 py-2 rounded-tl-xl rounded-bl-xl rounded-tr-xl max-w-[80%] shadow-md">
              {t('chatbotUserQuestion')}
            </div>
          </motion.div>
          
          {/* Bot response */}
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="bg-gray-100 px-4 py-2 rounded-tr-xl rounded-br-xl rounded-tl-xl max-w-[80%] shadow-sm text-slate-800">
              {t('chatbotAnswer')}
            </div>
          </motion.div>
          
          {/* User follow-up */}
          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <div className="bg-blue-500 text-white px-4 py-2 rounded-tl-xl rounded-bl-xl rounded-tr-xl max-w-[80%] shadow-md">
              {t('chatbotUserResponse')}
            </div>
          </motion.div>
          
          {/* Bot detailed answer */}
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            <div className="bg-gray-100 px-4 py-2 rounded-tr-xl rounded-br-xl rounded-tl-xl max-w-[80%] shadow-sm text-slate-800">
              {t('chatbotDetailAnswer')}
            </div>
          </motion.div>
        </div>
        
        {/* Chat input */}
        <motion.div 
          className="mt-3 pt-3 border-t border-slate-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.3 }}
        >
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              className="flex-1 px-4 py-2 rounded-full border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder={t('typeMessage')}
              disabled
            />
            <button className="p-2 rounded-full bg-blue-500 text-white shadow hover:bg-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatbotIllustration;
