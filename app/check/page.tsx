import type { Metadata } from "next";
import { CheckClient } from "./check-client";

export const metadata: Metadata = {
  title: "Leistungs-Check starten",
  description: "Beantworte wenige Fragen und erhalte eine persönliche Orientierung zu acht staatlichen Leistungen.",
  alternates: { canonical: "/check" },
};

export default function CheckPage() {
  return <CheckClient />;
}
