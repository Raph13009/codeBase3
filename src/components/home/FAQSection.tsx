import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText, Rocket, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQSection: React.FC = () => {
  const processSteps = [
    {
      icon: MessageCircle,
      title: "1. On échange sur vos besoins",
      description: "Appel gratuit de 30 minutes pour comprendre votre projet et vos objectifs",
      details: [
        "Analyse de vos besoins",
        "Définition des objectifs",
        "Estimation du budget",
        "Planning prévisionnel"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "2. On propose un plan clair",
      description: "Devis détaillé et transparent avec planning précis",
      details: [
        "Devis simple et clair",
        "Planning détaillé",
        "Livrables définis",
        "Modalités de paiement"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Rocket,
      title: "3. On livre rapidement",
      description: "Développement agile avec suivi régulier et livraison rapide",
      details: [
        "Développement en sprints",
        "Suivi hebdomadaire",
        "Tests et validation",
        "Livraison progressive"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: CheckCircle,
      title: "4. On reste avec vous",
      description: "Support et maintenance pour assurer le succès de votre projet",
      details: [
        "Formation d'utilisation",
        "Support technique",
        "Maintenance évolutive",
        "Optimisations continues"
      ],
      color: "from-green-500 to-emerald-500"
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
            Notre processus
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Simple, transparent et efficace. Voici comment nous travaillons ensemble
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl group h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${step.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </CardTitle>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-slate-300 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3 flex-shrink-0`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline Visualization */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-700/50 rounded-2xl p-8 border border-slate-600">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Timeline typique d'un projet
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
              
              {/* Timeline Steps */}
              <div className="space-y-8">
                {[
                  { week: "Semaine 1", title: "Découverte & Planning", description: "Analyse des besoins et définition du projet" },
                  { week: "Semaine 2-3", title: "Développement", description: "Création de votre solution avec suivi régulier" },
                  { week: "Semaine 4", title: "Tests & Livraison", description: "Validation et mise en production" },
                  { week: "Semaine 5+", title: "Support & Optimisation", description: "Accompagnement et améliorations" }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${index === 0 ? 'from-blue-500 to-cyan-500' : index === 1 ? 'from-purple-500 to-pink-500' : index === 2 ? 'from-orange-500 to-red-500' : 'from-green-500 to-emerald-500'} absolute left-1/2 transform -translate-x-1/2 z-10`}></div>
                    
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500">
                        <div className="text-sm font-semibold text-blue-400 mb-1">{item.week}</div>
                        <div className="text-white font-semibold mb-1">{item.title}</div>
                        <div className="text-slate-300 text-sm">{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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