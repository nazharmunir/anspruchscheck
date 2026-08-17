import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise für AnspruchsCheck.de.",
  alternates: { canonical: "/datenschutz" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-content">
          <p className="section-kicker">Rechtliches</p>
          <h1>Datenschutz</h1>
          <p>Stand: 17. August 2026</p>

          <h2>1. Verantwortlicher</h2>
          <address className="legal-address">
            <strong>Muhammad Mazhar Munir</strong>
            <br />
            Hammerbrookstraße 42A
            <br />
            20097 Hamburg, Deutschland
            <br />
            E-Mail:{" "}
            <a className="text-link" href="mailto:mazhar.munir1233@gmail.com">
              mazhar.munir1233@gmail.com
            </a>
          </address>

          <h2>2. Leistungs-Check und lokale Speicherung</h2>
          <p>
            Deine Antworten – darunter Haushaltsgröße, Geburtsdatum oder
            voraussichtlicher Geburtstermin, Betreuungssituation, Einkommen und
            Arbeitszeit – werden ausschließlich
            im lokalen Speicher deines Browsers abgelegt. Sie werden nicht an uns
            übertragen, nicht in einem Nutzerkonto gespeichert und nicht für
            Werbung oder Profiling verwendet.
          </p>
          <p>
            Wir verwenden dafür den Schlüssel <code>anspruch-profile:v2</code>.
            Die Speicherung ist für die von dir gewünschte Check-Funktion technisch
            erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst sie jederzeit über
            „Antworten löschen &amp; neu starten“ oder über die Browser-Einstellungen
            entfernen.
          </p>

          <h2>3. Technische Bereitstellung und Server-Protokolle</h2>
          <p>
            Die Website wird über eine von OpenAI bereitgestellte
            Hosting-Infrastruktur auf Cloudflare-Technik ausgeliefert. Beim Aufruf
            können technisch notwendige Verbindungsdaten verarbeitet werden,
            insbesondere IP-Adresse, Zeitpunkt, angeforderte Seite,
            Referrer-Informationen sowie Browser- und Geräteangaben. Zweck ist die
            sichere, stabile und missbrauchsgeschützte Bereitstellung der Website.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Dabei kann eine Verarbeitung durch Dienstleister außerhalb der EU,
            insbesondere in den USA, stattfinden. Die konkreten
            Auftragsverarbeitungs- und Übermittlungsgarantien müssen vor der
            geschäftsmäßigen Vermarktung abschließend geprüft und dokumentiert
            werden.
          </p>

          <h2>4. Kontakt per E-Mail</h2>
          <p>
            Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine Angaben zur
            Bearbeitung der Anfrage. Rechtsgrundlage ist je nach Anliegen Art. 6
            Abs. 1 lit. b oder lit. f DSGVO. Die Daten werden gelöscht, sobald sie
            für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen. Für den E-Mail-Verkehr wird ein
            Google-Gmail-Postfach genutzt.
          </p>

          <h2>5. Keine Analyse- oder Werbe-Cookies</h2>
          <p>Diese MVP-Version nutzt keine Analyse-, Marketing- oder Profiling-Dienste. Es werden keine entsprechenden Cookies gesetzt.</p>

          <h2>6. Externe Links</h2>
          <p>Wenn du eine offizielle Behördenseite öffnest, gelten dort die Datenschutzbestimmungen des jeweiligen Anbieters. Externe Seiten öffnen sich erst durch deine aktive Auswahl.</p>

          <h2>7. Deine Rechte</h2>
          <p>
            Du hast im gesetzlichen Rahmen insbesondere Rechte auf Auskunft,
            Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer
            Datenschutzaufsichtsbehörde beschweren. Für Hamburg ist dies der{" "}
            <a
              className="text-link"
              href="https://datenschutz-hamburg.de/service-information/beschwerde-oder-hinweis-einreichen"
              target="_blank"
              rel="noreferrer"
            >
              Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
            </a>
            .
          </p>
          <p>
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
