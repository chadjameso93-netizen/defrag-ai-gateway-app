import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function generateDailyReadAudio(dailyReadId: string) {
  const supabase = getSupabaseAdmin();

  const { data: read, error: readError } = await supabase
    .from("daily_reads")
    .select("*")
    .eq("id", dailyReadId)
    .single();

  if (readError || !read) {
    throw new Error(readError?.message || "Daily read not found.");
  }

  if (read.audio_url) {
    return { audioUrl: read.audio_url, generated: false };
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return { audioUrl: null, generated: false, reason: "missing_openai_key" };
  }

  const client = new OpenAI({ apiKey });

  const speech = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "sage",
    input: `${read.title}. ${read.body_text}`,
    instructions: "Speak calmly, clearly, and with a premium reflective tone.",
    response_format: "mp3"
  });

  const arrayBuffer = await speech.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = `${read.user_id}/${read.read_date}-${read.period}-${read.id}.mp3`;

  const { error: uploadError } = await supabase
    .storage
    .from("daily-reads")
    .upload(filePath, buffer, {
      contentType: "audio/mpeg",
      upsert: true
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicData } = supabase
    .storage
    .from("daily-reads")
    .getPublicUrl(filePath);

  const audioUrl = publicData.publicUrl;

  const { error: updateError } = await supabase
    .from("daily_reads")
    .update({ audio_url: audioUrl })
    .eq("id", dailyReadId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { audioUrl, generated: true };
}
