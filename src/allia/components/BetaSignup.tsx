
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Users, Clock, CheckCircle, Loader2, Zap, Heart, Shield } from "lucide-react";
import { useState } from "react";

const BetaSignup = () => {
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
    <section className="py-24 bg-gradient-to-br from-white via-gray-50/30 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* Header */}
          <div className="space-y-8">
            <h2 className="font-inter font-bold text-4xl md:text-5xl text-gray-900">
              Envie de tester ?
            </h2>
            <p className="text-xl text-gray-600 font-inter leading-relaxed max-w-2xl mx-auto">
              Rejoignez les premiers utilisateurs d'Allia et transformez votre façon de travailler
            </p>
          </div>

          {/* Beta Card */}
          <Card className="p-12 bg-gradient-to-br from-white via-gray-50/50 to-white border-2 border-brand-mint/20 rounded-2xl shadow-2xl">
            <div className="space-y-12">
              {/* Brand Element with fox emoji */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-mint via-brand-purple to-brand-coral rounded-2xl flex items-center justify-center animate-float shadow-2xl">
                  <span className="text-white text-3xl">🦊</span>
                </div>
              </div>

              {/* Email Signup Form */}
              <div className="space-y-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="votre-email@entreprise.com"
                    className="flex-1 h-16 px-6 rounded-2xl border-2 border-gray-200 focus:border-brand-mint bg-white text-lg"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="h-16 bg-brand-mint hover:bg-brand-mint/90 text-white px-8 rounded-2xl font-semibold text-lg transition-all duration-200 hover:scale-105 whitespace-nowrap shadow-lg hover:shadow-xl"
                      >
                        Rejoindre la liste (c'est rapide, promis)
                        <ArrowRight className="w-5 h-5 ml-2" />
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
                            🔒 Aucune pub. Jamais. Juste une alerte si on lance quelque chose de cool.
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

                {/* Reassurances */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-gray-600 bg-white/60 rounded-xl p-3">
                    <Users className="w-4 h-4 text-brand-mint" />
                    <span className="font-medium">Accès limité</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 bg-white/60 rounded-xl p-3">
                    <Clock className="w-4 h-4 text-brand-purple" />
                    <span className="font-medium">Premiers arrivés, premiers servis</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 bg-white/60 rounded-xl p-3">
                    <Zap className="w-4 h-4 text-brand-coral" />
                    <span className="font-medium">Support premium</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 bg-white/60 rounded-xl p-3">
                    <Shield className="w-4 h-4 text-brand-mint" />
                    <span className="font-medium">Pas de spam</span>
                  </div>
                </div>
              </div>

              {/* Beta Benefits */}
              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-mint/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-brand-mint" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 text-lg">Accès exclusif</p>
                    <p className="text-gray-600 text-sm">Testez Allia avant tout le monde</p>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 text-brand-purple" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 text-lg">Influencez le produit</p>
                    <p className="text-gray-600 text-sm">Vos retours façonnent Allia</p>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-coral/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-brand-coral" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 text-lg">Support premium</p>
                    <p className="text-gray-600 text-sm">Assistance dédiée et prioritaire</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Alternative CTA */}
          <div className="space-y-6">
            <p className="text-gray-500">
              Ou contactez-nous directement pour une démo personnalisée
            </p>
            <Button 
              variant="outline"
              className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 text-lg"
            >
              Demander une démo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaSignup;
