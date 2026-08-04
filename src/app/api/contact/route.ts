import { contactSchema } from "@/lib/validation/contact";
import { rateLimit } from "@/lib/security/rate-limit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const limited = rateLimit("api-contact");
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Validation failed.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Thank you." });
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        source: "api-contact",
        createdAt: new Date().toISOString(),
      }),
    }).catch(() => undefined);
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your enquiry was received. We will contact you soon.",
  });
}
