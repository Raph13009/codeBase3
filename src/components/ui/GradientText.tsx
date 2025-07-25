import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = "" }) => {
  return (
    <span 
      className={`bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

export default GradientText; 