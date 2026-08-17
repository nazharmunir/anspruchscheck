import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = { title: "Datenschutz" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-content">
          <p className="section-kicker">Rechtliches</p>
          <h1>Datenschutz</h1>
          <p>Stand: 17. August 2026</p>

          <h2>Der wichtigste Punkt zuerst</h2>
          <p>Die Antworten aus dem Leistungs-Check werden ausschließlich im lokalen Speicher deines Browsers abgelegt. Sie werden nicht an uns übertragen, nicht in einem Nutzerkonto gespeichert und nicht zu Werbezwecken ausgewertet.</p>

          <h2>Technische Bereitstellung</h2>
          <p>Beim Aufruf einer Website verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten, etwa IP-Adresse, Zeitpunkt, aufgerufene Seite und Browserinformationen. Diese Verarbeitung dient der sicheren und stabilen Auslieferung der Website.</p>

          <h2>Lokaler Speicher</h2>
          <p>Wir verwenden den Schlüssel <code>anspruch-profile:v1</code>, um deinen Fortschritt und dein Ergebnis auf deinem Gerät zu erhalten. Du kannst diese Daten über „Antworten löschen & neu starten“ im Ergebnis oder über die Browser-Einstellungen entfernen.</p>

          <h2>Keine Analyse- oder Werbe-Cookies</h2>
          <p>Diese MVP-Version nutzt keine Analyse-, Marketing- oder Profiling-Dienste. Es werden keine entsprechenden Cookies gesetzt.</p>

          <h2>Externe Links</h2>
          <p>Wenn du eine offizielle Behördenseite öffnest, gelten dort die Datenschutzbestimmungen des jeweiligen Anbieters. Externe Seiten öffnen sich erst durch deine aktive Auswahl.</p>

          <h2>Deine Rechte und Kontakt</h2>
          <p>
            Du hast im gesetzlichen Rahmen insbesondere Rechte auf Auskunft,
            Berichtigung, Löschung und Einschränkung der Verarbeitung.
            Datenschutzanfragen kannst du an{" "}
            <a className="text-link" href="mailto:mazhar.munir1233@gmail.com">
              mazhar.munir1233@gmail.com
            </a>{" "}
            richten.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
