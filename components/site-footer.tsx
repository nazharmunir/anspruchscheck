import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Ein verständlicher erster Check für staatliche Leistungen in Deutschland.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-heading">Produkt</p>
            <a href="/check">Anspruch prüfen</a>
            <a href="/#leistungen">Leistungen</a>
            <a href="/methodik">Methodik &amp; Quellen</a>
          </div>
          <div>
            <p className="footer-heading">Über &amp; Rechtliches</p>
            <a href="/ueber">Über AnspruchsCheck</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/impressum">Impressum</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 AnspruchsCheck</p>
        <p>Orientierung – keine verbindliche Rechts- oder Leistungsberatung.</p>
      </div>
    </footer>
  );
}
