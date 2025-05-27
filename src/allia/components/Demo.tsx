import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Search, CheckCircle, Loader2, Clock } from "lucide-react";
import { useState } from "react";
const Demo = () => {
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
  return <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-8 mb-16">
            <h2 className="font-inter font-bold text-4xl md:text-5xl text-gray-900">
              Tapez{" "}
              <span className="bg-gradient-to-r from-brand-mint to-brand-purple bg-clip-text text-transparent font-mono text-3xl md:text-4xl px-3 py-2 bg-gray-100 rounded-xl">&quot;devis Alban&quot;</span>
              <br />
              <span className="text-3xl md:text-4xl">et trouvez tout en{" "}
                <span className="bg-gradient-to-r from-brand-coral to-red-500 bg-clip-text text-transparent">
                  0,2 secondes
                </span>
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-inter leading-relaxed max-w-3xl mx-auto">
              PDF dans Gmail • Page Notion • Fichier Excel • Document Drive
            </p>
          </div>

          {/* Demo Interface */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-gray-100">
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-brand-mint/20 hover:border-brand-mint/40 transition-all duration-300">
                  <Search className="w-6 h-6 text-brand-mint" />
                  <div className="flex-1 flex items-center">
                    <span className="text-lg text-gray-700 font-inter mr-2">devis Alban</span>
                    <div className="w-0.5 h-6 bg-brand-mint rounded-sm animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>0,2s</span>
                  </div>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">4 résultats trouvés dans tous vos outils</p>
                <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Recherche terminée</span>
                </div>
              </div>

              {/* Results Grid */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Gmail Result */}
                  <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-lg">📧</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Gmail</h4>
                            <p className="text-sm text-red-600">alban@entreprise.com</p>
                          </div>
                        </div>
                        <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">PDF</div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">Devis_Alban_2024_Final.pdf</h5>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          Voici le devis finalisé pour votre projet. Merci de bien vouloir le valider...
                        </p>
                        <p className="text-xs text-gray-500">Il y a 3 jours • Pièce jointe 2,3 MB</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">97% pertinence</div>
                        <Button size="sm" variant="outline" className="text-xs h-7">Ouvrir</Button>
                      </div>
                    </div>
                  </Card>

                  {/* Drive Result */}
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-lg">📁</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Google Drive</h4>
                            <p className="text-sm text-blue-600">Dossier: Clients/Alban</p>
                          </div>
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">DOC</div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">Contrat_Alban_Projet_2024.docx</h5>
                        <p className="text-sm text-gray-600 line-clamp-2">Contrat de prestation pour le projet digital d'Alban avec détails techniques...</p>
                        <p className="text-xs text-gray-500">Il y a 1 semaine • Modifié par Marie</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">94% pertinence</div>
                        <Button size="sm" variant="outline" className="text-xs h-7">Ouvrir</Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Notion Result */}
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-lg">📝</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Notion</h4>
                        <p className="text-sm text-purple-600">Workspace: Projets clients</p>
                      </div>
                    </div>
                    <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">PAGE</div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">Notes réunion - Validation devis Alban</h5>
                      <p className="text-sm text-gray-600 line-clamp-2">Réunion du 15/01 avec Alban pour validation du devis. Points Abordés : budget, délais...</p>
                      <p className="text-xs text-gray-500">Il y a 5 jours • Page mise à jour</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">91% pertinence</div>
                      <Button size="sm" variant="outline" className="text-xs h-7">Ouvrir</Button>
                    </div>
                  </div>
                </Card>

                {/* Excel Result */}
                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-lg">📊</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Excel Online</h4>
                        <p className="text-sm text-green-600">Sharepoint: Facturation</p>
                      </div>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">XLSX</div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">Suivi_Devis_Alban_2024.xlsx</h5>
                      <p className="text-sm text-gray-600 line-clamp-2">Tableau de suivi des devis client Alban avec statuts, montants et échéances...</p>
                      <p className="text-xs text-gray-500">Il y a 2 jours • Onglet: Devis_En_Cours</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">89% pertinence</div>
                      <Button size="sm" variant="outline" className="text-xs h-7">Ouvrir</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-brand-mint to-brand-purple hover:from-brand-mint/90 hover:to-brand-purple/90 text-white px-12 py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl text-xl">Essayer Allia gratuitement</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-0 shadow-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center font-inter text-2xl text-gray-900">
                    {isSubmitted ? "Merci ! 🎉" : "Rejoignez la liste d'attente"}
                  </DialogTitle>
                </DialogHeader>
                {!isSubmitted ? <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-brand-mint to-brand-purple rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-white text-2xl">🦊</span>
                      </div>
                      <p className="text-gray-600 font-inter leading-relaxed">
                        Entrez votre email pour recevoir un accès prioritaire à 🦊llia dès qu'il sera disponible.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Input type="email" placeholder="votre-email@entreprise.com" value={email} onChange={e => setEmail(e.target.value)} required className="h-14 rounded-2xl border-2 border-gray-200 focus:border-brand-mint text-base px-4" disabled={isSubmitting} />
                      <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-brand-mint hover:bg-brand-mint/90 text-white rounded-2xl font-medium text-base transition-all duration-200 hover:scale-105 shadow-lg">
                        {isSubmitting ? <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Inscription en cours...
                          </> : "Rejoindre la liste d'attente"}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      🔒 Engagement anti-spam : zéro publicité dans votre boîte mail.
                    </p>
                  </form> : <div className="text-center space-y-6">
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
                  </div>}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>;
};
export default Demo;