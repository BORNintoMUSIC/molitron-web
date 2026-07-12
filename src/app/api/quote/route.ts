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
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
          ([k, v]) =>
            `<tr><td style="font-weight:600;vertical-align:top;border-bottom:1px solid #e2e8f0">${k}</td><td style="border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${String(v)
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</td></tr>`,
        )
        .join("")}
    </table>
  `;
}

export async function POST(request: Request) {
  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || "";
  const cityState = body.cityState?.trim() || "";

  if (!name || !email || !phone || !cityState) {
    return NextResponse.json(
      { ok: false, error: "Name, email, phone, and city/state are required." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email." }, { status: 400 });
  }

  const payload = {
    ...body,
    name,
    email,
    phone,
    cityState,
    company: body.company?.trim() || "",
    cfm: body.cfm?.trim() || "",
    cookingEquipment: body.cookingEquipment?.trim() || "",
    message: body.message?.trim() || "",
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || site.email;
  const from = process.env.QUOTE_FROM_EMAIL || "Molitron Website <onboarding@resend.dev>";

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Quote request: ${name}${payload.company ? ` (${payload.company})` : ""} — ${cityState}`,
        html: buildEmailHtml(payload),
      }),
    });

    if (!res.ok) {
      // Avoid logging full payloads in production (privacy / Best Practices)
      if (process.env.NODE_ENV !== "production") {
        console.error("Resend error:", await res.text());
      }
      return NextResponse.json(
        { ok: false, error: "Email delivery failed. Please call or email us directly." },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV !== "production") {
    // Dev only — keeps form testable without Resend
    console.info("[quote-request]", {
      name: payload.name,
      email: payload.email,
      cityState: payload.cityState,
    });
  }

  return NextResponse.json({
    ok: true,
    delivered: Boolean(apiKey),
  });
}
