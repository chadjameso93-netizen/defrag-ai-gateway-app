import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN,
  baseURL: "https://ai-gateway.vercel.sh/v1"
});
