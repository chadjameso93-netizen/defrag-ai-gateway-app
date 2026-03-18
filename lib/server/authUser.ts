import { NextRequest } from "next/server";

export async function resolveUserId(req: NextRequest, body?: any) {
  const fromHeader = String(req.headers.get("x-user-id") || "").trim();
  const { searchParams } = new URL(req.url);
  const fromQuery = String(searchParams.get("userId") || "").trim();
  const fromBody = String(body?.userId || "").trim();
  return fromHeader || fromBody || fromQuery || "";
}

export async function requireResolvedUserId(req: NextRequest, body?: any) {
  const userId = await resolveUserId(req, body);
  if (!userId) {
    throw new Error("userId_required");
  }
  return userId;
}
