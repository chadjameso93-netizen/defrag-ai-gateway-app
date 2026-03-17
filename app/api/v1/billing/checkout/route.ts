import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = (body.userId || "").trim();

    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://defrag-premium.vercel.app";

    const priceId = process.env.STRIPE_PRICE_ID;
    const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

    if (!priceId && paymentLink) {
      return NextResponse.json({ ok: true, url: paymentLink });
    }

    if (!priceId) {
      return NextResponse.json({ error: "Missing STRIPE_PRICE_ID." }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${origin}/billing/success`,
      cancel_url: `${origin}/billing/cancel`,
      allow_promotion_codes: true,
      metadata: {
        userId
      },
      subscription_data: {
        metadata: {
          userId
        }
      }
    });

    return NextResponse.json({
      ok: true,
      url: session.url
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
