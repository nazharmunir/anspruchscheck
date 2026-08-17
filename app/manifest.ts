import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anspruch – Leistungen einfach prüfen",
    short_name: "Anspruch",
    description: "Ein verständlicher erster Check für staatliche Leistungen in Deutschland.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ee",
    theme_color: "#0b6548",
    lang: "de",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
