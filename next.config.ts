import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [65, 70, 75, 85],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  compress: true,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source:
          "/wp-content/uploads/2021/04/Molitron-Odor-Abatement-System-Brochure.pdf",
        destination: "/docs/moas-brochure-2026.pdf",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2021/04/MOAS-Installation-Diagram.pdf",
        destination: "/products/moas",
        permanent: false,
      },
      {
        source: "/wp-content/uploads/2021/04/Enviro-Pak-Filter-Assembly-Brochure.pdf",
        destination: "/products/epfa",
        permanent: false,
      },
      {
        source:
          "/wp-content/uploads/2021/04/ENVIRO-PAK-Operation-Maintenance-Manual-10-2019.pdf",
        destination: "/products/epfa",
        permanent: false,
      },
      {
        source:
          "/wp-content/uploads/2019/10/ENVIRO-PAK-Operation-Maintenance-Manual-10-2019.pdf",
        destination: "/products/epfa",
        permanent: false,
      },
      {
        source: "/wp-content/uploads/2021/04/Enviropakfilterspec.pdf",
        destination: "/products/epfa",
        permanent: false,
      },
      {
        source: "/wp-content/uploads/2021/04/Enviro-Clean-Air-Scrubber-Brochure.pdf",
        destination: "/service-parts",
        permanent: false,
      },
      {
        source:
          "/wp-content/uploads/2021/04/Enviro-Clean-Air-Scrubber-Specifications.pdf",
        destination: "/service-parts",
        permanent: false,
      },
      {
        source: "/wp-content/uploads/2021/04/AirScrubberspecs.pdf",
        destination: "/service-parts",
        permanent: false,
      },
      {
        source: "/docs/moas-engineering-specs-installation-2026.pdf",
        destination: "/products/moas",
        permanent: false,
      },
      {
        source: "/docs/epfa-brochure-2026.pdf",
        destination: "/products/epfa",
        permanent: false,
      },
      {
        source: "/docs/epfa-operation-maintenance-manual-2026.pdf",
        destination: "/products/epfa",
        permanent: false,
      },
      {
        source: "/docs/enviro-clean-air-scrubber-brochure-2026.pdf",
        destination: "/service-parts",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
