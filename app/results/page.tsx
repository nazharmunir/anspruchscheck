import type { Metadata } from "next";
import { ResultsClient } from "./results-client";

export const metadata: Metadata = {
  title: "Deine persönliche Übersicht",
  description: "Deine persönliche Orientierung zu staatlichen Leistungen und offiziellen nächsten Schritten.",
  alternates: { canonical: "/results" },
  robots: { index: false, follow: false },
};

export default function ResultsPage() {
  return <ResultsClient />;
}
