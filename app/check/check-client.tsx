"use client";

import { useEffect, useState } from "react";
import {
  defaultProfile,
  loadProfile,
  saveProfile,
  type ExistingBenefit,
  type Profile,
  type YoungestAge,
} from "../../lib/profile";

const TOTAL_STEPS = 7;

function Choice({
  selected,
  label,
  hint,
  onClick,
}: {
  selected: boolean;
  label: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`option-button${selected ? " selected" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="option-radio" aria-hidden="true" />
      <span className="option-copy">
        <strong>{label}</strong>
        {hint ? <small>{hint}</small> : null}
      </span>
    </button>
  );
}

function YesNo({
  value,
  onChange,
  yes = "Ja",
  no = "Nein",
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  yes?: string;
  no?: string;
}) {
  return (
    <div className="option-grid">
      <Choice selected={value} label={yes} onClick={() => onChange(true)} />
      <Choice selected={!value} label={no} onClick={() => onChange(false)} />
    </div>
  );
}

export function CheckClient() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(() => loadProfile() ?? defaultProfile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (mounted) saveProfile(profile);
  }, [mounted, profile]);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function setChildren(value: number) {
    setProfile((current) => ({
      ...current,
      children: value,
      youngestAge: value === 0 ? "none" : current.youngestAge === "none" ? "under1" : current.youngestAge,
      singleParent: value === 0 ? false : current.singleParent,
      missingSupport: value === 0 ? false : current.missingSupport,
    }));
  }

  function toggleBenefit(value: ExistingBenefit) {
    setProfile((current) => ({
      ...current,
      existingBenefits: current.existingBenefits.includes(value)
        ? current.existingBenefits.filter((item) => item !== value)
        : [...current.existingBenefits, value],
    }));
  }

  function next() {
    if (step < TOTAL_STEPS - 1) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    saveProfile(profile);
    window.location.href = "/results";
  }

  function back() {
    setStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const canContinue = step !== 1 || profile.children === 0 || profile.youngestAge !== "none";

  if (!mounted) return <main className="app-page" />;

  return (
    <main className="app-page">
      <div className="check-shell">
        <div className="check-topline">
          <a href="/">← Zur Startseite</a>
          <span className="save-note">✓ Automatisch auf diesem Gerät gespeichert</span>
        </div>

        <div className="progress-track" aria-label={`Schritt ${step + 1} von ${TOTAL_STEPS}`}>
          <div className="progress-bar" style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
        </div>
        <div className="progress-meta"><span>Persönlicher Leistungs-Check</span><span>{step + 1} / {TOTAL_STEPS}</span></div>

        <section className="check-card">
          {step === 0 ? (
            <>
              <p className="question-kicker">Dein Haushalt</p>
              <h1>Wie viele Erwachsene leben in deinem Haushalt?</h1>
              <p className="question-help">Gemeint sind Personen, die gemeinsam wirtschaften – nicht reine Wohngemeinschaften.</p>
              <div className="option-grid">
                <Choice selected={profile.adults === 1} label="Eine erwachsene Person" hint="Zum Beispiel alleinlebend oder alleinerziehend" onClick={() => update("adults", 1)} />
                <Choice selected={profile.adults === 2} label="Zwei oder mehr" hint="Zum Beispiel Paar oder Familie" onClick={() => update("adults", 2)} />
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <p className="question-kicker">Kinder</p>
              <h1>Leben Kinder in deinem Haushalt?</h1>
              <p className="question-help">Bitte nenne die Zahl der Kinder, für die du Leistungen prüfen möchtest.</p>
              <div className="number-field">
                <label htmlFor="children">Anzahl der Kinder</label>
                <div className="number-input-wrap">
                  <input id="children" type="number" inputMode="numeric" min="0" max="12" value={profile.children} onChange={(event) => setChildren(Math.max(0, Math.min(12, Number(event.target.value))))} />
                  <span>Kinder</span>
                </div>
              </div>
              {profile.children > 0 ? (
                <>
                  <p className="question-help">Wie alt ist das jüngste Kind?</p>
                  <div className="option-grid">
                    {([
                      ["under1", "Unter 1 Jahr"],
                      ["oneTo5", "1 bis 5 Jahre"],
                      ["sixTo11", "6 bis 11 Jahre"],
                      ["twelveTo17", "12 bis 17 Jahre"],
                      ["adult", "Alle Kinder sind 18+"],
                    ] as [YoungestAge, string][]).map(([value, label]) => (
                      <Choice key={value} selected={profile.youngestAge === value} label={label} onClick={() => update("youngestAge", value)} />
                    ))}
                  </div>
                  {profile.youngestAge === "adult" ? (
                    <div style={{ marginTop: 22 }}>
                      <p className="question-help">Ist mindestens ein Kind unter 25 in Ausbildung oder Studium?</p>
                      <YesNo value={profile.hasAdultChildInEducation} onChange={(value) => update("hasAdultChildInEducation", value)} />
                    </div>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}

          {step === 2 ? (
            <>
              <p className="question-kicker">Familiensituation</p>
              <h1>Erwartet ihr gerade ein Kind?</h1>
              <p className="question-help">So können wir Elterngeld und Mutterschaftsleistungen rechtzeitig einordnen.</p>
              <YesNo value={profile.expectingChild} onChange={(value) => update("expectingChild", value)} />
              {profile.children > 0 && profile.adults === 1 ? (
                <div style={{ marginTop: 28 }}>
                  <p className="question-help">Betreust du dein Kind überwiegend allein?</p>
                  <YesNo value={profile.singleParent} onChange={(value) => update("singleParent", value)} />
                  {profile.singleParent ? (
                    <div style={{ marginTop: 24 }}>
                      <p className="question-help">Zahlt der andere Elternteil keinen oder zu wenig Unterhalt?</p>
                      <YesNo value={profile.missingSupport} onChange={(value) => update("missingSupport", value)} />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}

          {step === 3 ? (
            <>
              <p className="question-kicker">Einkommen</p>
              <h1>Wie hoch ist euer monatliches Bruttoeinkommen?</h1>
              <p className="question-help">Eine ungefähre Zahl reicht für diese erste Orientierung. Bitte alle Erwachsenen zusammenrechnen.</p>
              <div className="number-field">
                <label htmlFor="gross">Bruttoeinkommen des Haushalts</label>
                <div className="number-input-wrap"><input id="gross" type="number" inputMode="decimal" min="0" value={profile.grossMonthlyIncome || ""} placeholder="z. B. 2.400" onChange={(event) => update("grossMonthlyIncome", Math.max(0, Number(event.target.value)))} /><span>€ / Monat</span></div>
              </div>
              <div className="number-field" style={{ marginTop: 22 }}>
                <label htmlFor="net">Früheres Netto der betreuenden Person (optional)</label>
                <div className="number-input-wrap"><input id="net" type="number" inputMode="decimal" min="0" value={profile.previousNetIncome || ""} placeholder="für Elterngeld-Schätzung" onChange={(event) => update("previousNetIncome", Math.max(0, Number(event.target.value)))} /><span>€ / Monat</span></div>
              </div>
              <p className="question-help">Liegt euer zu versteuerndes Jahreseinkommen über 175.000 €?</p>
              <YesNo value={profile.annualTaxableIncomeOver175k} onChange={(value) => update("annualTaxableIncomeOver175k", value)} />
              <p className="question-help">Arbeitet die betreuende Person während des möglichen Elterngeldbezugs mehr als 32 Stunden pro Woche?</p>
              <YesNo value={profile.worksOver32Hours} onChange={(value) => update("worksOver32Hours", value)} />
            </>
          ) : null}

          {step === 4 ? (
            <>
              <p className="question-kicker">Wohnen</p>
              <h1>Wie wohnt ihr?</h1>
              <p className="question-help">Wohngeld kann als Mietzuschuss oder als Lastenzuschuss für selbst genutztes Eigentum gezahlt werden.</p>
              <div className="option-grid">
                <Choice selected={profile.housing === "rent"} label="Zur Miete" onClick={() => update("housing", "rent")} />
                <Choice selected={profile.housing === "own"} label="Im eigenen Zuhause" hint="Selbst genutztes Eigentum" onClick={() => update("housing", "own")} />
                <Choice selected={profile.housing === "other"} label="Andere Situation" hint="Zum Beispiel mietfrei" onClick={() => update("housing", "other")} />
              </div>
              {profile.housing !== "other" ? (
                <div className="number-field" style={{ marginTop: 25 }}>
                  <label htmlFor="housing-cost">Monatliche Miete oder Belastung (ungefähr)</label>
                  <div className="number-input-wrap"><input id="housing-cost" type="number" inputMode="decimal" min="0" value={profile.monthlyHousingCost || ""} placeholder="z. B. 950" onChange={(event) => update("monthlyHousingCost", Math.max(0, Number(event.target.value)))} /><span>€ / Monat</span></div>
                </div>
              ) : null}
            </>
          ) : null}

          {step === 5 ? (
            <>
              <p className="question-kicker">Bestehende Leistungen</p>
              <h1>Welche Leistungen erhält euer Haushalt bereits?</h1>
              <p className="question-help">Mehrfachauswahl möglich. Wenn nichts passt, lasse alles frei.</p>
              <div className="option-grid">
                {([
                  ["grundsicherung", "Bürgergeld / Grundsicherung"],
                  ["sozialhilfe", "Sozialhilfe"],
                  ["asyl", "Asylbewerberleistungen"],
                  ["bafoeg", "BAföG"],
                  ["wohngeld", "Wohngeld"],
                  ["kinderzuschlag", "Kinderzuschlag"],
                ] as [ExistingBenefit, string][]).map(([value, label]) => (
                  <Choice key={value} selected={profile.existingBenefits.includes(value)} label={label} onClick={() => toggleBenefit(value)} />
                ))}
              </div>
            </>
          ) : null}

          {step === 6 ? (
            <>
              <p className="question-kicker">Letzter Schritt</p>
              <h1>{profile.expectingChild ? "Wie sieht die Beschäftigung der werdenden Mutter aus?" : "Bereit für deine persönliche Übersicht?"}</h1>
              {profile.expectingChild ? (
                <>
                  <p className="question-help">Ist die werdende Mutter aktuell beschäftigt?</p>
                  <YesNo value={profile.employed} onChange={(value) => update("employed", value)} />
                  <p className="question-help">Ist sie selbst gesetzlich krankenversichert?</p>
                  <YesNo value={profile.statutoryInsurance} onChange={(value) => update("statutoryInsurance", value)} />
                </>
              ) : (
                <p className="question-help">Wir gleichen deine Antworten jetzt mit den grundlegenden Regeln von acht Leistungen ab. Das Ergebnis ist eine Orientierung, keine Behördenentscheidung.</p>
              )}
            </>
          ) : null}

          <div className="check-actions">
            {step > 0 ? <button type="button" className="back-button" onClick={back}>← Zurück</button> : <span />}
            <button type="button" className="next-button" disabled={!canContinue} onClick={next}>{step === TOTAL_STEPS - 1 ? "Ergebnis anzeigen →" : "Weiter →"}</button>
          </div>
        </section>
        <p className="check-disclaimer">Keine verbindliche Rechts- oder Leistungsberatung. Die zuständige Behörde entscheidet nach Antrag und Nachweisen.</p>
      </div>
    </main>
  );
}
