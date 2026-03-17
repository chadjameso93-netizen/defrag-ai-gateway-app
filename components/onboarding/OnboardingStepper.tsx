"use client";

export default function OnboardingStepper({ step }: { step: number }) {
  const steps = [
    "Identity",
    "Birth data",
    "Location",
    "Complete"
  ];

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {steps.map((label, index) => {
        const active = index + 1 === step;
        const done = index + 1 < step;

        return (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: active || done ? 1 : 0.45
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(255,255,255,.12)",
                background: done
                  ? "rgba(255,255,255,.92)"
                  : active
                  ? "rgba(255,255,255,.10)"
                  : "rgba(255,255,255,.03)",
                color: done ? "#0a0d12" : "rgba(255,255,255,.92)",
                fontSize: 12,
                fontWeight: 800
              }}
            >
              {index + 1}
            </div>

            <div style={{ fontWeight: 700, color: "rgba(255,255,255,.9)" }}>{label}</div>
          </div>
        );
      })}
    </div>
  );
}
