import { benefits } from "../lib/benefits";

export function BenefitGrid() {
  return (
    <div className="benefit-grid">
      {benefits.map((benefit) => (
        <a key={benefit.slug} href={`/leistungen/${benefit.slug}`} className="benefit-card">
          <div className="benefit-card-top">
            <span className={`benefit-symbol tone-${benefit.tone}`}>{benefit.symbol}</span>
            <span className="benefit-arrow" aria-hidden="true">↗</span>
          </div>
          <p className="benefit-kicker">{benefit.kicker}</p>
          <h3>{benefit.shortName}</h3>
          <p>{benefit.summary}</p>
          <div className="benefit-amount">
            <strong>{benefit.amount}</strong>
            <span>{benefit.amountLabel}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
