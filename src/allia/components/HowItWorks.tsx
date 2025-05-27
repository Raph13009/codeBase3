
import { Card } from "@/components/ui/card";
import { Search, Brain, Zap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Recherche Unifiée",
      description: "Une seule barre de recherche pour tous vos outils",
      details: "Connectez Gmail, Drive, Notion, Slack, et plus. Recherchez dans tout depuis un seul endroit.",
      color: "from-brand-turquoise to-brand-blue"
    },
    {
      icon: Brain,
      title: "I🦊 qui comprend le contexte",
      description: "Recherchez par sens, pas par mots-clés",
      details: "Notre renard intelligent comprend ce que vous cherchez, même si vous ne vous souvenez pas des mots exacts.",
      color: "from-brand-blue to-purple-500"
    },
    {
      icon: Zap,
      title: "🦊ssistant proactif",
      description: "Prépare les documents clés avant vos réunions",
      details: "🦊llia anticipe vos besoins et fait remonter les informations pertinentes avant même que vous les demandiez.",
      color: "from-brand-orange to-red-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-brand-darkGrey">
            Comment fonctionne 🦊llia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Trois étapes simples pour transformer votre façon de trouver et d'accéder aux informations au travail
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="p-8 border-0 shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-poppins font-semibold text-xl text-brand-darkGrey">
                    {step.title}
                  </h3>
                  <p className="text-brand-turquoise font-medium">
                    {step.description}
                  </p>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {step.details}
                  </p>
                </div>

                {/* Step Number */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                      {index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block">
                      <svg className="w-8 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 8">
                        <path d="M0 4h16m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Demo Section with Concrete Example */}
        <div className="mt-20 text-center">
          <Card className="p-8 bg-gradient-to-r from-brand-turquoise/5 to-brand-blue/5 border-0 rounded-3xl max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-turquoise to-brand-blue rounded-3xl flex items-center justify-center animate-float">
                  <span className="text-white text-2xl">🦊</span>
                </div>
              </div>
              <h3 className="font-poppins font-semibold text-2xl text-brand-darkGrey">
                Voir 🦊llia en action
              </h3>
              <p className="text-gray-600 font-inter">
                Regardez comment Marie transforme son flux de travail : d'informations éparpillées à un accès instantané
              </p>
              
              {/* Concrete Search Example */}
              <div className="bg-white rounded-2xl p-6 shadow-md max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value="pdf devis 🦊lban"
                      className="w-full p-4 border-2 border-brand-turquoise rounded-2xl bg-gray-50 font-inter text-center font-medium"
                      readOnly
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-brand-turquoise rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 text-center mb-4">3 résultats trouvés en 0,2s</div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-xl border-l-4 border-red-400 hover:shadow-sm transition-shadow">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm">📧</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-gray-800">Devis_🦊lban_2024.pdf</p>
                        <p className="text-xs text-gray-600">Gmail • Il y a 3 jours • De: alban@entreprise.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 hover:shadow-sm transition-shadow">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm">📁</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-gray-800">Projet_🦊lban_Devis_Final.pdf</p>
                        <p className="text-xs text-gray-600">Drive • Il y a 1 semaine • Dossier: Clients/🦊lban</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-400 hover:shadow-sm transition-shadow">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm">📝</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-gray-800">Notes réunion - Validation devis 🦊lban</p>
                        <p className="text-xs text-gray-600">Notion • Il y a 5 jours • Page: Projets clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button className="bg-white hover:bg-gray-50 text-brand-blue border-2 border-brand-blue px-8 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                  ▶️ Voir la démo de 2 minutes
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
