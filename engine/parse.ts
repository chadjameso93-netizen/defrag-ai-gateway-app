import { classifyIntake, IntakeType } from "./intake";

export type ParsedSituation = {
  intakeType: IntakeType;
  primaryRelationship: string;
  userGoal: string;
  likelyTone: string;
  outputNeed: string;
};

export function parseSituation(text: string): ParsedSituation {
  const t = text.toLowerCase();
  const intakeType = classifyIntake(text);

  let primaryRelationship = "someone important";
  if (t.includes("mom") || t.includes("mother")) primaryRelationship = "mother";
  else if (t.includes("dad") || t.includes("father")) primaryRelationship = "father";
  else if (t.includes("partner") || t.includes("boyfriend") || t.includes("girlfriend") || t.includes("wife") || t.includes("husband")) primaryRelationship = "partner";
  else if (t.includes("friend")) primaryRelationship = "friend";
  else if (t.includes("boss") || t.includes("manager") || t.includes("coworker") || t.includes("colleague")) primaryRelationship = "work relationship";

  let userGoal = "understand what is happening";
  if (intakeType === "conversation_preparation") userGoal = "prepare for a conversation";
  if (intakeType === "timing_question") userGoal = "choose the right time";
  if (intakeType === "active_conflict") userGoal = "reduce escalation";
  if (intakeType === "emotional_processing") userGoal = "make sense of feelings";

  let likelyTone = "unclear";
  if (t.includes("angry") || t.includes("mad") || t.includes("furious")) likelyTone = "anger";
  else if (t.includes("anxious") || t.includes("nervous") || t.includes("worried")) likelyTone = "anxiety";
  else if (t.includes("hurt") || t.includes("sad")) likelyTone = "hurt";
  else if (t.includes("confused") || t.includes("mixed signals")) likelyTone = "confusion";

  let outputNeed = "relational perspective";
  if (intakeType === "conversation_preparation") outputNeed = "timing guidance and phrasing help";
  if (intakeType === "timing_question") outputNeed = "timing guidance";
  if (intakeType === "active_conflict") outputNeed = "de-escalation and next steps";

  return {
    intakeType,
    primaryRelationship,
    userGoal,
    likelyTone,
    outputNeed
  };
}
