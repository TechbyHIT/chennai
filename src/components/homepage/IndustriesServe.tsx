const INDUSTRIES = [
  "Apartments & high-rises",
  "Independent houses",
  "Villas",
  "Balcony-heavy flats",
  "Family homes with children",
  "Pet-friendly residences",
  "Commercial ledges (bird control)",
  "Utility & drying areas",
];

export function IndustriesServe() {
  return (
    <div className="flex flex-wrap gap-3">
      {INDUSTRIES.map((item) => (
        <span
          key={item}
          className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
