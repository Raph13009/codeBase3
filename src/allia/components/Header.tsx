
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-mint to-brand-purple rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🦊</span>
            </div>
            <span className="font-inter font-bold text-2xl text-gray-900">
              Allia
            </span>
            <a
            href="https://boostaiconsulting.com"
            className="text-sm text-muted-foreground hover:text-primary transition-colors ml-4"
          >
            ← Revenir sur BoostaiConsulting
          </a>
          </div>

          {/* CTA Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-mint hover:bg-brand-mint/90 text-white px-8 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                Recevoir un accès anticipé
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
      </div>
    </header>
  );
};

export default Header;
