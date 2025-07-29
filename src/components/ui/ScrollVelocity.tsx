import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollVelocityProps {
  texts: string[];
  velocity: number;
  className?: string;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({ texts, velocity, className = "" }) => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none ${className}`}
      style={{ y, opacity }}
    >
      <div className="text-center">
        {texts.map((text, index) => (
          <motion.div
            key={index}
            className="text-white text-2xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {text}
          </motion.div>
        ))}
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full mx-auto mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mx-auto mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScrollVelocity; 