import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
const groups = [
  {
    title: "Our equipment",
    links: [
      ["MOAS · Odor abatement", "/products/moas"],
      ["EPFA · Dry filtration", "/products/epfa"],
      ["Compare the systems", "/products"],
      ["Applications", "/solutions"],
    ],
  },
  {
    title: "Technical support",
    links: [
      ["Document library", "/resources"],
      ["MOAS planning guide", "/products/moas/installation-planning"],
      ["EPFA operation & maintenance", "/products/epfa/operation-maintenance"],
      ["Codes & listings", "/codes-compliance"],
      ["Service & parts", "/service-parts"],
    ],
  },
];
export function Footer() {
  return (
    <footer className="site-footer brand-band">
      <div className="safe-inline mx-auto max-w-7xl">
        <div className="footer-top">
          <div>
            <Logo href="/" onDark />
            <p>
              Purposeful equipment.
              <br />
              People you can talk to.
            </p>
            <Link href="/about" className="text-link">
              Meet Molitron ↗
            </Link>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="eyebrow">{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="eyebrow">Made in Colorado</h2>
            <a className="footer-phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <a href={"mailto:" + site.email}>{site.email}</a>
            <p>
              Direct from the manufacturer.
              <br />
              Serving projects nationwide.
            </p>
            <Link href="/contact" className="text-link">
              Start a conversation ↗
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Colorado built. Since {site.founded}.</p>
        </div>
      </div>
    </footer>
  );
}
