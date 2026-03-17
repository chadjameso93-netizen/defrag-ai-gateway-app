export type MapNode = {
  id: string;
  label: string;
  role: string;
  complete: boolean;
  x: number;
  y: number;
};

export type MapEdge = {
  from: string;
  to: string;
  state: "calm" | "tension" | "distance" | "activation" | "triangulation";
  motion: "none" | "pulse" | "jitter" | "fade";
};

export function buildRelationshipMap(input: {
  relationshipLabel: string;
  participants: any[];
  liveState: "calm" | "tension" | "distance" | "activation" | "triangulation";
}) {
  const baseNodes: MapNode[] = [];
  const participants = input.participants || [];

  participants.forEach((p, index) => {
    const complete = Boolean(p.birth_date && p.birth_place);
    baseNodes.push({
      id: p.id,
      label: p.display_name || p.role || "Participant",
      role: p.role || "participant",
      complete,
      x: 120 + (index % 3) * 180,
      y: 120 + Math.floor(index / 3) * 180
    });
  });

  const edges: MapEdge[] = [];

  for (let i = 0; i < baseNodes.length - 1; i++) {
    edges.push({
      from: baseNodes[i].id,
      to: baseNodes[i + 1].id,
      state: input.liveState,
      motion:
        input.liveState === "activation"
          ? "jitter"
          : input.liveState === "tension"
          ? "pulse"
          : input.liveState === "distance"
          ? "fade"
          : input.liveState === "triangulation"
          ? "jitter"
          : "none"
    });
  }

  return {
    title: input.relationshipLabel,
    state: input.liveState,
    nodes: baseNodes,
    edges
  };
}
