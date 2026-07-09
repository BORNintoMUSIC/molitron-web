export const site = {
  name: "Molitron",
  legalName: "Molitron Company Inc",
  tagline: "Commercial kitchen pollution control & odor abatement",
  description:
    "UL 8782 & ETL listed commercial kitchen pollution control and odor abatement. EPFA dry filtration and MOAS molecular odor neutralization—sold direct for restaurants, airports, CA & Denver.",
  url: "https://molitron.com",
  phone: "303-969-8888",
  phoneHref: "tel:+13039698888",
  email: "scott@molitron.com",
  address: {
    street: "1457 Ammons St",
    city: "Lakewood",
    state: "CO",
    zip: "80214",
    country: "US",
  },
  founder: {
    name: "Scott Airhart",
    title: "President",
  },
  founded: 1986,
  regions: ["California", "Denver / Colorado"],
  verticals: ["Restaurants", "Airports & hospitality", "Cannabis (expanding)"],
} as const;

export function formatAddress(multiline = false): string {
  const { street, city, state, zip } = site.address;
  if (multiline) return `${street}\n${city}, ${state} ${zip}`;
  return `${street}, ${city}, ${state} ${zip}`;
}

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
