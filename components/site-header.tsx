import { Brand } from "./brand";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Brand compact />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="/#so-funktionierts">So funktioniert&apos;s</a>
          <a href="/#leistungen">Leistungen</a>
          <a href="/check" className="nav-cta">Anspruch prüfen</a>
        </nav>
        <a href="/check" className="mobile-nav-cta">Check starten</a>
      </div>
    </header>
  );
}
