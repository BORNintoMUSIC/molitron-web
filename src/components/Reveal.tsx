"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  // Start visible to avoid blank content if JS/observer is delayed or fails
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse =
      window.matchMedia("(max-width: 1023px)").matches ||
      window.matchMedia("(hover: none)").matches;

    // Mobile / reduced motion: keep content fully visible (no hide-then-reveal)
    if (reduced || isCoarse) {
      setVisible(true);
      return;
    }

    // Desktop only: hide briefly, then reveal on scroll
    setVisible(isAlreadyVisible(el));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // Safety net: never leave content invisible
    const fallback = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
