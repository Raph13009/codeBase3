import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import MetaTags from "@/components/seo/MetaTags";
import { NavLink } from "react-router-dom";

const OcrTerms: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = "fr";
    window.scrollTo(0, 0);

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  return (
    <>
      <MetaTags
        title="Conditions d'utilisation OCR | BoostAI Consulting"
        description="Informations relatives au traitement, à la conservation temporaire et à la confidentialité des documents transmis via l'outil OCR de BoostAI Consulting."
        keywords="OCR, confidentialité, conditions d'utilisation, protection des données, BoostAI Consulting"
      />

      <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(90,74,111,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(61,47,87,0.24),transparent_28%),linear-gradient(180deg,#09090d_0%,#111118_100%)]">
        <Header />

        <main className="relative z-10 flex h-[calc(100vh-96px)] items-center px-5 pb-6 pt-28 md:px-10 md:pb-10 md:pt-32">
          <section className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="flex max-w-3xl flex-col justify-center">
              <div className="text-xs uppercase tracking-[0.24em] text-white">Conditions OCR</div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
                Traitement et confidentialité des données OCR
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white">
                Transparence sur la conservation temporaire des informations extraites par l'outil, avec un cadre strictement
                interne, confidentiel et orienté vers l'amélioration du service.
              </p>
              <div className="mt-8">
                <NavLink
                  to="/Convert"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/6 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
                >
                  Retour à l'outil OCR
                </NavLink>
              </div>
            </div>

            <div className="grid gap-5 text-[15px] leading-7 text-white md:text-base md:leading-8">
              <div>
                Dans le cadre de l'utilisation de notre outil OCR, certains documents transmis ainsi que les informations qui en
                sont extraites peuvent être conservés pour une durée limitée et strictement proportionnée à des finalités
                techniques d'analyse, de contrôle qualité et d'amélioration continue du service.
              </div>

              <div>
                Ces données sont utilisées exclusivement par BoostAI Consulting afin d'améliorer la précision des traitements, la
                fiabilité des extractions et la performance globale de l'outil. Elles ne sont en aucun cas cédées, revendues,
                louées ou communiquées à des tiers à des fins commerciales.
              </div>

              <div>
                L'accès à ces informations est limité aux seules personnes habilitées lorsque cela est nécessaire pour la
                maintenance, la sécurité ou l'optimisation du service. Nous appliquons une logique de minimisation des données et
                veillons à ne conserver que les éléments utiles pendant la durée nécessaire.
              </div>

              <div>
                En utilisant l'outil, vous reconnaissez cette possibilité de conservation temporaire dans un cadre exclusivement
                interne, avec un engagement explicite de confidentialité, de non-partage et de non-commercialisation des données
                auprès de tiers.
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default OcrTerms;
