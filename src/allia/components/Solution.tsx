import { Card } from "@/components/ui/card";
import { Search, Brain, Zap } from "lucide-react";
const Solution = () => {
  const features = [{
    icon: Search,
    title: "Connectez tous vos outils",
    description: "Gmail, Drive, Notion, Slack... tout centralisé en un seul endroit sécurisé",
    color: "from-brand-mint to-brand-mint/80",
    bgColor: "bg-brand-mint/10"
  }, {
    icon: Brain,
    title: "Recherchez par sens, pas par mots",
    description: "L'IA comprend l'intention derrière votre recherche, même avec des termes approximatifs",
    color: "from-brand-purple to-brand-purple/80",
    bgColor: "bg-brand-purple/10"
  }, {
    icon: Zap,
    title: "Documents suggérés avant même de demander",
    description: "Allia anticipe vos besoins et propose les bons documents au bon moment",
    color: "from-brand-coral to-brand-coral/80",
    bgColor: "bg-brand-coral/10"
  }];
  return <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-8 mb-20">
            <h2 className="font-inter font-bold text-4xl md:text-5xl text-gray-900">
              Une recherche intelligente, enfin
            </h2>
            <p className="text-xl md:text-2xl text-brand-mint font-semibold max-w-3xl mx-auto">
              Trouvez tout en 2 secondes chrono, peu importe où c'est stocké
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => <Card key={index} className="p-10 border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group text-center bg-white relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-8">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="font-inter font-bold text-xl text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-inter leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Step Number */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
                      <span className="text-lg font-bold text-gray-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>)}
          </div>

          {/* Central Brand Element */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-brand-mint via-brand-purple to-brand-coral rounded-2xl flex items-center justify-center animate-float shadow-2xl">
              <span className="text-white text-3xl font-bold">🦊</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Solution;