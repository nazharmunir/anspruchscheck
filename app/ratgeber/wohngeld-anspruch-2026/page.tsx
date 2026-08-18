import type { Metadata } from "next";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "Wohngeld Anspruch 2026: Voraussetzungen, Einkommen & Antrag",
  description:
    "Wer hat 2026 Anspruch auf Wohngeld? Voraussetzungen, Einkommen, Studierende, Antrag, Bewilligungszeitraum und offizielle Quellen verständlich erklärt.",
  alternates: { canonical: "/ratgeber/wohngeld-anspruch-2026" },
  openGraph: {
    title: "Wohngeld Anspruch 2026: Voraussetzungen & Antrag | AnspruchsCheck",
    description:
      "Verständlicher Überblick zu Wohngeld 2026: Wer prüfen sollte, wovon die Höhe abhängt und wie der Antrag funktioniert.",
    url: "/ratgeber/wohngeld-anspruch-2026",
    siteName: "AnspruchsCheck",
    locale: "de_DE",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AnspruchsCheck – Wohngeld Anspruch 2026 prüfen",
      },
    ],
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AnspruchsCheck",
      item: "https://anspruchscheck.de/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ratgeber",
      item: "https://anspruchscheck.de/ratgeber/wohngeld-anspruch-2026",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Wohngeld Anspruch 2026",
      item: "https://anspruchscheck.de/ratgeber/wohngeld-anspruch-2026",
    },
  ],
};

export default function WohngeldGuide2026() {
  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
        }}
      />
      <main className="legal-page">
        <article className="legal-content">
          <p className="section-kicker">Ratgeber · Stand 18.08.2026</p>
          <h1>Wohngeld Anspruch 2026: Wer bekommt Wohngeld?</h1>
          <p>
            Wohngeld ist ein staatlicher Zuschuss zu den Wohnkosten. Mieterinnen und
            Mieter können einen Mietzuschuss erhalten; für selbst genutztes
            Wohneigentum kommt ein Lastenzuschuss infrage. Ob du 2026 tatsächlich
            Anspruch hast, hängt nicht von einer einzigen Einkommensgrenze ab.
          </p>
          <p>
            Entscheidend sind vor allem <strong>die Zahl der zu berücksichtigenden
            Haushaltsmitglieder</strong>, <strong>die berücksichtigungsfähige Miete
            oder Belastung</strong> und <strong>das Gesamteinkommen des Haushalts</strong>.
          </p>

          <div className="source-box">
            <strong>Kurz prüfen statt raten</strong>
            <span>AnspruchsCheck ordnet Wohngeld zusammen mit sieben weiteren Leistungen ein.</span>
            <a href="/check">Kostenlosen AnspruchsCheck starten →</a>
          </div>

          <h2>Wer sollte 2026 einen Wohngeld-Anspruch prüfen?</h2>
          <p>
            Das Bundesministerium nennt insbesondere Haushalte mit geringem Einkommen,
            deren Wohnkosten nicht bereits vollständig über andere existenzsichernde
            Leistungen berücksichtigt werden. Typische Gruppen sind:
          </p>
          <ul>
            <li>Arbeitnehmerinnen und Arbeitnehmer mit niedrigem Einkommen,</li>
            <li>Familien und Alleinerziehende mit knappem Haushaltsbudget,</li>
            <li>Rentnerinnen und Rentner mit niedriger Rente,</li>
            <li>Studierende in bestimmten Konstellationen,</li>
            <li>Bewohnerinnen und Bewohner von Pflegeheimen sowie</li>
            <li>Eigentümerinnen und Eigentümer von selbst genutztem Wohnraum.</li>
          </ul>
          <p>
            Eine verbindliche Entscheidung trifft immer die örtlich zuständige
            Wohngeldbehörde. Unser Check und auch der Bundesrechner dienen nur als
            Orientierung.
          </p>

          <h2>Wovon hängt die Höhe des Wohngeldes ab?</h2>
          <p>
            Nach dem Wohngeldgesetz richtet sich die Berechnung im Kern nach drei
            Größen:
          </p>
          <ol>
            <li><strong>Haushaltsgröße:</strong> Wie viele Personen werden bei der Wohngeldberechnung berücksichtigt?</li>
            <li><strong>Miete oder Belastung:</strong> Welche Wohnkosten werden bis zum zulässigen Höchstbetrag berücksichtigt?</li>
            <li><strong>Gesamteinkommen:</strong> Welches wohngeldrechtliche Einkommen wird für den Bewilligungszeitraum erwartet?</li>
          </ol>
          <p>
            Zusätzlich spielt die <strong>Mietenstufe deines Wohnorts</strong> eine
            Rolle. Deshalb ist eine pauschale Aussage wie „bis X Euro Einkommen bekommt
            jeder Wohngeld“ unseriös. Zwei Haushalte mit gleichem Einkommen können je
            nach Haushaltsgröße und Wohnort zu unterschiedlichen Ergebnissen kommen.
          </p>

          <h2>Welche Miete zählt beim Wohngeld?</h2>
          <p>
            Für Mieterinnen und Mieter wird grundsätzlich die wohngeldrechtlich
            relevante Miete betrachtet. Der aktuelle Bundesrechner arbeitet bei
            Mietwohnungen mit der monatlichen Bruttokaltmiete und berücksichtigt je
            nach Ort nur Miete bis zu bestimmten Höchstbeträgen. Heizkosten werden im
            Wohngeldsystem über gesetzliche Komponenten berücksichtigt und nicht
            einfach eins zu eins als tatsächliche Heizkosten übernommen.
          </p>
          <p>
            Für selbst genutztes Eigentum wird statt einer Miete eine Belastung
            berücksichtigt. Dazu können unter anderem bestimmte Finanzierungskosten,
            Bewirtschaftungskosten und Grundsteuer zählen.
          </p>

          <h2>Wohngeld für Studierende 2026</h2>
          <p>
            Studierende sind nicht automatisch vom Wohngeld ausgeschlossen. Entscheidend
            ist die BAföG-Konstellation des gesamten Haushalts. Wenn <strong>allen
            Haushaltsmitgliedern dem Grunde nach BAföG oder bestimmte vergleichbare
            Ausbildungsförderung zusteht</strong>, besteht grundsätzlich kein
            Wohngeldanspruch – auch wenn die Förderung wegen der Höhe des Einkommens am
            Ende tatsächlich 0 Euro beträgt.
          </p>
          <p>
            Anders kann es beispielsweise bei gemischten Haushalten aussehen, wenn nicht
            alle Haushaltsmitglieder dem Grunde nach Ausbildungsförderung erhalten
            können. Auch eine ausschließlich als Darlehen gewährte Ausbildungsförderung
            wird im Gesetz gesondert behandelt. Bei Studierenden lohnt sich deshalb eine
            konkrete Prüfung statt einer pauschalen Ja-/Nein-Antwort.
          </p>

          <h2>Wann besteht typischerweise kein Wohngeldanspruch?</h2>
          <p>
            Wer bereits eine andere Leistung erhält, bei der die Wohnkosten in der
            Berechnung berücksichtigt werden, ist häufig vom Wohngeld ausgeschlossen.
            Das Wohngeldgesetz enthält außerdem besondere Ausschlussregeln für bestimmte
            Ausbildungsförderungen und weitere Leistungskonstellationen.
          </p>
          <p>
            Ebenso entsteht kein Anspruch, wenn das berechnete Wohngeld weniger als
            10 Euro im Monat betragen würde. Bei erheblichen Vermögenswerten kann ein
            Anspruch ebenfalls ausgeschlossen sein.
          </p>

          <h2>Ab wann wird Wohngeld gezahlt?</h2>
          <p>
            Wohngeld gibt es nur auf Antrag. Der Bewilligungszeitraum beginnt
            grundsätzlich am <strong>Ersten des Monats, in dem der Antrag gestellt
            wurde</strong>, sofern die Voraussetzungen zu diesem Zeitpunkt bereits
            vorliegen. Deshalb kann es finanziell einen Unterschied machen, ob du den
            Antrag noch in diesem oder erst im nächsten Monat stellst.
          </p>
          <p>
            Wohngeld soll normalerweise für <strong>zwölf Monate</strong> bewilligt
            werden. Bei voraussichtlich gleichbleibenden Verhältnissen kann der Zeitraum
            auf bis zu <strong>24 Monate</strong> verlängert werden.
          </p>

          <h2>Welche Unterlagen werden häufig benötigt?</h2>
          <p>Die genaue Liste hängt von deiner Situation und deiner Behörde ab. Typisch sind:</p>
          <ul>
            <li>Nachweise zur Miete oder zur Belastung des selbst genutzten Eigentums,</li>
            <li>Einkommensnachweise aller relevanten Haushaltsmitglieder,</li>
            <li>Nachweise zu weiteren Einnahmen und abzugsfähigen Belastungen,</li>
            <li>Angaben zu Haushaltsmitgliedern sowie</li>
            <li>gegebenenfalls Nachweise zu besonderen Freibeträgen oder Ausschlusstatbeständen.</li>
          </ul>

          <h2>Wohngeld 2026 berechnen: So gehst du sinnvoll vor</h2>
          <ol>
            <li>
              <strong>Erste Orientierung:</strong> Nutze den kostenlosen AnspruchsCheck,
              um zu sehen, ob Wohngeld grundsätzlich zu deiner Situation passen könnte.
            </li>
            <li>
              <strong>Bundesrechner nutzen:</strong> Der offizielle Wohngeld-Plus-Rechner
              des Bundes liefert anhand von Wohnort, Haushalt, Miete und Einkommen eine
              unverbindliche Modellrechnung.
            </li>
            <li>
              <strong>Antrag stellen:</strong> Nur deine örtlich zuständige
              Wohngeldbehörde kann den Anspruch verbindlich feststellen.
            </li>
          </ol>

          <div className="detail-cta">
            <h3>Passt Wohngeld zu deiner Situation?</h3>
            <p>
              Prüfe Wohngeld gemeinsam mit Kindergeld, Kinderzuschlag, Elterngeld und
              weiteren Leistungen – kostenlos und ohne Konto.
            </p>
            <a className="inverse-button" href="/check">Anspruch jetzt prüfen →</a>
          </div>

          <h2>Häufige Fragen zum Wohngeld-Anspruch</h2>

          <h3>Gibt es 2026 eine feste Einkommensgrenze für Wohngeld?</h3>
          <p>
            Nein, nicht als einen einzigen bundesweiten Betrag für alle. Die Berechnung
            hängt unter anderem von Haushaltsgröße, Einkommen, berücksichtigungsfähiger
            Miete oder Belastung und der Mietenstufe des Wohnorts ab.
          </p>

          <h3>Kann ich als Arbeitnehmer Wohngeld bekommen?</h3>
          <p>
            Ja. Erwerbstätigkeit schließt Wohngeld nicht aus. Gerade Haushalte mit
            niedrigem Erwerbseinkommen gehören zu den Gruppen, für die eine Prüfung
            sinnvoll sein kann.
          </p>

          <h3>Kann ich als Student Wohngeld bekommen?</h3>
          <p>
            Unter Umständen ja. Wenn aber alle Haushaltsmitglieder dem Grunde nach
            BAföG-berechtigt sind, greift grundsätzlich ein gesetzlicher Ausschluss.
            Die konkrete Haushaltskonstellation ist entscheidend.
          </p>

          <h3>Wird Wohngeld rückwirkend gezahlt?</h3>
          <p>
            Der reguläre Bewilligungszeitraum beginnt grundsätzlich mit dem ersten Tag
            des Monats der Antragstellung. Deshalb solltest du mit einem Antrag nicht
            unnötig bis in den nächsten Monat warten, wenn du glaubst, die Voraussetzungen
            bereits zu erfüllen.
          </p>

          <h2>Offizielle Quellen</h2>
          <div className="source-box">
            <strong>Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen</strong>
            <span>FAQ zum Wohngeld-Plus und offizieller Wohngeld-Plus-Rechner</span>
            <a
              href="https://www.bmwsb.bund.de/SharedDocs/faqs/DE/wohnen/wohngeld/wohngeld-faq-liste.html"
              target="_blank"
              rel="noreferrer"
            >
              BMWSB Wohngeld-FAQ öffnen ↗
            </a>
            <a
              href="https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_artikel.html"
              target="_blank"
              rel="noreferrer"
            >
              Offiziellen Wohngeld-Plus-Rechner öffnen ↗
            </a>
          </div>
          <div className="source-box">
            <strong>Wohngeldgesetz (WoGG)</strong>
            <span>Berechnungsgrößen, Ausschlüsse, Antrag und Bewilligungszeitraum</span>
            <a href="https://www.gesetze-im-internet.de/wogg/" target="_blank" rel="noreferrer">
              Aktuelles Wohngeldgesetz öffnen ↗
            </a>
          </div>

          <p>
            Mehr zur Leistung selbst findest du auf unserer Seite
            {" "}<a className="text-link" href="/leistungen/wohngeld">Wohngeld im Überblick</a>.
          </p>
          <p>
            Diese Seite dient der unverbindlichen Information und ersetzt keine
            individuelle Rechts- oder Leistungsberatung. Regelstand geprüft am
            18.08.2026.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
