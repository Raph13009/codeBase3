import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaTags from "@/components/seo/MetaTags";
import BlurText from "@/components/ui/BlurText";
import GooeyNav from "@/components/ui/GooeyNav";
import AgentsShowcase from "@/components/AgentsShowcase";

const projectsData = {
  web: [
    {
      id: 1,
      title: "Avenirea",
      image: "/realisation/avenireaCover.png",
      tags: ["Next.js", "Supabase", "Stripe", "GPT-4"],
      description: "MVP d'un test d'orientation post-bac avec logique conditionnelle, IA, et paiement intégré.",
      fullTitle: "Avenirea – Plateforme d'orientation post-bac automatisée",
      stack: ["Next.js", "Supabase (auth + base de données)", "Stripe", "GPT-4", "TailwindCSS"],
      features: [
        "Test RIASEC interactif, entièrement dynamique",
        "Logique conditionnelle complexe (les questions et résultats s'adaptent en fonction des réponses)",
        "Système de scoring automatique",
        "Résumé IA personnalisé, généré automatiquement par GPT-4",
        "Blocage du résultat avec un système de paiement intégré (Stripe)",
        "Interface responsive (desktop + mobile), design rapide et clean"
      ],
      summary: "Un MVP complet livré en 4 jours. Tout est automatisé : scoring du test, rendu IA, blocage du résultat, gestion des paiements. Ce projet prouve notre capacité à livrer rapidement une logique métier complexe avec une vraie monétisation.",
      images: [
        "/realisation/avenirea1.png",
        "/realisation/avenirea2.png",
        "/realisation/avenirea3.png",
        "/realisation/avenirea4.png",
        "/realisation/avenireamobile.png"
      ]
    },
    {
      id: 2,
      title: "MusicLinks – Plateforme",
      image: "/realisation/musiclinkscover.png",
      tags: ["Next.js", "Supabase", "Realtime Messaging", "Mobile-first", "Marketplace"],
      description: "Marketplace mobile-first où artistes et prestataires peuvent créer un compte, se faire repérer, liker des profils et échanger directement via messagerie.",
      fullTitle: "MusicLinks – Plateforme de mise en relation pour artistes et prestataires",
      stack: ["Next.js", "Supabase (auth, base de données, messaging)", "TailwindCSS", "Realtime messaging", "Auth multi-rôle"],
      features: [
        "Inscription & création de compte utilisateur",
        "Deux types de profils : Artistes visibles dans un catalogue spécifique, Prestataires dans un autre catalogue",
        "Interface pensée mobile-first, fluide et rapide",
        "Système de like entre utilisateurs pour repérage ou coup de cœur",
        "Messagerie directe intégrée (type chat), connectée à Supabase",
        "Interface de profil : bio, photos, disponibilité, etc."
      ],
      summary: "MusicLinks est une plateforme complète de mise en relation dans le monde de la musique. Pensée pour mobile, elle permet à des utilisateurs de se découvrir, liker des profils, et discuter en direct. Le tout repose sur une architecture full stack légère et rapide, avec une vraie logique produit, un design épuré, et une expérience fluide dès la version 1.",
      images: [
        "/realisation/musiclinksreal.png",
        "/realisation/musiclinksreal2.png",
        "/realisation/musiclinksreal3.png",
        "/realisation/musiclinksreal4.png",
        "/realisation/musiclinksreal5.png"
      ]
    },
    {
      id: 3,
      title: "GetLazo – Marketplace de Loyalty Tests",
      image: "/realisation/lazocover.png",
      tags: ["Marketplace", "React", "MySQL", "Stripe", "Backend Custom"],
      description: "Plateforme complète pour orchestrer, vendre et gérer des tests de fidélité automatisés.",
      fullTitle: "GetLazo – Marketplace de Loyalty Tests",
      stack: ["React.js (Next.js)", "Node.js + Express", "PostgreSQL", "Stripe", "EmailJS + Intercom", "Admin Panel"],
      features: [
        "Chat asynchrone entre clients & testeurs (modération intégrée)",
        "Catalogue dynamique avec filtres (sexe, prix, dispo…)",
        "Système d'attribution intelligent selon critères clients",
        "Workflow complet de mission : création → validation → feedback",
        "Dashboard interne : Suivi des commandes, performances testeurs, stats mensuelles",
        "Paiement sécurisé avec Stripe + logique conditionnelle de release (test validé ou non)",
        "Gestion fine des permissions & statuts (admin, checker, client)",
        "Système de support automatisé avec Intercom"
      ],
      summary: "Plus de 1 000 tests réalisés en 6 mois. Process 100% automatisé après onboarding client. Temps moyen de livraison : < 12h. ROI immédiat : plateforme monétisée dès le 1er mois.",
      images: [
        "/realisation/lazo1.png",
        "/realisation/lazo2.png",
        "/realisation/lazo3.png",
        "/realisation/lazo4.png",
        "/realisation/lazo5.png"
      ]
    },
    {
      id: 4,
      title: "MusicLinks Landing Page",
      image: "/realisation/musicklinkslanding.png",
      tags: ["Next.js", "Supabase", "Auth", "Video player", "SQL client training"],
      description: "Landing page d'inscription avec création de compte automatisée, vidéo intégrée, et base connectée pour une plateforme musicale professionnelle.",
      fullTitle: "MusicLinks – Landing page d'inscription connectée à Supabase",
      stack: ["Next.js", "Supabase (auth + DB)", "Player vidéo intégré", "TailwindCSS"],
      features: [
        "Page responsive avec vidéo intégrée pour présenter le projet",
        "Formulaire de préinscription connecté à Supabase",
        "Création automatique de comptes utilisateurs dans la base",
        "Stockage structuré des leads / inscrits",
        "Interface pensée pour être autonome côté client",
        "Formation de l'équipe MusicLinks : explication du fonctionnement de la base, création de tutoriels simples (SQL, dashboard), accompagnement sur les requêtes pour exploitation quotidienne"
      ],
      summary: "Un projet simple mais complet, livré avec logique de back-end connectée. Le client peut suivre les préinscriptions, gérer ses utilisateurs, et continuer à faire évoluer la plateforme en toute autonomie grâce à la documentation fournie.",
      images: [
        "/realisation/musicklinkslanding.png",
        "/realisation/musiclinkslanding2.png"
      ]
    },
    {
      id: 5,
      title: "Blue Garden – Site vitrine associatif",
      image: "/realisation/blue-garden-cover.png",
      tags: ["React", "Responsive", "Formulaire de contact", "CMS-less"],
      description: "Site vitrine simple et élégant pour une association, avec page contact et section événements.",
      fullTitle: "Blue Garden – Site vitrine associatif en React",
      stack: ["React", "Vite", "TailwindCSS", "EmailJS (contact)"],
      features: [
        "Design responsive et épuré",
        "Formulaire de contact avec envoi d’e-mail",
        "Section Événements: ajout/modification simple sans base de données",
        "Pages statiques performantes (SEO-ready)"
      ],
      summary: "Un site vitrine moderne et rapide pour l’association Blue Garden, pensé pour être maintenu sans back-end lourd, avec un système simple pour publier des événements.",
      images: [
        "/realisation/bluegarden1.png",
        "/realisation/bluegarden2.png",
        "/realisation/bluegarden3.png"
      ]
    }
  ],
  ia: [
    {
      id: 1,
      title: "Factur-X Generator",
      image: "/images/raphWorking.jpeg",
      tags: ["Node.js", "PDF", "XML"],
      description: "Système automatisé de génération de factures au format Factur-X avec intégration comptable."
    },
    {
      id: 2,
      title: "Bot Trading Crypto",
      image: "/images/raphWorking.jpeg",
      tags: ["Python", "KuCoin API", "Trading"],
      description: "Bot de trading automatisé pour les cryptomonnaies avec stratégies personnalisables."
    },
    {
      id: 3,
      title: "Support IA Assistant",
      image: "/images/raphWorking.jpeg",
      tags: ["GPT-4", "Zendesk", "NLP"],
      description: "Assistant intelligent qui répond automatiquement aux questions fréquentes et route les cas complexes."
    },
    {
      id: 4,
      title: "Veille IA Notion",
      image: "/images/raphWorking.jpeg",
      tags: ["Python", "OpenAI", "Notion API"],
      description: "Bot automatisé qui analyse les tendances du web et génère un rapport hebdomadaire dans Notion."
    }
  ]
};

const Realisations = () => {
  const [activeTab, setActiveTab] = useState<'web' | 'agents'>('web');
  const navigate = useNavigate();

  // Detect hash and set active tab accordingly
  useEffect(() => {
    if (window.location.hash === '#agents') {
      setActiveTab('agents');
    }
  }, []);

  return (
    <>
      <MetaTags
        title="Nos Réalisations | BoostAI Consulting - Projets Web & IA"
        description="Découvrez nos réalisations en développement web et intelligence artificielle. Sites vitrines, outils IA, automatisations et projets innovants."
        keywords="réalisations, projets web, intelligence artificielle, développement, automatisation, BoostAI"
        image="/assets/Logo.png"
      />
      
      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
        activeTab === 'web' 
          ? 'bg-gradient-to-br from-[#1F111F] to-[#413C41]' 
          : 'bg-gradient-to-br from-[#111F1F] to-[#17413C]'
      }`}>
        <Header />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-semibold px-4 py-1 rounded-full mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  🚀 Nos Réalisations
                </motion.span>
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Ce qu'on a construit pour vous.
                </motion.h1>
              </div>

              {/* Toggle Section */}
              <motion.div 
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative flex items-center justify-center gap-2 p-1 bg-[#161B2E] rounded-full border border-[#2A2F45] w-fit mx-auto">
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      activeTab === 'web'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🧩 Produits Web
                  </button>
                  <button
                    onClick={() => setActiveTab('agents')}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      activeTab === 'agents'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🤖 Agents & Automatisations
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {/* Web Projects */}
                {activeTab === 'web' && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="web"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                      {projectsData.web.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div 
                            className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                            onClick={() => navigate(`/project/${project.id}`)}
                          >
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-48 object-cover" 
                            />
                            <div className="p-4 flex flex-col justify-center">
                              <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                              <div className="flex gap-2 flex-wrap text-sm text-purple-400 mb-3">
                                {project.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="bg-purple-900/30 px-2 py-1 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-gray-400 text-sm">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Agents Projects */}
                {activeTab === 'agents' && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="agents"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AgentsShowcase />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Votre projet nous intéresse ?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Discutons de votre projet et transformons vos idées en réalité avec nos solutions sur-mesure.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg"
                  >
                    Parlons de votre projet
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Realisations;
