export function buildSystemMap(input: {
  userLabel?: string;
  otherLabel?: string;
  tone?: string;
}) {

  const user = input.userLabel || "You";
  const other = input.otherLabel || "Other";

  const tone = input.tone || "";

  let primaryState = "cool";
  let externalState = "cool";

  if (/argument|fight|tense|conflict/i.test(tone)) {
    primaryState = "warm";
  }

  if (/distance|silent|avoid/i.test(tone)) {
    primaryState = "faded";
  }

  if (/stress|work|family|pressure|overwhelmed/i.test(tone)) {
    externalState = "warm";
  }

  return {
    people: [
      { id: "you", label: user, x: 140, y: 180 },
      { id: "them", label: other, x: 360, y: 180 },
      { id: "external", label: "Pressure", x: 250, y: 80 }
    ],
    links: [
      {
        from: "you",
        to: "them",
        state: primaryState
      },
      {
        from: "them",
        to: "external",
        state: externalState
      }
    ]
  };
}
