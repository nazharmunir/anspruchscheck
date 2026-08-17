export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/" className="brand" aria-label="Anspruch Startseite">
      <span className={compact ? "brand-mark brand-mark-compact" : "brand-mark"}>A</span>
      <span>
        <span className="brand-name">ANSPRUCH</span>
        {compact ? null : <span className="brand-line">Leistungen klar verstehen.</span>}
      </span>
    </a>
  );
}
