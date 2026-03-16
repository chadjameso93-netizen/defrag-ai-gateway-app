type Person = { id: string; label: string; x: number; y: number };
type Link = { from: string; to: string; state: "warm" | "cool" | "faded" };

export default function SystemMap({
  people,
  links
}: {
  people: Person[];
  links: Link[];
}) {
  const index = Object.fromEntries(people.map((p) => [p.id, p]));
  return (
    <div className="map">
      {links.map((link, i) => {
        const a = index[link.from];
        const b = index[link.to];
        const x1 = a.x + 55;
        const y1 = a.y + 55;
        const x2 = b.x + 55;
        const y2 = b.y + 55;
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        return (
          <div
            key={i}
            className={`line ${link.state}`}
            style={{ left: x1, top: y1, width: length, transform: `rotate(${angle}deg)` }}
          />
        );
      })}
      {people.map((person) => (
        <div key={person.id} className="person" style={{ left: person.x, top: person.y }}>
          {person.label}
        </div>
      ))}
    </div>
  );
}
