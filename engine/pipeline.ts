import { parseSituation } from "./parse";
import { getContext } from "./context";
import { assessTiming } from "./timing";
import { buildSynthesis } from "./synthesis";
import { applySafety } from "./safety";
import { generateGuidance } from "./response";

export async function runDefragPipeline(text: string) {
  const parsed = parseSituation(text);
  const context = getContext(parsed, text);
  const timing = assessTiming(text);
  const synthesis = buildSynthesis(parsed, context, timing, text);
  const safeSynthesis = applySafety(synthesis);
  const guidance = await generateGuidance(safeSynthesis);

  return {
    ...guidance,
    followUps: [
      "What makes you say that?",
      "Help me say it another way",
      "Practice the conversation"
    ]
  };
}
