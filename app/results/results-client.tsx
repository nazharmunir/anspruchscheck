"use client";

import { useEffect, useMemo, useState } from "react";
import { benefitBySlug } from "../../lib/benefits";
import { evaluateProfile, type BenefitResult, type MatchStatus } from "../../lib/evaluate";
import { clearProfile, loadProfile, type Profile } from "../../lib/profile";

type Filter = "all" | MatchStatus;

export function ResultsClient() {
  const [profile] = useState<Profile | null>(() => loadProfile());
  const [filter, setFilter] = useState<Filter>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const results = useMemo(() => profile ? evaluateProfile(profile) : [], [profile]);
  const visible = filter === "all" ? results : results.filter((item) => item.status === filter);
  const positiveCount = results.filter((item) => item.status !== "no").length;

  function reset() {
    clearProfile();
    window.location.href = "/check";
  }

  if (!mounted) return <main className="app-page" />;

  if (!profile) {
    return (
      <main className="app-page">
        <div className="results-shell">
          <div className="empty-state">
            <h1>Noch kein Ergebnis vorhanden</h1>
            <p>Starte zuerst den kurzen Check. Deine Antworten bleiben dabei auf deinem Gerät.</p>
            <a href="/check" className="primary-button">Check starten →</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="results-shell">
        <div className="check-topline">
          <a href="/">← Zur Startseite</a>
          <a href="/check">Antworten bearbeiten</a>
        </div>

        <div className="results-heading">
          <div>
            <p className="question-kicker">Deine persönliche Orientierung</p>
            <h1>Hier lohnt sich der nächste Blick.</h1>
            <p>Wir haben deine Angaben mit den grundlegenden Regeln von acht Leistungen abgeglichen. Öffne einen Treffer für Unterlagen, Antragsschritte und die offizielle Quelle.</p>
          </div>
          <div className="result-count"><strong>{positiveCount}</strong><span>mögliche nächste Checks</span></div>
        </div>

        <div className="result-tabs" role="group" aria-label="Ergebnisse filtern">
          {([
            ["all", `Alle (${results.length})`],
            ["likely", `Starke Treffer (${results.filter((item) => item.status === "likely").length})`],
            ["check", `Prüfen (${results.filter((item) => item.status === "check").length})`],
            ["no", `Kein Treffer (${results.filter((item) => item.status === "no").length})`],
          ] as [Filter, string][]).map(([value, label]) => (
            <button type="button" key={value} className={`result-tab${filter === value ? " active" : ""}`} onClick={() => setFilter(value)}>{label}</button>
          ))}
        </div>

        <div className="results-list">
          {visible.map((item) => <ResultCard key={item.slug} result={item} />)}
        </div>

        <div className="results-bottom">
          <p>Die Auswertung ist bewusst vorsichtig. Die verbindliche Entscheidung trifft immer die zuständige Stelle.</p>
          <button type="button" className="ghost-button" onClick={reset}>Antworten löschen & neu starten</button>
        </div>
      </div>
    </main>
  );
}

function ResultCard({ result }: { result: BenefitResult }) {
  const benefit = benefitBySlug.get(result.slug)!;
  return (
    <article className={`result-card result-${result.status}`}>
      <div className="result-card-top">
        <div className="result-title">
          <span className={`benefit-symbol tone-${benefit.tone}`}>{benefit.symbol}</span>
          <div>
            <span className={`status-pill status-${result.status}`}>{result.statusLabel}</span>
            <h2>{benefit.name}</h2>
          </div>
        </div>
        <div className="result-amount"><strong>{result.amount}</strong><span>{result.amountLabel}</span></div>
      </div>
      <p className="result-reason">{result.reason}</p>
      {result.signals.length ? <ul className="reason-list">{result.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul> : null}
      <div className="result-card-actions">
        <a href={`/leistungen/${benefit.slug}`}>Details & Unterlagen →</a>
        <a href={benefit.sourceUrl} target="_blank" rel="noreferrer">Offizielle Seite ↗</a>
      </div>
    </article>
  );
}
