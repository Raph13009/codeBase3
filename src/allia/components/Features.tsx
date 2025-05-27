
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Database,
  Shield,
  Clock,
  TrendingUp
} from "lucide-react";

const Features = () => {
  const integrations = [
    { name: "Gmail", icon: Mail, color: "bg-red-100 text-red-600" },
    { name: "Drive", icon: FileText, color: "bg-blue-100 text-blue-600" },
    { name: "Slack", icon: MessageSquare, color: "bg-purple-100 text-purple-600" },
    { name: "Notion", icon: Database, color: "bg-gray-100 text-gray-600" },
    { name: "Calendar", icon: Calendar, color: "bg-green-100 text-green-600" },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Sécurisé",
      description: "Aucun stockage de données. Vos informations restent dans vos outils.",
      highlight: "Confidentialité d'abord"
    },
    {
      icon: Clock,
      title: "Résultats Instantanés",
      description: "Recherche ultra-rapide dans toutes vos plateformes connectées.",
      highlight: "Sous-seconde"
    },
    {
      icon: TrendingUp,
      title: "Apprentissage Intelligent",
      description: "S'améliore avec le temps en comprenant vos habitudes de travail.",
      highlight: "Propulsé par l'IA"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-brand-turquoise/10 text-brand-turquoise border-brand-turquoise/20 px-4 py-2 rounded-2xl">
            Fonctionnalités
          </Badge>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-brand-darkGrey">
            Tout ce dont vous avez besoin en un seul endroit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Connectez tous vos outils et accédez instantanément à toutes vos informations avec la recherche propulsée par l'IA
          </p>
        </div>

        {/* Main Feature Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Integrations */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-poppins font-semibold text-2xl text-brand-darkGrey">
                Connectez tous vos outils
              </h3>
              <p className="text-gray-600 font-inter">
                Allia s'intègre parfaitement à votre flux de travail existant. Aucune migration nécessaire.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <Card key={index} className="p-6 border-0 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center`}>
                      <integration.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-medium text-brand-darkGrey">
                        {integration.name}
                      </h4>
                      <p className="text-sm text-gray-500">Connecté</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-brand-turquoise/10 to-brand-blue/10 p-4 rounded-2xl">
              <p className="text-sm text-brand-blue font-medium text-center">
                + Plus d'intégrations à venir : Jira, Confluence, Teams...
              </p>
            </div>
          </div>

          {/* Right - Search Demo */}
          <div className="relative">
            <Card className="p-8 bg-white shadow-xl rounded-3xl border-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-poppins font-semibold text-lg">Recherche Unifiée</h4>
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-turquoise to-brand-blue rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🦊</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value="rapports trimestriels Q3"
                      className="w-full p-4 border-2 border-brand-turquoise rounded-2xl bg-gray-50 font-inter"
                      readOnly
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-brand-turquoise rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl border-l-4 border-red-400">
                      <Mail className="w-5 h-5 text-red-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Rapport Financier Q3 - Final</p>
                        <p className="text-xs text-gray-600">Gmail • Il y a 2 jours</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Analyse Performance Q3.pdf</p>
                        <p className="text-xs text-gray-600">Drive • Il y a 1 semaine</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl border-l-4 border-purple-400">
                      <Database className="w-5 h-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Notes Réunion Bilan Q3</p>
                        <p className="text-xs text-gray-600">Notion • Il y a 3 jours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Feature Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 border-0 shadow-lg rounded-3xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-turquoise to-brand-blue rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20">
                  {feature.highlight}
                </Badge>
                <h3 className="font-poppins font-semibold text-xl text-brand-darkGrey">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-inter">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
