"use server";

import { contactSchema } from "@/lib/validation/contact";
import { rateLimit } from "@/lib/security/rate-limit";

export type ActionState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const limited = rateLimit("contact-form");
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again shortly." };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    service: String(formData.get("service") ?? ""),
    city: String(formData.get("city") ?? ""),
    area: String(formData.get("area") ?? ""),
    propertyType: String(formData.get("propertyType") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") === "on" ? "on" : "",
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { ok: true, message: "Thank you. We will contact you soon." };
  }

  // File-based architecture: persist later via webhook/email provider if configured.
  if (process.env.CONTACT_WEBHOOK_URL) {
    await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        source: "website-contact",
        createdAt: new Date().toISOString(),
      }),
    }).catch(() => undefined);
  }

  return {
    ok: true,
    message: "Thank you. Your enquiry was received. We will contact you soon.",
  };
}
