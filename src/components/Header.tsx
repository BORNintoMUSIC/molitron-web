"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { nav, primaryCta, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  function closeMobileNav(returnFocus = false) {
    setMobileOpen(false);
    if (returnFocus) window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileOpen);
    const background = [
      ...document.querySelectorAll<HTMLElement>("header, main, footer"),
    ];
    background.forEach((element) => {
      element.inert = mobileOpen;
    });
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onResize);
    if (mobileOpen) window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (!mobileOpen) return;
      if (event.key === "Escape") {
        closeMobileNav(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("nav-open");
      background.forEach((element) => {
        element.inert = false;
      });
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    function onOutsidePointer(event: PointerEvent) {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest("[data-nav-menu]")
      )
        setOpenMenu(null);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onOutsidePointer);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onOutsidePointer);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[100] border-b bg-card/95 backdrop-blur-md transition-[box-shadow,border-color] duration-200 ${
          scrolled ? "header-elevated border-border" : "border-border/70"
        }`}
      >
        <div className="safe-inline mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
          <Logo href="/" onClick={() => closeMobileNav()} />

          <nav
            className="hidden min-w-0 flex-1 items-center justify-end gap-1 xl:flex"
            aria-label="Primary"
          >
            {nav.map((item) =>
              "children" in item && item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  data-nav-menu
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenMenu(null);
                      event.currentTarget.querySelector("button")?.focus();
                    }
                  }}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(event.relatedTarget as Node)
                    )
                      setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className={`inline-flex min-h-11 items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive(pathname, item.href)
                        ? "bg-accent-soft text-accent"
                        : "text-foreground/75 hover:bg-surface-muted hover:text-primary"
                    }`}
                    aria-expanded={openMenu === item.label}
                    aria-controls={`desktop-nav-${item.label.toLowerCase()}`}
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <span aria-hidden className="text-[10px]">
                      ▾
                    </span>
                  </button>
                  {openMenu === item.label ? (
                    <div
                      id={`desktop-nav-${item.label.toLowerCase()}`}
                      className="absolute left-0 top-full z-50 min-w-60 rounded-md border border-border bg-card p-2 shadow-xl"
                    >
                      <Link
                        href={item.href}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        className="block rounded-md px-3 py-2.5 text-sm font-semibold text-primary hover:bg-accent-soft"
                        onClick={() => setOpenMenu(null)}
                      >
                        View all {item.label.toLowerCase()}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={
                            pathname === child.href ? "page" : undefined
                          }
                          className="block rounded-md px-3 py-2.5 text-sm text-foreground/75 hover:bg-accent-soft hover:text-primary"
                          onClick={() => setOpenMenu(null)}
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
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive(pathname, item.href)
                      ? "bg-accent-soft text-accent"
                      : "text-foreground/75 hover:bg-surface-muted hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href={primaryCta.href}
              className="ml-2 inline-flex min-h-11 shrink-0 items-center rounded-md bg-brand px-5 py-2 text-sm font-bold text-on-brand shadow-sm hover:bg-brand-hover"
            >
              {primaryCta.label}
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-3 text-sm font-bold text-primary"
            >
              Call
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-bold text-primary"
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[200] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-slate-950/55"
            tabIndex={-1}
            aria-label="Close navigation"
            onClick={() => closeMobileNav(true)}
          />
          <nav
            id="mobile-navigation"
            ref={panelRef}
            className="absolute inset-y-0 right-0 flex w-[min(23rem,92vw)] flex-col overflow-y-auto bg-card pb-[env(safe-area-inset-bottom)] shadow-2xl"
            aria-label="Mobile"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo href="/" onClick={() => closeMobileNav()} />
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-primary hover:bg-accent-soft"
                aria-label="Close menu"
                onClick={() => closeMobileNav(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-5 py-5">
              {nav.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-border py-3 last:border-0"
                >
                  {"children" in item && item.children ? (
                    <>
                      <Link
                        href={item.href}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        className="flex min-h-11 items-center text-base font-bold text-primary"
                        onClick={() => closeMobileNav()}
                      >
                        {item.label}
                      </Link>
                      <div className="grid gap-1 pb-1 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={
                              pathname === child.href ? "page" : undefined
                            }
                            className="flex min-h-11 items-center text-sm font-semibold text-foreground/75"
                            onClick={() => closeMobileNav()}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex min-h-11 items-center text-base font-bold text-primary"
                      onClick={() => closeMobileNav()}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-surface-muted p-5">
              <Link
                href={primaryCta.href}
                className="flex min-h-12 items-center justify-center rounded-md bg-brand px-5 text-base font-bold text-on-brand"
                onClick={() => closeMobileNav()}
              >
                {primaryCta.label}
              </Link>
              <a
                href={site.phoneHref}
                className="mt-2 flex min-h-11 items-center justify-center text-sm font-bold text-accent"
                onClick={() => closeMobileNav()}
              >
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
