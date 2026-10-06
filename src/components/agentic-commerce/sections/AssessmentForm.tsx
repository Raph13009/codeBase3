import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import {
  Accent,
  ArrowIcon,
  Reveal,
  SectionLabel,
} from "@/components/agentic-commerce/motion";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

type FormValues = {
  email: string;
  name: string;
  company: string;
  website: string;
  role: string;
  platform: string;
  exploring: string;
  volume: string;
  message: string;
  consent: boolean;
};

const emptyValues: FormValues = {
  email: "",
  name: "",
  company: "",
  website: "",
  role: "",
  platform: "",
  exploring: "",
  volume: "",
  message: "",
  consent: false,
};

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const FORM_NAME = "Agentic Commerce Readiness Assessment";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function AssessmentForm({ locale, dict }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const submittingRef = useRef(false);

  const accessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!accessKey) return dict.form.configError;
    if (!values.email.trim() || !isValidEmail(values.email)) {
      return dict.form.validationError;
    }
    if (
      values.name.trim().length < 2 ||
      values.company.trim().length < 2 ||
      values.website.trim().length < 3 ||
      values.role.trim().length < 2 ||
      values.platform.trim().length < 2 ||
      !values.exploring ||
      !values.consent
    ) {
      return dict.form.validationError;
    }
    return null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || status === "loading") return;

    setErrorMessage(null);
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    submittingRef.current = true;
    setStatus("loading");

    const payload = {
      access_key: accessKey,
      subject: `[${FORM_NAME}] ${values.company.trim()}`,
      from_name: values.name.trim(),
      form_name: FORM_NAME,
      source_page: `${agenticSiteConfig.url}/${locale}/agentic-commerce`,
      language: locale,
      submitted_at: new Date().toISOString(),
      email: values.email.trim(),
      name: values.name.trim(),
      company: values.company.trim(),
      website: values.website.trim(),
      role: values.role.trim(),
      platform: values.platform.trim(),
      exploring: values.exploring,
      volume: values.volume.trim(),
      message: values.message.trim(),
      consent: values.consent ? "yes" : "no",
      botcheck: false,
    };

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let json: { success?: boolean; message?: string } = {};
      try {
        json = await res.json();
      } catch {
        json = {};
      }

      if (!res.ok || json.success !== true) {
        setStatus("error");
        setErrorMessage(dict.form.error);
        return;
      }

      setValues(emptyValues);
      setStatus("success");
      trackAgenticEvent("lead_submitted", { locale });
    } catch {
      setStatus("error");
      setErrorMessage(dict.form.error);
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <section
      id="assess"
      className="scroll-mt-28 bg-ac-surface-low px-4 py-24 sm:px-6 md:px-8 md:py-32"
    >
      <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-40px_rgba(11,11,12,0.35)] md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative flex flex-col justify-between gap-12 overflow-hidden bg-[var(--ac-ink)] p-8 text-white md:p-12">
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-ac-primary/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <SectionLabel index="06" label={dict.labels.assess} dark />
            <h2 className="ac-text-balance mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.035em] md:text-5xl">
              <Accent text={dict.form.title} />
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
              {dict.form.subtitle}
            </p>
          </div>
          <div className="relative space-y-2">
            <p className="ac-mono text-white/40">{dict.hero.reassurance}</p>
            <a
              href={`mailto:${agenticSiteConfig.email}`}
              className="inline-block text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-ac-primary hover:underline"
            >
              {agenticSiteConfig.email}
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-12">

        {status === "success" ? (
          <p
            className="flex h-full items-center rounded-2xl bg-ac-surface-low px-6 py-8 text-lg font-medium text-ac-on-surface"
            role="status"
          >
            {dict.form.success}
          </p>
        ) : (
          <form className="grid gap-6" onSubmit={onSubmit} noValidate>
            {/* Web3Forms recommended honeypot — must stay unchecked/hidden */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <Field
              label={dict.form.fields.email}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(v) => setField("email", v)}
            />
            <Field
              label={dict.form.fields.name}
              name="name"
              required
              autoComplete="name"
              value={values.name}
              onChange={(v) => setField("name", v)}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label={dict.form.fields.company}
                name="company"
                required
                autoComplete="organization"
                value={values.company}
                onChange={(v) => setField("company", v)}
              />
              <Field
                label={dict.form.fields.website}
                name="website"
                required
                autoComplete="url"
                placeholder="https://"
                value={values.website}
                onChange={(v) => setField("website", v)}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label={dict.form.fields.role}
                name="role"
                required
                value={values.role}
                onChange={(v) => setField("role", v)}
              />
              <Field
                label={dict.form.fields.platform}
                name="platform"
                required
                value={values.platform}
                onChange={(v) => setField("platform", v)}
              />
            </div>

            <label
              htmlFor="ac-field-exploring"
              className="ac-mono grid gap-1 text-ac-muted"
            >
              {dict.form.fields.exploring}
              <select
                id="ac-field-exploring"
                name="exploring"
                required
                className="ac-input font-display normal-case tracking-normal"
                value={values.exploring}
                onChange={(e) => setField("exploring", e.target.value)}
              >
                <option value="" disabled>
                  —
                </option>
                {dict.form.exploringOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <Field
              label={`${dict.form.fields.volume} (${dict.form.fields.volumeOptional})`}
              name="volume"
              value={values.volume}
              onChange={(v) => setField("volume", v)}
            />

            <label
              htmlFor="ac-field-message"
              className="ac-mono grid gap-1 text-ac-muted"
            >
              {dict.form.fields.message}
              <textarea
                id="ac-field-message"
                name="message"
                rows={4}
                className="ac-input font-display normal-case tracking-normal"
                value={values.message}
                onChange={(e) => setField("message", e.target.value)}
              />
            </label>

            <label className="flex items-start gap-3 text-sm text-ac-on-surface">
              <input
                type="checkbox"
                name="consent"
                required
                checked={values.consent}
                onChange={(e) => setField("consent", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-black/20 text-ac-primary focus:ring-ac-primary"
              />
              <span>{dict.form.fields.consent}</span>
            </label>

            <p className="text-xs leading-relaxed text-ac-muted">
              {dict.form.privacyNotice}{" "}
              <Link
                to="/ocr-terms"
                className="font-semibold text-ac-primary underline-offset-2 hover:underline"
              >
                {dict.form.privacyLinkLabel}
              </Link>
              .
            </p>

            {errorMessage ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="ac-btn mt-2 justify-between bg-ac-primary py-2 pl-6 pr-2 text-sm font-semibold text-white hover:bg-ac-on-surface disabled:opacity-60 sm:self-start"
            >
              {status === "loading" ? dict.form.submitting : dict.form.submit}
              <span className="ac-btn-arrow flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <ArrowIcon />
              </span>
            </button>
          </form>
        )}
        </div>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `ac-field-${name}`;
  return (
    <label htmlFor={id} className="ac-mono grid gap-1 text-ac-muted">
      {label}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ac-input font-display normal-case tracking-normal"
      />
    </label>
  );
}
