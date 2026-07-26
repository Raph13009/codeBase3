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
      return 'bg-[#E9E8E4] text-[#1B1B1B] border-[#D9D7D0]';
    case 'En Développement':
      return 'bg-white text-[#8C8880] border-[#D9D7D0]';
    case 'En Test':
      return 'bg-[#FFFDF8] text-[#8C8880] border-[#D9D7D0]';
    default:
      return 'bg-[#E9E8E4] text-[#8C8880] border-[#D9D7D0]';
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
                <div className="bg-white border border-[#D9D7D0]/60 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#E9E8E4] border border-[#D9D7D0] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <agent.icon className="w-6 h-6 text-[#1B1B1B]" />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <Badge
                      variant="secondary"
                      className={`text-xs px-3 py-1.5 rounded-full font-medium border ${getStatusColor(agent.status)}`}
                    >
                      {agent.status}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-[#1B1B1B] mb-3 line-clamp-2 tracking-tight"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      {agent.name}
                    </h3>

                    <p className="text-[#8C8880] text-sm mb-4 line-clamp-2">
                      {agent.description}
                    </p>

                    {/* Capabilities */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.slice(0, 3).map((capability, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-[#E9E8E4] border-[#D9D7D0] text-[#8C8880]"
                          >
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Built With */}
                    <p className="text-xs text-[#8C8880] mb-6">
                      {agent.builtWith}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-auto">
                    <Button
                      className="w-full bg-[#1B1B1B] hover:opacity-90 text-[#FAF9F5] rounded-full transition-all duration-300"
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
