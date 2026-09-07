"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { site } from "@/lib/site";

const initial = {
  company: "",
  name: "",
  email: "",
  phone: "",
  cityState: "",
  contactGoal: "quote",
  projectType: "",
  vertical: "",
  productInterest: "not-sure",
  installType: "unknown",
  cfm: "",
  cookingEquipment: "",
  odorControl: "unsure",
  message: "",
  website: "",
};
type FormState = typeof initial;
const field =
  "mt-2 w-full min-h-12 rounded-[3px] border border-border bg-card px-3 py-2.5 text-base text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const label = "block text-sm font-medium text-foreground";

export function QuoteForm({
  initialProduct = "not-sure",
  initialGoal = "quote",
}: {
  initialProduct?: string;
  initialGoal?: string;
}) {
  const [form, setForm] = useState({
    ...initial,
    productInterest: initialProduct,
    contactGoal: initialGoal,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "preview" | "error"
  >("idle");
  const [error, setError] = useState("");
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (["success", "preview", "error"].includes(status))
      feedbackRef.current?.focus();
  }, [status]);
  function update(key: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        error?: string;
      };
      if (!response.ok || !data.ok)
        throw new Error(
          data.error ||
            "We couldn’t send your request. Please call or email Molitron.",
        );
      setStatus(data.delivered === true ? "success" : "preview");
      if (data.delivered === true)
        setForm({
          ...initial,
          productInterest: initialProduct,
          contactGoal: initialGoal,
        });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "We couldn’t send your request. Please try again, or call or email Molitron.",
      );
    }
  }
  if (status === "success" || status === "preview")
    return (
      <div
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        className="border border-accent/30 bg-accent-soft p-6"
      >
        <h3 className="text-xl font-medium">
          {status === "success"
            ? "Your request has been received."
            : "Preview validation complete."}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {status === "success"
            ? "Molitron will review your details and follow up at the email you provided."
            : "This local preview validated the form. No request was sent."}
        </p>
        <p className="mt-3 text-sm">
          You can reach Molitron at{" "}
          <a href={site.phoneHref} className="underline">
            {site.phone}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          {status === "success" ? "Start another request" : "Return to form"}
        </Button>
      </div>
    );

  function textInput(
    key: keyof FormState,
    title: string,
    options: {
      required?: boolean;
      type?: string;
      autoComplete?: string;
      placeholder?: string;
      maxLength: number;
    },
  ) {
    return (
      <div key={key}>
        <label className={label} htmlFor={key}>
          {title}
          {options.required ? " *" : ""}
        </label>
        <input
          id={key}
          name={key}
          className={field}
          value={form[key]}
          onChange={(event) => update(key, event.target.value)}
          {...options}
        />
      </div>
    );
  }
  function selectInput(
    key: keyof FormState,
    title: string,
    options: [string, string][],
  ) {
    return (
      <div>
        <label className={label} htmlFor={key}>
          {title}
        </label>
        <select
          id={key}
          name={key}
          className={field}
          value={form[key]}
          onChange={(event) => update(key, event.target.value)}
        >
          {options.map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8"
      aria-busy={status === "loading"}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      <fieldset>
        <legend>01 / Your inquiry</legend>
        <div className="grid gap-5 md:grid-cols-2">
          {selectInput("contactGoal", "Inquiry type", [
            ["quote", "A project quote"],
            ["engineering-conversation", "Application guidance"],
            ["service", "Service or parts"],
          ])}
          {selectInput("productInterest", "Which equipment?", [
            ["not-sure", "Help me choose"],
            ["moas", "MOAS · Odor abatement"],
            ["epfa", "EPFA · Dry filtration"],
            ["both", "Both MOAS + EPFA"],
          ])}
        </div>
      </fieldset>
      <fieldset>
        <legend>02 / Contact details</legend>
        <div className="grid gap-5 md:grid-cols-2">
          {textInput("name", "Your name", {
            required: true,
            autoComplete: "name",
            maxLength: 120,
          })}
          {textInput("company", "Company", {
            autoComplete: "organization",
            maxLength: 160,
          })}
          {textInput("email", "Email", {
            required: true,
            type: "email",
            autoComplete: "email",
            maxLength: 254,
          })}
          {textInput("phone", "Phone", {
            required: true,
            type: "tel",
            autoComplete: "tel",
            maxLength: 60,
          })}
          {textInput("cityState", "Project or facility city / state", {
            required: true,
            placeholder: "e.g. Denver, CO",
            maxLength: 160,
          })}
        </div>
      </fieldset>
      <div>
        <label className={label} htmlFor="message">
          {form.contactGoal === "service"
            ? "Equipment or service notes"
            : "Tell us about the project"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={5000}
          className={field}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={
            form.contactGoal === "service"
              ? "Model, serial number, installation year, and the issue or part needed."
              : "What are you planning, and what would you like help with?"
          }
        />
      </div>
      {form.contactGoal !== "service" && (
        <details>
          <summary>
            Add technical details{" "}
            <span className="text-sm font-normal text-muted">· optional</span>
          </summary>
          <div className="grid gap-5 md:grid-cols-2">
            {textInput("cfm", "Airflow (CFM, if known)", {
              placeholder: "Cubic feet per minute",
              maxLength: 60,
            })}
            {selectInput("projectType", "Project type", [
              ["", "Not sure yet"],
              ["new-build", "New build"],
              ["remodel", "Remodel"],
              ["airport-hotel", "Airport / hotel project"],
              ["other", "Other"],
            ])}
            {selectInput("vertical", "Facility type", [
              ["", "Not sure yet"],
              ["restaurant", "Restaurant / foodservice"],
              ["airport", "Airport"],
              ["hotel", "Hotel / hospitality"],
              ["cannabis", "Cannabis"],
              ["industrial-specialty", "Industrial / specialty"],
              ["other", "Other"],
            ])}
            {selectInput("installType", "Install location", [
              ["unknown", "Not sure yet"],
              ["rooftop", "Rooftop"],
              ["indoor", "Indoor"],
              ["sidewall", "Sidewall / constrained discharge"],
            ])}
            {selectInput("odorControl", "Additional odor control needed?", [
              ["unsure", "Not sure yet"],
              ["yes", "Yes"],
              ["no", "No"],
            ])}
          </div>
          <div className="mt-5">
            <label className={label} htmlFor="cookingEquipment">
              Cooking equipment
            </label>
            <textarea
              id="cookingEquipment"
              name="cookingEquipment"
              rows={3}
              maxLength={3000}
              className={field}
              value={form.cookingEquipment}
              onChange={(event) =>
                update("cookingEquipment", event.target.value)
              }
              placeholder="Hoods, grills, fryers, woks, and other equipment."
            />
          </div>
        </details>
      )}
      {status === "error" && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="alert"
          className="border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800"
        >
          {error} You can also email{" "}
          <a className="underline" href={"mailto:" + site.email}>
            {site.email}
          </a>
          .
        </div>
      )}
      <div className="flex flex-col gap-5">
        <p className="text-xs leading-relaxed text-muted">
          * Required. Your details are used to review the inquiry and respond to
          you.
        </p>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="sm:self-start"
        >
          {status === "loading" ? "Sending…" : "Send your request"}
        </Button>
      </div>
    </form>
  );
}
