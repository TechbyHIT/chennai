"use client";

import { submitContactAction, type ActionState } from "@/app/actions/contact";
import { PROPERTY_TYPES } from "@/data/property-types";
import { useActionState } from "react";

const initialState: ActionState = { ok: false, message: "" };

export type QuoteFormOption = { id: string; name: string };

export function QuoteForm({
  services,
  locations,
}: {
  services: QuoteFormOption[];
  locations: QuoteFormOption[];
}) {
  const [state, action, pending] = useActionState(submitContactAction, initialState);

  return (
    <form
      action={action}
      className="space-y-4 rounded-[1.5rem] border border-brand-100 bg-white/90 p-5 shadow-soft sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required error={state.errors?.name?.[0]} />
        <Field label="Phone" name="phone" required error={state.errors?.phone?.[0]} />
        <Field label="WhatsApp" name="whatsapp" error={state.errors?.whatsapp?.[0]} />
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="service">
            Service
          </label>
          <select
            id="service"
            name="service"
            required
            className="min-h-11 w-full rounded-xl border border-brand-200 bg-white px-3"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="city">
            City (Tamil Nadu)
          </label>
          <select
            id="city"
            name="city"
            required
            className="min-h-11 w-full rounded-xl border border-brand-200 bg-white px-3"
            defaultValue=""
          >
            <option value="" disabled>
              Select a city
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <Field label="Area" name="area" error={state.errors?.area?.[0]} />
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold" htmlFor="propertyType">
            Property type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            className="min-h-11 w-full rounded-xl border border-brand-200 bg-white px-3"
            defaultValue=""
          >
            <option value="">Select if known</option>
            {PROPERTY_TYPES.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-xl border border-brand-200 bg-white px-3 py-3"
          />
          {state.errors?.message?.[0] ? (
            <p className="mt-1 text-sm text-cta-700">{state.errors.message[0]}</p>
          ) : null}
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input type="checkbox" name="consent" className="mt-1" required />
        <span>I agree to be contacted about my enquiry.</span>
      </label>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-800 px-5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Submit enquiry"}
      </button>

      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-brand-700" : "text-cta-700"}`} role="status">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        className="min-h-11 w-full rounded-xl border border-brand-200 bg-white px-3"
      />
      {error ? <p className="mt-1 text-sm text-cta-700">{error}</p> : null}
    </div>
  );
}
