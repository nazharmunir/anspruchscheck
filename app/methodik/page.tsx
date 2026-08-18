import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Methodik & Quellen",
  description:
    "So funktioniert der AnspruchsCheck: Regelbasis, Quellen, Ergebnis-Kategorien, Aktualisierung und Grenzen der Prüfung.",
  alternates: { canonical: "/methodik" },
};

export default function MethodologyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-content">
          <p className="section-kicker">Transparenz</p>
          <h1>Methodik &amp; Quellen</h1>
          <p>
            AnspruchsCheck soll dir eine schnelle erste Orientierung geben. Der Check ersetzt keine behördliche Prüfung
            und keine individuelle Rechtsberatung.
          </p>
          <h2>1. Wie die Prüfung funktioniert</h2>
          <p>
            Deine Angaben werden gegen nachvollziehbare Kriterien zu den enthaltenen Leistungen geprüft. Dazu gehören
            zum Beispiel Haushaltskonstellation, Kinder, Einkommen, Wohnsituation, Schwangerschaft oder bereits bezogene
            Leistungen. Die Antworten des Checks bleiben lokal in deinem Browser.
          </p>
          <h2>2. Ergebnis-Kategorien</h2>
          <p>
            „Starker Treffer“ bedeutet, dass mehrere grundlegende Kriterien nach deinen Angaben passen. „Prüfen lohnt
            sich“ bedeutet, dass eine Leistung relevant sein könnte, aber für eine verlässliche Einschätzung weitere
            Angaben oder ein offizieller Rechner nötig sind. „Aktuell kein Treffer“ bedeutet, dass mindestens ein
            wesentliches Einstiegskriterium nach den vorliegenden Angaben nicht passt.
          </p>
          <h2>3. Welche Quellen wir verwenden</h2>
          <p>
            Vorrang haben offizielle Veröffentlichungen der jeweils zuständigen Stellen, etwa Bundesministerien,
            Bundesagentur für Arbeit, Familienkassen und andere öffentliche Behörden. Jede Leistungsseite enthält eine
            direkte Verknüpfung zur verwendeten offiziellen Quelle.
          </p>
          <h2>4. Aktualisierung</h2>
          <p>
            Leistungen können sich durch neue Gesetze, Beträge oder Verwaltungspraxis ändern. Deshalb zeigen wir auf den
            einzelnen Leistungsseiten einen „Regelstand geprüft“-Zeitpunkt. Bei Änderungen werden Regeln und Texte
            entsprechend aktualisiert.
          </p>
          <h2>5. Grenzen des Checks</h2>
          <p>
            Nicht jede Sonderregel, Vermögensprüfung, Aufenthaltskonstellation oder individuelle Ausnahme lässt sich in
            einem kurzen Online-Check vollständig abbilden. Deshalb verweist AnspruchsCheck bei Unsicherheiten auf die
            zuständige Behörde oder einen offiziellen Rechner. Die verbindliche Entscheidung trifft immer die zuständige
            Stelle.
          </p>
          <h2>6. Fehler melden</h2>
          <p>
            Wenn dir eine veraltete Regel, ein fehlerhafter Betrag oder eine missverständliche Formulierung auffällt,
            kannst du uns über die im Impressum angegebene E-Mail-Adresse kontaktieren.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
