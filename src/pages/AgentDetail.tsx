import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import MetaTags from "@/components/seo/MetaTags";
import RotatingText from "@/components/ui/RotatingText";

const agentsData = {
  "1": {
    id: "1",
    title: "OCR — PDF → Excel",
    fullTitle: "Agent OCR intelligent pour conversion PDF vers Excel",
    image: "/realisation/OCR1.png",
    tags: ["Python", "OpenAI GPT Vision", "FastAPI", "Render"],
    description: "Extrait automatiquement des tableaux depuis des PDF identiques et génère un Excel propre, prêt à l'analyse.",
    stack: ["Python", "OpenAI GPT Vision", "pandas", "FastAPI", "Render"],
    features: [
      "Analyse intelligente des PDF avec GPT Vision",
      "Extraction automatique des tableaux et données",
      "Génération d'Excel avec mise en forme optimisée",
      "API REST accessible en ligne",
      "Aucune installation client requise",
      "Hébergement cloud sur Render"
    ],
    summary: "Notre agent OCR utilise la vision GPT pour analyser des PDF et extraire des données structurées. Hébergé sur Render, accessible 24/7 sans installation client.",
    images: [
      "/realisation/OCR1.png",
      "/realisation/OCR2.png"
    ],
    status: "En production"
  },
  "2": {
    id: "2",
    title: "Agent de Reporting Automatisé sur Notion",
    fullTitle: "Agent de Reporting Automatisé sur Notion",
    image: "/realisation/reporting1.1.png",
    tags: ["Python", "PostgreSQL/MySQL", "Notion API", "Automatisation"],
    description: "Récupère les données d'une base client, calcule les stats et comparaisons hebdos, et publie un rapport structuré dans Notion.",
    stack: ["Python", "PostgreSQL / MySQL", "Notion API", "Automatisation sur mesure"],
    features: [
      "Connexion automatique à vos bases de données existantes",
      "Analyse hebdomadaire détaillée et sur mesure",
      "Visualisation claire et synthétique directement dans Notion",
      "Suivi des tendances et comparaison avec les périodes précédentes",
      "Disponible 24/7, sans intervention manuelle",
      "Rapports adaptables à vos besoins et à votre secteur"
    ],
    summary: "Cet agent transforme vos données brutes en un rapport clair, visuel et personnalisé livré chaque semaine directement dans votre espace Notion. Il se connecte à vos bases existantes, analyse en profondeur vos indicateurs clés et vous présente uniquement l'essentiel : chiffres précis, tendances et recommandations. Idéal pour prendre des décisions rapides sans perdre de temps dans les extractions et les tableurs. Disponible en ligne 24/7, sans aucune installation ni configuration.",
    images: [
      "/realisation/reporting1.1.png",
      "/realisation/reporting1.2.png",
      "/realisation/reporting1.3.png",
      "/realisation/reporting1.4.png"
    ],
    status: "En production"
  },
  "3": {
    id: "3",
    title: "Agent AutoReach – Envoi d'e-mails instantané",
    fullTitle: "Agent AutoReach – Envoi d'e-mails instantané",
    image: "/realisation/autoreach1.png",
    tags: ["Python", "SMTP Automation", "HTML/CSS", "CSV/Excel"],
    description: "Envoie des emails personnalisés et beaux à partir d'une liste, avec suivi simple des envois.",
    stack: ["Python", "SMTP Automation", "HTML/CSS", "CSV/Excel Processing"],
    features: [
      "Envoi massif d'e-mails en moins d'une seconde",
      "Personnalisation du contenu et respect du branding",
      "Compatible avec n'importe quelle liste de contacts (CSV, Excel)",
      "Modèles HTML élégants et responsive",
      "Aucune installation requise, tout est automatisé"
    ],
    summary: "Nous avons créé cet agent pour un client qui avait besoin d'envoyer rapidement des centaines d'e-mails personnalisés. En quelques secondes, AutoReach prend une simple liste de destinataires, y applique un e-mail HTML soigné et conforme à son image de marque, puis l'envoie à tout le monde en un éclair. Résultat : des campagnes professionnelles prêtes en quelques minutes, un gain de temps colossal, et un taux d'ouverture qui décolle grâce à une présentation impeccable.",
    images: [
      "/realisation/autoreach1.png",
      "/realisation/autoreach2.png",
      "/realisation/autoreach3.png"
    ],
    status: "En production"
  },
  "4": {
    id: "4",
    title: "Générateur automatique de factures Factur-X",
    fullTitle: "Générateur automatique de factures Factur-X",
    tags: ["Python", "Génération PDF", "Intégration XML", "Factur-X"],
    description: "Crée des factures au format Factur‑X (PDF + XML) prêtes pour l'e‑facturation.",
    stack: ["Python", "Génération PDF", "Intégration XML", "Format Factur-X", "Base de données historique"],
    features: [
      "Génération de factures 100% conformes Factur-X",
      "PDF avec intégration XML validée",
      "Historique des factures et réutilisation des données",
      "Personnalisation complète vendeur/client",
      "Création instantanée et export direct"
    ],
    summary: "Nous avons développé un générateur complet de factures au format Factur-X, intégrant un fichier XML directement dans le PDF afin de répondre à toutes les normes et certifications en vigueur. L'outil permet au client de créer en quelques secondes des factures professionnelles, parfaitement mises en page, tout en garantissant leur compatibilité avec les systèmes de comptabilité et plateformes de déclaration. Un système d'historique intégré facilite la réutilisation des informations vendeur ou client, réduisant considérablement le temps de saisie pour les prochaines factures. Résultat : un gain de temps majeur, des documents conformes et prêts à l'envoi dès leur génération.",
    status: "Beta"
  }
};

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Debug logs
  console.log('=== DEBUG AGENT DETAIL ===');
  console.log('id:', id);
  console.log('id type:', typeof id);
  console.log('agentsData keys:', Object.keys(agentsData));
  console.log('agentsData:', agentsData);
  
  const agent = agentsData[id as keyof typeof agentsData];
  
  console.log('found agent:', agent);
  console.log('=== END DEBUG ===');
  
  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111F1F] to-[#17413C]">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-white">Agent non trouvé</h1>
          <p className="text-gray-400 mb-4">id: {id}</p>
          <p className="text-gray-400 mb-4">Type: {typeof id}</p>
          <p className="text-gray-400 mb-4">Clés disponibles: {Object.keys(agentsData).join(', ')}</p>
          <button 
            onClick={() => navigate('/realisations#agents')}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retour aux réalisations
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        title={`${agent.fullTitle} | BoostAI Consulting`}
        description={agent.description}
        keywords={`${agent.tags.join(', ')}, agent IA, automatisation, BoostAI`}
        image={(agent as any).image || "/assets/Logo.png"}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#111F1F] to-[#17413C]">
        
        {/* Back Button - Fixed Position */}
        <motion.button
          onClick={() => navigate('/realisations#agents')}
          className="fixed top-24 left-6 z-50 flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg border border-slate-700/50 hover:bg-slate-700/80 hover:border-slate-600/50 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </motion.button>

        <main className="relative z-10">

          {/* Hero Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
              >
                {/* Agent Header */}
                <div className="text-center mb-16">
                  <motion.h1 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {agent.fullTitle}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {agent.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {agent.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-purple-900/40 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Main Agent Image */}
                {(agent as any).image && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-16"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img 
                        src={(agent as any).image} 
                        alt={agent.fullTitle}
                        className="w-full h-96 md:h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </motion.div>
                )}

                {/* Agent Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-16"
                >
                  <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Aperçu de l'Agent</h2>
                    <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                      {agent.summary}
                    </p>
                  </div>
                </motion.div>

                {/* Stack Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies Utilisées</h2>
                  <div className="flex justify-center">
                    <RotatingText
                      texts={agent.stack}
                      mainClassName="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 border border-purple-500/50 rounded-xl text-white font-bold text-2xl overflow-hidden shadow-lg"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                      auto={true}
                    />
                  </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Fonctionnalités Clés</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agent.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 bg-slate-800/30 border border-slate-700/30 rounded-xl p-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      >
                        <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-lg leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Image Gallery */}
                {(agent as any).images && (agent as any).images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mb-16"
                  >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Galerie de l'Agent</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {(agent as any).images.map((image: string, index: number) => (
                        <motion.div
                          key={index}
                          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img 
                            src={image} 
                            alt={`${agent.title} - Image ${index + 1}`}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-lg font-medium">Voir l'image</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Intéressé par cet agent IA ?</h2>
                    <p className="text-gray-300 mb-6">
                      Nous pouvons créer des agents similaires pour automatiser vos processus.
                    </p>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    >
                      Discutons de votre projet
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Agent detail"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgentDetail;
