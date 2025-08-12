import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Zap, 
  FileText, 
  CreditCard,
  Brain,
  Cpu,
  Database,
  Workflow
} from 'lucide-react';

const agents = [
  {
    id: 1,
    name: "OCR Intelligent",
    description: "Extraction automatique de données depuis des documents PDF, images et scans avec une précision de 99.5%",
    status: "En Production",
    capabilities: ["OCR", "IA", "Extraction"],
    builtWith: "Built with OpenAI GPT-4 + Tesseract",
    icon: FileText,
    ctaPrimary: {
      label: "Voir les détails",
      href: "/agent/1"
    }
  },
  {
    id: 2,
    name: "Reporting Automatisé",
    description: "Génération automatique de rapports hebdomadaires et mensuels avec analyse prédictive des tendances",
    status: "En Production",
    capabilities: ["Analytics", "IA", "Prédiction"],
    builtWith: "Built with OpenAI GPT-4 + Pandas",
    icon: Brain,
    ctaPrimary: {
      label: "Voir les détails",
      href: "/agent/2"
    }
  },
  {
    id: 3,
    name: "AutoReach",
    description: "Bot de prospection automatisée qui identifie et contacte des prospects qualifiés sur LinkedIn",
    status: "En Développement",
    capabilities: ["Prospection", "LinkedIn", "IA"],
    builtWith: "Built with OpenAI GPT-4 + Selenium",
    icon: Zap,
    ctaPrimary: {
      label: "Voir les détails",
      href: "/agent/3"
    }
  },
  {
    id: 4,
    name: "Factur-X",
    description: "Génération automatique de factures et devis avec calcul intelligent des prix et gestion des taxes",
    status: "En Production",
    capabilities: ["Facturation", "Calcul", "IA"],
    builtWith: "Built with OpenAI GPT-4 + Python",
    icon: CreditCard,
    ctaPrimary: {
      label: "Voir les détails",
      href: "/agent/4"
    }
  }
];

const springValues = {
  stiffness: 400,
  damping: 30,
  mass: 0.5,
};

const getStatusColor = (status) => {
  switch (status) {
    case 'En Production':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'En Développement':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'En Test':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const AgentsShowcase = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent, index) => {
          const ref = useRef(null);
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotateX = useSpring(useMotionValue(0), springValues);
          const rotateY = useSpring(useMotionValue(0), springValues);
          const scale = useSpring(1, springValues);
          const opacity = useSpring(0);
          const rotateFigcaption = useSpring(0, {
            stiffness: 350,
            damping: 30,
            mass: 1,
          });

          const [lastY, setLastY] = useState(0);

          const handleMouse = (e) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left - rect.width / 2;
            const offsetY = e.clientY - rect.top - rect.height / 2;

            const rotationX = (offsetY / (rect.height / 2)) * -8;
            const rotationY = (offsetX / (rect.width / 2)) * 8;

            rotateX.set(rotationX);
            rotateY.set(rotationY);

            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);

            const velocityY = offsetY - lastY;
            rotateFigcaption.set(-velocityY * 0.6);
            setLastY(offsetY);
          };

          const handleMouseEnter = () => {
            scale.set(1.05);
            opacity.set(1);
          };

          const handleMouseLeave = () => {
            opacity.set(0);
            scale.set(1);
            rotateX.set(0);
            rotateY.set(0);
            rotateFigcaption.set(0);
          };

          return (
            <motion.figure
              key={agent.id}
              ref={ref}
              className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center cursor-pointer"
              onMouseMove={handleMouse}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="relative [transform-style:preserve-3d] w-full h-full"
                style={{
                  rotateX,
                  rotateY,
                  scale,
                }}
              >
                <div className="bg-slate-600/30 backdrop-blur-md border border-slate-500/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 h-full flex flex-col group-hover:border-slate-400/60 group-hover:bg-slate-600/50 group-hover:shadow-purple-500/40">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4B49D1] to-[#26256B] p-0.5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                        <agent.icon className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusColor(agent.status)}`}
                    >
                      {agent.status}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-200 transition-colors">
                      {agent.name}
                    </h3>
                    
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2 group-hover:text-slate-200 transition-colors">
                      {agent.description}
                    </p>

                    {/* Capabilities */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.slice(0, 3).map((capability, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs bg-slate-700/50 border-slate-600/50 text-slate-300 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300"
                          >
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Built With */}
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors mb-6">
                      {agent.builtWith}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-auto">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#4B49D1] to-[#26256B] hover:from-[#3a39b0] hover:to-[#1e1d5a] text-white rounded-xl shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300"
                      size="sm"
                      onClick={() => navigate(`/agent/${agent.id}`)}
                    >
                      {agent.ctaPrimary.label}
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.figcaption
                className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                style={{
                  x,
                  y,
                  opacity,
                  rotate: rotateFigcaption,
                }}
              >
                {agent.name}
              </motion.figcaption>
            </motion.figure>
          );
        })}
      </div>
    </div>
  );
};

export default AgentsShowcase;
