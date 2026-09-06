import { Button } from "./Button";
import { Arrow } from "./home/Arrow";
import { site } from "@/lib/site";
export function CtaBand({
  title = "Let’s review your project.",
  description = "Share your location, cooking equipment and exhaust plans.",
  href = "/contact",
  label = "Discuss your project",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="cta-band">
      <div className="safe-inline mx-auto max-w-7xl">
        <div className="cta-inner">
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-actions">
            <Button href={href}>
              {label} <Arrow diagonal />
            </Button>
            <a href={site.phoneHref}>Or call {site.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
