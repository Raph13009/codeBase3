import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import { Scrub } from "@/components/agentic-commerce/Scrub";
import { Magnetic } from "@/components/agentic-commerce/fx";

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
    <section id="assess" data-scene="ink" className="scroll-mt-24 px-4 py-28 sm:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1648px] gap-12 text-[var(--fg)] lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Scrub className="flex flex-col justify-between gap-10">
          <div>
            <p className="ac-label text-[var(--fg-muted)]">{dict.nav.assess}</p>
            <h2 className="mt-5 text-balance text-[clamp(40px,5.4vw,88px)] font-bold leading-[0.92] tracking-[-0.055em]">
              {dict.form.title}
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--fg-muted)]">
              {dict.form.subtitle}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[var(--fg-muted)]">{dict.hero.reassurance}</p>
            <a
              href={`mailto:${agenticSiteConfig.email}`}
              className="inline-block text-[15px] font-semibold text-[var(--fg)] underline-offset-4 hover:underline"
            >
              {agenticSiteConfig.email}
            </a>
          </div>
        </Scrub>

        <Scrub distance={90}>
          {status === "success" ? (
            <p
              className="flex min-h-[320px] items-center justify-center rounded-3xl border border-[var(--line)] px-6 text-center text-xl font-semibold"
              role="status"
            >
              {dict.form.success}
            </p>
          ) : (
            <form className="grid gap-5" onSubmit={onSubmit} noValidate>
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
              <div className="grid gap-5 sm:grid-cols-2">
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
              <div className="grid gap-5 sm:grid-cols-2">
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
                <legend className="mb-2 text-[13px] font-semibold text-[var(--fg)]">
                  {dict.form.fields.exploring}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {dict.form.exploringOptions.map((option) => {
                    const selected = values.exploring === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--fg)] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-[var(--scene-bg)] ${
                          selected
                            ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--scene-bg)]"
                            : "border-[color-mix(in_srgb,var(--fg)_18%,transparent)] text-[var(--fg)] hover:border-[var(--fg)]"
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
                className="grid gap-2 text-[13px] font-semibold text-[var(--fg)]"
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

              <label className="flex items-start gap-3 text-sm text-[var(--fg-muted)]">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={values.consent}
                  onChange={(e) => setField("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[var(--fg)]"
                />
                <span>{dict.form.fields.consent}</span>
              </label>

              <p className="text-xs leading-relaxed text-[var(--fg-muted)]">
                {dict.form.privacyNotice}{" "}
                <Link
                  to="/ocr-terms"
                  className="font-semibold text-[var(--fg)] underline underline-offset-2"
                >
                  {dict.form.privacyLinkLabel}
                </Link>
                .
              </p>

              {errorMessage ? (
                <p className="text-sm font-medium text-red-500" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <Magnetic className="mt-2 w-full sm:w-auto sm:justify-self-start">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="ac-pill ac-pill-invert w-full disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? dict.form.submitting : dict.form.submit}
                </button>
              </Magnetic>
            </form>
          )}
        </Scrub>
      </div>
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
    <label htmlFor={id} className="grid gap-2 text-[13px] font-semibold text-[var(--fg)]">
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
