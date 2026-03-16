import { z } from "zod";

export const analyzeSchema = z.object({
  text: z.string().min(12, "Please provide a little more detail.").max(4000, "Please shorten your input.")
});
