
import { Card } from "@/components/ui/card";
import { Mail, FileText, MessageSquare, FolderOpen, Clock, Brain, AlertCircle } from "lucide-react";

const Problem = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Problem Statement */}
          <div className="text-center space-y-8 mb-16">
            <h2 className="font-inter font-bold text-4xl md:text-5xl text-gray-900">
              Le temps que vous perdez à chercher
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-inter leading-relaxed max-w-3xl mx-auto">
              Vos équipes passent <span className="text-brand-coral font-semibold">5 minutes par recherche</span> 
              à fouiller dans leurs dizaines d'outils. C'est énorme.
            </p>
          </div>

          {/* Scattered Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 mb-16">
            <Card className="p-6 bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-coral rounded-full animate-pulse"></div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-inter font-semibold text-sm text-gray-900">Gmail</h3>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-coral rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-inter font-semibold text-sm text-gray-900">Drive</h3>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-coral rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-inter font-semibold text-sm text-gray-900">Slack</h3>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-coral rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-inter font-semibold text-sm text-gray-900">Notion</h3>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-coral rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">📊</span>
                </div>
                <h3 className="font-inter font-semibold text-sm text-gray-900">Excel</h3>
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-coral rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">⚙️</span>
                </div>
                <h3 className="font-inter font-semibold text-sm text-gray-900">+ 20 autres</h3>
              </div>
            </Card>
          </div>

          {/* Additional scattered tools text */}
          <div className="text-center mb-16">
            <p className="text-lg text-gray-600 font-inter">
              Teams, Sharepoint, Trello, Asana, Dropbox, OneDrive, Confluence, Jira, Figma, GitHub...
              <br />
              <span className="text-brand-coral font-semibold">Chaque outil a sa logique, ses raccourcis, sa façon de chercher.</span>
            </p>
          </div>

          {/* Pain Points */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white border-0 shadow-lg rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-brand-coral/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-brand-coral" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-inter font-semibold text-xl text-gray-900">Temps perdu</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Jusqu'à <strong>30 minutes par jour</strong> perdues à chercher la même information dans différents outils
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 bg-white border-0 shadow-lg rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-brand-purple" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-inter font-semibold text-xl text-gray-900">Surcharge mentale</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Se rappeler <strong>où est stockée</strong> chaque information devient un casse-tête permanent
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 bg-white border-0 shadow-lg rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-brand-mint/10 rounded-2xl flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8 text-brand-mint" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-inter font-semibold text-xl text-gray-900">Fragmentation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Les informations <strong>éparpillées</strong> font perdre le contexte et ralentissent les décisions
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
