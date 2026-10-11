import { useState, useRef, useEffect } from "react";
import { Upload, FileSpreadsheet, Loader2, CheckCircle, Download } from "lucide-react";
import MetaTags from "@/components/seo/MetaTags";
import { Icon, StLink } from "@/components/studio/motion";
import { PageHero } from "@/components/studio/PageHero";
import { supabase } from "@/lib/supabase";

const WORKER_URL = "https://pdf-to-csv.raphaellevy027.workers.dev";
const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "convert-uploads";
const UPLOADS_ENABLED = String(import.meta.env.VITE_CONVERT_UPLOADS_ENABLED || "").toLowerCase() === "true";

function sanitizeFilename(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 120);
}

async function uploadPdfBestEffort(file: File, layout: string) {
  if (!UPLOADS_ENABLED) return;
  try {
    const supabaseUrlRaw = String(import.meta.env.VITE_SUPABASE_URL || "");
    let supabaseOrigin = "";
    try {
      supabaseOrigin = supabaseUrlRaw ? new URL(supabaseUrlRaw).origin : "";
    } catch {
      supabaseOrigin = supabaseUrlRaw;
    }

    console.info("[convert][upload] enabled", {
      bucket: STORAGE_BUCKET,
      fileName: file.name,
      size: file.size,
      type: file.type,
      layout,
      supabaseUrl: supabaseOrigin,
    });

    const day = new Date().toISOString().slice(0, 10);
    const id = crypto.randomUUID();
    const safeName = sanitizeFilename(file.name || "document.pdf");
    const path = `convert/${day}/${id}-${safeName}`;

    console.info("[convert][upload] uploading", { path });
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        contentType: file.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.warn("[convert][upload] upload error", uploadError);
      // optional log table; ignore if it doesn't exist / fails
      try {
        await supabase.from("convert_uploads").insert([
          {
            original_filename: file.name,
            mime_type: file.type || "application/pdf",
            size_bytes: file.size,
            storage_bucket: STORAGE_BUCKET,
            storage_path: path,
            upload_status: "error",
            error_message: uploadError.message,
          },
        ]);
      } catch (e) {
        console.warn("[convert][upload] insert log failed (ignored)", e);
      }
      return;
    }

    console.info("[convert][upload] upload ok", { path });
    try {
      await supabase.from("convert_uploads").insert([
        {
          original_filename: file.name,
          mime_type: file.type || "application/pdf",
          size_bytes: file.size,
          storage_bucket: STORAGE_BUCKET,
          storage_path: path,
          upload_status: "uploaded",
        },
      ]);
    } catch (e) {
      console.warn("[convert][upload] insert log failed (ignored)", e);
    }
  } catch (e) {
    // best-effort only: never block conversion
    console.warn("[convert][upload] threw:", e);
  }
}

const FAQ_DATA = [
  {
    question: "Est-ce vraiment gratuit\u00a0?",
    answer: "Oui, totalement gratuit. Aucun compte, aucun abonnement, aucun frais caché.",
  },
  {
    question: "Faut-il créer un compte\u00a0?",
    answer: "Non. Uploadez votre PDF et téléchargez directement votre fichier Excel, sans inscription.",
  },
  {
    question: "Comment l'IA extrait-elle les tableaux\u00a0?",
    answer: "Nous utilisons une IA vision avancée (OCR) qui détecte et structure automatiquement les tableaux de n'importe quel PDF, y compris les documents scannés.",
  },
  {
    question: "Quels types de PDF fonctionnent le mieux\u00a0?",
    answer: "Certificats qualité, rapports de laboratoire, tableaux financiers, factures et tout PDF contenant des données structurées.",
  },
  {
    question: "Mes données sont-elles confidentielles\u00a0?",
    answer: "Votre fichier est traité instantanément puis supprimé. Nous ne stockons jamais vos documents.",
  },
  {
    question: "Quel est le format du fichier de sortie\u00a0?",
    answer: "Vous recevez un fichier .csv qui s'ouvre directement dans Excel, Google Sheets ou tout tableur.",
  },
];

const STEPS = [
  { title: "Uploadez votre PDF", desc: "Certificats, rapports, factures, tableaux\u00a0: tout type de PDF." },
  { title: "L'IA analyse et extrait", desc: "Notre IA détecte automatiquement les tableaux via OCR et les structure intelligemment." },
  { title: "Téléchargez votre fichier", desc: "Un fichier Excel propre et prêt à l'emploi en quelques secondes." },
];

const ADVANTAGES = [
  { title: "Sans inscription", desc: "Aucun compte requis." },
  { title: "IA + OCR", desc: "Lit même les PDF scannés." },
  { title: "Tous types de PDF", desc: "Certificats, rapports, factures." },
  { title: "100 % gratuit", desc: "Aucun frais caché." },
];

const B2B_POINTS = [
  { title: "Traitement PDF en masse", desc: "Des centaines de PDF convertis en tableaux Excel structurés, automatiquement." },
  { title: "Documents scannés acceptés", desc: "OCR et extraction structurée pour tout type de document." },
  { title: "Intégré à votre process", desc: "Nous déployons l'automatisation directement dans votre process interne." },
];

const B2B_MAILTO =
  "mailto:contact@boostaiconsulting.com?subject=Demande%20automatisation%20PDF%20Excel%20%2F%20volumes&body=Bonjour%2C%0A%0AJe%20souhaite%20discuter%20d%27une%20solution%20d%27automatisation%20PDF%20vers%20Excel%20pour%20mon%20entreprise%20%3A%0A-%20volumes%20importants%0A-%20usage%20interne%20ou%20int%C3%A9gration%0A%0AMerci%20de%20me%20recontacter.";

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
    <div className={`inline-block rounded overflow-hidden bg-white shadow-sm ${selected ? "border-2 border-[#0e0e0d]" : "border border-gray-300"}`} style={{ fontSize: "9px" }}>
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
    <div className={`inline-block rounded overflow-hidden bg-white shadow-sm ${selected ? "border-2 border-[#0e0e0d]" : "border border-gray-300"}`} style={{ fontSize: "9px" }}>
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
  const lastDownloadRef = useRef<{ blob: Blob; filename: string } | null>(null);

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
    // Reset so that picking the same file again still fires a change
    e.target.value = "";
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
      // Best-effort storage upload (never blocks the conversion flow)
      void uploadPdfBestEffort(file, layout);

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
        const errorData = await response.json().catch(() => ({}));
        const serverMessage = errorData.error || errorData.message;
        if (response.status === 500 && serverMessage) {
          throw new Error(serverMessage);
        }
        if (response.status === 500 || response.status === 0) {
          throw new Error("Une erreur s'est produite côté serveur. Réessayez dans quelques instants.");
        }
        throw new Error(serverMessage || "La conversion a échoué");
      }

      const elapsed = Math.round(performance.now() - t0);
      setProgressStep(3);
      setConversionTimeMs(elapsed);
      successTriggered.current = true;

      const blob = await response.blob();
      const filename = file.name.replace(/\.pdf$/i, "_Converted.csv");
      lastDownloadRef.current = { blob, filename };
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
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      fetch("/api/log-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, layout }),
      }).catch(() => {});

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

  const done = previewData !== null || conversionTimeMs !== null;
  const dropState = done ? "done" : file ? "file" : isDragging ? "drag" : "idle";

  const downloadAgain = () => {
    if (!lastDownloadRef.current) return;
    const { blob, filename } = lastDownloadRef.current;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <MetaTags
        title="Convertir PDF en Excel avec l'IA – Gratuit, Sans Inscription | BoostAI"
        description="Convertissez n'importe quel PDF en Excel instantanément grâce à l'IA. Sans inscription, sans logiciel. Uploadez votre PDF et téléchargez un tableau Excel structuré."
        keywords="convertir pdf en excel, convertir pdf en excel gratuit, convertir pdf en excel sans inscription, pdf en excel en ligne, ocr pdf vers excel, pdf to excel ia, convertisseur pdf excel gratuit"
        image="/android-chrome-512x512.png"
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

      <main id="contenu" tabIndex={-1}>
        <PageHero
          label="(Outil gratuit)"
          line1="PDF → Excel"
          line2="avec l'IA."
          title="Convertir un PDF en Excel avec l'IA"
          size="lg"
          height="md"
          foot={<span>Gratuit · Sans inscription · PDF scannés acceptés</span>}
        >
          <p>
            Notre IA lit automatiquement les tableaux dans vos PDF et génère un fichier Excel structuré en quelques
            secondes.
          </p>
          <StLink href="#outil" className="st-link" cursor="Essayer">
            Essayer maintenant <Icon name="arrow-down" />
          </StLink>
        </PageHero>

        {/* Tool */}
        <section className="st-convert" id="outil" ref={toolSectionRef} aria-labelledby="st-convert-title">
          <div className="st-convert-tool">
            <div className="st-convert-head">
              <h2 id="st-convert-title">Votre PDF, en tableau.</h2>
              <span className="st-paren">(Traitement instantané)</span>
            </div>

            <div
              className="st-drop"
              data-state={dropState}
              onDragOver={done ? undefined : handleDragOver}
              onDragLeave={done ? undefined : handleDragLeave}
              onDrop={done ? undefined : handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept=".pdf"
                className="sr-only"
                tabIndex={-1}
                aria-label="Sélectionner un PDF"
              />
              {done ? (
                <div className="st-drop-done">
                  <p className="st-drop-title">
                    <CheckCircle aria-hidden="true" /> Fichier converti
                    {conversionTimeMs !== null ? <span> en {(conversionTimeMs / 1000).toFixed(1)} s</span> : null}
                  </p>
                  {previewData !== null && previewData.length > 0 ? (
                    <div className="st-drop-table" data-lenis-prevent>
                      <table>
                        <tbody>
                          {previewData.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td key={j}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  <p className="st-drop-note">5 premières lignes · Fichier téléchargé</p>
                  <div className="st-drop-actions">
                    {lastDownloadRef.current ? (
                      <button type="button" className="st-pill st-pill--dark st-pill--fill" onClick={downloadAgain}>
                        <Download aria-hidden="true" /> Télécharger à nouveau
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="st-text-btn"
                      onClick={() => {
                        lastDownloadRef.current = null;
                        setPreviewData(null);
                        setConversionTimeMs(null);
                      }}
                    >
                      Supprimer définitivement mes données
                    </button>
                  </div>
                </div>
              ) : file ? (
                <div className="st-drop-file">
                  <FileSpreadsheet className="st-drop-ico" aria-hidden="true" />
                  <p className="st-drop-title">{file.name}</p>
                  <p className="st-drop-note">Fichiers PDF uniquement · Traitement instantané</p>
                  <div className="st-drop-actions">
                    <button
                      type="button"
                      className="st-pill st-pill--dark st-pill--fill"
                      onClick={handleConvert}
                      disabled={isConverting}
                    >
                      {isConverting ? (
                        <>
                          <Loader2 className="st-spin" aria-hidden="true" /> Conversion…
                        </>
                      ) : (
                        "Convertir en Excel"
                      )}
                    </button>
                    <button type="button" className="st-text-btn" onClick={() => setFile(null)} disabled={isConverting}>
                      Changer de fichier
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="st-drop-idle" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="st-drop-ico" aria-hidden="true" />
                  <span className="st-drop-title">Glissez votre PDF ici</span>
                  <span className="st-drop-note">ou cliquez pour parcourir · PDF uniquement</span>
                  <span className="st-pill st-pill--dark">Parcourir</span>
                </button>
              )}
              {error ? (
                <p className="st-drop-error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <fieldset className="st-layouts">
              <legend>Disposition du tableau</legend>
              <div>
                <button
                  type="button"
                  onClick={() => setLayout("vertical")}
                  aria-pressed={layout === "vertical"}
                  aria-label="Portrait (vertical)"
                >
                  <SpreadsheetPreviewPortrait selected={layout === "vertical"} />
                  <span>Portrait</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayout("horizontal")}
                  aria-pressed={layout === "horizontal"}
                  aria-label="Paysage (horizontal)"
                >
                  <SpreadsheetPreviewLandscape selected={layout === "horizontal"} />
                  <span>Paysage</span>
                </button>
              </div>
            </fieldset>

            <p className="st-convert-legal">
              Comment vos documents sont traités&nbsp;: <StLink href="/ocr-terms">conditions OCR</StLink>.
            </p>
          </div>

          <div className="st-convert-steps">
            <p className="st-paren">(Comment ça marche)</p>
            <ol>
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <span className="n">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why */}
        <section className="st-convert-why" aria-labelledby="st-why-title">
          <h2 className="st-label" id="st-why-title">
            <b>01</b> Pourquoi ce convertisseur
          </h2>
          <ul>
            {ADVANTAGES.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* B2B */}
        <section className="st-convert-b2b" aria-labelledby="st-b2b-title">
          <p className="st-convert-flow" aria-hidden="true">
            <span>PDF</span>
            <i />
            <span>Excel</span>
            <i />
            <span>Base de données</span>
          </p>
          <h2 id="st-b2b-title">
            Des centaines de PDF par mois&nbsp;? <span className="serif">On automatise.</span>
          </h2>
          <div className="st-b2b-grid">
            <p className="st-b2b-lead">
              Nous construisons des chaînes d'automatisation sur mesure qui convertissent de gros volumes de PDF
              (certificats, rapports, factures) en données Excel structurées, directement dans votre process.
            </p>
            <ul>
              {B2B_POINTS.map((point) => (
                <li key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="st-b2b-foot">
            <div className="st-b2b-trust">
              <span>Ils nous font confiance</span>
              <img src="/images/CodigLogo.png" alt="CoDIG SAS" width={41} height={48} loading="lazy" decoding="async" />
            </div>
            <a className="st-pill st-pill--dark" href={B2B_MAILTO} data-cursor="Écrire">
              Mettre en place cette solution
            </a>
          </div>
          <p className="st-b2b-note">Setup sur mesure · Mise en place rapide · Sans engagement</p>
        </section>

        {/* FAQ */}
        <section className="st-faq" aria-labelledby="st-faq-title">
          <div className="st-faq-head">
            <p className="st-paren">(FAQ)</p>
            <h2 id="st-faq-title">
              Questions <span className="serif">fréquentes</span>
            </h2>
          </div>
          <div className="st-faq-list">
            {FAQ_DATA.map((item, i) => (
              <FAQItem
                key={item.question}
                index={i}
                question={item.question}
                answer={item.answer}
                open={openFaqIndex === i}
                onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              />
            ))}
          </div>
          <p className="st-faq-more">
            Besoin d'automatisation IA pour votre entreprise&nbsp;?{" "}
            <StLink href="/" className="st-inline-link">
              Découvrir BoostAI Consulting
            </StLink>
          </p>
        </section>
      </main>

      {/* Three-step progress while the file is processed */}
      {isScanning ? (
        <div className="st-convert-overlay" role="status" aria-live="polite">
          <div>
            <span className="st-convert-overlay-step">
              {String(progressStep).padStart(2, "0")}
              <em>/ 03</em>
            </span>
            {progressStep === 3 ? <CheckCircle aria-hidden="true" /> : <Loader2 className="st-spin" aria-hidden="true" />}
            <p>{PROGRESS_LABELS[progressStep]}</p>
            <small>
              {progressStep === 3 && conversionTimeMs !== null
                ? `${(conversionTimeMs / 1000).toFixed(1)} s`
                : showWakeMsg
                  ? "Le serveur démarre, patientez…"
                  : "Cela peut prendre jusqu'à 30 secondes."}
            </small>
            <span className="st-convert-overlay-bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${progressStep / 3})` }} />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

function FAQItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${index}`;
  return (
    <div className="st-faq-item" data-open={open}>
      <h3>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id}>
          <span className="n">0{index + 1}</span>
          <span className="q">{question}</span>
          <Icon name="plus" />
        </button>
      </h3>
      <div className="st-faq-a" id={id} role="region" aria-label={question}>
        <div>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Convert;
