
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ChatbotIllustration: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
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
          
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-tl-xl rounded-bl-xl rounded-tr-xl max-w-[80%]">
              {t('chatbotUserQuestion')}
            </div>
          </div>
          
          {/* Bot response */}
          <div className="flex">
            <div className="bg-gray-100 text-slate-800 px-4 py-2 rounded-tr-xl rounded-br-xl rounded-tl-xl max-w-[80%]">
              {t('chatbotAnswer')}
            </div>
          </div>
          
          {/* User follow-up */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-tl-xl rounded-bl-xl rounded-tr-xl max-w-[80%]">
              {t('chatbotUserResponse')}
            </div>
          </div>
          
          {/* Bot detailed response */}
          <div className="flex">
            <div className="bg-gray-100 text-slate-800 px-4 py-2 rounded-tr-xl rounded-br-xl rounded-tl-xl max-w-[80%]">
              {t('chatbotDetailAnswer')}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between border-t border-slate-200 pt-4 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-blue-600 font-semibold">24/7</span>
            <span className="text-xs text-slate-500">{t('support')}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-blue-600 font-semibold">60%</span>
            <span className="text-xs text-slate-500">{t('fewerTickets')}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-blue-600 font-semibold">92%</span>
            <span className="text-xs text-slate-500">{t('satisfaction')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotIllustration;
