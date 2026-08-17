"use client";

import { useEffect, useState } from "react";
import {
  ageInYears,
  defaultProfile,
  isValidBirthDate,
  loadProfile,
  saveProfile,
  type ChildcareSituation,
  type ExistingBenefit,
  type Profile,
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
  value: boolean | null;
  onChange: (value: boolean) => void;
  yes?: string;
  no?: string;
}) {
  return (
    <div className="option-grid">
      <Choice selected={value === true} label={yes} onClick={() => onChange(true)} />
      <Choice selected={value === false} label={no} onClick={() => onChange(false)} />
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
      childBirthDates:
        value === 0
          ? []
          : Array.from({ length: value }, (_, index) => current.childBirthDates[index] ?? ""),
      hasAdultChildInEducation: value === 0 ? null : current.hasAdultChildInEducation,
      childcareSituation: value === 0 ? "not-specified" : current.childcareSituation,
      singleParent: value === 0 ? null : current.singleParent,
      missingSupport: value === 0 ? null : current.missingSupport,
    }));
  }

  function setChildBirthDate(index: number, value: string) {
    setProfile((current) => ({
      ...current,
      childBirthDates: current.childBirthDates.map((date, childIndex) =>
        childIndex === index ? value : date,
      ),
    }));
  }

  function setExpectingChild(value: boolean) {
    setProfile((current) => ({
      ...current,
      expectingChild: value,
      dueDate: value ? current.dueDate : "",
      employed: value ? current.employed : null,
      statutoryInsurance: value ? current.statutoryInsurance : null,
    }));
  }

  function setSingleParent(value: boolean) {
    setProfile((current) => ({
      ...current,
      singleParent: value,
      missingSupport: value ? current.missingSupport : null,
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

  const today = new Date();
  const todayValue = today.toISOString().slice(0, 10);
  const hasAdultChildUnder25 = profile.childBirthDates.some((date) => {
    const age = ageInYears(date, today);
    return age !== null && age >= 18 && age < 25;
  });
  const hasCompleteBirthDates =
    profile.children === 0 ||
    (profile.childBirthDates.length === profile.children &&
      profile.childBirthDates.every((date) => isValidBirthDate(date, today)));

  const canContinue =
    step === 1
      ? hasCompleteBirthDates &&
        (!hasAdultChildUnder25 || profile.hasAdultChildInEducation !== null)
      : step === 2
        ? profile.expectingChild !== null &&
          (!profile.expectingChild || Boolean(profile.dueDate)) &&
          (profile.children === 0 || profile.childcareSituation !== "not-specified") &&
          (profile.children === 0 || profile.adults !== 1 || profile.singleParent !== null) &&
          (!profile.singleParent || profile.missingSupport !== null)
        : step === 3
          ? profile.annualTaxableIncomeOver175k !== null &&
            profile.weeklyWorkingHours !== null
          : step === 6 && profile.expectingChild
            ? profile.employed !== null && profile.statutoryInsurance !== null
            : true;

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
                  <p className="question-help">
                    Bitte gib das Geburtsdatum für jedes Kind an. So prüfen wir
                    Altersgrenzen statt sie zu schätzen.
                  </p>
                  <div className="date-grid">
                    {profile.childBirthDates.map((date, index) => (
                      <div className="date-field" key={index}>
                        <label htmlFor={`child-birth-date-${index}`}>
                          Geburtsdatum Kind {index + 1}
                        </label>
                        <input
                          id={`child-birth-date-${index}`}
                          type="date"
                          max={todayValue}
                          value={date}
                          onInput={(event) =>
                            setChildBirthDate(index, event.currentTarget.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  {hasAdultChildUnder25 ? (
                    <div className="question-group">
                      <p className="question-help">
                        Ist mindestens eines der volljährigen Kinder unter 25 in
                        Schule, Ausbildung oder Studium?
                      </p>
                      <YesNo
                        value={profile.hasAdultChildInEducation}
                        onChange={(value) => update("hasAdultChildInEducation", value)}
                      />
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
              <YesNo value={profile.expectingChild} onChange={setExpectingChild} />
              {profile.expectingChild ? (
                <div className="question-group">
                  <div className="date-field">
                    <label htmlFor="due-date">Voraussichtlicher Geburtstermin</label>
                    <input
                      id="due-date"
                      type="date"
                      value={profile.dueDate}
                      onInput={(event) => update("dueDate", event.currentTarget.value)}
                    />
                  </div>
                  <p className="inline-note">
                    Elterngeld wird erst nach der Geburt beantragt. Das Datum hilft
                    bei der richtigen zeitlichen Einordnung.
                  </p>
                </div>
              ) : null}
              {profile.children > 0 ? (
                <div className="question-group">
                  <p className="question-help">
                    Wie sieht die Betreuung des jüngsten Kindes aus?
                  </p>
                  <div className="option-grid">
                    {([
                      ["self", "Ich/wir betreuen selbst", "Das Kind lebt bei mir/uns und wird persönlich betreut"],
                      ["shared", "Geteilte Betreuung", "Zum Beispiel zusätzlich Kita, Tagespflege oder Verwandte"],
                      ["not-personal", "Nicht persönlich betreut", "Das Kind lebt hier, wird aber nicht von mir/uns betreut"],
                      ["not-in-household", "Anderer Haushalt", "Das Kind lebt nicht mit mir/uns zusammen"],
                    ] as [ChildcareSituation, string, string][]).map(([value, label, hint]) => (
                      <Choice
                        key={value}
                        selected={profile.childcareSituation === value}
                        label={label}
                        hint={hint}
                        onClick={() => update("childcareSituation", value)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {profile.children > 0 && profile.adults === 1 ? (
                <div className="question-group">
                  <p className="question-help">Betreust du dein Kind überwiegend allein?</p>
                  <YesNo value={profile.singleParent} onChange={setSingleParent} />
                  {profile.singleParent ? (
                    <div className="question-group compact">
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
              <div className="number-field question-group">
                <label htmlFor="weekly-hours">
                  Geplante Arbeitszeit der antragstellenden Person
                </label>
                <div className="number-input-wrap">
                  <input
                    id="weekly-hours"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="80"
                    step="0.5"
                    value={profile.weeklyWorkingHours ?? ""}
                    placeholder="z. B. 20"
                    onChange={(event) =>
                      update(
                        "weeklyWorkingHours",
                        event.target.value === ""
                          ? null
                          : Math.max(0, Math.min(80, Number(event.target.value))),
                      )
                    }
                  />
                  <span>Std. / Woche</span>
                </div>
                <p className="inline-note">
                  Für Elterngeld sind grundsätzlich höchstens 32 Arbeitsstunden
                  pro Woche zulässig.
                </p>
              </div>
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
