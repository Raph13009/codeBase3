import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import type { Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { trackAgenticEvent } from "@/lib/agentic-commerce/analytics";
import { agenticSiteConfig } from "@/lib/agentic-commerce/site";
import { Icon } from "@/components/agentic-commerce/shared";

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

type ErrorKey = keyof Dictionary["form"]["errors"];
type Errors = Partial<Record<ErrorKey, string>>;

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
const FIELD_ORDER: ErrorKey[] = [
  "email",
  "name",
  "company",
  "website",
  "role",
  "platform",
  "exploring",
  "consent",
];

function validate(values: FormValues, messages: Dictionary["form"]["errors"]): Errors {
  const errors: Errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = messages.email;
  if (values.name.trim().length < 2) errors.name = messages.name;
  if (values.company.trim().length < 2) errors.company = messages.company;
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(values.website.trim())) {
    errors.website = messages.website;
  }
  if (values.role.trim().length < 2) errors.role = messages.role;
  if (values.platform.trim().length < 2) errors.platform = messages.platform;
  if (!values.exploring) errors.exploring = messages.exploring;
  if (!values.consent) errors.consent = messages.consent;
  return errors;
}

export function AssessmentForm({ locale, dict }: Props) {
  const f = dict.form;
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<FormValues>(emptyValues);

  const accessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function focusField(key: ErrorKey) {
    const form = formRef.current;
    if (!form) return;
    const target =
      key === "exploring"
        ? form.querySelector<HTMLInputElement>('input[name="exploring"]')
        : form.querySelector<HTMLElement>(`[name="${key}"]`);
    target?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || status === "loading") return;

    setFormError(null);
    const nextErrors = validate(values, f.errors);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }
    if (!accessKey) {
      setStatus("error");
      setFormError(f.configError);
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
        setFormError(f.error);
        return;
      }

      setValues(emptyValues);
      setErrors({});
      setStatus("success");
      trackAgenticEvent("lead_submitted", { locale });
    } catch {
      setStatus("error");
      setFormError(f.error);
    } finally {
      submittingRef.current = false;
    }
  }

  const textField = (
    key: "email" | "name" | "company" | "website" | "role" | "platform",
    type: string,
    options: { autoComplete?: string; placeholder?: string } = {},
  ) => (
    <div className="field">
      <label htmlFor={`f-${key}`}>{f.fields[key]}</label>
      <input
        id={`f-${key}`}
        name={key}
        type={type}
        required
        autoComplete={options.autoComplete}
        placeholder={options.placeholder}
        value={values[key]}
        onChange={(e) => setField(key, e.target.value)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `e-${key}` : undefined}
      />
      <span className="err" id={`e-${key}`}>
        {errors[key]}
      </span>
    </div>
  );

  return (
    <section className="eval" id="assess">
      <div className="wrap">
        <div className="eval-panel">
          <div className="eval-copy">
            <div>
              <p className="eyebrow">{f.eyebrow}</p>
              <h2 className="h2">{f.title}</h2>
            </div>
            <p className="lead">{f.subtitle}</p>
            <ul className="gets">
              {f.gets.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
            {status === "success" ? (
              <div className="done-box" role="status">
                <span className="big">
                  <Icon name="check" />
                </span>
                <p>{f.success}</p>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setValues(emptyValues);
                    requestAnimationFrame(() => focusField("email"));
                  }}
                >
                  {f.again}
                </button>
              </div>
            ) : (
              <>
                {/* Web3Forms recommended honeypot — must stay unchecked/hidden */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />
                {textField("email", "email", { autoComplete: "email" })}
                {textField("name", "text", { autoComplete: "name" })}
                {textField("company", "text", { autoComplete: "organization" })}
                {textField("website", "url", { placeholder: f.placeholders.website })}
                {textField("role", "text", { autoComplete: "organization-title" })}
                {textField("platform", "text", { placeholder: f.placeholders.platform })}

                <fieldset className="field full">
                  <legend>{f.fields.exploring}</legend>
                  <div className="chips">
                    {f.exploringOptions.map((option) => (
                      <label className="chip" key={option.value}>
                        <input
                          type="radio"
                          name="exploring"
                          value={option.value}
                          checked={values.exploring === option.value}
                          onChange={(e) => setField("exploring", e.target.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <span className="err" id="e-exploring">
                    {errors.exploring}
                  </span>
                </fieldset>

                <div className="field full">
                  <label htmlFor="f-volume">
                    {f.fields.volume} <span className="opt">({f.fields.volumeOptional})</span>
                  </label>
                  <input
                    id="f-volume"
                    name="volume"
                    type="text"
                    inputMode="numeric"
                    placeholder={f.placeholders.volume}
                    value={values.volume}
                    onChange={(e) => setField("volume", e.target.value)}
                  />
                </div>

                <div className="field full">
                  <label htmlFor="f-message">{f.fields.message}</label>
                  <textarea
                    id="f-message"
                    name="message"
                    value={values.message}
                    onChange={(e) => setField("message", e.target.value)}
                  />
                </div>

                <div className="field full">
                  <label className="consent">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={values.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "e-consent" : undefined}
                    />
                    <span>{f.fields.consent}</span>
                  </label>
                  <span className="err" id="e-consent">
                    {errors.consent}
                  </span>
                </div>

                <div className="field full form-end">
                  <p className="form-note">
                    {f.privacyNotice}{" "}
                    <Link to="/ocr-terms">{f.privacyLinkLabel}</Link>.
                  </p>
                  <button
                    className="btn btn-solid mag"
                    type="submit"
                    disabled={status === "loading"}
                    aria-busy={status === "loading"}
                  >
                    {status === "loading" ? f.submitting : f.submit} <Icon name="arrow" />
                  </button>
                  {formError ? (
                    <p className="err" role="alert">
                      {formError}
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
