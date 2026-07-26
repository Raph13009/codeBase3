import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BoostAIMark from '@/components/brand/BoostAIMark';
import Stepper, { Step } from '@/components/ui/Stepper';
import MetaTags from '@/components/seo/MetaTags';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'fr';
    window.scrollTo(0, 0);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const nextButton = document.querySelector('[data-stepper-next]') as HTMLButtonElement;
        if (nextButton && !nextButton.disabled) {
          nextButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
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
      <div className="lumio-page min-h-screen bg-[#FAF9F5] text-[#1B1B1B]">
        <Header />

        <main className="relative z-10 pt-32 md:pt-36">
          <section className="pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-6 text-xs uppercase tracking-[0.24em] text-[#8C8880]"
                >
                  Consultation Gratuite
                </motion.p>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-[#1B1B1B]"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Transformez Votre Entreprise
                  <span className="block text-[#1B1B1B]">Avec l&apos;IA</span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-[#8C8880] mb-12 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Obtenez une{' '}
                  <span className="text-[#1B1B1B] font-semibold">consultation gratuite</span> et
                  découvrez comment nos solutions IA peuvent révolutionner vos opérations en moins
                  de 2 minutes
                </motion.p>
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Stepper
                  variant="light"
                  initialStep={1}
                  onStepChange={(step) => {
                    console.log(step);
                    setCurrentStep(step);
                    setShowNameError(false);
                    setShowEmailError(false);
                  }}
                  onFinalStepCompleted={async () => {
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

                      if (!isSubmitting) {
                        setIsSubmitting(true);
                        (async () => {
                          try {
                            const formData = new FormData();
                            formData.append('name', name.trim());
                            formData.append('email', email.trim());
                            formData.append('message', message.trim() || '(Aucun message)');
                            formData.append(
                              '_subject',
                              'Nouveau message depuis le formulaire de contact'
                            );
                            formData.append('_captcha', 'false');

                            const response = await fetch(
                              'https://formsubmit.co/raphael@boostaiconsulting.com',
                              {
                                method: 'POST',
                                body: formData,
                              }
                            );

                            if (response.ok) {
                              console.log('Email sent successfully');
                              setIsSubmitting(false);
                              return true;
                            } else {
                              console.error('Error sending email:', response.statusText);
                              alert(
                                "Erreur lors de l'envoi du message. Veuillez réessayer."
                              );
                              setIsSubmitting(false);
                              return false;
                            }
                          } catch (error) {
                            console.error('Error sending email:', error);
                            alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
                            setIsSubmitting(false);
                            return false;
                          }
                        })();
                      }
                    }
                    return true;
                  }}
                  backButtonText="Précédent"
                  nextButtonText={isSubmitting ? 'Enregistrement...' : 'Suivant'}
                  backButtonProps={{
                    className:
                      'duration-350 rounded-full px-4 py-2 text-[#8C8880] transition hover:text-[#1B1B1B] hover:underline',
                  }}
                  nextButtonProps={{
                    disabled: isSubmitting,
                    className: `duration-350 flex items-center justify-center rounded-full py-2.5 px-5 font-medium tracking-tight transition-all ${
                      isSubmitting
                        ? 'bg-[#D9D7D0] text-[#8C8880] cursor-not-allowed opacity-70'
                        : 'bg-black text-[#FAF9F5] hover:opacity-90'
                    }`,
                  }}
                >
                  <Step>
                    <div className="text-center">
                      <div className="mb-6 flex justify-center">
                        <BoostAIMark size={64} variant="onLight" to={false} />
                      </div>
                      <h2
                        className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 tracking-tight"
                        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                      >
                        Bienvenue chez BoostAI !
                      </h2>
                      <p className="text-[#8C8880] text-lg">
                        Expliquez-nous votre besoin, nous vous recontacterons rapidement.
                      </p>
                    </div>
                  </Step>
                  <Step>
                    <h2
                      className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 tracking-tight"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      Comment vous appelez-vous ? *
                    </h2>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex. Marie Dupont"
                      required
                      className="w-full p-4 bg-white border border-[#D9D7D0] text-[#1B1B1B] rounded-xl placeholder:text-[#8C8880] focus:border-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#1B1B1B]/10 transition-all text-lg"
                    />
                    {showNameError && name.trim() === '' && (
                      <p className="text-[#FF416C] text-sm mt-2">Le nom est obligatoire</p>
                    )}
                  </Step>
                  <Step>
                    <h2
                      className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 tracking-tight"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      Parlez-nous un peu de votre projet
                    </h2>
                    <p className="text-[#8C8880] mb-4">
                      Quelques lignes suffisent pour comprendre vos besoins.
                    </p>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex. Je veux lancer une marketplace pour..."
                      rows={4}
                      className="w-full p-4 bg-white border border-[#D9D7D0] text-[#1B1B1B] rounded-xl placeholder:text-[#8C8880] focus:border-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#1B1B1B]/10 transition-all text-lg resize-none"
                    />
                  </Step>
                  <Step>
                    <h2
                      className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 tracking-tight"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      Votre meilleure adresse pour échanger *
                    </h2>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@email.com"
                      required
                      className="w-full p-4 bg-white border border-[#D9D7D0] text-[#1B1B1B] rounded-xl placeholder:text-[#8C8880] focus:border-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#1B1B1B]/10 transition-all text-lg"
                    />
                    {showEmailError && email.trim() === '' && (
                      <p className="text-[#FF416C] text-sm mt-2">L&apos;email est obligatoire</p>
                    )}
                    {showEmailError && email.trim() !== '' && !email.includes('@') && (
                      <p className="text-[#FF416C] text-sm mt-2">
                        Veuillez entrer un email valide
                      </p>
                    )}
                  </Step>
                  <Step>
                    <div className="text-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          >
                            <svg
                              className="w-8 h-8 text-[#FAF9F5]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                      <h2
                        className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4 tracking-tight"
                        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                      >
                        Merci !
                      </h2>
                      <p className="text-[#8C8880] text-lg">
                        Votre demande a bien été envoyée. Nous revenons vers vous rapidement.
                      </p>
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
