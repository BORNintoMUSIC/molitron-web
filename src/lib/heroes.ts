export type PageHeroConfig = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

/** Interior page heroes (home uses its own full-bleed layout). */
export const pageHeroes = {
  products: {
    src: "/images/heroes/products.jpg",
    alt: "Molitron commercial kitchen pollution control product lineup",
    eyebrow: "Products",
    title: "MOAS odor abatement & EPFA filtration",
    description:
      "Two listed systems for commercial kitchen exhaust: molecular odor neutralization and three-stage dry pollution control. Specify one—or both.",
  },
  moas: {
    src: "/images/heroes/moas.jpg",
    alt: "Stainless steel commercial odor abatement system in a mechanical room",
    eyebrow: "Product · ETL listed",
    title: "Molitron Odor Abatement System (MOAS)",
    description:
      "Odors neutralized at the molecular level—not masked. Gone. Up to 95% odor particle reduction in commercial kitchen exhaust.",
  },
  epfa: {
    src: "/images/heroes/epfa.jpg",
    alt: "Stainless modular commercial kitchen filter assembly with duct connections",
    eyebrow: "Product · UL 8782 listed",
    title: "Enviro-Pak Filter Assembly (EPFA)",
    description:
      "Serious exhaust filtration. Zero plumbing. Three-stage dry filtration for smoke, grease vapor, and odor in light-duty kitchen exhaust.",
  },
  solutions: {
    src: "/images/heroes/solutions.jpg",
    alt: "Rooftop pollution control serving multiple commercial applications",
    eyebrow: "Solutions",
    title: "Commercial kitchen exhaust control by application",
    description:
      "Match filtration and odor abatement to your vertical—then request a quote with CFM and equipment details.",
  },
  restaurants: {
    src: "/images/heroes/restaurants.jpg",
    alt: "Restaurant kitchen exhaust rising to rooftop pollution control equipment",
    eyebrow: "Solutions · Restaurants",
    title: "Restaurant pollution control & odor abatement",
    description:
      "Help owners and facility managers stop visible smoke and cooking odors before they become complaints—or code issues. Sold direct.",
  },
  airports: {
    src: "/images/heroes/airports-hospitality.jpg",
    alt: "Airport concessions rooftop kitchen exhaust and pollution control equipment",
    eyebrow: "Solutions · Airports & hospitality",
    title: "Exhaust control for airports, hotels, and high-visibility kitchens",
    description:
      "Listed filtration and odor abatement for shared buildings and public-facing foodservice—including multiple concepts at Denver International Airport.",
  },
  cannabis: {
    src: "/images/heroes/cannabis.jpg",
    alt: "Industrial odor control equipment in a clean regulated facility mechanical room",
    eyebrow: "Solutions · Cannabis",
    title: "Odor and exhaust control for cannabis facilities",
    description:
      "Apply the same molecular odor neutralization and exhaust filtration approach used for restaurants and airports to odor-sensitive cannabis environments.",
  },
  codes: {
    src: "/images/heroes/codes-compliance.jpg",
    alt: "Engineering compliance workspace with commercial exhaust equipment model",
    eyebrow: "Education",
    title: "Codes & compliance for commercial kitchen exhaust",
    description:
      "Grease, smoke, odor, sidewall discharge, and listings—educational guidance for owners and project teams. Always verify with your AHJ.",
  },
  about: {
    src: "/images/heroes/about.jpg",
    alt: "Colorado manufacturing facility at morning light",
    eyebrow: "About Molitron",
    title: "Built in Colorado. Specified for code.",
    description:
      "Since 1986, Molitron has manufactured commercial kitchen pollution control and odor abatement equipment—sold direct from Lakewood, Colorado.",
  },
  contact: {
    src: "/images/heroes/contact.jpg",
    alt: "Professional desk ready for a commercial kitchen project quote",
    eyebrow: "Contact",
    title: "Request a quote",
    description:
      "Molitron sells direct. Share CFM, cooking equipment, location, and discharge type for a useful first response.",
  },
  service: {
    src: "/images/heroes/service-parts.jpg",
    alt: "Rooftop service setup with open filter cabinet and spare filter media",
    eyebrow: "Support",
    title: "Service & parts",
    description:
      "Technical guidance, filter direction, and parts support for installed MOAS and EPFA equipment—direct from the manufacturer.",
  },
} as const satisfies Record<string, PageHeroConfig>;
