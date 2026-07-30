import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  onClick?: () => void;
  /** Use the approved light wordmark for dark brand bands. */
  onDark?: boolean;
  className?: string;
  showTagline?: boolean;
};

export function Logo({
  href = "/",
  onClick,
  onDark = false,
  className = "",
  showTagline = false,
}: LogoProps) {
  const tag = onDark ? "text-on-brand-muted" : "text-muted";
  const image = (
    <Image
      src={
        onDark
          ? "/images/brand/molitron-logo-on-dark.svg"
          : "/images/brand/molitron-logo.svg"
      }
      alt=""
      width={195}
      height={36}
      className="h-auto w-[10.5rem] sm:w-[12.2rem]"
      sizes="195px"
    />
  );

  const inner = (
    <>
      {image}
      {showTagline ? (
        <span className={`mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.14em] sm:block ${tag}`}>
          Pollution control · Odor abatement
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <span className={`inline-flex flex-col ${className}`} aria-label="Molitron">
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex min-h-11 min-w-0 flex-col justify-center py-1 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Molitron home"
    >
      {inner}
    </Link>
  );
}
