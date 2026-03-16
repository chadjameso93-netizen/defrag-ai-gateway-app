export type IntakeType =
  | "interpretation"
  | "conversation_preparation"
  | "emotional_processing"
  | "timing_question"
  | "active_conflict"
  | "message_test";

export function classifyIntake(text: string): IntakeType {
  const t = text.toLowerCase();

  if (t.includes("what should i say") || t.includes("how do i say") || t.includes("talk to") || t.includes("bring this up")) {
    return "conversation_preparation";
  }

  if (t.includes("should i wait") || t.includes("is now a good time") || t.includes("tonight") || t.includes("today")) {
    return "timing_question";
  }

  if (t.includes("fight") || t.includes("argument") || t.includes("blew up") || t.includes("conflict")) {
    return "active_conflict";
  }

  if (t.includes("i feel") || t.includes("i'm upset") || t.includes("i am upset") || t.includes("hurt")) {
    return "emotional_processing";
  }

  return "interpretation";
}
