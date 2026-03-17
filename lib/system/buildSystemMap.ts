export function buildSystemMap(input: {
  userLabel?: string;
  otherLabel?: string;
  tone?: string;
}) {

  const user = input.userLabel || "You";
  const other = input.otherLabel || "Other";

  let state = "cool";

  if (/argument|fight|tense|conflict/i.test(input.tone || "")) {
    state = "warm";
  }

  if (/distance|silent|avoid/i.test(input.tone || "")) {
    state = "faded";
  }

  return {
    people: [
      { id: "you", label: user, x: 140, y: 180 },
      { id: "them", label: other, x: 340, y: 180 }
    ],
    links: [
      {
        from: "you",
        to: "them",
        state
      }
    ]
  };
}
