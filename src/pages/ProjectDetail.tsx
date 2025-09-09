import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaTags from "@/components/seo/MetaTags";
import RotatingText from "@/components/ui/RotatingText";

const projectsData = {
  "1": {
    id: "1",
    title: "Avenirea",
    fullTitle: "Avenirea – Plateforme d'orientation post-bac automatisée",
    image: "/realisation/avenireaCover.png",
    tags: ["Next.js", "Supabase", "Stripe", "GPT-4"],
    description: "Test d'orientation intelligent, automatisé et monétisé",
    stack: ["Next.js", "Supabase (auth + base de données)", "Stripe", "GPT-4", "TailwindCSS"],
    features: [
      "Calcul du profil RIASEC selon les réponses de l'utilisateur",
      "Base de données structurée des filières et métiers associés",
      "Résumé personnalisé généré automatiquement via GPT-4 (OpenAI API)",
      "Prédictions de métiers et parcours d'études supérieures adaptés",
      "Blocage intelligent du résultat final, déverrouillé après paiement Stripe",
      "Interface fluide et responsive, optimisée pour desktop et mobile"
    ],
    summary: "Avenirea est un MVP complet conçu pour aider des lycéens à découvrir leur profil d'orientation. Le test repose sur une logique métier précise (modèle RIASEC), combinée à une base de données de formations et métiers. Une synthèse personnalisée est générée via GPT-4, puis monétisée à travers un système de déblocage sécurisé.",
    images: [
      "/realisation/avenirea1.png",
      "/realisation/avenirea2.png",
      "/realisation/avenirea3.png",
      "/realisation/avenirea4.png",
      "/realisation/avenireamobile.png"
    ]
  },
  "2": {
    id: "2",
    title: "MusicLinks – Plateforme",
    fullTitle: "MusicLinks – Plateforme de mise en relation pour artistes et prestataires",
    image: "/realisation/musiclinkscover.png",
    tags: ["Next.js", "Supabase", "Realtime Messaging", "Mobile-first", "Marketplace"],
    description: "Marketplace mobile-first où artistes et prestataires peuvent créer un compte, se faire repérer, liker des profils et échanger directement via messagerie.",
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
  "3": {
    id: "3",
    title: "GetLazo – Marketplace de Loyalty Tests",
    fullTitle: "GetLazo – Marketplace de Loyalty Tests",
    image: "/realisation/lazocover.png",
    tags: ["Marketplace", "React", "MySQL", "Stripe", "Backend Custom"],
    description: "Plateforme complète pour orchestrer, vendre et gérer des tests de fidélité.",
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
  "4": {
    id: "4",
    title: "MusicLinks Landing Page",
    fullTitle: "MusicLinks – Landing page d'inscription connectée à Supabase",
    image: "/realisation/musicklinkslanding.png",
    tags: ["Next.js", "Supabase", "Auth", "Video player", "SQL client training"],
    description: "Landing page d'inscription avec création de compte automatisée, vidéo intégrée, et base connectée pour une plateforme musicale professionnelle.",
    stack: ["Next.js", "Supabase (auth + DB)", "Player vidéo intégré", "TailwindCSS"],
    features: [
      "Page responsive avec vidéo intégrée pour présenter le projet",
      "Formulaire de préinscription connecté à Supabase",
      "Création automatique de comptes utilisateurs dans la base",
      "Stockage structuré des leads / inscrits",
      "Interface pensée pour être autonome côté client",
      "Formation de l'équipe MusicLinks : explication du fonctionnement de la base, création de tutoriels simples (SQL, dashboard), accompagnement sur les requêtes pour exploitation quotidienne"
    ],
    summary: "Un projet simple mais complet, livré avec logique de back-end connectée. Le client peut suivre les préinscriptions, gérer ses utilisateurs et continuer à faire évoluer la plateforme en toute autonomie grâce à la documentation fournie.",
    images: [
      "/realisation/musicklinkslanding.png",
      "/realisation/musiclinkslanding2.png"
    ]
  },
  "5": {
    id: "5",
    title: "Blue Garden – Site vitrine associatif",
    fullTitle: "Blue Garden – Site vitrine associatif en React",
    image: "/realisation/blue-garden-cover.png",
    tags: ["React", "Responsive", "Contact", "CMS-less"],
    description: "Site vitrine simple et élégant pour une association, avec page contact et section événements.",
    stack: ["React", "Vite", "TailwindCSS", "EmailJS (contact)", "Static content"],
    features: [
      "Design responsive et épuré",
      "Formulaire de contact avec envoi d'e-mail",
      "Section Événements: ajout/modification simple sans base de données",
      "Pages statiques performantes (SEO-ready)"
    ],
    summary: "Un site vitrine moderne et rapide pour l'association Blue Garden, pensé pour être maintenu sans back-end lourd, avec un système simple pour publier des événements.",
    images: [
      "/realisation/bluegarden1.png",
      "/realisation/bluegarden2.png",
      "/realisation/bluegarden3.png"
    ]
  },
  "6": {
    id: "6",
    title: "Kivaiakids – Plateforme éducative",
    fullTitle: "Kivaiakids – Plateforme éducative multilingue pour enfants",
    image: "/realisation/kivaiakids1.png",
    tags: ["Next.js", "Supabase", "CMS", "Upload", "Multi-média"],
    description: "Plateforme complète d'apprentissage des langues pour enfants avec interface professeur dédiée et système de gestion de contenu.",
    stack: ["Next.js", "Supabase (auth + base de données)", "TailwindCSS", "Upload de fichiers", "Système de cours"],
    features: [
      "Interface professeur complète avec éditeur de cours intégré",
      "Système de création de cours avec éditeur de texte avancé (type Word)",
      "Upload et gestion de livres, audios et documents multimédias",
      "Organisation des cours par niveaux et catégories",
      "Interface élève intuitive et gamifiée",
      "Système de progression et de suivi des apprentissages",
      "Gestion des utilisateurs (professeurs et élèves)",
      "Design responsive optimisé pour tablettes et mobiles"
    ],
    summary: "Kivaiakids révolutionne l'apprentissage des langues pour les enfants avec une plateforme complète qui donne aux professeurs tous les outils nécessaires pour créer des cours engageants. L'interface professeur permet de gérer facilement le contenu, tandis que les enfants bénéficient d'une expérience d'apprentissage moderne et interactive.",
    images: [
      "/realisation/kivaiakids1.png",
      "/realisation/kivaiakids2.png",
      "/realisation/kivaiakids3.png",
      "/realisation/kivaiakids4.png",
      "/realisation/kivaiakids5.png",
      "/realisation/kivaiakids6.png"
    ]
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const project = projectsData[projectId as keyof typeof projectsData];
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl text-white">Projet non trouvé</h1>
          <button 
            onClick={() => navigate('/realisations')}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retour aux réalisations
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <MetaTags
        title={`${project.fullTitle} | BoostAI Consulting`}
        description={project.description}
        keywords={`${project.tags.join(', ')}, projet, développement, BoostAI`}
        image={project.image}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        
        {/* Back Button - Fixed Position */}
        <motion.button
          onClick={() => navigate('/realisations')}
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
          <section className="py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
              >
                {/* Project Header */}
                <div className="text-center mb-16 min-h-[300px] flex flex-col justify-center">
                  <motion.h1 
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400 mb-8 leading-relaxed py-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {project.fullTitle}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-purple-900/40 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Main Project Image */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mb-16"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.fullTitle}
                      className="w-full h-96 md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </motion.div>

                {/* Project Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-16"
                >
                  <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Aperçu du Projet</h2>
                    <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                      {project.summary}
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
                      texts={project.stack}
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
                    {project.features.map((feature, index) => (
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
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Galerie du Projet</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-lg font-medium">Voir l'image</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Intéressé par ce type de projet ?</h2>
                    <p className="text-gray-300 mb-6">
                      Nous pouvons créer des solutions similaires pour votre entreprise.
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
        
        <Footer />
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
                alt="Project detail"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
