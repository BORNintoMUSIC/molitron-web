"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

function isAlreadyVisible(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  // Any overlap with the viewport counts as visible
  return rect.top < vh && rect.bottom > 0;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse =
      window.matchMedia("(max-width: 1023px)").matches ||
      window.matchMedia("(hover: none)").matches;

    // Mobile / reduced motion: keep content fully visible (no hide-then-reveal)
    if (reduced || isCoarse) return;

    // Desktop only: hide briefly, then reveal on scroll
    el.classList.toggle("reveal-in", isAlreadyVisible(el));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("reveal-in");
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove("reveal-in");
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // Safety net: never leave content invisible
    const fallback = window.setTimeout(() => el.classList.add("reveal-in"), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-in ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
