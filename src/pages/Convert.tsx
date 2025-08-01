import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";
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

      const response = await fetch("https://boostai-backend.onrender.com/convert", {
        method: "POST",
        body: formData,
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
        title="Convertir PDF en Excel | BoostAI Consulting - Convertisseur Gratuit"
        description="Convertissez vos fichiers PDF en Excel gratuitement. Outil OCR avancé pour extraire les données de vos documents PDF."
        keywords="Convertisseur PDF Excel, OCR, extraction données, PDF to Excel, BoostAI Consulting"
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
                    Convertisseur PDF
                    <span className="block text-gradient bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                      vers Excel
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Téléchargez votre fichier PDF et Convertissez-le en format Excel avec notre <span className="text-purple-400 font-semibold">outil OCR avancé</span>
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