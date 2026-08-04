const ROWS = [
  {
    name: "Invisible grills",
    view: "Open sightlines",
    bestFor: "Balcony & window fall protection",
    note: "Cable spacing planned to household needs",
  },
  {
    name: "Safety nets",
    view: "Mesh coverage",
    bestFor: "Balcony, kids, pet and building edges",
    note: "Nylon/HDPE options after site discussion",
  },
  {
    name: "Bird / monkey nets",
    view: "Exclusion mesh",
    bestFor: "Pigeon roosting & primate intrusion",
    note: "Different strength/use than child fall nets",
  },
  {
    name: "Mosquito nets",
    view: "Fine insect mesh",
    bestFor: "Windows & ventilators",
    note: "Not a substitute for fall protection",
  },
];

export function MaterialsCompare() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-brand-200 text-ink-500">
            <th className="py-3 pr-4 font-semibold">Option</th>
            <th className="py-3 pr-4 font-semibold">Look</th>
            <th className="py-3 pr-4 font-semibold">Best for</th>
            <th className="py-3 font-semibold">Note</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.name} className="border-b border-brand-100/80">
              <td className="py-4 pr-4 font-display text-lg text-brand-900">{row.name}</td>
              <td className="py-4 pr-4 text-ink-700">{row.view}</td>
              <td className="py-4 pr-4 text-ink-700">{row.bestFor}</td>
              <td className="py-4 text-ink-700">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
