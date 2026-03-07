import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Mail, Code, Zap, Users, Star, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GrainientSection from '@/components/GrainientSection';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaTags from '@/components/seo/MetaTags';
import TextType from '@/components/ui/TextType';

const GuideVibeCoding: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Enregistrer dans Supabase
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            email: email,
            source: 'tuto',
            createdat: new Date().toISOString(),
          }
        ]);

      if (supabaseError) throw supabaseError;

      // 2. Envoyer à MailerLite
      const mailerliteToken = import.meta.env.VITE_MAILERLITE_TOKEN;
      console.log('MailerLite token exists:', !!mailerliteToken);
      console.log('MailerLite token preview:', mailerliteToken ? `${mailerliteToken.substring(0, 10)}...` : 'undefined');
      
      if (!mailerliteToken) {
        console.error('MailerLite token not configured. Please add VITE_MAILERLITE_TOKEN to your .env file');
      } else {
        const mailerliteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mailerliteToken}`,
          },
          body: JSON.stringify({
            email: email,
            groups: ['161527665974576689'] // ID du groupe au lieu du nom
          }),
        });

        if (!mailerliteResponse.ok) {
          const errorText = await mailerliteResponse.text();
          console.error('MailerLite error:', errorText);
          console.error('MailerLite status:', mailerliteResponse.status);
        } else {
          console.log('MailerLite success');
        }
      }

      toast({
        title: "Email enregistré !",
        description: "Vous pouvez maintenant télécharger le tuto.",
      });

      setCurrentStep(2);
      setEmail('');
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    setCurrentStep(3);
    // Confirmation que l'utilisateur a accès au tuto
    toast({
      title: "Parfait !",
      description: "Vous avez maintenant accès à votre tuto par email.",
    });
  };

  const steps = [
    {
      id: 1,
      title: "Entrez votre email",
      description: "Saisissez votre email pour accéder instantanément au tuto",
      icon: Mail,
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      id: 2,
      title: "Téléchargez le tuto",
      description: "Accédez au tuto complet en PDF",
      icon: Download,
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      id: 3,
      title: "Commencez à créer votre site",
      description: "Appliquez les techniques du tuto",
      icon: Code,
      completed: currentStep > 3,
      current: currentStep === 3,
    },
  ];

  return (
    <>
      <MetaTags 
        title="Tuto gratuit Vibe Coding - Créer un site web moderne sans coder (2025) | BoostAI"
        description="Téléchargez gratuitement le tuto complet pour créer un site web moderne sans coder. Techniques, outils et bonnes pratiques pour 2025. Tuto pratique et gratuit."
        keywords="tuto gratuit vibe coding, créer site web sans coder, no-code tuto, développement web 2025, outils no-code, tuto gratuit, création site internet"
      />
      <GoogleAnalytics />
      
      <div className="text-white">
        <main className="relative z-10">
          {/* Hero Section */}
          <GrainientSection variant="a">
          <Header />
          <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Laptop Mockup - Mobile: bottom, Desktop: left */}
                <motion.div 
                  className="order-2 lg:order-1 flex justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    {/* Badge flottant au-dessus du laptop */}
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-blue-500/30">
                        ✨ Exemple de site créé avec notre méthode
                      </div>
                    </motion.div>

                    {/* Laptop Mockup with Image */}
                    <div className="relative">
                      {/* Base Laptop Image */}
                      <img 
                        src="/mockup-laptop.png" 
                        alt="Laptop Mockup" 
                        className="w-[500px] h-auto relative z-10"
                      />
                      
                      {/* Video Overlay on Screen */}
                      <div className="absolute top-[6%] left-[12%] right-[12%] bottom-[15%] z-20 overflow-hidden">
                        <video
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                          loop
                          autoPlay
                        >
                          <source src="/teaser-mockupLaptop.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 -z-10"></div>
                  </div>
                </motion.div>

                {/* Stepper - Mobile: top, Desktop: right */}
                <motion.div 
                  className="order-1 lg:order-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-8">
                    {/* H1 Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight h-32">
                      <TextType
                        as="span"
                        text={["Crée ton site web moderne sans coder – Tuto gratuit 2025"]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        className="block"
                      />
                    </h1>

                    {/* Stepper */}
                    <div className="space-y-6">
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {/* Step Icon */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-500' 
                              : step.current 
                                ? 'bg-blue-500' 
                                : 'bg-gray-600'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <step.icon className="w-6 h-6 text-white" />
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${
                              step.current ? 'text-white' : 'text-gray-300'
                            }`}>
                              {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                              {step.description}
                            </p>

                            {/* Step 1: Email Form */}
                            {step.current && step.id === 1 && (
                              <form onSubmit={handleEmailSubmit} className="mt-4 space-y-4">
                                <div>
                                  <Label htmlFor="email" className="text-white">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="mt-2 bg-slate-800 border-slate-600 text-white"
                                    required
                                  />
                                </div>
                                <Button 
                                  type="submit" 
                                  disabled={isLoading}
                                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isLoading ? "Envoi..." : "Accéder au tuto"}
                                </Button>
                              </form>
                            )}

                            {/* Step 2: Download Button */}
                            {step.current && step.id === 2 && (
                              <div className="mt-4 space-y-3">
                                <Button 
                                  onClick={handleDownload}
                                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                >
                                  📩 J'ai accès à mon tuto
                                </Button>
                                
                                <div className="text-center">
                                  <p className="text-slate-400 text-sm mb-2">
                                    Vous n'avez pas reçu le tuto ?
                                  </p>
                                  <a 
                                    href="mailto:contact@boostaiconsulting.com?subject=Je n'ai pas reçu le tuto gratuit"
                                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                                  >
                                    Contacter le support
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Step 3: Success */}
                            {step.current && step.id === 3 && (
                              <div className="mt-4">
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Tuto téléchargé !
                                </Badge>
                                <p className="text-gray-400 text-sm mt-2">
                                  Vous pouvez maintenant commencer à créer votre site web.
                                </p>
                                <Button 
                                  onClick={() => setCurrentStep(1)}
                                  variant="outline"
                                  className="mt-3 w-full border-slate-400 text-slate-100 hover:bg-slate-600 hover:text-white hover:border-slate-300 bg-slate-800/50"
                                >
                                  🎉 Terminé !
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          </GrainientSection>

          {/* Pourquoi télécharger ce guide ? */}
          <GrainientSection variant="b">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Pourquoi télécharger ce guide ?
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Découvrez les techniques modernes pour créer des sites web professionnels sans écrire une ligne de code.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "Rapide et efficace",
                    description: "Créez votre site en quelques heures au lieu de semaines"
                  },
                  {
                    icon: Code,
                    title: "Aucun code requis",
                    description: "Utilisez des outils visuels intuitifs et modernes"
                  },
                  {
                    icon: Users,
                    title: "Résultats professionnels",
                    description: "Des sites qui rivalisent avec ceux des développeurs"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-700 border-slate-600">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-300">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          </GrainientSection>

          {/* Ce que tu vas apprendre */}
          <GrainientSection variant="a">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ce que tu vas apprendre
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  "Choisir les meilleurs outils no-code pour votre projet",
                  "Structurer votre site web de manière professionnelle",
                  "Optimiser votre site pour le SEO et la performance",
                  "Intégrer des formulaires et des fonctionnalités avancées",
                  "Personnaliser le design selon votre marque",
                  "Déployer votre site en ligne facilement",
                  "Maintenir et faire évoluer votre site",
                  "Analyser les performances de votre site"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          </GrainientSection>

          {/* Qui est derrière ce guide ? */}
          <GrainientSection variant="b">
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Qui est derrière ce guide ?
                </h2>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-slate-800 rounded-xl p-8"
                >
                  <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                    <img 
                      src="/raphael.png" 
                      alt="Raphaël Levy" 
                      className="w-24 h-24 rounded-full"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">Raphaël Levy</h3>
                      <p className="text-slate-300 mb-4">
                        Développeur web et entrepreneur depuis 2019. J'ai créé plus de 50 sites web et applications pour des clients du monde entier.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge className="bg-blue-500">Développeur Web</Badge>
                        <Badge className="bg-green-500">Entrepreneur</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          </GrainientSection>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default GuideVibeCoding; 