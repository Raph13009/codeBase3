import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Stepper, { Step } from '@/components/ui/Stepper';
import MetaTags from '@/components/seo/MetaTags';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  
  useEffect(() => {
    // Set document language to French
    document.documentElement.lang = 'fr';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Event listener pour la touche Entrée
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        // Trouver le bouton Suivant et le cliquer
        const nextButton = document.querySelector('[data-stepper-next]') as HTMLButtonElement;
        if (nextButton && !nextButton.disabled) {
          nextButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <MetaTags
        title="Contactez-Nous | BoostAI Consulting - Consultation Gratuite IA"
        description="Contactez nos experts IA pour une consultation gratuite. Transformez votre entreprise avec des solutions IA sur-mesure. Réponse garantie sous 24h."
        keywords="contact IA, consultation gratuite, transformation digitale, chatbots, optimisation SEO, création contenu, développement web, BoostAI Consulting"
      />
      <div className="min-h-screen relative overflow-x-hidden bg-[#0B0D14]">
        <Header />
        
        <main className="relative z-10">
          {/* Hero Section avec Stepper */}
          <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Titre SEO et vendeur */}
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-6"
                >
                  <span className="inline-block bg-gradient-to-r from-purple-500/10 to-blue-600/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    🚀 Consultation Gratuite
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Transformez Votre Entreprise
                  <span className="block text-gradient bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    Avec l'IA
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Obtenez une <span className="text-purple-400 font-semibold">consultation gratuite</span> et découvrez comment nos solutions IA peuvent révolutionner vos opérations en moins de 2 minutes
                </motion.p>
                </motion.div>

              {/* Stepper au milieu */}
                <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                                  <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                      console.log(step);
                      setCurrentStep(step);
                      // Réinitialiser les erreurs quand on change d'étape
                      setShowNameError(false);
                      setShowEmailError(false);
                    }}
                    onFinalStepCompleted={async () => {
                      // L'étape 5 ne fait que montrer la confirmation
                      setIsSubmitted(true);
                    }}
                    validateStep={(step) => {
                      if (step === 2) {
                        if (!name.trim()) {
                          setShowNameError(true);
                          return false;
                        }
                      } else if (step === 4) {
                        if (!email.trim() || !email.includes('@')) {
                          setShowEmailError(true);
                          return false;
                        }
                        
                        // Envoyer les données à l'étape 4 via FormSubmit
                        if (!isSubmitting) {
                          setIsSubmitting(true);
                          (async () => {
                            try {
                              const formData = new FormData();
                              formData.append('name', name.trim());
                              formData.append('email', email.trim());
                              formData.append('message', message.trim() || '(Aucun message)');
                              formData.append('_subject', 'Nouveau message depuis le formulaire de contact');
                              formData.append('_captcha', 'false');
                              
                              const response = await fetch('https://formsubmit.co/raphael@boostaiconsulting.com', {
                                method: 'POST',
                                body: formData
                              });
                              
                              if (response.ok) {
                                console.log('Email sent successfully');
                                setIsSubmitting(false);
                                return true;
                              } else {
                                console.error('Error sending email:', response.statusText);
                                alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                                setIsSubmitting(false);
                                return false;
                              }
                            } catch (error) {
                              console.error("Error sending email:", error);
                              alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                              setIsSubmitting(false);
                              return false;
                            }
                          })();
                        }
                      }
                      return true;
                    }}
                    backButtonText="Précédent"
                    nextButtonText={isSubmitting ? "Enregistrement..." : "Suivant"}
                    nextButtonProps={{
                      disabled: isSubmitting,
                      className: `duration-350 flex items-center justify-center rounded-full py-2 px-4 font-medium tracking-tight text-white transition-all shadow-lg hover:shadow-xl ${
                        isSubmitting
                          ? 'bg-gray-500 cursor-not-allowed opacity-50'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:from-purple-800 active:to-blue-800'
                      }`
                    }}
                  >
                  <Step>
                    <div className="text-center">
                      <div className="mb-6">
                        <img src="/images/favicon.png" alt="BoostAI" className="w-16 h-16 mx-auto mb-4" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Bienvenue chez BoostAI !</h2>
                      <p className="text-slate-300 text-lg">Expliquez-nous votre besoin, nous vous recontacterons rapidement.</p>
                    </div>
                  </Step>
                  <Step>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Comment vous appelez-vous ? *</h2>
                    <input 
                      type="text"
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Ex. Marie Dupont" 
                      required
                      className="w-full p-4 bg-slate-700 border border-slate-600 text-white rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-lg"
                    />
                    {showNameError && name.trim() === '' && (
                      <p className="text-red-400 text-sm mt-2">Le nom est obligatoire</p>
                    )}
                  </Step>
                  <Step>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Parlez-nous un peu de votre projet</h2>
                    <p className="text-slate-300 mb-4">Quelques lignes suffisent pour comprendre vos besoins.</p>
                    <textarea 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="Ex. Je veux lancer une marketplace pour..." 
                      rows={4}
                      className="w-full p-4 bg-slate-700 border border-slate-600 text-white rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-lg resize-none"
                    />
                  </Step>
                  <Step>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Votre meilleure adresse pour échanger *</h2>
                    <input 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="vous@email.com" 
                      required
                      className="w-full p-4 bg-slate-700 border border-slate-600 text-white rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-lg"
                    />
                    {showEmailError && email.trim() === '' && (
                      <p className="text-red-400 text-sm mt-2">L'email est obligatoire</p>
                    )}
                    {showEmailError && email.trim() !== '' && !email.includes('@') && (
                      <p className="text-red-400 text-sm mt-2">Veuillez entrer un email valide</p>
                    )}
                  </Step>
                  <Step>
                    <div className="text-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          >
                            <span className="text-3xl">✅</span>
                          </motion.div>
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Merci !</h2>
                      <p className="text-slate-300 text-lg">Votre demande a bien été envoyée. Nous revenons vers vous rapidement.</p>
                    </div>
                  </Step>
                </Stepper>
                  </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
