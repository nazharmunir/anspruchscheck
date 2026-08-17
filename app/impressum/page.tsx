import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung und Kontakt für AnspruchsCheck.de.",
  alternates: { canonical: "/impressum" },
};

export default function ImprintPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-content">
          <p className="section-kicker">Rechtliches</p>
          <h1>Impressum</h1>
          <p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>

          <h2>Anbieter</h2>
          <address className="legal-address">
            <strong>Muhammad Mazhar Munir</strong>
            <br />
            Hamburg, Deutschland
            <br />
            E-Mail:{" "}
            <a className="text-link" href="mailto:mazhar.munir1233@gmail.com">
              mazhar.munir1233@gmail.com
            </a>
          </address>

          <div className="legal-callout">
            <strong>Vor einer geschäftsmäßigen Vermarktung</strong>
            <p>
              Die vollständige ladungsfähige Anschrift mit Straße, Hausnummer und
              Postleitzahl muss hier noch ergänzt und das Impressum juristisch
              geprüft werden.
            </p>
          </div>

          <h2>Inhaltliche Verantwortung</h2>
          <p>
            Verantwortlich für die redaktionellen Inhalte: Muhammad Mazhar Munir.
            Die Inhalte dienen der unverbindlichen Erstorientierung.
            AnspruchsCheck.de ist keine Behörde, Kanzlei oder Sozialberatung und
            trifft keine Entscheidung über Leistungsansprüche.
          </p>
          <h2>Haftung für Inhalte und Links</h2>
          <p>Die Informationen werden sorgfältig aus offiziellen Quellen zusammengefasst, können aber Änderungen, Sonderfällen oder Fehlern unterliegen. Für eine verbindliche Prüfung sind die jeweils zuständigen Behörden verantwortlich. Für Inhalte externer Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
          <h2>Streitbeilegung</h2>
          <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
