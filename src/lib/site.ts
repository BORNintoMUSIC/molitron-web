export const site = {
  name: "Molitron",
  legalName: "Molitron Company Inc",
  tagline: "Commercial kitchen pollution control & odor abatement",
  description:
    "Commercial kitchen pollution control and odor abatement from a direct manufacturer. EPFA dry filtration and MOAS odor neutralization for projects nationwide.",
  url: "https://molitron.com",
  phone: "303-969-8888",
  phoneHref: "tel:+13039698888",
  email: "cleanair@molitron.com",
  founder: {
    name: "Scott Airhart",
    title: "President",
  },
  founded: 1986,
  regions: ["United States", "California", "Denver / Colorado"],
  verticals: ["Restaurants", "Airports & hospitality", "Cannabis (expanding)"],
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
    ],
  },
  { label: "Codes & Compliance", href: "/codes-compliance" },
  { label: "Service & Parts", href: "/service-parts" },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = {
  label: "Request a Quote",
  href: "/contact",
} as const;
