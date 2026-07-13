import Link from "next/link";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-brand/80 bg-brand text-on-brand-muted">
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo href="/" onDark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-on-brand-muted">{site.tagline}</p>
          <p className="mt-4 text-sm text-on-brand-muted">
            {site.founder.name}, {site.founder.title}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
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
                  className="inline-flex min-h-11 items-center py-1 hover:text-on-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Solutions
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {nav
              .find((n) => n.label === "Solutions")
              ?.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="inline-flex min-h-11 items-center py-1 hover:text-on-brand"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center font-medium hover:text-on-brand"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 break-all items-center hover:text-on-brand"
              >
                {site.email}
              </a>
            </li>
            <li className="text-on-brand-muted">Nationwide project support</li>
            <li className="text-on-brand-muted">Direct sales · Fabricated in Colorado</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-on-brand-muted/80 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>UL 8782 listed EPFA · MOAS odor abatement · English (US)</p>
        </div>
      </div>
    </footer>
  );
}
