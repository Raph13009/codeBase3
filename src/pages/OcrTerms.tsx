import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MetaTags from '@/components/seo/MetaTags';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const OcrTerms: React.FC = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.lang = 'fr';
    window.scrollTo(0, 0);

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    if (!isMobile) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [isMobile]);

  return (
    <>
      <MetaTags
        title="Conditions d'utilisation OCR | BoostAI Consulting"
        description="Informations relatives au traitement, à la conservation temporaire et à la confidentialité des documents transmis via l'outil OCR de BoostAI Consulting."
        keywords="OCR, confidentialité, conditions d'utilisation, protection des données, BoostAI Consulting"
      />

      <div className="lumio-page min-h-screen bg-[#FAF9F5] text-[#1B1B1B]">
        <Header />

        <main className="relative z-10 flex min-h-[calc(100vh-96px)] items-start px-5 pb-10 pt-36 md:px-10">
          <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="flex max-w-3xl flex-col justify-center">
              <div className="text-xs uppercase tracking-[0.24em] text-[#8C8880]">Conditions OCR</div>
              <h1
                className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Traitement et confidentialité des données OCR
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#8C8880]">
                Transparence sur la conservation temporaire des informations extraites par l&apos;outil,
                avec un cadre strictement interne, confidentiel et orienté vers l&apos;amélioration du
                service.
              </p>
              <div className="mt-8">
                <Link
                  to="/Convert"
                  className="inline-flex items-center rounded-full border border-[#1B1B1B]/20 bg-white px-5 py-2.5 text-sm text-[#1B1B1B] transition hover:bg-black hover:text-[#FAF9F5]"
                >
                  Retour à l&apos;outil OCR
                </Link>
              </div>
            </div>

            <div className="grid gap-5 rounded-[32px] border border-[#D9D7D0]/40 bg-white p-8 text-[15px] leading-7 text-[#8C8880] shadow-sm md:text-base md:leading-8">
              <div>
                Dans le cadre de l&apos;utilisation de notre outil OCR, certains documents transmis ainsi
                que les informations qui en sont extraites peuvent être conservés pour une durée limitée
                et strictement proportionnée à des finalités techniques d&apos;analyse, de contrôle
                qualité et d&apos;amélioration continue du service.
              </div>
              <div>
                Ces données sont utilisées exclusivement par BoostAI Consulting afin d&apos;améliorer la
                précision des traitements, la fiabilité des extractions et la performance globale de
                l&apos;outil. Elles ne sont en aucun cas cédées, revendues, louées ou communiquées à des
                tiers à des fins commerciales.
              </div>
              <div>
                L&apos;accès à ces informations est limité aux seules personnes habilitées lorsque cela
                est nécessaire pour la maintenance, la sécurité ou l&apos;optimisation du service. Nous
                appliquons une logique de minimisation des données et veillons à ne conserver que les
                éléments utiles pendant la durée nécessaire.
              </div>
              <div>
                En utilisant l&apos;outil, vous reconnaissez cette possibilité de conservation temporaire
                dans un cadre exclusivement interne, avec un engagement explicite de confidentialité, de
                non-partage et de non-commercialisation des données auprès de tiers.
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OcrTerms;
