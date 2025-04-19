
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface FAQItem {
  question: string;
  explanation: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Qu'est-ce qu'un chatbot IA et comment peut-il aider mon entreprise ?",
      explanation: "Un chatbot intelligent est un assistant virtuel qui utilise l'intelligence artificielle pour communiquer avec vos clients en langage naturel. Il peut répondre aux questions fréquentes, qualifier des leads, fournir une assistance 24/7 et améliorer l'expérience utilisateur sur votre site. Cela permet de réduire les coûts de support client tout en augmentant la satisfaction."
    },
    {
      question: "Comment la solution SEO Boost peut-elle améliorer mon référencement ?",
      explanation: "SEO Boost utilise l'intelligence artificielle pour analyser votre site web, votre contenu et votre positionnement actuel. La solution identifie les opportunités d'optimisation, suggère des améliorations techniques, crée du contenu optimisé pour le SEO et surveille votre progression. Le résultat est une meilleure visibilité dans les moteurs de recherche et une augmentation du trafic organique."
    },
    {
      question: "Les solutions sont-elles personnalisées selon les besoins spécifiques de mon entreprise ?",
      explanation: "Absolument. Toutes nos solutions IA sont entièrement personnalisables pour répondre aux besoins spécifiques de votre entreprise. Nous commençons par une analyse approfondie de vos objectifs, votre audience et votre secteur d'activité, puis nous configurons nos outils pour s'aligner parfaitement avec votre stratégie et votre image de marque."
    },
    {
      question: "Combien de temps faut-il pour voir des résultats avec vos solutions ?",
      explanation: "Les délais varient selon les solutions et vos objectifs. Pour les chatbots, les résultats sont immédiats dès la mise en service. Pour le SEO Boost, les premiers résultats sont généralement visibles dans les 4 à 8 semaines, avec une amélioration continue sur 3 à 6 mois. La création de contenu commence à générer de l'engagement rapidement, mais l'impact complet se développe avec le temps."
    },
    {
      question: "Proposez-vous un support technique et des mises à jour régulières ?",
      explanation: "Oui, toutes nos solutions incluent un support technique réactif et des mises à jour régulières. Nous disposons d'une équipe dédiée pour répondre à vos questions et résoudre rapidement tout problème. Les mises à jour sont automatiques pour garantir que vos outils restent performants et à la pointe de la technologie."
    }
  ];

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            {t('faq')}
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Trouvez des réponses aux questions les plus fréquemment posées.
          </p>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className={`
                  border border-border rounded-lg overflow-hidden transition-all duration-300
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-card hover:bg-accent/50 transition-colors"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <div 
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${openIndex === index ? 'max-h-96' : 'max-h-0'}
                  `}
                >
                  <div className="p-6 pt-0 text-muted-foreground bg-card/50">
                    {item.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
