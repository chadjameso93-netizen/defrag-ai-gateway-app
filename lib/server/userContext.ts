import { NextRequest } from "next/server";

export function getUserIdFromRequest(req: NextRequest, body?: any) {
  const { searchParams } = new URL(req.url);
  const fromQuery = String(searchParams.get("userId") || "").trim();
  const fromBody = String(body?.userId || "").trim();
  const userId = fromBody || fromQuery;

  if (!userId) {
    throw new Error("userId_required");
  }

  return userId;
}
