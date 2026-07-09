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
    title: "MOAS and EPFA",
    description:
      "Two systems cover filtration and odor abatement for commercial kitchen exhaust. The Enviro-Clean Air Scrubber has been discontinued.",
  },
  moas: {
    src: "/images/heroes/moas.jpg",
    alt: "Stainless steel commercial odor abatement system in a mechanical room",
    eyebrow: "Product · ETL listed",
    title: "Molitron Odor Abatement System (MOAS)",
    description: "Neutralize smoke and odor in commercial exhaust streams.",
  },
  epfa: {
    src: "/images/heroes/epfa.jpg",
    alt: "Stainless modular commercial kitchen filter assembly with duct connections",
    eyebrow: "Product · UL listed",
    title: "Enviro-Pak Filter Assembly (EPFA)",
    description: "UL listed filtration for grease, particulate, and kitchen exhaust.",
  },
  solutions: {
    src: "/images/heroes/solutions.jpg",
    alt: "Rooftop pollution control serving multiple commercial applications",
    eyebrow: "Solutions",
    title: "Applications we support",
    description:
      "Start with your vertical, then request a quote with CFM and equipment details.",
  },
  restaurants: {
    src: "/images/heroes/restaurants.jpg",
    alt: "Restaurant kitchen exhaust rising to rooftop pollution control equipment",
    eyebrow: "Solutions · Restaurants",
    title: "Pollution control units for commercial restaurants",
    description:
      "Help restaurant owners and facility managers control grease, smoke, and cooking odors—sold direct.",
  },
  airports: {
    src: "/images/heroes/airports-hospitality.jpg",
    alt: "Airport concessions rooftop kitchen exhaust and pollution control equipment",
    eyebrow: "Solutions · Airports & hospitality",
    title: "Exhaust control for airports, hotels, and high-visibility kitchens",
    description:
      "Proven on high-visibility foodservice—including multiple concepts at Denver International Airport.",
  },
  cannabis: {
    src: "/images/heroes/cannabis.jpg",
    alt: "Industrial odor control equipment in a clean regulated facility mechanical room",
    eyebrow: "Solutions · Cannabis",
    title: "Odor and exhaust control for cannabis facilities",
    description:
      "Expanding into odor-sensitive facilities with the same direct-sales approach used for restaurants and airports.",
  },
  codes: {
    src: "/images/heroes/codes-compliance.jpg",
    alt: "Engineering compliance workspace with commercial exhaust equipment model",
    eyebrow: "Education",
    title: "Codes & compliance for commercial kitchen exhaust",
    description:
      "Educational guidance on grease, smoke, odor, sidewall discharge, and listings—always verify with your AHJ.",
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
      "Molitron sells direct. Share CFM, equipment, location, and discharge type for a useful first response.",
  },
  service: {
    src: "/images/heroes/service-parts.jpg",
    alt: "Rooftop service setup with open filter cabinet and spare filter media",
    eyebrow: "Support",
    title: "Service & parts",
    description:
      "Technical guidance and parts direction for installed MOAS and EPFA equipment—direct from the manufacturer.",
  },
} as const satisfies Record<string, PageHeroConfig>;
