import Link from "next/link";
import { formatAddress, nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-primary text-slate-200">
      <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-56 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">{site.tagline}</p>
          <p className="mt-4 text-sm text-slate-300">
            {site.founder.name}, {site.founder.title}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
            Explore
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {[
              { href: "/products/moas", label: "MOAS" },
              { href: "/products/epfa", label: "EPFA" },
              { href: "/codes-compliance", label: "Codes & Compliance" },
              { href: "/service-parts", label: "Service & Parts" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Request a Quote" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-10 items-center py-1 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
            Solutions
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {nav
              .find((n) => n.label === "Solutions")
              ?.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="inline-flex min-h-10 items-center py-1 hover:text-white"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-200">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-10 items-center font-medium hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-10 break-all items-center hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li className="text-slate-300">{formatAddress()}</li>
            <li className="text-slate-300">Direct sales · Fabricated in Colorado</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>UL / ETL listed equipment · English (US)</p>
        </div>
      </div>
    </footer>
  );
}
