import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";

const Convert = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanDuration = 30000; // 30 secondes

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
      setError("Please upload a PDF file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setIsScanning(true);
    setError(null);
    setProgress(0);

    // Animation de progression
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      let percent = Math.min(100, Math.round((elapsed / scanDuration) * 100));
      setProgress(percent);
      if (percent >= 100) clearInterval(interval);
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const responsePromise = fetch("https://boostai-backend.onrender.com/convert", {
        method: "POST",
        body: formData,
      });

      // Attend soit la fin de l'animation, soit la réponse du backend
      const [response] = await Promise.all([
        responsePromise,
        new Promise((resolve) => setTimeout(resolve, scanDuration)),
      ]);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Conversion failed");
      }

      // Télécharger le vrai fichier Excel retourné par le backend
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_converted.xlsx");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during conversion");
    } finally {
      setIsScanning(false);
      setIsConverting(false);
      setFile(null);
      setProgress(0);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF to Excel Converter</h1>
            <p className="text-lg text-gray-600">Upload your PDF file and convert it to Excel format</p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } transition-colors duration-200`}
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
              <div className="text-gray-600">
                {file ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-medium">Drag and drop your PDF file here</p>
                    <p className="text-sm">or</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Browse Files
                    </button>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            {file && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                onClick={handleConvert}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-5 w-5" />
                    <span>Convert to Excel</span>
                  </>
                )}
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <div className="relative w-80 h-80 bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
                  <motion.div
                    className="absolute w-full h-1 bg-blue-500"
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{
                      duration: scanDuration / 1000,
                      ease: "linear",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">Waking up the server... Please wait ~30s</div>
                    <div className="text-sm text-gray-500">Scanning your PDF and generating your Excel file ({progress}%)</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Convert; 