import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export function CtaBand({
  title = "Ready to specify or price a project?",
  description = "Tell us about CFM, cooking equipment, location, and discharge type. Molitron sells direct—Scott’s team will follow up with next steps.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="dark" className="!py-10 sm:!py-12 relative overflow-hidden" noReveal={false}>
      <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-56 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight text-white break-words sm:text-2xl md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap lg:shrink-0">
          <Button href="/contact" className="!bg-white !text-primary hover:!bg-slate-100">
            Request a Quote
          </Button>
          <Button
            href="tel:+13039698888"
            variant="secondary"
            className="!border-slate-400 !bg-white/5 !text-white hover:!border-white hover:!bg-white/10"
          >
            Call 303-969-8888
          </Button>
        </div>
      </div>
    </Section>
  );
}
