import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText, Rocket, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQSection: React.FC = () => {
  const criteria = [
    {
      title: "Expertise technique",
      description: "Maîtrise des technologies modernes et bonnes pratiques"
    },
    {
      title: "Transparence",
      description: "Devis détaillés, planning clair, communication régulière"
    },
    {
      title: "Références",
      description: "Portfolio de projets réussis et témoignages clients"
    },
    {
      title: "Support",
      description: "Accompagnement post-livraison et maintenance continue"
    }
  ];

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
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
            Comment choisir une agence web fiable ?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Découvrez notre processus transparent et les critères pour choisir la meilleure agence web
          </p>
        </motion.div>

        {/* Modern Criteria Display */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {criteria.map((criterion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-6 h-full hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {criterion.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {criterion.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center text-xs text-slate-500">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-2"></div>
                      Critère essentiel
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Réservez votre appel gratuit de 30 minutes pour discuter de vos besoins
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                Réserver un appel gratuit
              </button>
              <button className="border-2 border-slate-500 text-slate-300 hover:bg-slate-700 hover:border-slate-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Voir nos réalisations
              </button>
            </div>
      </div>
        </motion.div>
    </div>
  </section>
  );
};

export default FAQSection; 