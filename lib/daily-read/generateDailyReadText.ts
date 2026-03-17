type GenerateDailyReadArgs = {
  userId: string;
  period: "morning" | "evening";
};

export async function generateDailyReadText({
  userId,
  period
}: GenerateDailyReadArgs) {
  const title = period === "morning" ? "Morning Read" : "Evening Read";

  const bodyText =
    period === "morning"
      ? "This morning favors a slower pace, steadier boundaries, and less force around emotionally loaded conversations. Let timing do more of the work than urgency. If something feels highly charged, keep the next move simple and easy to receive."
      : "This evening favors reflection, softer interpretation, and more care with what you react to. Let the system settle before trying to force clarity. If the day felt pressurized, choose calm pacing over immediate resolution.";

  return {
    title,
    bodyText
  };
}
