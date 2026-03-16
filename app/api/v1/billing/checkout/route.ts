import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/billing/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_ID" },
        { status: 500 }
      );
    }

    const stripe = getStripe();

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://defrag-premium.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: body.userId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      success_url: `${origin}/app?upgraded=1`,
      cancel_url: `${origin}/pricing?canceled=1`
    });

    return NextResponse.json({
      ok: true,
      url: session.url
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
