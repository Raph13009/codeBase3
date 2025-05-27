import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const BetaSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
  const { error } = await supabase.from("leads").insert([
    {
      email: email,
      name: "-",
      message: "-",
      source: "beta_allia"
    }
  ]);

  if (error) {
    console.error("Erreur Supabase:", error);
    alert("Erreur lors de l'envoi à la base Supabase.");
    return;
  }

  setIsSubmitted(true);
  console.log("Email envoyé à Supabase :", email);
} catch (err) {
  console.error("Erreur inattendue :", err);
  alert("Une erreur est survenue. Merci de réessayer.");
}

  };

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50/30 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-8">
            <h2 className="font-bold text-4xl md:text-5xl text-gray-900">Envie de tester ?</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Rejoignez les premiers utilisateurs d'Allia et transformez votre façon de travailler
            </p>
          </div>

          <Card className="p-12 border-2 border-brand-mint/20 rounded-2xl shadow-2xl bg-white">
            <div className="space-y-12">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-mint via-brand-purple to-brand-coral rounded-2xl flex items-center justify-center animate-float shadow-2xl">
                  <span className="text-white text-3xl">🦊</span>
                </div>
              </div>

              <div className="space-y-8 max-w-2xl mx-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-brand-mint text-white text-lg font-semibold px-8 rounded-2xl shadow-lg hover:scale-105 transition">
                      Rejoindre la liste (c'est rapide, promis)
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md border-0 shadow-2xl rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl text-gray-900">
                        {isSubmitted ? "Merci ! 🎉" : "Rejoignez la liste d'attente"}
                      </DialogTitle>
                    </DialogHeader>

                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre-email@entreprise.com"
                          required
                          className="h-14 rounded-2xl border-2 border-gray-200 px-4"
                          disabled={isSubmitting}
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-brand-mint text-white rounded-2xl font-medium transition hover:scale-105 shadow-lg"
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
                        <p className="text-sm text-gray-500 text-center">
                          🔒 Aucune pub. Juste une alerte si on lance quelque chose de cool.
                        </p>
                      </form>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-mint to-brand-purple rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                          <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-gray-900 font-semibold text-lg">Votre inscription a été prise en compte !</p>
                        <p className="text-gray-600">Nous vous tiendrons informé dès que votre accès sera prêt.</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BetaSignup;
