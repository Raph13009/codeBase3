import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetaTags from '@/components/seo/MetaTags';
import ProfileCard from '@/components/ui/ProfileCard';
import ContactPopup from '@/components/ui/ContactPopup';
import TextType from '@/components/ui/TextType';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    // Set document language to English
    document.documentElement.lang = 'en';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags 
        title="About Raphaël | BoostAI Consulting - Independent AI Consultant"
        description="Meet Raphaël, the independent AI consultant behind BoostAI. Turning chaos into clarity with AI, coffee, and practical solutions that actually work."
        keywords="AI consultant, independent consultant, digital transformation, business automation, startup MVP, SME solutions"
      />
      
      <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <Header />
        
        <main className="relative z-10 pt-32 pb-20">
          {/* Hero Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white leading-tight">
                  BoostAI, c'est avant tout une histoire humaine
                </h1>
              </motion.div>
            </div>
          </section>

          {/* Profile Card Section */}
          <section className="px-4 md:px-6 mb-20">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                {/* Profile Card - Left side on desktop, top on mobile */}
                <div className="lg:w-1/2 flex justify-center">
                  <ProfileCard
                    name="Raphaël L."
                    title="Expert Web & IA"
                    handle="BoostAI_Consulting"
                    status="Ouvert aux projets"
                    contactText="Me Contacter"
                    avatarUrl="/images/raph-pp.png"
                    miniAvatarUrl="/images/raph-pp.png"
                    behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)"
                    innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => setIsContactPopupOpen(true)}
                  />
                </div>

                {/* Text Content - Right side on desktop, bottom on mobile */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                      <TextType
                        as="span"
                        text={["Comment tout a commencé"]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                      />
                    </h2>
                    
                    <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                      <p>
                        J'ai commencé à coder en 2019, après avoir passé 5 jours à galérer sur le site d'assurance Ameli qui buggait sans arrêt. Perdre autant de temps juste pour déposer un PDF m'a tellement énervé que je me suis dit : "je vais le refaire et leur envoyer". Depuis ce jour, je n'ai jamais lâché. Quand j'ai découvert les outils no-code et vibe code, j'ai compris qu'on pouvait créer vite, bien et sans se perdre dans la complexité.
                      </p>
                      
                      <p>
                        Aujourd'hui, je construis BoostAI pour aider les entreprises à avancer sans perdre de temps. Je travaille avec un réseau de développeurs passionnés, toujours à la pointe et ouverts aux nouvelles idées.
                      </p>
                      
                      <p>
                        Ce qui me motive ? L'automatisation, l'IA, et cette idée simple : chaque projet que je livre doit vraiment ressembler à son client.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        
        <ContactPopup 
          isOpen={isContactPopupOpen}
          onClose={() => setIsContactPopupOpen(false)}
        />
      </div>
    </>
  );
};

export default About; 