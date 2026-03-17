"use client";

type Person = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type Link = {
  from: string;
  to: string;
  state: "warm" | "cool" | "faded";
};

export default function SystemMap({
  people = [],
  links = []
}: {
  people?: Person[];
  links?: Link[];
}) {
  return (
    <div className="map">
      {links.map((l, i) => {
        const from = people.find((p) => p.id === l.from);
        const to = people.find((p) => p.id === l.to);
        if (!from || !to) return null;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return (
          <div
            key={i}
            className={`line ${l.state}`}
            style={{
              left: from.x,
              top: from.y,
              width: length,
              transform: `rotate(${angle}deg)`
            }}
          />
        );
      })}

      {people.map((p) => (
        <div
          key={p.id}
          className="person"
          style={{
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div>{p.label}</div>
        </div>
      ))}
    </div>
  );
}
