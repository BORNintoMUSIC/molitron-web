import { Button } from "./Button";
import { Arrow } from "./home/Arrow";
import { site } from "@/lib/site";
export function CtaBand({
  title = "Let’s look at your project.",
  description = "Share the cooking equipment, airflow, and exhaust path. Speak directly with the people who build the equipment.",
  href = "/contact",
}: {
  title?: string;
  description?: string;
  href?: string;
}) {
  return (
    <section className="cta-band">
      <div className="safe-inline mx-auto max-w-7xl">
        <div className="cta-inner">
          <div>
            <p className="eyebrow">A direct conversation</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-actions">
            <Button href={href}>
              Discuss your project <Arrow diagonal />
            </Button>
            <a href={site.phoneHref}>Or call {site.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
