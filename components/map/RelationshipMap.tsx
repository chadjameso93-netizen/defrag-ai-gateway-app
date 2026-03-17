"use client";

type MapNode = {
  id: string;
  label: string;
  role: string;
  complete: boolean;
  x: number;
  y: number;
};

type MapEdge = {
  from: string;
  to: string;
  state: "calm" | "tension" | "distance" | "activation" | "triangulation";
  motion: "none" | "pulse" | "jitter" | "fade";
};

export default function RelationshipMap({
  nodes,
  edges
}: {
  nodes: MapNode[];
  edges: MapEdge[];
}) {
  function nodeById(id: string) {
    return nodes.find((n) => n.id === id);
  }

  return (
    <div className="map" style={{ minHeight: 440, overflow: "hidden" }}>
      {edges.map((edge, i) => {
        const from = nodeById(edge.from);
        const to = nodeById(edge.to);
        if (!from || !to) return null;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return (
          <div
            key={i}
            className={`line ${
              edge.state === "activation"
                ? "warm"
                : edge.state === "tension"
                ? "cool"
                : edge.state === "distance"
                ? "faded"
                : edge.state === "triangulation"
                ? "warm"
                : "cool"
            }`}
            style={{
              left: from.x + 62,
              top: from.y + 62,
              width: length,
              transform: `rotate(${angle}deg)`,
              opacity: edge.motion === "fade" ? 0.38 : 0.9
            }}
          />
        );
      })}

      {nodes.map((node) => (
        <div
          key={node.id}
          className="person"
          style={{
            left: node.x,
            top: node.y,
            opacity: node.complete ? 1 : 0.72,
            boxShadow: node.complete
              ? "0 10px 30px rgba(255,255,255,0.08)"
              : "0 10px 30px rgba(255,255,255,0.03)"
          }}
        >
          <div>
            <div>{node.label}</div>
            <div style={{ fontSize: 11, marginTop: 6, color: "rgba(255,255,255,.65)" }}>
              {node.complete ? node.role : `${node.role} · incomplete`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
