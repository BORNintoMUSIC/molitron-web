import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/products",
  "/products/moas",
  "/products/moas/installation-planning",
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
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" || path === "/contact" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products") || path === "/contact" ? 0.9 : 0.7,
  }));
}
