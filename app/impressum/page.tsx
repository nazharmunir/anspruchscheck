import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = { title: "Impressum" };

export default function ImprintPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-content">
          <p className="section-kicker">Rechtliches</p>
          <h1>Impressum</h1>
          <div className="legal-callout">
            <strong>MVP-Testversion</strong>
            <p>Diese Website befindet sich in einer nicht kommerziellen Testphase. Vor einer öffentlichen Vermarktung müssen hier noch der vollständige Name und eine ladungsfähige Anschrift des verantwortlichen Anbieters ergänzt werden.</p>
          </div>
          <h2>Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a className="text-link" href="mailto:mazhar.munir1233@gmail.com">
              mazhar.munir1233@gmail.com
            </a>
          </p>
          <h2>Inhaltliche Verantwortung</h2>
          <p>Die Inhalte dienen der unverbindlichen Erstorientierung. Anspruch ist keine Behörde, Kanzlei oder Sozialberatung und trifft keine Entscheidung über Leistungsansprüche.</p>
          <h2>Haftung für Inhalte und Links</h2>
          <p>Die Informationen werden sorgfältig aus offiziellen Quellen zusammengefasst, können aber Änderungen, Sonderfällen oder Fehlern unterliegen. Für eine verbindliche Prüfung sind die jeweils zuständigen Behörden verantwortlich. Für Inhalte externer Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
          <h2>Streitbeilegung</h2>
          <p>In dieser MVP-Testphase nehmen wir nicht an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
