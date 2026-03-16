import { NextRequest, NextResponse } from "next/server";
import { runDefragPipeline } from "@/engine/pipeline";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = String(body.text || "");
  const result = await runDefragPipeline(text);
  return NextResponse.json({
    ...result,
    simpleMap: {
      people: [
        { id: "you", label: "You", x: 40, y: 190 },
        { id: "them", label: "Them", x: 260, y: 60 },
        { id: "outside", label: "Context", x: 470, y: 190 }
      ],
      links: [
        { from: "you", to: "them", state: "cool" },
        { from: "outside", to: "them", state: "faded" },
        { from: "outside", to: "you", state: "faded" }
      ]
    }
  });
}
