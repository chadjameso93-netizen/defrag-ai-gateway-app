"use client";

const items = [
  {
    title: "Live relational state",
    copy: "See tension, distance, activation, and system pressure through a living relational model."
  },
  {
    title: "Daily guidance",
    copy: "Morning and evening reads synthesize profile, events, and timing into usable signal."
  },
  {
    title: "Relationship workspace",
    copy: "Participants, invites, event history, and dynamic mapping converge in one operational view."
  }
];

export default function PremiumFeatureRail() {
  return (
    <div className="grid" style={{ gap: 14 }}>
      {items.map((item) => (
        <div key={item.title} className="message-box" style={{ padding: 18 }}>
          <div className="result-title">{item.title}</div>
          <div className="result-copy">{item.copy}</div>
        </div>
      ))}
    </div>
  );
}
