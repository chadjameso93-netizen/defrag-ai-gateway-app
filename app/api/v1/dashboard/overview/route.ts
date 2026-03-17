import { NextRequest, NextResponse } from "next/server";
import { getDashboardOverview } from "@/lib/dashboard/getDashboardOverview";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const overview = await getDashboardOverview(userId);

    return NextResponse.json({
      ok: true,
      overview
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
