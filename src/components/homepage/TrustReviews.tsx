/**
 * Honest trust section — no fabricated star ratings or AggregateRating schema.
 * Verified customer reviews will replace this once available.
 */
export function TrustReviews() {
  return (
    <div className="premium-card grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
          Customer voice
        </p>
        <h3 className="font-display text-3xl text-brand-900">Reviews publish when verified</h3>
        <p className="leading-7 text-ink-500">
          We do not invent Google-style star ratings or install counts. When customers share
          permissioned feedback, we will display it here with honest schema markup.
        </p>
      </div>
      <div className="rounded-2xl border border-dashed border-brand-100 bg-brand-50 p-5">
        <p className="font-semibold text-brand-900">What we share today</p>
        <ul className="mt-3 space-y-2 text-sm text-ink-500">
          <li>✓ Real installation photography</li>
          <li>✓ Clear measurement-led process</li>
          <li>✓ Tamil Nadu cities we can actually serve</li>
          <li>✓ No AggregateRating until reviews exist</li>
        </ul>
      </div>
    </div>
  );
}
