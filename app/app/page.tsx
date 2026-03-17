"use client";

import Container from "@/components/premium/Container";
import Card from "@/components/premium/Card";
import Section from "@/components/premium/Section";

export default function AppPage() {
  return (
    <Container>
      <div style={{ marginBottom: 48 }}>
        <h1 className="h1-premium">Your relational field</h1>
        <p className="text-muted" style={{ maxWidth: 520 }}>
          Live awareness of tension, timing, and emotional direction.
        </p>
      </div>

      <Section title="Current state">
        <Card>
          <p className="text-muted">
            Pressure is steady but not escalating. Timing favors space over resolution.
          </p>
        </Card>
      </Section>

      <Section title="Next move">
        <Card>
          <p>
            Keep communication simple. Reduce urgency. Let timing stabilize the interaction.
          </p>
        </Card>
      </Section>

      <Section title="Test a message">
        <Card>
          <input
            placeholder="Type a message..."
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,.1)",
              background: "rgba(255,255,255,.04)",
              color: "white"
            }}
          />
        </Card>
      </Section>
    </Container>
  );
}
