
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle, Loader2, Mail, FolderOpen, MessageSquare, FileText } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-mint/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-coral/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Fox Mascot with modern color and bigger emoji */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
              <span className="text-4xl">🦊</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="font-inter font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight">
              Allia – votre{" "}
              <span className="bg-gradient-to-r from-brand-mint to-brand-purple bg-clip-text text-transparent">
                assistant de recherche
              </span>
              <br />
              interne
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-inter leading-relaxed max-w-3xl mx-auto">
              Un seul champ de recherche pour Gmail, Drive, Slack, Notion…
            </p>
          </div>

          {/* Trust Reassurance */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center justify-center space-x-8 text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔒</span>
                <span className="font-medium">Engagement anti-spam : zéro publicité dans votre boîte mail.</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-brand-mint hover:bg-brand-mint/90 text-white px-12 py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-brand-mint/25 text-xl"
                >
                  Recevoir un accès anticipé
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-0 shadow-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center font-inter text-2xl text-gray-900">
                    {isSubmitted ? "Merci ! 🎉" : "Rejoignez la liste d'attente"}
                  </DialogTitle>
                </DialogHeader>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-brand-mint to-brand-purple rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-white text-2xl">🦊</span>
                      </div>
                      <p className="text-gray-600 font-inter leading-relaxed">
                        Entrez votre email pour recevoir un accès prioritaire à Allia dès qu'il sera disponible.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="votre-email@entreprise.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 rounded-2xl border-2 border-gray-200 focus:border-brand-mint text-base px-4"
                        disabled={isSubmitting}
                      />
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-brand-mint hover:bg-brand-mint/90 text-white rounded-2xl font-medium text-base transition-all duration-200 hover:scale-105 shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Inscription en cours...
                          </>
                        ) : (
                          "Rejoindre la liste d'attente"
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      🔒 Engagement anti-spam : zéro publicité dans votre boîte mail.
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-mint to-brand-purple rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-900 font-semibold text-lg">
                        Votre inscription a été prise en compte !
                      </p>
                      <p className="text-gray-600">
                        Nous vous tiendrons informé dès que votre accès sera prêt.
                      </p>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
            
            {/* Quick Email Signup */}
            <div className="max-w-lg mx-auto">
              <div className="flex gap-4 bg-white/80 backdrop-blur-sm p-2 rounded-2xl border border-gray-200 shadow-lg">
                <Input
                  type="email"
                  placeholder="votre-email@entreprise.com"
                  className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none text-base"
                />
                <Button 
                  className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 hover:scale-105"
                >
                  Je rejoins la liste
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Icons with proper service icons */}
          <div className="relative pt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-3 animate-float opacity-60" style={{animationDelay: '0s'}}>
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-red-500" />
                </div>
                <span className="text-sm font-medium text-gray-600">Gmail</span>
              </div>
              <div className="flex flex-col items-center space-y-3 animate-float opacity-60" style={{animationDelay: '0.5s'}}>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-lg">
                  <FolderOpen className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-600">Drive</span>
              </div>
              <div className="flex flex-col items-center space-y-3 animate-float opacity-60" style={{animationDelay: '1s'}}>
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-8 h-8 text-green-500" />
                </div>
                <span className="text-sm font-medium text-gray-600">Slack</span>
              </div>
              <div className="flex flex-col items-center space-y-3 animate-float opacity-60" style={{animationDelay: '1.5s'}}>
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
                <span className="text-sm font-medium text-gray-600">Notion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
