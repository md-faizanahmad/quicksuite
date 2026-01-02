import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quicksuite.vercel.app"; // Replace with your domain

  const routes = [
    "",
    "/tools/quick-reduce",
    "/tools/pdf-merge",
    "/tools/image-to-pdf",
    "/tools/image-pro",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
