import type { Metadata } from "next";
import { BenefitGrid } from "../components/benefit-grid";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-section">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="section-shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-pill">
                <span className="eyebrow-dot" />
                AnspruchsCheck · kostenlos · ohne Konto · etwa 4 Minuten
              </div>
              <h1>Welche Unterstützung lässt du gerade liegen?</h1>
              <p className="hero-lead">
                Beantworte ein paar einfache Fragen. AnspruchsCheck zeigt dir passende
                Leistungen, mögliche Beträge, typische Unterlagen und den
                offiziellen nächsten Schritt.
              </p>
              <div className="hero-actions">
                <a href="/check" className="primary-button">
                  Anspruch jetzt prüfen <span aria-hidden="true">→</span>
                </a>
                <a href="#so-funktionierts" className="text-link">So funktioniert&apos;s</a>
              </div>
              <div className="privacy-line">
                <span aria-hidden="true">✓</span>
                Deine Antworten bleiben auf deinem Gerät.
              </div>
            </div>

            <div className="hero-proof" aria-label="Beispiel eines persönlichen Ergebnisses">
              <div className="proof-window">
                <div className="proof-window-top">
                  <span className="proof-brand">A</span>
                  <span className="proof-label">BEISPIELANALYSE</span>
                  <span className="proof-secure">lokal</span>
                </div>
                <div className="proof-summary">
                  <div>
                    <span className="proof-number">3</span>
                    <span>starke Treffer</span>
                  </div>
                  <div>
                    <span className="proof-number">2</span>
                    <span>weitere Checks</span>
                  </div>
                </div>
                <div className="proof-result proof-result-highlight">
                  <div className="proof-result-head">
                    <span className="mini-symbol tone-mint">K</span>
                    <span className="status-pill status-likely">Starker Treffer</span>
                  </div>
                  <strong>Kindergeld</strong>
                  <p>Grundlegende Altersregeln passen.</p>
                  <span className="proof-value">518 € / Monat</span>
                </div>
                <div className="proof-result">
                  <div className="proof-result-head">
                    <span className="mini-symbol tone-amber">+</span>
                    <span className="status-pill status-check">Prüfen lohnt sich</span>
                  </div>
                  <strong>Kinderzuschlag</strong>
                  <p>Offiziellen KiZ-Lotsen öffnen.</p>
                </div>
              </div>
              <div className="proof-source-card">
                <span>✓</span>
                <div><strong>Offizielle Quellen</strong><small>Regelstand: 17.08.2026</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Produktvorteile">
          <div className="section-shell trust-grid">
            <div><span>01</span><strong>Keine Registrierung</strong><p>Direkt starten, ohne Account.</p></div>
            <div><span>02</span><strong>Nachvollziehbare Regeln</strong><p>Keine erfundenen KI-Antworten.</p></div>
            <div><span>03</span><strong>Offizielle nächste Schritte</strong><p>Direkt zur zuständigen Stelle.</p></div>
          </div>
        </section>

        <section id="so-funktionierts" className="content-section steps-section">
          <div className="section-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker">In drei Schritten</p>
                <h2>Vom Fragezeichen zum klaren nächsten Schritt.</h2>
              </div>
              <p>AnspruchsCheck sortiert komplexe Regeln in eine verständliche persönliche Übersicht.</p>
            </div>
            <div className="steps-grid">
              <article className="step-card">
                <span className="step-number">01</span>
                <div className="step-icon">?</div>
                <h3>Situation beschreiben</h3>
                <p>Haushalt, Kinder, Einkommen, Wohnen und bereits bezogene Leistungen.</p>
              </article>
              <article className="step-card step-card-featured">
                <span className="step-number">02</span>
                <div className="step-icon">✓</div>
                <h3>Treffer verstehen</h3>
                <p>Du siehst, warum etwas passt, was unsicher ist und mit welchem Betrag du rechnen kannst.</p>
              </article>
              <article className="step-card">
                <span className="step-number">03</span>
                <div className="step-icon">→</div>
                <h3>Offiziell prüfen</h3>
                <p>Unterlagen vorbereiten und ohne Umwege zur offiziellen Behörde oder zum Rechner.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="leistungen" className="content-section benefits-section">
          <div className="section-shell">
            <div className="section-heading">
              <p className="section-kicker">Zum Start enthalten</p>
              <h2>Acht Leistungen, die im Alltag wirklich etwas verändern können.</h2>
              <p>Jede Leistung mit verständlicher Erklärung, Unterlagen und offizieller Quelle.</p>
            </div>
            <BenefitGrid />
          </div>
        </section>

        <section className="principles-section">
          <div className="section-shell principles-grid">
            <div>
              <p className="section-kicker light">Unser Prinzip</p>
              <h2>Wir zeigen Chancen – keine falschen Versprechen.</h2>
            </div>
            <div className="principles-copy">
              <p>
                AnspruchsCheck verwendet nachvollziehbare Regeln und kennzeichnet Ergebnisse als
                <strong> starker Treffer</strong>, <strong>prüfen lohnt sich</strong> oder
                <strong> aktuell kein Treffer</strong>.
              </p>
              <p>Die verbindliche Entscheidung trifft immer die zuständige Behörde nach Antrag und Nachweisen.</p>
              <a href="/check" className="inverse-button">Kostenlosen Check starten →</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
