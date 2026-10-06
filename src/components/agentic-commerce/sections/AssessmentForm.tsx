import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import { Reveal } from "@/components/agentic-commerce/Reveal";

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
      className="mx-auto max-w-[1728px] scroll-mt-28 px-4 py-24 sm:px-10 md:py-32"
    >
      <Reveal className="mx-auto grid max-w-[1240px] gap-10 rounded-[32px] bg-ac-surface-low p-4 sm:p-8 md:rounded-[40px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-12">
        <div className="px-2 pt-4 sm:px-0 lg:pt-6">
          <h2 className="ac-h2 text-ac-on-surface">{dict.form.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ac-muted">
            {dict.form.subtitle}
          </p>
          <p className="mt-8 text-sm text-ac-muted">{dict.hero.reassurance}</p>
          <a
            href={`mailto:${agenticSiteConfig.email}`}
            className="mt-2 inline-block text-sm font-semibold text-ac-on-surface underline-offset-4 hover:underline"
          >
            {agenticSiteConfig.email}
          </a>
        </div>

        <div className="rounded-3xl border border-[#d9d7d0]/30 bg-[var(--ac-card)] p-5 shadow-xl sm:p-8">

        {status === "success" ? (
          <p
            className="flex min-h-[200px] items-center justify-center px-4 text-center text-lg font-medium text-ac-on-surface"
            role="status"
          >
            {dict.form.success}
          </p>
        ) : (
          <form className="grid gap-4" onSubmit={onSubmit} noValidate>
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
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="grid gap-4 sm:grid-cols-2">
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

            <fieldset className="grid gap-2">
              <legend className="mb-2 text-[13px] font-semibold text-ac-on-surface">
                {dict.form.fields.exploring}
              </legend>
              <div className="flex flex-wrap gap-2">
                {dict.form.exploringOptions.map((option) => {
                  const selected = values.exploring === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1b1b1b] has-[:focus-visible]:ring-offset-2 ${
                        selected
                          ? "border-[#1b1b1b] bg-[#1b1b1b] text-[#faf9f5]"
                          : "border-[var(--ac-line)] bg-white text-ac-on-surface hover:border-[#1b1b1b]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="exploring"
                        value={option.value}
                        required
                        checked={selected}
                        onChange={(e) => setField("exploring", e.target.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Field
              label={`${dict.form.fields.volume} (${dict.form.fields.volumeOptional})`}
              name="volume"
              value={values.volume}
              onChange={(v) => setField("volume", v)}
            />

            <label
              htmlFor="ac-field-message"
              className="grid gap-2 text-[13px] font-semibold text-ac-on-surface"
            >
              {dict.form.fields.message}
              <textarea
                id="ac-field-message"
                name="message"
                rows={4}
                className="ac-input font-normal"
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
                className="mt-0.5 h-4 w-4 rounded border-black/20 accent-[#1b1b1b]"
              />
              <span>{dict.form.fields.consent}</span>
            </label>

            <p className="text-xs leading-relaxed text-ac-muted">
              {dict.form.privacyNotice}{" "}
              <Link
                to="/ocr-terms"
                className="font-semibold text-ac-on-surface underline underline-offset-2"
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
              className="ac-pill ac-pill-dark mt-2 w-full disabled:opacity-60 sm:w-auto sm:justify-self-start"
            >
              {status === "loading" ? dict.form.submitting : dict.form.submit}
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
    <label htmlFor={id} className="grid gap-2 text-[13px] font-semibold text-ac-on-surface">
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
        className="ac-input font-normal"
      />
    </label>
  );
}
