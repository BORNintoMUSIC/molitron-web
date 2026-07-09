"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { nav, primaryCta, site } from "@/lib/site";

const TOGGLE_ID = "molitron-mobile-nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function setMenuOpen(open: boolean) {
    setMobileOpen(open);
    const box = document.getElementById(TOGGLE_ID) as HTMLInputElement | null;
    if (box) box.checked = open;
    document.body.classList.toggle("nav-open", open);
  }

  function closeMobileNav() {
    setMenuOpen(false);
  }

  function goMobile(href: string) {
    closeMobileNav();
    router.push(href);
  }

  useEffect(() => {
    setOpenMenu(null);
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close on route change only
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep checkbox + React state in sync (label toggles checkbox natively)
  useEffect(() => {
    const box = document.getElementById(TOGGLE_ID) as HTMLInputElement | null;
    if (!box) return;

    const sync = () => {
      setMobileOpen(box.checked);
      document.body.classList.toggle("nav-open", box.checked);
    };

    box.addEventListener("change", sync);
    box.addEventListener("click", sync);
    return () => {
      box.removeEventListener("change", sync);
      box.removeEventListener("click", sync);
      document.body.classList.remove("nav-open");
    };
  }, []);

  // Escape closes menu
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <input
        id={TOGGLE_ID}
        type="checkbox"
        className="mobile-nav-checkbox"
        checked={mobileOpen}
        onChange={(e) => setMenuOpen(e.target.checked)}
        aria-controls="molitron-mobile-nav-panel"
        aria-expanded={mobileOpen}
      />

      <header
        className={`sticky top-0 z-[100] border-b bg-card/95 backdrop-blur-sm transition-[box-shadow,background-color,border-color] duration-300 ${
          scrolled
            ? "header-elevated border-border"
            : "border-border/70"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
          <Link href="/" className="group flex min-w-0 flex-col py-1" onClick={closeMobileNav}>
            <span className="text-base font-bold tracking-tight text-primary transition-colors group-hover:text-accent sm:text-lg">
              {site.name}
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-muted sm:block">
              Pollution control · Odor abatement
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {nav.map((item) =>
              "children" in item && item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    className={`min-h-11 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(pathname, item.href)
                        ? "bg-accent-soft text-accent"
                        : "text-foreground/80 hover:bg-surface-muted hover:text-primary"
                    }`}
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="menu"
                  >
                    {item.label}
                  </button>
                  {openMenu === item.label ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-full z-50 min-w-56 rounded-md border border-border bg-card py-2 shadow-lg"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="mx-1 block rounded-md px-3 py-2.5 text-sm text-foreground/80 hover:bg-accent-soft hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(pathname, item.href)
                      ? "bg-accent-soft text-accent"
                      : "text-foreground/80 hover:bg-surface-muted hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <ThemeToggle className="ml-1" />
            <Link
              href={primaryCta.href}
              className="ml-1 inline-flex min-h-11 items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-on-brand shadow-sm hover:bg-brand-hover"
            >
              {primaryCta.label}
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <a
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-3 text-sm font-semibold text-primary"
            >
              Call
            </a>
            <label htmlFor={TOGGLE_ID} className="mobile-nav-button">
              <span className="mobile-nav-label-open">Menu</span>
              <span className="mobile-nav-label-close">Close</span>
            </label>
          </div>
        </div>
      </header>

      {/*
        Do NOT use the inert attribute here.
        React re-renders were re-applying inert while the menu was open, which
        blocked every link inside the drawer on mobile.
      */}
      <div
        className={`mobile-nav-layer${mobileOpen ? " is-open" : ""}`}
        id="molitron-mobile-nav-panel"
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobileNav}
        />
        <nav className="mobile-nav-panel" aria-label="Mobile">
          <div className="mobile-nav-panel-inner">
            {nav.map((item) => (
              <div key={item.label} className="mobile-nav-group">
                {"children" in item && item.children ? (
                  <>
                    <p className="mobile-nav-group-label">{item.label}</p>
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="mobile-nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          goMobile(child.href);
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      goMobile(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a
              href={primaryCta.href}
              className="mobile-nav-cta"
              onClick={(e) => {
                e.preventDefault();
                goMobile(primaryCta.href);
              }}
            >
              {primaryCta.label}
            </a>
            <a href={site.phoneHref} className="mobile-nav-phone" onClick={closeMobileNav}>
              Call {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
