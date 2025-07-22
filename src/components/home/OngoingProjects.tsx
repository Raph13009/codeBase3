import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
  name: string;
  progress: number;
  type: string;
}

const OngoingProjects: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const projects: Project[] = [
    { name: "Musicklinks landing page", progress: 20, type: "Landing Page" },
    { name: "Avenirea mvp", progress: 80, type: "MVP" },
    { name: "Tempted redesign internal feature", progress: 60, type: "Redesign" }
  ];

  useEffect(() => {
    // Afficher après un délai pour ne pas surcharger l'arrivée
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-6 left-6 z-40"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header compact */}
          <div 
            className="px-4 py-3 cursor-pointer hover:bg-gray-800/30 transition-colors duration-200 flex items-center justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Ongoing Projects</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="ml-4"
            >
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>

          {/* Contenu détaillé */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  height: { duration: 0.5, ease: "easeInOut" },
                  opacity: { duration: 0.3, ease: "easeOut" }
                }}
                className="px-4 pb-4"
              >
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-xs font-medium truncate max-w-[140px]">
                            {project.name}
                          </span>
                          <span className="text-cyan-400 text-xs bg-cyan-400/10 px-2 py-0.5 rounded-full">
                            {project.type}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs font-mono">
                          {project.progress}%
                        </span>
                      </div>
                      
                      {/* Barre de progression */}
                      <div className="relative">
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                      <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ 
                                duration: 1.0, 
                                delay: index * 0.2,
                                ease: "easeOut"
                              }}
                            className={`h-full rounded-full ${
                              project.progress < 30 ? 'bg-red-400' :
                              project.progress < 70 ? 'bg-yellow-400' :
                              'bg-green-400'
                            } shadow-lg`}
                            style={{
                              background: `linear-gradient(90deg, ${
                                project.progress < 30 ? '#f87171' :
                                project.progress < 70 ? '#fbbf24' :
                                '#34d399'
                              } 0%, ${
                                project.progress < 30 ? '#ef4444' :
                                project.progress < 70 ? '#f59e0b' :
                                '#10b981'
                              } 100%)`
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-gray-800/50">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>3 active projects</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Live updates</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OngoingProjects; 