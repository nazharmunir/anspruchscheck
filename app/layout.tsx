import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anspruch – Staatliche Leistungen einfach prüfen",
    template: "%s | Anspruch",
  },
  description:
    "Prüfe in wenigen Minuten, welche staatlichen Leistungen in Deutschland zu deiner Situation passen könnten – verständlich, kostenlos und ohne Konto.",
  keywords: [
    "Sozialleistungen prüfen",
    "Wohngeld Rechner",
    "Kinderzuschlag",
    "Kindergeld",
    "Elterngeld",
  ],
  openGraph: {
    title: "Anspruch – Welche Unterstützung passt zu dir?",
    description: "Ein verständlicher erster Check für acht staatliche Leistungen in Deutschland.",
    type: "website",
    locale: "de_DE",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
