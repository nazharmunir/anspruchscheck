import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AnspruchsCheck",
  alternateName: ["AnspruchsCheck.de", "Anspruch"],
  url: "https://anspruchscheck.de/",
  inLanguage: "de-DE",
  description:
    "AnspruchsCheck hilft Menschen in Deutschland dabei, kostenlos und unverbindlich passende staatliche Leistungen zu prüfen.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anspruchscheck.de"),
  applicationName: "AnspruchsCheck",
  title: {
    default: "AnspruchsCheck – Staatliche Leistungen einfach prüfen",
    template: "%s | AnspruchsCheck",
  },
  description:
    "Mit AnspruchsCheck prüfst du in wenigen Minuten, welche staatlichen Leistungen in Deutschland zu deiner Situation passen könnten – kostenlos, verständlich und ohne Konto.",
  keywords: [
    "AnspruchsCheck",
    "Anspruch prüfen",
    "staatliche Leistungen prüfen",
    "Sozialleistungen prüfen",
    "Wohngeld Rechner",
    "Kinderzuschlag",
    "Kindergeld",
    "Elterngeld",
  ],
  openGraph: {
    title: "AnspruchsCheck – Welche Unterstützung passt zu dir?",
    description:
      "Prüfe kostenlos und ohne Konto, welche staatlichen Leistungen zu deiner Situation passen könnten.",
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "AnspruchsCheck",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AnspruchsCheck – Staatliche Leistungen klar prüfen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnspruchsCheck – Staatliche Leistungen einfach prüfen",
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
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Script id="vercel-web-analytics-init" strategy="afterInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script
          src="/_vercel/insights/script.js"
          strategy="afterInteractive"
          data-sdkn="@vercel/analytics/next"
        />
      </body>
    </html>
  );
}
