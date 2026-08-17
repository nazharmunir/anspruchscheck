import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { benefits, benefitBySlug, type BenefitSlug } from "../../../lib/benefits";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export function generateStaticParams() {
  return benefits.map((benefit) => ({ slug: benefit.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const benefit = benefitBySlug.get(slug as BenefitSlug);
  if (!benefit) return {};
  return {
    title: `${benefit.name} prüfen`,
    description: `${benefit.summary} Voraussetzungen, mögliche Höhe, Unterlagen und offizieller nächster Schritt.`,
    alternates: { canonical: `/leistungen/${benefit.slug}` },
    openGraph: {
      title: `${benefit.name} prüfen | AnspruchsCheck.de`,
      description: benefit.summary,
      url: `/leistungen/${benefit.slug}`,
      siteName: "AnspruchsCheck.de",
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "AnspruchsCheck.de – Staatliche Leistungen klar prüfen",
        },
      ],
    },
  };
}

export default async function BenefitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const benefit = benefitBySlug.get(slug as BenefitSlug);
  if (!benefit) notFound();

  return (
    <>
      <SiteHeader />
      <main className="subpage-main">
        <section className="benefit-hero">
          <div className="section-shell benefit-hero-inner">
            <div>
              <a className="breadcrumb" href="/#leistungen">← Alle Leistungen</a>
              <p className="section-kicker">{benefit.kicker}</p>
              <h1>{benefit.name}</h1>
              <p className="benefit-hero-copy">{benefit.summary}</p>
            </div>
            <aside className="amount-panel">
              <small>Mögliche Höhe</small>
              <strong>{benefit.amount}</strong>
              <span>{benefit.amountLabel}</span>
            </aside>
          </div>
        </section>

        <section className="detail-section">
          <div className="section-shell detail-grid">
            <div className="detail-intro">
              <h2>Worum geht es?</h2>
              <p>{benefit.intro}</p>
              <div className="source-box">
                <strong>Regelstand geprüft</strong>
                <span>{benefit.verified} · {benefit.sourceName}</span>
                <a href={benefit.sourceUrl} target="_blank" rel="noreferrer">Offizielle Quelle öffnen ↗</a>
              </div>
            </div>
            <div>
              <div className="detail-block">
                <h3>Wer sollte genauer prüfen?</h3>
                <ul className="detail-list">{benefit.whoShouldCheck.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="detail-block">
                <h3>Typische Unterlagen</h3>
                <ul className="detail-list">{benefit.documents.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="detail-block">
                <h3>Dein nächster Schritt</h3>
                <ul className="detail-list">{benefit.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="detail-cta">
                <h3>Passt diese Leistung zu dir?</h3>
                <p>Der kostenlose Check ordnet diese und sieben weitere Leistungen anhand deiner Situation ein.</p>
                <a className="inverse-button" href="/check">Anspruch prüfen →</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
