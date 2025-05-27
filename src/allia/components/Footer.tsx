
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const Footer = () => {
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
    <footer className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-mint to-brand-purple rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🦊</span>
                </div>
                <span className="font-inter font-bold text-2xl">
                  Allia
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Votre assistant intelligent pour l'information interne
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-brand-mint hover:bg-brand-mint/90 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105">
                    Demander une démo
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
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="font-inter font-semibold text-xl">Contact</h3>
              <div className="space-y-3 text-gray-300">
                <p className="hover:text-brand-mint transition-colors cursor-pointer">
                  contact@boostaiconsulting.com
                </p>
                <p>Support beta</p>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-6">
              <h3 className="font-inter font-semibold text-xl">Sécurité</h3>
              <div className="space-y-3">
                <a href="#" className="text-gray-300 hover:text-brand-mint transition-colors block">
                  Politique de confidentialité
                </a>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔒</span>
                  <p className="text-sm text-gray-400">
                    Aucune donnée stockée, 100% sécurisé
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © 2025 Allia. Fait avec <span className="text-brand-coral">❤️</span> pour les équipes qui veulent gagner du temps.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
