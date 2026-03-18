import { NextRequest } from "next/server";

export async function requireUserIdFromQuery(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = String(searchParams.get("userId") || "").trim();
  if (!userId) throw new Error("userId_required");
  return userId;
}

export async function requireUserIdFromBody(req: NextRequest) {
  const body = await req.json();
  const userId = String(body.userId || "").trim();
  if (!userId) throw new Error("userId_required");
  return { userId, body };
}
