import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ 
        background: 'radial-gradient(ellipse at center, #222054 0%, #0a0a0f 100%)'
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Logo/Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 
            className="font-bold text-2xl md:text-3xl" 
            style={{ 
              fontFamily: "'Darker Grotesque', sans-serif", 
              color: '#ffffff' 
            }}
          >
            BoostAI Consulting
            <span 
              className="ml-2 md:ml-3" 
              style={{ 
                color: '#5a4a6f', 
                textShadow: '0 0 10px rgba(90, 74, 111, 0.8), 0 0 20px rgba(90, 74, 111, 0.6)', 
                filter: 'drop-shadow(0 0 5px rgba(90, 74, 111, 0.7))' 
              }}
            >
              .
            </span>
          </h1>
        </motion.div>

        {/* Spinner */}
        <motion.div
          className="relative w-16 h-16 md:w-20 md:h-20"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Outer ring */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: '#3D2F57',
              borderRightColor: '#3D2F57',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
            }}
          ></div>
          {/* Inner ring */}
          <div 
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: '#5a4a6f',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: '#5a4a6f',
            }}
          ></div>
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-full"
              style={{ 
                background: 'radial-gradient(circle, #5a4a6f 0%, #3D2F57 100%)',
                boxShadow: '0 0 10px rgba(90, 74, 111, 0.8)'
              }}
            ></div>
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="mt-6"
        >
          <p 
            className="text-sm md:text-base"
            style={{ 
              color: '#5a4a6f',
              fontFamily: "'Darker Grotesque', sans-serif"
            }}
          >
            Chargement...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;

