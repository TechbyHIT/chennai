import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid WhatsApp number")
    .optional()
    .or(z.literal("")),
  service: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(80),
  area: z.string().trim().max(80).optional().or(z.literal("")),
  propertyType: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
