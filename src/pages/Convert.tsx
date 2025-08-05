import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, Loader2, Zap, Shield, Lock, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaTags from "@/components/seo/MetaTags";

const CodigBanner = () => (
  <div className="w-full flex justify-center mt-8 mb-8">
    <div className="flex items-center bg-white rounded-xl shadow-md px-6 py-4 max-w-2xl w-full">
      <a href="https://www.codig-sa.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mr-4">
        <img src="/CodigLogo.png" alt="Codig Logo" className="h-16 w-16 rounded bg-white object-contain border border-gray-200" />
      </a>
      <div className="flex-1">
        <div className="font-semibold text-lg sm:text-xl text-gray-800">Fonctionnalité OCR personnalisée pour Codig</div>
        <div className="text-gray-500 text-sm sm:text-base mt-1">Ce Convertisseur a été conçu spécialement pour Codig.<br />
          Vous voulez un flux OCR personnalisé pour votre entreprise ?{' '}
          <a href="/contact" className="text-blue-600 underline hover:text-blue-800">Parlons-en</a>
        </div>
      </div>
    </div>
  </div>
);

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:scale-105 hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
        <Icon className="h-6 w-6 text-purple-400" />
      </div>
      <h3 className="ml-3 text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors duration-200 rounded-lg px-2"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <motion.div
        id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pb-4 px-2">
          <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Convert = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showWakeMsg, setShowWakeMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wakeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Veuillez télécharger un fichier PDF");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Veuillez télécharger un fichier PDF");
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setIsScanning(true);
    setError(null);
    setShowWakeMsg(false);

    // Affiche le message "Réveil du serveur..." après 8s si la réponse n'est pas arrivée
    wakeTimeout.current = setTimeout(() => setShowWakeMsg(true), 8000);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://boostai-backend.onrender.com/Convert", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Le service de conversion est temporairement indisponible. Veuillez réessayer plus tard.");
        }
        if (response.status === 0 || response.status === 500) {
          throw new Error("Le serveur de conversion est en cours de démarrage. Veuillez patienter quelques secondes et réessayer.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "La conversion a échoué");
      }

      // Télécharger le vrai fichier Excel retourné par le backend
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_Converted.xlsx");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Conversion error:', err);
      if (err instanceof Error && err.message.includes('Failed to fetch')) {
        setError("Le service de conversion est temporairement indisponible. Veuillez réessayer dans quelques minutes.");
      } else {
        setError(err instanceof Error ? err.message : "Une erreur s'est produite lors de la conversion");
      }
    } finally {
      setIsScanning(false);
      setIsConverting(false);
      setFile(null);
      setShowWakeMsg(false);
      if (wakeTimeout.current) clearTimeout(wakeTimeout.current);
    }
  };

  return (
    <>
      <MetaTags
        title="Convertir PDF en Excel Gratuitement | OCR IA avancé - BoostAI"
        description="Convertissez vos PDF en Excel gratuitement grâce à notre OCR basé sur l'IA. Conversion rapide, précise et sécurisée en ligne, sans inscription."
        keywords="convertir PDF Excel, OCR PDF Excel, IA OCR gratuit, PDF to Excel AI"
        image="/assets/Logo.png"
      />
      
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Convertisseur PDF vers Excel - OCR IA BoostAI",
            "operatingSystem": "Web",
            "applicationCategory": "Utility",
            "description": "Convertissez vos PDF en fichiers Excel éditables gratuitement grâce à notre OCR basé sur l'intelligence artificielle. Conversion rapide, précise et sécurisée.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })
        }}
      />

      <div className="min-h-screen relative overflow-x-hidden bg-[#0B0D14]">
        <Header />
        
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-6"
                  >
                    <span className="inline-block bg-gradient-to-r from-purple-500/10 to-blue-600/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      🔄 Convertisseur Gratuit
                    </span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Convertisseur PDF vers Excel
                    <span className="block text-gradient bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                      Gratuit (OCR IA)
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Transformez vos PDF en fichiers Excel éditables en ligne grâce à notre <span className="text-purple-400 font-semibold">OCR intelligent basé sur l'IA</span>
                  </motion.p>
                </motion.div>

                <CodigBanner />
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-12 text-center ${
                      isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-600 bg-gray-900/30"
                    } transition-colors duration-200 backdrop-blur-sm`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInput}
                      accept=".pdf"
                      className="hidden"
                      aria-label="Sélectionner un fichier PDF"
                    />

                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-gray-300">
                        {file ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FileSpreadsheet className="h-5 w-5 text-purple-400" />
                            <span>{file.name}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-lg font-medium">Glissez-déposez votre fichier PDF ici</p>
                            <p className="text-sm">ou</p>
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all"
                              aria-label="Parcourir les fichiers pour sélectionner un PDF"
                            >
                              Parcourir les fichiers
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    {file && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        onClick={handleConvert}
                        disabled={isConverting}
                        aria-label="Convertir le fichier PDF en Excel"
                      >
                        {isConverting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Conversion en cours...</span>
                          </>
                        ) : (
                          <>
                            <FileSpreadsheet className="h-5 w-5" />
                            <span>Convertir en Excel</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Pourquoi choisir notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">convertisseur OCR IA</span> ?
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <BenefitCard
                      icon={Zap}
                      title="Conversion rapide et gratuite"
                      description="Transformez vos PDF en Excel en quelques secondes, sans coût et sans inscription. Notre outil est accessible 24h/24 et 7j/7."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <BenefitCard
                      icon={CheckCircle}
                      title="Précision grâce à l'IA"
                      description="Notre technologie OCR basée sur l'intelligence artificielle garantit une extraction précise des données, même sur des documents complexes."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <BenefitCard
                      icon={Shield}
                      title="Sécurité et confidentialité"
                      description="Vos fichiers sont traités de manière sécurisée et supprimés automatiquement après conversion. Aucune donnée n'est stockée."
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* How it works Section */}
          <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Comment ça marche ?
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Notre processus de conversion en 3 étapes simples
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Téléchargez votre PDF</h3>
                    <p className="text-gray-300">Glissez-déposez ou sélectionnez votre fichier PDF à convertir</p>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">IA analyse le contenu</h3>
                    <p className="text-gray-300">Notre OCR IA extrait et structure automatiquement les données</p>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Téléchargez votre Excel</h3>
                    <p className="text-gray-300">Récupérez votre fichier Excel prêt à utiliser</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-white">Convertir un PDF en Excel gratuitement avec l'IA OCR</h2>
                  <p className="mb-4 text-gray-200">
                    Vous cherchez à <strong>transformer un PDF en fichier Excel éditable</strong> rapidement et sans perte de données ? 
                    Notre <strong>outil OCR basé sur l'intelligence artificielle</strong> vous permet de convertir vos documents PDF 
                    en feuilles Excel précises, tout en conservant la mise en page et les tableaux. Contrairement aux convertisseurs classiques, 
                    notre solution détecte automatiquement les structures complexes grâce à une technologie IA avancée.
                  </p>
                  <p className="mb-4 text-gray-200">
                    L'utilisation est simple : téléversez votre fichier, laissez notre système l'analyser, et téléchargez un Excel prêt à l'emploi. 
                    Cette plateforme est 100% en ligne, gratuite, et ne nécessite aucune inscription. Idéal pour les entreprises, étudiants, 
                    comptables ou toute personne manipulant régulièrement des données PDF.
                  </p>
                  <p className="mb-4 text-gray-200">
                    En plus de la conversion classique, notre OCR peut reconnaître les PDF scannés, les images intégrées, et même corriger 
                    certaines erreurs de lecture grâce à un algorithme d'apprentissage automatique. Vos fichiers restent sécurisés, 
                    car aucune donnée n'est conservée après la conversion.
                  </p>
                  <p className="text-gray-200">
                    Essayez dès maintenant notre <strong>convertisseur PDF vers Excel gratuit</strong> et gagnez du temps 
                    dans votre gestion de documents.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Questions fréquentes
                  </h2>
                  <p className="text-xl text-gray-300">
                    Tout ce que vous devez savoir sur notre convertisseur PDF vers Excel
                  </p>
                </motion.div>

                <motion.div
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <FAQItem
                    question="Est-ce que ce convertisseur PDF vers Excel est vraiment gratuit ?"
                    answer="Oui, notre outil est totalement gratuit et sans inscription. Vous pouvez convertir autant de fichiers PDF que vous le souhaitez."
                  />
                  <FAQItem
                    question="Comment fonctionne l'OCR basé sur l'IA ?"
                    answer="L'OCR (reconnaissance optique de caractères) analyse chaque élément de votre PDF et reconstruit un fichier Excel en détectant automatiquement les tableaux, textes et chiffres. Notre modèle IA améliore la précision et la mise en page."
                  />
                  <FAQItem
                    question="Mes données sont-elles sécurisées ?"
                    answer="Oui, tous les fichiers sont traités en toute sécurité et ne sont pas stockés après la conversion. Vos informations restent confidentielles."
                  />
                  <FAQItem
                    question="Est-ce que ça marche avec les PDF scannés ?"
                    answer="Oui, notre OCR IA est capable de lire les PDF scannés et d'en extraire les données pour créer un Excel éditable."
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Besoin d'aide ou d'informations supplémentaires ?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Découvrez plus d'astuces et de conseils sur notre blog pour optimiser votre utilisation de nos outils.
                  </p>
                  <a
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
                    aria-label="Accéder au blog pour plus d'astuces"
                  >
                    Découvrir notre blog
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 mx-4">
                <div className="mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-400 via-purple-200 to-purple-500 flex items-center justify-center shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  >
                    <span className="block w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-300 blur-sm opacity-70 animate-pulse" />
                  </motion.div>
                </div>
                <div className="text-xl font-semibold text-white mb-2 text-center">
                  {showWakeMsg ? "Réveil du serveur, veuillez patienter..." : "Traitement de votre fichier..."}
                </div>
                <div className="text-sm text-gray-400 text-center">
                  Cela peut prendre jusqu'à 30 secondes si le serveur est en veille.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </>
  );
};

export default Convert; 