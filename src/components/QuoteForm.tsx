"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

const initial = {
  company: "",
  name: "",
  email: "",
  phone: "",
  cityState: "",
  projectType: "new-build",
  vertical: "restaurant",
  productInterest: "not-sure",
  installType: "rooftop",
  cfm: "",
  cookingEquipment: "",
  odorControl: "yes",
  message: "",
};

export function QuoteForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update(field: keyof typeof initial, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please call or email us.");
      }
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent-soft p-6">
        <h3 className="text-lg font-semibold text-primary">Quote request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Thanks—we’ll review your project details and follow up at the email you provided.
          For time-sensitive jobs, call{" "}
          <a className="font-semibold text-accent" href="tel:+13039698888">
            303-969-8888
          </a>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  const field =
    "mt-1 w-full min-h-11 rounded-md border border-border bg-card px-3 py-2.5 text-base text-foreground shadow-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
  const label = "block text-sm font-medium text-foreground";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            className={field}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className={label} htmlFor="name">
            Your name *
          </label>
          <input
            id="name"
            required
            className={field}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            className={field}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            required
            className={field}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>
        <div>
          <label className={label} htmlFor="cityState">
            City / State *
          </label>
          <input
            id="cityState"
            required
            className={field}
            placeholder="e.g. Denver, CO"
            value={form.cityState}
            onChange={(e) => update("cityState", e.target.value)}
          />
        </div>
        <div>
          <label className={label} htmlFor="cfm">
            CFM (if known)
          </label>
          <input
            id="cfm"
            className={field}
            placeholder="Cubic feet per minute"
            value={form.cfm}
            onChange={(e) => update("cfm", e.target.value)}
          />
        </div>
        <div>
          <label className={label} htmlFor="projectType">
            Project type
          </label>
          <select
            id="projectType"
            className={field}
            value={form.projectType}
            onChange={(e) => update("projectType", e.target.value)}
          >
            <option value="new-build">New build</option>
            <option value="remodel">Remodel</option>
            <option value="airport-hotel">Airport / hotel project</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="vertical">
            Business type
          </label>
          <select
            id="vertical"
            className={field}
            value={form.vertical}
            onChange={(e) => update("vertical", e.target.value)}
          >
            <option value="restaurant">Restaurant / foodservice</option>
            <option value="airport">Airport</option>
            <option value="hotel">Hotel / hospitality</option>
            <option value="cannabis">Cannabis</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="productInterest">
            Product interest
          </label>
          <select
            id="productInterest"
            className={field}
            value={form.productInterest}
            onChange={(e) => update("productInterest", e.target.value)}
          >
            <option value="moas">MOAS (odor abatement)</option>
            <option value="epfa">EPFA (filter assembly)</option>
            <option value="both">Both MOAS + EPFA</option>
            <option value="not-sure">Not sure — need recommendation</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="installType">
            Install location
          </label>
          <select
            id="installType"
            className={field}
            value={form.installType}
            onChange={(e) => update("installType", e.target.value)}
          >
            <option value="rooftop">Rooftop</option>
            <option value="indoor">Indoor</option>
            <option value="sidewall">Sidewall / constrained discharge</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="odorControl">
            Additional odor control needed?
          </label>
          <select
            id="odorControl"
            className={field}
            value={form.odorControl}
            onChange={(e) => update("odorControl", e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="cookingEquipment">
          List of cooking equipment
        </label>
        <textarea
          id="cookingEquipment"
          rows={3}
          className={field}
          placeholder="Hoods, grills, fryers, woks, etc."
          value={form.cookingEquipment}
          onChange={(e) => update("cookingEquipment", e.target.value)}
        />
      </div>

      <div>
        <label className={label} htmlFor="message">
          Project notes
        </label>
        <textarea
          id="message"
          rows={4}
          className={field}
          placeholder="Timeline, code concerns, discharge constraints, etc."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {status === "error" ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}{" "}
          You can also email{" "}
          <a className="font-semibold underline" href="mailto:scott@molitron.com">
            scott@molitron.com
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="order-2 text-xs text-muted sm:order-1">
          * Required. We sell direct. Typical project cycles: 1–6 months.
        </p>
        <Button type="submit" disabled={status === "loading"} className="order-1 w-full sm:order-2 sm:w-auto">
          {status === "loading" ? "Sending…" : "Submit quote request"}
        </Button>
      </div>
    </form>
  );
}
