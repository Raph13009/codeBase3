import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SuccessStories: React.FC = () => {
  const offers = [
    {
      icon: Globe,
      title: "Pack Site Web",
      price: "à partir de 199€",
      description: "Un site moderne et professionnel pour votre business",
      features: [
        "Design responsive et moderne",
        "Optimisation SEO de base",
        "Formulaire de contact",
        "Hébergement inclus 1 an",
        "Formation d'utilisation",
        "Support 30 jours"
      ],
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      icon: Smartphone,
      title: "Pack MVP",
      price: "à partir de 1 500€",
      description: "Lancez votre idée rapidement avec un produit fonctionnel",
      features: [
        "Application web complète",
        "Base de données sécurisée",
        "Authentification utilisateurs",
        "Dashboard administrateur",
        "API REST complète",
        "Support 90 jours"
      ],
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      icon: Zap,
      title: "Pack Lancement complet",
      price: "sur devis",
      description: "Site + MVP + automatisations pour un lancement optimal",
      features: [
        "Site web professionnel",
        "Application MVP complète",
        "Automatisations IA",
        "Intégrations tierces",
        "Formation équipe",
        "Support 6 mois"
      ],
      color: "from-orange-500 to-red-500",
      popular: false
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
            Nos offres
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Des solutions adaptées à chaque étape de votre business
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {offer.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Le plus populaire
                  </span>
                </div>
              )}
              
              <Card className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/50 group h-full ${offer.popular ? 'ring-2 ring-purple-500/50' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${offer.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <offer.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {offer.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mb-2">
                    {offer.price}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {offer.description}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="space-y-3 text-left mb-8">
                    {offer.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-300 text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${offer.color} hover:from-opacity-90 hover:to-opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg`}
                  >
                    Demander un devis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
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
              Besoin d'une solution sur-mesure ?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Chaque business est unique. Discutons de vos besoins spécifiques pour créer la solution parfaite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                Consultation gratuite
              </Button>
              <Button variant="outline" className="border-2 border-slate-500 text-slate-300 hover:bg-slate-700 hover:border-slate-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Voir nos réalisations
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories; 