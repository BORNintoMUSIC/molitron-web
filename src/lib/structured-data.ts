import { productPresentation } from "./product-presentation";
import type { Product } from "./products";
import { site } from "./site";

export const organizationId = `${site.url}/#organization`;

export function productEntityId(slug: Product["slug"]) {
  return `${site.url}/products/${slug}#product`;
}

export function guideEntityId(slug: Product["slug"]) {
  return `${site.url}${productPresentation[slug].guide}#guide`;
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/molitron-logo.svg`,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  areaServed: { "@type": "Country", name: "United States" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    email: site.email,
    contactType: "sales and product support",
    areaServed: "US",
    availableLanguage: "English",
  },
  employee: {
    "@type": "Person",
    name: site.president.name,
    jobTitle: site.president.title,
  },
  description: site.description,
};

export function productStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productEntityId(product.slug),
    name: product.name,
    alternateName: product.shortName,
    url: `${site.url}/products/${product.slug}`,
    description: product.summary,
    image: product.gallery.map((image) => `${site.url}${image.src}`),
    brand: { "@id": organizationId },
    manufacturer: { "@id": organizationId },
    category:
      product.slug === "moas"
        ? "Commercial kitchen exhaust odor abatement"
        : "Light-duty commercial kitchen exhaust dry filtration",
    subjectOf: {
      "@type": "TechArticle",
      "@id": guideEntityId(product.slug),
      url: `${site.url}${productPresentation[product.slug].guide}`,
    },
  };
}
