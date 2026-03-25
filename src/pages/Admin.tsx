import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase, SUPABASE_URL_USED } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Check, ChevronsUpDown, Download, FileText, LayoutDashboard, Link as LinkIcon, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type StorageEntry = {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: { size?: number; mimetype?: string } | null;
};

type FileTagRecord = {
  storage_path: string;
  tag: string | null;
};

type UploadAnalyticsRecord = {
  storage_path: string;
  created_at: string | null;
  tag: string | null;
  upload_status: string | null;
};

type TrendRange = "7d" | "30d" | "6m";

const BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "convert-uploads";
const FIXED_PREFIX = "convert/";
const TAG_COLORS = ["#7C5CFF", "#2DD4BF", "#F59E0B", "#F87171", "#60A5FA", "#A3E635", "#FB7185", "#22C55E"];

function normalizeTag(raw: string) {
  return raw.trim().replace(/\s+/g, " ");
}

function extractOriginalName(relativePath: string) {
  const last = relativePath.split("/").pop() || relativePath;
  return last.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i, "");
}

function parseStorageDate(path: string) {
  const match = path.match(/convert\/(\d{4}-\d{2}-\d{2})\//);
  if (!match) return null;
  const date = new Date(`${match[1]}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getEntryDate(entry: Pick<StorageEntry, "created_at" | "name">) {
  if (entry.created_at) {
    const parsed = new Date(entry.created_at);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return parseStorageDate(`${FIXED_PREFIX}${entry.name}`);
}

function getAnalyticsDate(record: UploadAnalyticsRecord) {
  if (record.created_at) {
    const parsed = new Date(record.created_at);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return parseStorageDate(record.storage_path);
}

function formatUploadDate(entry: StorageEntry) {
  const date = getEntryDate(entry);
  return date ? date.toLocaleDateString("fr-FR") : "—";
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatBucketLabel(date: Date, range: TrendRange) {
  if (range === "6m") return date.toLocaleDateString("fr-FR", { month: "short" });
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

function buildTrendSeries(records: UploadAnalyticsRecord[], range: TrendRange) {
  const now = new Date();
  const buckets: { key: string; label: string; value: number }[] = [];

  if (range === "6m") {
    for (let offset = 5; offset >= 0; offset -= 1) {
      const bucketDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
      buckets.push({
        key: bucketDate.toISOString().slice(0, 7),
        label: formatBucketLabel(bucketDate, range),
        value: 0,
      });
    }
  } else {
    const totalDays = range === "7d" ? 7 : 30;
    for (let offset = totalDays - 1; offset >= 0; offset -= 1) {
      const bucketDate = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset));
      buckets.push({
        key: bucketDate.toISOString().slice(0, 10),
        label: formatBucketLabel(bucketDate, range),
        value: 0,
      });
    }
  }

  const indexByKey = new Map(buckets.map((bucket, index) => [bucket.key, index]));
  for (const record of records) {
    const date = getAnalyticsDate(record);
    if (!date) continue;
    const key = range === "6m" ? startOfMonth(date).toISOString().slice(0, 7) : startOfDay(date).toISOString().slice(0, 10);
    const index = indexByKey.get(key);
    if (index !== undefined) buckets[index].value += 1;
  }

  return buckets;
}

function buildTagSeries(records: UploadAnalyticsRecord[]) {
  const counts = new Map<string, number>();
  for (const record of records) {
    const key = normalizeTag(record.tag || "") || "Sans tag";
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const sorted = Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  const total = sorted.reduce((sum, item) => sum + item.value, 0) || 1;

  return sorted.map((item, index) => ({
    ...item,
    color: TAG_COLORS[index % TAG_COLORS.length],
    percent: Math.round((item.value / total) * 100),
  }));
}

type FileTagSelectProps = {
  value: string | null;
  options: string[];
  disabled?: boolean;
  onChange: (nextTag: string | null) => void | Promise<void>;
};

function FileTagSelect({ value, options, disabled = false, onChange }: FileTagSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const normalizedSearch = normalizeTag(search);
  const filteredOptions = options.filter((tag) => tag.toLowerCase().includes(normalizedSearch.toLowerCase()));
  const hasExactMatch = options.some((tag) => tag.toLowerCase() === normalizedSearch.toLowerCase());
  const canCreate = normalizedSearch.length > 0 && !hasExactMatch;

  const closeAndReset = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setSearch("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex max-w-[180px] items-center gap-2 rounded-md border px-2.5 py-1 text-xs transition",
            value
              ? "border-[#3D2F57]/70 bg-[#3D2F57]/20 text-white hover:bg-[#3D2F57]/30"
              : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
            disabled ? "cursor-not-allowed opacity-60" : ""
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="truncate">{value || "Ajouter tag"}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[260px] border-white/10 bg-[#111119] p-3 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Choisir ou creer un tag..."
            className="border-white/10 bg-[#0b0b0f] text-white placeholder:text-white/40"
          />
          <div className="max-h-[260px] space-y-1 overflow-y-auto pr-1">
            {value && (
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
                onClick={() => {
                  void onChange(null);
                  closeAndReset();
                }}
              >
                <span>Retirer le tag</span>
                <X className="h-4 w-4" />
              </button>
            )}

            {canCreate && (
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-white transition hover:bg-white/10"
                onClick={() => {
                  void onChange(normalizedSearch);
                  closeAndReset();
                }}
              >
                <span className="truncate">Creer "{normalizedSearch}"</span>
                <span className="text-[11px] uppercase tracking-wide text-white/40">New</span>
              </button>
            )}

            {filteredOptions.map((tag) => {
              const isSelected = value?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  type="button"
                  key={tag}
                  className="flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm text-white transition hover:bg-white/10"
                  onClick={() => {
                    void onChange(tag);
                    closeAndReset();
                  }}
                >
                  <span className="truncate">{tag}</span>
                  <Check className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                </button>
              );
            })}

            {filteredOptions.length === 0 && !canCreate && (
              <div className="px-2 py-3 text-sm text-white/50">Aucun tag trouve.</div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MetricCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/55">{helper}</div>
    </div>
  );
}

function TrendToggle({ value, onChange }: { value: TrendRange; onChange: (value: TrendRange) => void }) {
  const options: { value: TrendRange; label: string }[] = [
    { value: "7d", label: "1 semaine" },
    { value: "30d", label: "1 mois" },
    { value: "6m", label: "6 mois" },
  ];

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            "rounded-full px-3 py-1.5 text-xs transition",
            value === option.value ? "bg-[#3D2F57] text-white" : "text-white/55 hover:text-white"
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function TrendChart({ data, isMobile }: { data: { label: string; value: number }[]; isMobile: boolean }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const labelStep = data.length > 10 ? Math.ceil(data.length / 6) : 1;

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-white">Fichiers ajoutes dans le temps</div>
          <div className="text-sm text-white/50">Volume des documents importes sur la periode choisie.</div>
        </div>
      </div>

      <div className="flex h-[220px] items-end gap-2 md:min-h-0 md:h-auto md:flex-1">
        {data.map((item, index) => {
          const height = Math.max((item.value / max) * 150, item.value > 0 ? 10 : 4);
          const mobileStep = data.length > 8 ? Math.ceil(data.length / 4) : 1;
          const showLabel = index % (isMobile ? mobileStep : labelStep) === 0 || index === data.length - 1;

          return (
            <div key={`${item.label}-${index}`} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
              <div className="text-center text-[11px] text-white/60">{item.value}</div>
              <div
                className="w-full rounded-t-[10px] bg-gradient-to-t from-[#7C5CFF] via-[#5B4AA8] to-[#2DD4BF] shadow-[0_8px_28px_rgba(124,92,255,0.18)]"
                style={{ height }}
              />
              <div className="h-8 text-center text-[9px] uppercase tracking-[0.1em] text-white/35 md:text-[10px] md:tracking-[0.14em]">
                {showLabel ? item.label : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; value: number; percent: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3">
        <div className="text-sm font-medium text-white">Repartition des tags</div>
        <div className="text-sm text-white/50">Vue globale des documents classes par tag.</div>
      </div>

      {total === 0 ? (
        <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-white/45">Aucune donnee de tag disponible.</div>
      ) : (
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[190px_1fr]">
          <div className="relative mx-auto h-[160px] w-[160px] self-center md:h-[180px] md:w-[180px]">
            <svg viewBox="0 0 120 120" className="h-full w-full">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
              <g transform="rotate(-90 60 60)">
                {data.map((item) => {
                  const segment = (item.value / total) * circumference;
                  const currentOffset = offset;
                  offset += segment;
                  return (
                    <circle
                      key={item.label}
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="12"
                      strokeDasharray={`${segment} ${circumference - segment}`}
                      strokeDashoffset={-currentOffset}
                      strokeLinecap="butt"
                    />
                  );
                })}
              </g>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-semibold text-white">{total}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/45">Docs</div>
            </div>
          </div>

          <div className="min-h-0 space-y-2 overflow-hidden">
            {data.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate text-xs text-white md:text-sm">{item.label}</span>
                </div>
                <div className="shrink-0 text-xs text-white/60 md:text-sm">
                  {item.value} · {item.percent}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminMenu({ onNavigate, onSignOut }: { onNavigate: (path: string) => void; onSignOut: () => void | Promise<void> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">
          <Menu className="mr-2 h-4 w-4" />
          Menu
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 border-white/10 bg-[#111119] p-2 text-white">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/10"
          onClick={() => onNavigate("/admin/home")}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </button>
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/10"
          onClick={() => onNavigate("/admin")}
        >
          <FileText className="h-4 w-4" />
          Fichiers
        </button>
        <div className="my-2 h-px bg-white/10" />
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          onClick={() => {
            void onSignOut();
          }}
        >
          <LogOut className="h-4 w-4" />
          Se deconnecter
        </button>
      </PopoverContent>
    </Popover>
  );
}

export default function Admin() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardView = location.pathname === "/admin/home";
  const [sessionChecked, setSessionChecked] = useState(false);
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [selectedSignedUrl, setSelectedSignedUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [sortKey, setSortKey] = useState<"name" | "created_at" | "size">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [tagsByPath, setTagsByPath] = useState<Record<string, string | null>>({});
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [savingTagPath, setSavingTagPath] = useState<string | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsRecords, setAnalyticsRecords] = useState<UploadAnalyticsRecord[]>([]);
  const [trendRange, setTrendRange] = useState<TrendRange>("30d");

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

      const { data, error } = await supabase.from("profiles").select("is_admin,email").eq("id", session.user.id).single();
      if (error) {
        console.warn("[admin] profiles check error", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(Boolean(data?.is_admin));
    };

    void run();
  }, [session?.user?.id]);

  const visibleEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filesOnly = entries.filter((entry) => entry.id !== null);
    const searched = q ? filesOnly.filter((entry) => entry.name.toLowerCase().includes(q)) : filesOnly;
    const getSize = (entry: StorageEntry) => (entry.id === null ? -1 : entry.metadata?.size ?? -1);

    return searched.slice().sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      if (sortKey === "created_at") cmp = (getEntryDate(a)?.getTime() || 0) - (getEntryDate(b)?.getTime() || 0);
      if (sortKey === "size") cmp = getSize(a) - getSize(b);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [entries, query, sortDir, sortKey]);

  const uploadedAnalyticsRecords = useMemo(() => {
    const sorted = analyticsRecords
      .filter((record) => record.upload_status !== "error")
      .slice()
      .sort((a, b) => (getAnalyticsDate(b)?.getTime() || 0) - (getAnalyticsDate(a)?.getTime() || 0));

    const deduped = new Map<string, UploadAnalyticsRecord>();
    for (const record of sorted) {
      if (!deduped.has(record.storage_path)) deduped.set(record.storage_path, record);
    }

    return Array.from(deduped.values());
  }, [analyticsRecords]);

  const trendSeries = useMemo(() => buildTrendSeries(uploadedAnalyticsRecords, trendRange), [trendRange, uploadedAnalyticsRecords]);
  const tagSeries = useMemo(() => buildTagSeries(uploadedAnalyticsRecords), [uploadedAnalyticsRecords]);
  const totalDocuments = uploadedAnalyticsRecords.length;
  const taggedDocuments = uploadedAnalyticsRecords.filter((record) => normalizeTag(record.tag || "").length > 0).length;
  const latestDocumentDate = uploadedAnalyticsRecords
    .map((record) => getAnalyticsDate(record))
    .filter((date): date is Date => Boolean(date))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const loadEntries = async () => {
    setLoading(true);
    try {
      const { data: root, error: rootError } = await supabase.storage
        .from(BUCKET)
        .list(FIXED_PREFIX, { limit: 500, offset: 0, sortBy: { column: "name", order: "desc" } });
      if (rootError) throw rootError;

      const rootItems = (root || []) as unknown as StorageEntry[];
      const folders = rootItems.filter((entry) => entry.id === null).map((entry) => entry.name).filter(Boolean);
      const results: StorageEntry[] = [];

      for (const folderName of folders) {
        const folderPrefix = `${FIXED_PREFIX}${folderName}/`;
        const { data: inside, error: insideError } = await supabase.storage
          .from(BUCKET)
          .list(folderPrefix, { limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } });
        if (insideError) throw insideError;

        const files = ((inside || []) as unknown as StorageEntry[])
          .filter((entry) => entry.id !== null)
          .map((entry) => ({ ...entry, name: `${folderName}/${entry.name}` }));

        results.push(...files);
      }

      setEntries(results);

      const fullPaths = results.map((entry) => `${FIXED_PREFIX}${entry.name}`);
      if (fullPaths.length > 0) {
        const { data: tagRows, error: tagError } = await supabase
          .from("convert_uploads")
          .select("storage_path, tag")
          .eq("storage_bucket", BUCKET)
          .in("storage_path", fullPaths);

        if (tagError) {
          console.warn("[admin] tag metadata load error", tagError);
        } else {
          setTagsByPath(
            Object.fromEntries(((tagRows || []) as FileTagRecord[]).map((row) => [row.storage_path, row.tag]))
          );
        }
      } else {
        setTagsByPath({});
      }

      const { data: allTagsRows, error: allTagsError } = await supabase
        .from("convert_uploads")
        .select("tag")
        .eq("storage_bucket", BUCKET)
        .not("tag", "is", null)
        .limit(1000);

      if (allTagsError) {
        console.warn("[admin] available tags load error", allTagsError);
      } else {
        const deduped = Array.from(
          new Map(
            (allTagsRows || [])
              .map((row) => normalizeTag(String((row as { tag: string | null }).tag || "")))
              .filter(Boolean)
              .map((tag) => [tag.toLowerCase(), tag] as const)
          ).values()
        ).sort((a, b) => a.localeCompare(b, "fr"));

        setAvailableTags(deduped);
      }
    } catch (error) {
      console.error("[admin] list error", error);
      toast({
        title: "Impossible de charger le bucket",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const { data, error } = await supabase
        .from("convert_uploads")
        .select("storage_path, created_at, tag, upload_status")
        .eq("storage_bucket", BUCKET)
        .order("created_at", { ascending: false })
        .limit(5000);

      if (error) throw error;
      setAnalyticsRecords((data || []) as UploadAnalyticsRecord[]);
    } catch (error) {
      console.error("[admin] analytics error", error);
      toast({
        title: "Impossible de charger le dashboard",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    if (isDashboardView) {
      void loadAnalytics();
      return;
    }
    void loadEntries();
  }, [isAdmin, isDashboardView]);

  const signInWithPassword = async () => {
    setIsSigningIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.session) throw new Error("Connexion echouee.");
      toast({ title: "Connecte", description: "Bienvenue sur l'admin." });
    } catch (error) {
      const isNetwork = error instanceof TypeError && String(error.message).toLowerCase().includes("fetch");
      toast({
        title: "Connexion impossible",
        description: isNetwork
          ? `Erreur reseau vers Supabase (${SUPABASE_URL_USED}). Verifie VITE_SUPABASE_URL (DNS) et relance le build.`
          : error instanceof Error
            ? error.message
            : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast({ title: "Deconnecte" });
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copie", description: text });
  };

  const getSignedUrlAndOpen = async (path: string, download = false) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60, { download });
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
    } catch (error) {
      toast({
        title: "Preview impossible",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setPreviewLoading(false);
    }
  };

  const pdfViewerUrl = useMemo(() => {
    if (!selectedSignedUrl) return null;
    return `${selectedSignedUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  }, [selectedSignedUrl]);

  const toggleSort = (key: "name" | "created_at" | "size") => {
    if (sortKey === key) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDir(key === "name" ? "asc" : "desc");
  };

  const stop = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const saveTag = async (entry: StorageEntry, nextTagRaw: string | null) => {
    const fullPath = `${FIXED_PREFIX}${entry.name}`;
    const nextTag = nextTagRaw ? normalizeTag(nextTagRaw) : null;
    const previousTag = tagsByPath[fullPath] ?? null;
    if (previousTag === nextTag) return;

    setSavingTagPath(fullPath);
    setTagsByPath((current) => ({ ...current, [fullPath]: nextTag }));
    if (nextTag) {
      setAvailableTags((current) =>
        Array.from(new Map([...current, nextTag].map((tag) => [tag.toLowerCase(), tag] as const)).values()).sort((a, b) =>
          a.localeCompare(b, "fr")
        )
      );
    }

    try {
      const { error } = await supabase.from("convert_uploads").upsert(
        [
          {
            original_filename: extractOriginalName(entry.name),
            mime_type: entry.metadata?.mimetype || "application/pdf",
            size_bytes: entry.metadata?.size ?? null,
            storage_bucket: BUCKET,
            storage_path: fullPath,
            upload_status: "uploaded",
            tag: nextTag,
          },
        ],
        { onConflict: "storage_bucket,storage_path" }
      );

      if (error) throw error;
    } catch (error) {
      setTagsByPath((current) => ({ ...current, [fullPath]: previousTag }));
      toast({
        title: "Impossible d'enregistrer le tag",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      });
      return;
    } finally {
      setSavingTagPath((current) => (current === fullPath ? null : current));
    }

    toast({
      title: nextTag ? "Tag enregistre" : "Tag retire",
      description: nextTag || extractOriginalName(entry.name),
    });
  };

  const renderFilesView = () => (
    <div className="h-full min-h-0 overflow-hidden">
      <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-[420px_1fr]">
        <div className={`h-full min-h-0 overflow-hidden ${selectedFilePath ? "hidden lg:block" : "block"}`}>
          <div className="h-full min-h-0 grid grid-rows-[56px_1fr] border-r border-white/10">
            <div className="flex items-center justify-between px-5 border-b border-white/10 bg-[#0f0f16]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-sm font-semibold">Fichiers</div>
                <div className="text-xs text-white/60">{visibleEntries.length}</div>
              </div>
              <div className="w-[220px] max-w-[45vw]">
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher..."
                  className="border-white/15 bg-[#0b0b0f] text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="h-full min-h-0 overflow-y-auto">
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
                        Tag / Upload{sortKey === "created_at" ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                      </button>
                    </TableHead>
                    <TableHead className="text-right text-white/60">⋯</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleEntries.map((entry) => {
                    const fullPath = `${FIXED_PREFIX}${entry.name}`;
                    const isPdf = entry.metadata?.mimetype === "application/pdf" || entry.name.toLowerCase().endsWith(".pdf");
                    const isSelected = selectedFilePath === fullPath;
                    return (
                      <TableRow
                        key={fullPath}
                        className={cn("border-white/10 hover:bg-white/5", isPdf ? "cursor-pointer" : "", isSelected ? "bg-white/10" : "")}
                        onClick={() => {
                          if (isPdf) void selectForPreview(fullPath);
                        }}
                        title={isPdf ? "Cliquer pour ouvrir" : undefined}
                      >
                        <TableCell className="text-white">
                          <div className={cn("flex items-center gap-2", isSelected ? "-ml-2 border-l-2 border-[#3D2F57] pl-2" : "")}>
                            <FileText className="h-4 w-4 text-white/70" />
                            <span className={isPdf ? "hover:underline" : ""}>{extractOriginalName(entry.name)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-white/70">
                          <div className="flex items-center gap-2">
                            <FileTagSelect
                              value={tagsByPath[fullPath] ?? null}
                              options={availableTags}
                              disabled={savingTagPath === fullPath}
                              onChange={(nextTag) => saveTag(entry, nextTag)}
                            />
                            <span className="truncate">{formatUploadDate(entry)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/15 bg-transparent text-white hover:bg-white/10"
                              onClick={(event) => {
                                stop(event);
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
                              onClick={async (event) => {
                                stop(event);
                                try {
                                  await getSignedUrlAndOpen(fullPath, true);
                                } catch (error) {
                                  toast({
                                    title: "Download impossible",
                                    description: error instanceof Error ? error.message : "Erreur inconnue",
                                    variant: "destructive",
                                  });
                                }
                              }}
                              title="Telecharger"
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
                        {loading ? "Chargement..." : "Aucun element."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="hidden h-full bg-[#0b0b0f] lg:block">
          {previewLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-white/60">Chargement...</div>
          ) : pdfViewerUrl ? (
            <iframe title="PDF preview" src={pdfViewerUrl} className="h-full w-full bg-[#0b0b0f]" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/60">Clique un PDF a gauche.</div>
          )}
        </div>

        <div className={`h-full lg:hidden ${selectedFilePath ? "block" : "hidden"}`}>
          <div className="relative h-full bg-[#0b0b0f]">
            <button
              type="button"
              className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/55"
              onClick={() => {
                setSelectedFilePath(null);
                setSelectedSignedUrl(null);
              }}
            >
              Retour
            </button>

            {previewLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-white/60">Chargement...</div>
            ) : pdfViewerUrl ? (
              <iframe title="PDF viewer" src={pdfViewerUrl} className="h-full w-full bg-[#0b0b0f]" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/60">Impossible d'afficher ce PDF.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardView = () => (
    <div className="h-full overflow-y-auto md:overflow-hidden">
      <div className="mx-auto grid min-h-full max-w-7xl gap-4 px-4 py-4 md:h-full md:grid-rows-[auto_auto_auto_1fr] md:px-5">
        <div className="rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-xl font-semibold tracking-tight text-white md:text-2xl">Vue generale des documents et des tags</h1>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Dashboard minimaliste pour suivre le volume de fichiers ajoutes et la repartition des documents selon les tags.
              </p>
            </div>
            <Button className="w-full bg-[#3D2F57] hover:bg-[#3D2F57]/90 md:w-auto" onClick={() => navigate("/admin")}>
              Voir les fichiers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {analyticsLoading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/55">Chargement du dashboard...</div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard label="Documents" value={String(totalDocuments)} helper="Nombre total de fichiers detectes dans le suivi." />
              <MetricCard label="Tags distincts" value={String(tagSeries.length)} helper={`${taggedDocuments} documents ont deja un tag.`} />
              <MetricCard
                label="Dernier ajout"
                value={latestDocumentDate ? latestDocumentDate.toLocaleDateString("fr-FR") : "—"}
                helper="Date du dernier document remonte dans l'historique."
              />
            </div>

            <div className="flex justify-start md:justify-end">
              <TrendToggle value={trendRange} onChange={setTrendRange} />
            </div>

            <div className="grid gap-4 md:min-h-0 xl:grid-cols-[1.5fr_1fr]">
              <TrendChart data={trendSeries} isMobile={isMobile} />
              <DonutChart data={tagSeries} />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const shell = (
    <div className="h-screen w-screen overflow-hidden bg-[#0b0b0f] text-white">
      <div className="grid h-full grid-rows-[56px_1fr]">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0f0f16] px-5">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#3D2F57]" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">Admin</span>
              <span className="text-xs text-white/60">{isDashboardView ? "dashboard" : BUCKET}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AdminMenu onNavigate={navigate} onSignOut={signOut} />
          </div>
        </div>

        <div className="h-full min-h-0">{isDashboardView ? renderDashboardView() : renderFilesView()}</div>
      </div>
    </div>
  );

  if (!sessionChecked) return shell;

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-[#0b0b0f] px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-1 text-lg font-semibold">Admin</div>
          <div className="mb-6 text-sm text-white/60">Connexion email + mot de passe.</div>
          <label className="text-xs text-white/60">Email</label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 border-white/15 bg-[#0b0b0f] text-white placeholder:text-white/40"
            placeholder="email@domaine.com"
            type="email"
          />
          <label className="mt-4 block text-xs text-white/60">Mot de passe</label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 border-white/15 bg-[#0b0b0f] text-white placeholder:text-white/40"
            placeholder="••••••••"
            type="password"
          />
          <Button
            className="mt-4 w-full bg-[#3D2F57] hover:bg-[#3D2F57]/90"
            onClick={signInWithPassword}
            disabled={isSigningIn || !email.includes("@") || password.length < 6}
          >
            {isSigningIn ? "Connexion..." : "Se connecter"}
          </Button>
          <div className="mt-4 text-xs text-white/50">Apres connexion, l'acces est limite aux utilisateurs `profiles.is_admin = true`.</div>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-[#0b0b0f] px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-1 text-lg font-semibold">Acces refuse</div>
          <div className="mb-6 text-sm text-white/60">Ton compte n'est pas admin.</div>
          <Button variant="outline" className="w-full border-white/15 bg-transparent text-white hover:bg-white/10" onClick={signOut}>
            Se deconnecter
          </Button>
        </div>
      </div>
    );
  }

  return shell;
}
