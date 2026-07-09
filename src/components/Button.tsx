import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "btn-sheen bg-primary text-white hover:bg-primary-hover shadow-sm border border-primary hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "bg-white/90 text-primary border border-border hover:border-accent hover:text-accent hover:bg-accent-soft/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm",
  ghost: "bg-transparent text-primary hover:bg-accent-soft border border-transparent",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string; type?: never };

export function Button({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg",
    "px-5 py-2.5 text-sm font-semibold tracking-wide",
    "text-center whitespace-normal",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm",
    "active:translate-y-0 active:scale-[0.98]",
    "w-full sm:w-auto",
    variants[variant],
    className,
  ].join(" ");

  if (href) {
    if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
