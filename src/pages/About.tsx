import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetaTags from '@/components/seo/MetaTags';
import ProfileCard from '@/components/ui/ProfileCard';
import ContactPopup from '@/components/ui/ContactPopup';

const About: React.FC = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'fr';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaTags
        title="À propos | BoostAI Consulting"
        description="Meet Raphaël, le consultant derrière BoostAI. Studio tech & IA pour PME et startups."
        keywords="BoostAI, à propos, consultant IA, développement web"
      />

      <div className="lumio-page min-h-screen bg-[#FAF9F5] text-[#1B1B1B]">
        <Header />

        <main className="relative z-10 pt-36 pb-10 px-6 md:px-10">
          <section className="max-w-6xl mx-auto text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              BoostAI, c&apos;est avant tout une histoire humaine
            </motion.h1>
          </section>

          <section className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              <div className="lg:w-1/2 flex justify-center w-full">
                <ProfileCard
                  name="Raphaël L."
                  title="Expert Web & IA"
                  handle="BoostAI_Consulting"
                  status="Ouvert aux projets"
                  contactText="Me Contacter"
                  avatarUrl="/images/raph-pp.png"
                  miniAvatarUrl="/images/raph-pp.png"
                  behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(0,0%,95%,0.5) 4%,hsla(0,0%,80%,0.2) 50%,transparent 100%)"
                  innerGradient="linear-gradient(145deg,#E9E8E4 0%,#FFFDF8 100%)"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => setIsContactPopupOpen(true)}
                />
              </div>

              <div className="lg:w-1/2 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="space-y-6"
                >
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    Comment tout a commencé
                  </h2>

                  <div className="space-y-4 text-[#8C8880] leading-relaxed text-lg">
                    <p>
                      J&apos;ai commencé à coder en 2019, après avoir passé 5 jours à galérer sur le site
                      d&apos;assurance Ameli qui buggait sans arrêt. Perdre autant de temps juste pour
                      déposer un PDF m&apos;a tellement énervé que je me suis dit : &quot;je vais le
                      refaire et leur envoyer&quot;. Depuis ce jour, je n&apos;ai jamais lâché. Quand
                      j&apos;ai découvert les outils no-code et vibe code, j&apos;ai compris qu&apos;on
                      pouvait créer vite, bien et sans se perdre dans la complexité.
                    </p>
                    <p>
                      Aujourd&apos;hui, je construis BoostAI pour aider les entreprises à avancer sans
                      perdre de temps. Je travaille avec un réseau de développeurs passionnés, toujours
                      à la pointe et ouverts aux nouvelles idées.
                    </p>
                    <p>
                      Ce qui me motive ? L&apos;automatisation, l&apos;IA, et cette idée simple : chaque
                      projet que je livre doit vraiment ressembler à son client.
                    </p>
                  </div>
                </motion.div>
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
