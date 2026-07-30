import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type QuoteBody = {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  cityState?: string;
  contactGoal?: string;
  projectType?: string;
  vertical?: string;
  productInterest?: string;
  installType?: string;
  cfm?: string;
  cookingEquipment?: string;
  odorControl?: string;
  message?: string;
  website?: string;
};

const fieldLimits = {
  company: 160,
  name: 120,
  email: 254,
  phone: 60,
  cityState: 160,
  contactGoal: 40,
  projectType: 40,
  vertical: 40,
  productInterest: 40,
  installType: 40,
  cfm: 60,
  cookingEquipment: 3000,
  odorControl: 20,
  message: 5000,
  website: 200,
} as const satisfies Record<keyof QuoteBody, number>;

const allowedValues = {
  contactGoal: new Set(["quote", "engineering-conversation", "service"]),
  projectType: new Set(["new-build", "remodel", "airport-hotel", "other"]),
  vertical: new Set(["restaurant", "airport", "hotel", "cannabis", "industrial-specialty", "other"]),
  productInterest: new Set(["moas", "epfa", "both", "not-sure"]),
  installType: new Set(["rooftop", "indoor", "sidewall", "unknown"]),
  odorControl: new Set(["yes", "no", "unsure"]),
} as const;

const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const rateWindowMs = 10 * 60 * 1000;
const rateLimit = 5;

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  if (rateBuckets.size > 1000) {
    for (const [bucketKey, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(bucketKey);
    }
  }

  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + rateWindowMs });
    return true;
  }
  if (current.count >= rateLimit) return false;
  current.count += 1;
  return true;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );
}

function buildEmailHtml(body: Required<Pick<QuoteBody, "name" | "email" | "phone" | "cityState">> & QuoteBody) {
  const rows = [
    ["Name", body.name],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Company", body.company || "—"],
    ["City / State", body.cityState],
    ["Requested help", body.contactGoal || "—"],
    ["Project type", body.projectType || "—"],
    ["Vertical", body.vertical || "—"],
    ["Product interest", body.productInterest || "—"],
    ["Install type", body.installType || "—"],
    ["CFM", body.cfm || "—"],
    ["Odor control", body.odorControl || "—"],
    ["Cooking equipment", body.cookingEquipment || "—"],
    ["Message", body.message || "—"],
  ];

  return `
    <h2>New Molitron quote request</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([key, value]) =>
            `<tr><td style="font-weight:600;vertical-align:top;border-bottom:1px solid #e2e8f0">${escapeHtml(
              String(key),
            )}</td><td style="border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(
              String(value),
            )}</td></tr>`,
        )
        .join("")}
    </table>
  `;
}

function cleanBody(input: Record<string, unknown>) {
  const knownKeys = new Set(Object.keys(fieldLimits));
  const unknownKeys = Object.keys(input).filter((key) => !knownKeys.has(key));
  if (unknownKeys.length) return { error: "Unexpected form fields were submitted." } as const;

  const body: QuoteBody = {};
  for (const [key, limit] of Object.entries(fieldLimits) as [keyof QuoteBody, number][]) {
    const value = input[key];
    if (value === undefined) continue;
    if (typeof value !== "string") return { error: `Invalid value for ${key}.` } as const;
    const trimmed = value.trim();
    if (trimmed.length > limit) return { error: `The ${key} field is too long.` } as const;
    body[key] = trimmed;
  }

  for (const [key, values] of Object.entries(allowedValues) as [
    keyof typeof allowedValues,
    ReadonlySet<string>,
  ][]) {
    const value = body[key];
    if (value && !values.has(value)) return { error: `Invalid value for ${key}.` } as const;
  }

  return { body } as const;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Expected a JSON request." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ ok: false, error: "The request is too large." }, { status: 413 });
  }

  if (!consumeRateLimit(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait before trying again." },
      { status: 429 },
    );
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ ok: false, error: "Invalid form body." }, { status: 400 });
  }

  const cleaned = cleanBody(parsed as Record<string, unknown>);
  if ("error" in cleaned) {
    return NextResponse.json({ ok: false, error: cleaned.error }, { status: 400 });
  }
  const body = cleaned.body;

  if (body.website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const name = body.name || "";
  const email = body.email || "";
  const phone = body.phone || "";
  const cityState = body.cityState || "";

  if (!name || !email || !phone || !cityState) {
    return NextResponse.json(
      { ok: false, error: "Name, email, phone, and city/state are required." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email." }, { status: 400 });
  }

  const payload = { ...body, name, email, phone, cityState };
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || site.email;
  const from = process.env.QUOTE_FROM_EMAIL || "Molitron Website <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote-request-dev]", {
        name: payload.name,
        email: payload.email,
        cityState: payload.cityState,
      });
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Online delivery is not configured. Please call or email Molitron directly.",
      },
      { status: 503 },
    );
  }

  const subjectName = name.replace(/[\r\n]+/g, " ");
  const subjectCompany = payload.company?.replace(/[\r\n]+/g, " ");
  const subjectLocation = cityState.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Quote request: ${subjectName}${
          subjectCompany ? ` (${subjectCompany})` : ""
        } — ${subjectLocation}`,
        html: buildEmailHtml(payload),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Quote email delivery failed with status", response.status);
      }
      return NextResponse.json(
        { ok: false, error: "Email delivery failed. Please call or email Molitron directly." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Email delivery is unavailable. Please call or email Molitron directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
