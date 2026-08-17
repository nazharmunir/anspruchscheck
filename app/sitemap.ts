import type { MetadataRoute } from "next";
import { benefits } from "../lib/benefits";

const baseUrl = "https://anspruchscheck.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/check", "/datenschutz", "/impressum"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date("2026-08-17T00:00:00.000Z"),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/check" ? 0.9 : 0.3,
    }),
  );

  const benefitRoutes = benefits.map((benefit) => ({
    url: `${baseUrl}/leistungen/${benefit.slug}`,
    lastModified: new Date("2026-08-17T00:00:00.000Z"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...benefitRoutes];
}
