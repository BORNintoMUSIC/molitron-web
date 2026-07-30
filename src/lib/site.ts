const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://molitron-web.vercel.app";

export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const site = {
  name: "Molitron",
  legalName: "Molitron Company Inc",
  tagline: "Commercial kitchen pollution control & odor abatement",
  description:
    "Commercial kitchen pollution control and odor abatement from a direct manufacturer. EPFA dry filtration and MOAS odor neutralization for projects nationwide.",
  url: configuredSiteUrl,
  phone: "303-969-8888",
  phoneHref: "tel:+13039698888",
  email: "cleanair@molitron.com",
  president: {
    name: "Scott Airhart",
    title: "President",
  },
  founded: 1986,
  regions: ["United States", "California", "Denver / Colorado"],
  verticals: [
    "Restaurants",
    "Airports & hospitality",
    "Cannabis facilities",
    "Industrial & specialty applications",
  ],
} as const;

export const nav = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "MOAS Odor Abatement", href: "/products/moas" },
      { label: "EPFA Filter Assembly", href: "/products/epfa" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Restaurants", href: "/solutions/restaurants" },
      { label: "Airports & Hospitality", href: "/solutions/airports-hospitality" },
      { label: "Cannabis", href: "/solutions/cannabis" },
      { label: "Industrial & Specialty", href: "/solutions/industrial" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Codes & Compliance", href: "/codes-compliance" },
  { label: "Service & Parts", href: "/service-parts" },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = {
  label: "Request a Quote",
  href: "/contact",
} as const;
