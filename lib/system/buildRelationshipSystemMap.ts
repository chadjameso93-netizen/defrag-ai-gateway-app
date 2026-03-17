type LiveState = "calm" | "tension" | "distance" | "activation" | "triangulation";

function edgeStateFromLiveState(state: LiveState) {
  if (state === "activation") return "warm";
  if (state === "tension") return "warm";
  if (state === "distance") return "faded";
  if (state === "triangulation") return "cool";
  return "cool";
}

export function buildRelationshipSystemMap(input: {
  relationshipLabel?: string;
  participants: any[];
  liveState: LiveState;
  includePressureNode?: boolean;
}) {
  const participants = input.participants || [];
  const state = input.liveState;
  const nodes: any[] = [];
  const links: any[] = [];

  const centerX = 260;
  const centerY = 190;
  const radius = participants.length <= 2 ? 120 : 150;

  participants.forEach((participant, index) => {
    const angle =
      participants.length === 1
        ? 0
        : (Math.PI * 2 * index) / participants.length - Math.PI / 2;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    nodes.push({
      id: participant.id,
      label: participant.display_name || participant.role || "Participant",
      x,
      y
    });
  });

  for (let i = 0; i < nodes.length - 1; i++) {
    links.push({
      from: nodes[i].id,
      to: nodes[i + 1].id,
      state: edgeStateFromLiveState(state)
    });
  }

  if (nodes.length > 2) {
    links.push({
      from: nodes[0].id,
      to: nodes[nodes.length - 1].id,
      state: state === "triangulation" ? "warm" : edgeStateFromLiveState(state)
    });
  }

  if (input.includePressureNode !== false) {
    nodes.push({
      id: "external-pressure",
      label: "Pressure",
      x: centerX,
      y: 70
    });

    if (nodes[0]) {
      links.push({
        from: nodes[0].id,
        to: "external-pressure",
        state: state === "activation" || state === "tension" ? "warm" : "cool"
      });
    }
  }

  return {
    title: input.relationshipLabel || "Relationship",
    people: nodes,
    links
  };
}
