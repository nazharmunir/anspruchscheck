import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anspruchscheck.de"),
  applicationName: "AnspruchsCheck.de",
  title: {
    default: "AnspruchsCheck.de – Staatliche Leistungen einfach prüfen",
    template: "%s | AnspruchsCheck.de",
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
    title: "AnspruchsCheck.de – Welche Unterstützung passt zu dir?",
    description:
      "Prüfe kostenlos und ohne Konto, welche staatlichen Leistungen zu deiner Situation passen könnten.",
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "AnspruchsCheck.de",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AnspruchsCheck.de – Staatliche Leistungen klar prüfen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnspruchsCheck.de – Staatliche Leistungen einfach prüfen",
    description:
      "Kostenlose Orientierung zu acht staatlichen Leistungen in Deutschland.",
    images: ["/og-image.png"],
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
