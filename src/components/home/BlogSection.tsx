import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BlogSection: React.FC = () => {
  const projects = [
    {
      title: "Blue Garden - Site e-commerce",
      description: "Site moderne pour une boutique de jardinage avec système de commande automatisé",
      before: "Site WordPress basique, pas de commandes en ligne",
      after: "Site moderne avec +150% de ventes en ligne",
      testimonial: "Le site est exactement ce que j'avais en tête. Clean, moderne et parfaitement aligné avec l'esprit Blue Garden. Je suis fier de le partager avec mes clients.",
      client: "Nacia, Directrice Blue Garden",
      image: "/images/bluegarden.png",
      metrics: {
        sales: "+150%",
        time: "-80%",
        satisfaction: "5/5"
      }
    },
    {
      title: "Codig - Automatisation comptable",
      description: "Outil OCR intelligent pour automatiser la saisie des factures",
      before: "30 minutes de saisie manuelle par jour",
      after: "Traitement automatique en quelques secondes",
      testimonial: "Énorme merci pour l'outil OCR, je perdais plus de 30 minutes à saisir manuellement les données. Maintenant c'est fait en quelques secondes. Merci beaucoup.",
      client: "Sophie, Responsable comptabilité Codig",
      image: "/images/CodigLogo.png",
      metrics: {
        time: "-95%",
        accuracy: "99%",
        satisfaction: "5/5"
      }
    },
    {
      title: "MusicLinks - Marketplace MVP",
      description: "Plateforme de mise en relation musiciens/professionnels",
      before: "Idée sur papier, pas de produit",
      after: "MVP fonctionnel avec utilisateurs actifs",
      testimonial: "Raphaël m'a aidé à construire le MVP de MusicLinks. Il a livré une marketplace propre et fonctionnelle avec une base de données bien structurée. C'était exactement ce dont j'avais besoin pour lancer.",
      client: "Nicolas, CEO MusicLinks",
      image: "/images/musicLinks.png",
      metrics: {
        users: "500+",
        time: "3 semaines",
        satisfaction: "5/5"
      }
    }
  ];

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nos réalisations
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Des projets concrets qui ont transformé le business de nos clients
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-700/50 border-slate-600 hover:border-slate-500 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-600 flex items-center justify-center overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-white mb-2">
                          {project.title}
                        </CardTitle>
                        <p className="text-slate-300">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="flex gap-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-white">{value}</div>
                          <div className="text-xs text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Before/After */}
                    <div className="space-y-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h4 className="font-semibold text-red-400 mb-2">Avant</h4>
                        <p className="text-slate-300 text-sm">{project.before}</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="font-semibold text-green-400 mb-2">Après</h4>
                        <p className="text-slate-300 text-sm">{project.after}</p>
                      </div>
                    </div>
                    
                    {/* Testimonial */}
                    <div className="bg-slate-600/30 rounded-lg p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-slate-300 text-sm italic mb-4">
                        "{project.testimonial}"
                      </blockquote>
                      <cite className="text-slate-400 text-sm font-semibold not-italic">
                        — {project.client}
                      </cite>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à rejoindre nos clients satisfaits ?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Découvrez comment nous pouvons transformer votre business avec des solutions sur-mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
                Démarrer votre projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-slate-500 text-slate-300 hover:bg-slate-700 hover:border-slate-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                Voir plus de projets
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 