import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactForm: React.FC = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@boostai.com",
      description: "Réponse sous 24h",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 6 12 34 56 78",
      description: "Lun-Ven, 9h-18h",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+33 6 12 34 56 78",
      description: "Réponse rapide",
      color: "from-green-500 to-teal-500"
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
            Parlons de votre projet
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Prêt à transformer votre business ? Contactez-nous pour discuter de vos besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Envoyez-nous un message
                </CardTitle>
                <p className="text-slate-300">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Prénom
                    </label>
                    <Input 
                      placeholder="Votre prénom"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nom
                    </label>
                    <Input 
                      placeholder="Votre nom"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type de projet
                  </label>
                  <select className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                    <option value="">Sélectionnez un type</option>
                    <option value="site">Site web</option>
                    <option value="mvp">MVP / Application</option>
                    <option value="automation">Automatisation</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                    rows={5}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 resize-none"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group">
                  Envoyer le message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Autres moyens de nous contacter
              </h3>
              
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {method.title}
                          </h4>
                          <p className="text-slate-300 font-medium mb-1">
                            {method.value}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Pourquoi nous contacter ?
                  </h4>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Consultation gratuite de 30 minutes
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Devis transparent et détaillé
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Réponse sous 24h maximum
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Aucun engagement de votre part
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
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
              Rejoignez les entreprises qui ont transformé leur business avec BoostAI
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group">
              Réserver un appel gratuit
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
