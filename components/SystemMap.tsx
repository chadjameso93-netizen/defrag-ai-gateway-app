"use client";

export default function SystemMap({ people = [], links = [] }: any) {
  return (
    <div className="map">
      {links.map((l: any, i: number) => {
        const from = people.find((p: any) => p.id === l.from);
        const to = people.find((p: any) => p.id === l.to);
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

      {people.map((p: any) => (
        <div
          key={p.id}
          className="person"
          style={{
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)"
          }}
        >
          <div>
            <div>{p.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
