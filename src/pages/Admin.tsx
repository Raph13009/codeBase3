import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Folder, FileText, RefreshCw, LogOut, Link as LinkIcon, Download } from "lucide-react";

type StorageEntry = {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: { size?: number; mimetype?: string } | null;
};

const BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "convert-uploads";
const FIXED_PREFIX = "convert/";

function formatBytes(bytes?: number) {
  if (!bytes && bytes !== 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function Admin() {
  const { toast } = useToast();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  // We lock the admin to a single folder.
  const prefix = FIXED_PREFIX;
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [selectedSignedUrl, setSelectedSignedUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [sortKey, setSortKey] = useState<"name" | "created_at" | "size">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Lock global scroll (Supabase/Airtable-like shell)
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!session?.user?.id) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin,email")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.warn("[admin] profiles check error", error);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(Boolean(data?.is_admin));
    };
    run();
  }, [session?.user?.id]);

  const visibleEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.slice();
    const filesOnly = list.filter((e) => e.id !== null);
    const searched = q ? filesOnly.filter((e) => e.name.toLowerCase().includes(q)) : filesOnly;

    const getSize = (e: StorageEntry) => (e.id === null ? -1 : (e.metadata?.size ?? -1));
    const getTime = (v: string | null) => (v ? new Date(v).getTime() : 0);

    const sorted = searched.slice().sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      if (sortKey === "created_at") cmp = getTime(a.created_at) - getTime(b.created_at);
      if (sortKey === "size") cmp = getSize(a) - getSize(b);

      return sortDir === "asc" ? cmp : -cmp;
    });

    return sorted;
  }, [entries, query, sortKey, sortDir]);

  const loadEntries = async () => {
    setLoading(true);
    try {
      // Flatten `convert/<day>/file.pdf` into a single list.
      const { data: root, error: rootError } = await supabase.storage
        .from(BUCKET)
        .list(prefix, { limit: 500, offset: 0, sortBy: { column: "name", order: "desc" } });
      if (rootError) throw rootError;

      const rootItems = (root || []) as unknown as StorageEntry[];
      const folders = rootItems.filter((e) => e.id === null).map((e) => e.name).filter(Boolean);

      const results: StorageEntry[] = [];
      for (const folderName of folders) {
        const folderPrefix = `${prefix}${folderName}/`;
        const { data: inside, error: insideError } = await supabase.storage
          .from(BUCKET)
          .list(folderPrefix, { limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } });
        if (insideError) throw insideError;

        const files = ((inside || []) as unknown as StorageEntry[])
          .filter((e) => e.id !== null)
          .map((e) => ({ ...e, name: `${folderName}/${e.name}` })); // show relative path
        results.push(...files);
      }

      setEntries(results);
    } catch (e) {
      console.error("[admin] list error", e);
      toast({
        title: "Impossible de charger le bucket",
        description: e instanceof Error ? e.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) void loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const signInWithPassword = async () => {
    setIsSigningIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.session) throw new Error("Connexion échouée.");
      toast({
        title: "Connecté",
        description: "Bienvenue sur l’admin.",
      });
    } catch (e) {
      toast({
        title: "Connexion impossible",
        description: e instanceof Error ? e.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast({ title: "Déconnecté" });
  };

  const openFolder = (_name: string) => {};
  const goRoot = () => {};
  const goCrumb = (_value: string) => {};

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copié", description: text });
  };

  const getSignedUrlAndOpen = async (path: string, download = false) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60, {
      download,
    });
    if (error) throw error;
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const selectForPreview = async (path: string) => {
    setSelectedFilePath(path);
    setSelectedSignedUrl(null);
    setPreviewLoading(true);
    try {
      const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
      if (error) throw error;
      setSelectedSignedUrl(data.signedUrl);
    } catch (e) {
      toast({
        title: "Preview impossible",
        description: e instanceof Error ? e.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setPreviewLoading(false);
    }
  };

  const pdfViewerUrl = useMemo(() => {
    if (!selectedSignedUrl) return null;
    // Hide native PDF toolbar where supported and fit A4 nicely.
    return `${selectedSignedUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  }, [selectedSignedUrl]);

  const toggleSort = (key: "name" | "created_at" | "size") => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const extractOriginalName = (relativePath: string) => {
    // relativePath: "YYYY-MM-DD/<uuid>-<safeName>.pdf"
    const last = relativePath.split("/").pop() || relativePath;
    return last.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i, "");
  };

  const formatUploadDate = (entry: StorageEntry) => {
    // Prefer created_at; fallback to folder date (YYYY-MM-DD) at start of name
    if (entry.created_at) {
      const d = new Date(entry.created_at);
      return d.toLocaleDateString("fr-FR");
    }
    const maybeDay = entry.name.split("/")[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(maybeDay)) {
      const [y, m, d] = maybeDay.split("-");
      return `${d}/${m}/${y}`;
    }
    return "—";
  };

  const shell = (
    <div className="h-screen w-screen overflow-hidden bg-[#0b0b0f] text-white">
      <div className="h-full grid grid-rows-[56px_1fr]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 border-b border-white/10 bg-[#0f0f16]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3D2F57]" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">Admin</span>
              <span className="text-xs text-white/60">{BUCKET}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10" onClick={loadEntries} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Rafraîchir
            </Button>
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sortir
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="h-full">
          {/* Main */}
          <div className="h-full overflow-hidden">
            <div className="h-full grid grid-cols-1 lg:grid-cols-[420px_1fr]">
              {/* Left: list */}
              <div className={`h-full overflow-hidden ${selectedFilePath ? "hidden lg:block" : "block"}`}>
                <div className="h-full grid grid-rows-[56px_1fr] border-r border-white/10">
                  <div className="flex items-center justify-between px-5 border-b border-white/10 bg-[#0f0f16]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="text-sm font-semibold">Fichiers</div>
                      <div className="text-xs text-white/60">{visibleEntries.length}</div>
                    </div>
                    <div className="w-[220px] max-w-[45vw]">
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher…"
                        className="bg-[#0b0b0f] border-white/15 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div className="h-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-white/60">
                            <button type="button" className="hover:text-white transition-colors" onClick={() => toggleSort("name")}>
                              Nom{sortKey === "name" ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                            </button>
                          </TableHead>
                          <TableHead className="text-white/60">
                            <button type="button" className="hover:text-white transition-colors" onClick={() => toggleSort("created_at")}>
                              Upload{sortKey === "created_at" ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                            </button>
                          </TableHead>
                          <TableHead className="text-white/60 text-right">⋯</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visibleEntries.map((e) => {
                          const fullPath = prefix + e.name;
                          const isPdf = e.metadata?.mimetype === "application/pdf" || e.name.toLowerCase().endsWith(".pdf");
                          const rowClickable = isPdf;
                          const displayName = extractOriginalName(e.name);
                          const isSelected = selectedFilePath === fullPath;
                          return (
                            <TableRow
                              key={fullPath}
                              className={`border-white/10 hover:bg-white/5 ${rowClickable ? "cursor-pointer" : ""} ${
                                isSelected ? "bg-white/10" : ""
                              }`}
                              onClick={() => {
                                if (isPdf) return void selectForPreview(fullPath);
                              }}
                              title={rowClickable ? "Cliquer pour ouvrir" : undefined}
                            >
                              <TableCell className="text-white">
                                <div className={`flex items-center gap-2 ${isSelected ? "border-l-2 border-[#3D2F57] pl-2 -ml-2" : ""}`}>
                                  <FileText className="h-4 w-4 text-white/70" />
                                  <span className={`${rowClickable ? "hover:underline" : ""}`}>{displayName}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-white/70">{formatUploadDate(e)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-white/15 bg-transparent text-white hover:bg-white/10"
                                    onClick={(ev) => {
                                      stop(ev);
                                      void copyText(`${BUCKET}:${fullPath}`);
                                    }}
                                    title="Copier le chemin"
                                  >
                                    <LinkIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-white/15 bg-transparent text-white hover:bg-white/10"
                                    onClick={async (ev) => {
                                      stop(ev);
                                      try {
                                        await getSignedUrlAndOpen(fullPath, true);
                                      } catch (err) {
                                        toast({
                                          title: "Download impossible",
                                          description: err instanceof Error ? err.message : "Erreur inconnue",
                                          variant: "destructive",
                                        });
                                      }
                                    }}
                                    title="Télécharger"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        {visibleEntries.length === 0 && (
                          <TableRow className="border-white/10">
                            <TableCell colSpan={3} className="text-white/60">
                              {loading ? "Chargement…" : "Aucun élément."}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* Right: preview (desktop) */}
              <div className="hidden lg:block h-full bg-[#0b0b0f]">
                {previewLoading ? (
                  <div className="h-full flex items-center justify-center text-white/60 text-sm">Chargement…</div>
                ) : pdfViewerUrl ? (
                  <iframe title="PDF preview" src={pdfViewerUrl} className="w-full h-full bg-[#0b0b0f]" />
                ) : (
                  <div className="h-full flex items-center justify-center text-white/60 text-sm">Clique un PDF à gauche.</div>
                )}
              </div>
            </div>

            {/* Mobile viewer fullscreen (minimal) */}
            <div className={`lg:hidden h-full ${selectedFilePath ? "block" : "hidden"}`}>
              <div className="h-full relative bg-[#0b0b0f]">
                <button
                  type="button"
                  className="absolute top-4 left-4 z-10 rounded-full border border-white/15 bg-black/40 backdrop-blur px-4 py-2 text-sm text-white hover:bg-black/55 transition"
                  onClick={() => {
                    setSelectedFilePath(null);
                    setSelectedSignedUrl(null);
                  }}
                >
                  Retour
                </button>

                {previewLoading ? (
                  <div className="h-full flex items-center justify-center text-white/60 text-sm">Chargement…</div>
                ) : pdfViewerUrl ? (
                  <iframe title="PDF viewer" src={pdfViewerUrl} className="w-full h-full bg-[#0b0b0f]" />
                ) : (
                  <div className="h-full flex items-center justify-center text-white/60 text-sm">Impossible d’afficher ce PDF.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!sessionChecked) return shell; // avoid layout shift

  if (!session) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#0b0b0f] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold mb-1">Admin</div>
          <div className="text-sm text-white/60 mb-6">Connexion email + mot de passe.</div>
          <label className="text-xs text-white/60">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 bg-[#0b0b0f] border-white/15 text-white placeholder:text-white/40"
            placeholder="email@domaine.com"
            type="email"
          />
          <label className="text-xs text-white/60 mt-4 block">Mot de passe</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 bg-[#0b0b0f] border-white/15 text-white placeholder:text-white/40"
            placeholder="••••••••"
            type="password"
          />
          <Button
            className="w-full mt-4 bg-[#3D2F57] hover:bg-[#3D2F57]/90"
            onClick={signInWithPassword}
            disabled={isSigningIn || !email.includes("@") || password.length < 6}
          >
            {isSigningIn ? "Connexion…" : "Se connecter"}
          </Button>
          <div className="text-xs text-white/50 mt-4">
            Après connexion, l’accès est limité aux utilisateurs `profiles.is_admin = true`.
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#0b0b0f] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold mb-1">Accès refusé</div>
          <div className="text-sm text-white/60 mb-6">Ton compte n’est pas admin.</div>
          <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10 w-full" onClick={signOut}>
            Se déconnecter
          </Button>
        </div>
      </div>
    );
  }

  return shell;
}

