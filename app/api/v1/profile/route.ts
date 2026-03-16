import { NextRequest, NextResponse } from "next/server";
import { userProfileSchema } from "@/lib/profile/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = userProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid profile payload." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    profile: parsed.data,
    next: "store in supabase"
  });
}
