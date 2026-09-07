import type { Product } from "./products";

// Editorial summaries; all specification values remain in products.ts.
export const productPresentation = {
  moas: {
    role: "Odor abatement",
    headline: "Odor treatment in the exhaust.",
    image: "/images/moas/moas-closed-professional-gpt2.png",
    openImage: "/images/remastered/moas-open-v2.webp",
    features: [
      "Wall-mounted stainless steel cabinet",
      "Remote misting nozzles",
      "Standalone or alongside EPFA",
    ],
    guide: "/products/moas/installation-planning",
    guideTitle: "Engineering & installation planning",
    guideDescription:
      "Cabinet location, utilities, nozzles, tubing, access, and project responsibilities.",
  },
  epfa: {
    role: "Dry filtration",
    headline: "Three stages of dry filtration.",
    image: "/images/remastered/epfa-closed-v2.webp",
    openImage: "/images/remastered/epfa-open-v2.webp",
    features: [
      "Three-stage dry filtration",
      "Stainless steel enclosure",
      "MERV 14 or optional carbon final stage",
    ],
    guide: "/products/epfa/operation-maintenance",
    guideTitle: "Installation, operation & maintenance",
    guideDescription:
      "Receiving, installation coordination, monitoring, filter service, and equipment records.",
  },
} satisfies Record<
  Product["slug"],
  {
    role: string;
    headline: string;
    image: string;
    openImage: string;
    features: string[];
    guide: string;
    guideTitle: string;
    guideDescription: string;
  }
>;
