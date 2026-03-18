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
  const [email, setEmail] = useState("raphaellevy027@gmail.com");
  const [sendingLink, setSendingLink] = useState(false);

  const [prefix, setPrefix] = useState<string>(""); // folder path, '' = root
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

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

  const breadcrumbs = useMemo(() => {
    if (!prefix) return [];
    const parts = prefix.replace(/\/$/, "").split("/").filter(Boolean);
    const crumbs = parts.map((p, idx) => ({
      label: p,
      value: parts.slice(0, idx + 1).join("/") + "/",
    }));
    return crumbs;
  }, [prefix]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.slice();
    const folders = list.filter((e) => e.id === null);
    const files = list.filter((e) => e.id !== null);
    const combined = [...folders, ...files];
    if (!q) return combined;
    return combined.filter((e) => e.name.toLowerCase().includes(q));
  }, [entries, query]);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(prefix, { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });

      if (error) throw error;
      setEntries((data || []) as unknown as StorageEntry[]);
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
  }, [isAdmin, prefix]);

  const signInWithLink = async () => {
    setSendingLink(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) throw error;
      toast({
        title: "Lien envoyé",
        description: "Ouvre l’email et clique sur le lien pour te connecter.",
      });
    } catch (e) {
      toast({
        title: "Connexion impossible",
        description: e instanceof Error ? e.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setSendingLink(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast({ title: "Déconnecté" });
  };

  const openFolder = (name: string) => setPrefix((prefix ? prefix : "") + name + "/");
  const goRoot = () => setPrefix("");
  const goCrumb = (value: string) => setPrefix(value);

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
        <div className="h-full grid grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className="h-full border-r border-white/10 bg-[#0f0f16] p-4 overflow-hidden">
            <div className="text-xs text-white/60 mb-2">Navigation</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <button
                type="button"
                className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/10 transition ${prefix === "" ? "bg-white/10" : ""}`}
                onClick={goRoot}
              >
                Root
              </button>
              {breadcrumbs.length > 0 && (
                <div className="mt-2 border-t border-white/10 pt-2">
                  {breadcrumbs.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/10 transition ${
                        prefix === c.value ? "bg-white/10" : ""
                      }`}
                      onClick={() => goCrumb(c.value)}
                      title={c.value}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-white/60 mb-2">Recherche</div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nom de fichier…"
              className="bg-[#0b0b0f] border-white/15 text-white placeholder:text-white/40"
            />

            <div className="mt-4 text-xs text-white/60">
              Astuce: clique un dossier pour entrer. Les actions créent un lien signé (60s).
            </div>
          </div>

          {/* Main */}
          <div className="h-full overflow-hidden p-4">
            <div className="h-full rounded-xl border border-white/10 bg-white/5 overflow-hidden grid grid-rows-[52px_1fr]">
              <div className="flex items-center justify-between px-4 border-b border-white/10 bg-white/5">
                <div className="text-sm font-semibold">
                  {prefix ? `/${prefix}` : "/"}
                </div>
                <div className="text-xs text-white/60">{filteredEntries.length} éléments</div>
              </div>

              <div className="h-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white/60">Nom</TableHead>
                      <TableHead className="text-white/60">Type</TableHead>
                      <TableHead className="text-white/60">Taille</TableHead>
                      <TableHead className="text-white/60">Maj</TableHead>
                      <TableHead className="text-white/60 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((e) => {
                      const isFolder = e.id === null;
                      const fullPath = prefix + e.name;
                      return (
                        <TableRow key={fullPath} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white">
                            <div className="flex items-center gap-2">
                              {isFolder ? <Folder className="h-4 w-4 text-white/70" /> : <FileText className="h-4 w-4 text-white/70" />}
                              <button
                                type="button"
                                className={`text-left ${isFolder ? "hover:underline" : ""}`}
                                onClick={() => isFolder && openFolder(e.name)}
                                disabled={!isFolder}
                              >
                                {e.name}
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="text-white/70">{isFolder ? "Dossier" : (e.metadata?.mimetype || "Fichier")}</TableCell>
                          <TableCell className="text-white/70">{isFolder ? "—" : formatBytes(e.metadata?.size)}</TableCell>
                          <TableCell className="text-white/70">{e.updated_at ? new Date(e.updated_at).toLocaleString() : "—"}</TableCell>
                          <TableCell className="text-right">
                            {!isFolder ? (
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/15 bg-transparent text-white hover:bg-white/10"
                                  onClick={() => copyText(`${BUCKET}:${fullPath}`)}
                                  title="Copier le chemin"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/15 bg-transparent text-white hover:bg-white/10"
                                  onClick={async () => {
                                    try {
                                      await getSignedUrlAndOpen(fullPath, false);
                                    } catch (err) {
                                      toast({
                                        title: "Lien impossible",
                                        description: err instanceof Error ? err.message : "Erreur inconnue",
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                  title="Ouvrir (lien signé)"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/15 bg-transparent text-white hover:bg-white/10"
                                  onClick={async () => {
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
                            ) : (
                              <span className="text-white/40 text-xs">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}

                    {filteredEntries.length === 0 && (
                      <TableRow className="border-white/10">
                        <TableCell colSpan={5} className="text-white/60">
                          {loading ? "Chargement…" : "Aucun élément."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
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
          <div className="text-sm text-white/60 mb-6">Connexion par lien magique (Supabase Auth).</div>
          <label className="text-xs text-white/60">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 bg-[#0b0b0f] border-white/15 text-white placeholder:text-white/40"
            placeholder="email@domaine.com"
            type="email"
          />
          <Button
            className="w-full mt-4 bg-[#3D2F57] hover:bg-[#3D2F57]/90"
            onClick={signInWithLink}
            disabled={sendingLink || !email.includes("@")}
          >
            {sendingLink ? "Envoi…" : "Envoyer le lien"}
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

