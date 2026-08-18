import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Über AnspruchsCheck",
  description:
    "Wer hinter AnspruchsCheck steht, warum die Plattform existiert und wie wir staatliche Leistungen verständlicher machen wollen.",
  alternates: { canonical: "/ueber" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-content">
          <p className="section-kicker">Über uns</p>
          <h1>Über AnspruchsCheck</h1>
          <p>
            AnspruchsCheck ist eine unabhängige, privat betriebene Orientierungshilfe für Menschen in Deutschland,
            die schnell herausfinden möchten, welche staatlichen Leistungen zu ihrer Situation passen könnten.
          </p>
          <h2>Warum gibt es AnspruchsCheck?</h2>
          <p>
            Informationen zu Familien-, Wohn- und Sozialleistungen sind auf viele Behörden, Rechner und Merkblätter
            verteilt. AnspruchsCheck bündelt die wichtigsten Einstiegskriterien in einem verständlichen Check und
            verweist anschließend auf die zuständigen offiziellen Stellen.
          </p>
          <h2>Wer betreibt die Seite?</h2>
          <p>
            Betreiber und technischer Entwickler ist Muhammad Mazhar Munir in Hamburg. Die Plattform wird als
            eigenständiges Softwareprojekt entwickelt und gepflegt.
          </p>
          <h2>Was AnspruchsCheck nicht ist</h2>
          <p>
            AnspruchsCheck ist keine Behörde und bietet keine verbindliche Rechts- oder Leistungsberatung. Ergebnisse
            sind eine unverbindliche Orientierung. Ob ein Anspruch tatsächlich besteht und in welcher Höhe, entscheidet
            ausschließlich die jeweils zuständige Stelle nach Antrag und Prüfung der Nachweise.
          </p>
          <h2>Quellen und Aktualisierung</h2>
          <p>
            Für Leistungsregeln und Beträge verwenden wir vorrangig offizielle Quellen von Bundesbehörden,
            Familienkassen, Ministerien und anderen zuständigen öffentlichen Stellen. Auf den Leistungsseiten zeigen wir
            die jeweilige Quelle und den zuletzt geprüften Regelstand an.
          </p>
          <p>
            Mehr dazu findest du auf unserer <a className="text-link" href="/methodik">Seite zu Methodik und Quellen</a>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
