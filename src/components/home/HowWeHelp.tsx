import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceTiltedCard from '@/components/ui/ServiceTiltedCard';

const HowWeHelp: React.FC = () => {
  const services = [
    {
      icon: Globe,
      title: "Agence web – Sites modernes et rapides",
      description: "Boostez votre présence en ligne avec un site optimisé qui attire vos premiers clients.",
      features: ["Design responsive", "SEO optimisé", "Performance maximale"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Développement web sur-mesure – De l'idée au produit",
      description: "Transformez votre idée en un produit digital performant (MVP, marketplace, outil métier).",
      features: ["On clarifie votre idée", "Prototype rapide", "Lancement express"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Accompagnement digital – Automatisations & IA",
      description: "Automatisez vos processus et intégrez des assistants IA pour gagner du temps et augmenter vos résultats.",
      features: ["Vos tâches répétitives, terminées", "Assistant IA intégré", "Productivité boostée"],
      color: "from-orange-500 to-red-500"
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
            Comment choisir son agence web ?
            </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Découvrez pourquoi choisir une agence web spécialisée comme BoostAI pour votre projet digital
            </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="h-[400px]"
            >
              <ServiceTiltedCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                color={service.color}
                containerHeight="100%"
                scaleOnHover={1.05}
                rotateAmplitude={8}
              />
            </motion.div>
          ))}
            </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-300 mb-6 text-lg">
            Besoin d'un devis pour votre projet web ? Audit gratuit de votre site existant ?
              </p>
          <Link 
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Demander un devis agence web
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeHelp; 