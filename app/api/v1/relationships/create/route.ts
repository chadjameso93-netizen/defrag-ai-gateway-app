import { NextResponse } from "next/server"
import { createRelationship } from "@/lib/relationships/createRelationship"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const relationship = await createRelationship(body.userId, body)

    return NextResponse.json({
      success: true,
      relationship
    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }
}
