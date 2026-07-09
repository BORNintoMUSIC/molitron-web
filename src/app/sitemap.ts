import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/products",
  "/products/moas",
  "/products/epfa",
  "/solutions",
  "/solutions/restaurants",
  "/solutions/airports-hospitality",
  "/solutions/cannabis",
  "/codes-compliance",
  "/about",
  "/contact",
  "/service-parts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/contact" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products") || path === "/contact" ? 0.9 : 0.7,
  }));
}
