import type { MetadataRoute } from "next";
import { isPreviewDeployment, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPreviewDeployment ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
