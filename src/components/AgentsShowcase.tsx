import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  FileSpreadsheet, 
  BarChart3, 
  Send, 
  ReceiptText, 
  Copy
} from "lucide-react";

const agents = [
  {
    id: 1,
    name: 'OCR — PDF → Excel',
    category: ['Data'],
    description: 'Extrait automatiquement des tableaux depuis des PDF identiques et génère un Excel propre, prêt à l\'analyse.',
    capabilities: ['OCR fiable', 'Mise en forme Excel', 'Batch'],
    builtWith: 'Python, Tesseract/Cloud OCR, pandas',
    status: 'En production',
    icon: FileSpreadsheet,
    ctaPrimary: { label: 'Voir le cas', href: '/agent/1' },
    ctaSecondary: { label: 'Détails', href: '/solutions/ocr' }
  },
  {
    id: 2,
    name: 'Reporting — Data → Notion',
    category: ['Reporting', 'Data'],
    description: 'Récupère les données d\'une base client, calcule les stats et comparaisons hebdos, et publie un rapport structuré dans Notion.',
    capabilities: ['SQL auto-dates', 'Comparatifs', 'Résumé IA'],
    builtWith: 'Python, MySQL, Notion API',
    status: 'En production',
    icon: BarChart3,
    ctaPrimary: { label: 'Voir le cas', href: '/agent/2' },
    ctaSecondary: { label: 'Détails', href: '/solutions/reporting-notion' }
  },
  {
    id: 3,
    name: 'AutoReach — Email Outreach',
    category: ['Outreach'],
    description: 'Envoie des emails personnalisés et beaux à partir d\'une liste, avec suivi simple des envois.',
    capabilities: ['Templates beaux', 'Personnalisation', 'Batch safe'],
    builtWith: 'Python, SMTP/Email API',
    status: 'En production',
    icon: Send,
    ctaPrimary: { label: 'Voir le cas', href: '/agent/3' },
    ctaSecondary: { label: 'Détails', href: '/solutions/outreach' }
  },
  {
    id: 4,
    name: 'Générateur de Factures — Factur‑X',
    category: ['Billing'],
    description: 'Crée des factures au format Factur‑X (PDF + XML) prêtes pour l\'e‑facturation.',
    capabilities: ['Factur‑X', 'Génération PDF', 'Validation'],
    builtWith: 'Python, Factur‑X libs',
    status: 'Beta',
    icon: ReceiptText,
    ctaPrimary: { label: 'Voir le cas', href: '/agent/4' },
    ctaSecondary: { label: 'Détails', href: '/solutions/facturation' }
  }
];

const categories = ['All', 'Data', 'Reporting', 'Outreach', 'Billing'];

const AgentsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Spring animation values for 3D tilt effect
  const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2,
  };

  const filteredAgents = activeCategory === 'All' 
    ? agents 
    : agents.filter(agent => agent.category.includes(activeCategory));

  const copySectionLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#agents`);
      toast({
        title: "Lien copié !",
        description: "Le lien vers cette section a été copié dans le presse-papiers.",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En production':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Beta':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <section id="agents" className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-2 rounded-2xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#4B49D1] to-[#26256B] text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Agents Grid */}
        <AnimatePresence mode="wait">
          {filteredAgents.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Aucun agent trouvé
              </h3>
              <p className="text-gray-400 mb-8">
                Aucun agent ne correspond à cette catégorie pour le moment.
              </p>
              <Button
                className="bg-gradient-to-r from-[#4B49D1] to-[#26256B] hover:from-[#3a39b0] hover:to-[#1e1d5a] text-white"
                size="lg"
              >
                Contactez-nous
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {filteredAgents.map((agent, index) => {
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-400 mb-6">
              Besoin d'un agent IA personnalisé pour votre entreprise ?
            </p>
            <Button
              className="bg-gradient-to-r from-[#4B49D1] to-[#26256B] hover:from-[#3a39b0] hover:to-[#1e1d5a] text-white shadow-lg shadow-purple-500/25"
              size="lg"
            >
              Contactez-nous
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentsShowcase;
