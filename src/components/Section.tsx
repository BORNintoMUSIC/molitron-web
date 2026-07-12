import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "white" | "dark" | "accent";
  narrow?: boolean;
  /** Skip scroll reveal (heroes already animate) */
  noReveal?: boolean;
};

const tones = {
  default: "bg-transparent",
  white: "bg-card/90 section-glow",
  dark: "brand-band",
  accent: "bg-accent-soft/90 section-glow",
};

export function Section({
  children,
  className = "",
  id,
  tone = "default",
  narrow = false,
  noReveal = false,
}: SectionProps) {
  const inner = (
    <div
      className={`mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 ${
        narrow ? "max-w-3xl" : "max-w-7xl"
      }`}
    >
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={`py-14 sm:py-16 md:py-20 lg:py-24 ${tones[tone]} ${className}`}
    >
      {noReveal ? inner : <Reveal>{inner}</Reveal>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      {eyebrow ? (
        <p
          className={`mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${
            light ? "text-on-brand-muted" : "text-accent"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 ${light ? "bg-on-brand-muted" : "bg-accent"}`}
            aria-hidden
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-2xl font-bold tracking-[-0.025em] break-words sm:text-3xl md:text-4xl ${
          light ? "text-on-brand" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-base leading-relaxed sm:text-lg ${
            light ? "text-on-brand-muted" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
