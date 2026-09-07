const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://molitron-web.vercel.app";

export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

export const site = {
  name: "Molitron",
  legalName: "Molitron Company Inc",
  tagline: "Commercial kitchen pollution control & odor abatement",
  description:
    "Molitron is a family business founded in 1986, fabricating commercial kitchen pollution control equipment in Colorado. MOAS treats cooking odor; EPFA provides dry filtration for light-duty kitchen exhaust. Direct manufacturer support for projects nationwide.",
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
  { label: "MOAS", href: "/products/moas" },
  { label: "EPFA", href: "/products/epfa" },
  {
    label: "Applications",
    href: "/solutions",
    children: [
      { label: "Restaurants", href: "/solutions/restaurants" },
      {
        label: "Airports & hospitality",
        href: "/solutions/airports-hospitality",
      },
      { label: "Cannabis", href: "/solutions/cannabis" },
      { label: "Industrial & specialty", href: "/solutions/industrial" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "MOAS planning guide",
        href: "/products/moas/installation-planning",
      },
      {
        label: "EPFA operation & maintenance",
        href: "/products/epfa/operation-maintenance",
      },
      { label: "Equipment listings", href: "/codes-compliance" },
      { label: "Service & parts", href: "/service-parts" },
    ],
  },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = {
  label: "Discuss your project",
  href: "/contact",
} as const;
