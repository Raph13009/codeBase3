import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { StLink } from "@/components/studio/motion";
import { BUDGETS, CONTACT_EMAIL, FORM_ENDPOINT, LINKEDIN_URL, PROJECT_TYPES } from "@/components/studio/data";

type Values = { name: string; email: string; type: string; budget: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", type: "", budget: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TITLES = ["Qui êtes-vous\u00a0?", "Votre projet", "En quelques mots"];
const LAST = TITLES.length - 1;

function validate(step: number, v: Values): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (v.name.trim().length < 2) e.name = "Indiquez votre nom.";
    if (!EMAIL_RE.test(v.email.trim())) e.email = "Cette adresse email ne semble pas valide.";
  }
  if (step === 1 && !v.type) e.type = "Choisissez le type de projet.";
  return e;
}

const NEXT_STEPS = [
  { title: "Réponse sous 24 h", text: "avec des premières pistes concrètes." },
  { title: "Un premier échange gratuit", text: "pour cadrer le besoin\u00a0: objectifs, délais, budget." },
  { title: "Une proposition claire", text: "avec le périmètre, le planning et le budget." },
];

type ContactProps = {
  /** home: section of the homepage · page: body of /contact (the page hero holds the title). */
  variant?: "home" | "page";
};

/** Big email + a three-step brief form (one FormSubmit inbox for the whole site). */
export function Contact({ variant = "home" }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const moved = useRef(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  // Move focus into each new step (not on first render)
  useEffect(() => {
    if (!moved.current) return;
    const first = formRef.current?.querySelector<HTMLElement>(".st-form-step input, .st-form-step textarea");
    first?.focus({ preventScroll: true });
  }, [step]);

  const focusFirstError = (e: Errors) => {
    const key = (Object.keys(e) as (keyof Values)[])[0];
    if (!key) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  };

  const send = async () => {
    setStatus("sending");
    const data = new FormData();
    data.append("name", values.name.trim());
    data.append("email", values.email.trim());
    data.append("projet", values.type);
    data.append("budget", values.budget || "Non précisé");
    data.append("message", values.message.trim() || "(Aucun message)");
    data.append(
      "_subject",
      `Nouveau projet (${values.type}) depuis ${variant === "page" ? "la page contact" : "la page d'accueil"}`,
    );
    data.append("_template", "table");
    data.append("_captcha", "false");
    if (honeyRef.current?.value) data.append("_honey", honeyRef.current.value);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const e = validate(step, values);
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstError(e);
      return;
    }
    if (step < LAST) {
      moved.current = true;
      setStep(step + 1);
      return;
    }
    void send();
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
    moved.current = true;
    setStep(0);
  };

  const progress = status === "done" ? 1 : (step + 1) / TITLES.length;

  return (
    <section
      className="st-contact"
      id={variant === "page" ? "formulaire" : "contact"}
      data-variant={variant}
      aria-labelledby="st-contact-title"
    >
      {variant === "page" ? (
        <div className="st-contact-copy">
          <h2 className="sr-only" id="st-contact-title">
            Décrire votre projet
          </h2>
          <p className="st-paren">(Écrivez-nous)</p>
          <a className="st-mail" href={`mailto:${CONTACT_EMAIL}`} data-cursor="Écrire">
            {CONTACT_EMAIL}
          </a>
          <p className="st-contact-alt">
            Ou sur <StLink href={LINKEDIN_URL}>LinkedIn</StLink>, ou via le formulaire.
          </p>
          <div className="st-next-steps">
            <p className="st-paren">(Et ensuite&nbsp;?)</p>
            <ol>
              {NEXT_STEPS.map((step, i) => (
                <li key={step.title}>
                  <span className="n">0{i + 1}</span>
                  <p>
                    <b>{step.title}</b> {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="st-contact-copy">
          <span className="st-badge">Réponse sous 24 h</span>
          <h2 id="st-contact-title">Un projet à lancer ?</h2>
          <a className="st-mail" href={`mailto:${CONTACT_EMAIL}`} data-cursor="Écrire">
            {CONTACT_EMAIL}
          </a>
          <p>Quelques lignes suffisent. On vous répond sous 24 h avec des premières pistes concrètes.</p>
        </div>
      )}

      <form className="st-form" ref={formRef} onSubmit={onSubmit} noValidate aria-label="Décrire votre projet">
        <div className="st-form-head">
          <span className="step" aria-hidden="true">
            {String(Math.min(step, LAST) + 1).padStart(2, "0")}
            <em>/ 03</em>
          </span>
          <span className="title">{status === "done" ? "Bien reçu" : TITLES[step]}</span>
        </div>

        {/* FormSubmit honeypot: stays empty for humans */}
        <input
          ref={honeyRef}
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        {status === "done" ? (
          <div className="st-done" role="status">
            <b>Merci, c'est bien reçu.</b>
            <p>On revient vers vous sous 24 h, à l'adresse indiquée.</p>
            <button type="button" className="st-pill st-pill--light" onClick={reset}>
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <div className="st-form-step" key={step}>
            {step === 0 ? (
              <>
                <label className="st-field">
                  <span>Prénom &amp; nom</span>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Marie Dupont"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby="st-err-name"
                  />
                  <span className="st-err" id="st-err-name">
                    {errors.name}
                  </span>
                </label>
                <label className="st-field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="marie@entreprise.fr"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby="st-err-email"
                  />
                  <span className="st-err" id="st-err-email">
                    {errors.email}
                  </span>
                </label>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <fieldset className="st-fieldset" aria-describedby="st-err-type">
                  <legend>Type de projet</legend>
                  <div className="st-chips">
                    {PROJECT_TYPES.map((type) => (
                      <label className="st-chip" key={type}>
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={values.type === type}
                          onChange={() => set("type", type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                  <span className="st-err" id="st-err-type">
                    {errors.type}
                  </span>
                </fieldset>
                <fieldset className="st-fieldset">
                  <legend>
                    Budget <span className="opt">(facultatif)</span>
                  </legend>
                  <div className="st-chips">
                    {BUDGETS.map((budget) => (
                      <label className="st-chip" key={budget}>
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          checked={values.budget === budget}
                          onChange={() => set("budget", budget)}
                        />
                        <span>{budget}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            ) : null}

            {step === 2 ? (
              <label className="st-field">
                <span>Votre idée, vos délais, vos contraintes</span>
                <textarea
                  name="message"
                  placeholder="On veut lancer une plateforme de réservation pour…"
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </label>
            ) : null}

            {status === "error" ? (
              <p className="st-err" role="alert">
                L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à {CONTACT_EMAIL}.
              </p>
            ) : null}

            <div className="st-form-actions">
              {step > 0 ? (
                <button type="button" className="st-back" onClick={() => {
                    moved.current = true;
                    setStep(step - 1);
                  }}>
                  Retour
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="st-pill st-pill--light" disabled={status === "sending"}>
                {step < LAST ? "Continuer" : status === "sending" ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </div>
        )}

        <div className="st-form-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="st-form-note">
          Vos informations servent uniquement à vous répondre. <Link to="/ocr-terms">Confidentialité</Link>
        </p>
      </form>
    </section>
  );
}
