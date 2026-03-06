import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, Loader2, Shield, Lock, CheckCircle, FileUp, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaTags from "@/components/seo/MetaTags";

const WORKER_URL = "https://pdf-to-csv.raphaellevy027.workers.dev";

const FAQ_DATA = [
  {
    question: "Est-ce vraiment gratuit ?",
    answer: "Oui, totalement gratuit. Aucun compte, aucun abonnement, aucun frais caché.",
  },
  {
    question: "Faut-il créer un compte ?",
    answer: "Non. Uploadez votre PDF et téléchargez directement votre fichier Excel, sans inscription.",
  },
  {
    question: "Comment l'IA extrait-elle les tableaux ?",
    answer: "Nous utilisons une IA vision avancée (OCR) qui détecte et structure automatiquement les tableaux de n'importe quel PDF, y compris les documents scannés.",
  },
  {
    question: "Quels types de PDF fonctionnent le mieux ?",
    answer: "Certificats qualité, rapports de laboratoire, tableaux financiers, factures et tout PDF contenant des données structurées.",
  },
  {
    question: "Mes données sont-elles confidentielles ?",
    answer: "Votre fichier est traité instantanément puis supprimé. Nous ne stockons jamais vos documents.",
  },
  {
    question: "Quel est le format du fichier de sortie ?",
    answer: "Vous recevez un fichier .csv qui s'ouvre directement dans Excel, Google Sheets ou tout tableur.",
  },
];

type ProgressStep = 1 | 2 | 3;
type LayoutOption = "vertical" | "horizontal";

/** Mini spreadsheet: 3 columns × 5 rows, Excel-style (headers A B C, row numbers) */
function SpreadsheetPreviewPortrait({ selected }: { selected?: boolean }) {
  const cols = ["A", "B", "C"];
  const rows = 5;
  const cellW = 20;
  const cellH = 14;
  const headerH = 16;
  const rowNumW = 14;
  const border = "1px solid #d1d5db";
  return (
    <div className={`inline-block rounded overflow-hidden bg-white shadow-sm ${selected ? "border-4 border-[#217346]" : "border border-gray-300"}`} style={{ fontSize: "9px" }}>
      <table className="border-collapse" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: rowNumW, height: headerH, border, background: "#f3f4f6", color: "#6b7280", fontWeight: 600 }} />
            {cols.map((c) => (
              <th key={c} style={{ width: cellW, height: headerH, border, background: "#f3f4f6", color: "#374151", fontWeight: 600 }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, i) => (
            <tr key={i}>
              <td style={{ width: rowNumW, height: cellH, border, background: "#f9fafb", color: "#6b7280", textAlign: "center" }}>{i + 1}</td>
              {cols.map((_, j) => (
                <td key={j} style={{ width: cellW, height: cellH, border, background: "#fff" }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Mini spreadsheet: 6 columns × 2 rows, Excel-style */
function SpreadsheetPreviewLandscape({ selected }: { selected?: boolean }) {
  const cols = ["A", "B", "C", "D", "E", "F"];
  const rows = 2;
  const cellW = 18;
  const cellH = 18;
  const headerH = 16;
  const rowNumW = 14;
  const border = "1px solid #d1d5db";
  return (
    <div className={`inline-block rounded overflow-hidden bg-white shadow-sm ${selected ? "border-4 border-[#217346]" : "border border-gray-300"}`} style={{ fontSize: "9px" }}>
      <table className="border-collapse" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: rowNumW, height: headerH, border, background: "#f3f4f6", color: "#6b7280", fontWeight: 600 }} />
            {cols.map((c) => (
              <th key={c} style={{ width: cellW, height: headerH, border, background: "#f3f4f6", color: "#374151", fontWeight: 600 }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, i) => (
            <tr key={i}>
              <td style={{ width: rowNumW, height: cellH, border, background: "#f9fafb", color: "#6b7280", textAlign: "center" }}>{i + 1}</td>
              {cols.map((_, j) => (
                <td key={j} style={{ width: cellW, height: cellH, border, background: "#fff" }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PROGRESS_LABELS: Record<ProgressStep, string> = {
  1: "Envoi du fichier…",
  2: "L'IA extrait les tableaux…",
  3: "Téléchargement prêt ✓",
};

/** Parse CSV string and return first 5 rows as string[][]. Handles comma and semicolon. */
function parseCSVFirst5(csv: string): string[][] {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim());
  const rows: string[][] = [];
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    const sep = line.includes(";") && !line.includes(",") ? ";" : ",";
    const cells = line.split(sep).map((c) => c.replace(/^"|"$/g, "").trim());
    rows.push(cells);
  }
  return rows;
}

const Convert = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [layout, setLayout] = useState<LayoutOption>("vertical");
  const [isConverting, setIsConverting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [progressStep, setProgressStep] = useState<ProgressStep>(1);
  const [showWakeMsg, setShowWakeMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<string[][] | null>(null);
  const [conversionTimeMs, setConversionTimeMs] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolSectionRef = useRef<HTMLDivElement>(null);
  const wakeTimeout = useRef<NodeJS.Timeout | null>(null);
  const step2Timeout = useRef<NodeJS.Timeout | null>(null);
  const successTriggered = useRef(false);

  useEffect(() => {
    return () => {
      if (wakeTimeout.current) clearTimeout(wakeTimeout.current);
      if (step2Timeout.current) clearTimeout(step2Timeout.current);
    };
  }, []);

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
      setError("Veuillez déposer un fichier PDF.");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Veuillez sélectionner un fichier PDF.");
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const t0 = performance.now();
    setIsConverting(true);
    setIsScanning(true);
    setError(null);
    setPreviewData(null);
    setConversionTimeMs(null);
    setShowWakeMsg(false);
    setProgressStep(1);
    successTriggered.current = false;

    wakeTimeout.current = setTimeout(() => setShowWakeMsg(true), 8000);
    step2Timeout.current = setTimeout(() => setProgressStep(2), 1500);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("layout", layout);

      const response = await fetch(WORKER_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Le service de conversion est temporairement indisponible. Réessayez plus tard.");
        }
        if (response.status === 0 || response.status === 500) {
          throw new Error("Le serveur démarre. Patientez quelques secondes et réessayez.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "La conversion a échoué");
      }

      const elapsed = Math.round(performance.now() - t0);
      setProgressStep(3);
      setConversionTimeMs(elapsed);
      successTriggered.current = true;

      const blob = await response.blob();
      blob.text().then((text) => {
        try {
          setPreviewData(parseCSVFirst5(text));
        } catch {
          setPreviewData(null);
        }
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_Converted.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setTimeout(() => {
        setIsScanning(false);
        setIsConverting(false);
        setFile(null);
        setShowWakeMsg(false);
        setProgressStep(1);
        if (wakeTimeout.current) clearTimeout(wakeTimeout.current);
        if (step2Timeout.current) clearTimeout(step2Timeout.current);
      }, 1500);
    } catch (err) {
      console.error("Conversion error:", err);
      if (err instanceof Error && err.message.includes("Failed to fetch")) {
        setError("Le service est temporairement indisponible. Réessayez dans quelques minutes.");
      } else {
        setError(err instanceof Error ? err.message : "Une erreur s'est produite lors de la conversion.");
      }
      setIsScanning(false);
      setIsConverting(false);
      setFile(null);
      setShowWakeMsg(false);
      setProgressStep(1);
      if (wakeTimeout.current) clearTimeout(wakeTimeout.current);
      if (step2Timeout.current) clearTimeout(step2Timeout.current);
    }
  };

  return (
    <>
      <MetaTags
        title="Convertir PDF en Excel avec l'IA – Gratuit, Sans Inscription | BoostAI"
        description="Convertissez n'importe quel PDF en Excel instantanément grâce à l'IA. Sans inscription, sans logiciel. Uploadez votre PDF et téléchargez un tableau Excel structuré."
        keywords="convertir pdf en excel, convertir pdf en excel gratuit, convertir pdf en excel sans inscription, pdf en excel en ligne, ocr pdf vers excel, pdf to excel ia, convertisseur pdf excel gratuit"
        image="/assets/Logo.png"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <div
        className="min-h-screen text-white font-sans antialiased"
        style={{ background: "radial-gradient(ellipse at top, #3D2F57 0%, #222054 40%, #0a0a0f 100%)" }}
      >
        <Header />

        <main className="relative z-10">
          {/* 1. HERO */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pb-16">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5"
                style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Convertir un PDF en Excel avec l'IA
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                Déposez votre PDF — notre IA lit les tableaux et génère un fichier Excel structuré. Sans inscription. Sans logiciel. En quelques secondes.
              </motion.p>
            </div>
          </section>

          {/* 2. BLOC OUTIL */}
          <section ref={toolSectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-xl mx-auto">
              <motion.div
                className={`rounded-xl border-2 border-dashed p-8 sm:p-10 text-center transition-colors ${
                  isDragging
                    ? "border-[#5a4a6f] bg-[#3D2F57]/20"
                    : "border-white/20 bg-[#151515]/60 backdrop-blur-sm"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  accept=".pdf"
                  className="hidden"
                  aria-label="Sélectionner un PDF"
                />
                <Upload className="mx-auto h-11 w-11 text-white/50 mb-4" />
                {file ? (
                  <>
                    <p className="text-white font-medium truncate max-w-[280px] mx-auto mb-0.5">{file.name}</p>
                    <p className="text-white/50 text-sm mb-5">
                      Fichiers PDF uniquement · Traitement instantané
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white font-medium mb-1">
                      Glissez votre PDF ici ou cliquez pour parcourir
                    </p>
                    <p className="text-white/50 text-sm mb-5">
                      Fichiers PDF uniquement · Traitement instantané
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg px-4 py-2 bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-colors text-sm"
                      aria-label="Parcourir les fichiers"
                    >
                      Parcourir
                    </button>
                  </>
                )}
                {error && (
                  <p className="mt-3 text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}
              </motion.div>

              {/* Layout selector - centered, balanced */}
              <div className="mt-8 mx-auto max-w-[520px] text-center">
                <h3 className="text-white/70 text-sm font-medium mb-6">Choisir la disposition de sortie</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
                  <button
                    type="button"
                    onClick={() => setLayout("vertical")}
                    className="w-full sm:flex-1 sm:min-w-0 max-w-[240px] sm:max-w-none flex flex-col items-center justify-center cursor-pointer rounded-lg transition-colors hover:bg-white/5 py-4 px-3"
                    aria-pressed={layout === "vertical"}
                    aria-label="Portrait (vertical)"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <img src="/excel-logo.png" alt="" className="h-8 w-8 shrink-0 object-contain" aria-hidden />
                      <div className="mt-3">
                        <SpreadsheetPreviewPortrait selected={layout === "vertical"} />
                      </div>
                      <span className="text-sm font-medium text-white mt-2.5 block">Portrait</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("horizontal")}
                    className="w-full sm:flex-1 sm:min-w-0 max-w-[240px] sm:max-w-none flex flex-col items-center justify-center cursor-pointer rounded-lg transition-colors hover:bg-white/5 py-4 px-3"
                    aria-pressed={layout === "horizontal"}
                    aria-label="Paysage (horizontal)"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <img src="/excel-logo.png" alt="" className="h-8 w-8 shrink-0 object-contain" aria-hidden />
                      <div className="mt-3">
                        <SpreadsheetPreviewLandscape selected={layout === "horizontal"} />
                      </div>
                      <span className="text-sm font-medium text-white mt-2.5 block">Paysage</span>
                    </div>
                  </button>
                </div>
              </div>

              {file && (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="mt-6 w-full rounded-lg px-6 py-3 bg-[#3D2F57] text-white font-semibold hover:bg-[#5a4a6f] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors border border-[#5a4a6f]/50"
                  aria-label="Convertir en Excel"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Conversion…</span>
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-5 w-5" />
                      <span>Convertir en Excel</span>
                    </>
                  )}
                </button>
              )}
              {/* Preview + conversion time */}
              {(previewData !== null || conversionTimeMs !== null) && (
                <motion.div
                  className="mt-6 rounded-xl border border-white/10 bg-[#151515]/60 backdrop-blur-sm overflow-hidden"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {conversionTimeMs !== null && (
                    <p className="px-4 py-2 text-white/60 text-xs border-b border-white/10">
                      Conversion en {(conversionTimeMs / 1000).toFixed(1)} s
                    </p>
                  )}
                  {previewData !== null && previewData.length > 0 && (
                    <div className="overflow-x-auto p-4">
                      <table className="w-full text-left text-sm border-collapse">
                        <tbody>
                          {previewData.map((row, i) => (
                            <tr key={i} className="border-b border-white/10 last:border-0">
                              {row.map((cell, j) => (
                                <td key={j} className="py-1.5 px-2 text-white/90 whitespace-nowrap">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-white/50 text-xs mt-2">5 premières lignes · Fichier téléchargé</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </section>

          {/* 3. COMMENT ÇA MARCHE */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-10 sm:mb-12 text-center"
                style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
              >
                Comment ça marche ?
              </h2>
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    num: "1",
                    title: "Uploadez votre PDF",
                    desc: "Certificats, rapports, factures, tableaux — tout type de PDF",
                  },
                  {
                    num: "2",
                    title: "L'IA analyse et extrait",
                    desc: "Notre IA détecte automatiquement les tableaux via OCR et les structure intelligemment",
                  },
                  {
                    num: "3",
                    title: "Téléchargez votre fichier",
                    desc: "Un fichier Excel propre et prêt à l'emploi en quelques secondes",
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="rounded-xl bg-[#151515]/70 border border-white/10 p-6 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#3D2F57]/80 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/70">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. AVANTAGES */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-10 sm:mb-12 text-center"
                style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
              >
                Pourquoi utiliser notre convertisseur ?
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {[
                  { icon: CheckCircle, title: "Sans inscription", desc: "Aucun compte requis" },
                  { icon: FileUp, title: "IA + OCR", desc: "Lit même les PDF scannés" },
                  { icon: Shield, title: "Tous types de PDF", desc: "Certificats, rapports, factures" },
                  { icon: Lock, title: "100% gratuit", desc: "Aucun frais caché" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="rounded-xl bg-[#151515]/70 border border-white/10 p-5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <item.icon className="h-5 w-5 text-[#5a4a6f] mb-2" />
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10 text-center"
                style={{ fontFamily: "'Darker Grotesque', sans-serif" }}
              >
                Questions fréquentes
              </h2>
              <div className="rounded-xl border border-white/10 overflow-hidden bg-[#151515]/70">
                {FAQ_DATA.map((item, i) => (
                  <FAQItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                    open={openFaqIndex === i}
                    onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 6. CTA FOOTER */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-white/60 text-sm">
                Besoin d'automatisation IA pour votre entreprise ?{" "}
                <a href="/" className="text-[#d7c6ff] hover:text-white transition-colors font-medium">
                  Découvrir BoostAI Consulting →
                </a>
              </p>
            </div>
          </section>
        </main>

        {/* Overlay 3 étapes */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="rounded-xl bg-[#151515] border border-white/10 p-8 max-w-sm mx-4 text-center shadow-xl">
              {progressStep === 3 ? (
                <CheckCircle className="h-12 w-12 text-[#22c55e] mx-auto mb-4" />
              ) : (
                <Loader2 className="h-12 w-12 animate-spin text-[#5a4a6f] mx-auto mb-4" />
              )}
              <p className="text-white font-semibold">{PROGRESS_LABELS[progressStep]}</p>
              {progressStep === 3 && conversionTimeMs !== null && (
                <p className="text-white/50 text-sm mt-1">{(conversionTimeMs / 1000).toFixed(1)} s</p>
              )}
              {progressStep !== 3 && (
                <p className="text-white/50 text-sm mt-1">
                  {showWakeMsg ? "Le serveur démarre, patientez…" : "Cela peut prendre jusqu'à 30 secondes."}
                </p>
              )}
            </div>
          </motion.div>
        )}

        <Footer />
      </div>
    </>
  );
};

function FAQItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  const id = question.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="font-medium text-white text-left">{question}</span>
        <span
          className={`text-[#5a4a6f] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>
      <div
        id={id}
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[300px]" : "max-h-0"}`}
      >
        <p className="px-5 pb-4 pt-0 text-white/70 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default Convert;
